import { 
  anonymizedCusDecData, 
  anonymizedContainers, 
  AnonymizedCusDecRecord, 
  AnonymizedContainer 
} from './anonymizedCusDecData';

// Re-export types for better organization
export type { AnonymizedCusDecRecord, AnonymizedContainer };

/**
 * Get all CusDec data
 */
export function getAllCusDecData(): AnonymizedCusDecRecord[] {
  return [...anonymizedCusDecData];
}

/**
 * Get all container data
 */
export function getAllContainerData(): AnonymizedContainer[] {
  return [...anonymizedContainers];
}

/**
 * Get a CusDec by ID
 */
export function getCusDecById(id: string): AnonymizedCusDecRecord | undefined {
  return anonymizedCusDecData.find(record => record.id === id);
}

/**
 * Get a container by ID
 */
export function getContainerById(id: string): AnonymizedContainer | undefined {
  return anonymizedContainers.find(container => container.id === id);
}

/**
 * Get all containers for a specific CusDec
 */
export function getContainersForCusDec(cusdecId: string): AnonymizedContainer[] {
  return anonymizedContainers.filter(container => container.cusdecId === cusdecId);
}

/**
 * Get CusDec for a specific container
 */
export function getCusDecForContainer(containerId: string): AnonymizedCusDecRecord | undefined {
  const container = getContainerById(containerId);
  if (!container) return undefined;
  
  return getCusDecById(container.cusdecId);
}

/**
 * Filter CusDecs based on criteria
 */
export function filterCusDecs(criteria: {
  cusdecNumber?: string;
  declarantTIN?: string;
  consigneeTIN?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}): AnonymizedCusDecRecord[] {
  return anonymizedCusDecData.filter(record => {
    // Filter by CusDec number if provided
    if (criteria.cusdecNumber && !record.cusdecNumber.toLowerCase().includes(criteria.cusdecNumber.toLowerCase())) {
      return false;
    }
    
    // Filter by declarant TIN if provided
    if (criteria.declarantTIN && !record.declarantTIN.toLowerCase().includes(criteria.declarantTIN.toLowerCase())) {
      return false;
    }
    
    // Filter by consignee TIN if provided
    if (criteria.consigneeTIN && !record.consigneeTIN.toLowerCase().includes(criteria.consigneeTIN.toLowerCase())) {
      return false;
    }
    
    // Filter by status if provided
    if (criteria.status && record.status.toLowerCase() !== criteria.status.toLowerCase()) {
      return false;
    }
    
    // Filter by date range if provided
    if (criteria.startDate && criteria.endDate) {
      const recordDate = new Date(record.regDate);
      const startDate = new Date(criteria.startDate);
      const endDate = new Date(criteria.endDate);
      
      if (recordDate < startDate || recordDate > endDate) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Filter containers based on criteria
 */
export function filterContainers(criteria: {
  containerNumber?: string;
  location?: string;
  status?: string;
  cusdecId?: string;
  startDate?: string;
  endDate?: string;
}): AnonymizedContainer[] {
  return anonymizedContainers.filter(container => {
    // Filter by container number if provided
    if (criteria.containerNumber && !container.number.toLowerCase().includes(criteria.containerNumber.toLowerCase())) {
      return false;
    }
    
    // Filter by location if provided
    if (criteria.location && !container.location.toLowerCase().includes(criteria.location.toLowerCase())) {
      return false;
    }
    
    // Filter by status if provided
    if (criteria.status && container.status.toLowerCase() !== criteria.status.toLowerCase()) {
      return false;
    }
    
    // Filter by CusDec ID if provided
    if (criteria.cusdecId && container.cusdecId !== criteria.cusdecId) {
      return false;
    }
    
    // Filter by date range if provided (using lastUpdated)
    if (criteria.startDate && criteria.endDate) {
      const containerDate = new Date(container.lastUpdated);
      const startDate = new Date(criteria.startDate);
      const endDate = new Date(criteria.endDate);
      
      if (containerDate < startDate || containerDate > endDate) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Get statistics about CusDecs
 */
export function calculateCusDecStats() {
  const total = anonymizedCusDecData.length;
  
  // Count by status
  const statusCounts = anonymizedCusDecData.reduce((acc, record) => {
    const status = record.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Processing stage counts
  const processing = statusCounts['processing'] || 0;
  const onHold = statusCounts['on hold'] || 0;
  const released = statusCounts['released'] || 0;
  const exempted = statusCounts['exempted'] || 0;
  const rejected = statusCounts['rejected'] || 0;
  const waitingConfirmation = statusCounts['waiting confirmation'] || 0;
  
  // Group by processing stage
  const processingStageStats = {
    processing: processing + onHold,
    detained: rejected,
    exited: released + exempted,
    waitingConfirmation: waitingConfirmation
  };
  
  return {
    total,
    byStatus: statusCounts,
    byProcessingStage: processingStageStats
  };
}

/**
 * Get statistics about containers
 */
export function calculateContainerStats() {
  const total = anonymizedContainers.length;
  
  // Count by status
  const statusCounts = anonymizedContainers.reduce((acc, container) => {
    const status = container.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count by size
  const sizeCounts = anonymizedContainers.reduce((acc, container) => {
    acc[container.size] = (acc[container.size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count by shipping line
  const shippingLineCounts = anonymizedContainers.reduce((acc, container) => {
    acc[container.shippingLine] = (acc[container.shippingLine] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total,
    byStatus: statusCounts,
    bySize: sizeCounts,
    byShippingLine: shippingLineCounts
  };
}

/**
 * Generate timeline events for a CusDec
 */
export function generateCusDecTimeline(cusdecId: string) {
  const cusdec = getCusDecById(cusdecId);
  if (!cusdec) return [];
  
  const timeline = [];
  
  // Registration event
  if (cusdec.regDate) {
    timeline.push({
      date: cusdec.regDate,
      title: 'CusDec Registered',
      description: `CusDec ${cusdec.cusdecNumber} registered by ${cusdec.declarantName}`,
      status: 'completed'
    });
  }
  
  // Channel assignment event
  if (cusdec.channel) {
    const channelDate = new Date(cusdec.regDate);
    channelDate.setHours(channelDate.getHours() + 1);
    
    timeline.push({
      date: channelDate.toISOString().split('T')[0],
      title: 'Channel Assignment',
      description: `Assigned to Channel ${cusdec.channel.toUpperCase()}`,
      status: 'completed'
    });
  }
  
  // Define processing date here to fix scope issues
  const processingDate = new Date(cusdec.regDate);
  processingDate.setHours(processingDate.getHours() + 2);
  
  // Status events based on current status
  switch (cusdec.status.toLowerCase()) {
    case 'waiting confirmation':
      timeline.push({
        date: cusdec.regDate,
        title: 'Waiting Confirmation',
        description: 'Awaiting acknowledgment from consignee',
        status: 'current'
      });
      break;
      
    case 'processing':
      timeline.push({
        date: processingDate.toISOString().split('T')[0],
        title: 'Processing Started',
        description: 'Document verification in progress',
        status: 'current'
      });
      break;
      
    case 'on hold':
      const holdDate = new Date(cusdec.regDate);
      holdDate.setHours(holdDate.getHours() + 5);
      
      timeline.push({
        date: processingDate.toISOString().split('T')[0],
        title: 'Processing Started',
        description: 'Document verification in progress',
        status: 'completed'
      });
      
      timeline.push({
        date: holdDate.toISOString().split('T')[0],
        title: 'Placed On Hold',
        description: 'Additional verification required',
        status: 'current'
      });
      break;
      
    case 'rejected':
      const rejectedDate = new Date(cusdec.regDate);
      rejectedDate.setHours(rejectedDate.getHours() + 8);
      
      timeline.push({
        date: processingDate.toISOString().split('T')[0],
        title: 'Processing Started',
        description: 'Document verification in progress',
        status: 'completed'
      });
      
      timeline.push({
        date: rejectedDate.toISOString().split('T')[0],
        title: 'Rejected',
        description: 'Documents did not meet requirements',
        status: 'current'
      });
      break;
      
    case 'released':
    case 'exempted':
      if (cusdec.releaseDate) {
        timeline.push({
          date: processingDate.toISOString().split('T')[0],
          title: 'Processing Started',
          description: 'Document verification in progress',
          status: 'completed'
        });
        
        timeline.push({
          date: cusdec.releaseDate,
          title: cusdec.status === 'Released' ? 'Released' : 'Exempted',
          description: cusdec.status === 'Released' ? 'Cleared for release' : 'Exempted from duties',
          status: 'completed'
        });
      }
      break;
  }
  
  return timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Generate timeline events for a Container
 */
export function generateContainerTimeline(containerId: string) {
  const container = getContainerById(containerId);
  if (!container) return [];
  
  const timeline = [];
  
  // Arrival event
  if (container.arrivalDate) {
    timeline.push({
      date: container.arrivalDate,
      title: 'Container Arrived',
      description: `Container ${container.number} arrived on vessel ${container.vesselName}`,
      status: 'completed'
    });
  }
  
  // Define dates here to fix scope issues
  const scanningDate = new Date(container.arrivalDate);
  scanningDate.setHours(scanningDate.getHours() + 24);
  
  const checkedDate = new Date(container.arrivalDate);
  checkedDate.setHours(checkedDate.getHours() + 36);
  
  // Status events based on current status
  switch (container.status.toLowerCase()) {
    case 'waiting confirmation':
      timeline.push({
        date: container.lastUpdated,
        title: 'Waiting Confirmation',
        description: 'Awaiting document verification',
        status: 'current'
      });
      break;
      
    case 'scanning':
      timeline.push({
        date: scanningDate.toISOString().split('T')[0],
        title: 'Scanning in Progress',
        description: 'Container selected for scanning',
        status: 'current'
      });
      break;
      
    case 'officer checked':
      timeline.push({
        date: scanningDate.toISOString().split('T')[0],
        title: 'Scanning Completed',
        description: 'Container scanning completed',
        status: 'completed'
      });
      
      timeline.push({
        date: checkedDate.toISOString().split('T')[0],
        title: 'Officer Checked',
        description: 'Physical inspection by customs officer completed',
        status: 'current'
      });
      break;
      
    case 'detained':
      const detainedDate = new Date(container.arrivalDate);
      detainedDate.setHours(detainedDate.getHours() + 48);
      
      timeline.push({
        date: scanningDate.toISOString().split('T')[0],
        title: 'Scanning Completed',
        description: 'Container scanning completed',
        status: 'completed'
      });
      
      timeline.push({
        date: checkedDate.toISOString().split('T')[0],
        title: 'Officer Checked',
        description: 'Physical inspection by customs officer completed',
        status: 'completed'
      });
      
      timeline.push({
        date: detainedDate.toISOString().split('T')[0],
        title: 'Detained',
        description: 'Container detained for further inspection',
        status: 'current'
      });
      break;
      
    case 'released':
      const releasedDate = new Date(container.lastUpdated);
      
      timeline.push({
        date: scanningDate.toISOString().split('T')[0],
        title: 'Scanning Completed',
        description: 'Container scanning completed',
        status: 'completed'
      });
      
      timeline.push({
        date: checkedDate.toISOString().split('T')[0],
        title: 'Officer Checked',
        description: 'Physical inspection by customs officer completed',
        status: 'completed'
      });
      
      timeline.push({
        date: releasedDate.toISOString().split('T')[0],
        title: 'Released',
        description: 'Container cleared for release',
        status: 'completed'
      });
      break;
  }
  
  return timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
} 
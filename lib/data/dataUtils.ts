import { 
  anonymizedCusDecData, 
  anonymizedContainers, 
  AnonymizedCusDecRecord, 
  AnonymizedContainer 
} from './anonymizedCusDecData';
import { ContainerPass, containerPassData } from './containerPassData';
import { ContainerTrackingEvent, containerTrackingEvents, containerTrackingData } from './containerTrackingData';
import { CargoItem, cargoItemsData } from './cargoItemsData';

// Re-export types for better organization
export type { 
  AnonymizedCusDecRecord, 
  AnonymizedContainer,
  ContainerPass,
  ContainerTrackingEvent,
  CargoItem 
};

// Also export the lookup data objects
export { containerTrackingData };

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
 * Helper function to get CusDecId by CusDecNumber
 */
export function getCusDecIdByNumber(cusdecNumber: string): string | undefined {
  const cusdec = anonymizedCusDecData.find(
    record => record.cusdecNumber === cusdecNumber
  );
  return cusdec?.id;
}

/**
 * Helper function to get containers by CusDecNumber
 */
export function getContainersByCusDecNumber(cusdecNumber: string): AnonymizedContainer[] {
  const cusdecId = getCusDecIdByNumber(cusdecNumber);
  if (!cusdecId) return [];
  
  return anonymizedContainers.filter(container => {
    // Check if the cusdecId in the container matches either the full ID or just the numeric part
    const numericCusdecId = cusdecId.replace('CUS-', '');
    const containerCusdecIdMatch = container.cusdecId.includes(numericCusdecId) || 
                                  container.cusdecId === cusdecId;
    return containerCusdecIdMatch;
  });
}

/**
 * Check if two CusDec IDs match, accounting for different formats
 */
export function areCusDecIdsMatching(containerId: string, cusDecId: string): boolean {
  // Direct match
  if (containerId === cusDecId) {
    return true;
  }
  
  // Extract numeric parts for partial matching
  const extractNumeric = (id: string): string => {
    return id.replace(/[^0-9]/g, '');
  };
  
  const containerNumeric = extractNumeric(containerId);
  const cusDecNumeric = extractNumeric(cusDecId);
  
  // Check if one contains the other
  return containerNumeric.includes(cusDecNumeric) || 
         cusDecNumeric.includes(containerNumeric);
}

/**
 * Filter containers based on criteria
 */
export function filterContainers(criteria: {
  containerNumber?: string;
  location?: string;
  status?: string;
  channel?: string;
  cusdecId?: string;
  cusdecNumber?: string;
  startDate?: string;
  endDate?: string;
}): AnonymizedContainer[] {
  // If cusdecNumber is provided, find corresponding cusdecId
  let cusdecIdToFilter = criteria.cusdecId;
  
  if (criteria.cusdecNumber && !criteria.cusdecId) {
    // Find the CusDec record with this cusdecNumber
    const cusdecRecord = anonymizedCusDecData.find(
      record => record.cusdecNumber === criteria.cusdecNumber
    );
    if (cusdecRecord) {
      cusdecIdToFilter = cusdecRecord.id;
    }
  }
  
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
    
    // Filter by channel if provided
    if (criteria.channel && container.channel !== criteria.channel) {
      return false;
    }
    
    // Filter by CusDec ID if provided, using flexible matching
    if (cusdecIdToFilter && !areCusDecIdsMatching(container.cusdecId, cusdecIdToFilter)) {
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
 * Get container pass data for a specific container number
 */
export function getContainerPassByNumber(containerNumber: string): ContainerPass[] {
  return containerPassData.filter(pass => pass.containerNumber === containerNumber);
}

/**
 * Get container tracking events for a specific container number
 */
export function getContainerTrackingByNumber(containerNumber: string): ContainerTrackingEvent[] {
  return containerTrackingData[containerNumber] || [];
}

/**
 * Get cargo items for a specific CusDec
 */
export function getCargoItemsByCusDecId(cusdecId: string): CargoItem[] {
  return cargoItemsData.filter(item => item.instanceId === cusdecId);
}

/**
 * Generate container timeline using tracking events
 */
export function generateContainerTimeline(containerNumber: string) {
  const events = getContainerTrackingByNumber(containerNumber);
  
  if (events.length === 0) {
    return [];
  }
  
  return events.map(event => ({
    date: event.operationDateTime,
    title: event.operationName,
    description: `Container ${event.containerNumber} - Destination: ${event.destination}`,
    status: 'completed',
    scanned: event.scanned === 1
  })).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
} 
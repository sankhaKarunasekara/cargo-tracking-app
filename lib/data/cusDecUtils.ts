import { AnonymizedCusDecRecord, anonymizedCusDecData } from './anonymizedCusDecData';

/**
 * Function to get all CusDec data
 */
export function getAllCusDecData(): AnonymizedCusDecRecord[] {
  return anonymizedCusDecData;
}

/**
 * Function to get CusDec data filtered by status
 */
export function getCusDecsByStatus(status: string): AnonymizedCusDecRecord[] {
  return anonymizedCusDecData.filter(
    record => record.status.toLowerCase() === status.toLowerCase()
  );
}

/**
 * Function to get CusDec data filtered by multiple criteria
 */
export function filterCusDecs(filters: {
  cusdecNumber?: string;
  declarantTIN?: string;
  consigneeTIN?: string;
  status?: string;
  channel?: string;
  startDate?: string;
  endDate?: string;
}): AnonymizedCusDecRecord[] {
  console.log("Filtering with criteria:", filters);
  
  // If no filters are provided, return all data
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  );
  
  if (!hasActiveFilters) {
    console.log("No active filters - returning all data");
    return anonymizedCusDecData;
  }
  
  return anonymizedCusDecData.filter(record => {
    // Check each filter condition if provided
    if (filters.cusdecNumber && filters.cusdecNumber.trim() !== '') {
      if (!record.cusdecNumber.toLowerCase().includes(filters.cusdecNumber.toLowerCase())) {
        return false;
      }
    }
    
    if (filters.declarantTIN && filters.declarantTIN.trim() !== '') {
      if (!record.declarantTIN.toLowerCase().includes(filters.declarantTIN.toLowerCase())) {
        return false;
      }
    }
    
    if (filters.consigneeTIN && filters.consigneeTIN.trim() !== '') {
      if (!record.consigneeTIN.toLowerCase().includes(filters.consigneeTIN.toLowerCase())) {
        return false;
      }
    }
    
    if (filters.status && filters.status.trim() !== '') {
      if (record.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }
    
    if (filters.channel && filters.channel.trim() !== '') {
      if (record.channel.toLowerCase() !== filters.channel.toLowerCase()) {
        return false;
      }
    }
    
    // Date range filtering
    if (filters.startDate && filters.startDate.trim() !== '') {
      const startDate = new Date(filters.startDate);
      const recordDate = new Date(record.regDate);
      if (isNaN(startDate.getTime())) {
        console.warn("Invalid start date:", filters.startDate);
      } else if (recordDate < startDate) {
        return false;
      }
    }
    
    if (filters.endDate && filters.endDate.trim() !== '') {
      const endDate = new Date(filters.endDate);
      const recordDate = new Date(record.regDate);
      if (isNaN(endDate.getTime())) {
        console.warn("Invalid end date:", filters.endDate);
      } else if (recordDate > endDate) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Function to get a single CusDec by ID
 */
export function getCusDecById(id: string): AnonymizedCusDecRecord | undefined {
  return anonymizedCusDecData.find(record => record.id === id);
}

/**
 * Calculate statistics from CusDec data
 */
export function calculateCusDecStats() {
  const totalRecords = anonymizedCusDecData.length;
  const totalContainers = anonymizedCusDecData.reduce((sum, record) => sum + record.containerCount, 0);
  const totalInvoiceValue = anonymizedCusDecData.reduce((sum, record) => sum + record.invoiceValue, 0);
  
  // Status distribution
  const statusDistribution = anonymizedCusDecData.reduce((result, record) => {
    const status = record.status;
    if (!result[status]) {
      result[status] = 0;
    }
    result[status]++;
    return result;
  }, {} as Record<string, number>);
  
  // Channel distribution
  const channelDistribution = anonymizedCusDecData.reduce((result, record) => {
    const channel = record.channel;
    if (!result[channel]) {
      result[channel] = 0;
    }
    result[channel]++;
    return result;
  }, {} as Record<string, number>);
  
  // Origin country distribution
  const countryDistribution = anonymizedCusDecData.reduce((result, record) => {
    const country = record.originCountry;
    if (!result[country]) {
      result[country] = 0;
    }
    result[country]++;
    return result;
  }, {} as Record<string, number>);
  
  return {
    totalRecords,
    totalContainers,
    totalInvoiceValue,
    statusDistribution,
    channelDistribution,
    countryDistribution
  };
} 
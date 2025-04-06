import { AnonymizedContainer } from './anonymizedCusDecData';

// Map status to processing stage
export function mapContainerStatusToProcessingStage(status: string): string {
  status = status.toLowerCase();
  if (status === 'registered' || status === 'scanning') {
    return 'Registered';
  } else if (status === 'doc checked' || status === 'acknowledgedgate') {
    return 'Gate Processing';
  } else if (status === 'acknowledgedyard') {
    return 'Yard Processing';
  } else if (status === 'exitedyard') {
    return 'Exited';
  } else if (status === 'detained' || status === 'cancelled') {
    return 'Detained';
  } else {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

// Get features based on container status
export function getContainerFeatures(status: string) {
  const statusLower = status.toLowerCase();
  return {
    registration: true,
    docCheck: ['doc checked', 'acknowledgedgate', 'acknowledgedyard', 'exitedyard'].includes(statusLower),
    gate: ['acknowledgedgate', 'acknowledgedyard', 'exitedyard'].includes(statusLower),
    yard: ['acknowledgedyard', 'exitedyard'].includes(statusLower)
  };
}

// Calculate progress percentage based on container status
export function getContainerProgressPercentage(status: string): number {
  const statusOrder = [
    'registered', 
    'doc checked', 
    'acknowledgedgate', 
    'acknowledgedyard', 
    'exitedyard'
  ];
  
  const currentStatus = status.toLowerCase();
  const index = statusOrder.indexOf(currentStatus);
  
  if (index >= 0) {
    return (index + 1) / statusOrder.length * 100;
  }
  
  return 0; // For cancelled or other statuses
}

// Get status color class based on container status
export function getContainerStatusColorClass(status: string): string {
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case 'scanning':
    case 'registered':
      return 'status-bg-submitted';
    case 'doc checked':
      return 'status-bg-review';
    case 'acknowledgedgate':
    case 'acknowledgedyard':
      return 'status-bg-review';
    case 'exitedyard':
      return 'status-bg-paid';
    case 'cancelled':
    case 'detained':
      return 'status-bg-error';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Format container arrival date for display
export function formatContainerDate(dateString: string | undefined): string {
  if (!dateString) return '05/04/2024';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/');
}

// Get default values for container display
export function getContainerDefaults(container: Partial<AnonymizedContainer>) {
  return {
    shippingLine: container.shippingLine || 'MSC',
    size: container.size || '20ft',
    type: container.type || 'Standard',
    origin: 'Singapore', // Default origin
    destination: 'Sri Lanka' // Default destination
  };
} 
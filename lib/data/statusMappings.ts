// Define filter type interface
export interface FilterDefinition {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'select' | 'date';
  options?: Array<{ value: string; label: string }>;
  value: string;
}

// Set default date range for current year (starting from 2025 for our sample data)
export function getDefaultDateRange() {
  const today = new Date();
  const endDate = today.toISOString().slice(0, 10); // Current date in YYYY-MM-DD format
  
  // Get date from 2025-01-01 (as data starts from 2025)
  const startDate = new Date('2025-01-01');
  
  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate
  };
}

// Status tabs for Container tracking
export const containerStatusTabs = [
  { id: 'all', label: 'All', active: true },
  { id: 'scanning', label: 'Scanning', active: false },
  { id: 'in_yard', label: 'In Yard', active: false }
];

// Status tabs for CusDec tracking
export const cusDecStatusTabs = [
  { id: 'all', label: 'All', active: true },
  { id: 'waiting confirmation', label: 'Waiting Confirmation', active: false },
  { id: 'processing', label: 'Processing', active: false },
  { id: 'detained', label: 'Detained', active: false },
  { id: 'exited', label: 'Exited', active: false }
];

// Channel class mappings for badges
export function getChannelBadgeClasses(channel: string): string {
  const channelLower = channel.toLowerCase();
  switch (channelLower) {
    case 'red':
      return 'bg-red-100 text-red-700';
    case 'yellow':
      return 'bg-amber-100 text-amber-700';
    case 'green':
      return 'bg-green-100 text-green-700';
    case 'blue':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

// Container status order for processing progress
export const containerStatusOrder = [
  'registered', 
  'doc checked', 
  'acknowledgedgate', 
  'acknowledgedyard', 
  'exitedyard'
];

// Container filter definitions
export const containerFilterDefinitions: FilterDefinition[] = [
  {
    id: 'container',
    label: 'Container',
    type: 'text',
    placeholder: 'Enter container number',
    value: ''
  },
  {
    id: 'location',
    label: 'Location',
    type: 'text',
    placeholder: 'Enter location',
    value: ''
  },
  {
    id: 'channel',
    label: 'Channel',
    type: 'select',
    options: [
      { value: 'Yellow', label: 'Yellow' },
      { value: 'Red', label: 'Red' },
      { value: 'Green', label: 'Green' },
      { value: 'Blue', label: 'Blue' }
    ],
    value: ''
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'scanning', label: 'Scanning' },
    ],
    value: ''
  }
];

// CusDec filter definitions
export const cusDecFilterDefinitions: FilterDefinition[] = [
  {
    id: 'cusdecNumber',
    label: 'CusDec Number',
    type: 'text',
    placeholder: 'Enter CusDec number',
    value: ''
  },
  {
    id: 'declarantTIN',
    label: 'Declarant TIN Number',
    type: 'text',
    placeholder: 'Enter TIN number',
    value: ''
  },
  {
    id: 'consigneeTIN',
    label: 'Consignee TIN Number',
    type: 'text',
    placeholder: 'Enter TIN number',
    value: ''
  }
]; 
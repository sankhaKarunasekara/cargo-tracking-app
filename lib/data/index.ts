// Re-export everything from our data utility files
export * from './dataUtils';
export * from './anonymizedCusDecData';
export * from './cusDecItemData';
export * from './containerPassData';
export * from './containerTrackingData';

// Additional utility functions can be added here

/**
 * Gets all containers for a specific CusDec record
 * @param cusdecId The ID of the CusDec record
 * @returns Array of containers associated with the CusDec
 */
export function getContainersForCusDec(cusdecId: string) {
  const { anonymizedContainers } = require('./anonymizedCusDecData');
  return anonymizedContainers.filter(container => container.cusdecId === cusdecId);
}

/**
 * Gets all items for a specific CusDec record
 * @param cusdecId The ID of the CusDec record
 * @returns Array of items associated with the CusDec
 */
export function getItemsForCusDec(cusdecId: string) {
  const { cusDecItemData } = require('./cusDecItemData');
  return cusDecItemData.filter(item => item.instanceId === cusdecId);
}

/**
 * Gets all tracking records for a specific container
 * @param containerId The ID of the container
 * @returns Array of tracking records associated with the container
 */
export function getTrackingForContainer(containerId: string) {
  const { containerTrackingData } = require('./containerTrackingData');
  return containerTrackingData.filter(record => record.instanceId === containerId);
}

/**
 * Gets all pass records for a specific container
 * @param containerId The ID of the container
 * @returns Array of pass records associated with the container
 */
export function getPassesForContainer(containerId: string) {
  const { containerPassData } = require('./containerPassData');
  return containerPassData.filter(pass => pass.instanceId === containerId);
}

/**
 * Gets the container pass history for a specific cusdec
 * @param cusdecId The ID of the CusDec record
 * @returns Array of pass records associated with the cusdec
 */
export function getPassHistoryForCusDec(cusdecId: string) {
  const { containerPassData } = require('./containerPassData');
  return containerPassData.filter(pass => pass.cusdecId === cusdecId);
} 
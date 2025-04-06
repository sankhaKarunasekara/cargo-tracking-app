<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetClose
} from './ui/sheet'
import { 
  getCusDecById, 
  getContainerById, 
  getCargoItemsByCusDecId, 
  getContainersForCusDec,
  AnonymizedCusDecRecord,
  AnonymizedContainer,
  CargoItem
} from '../lib/data'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  itemId: {
    type: String,
    default: ''
  },
  itemType: {
    type: String,
    default: 'cusdec' // 'cusdec' or 'container'
  }
})

const emit = defineEmits(['update:isOpen'])

const isSheetOpen = ref(props.isOpen)
const isLoading = ref(true)
const activeTab = ref('general')

// Data objects
const cusDecData = ref<AnonymizedCusDecRecord | null>(null)
const containerData = ref<AnonymizedContainer | null>(null)
const cargoItems = ref<CargoItem[]>([])
const linkedContainers = ref<AnonymizedContainer[]>([])

// Watch for changes in the isOpen prop
watch(() => props.isOpen, (newValue) => {
  isSheetOpen.value = newValue
  if (newValue) {
    loadItemData()
  }
})

// Watch for changes in the isSheetOpen value
watch(isSheetOpen, (newValue) => {
  emit('update:isOpen', newValue)
})

// Watch for changes in the itemId to reload data
watch(() => props.itemId, () => {
  if (isSheetOpen.value) {
    loadItemData()
  }
})

// Sheet title based on item type
const sheetTitle = computed(() => {
  if (props.itemType === 'cusdec') {
    return cusDecData.value ? `CusDec ${cusDecData.value.cusdecNumber}` : 'CusDec Details'
  } else {
    return containerData.value ? `Container ${containerData.value.number}` : 'Container Details'
  }
})

// Load the appropriate data based on itemType and itemId
const loadItemData = () => {
  isLoading.value = true
  
  if (props.itemType === 'cusdec') {
    cusDecData.value = getCusDecById(props.itemId) || null
    
    if (cusDecData.value) {
      cargoItems.value = getCargoItemsByCusDecId(props.itemId)
      linkedContainers.value = getContainersForCusDec(props.itemId)
    }
  } else {
    containerData.value = getContainerById(props.itemId) || null
    
    if (containerData.value && containerData.value.cusdecId) {
      cusDecData.value = getCusDecById(containerData.value.cusdecId) || null
    }
  }
  
  // Simulate loading effect
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

// Format dates for display
const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  
  // Format as DD/MM/YYYY
  return date.toLocaleDateString('en-GB', {
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric'
  })
}

// Format currency values
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

// Load data on mount
onMounted(() => {
  if (props.isOpen) {
    loadItemData()
  }
})
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetContent class="sm:max-w-xl w-full overflow-y-auto" side="right">
      <SheetHeader class="pb-4 border-b">
        <SheetTitle>{{ sheetTitle }}</SheetTitle>
        <SheetDescription>
          <span v-if="props.itemType === 'cusdec' && cusDecData">
            ID: {{ cusDecData.id }} | Status: <span :class="{
              'text-green-600': cusDecData.status === 'Released' || cusDecData.status === 'Exempted',
              'text-blue-600': cusDecData.status === 'Processing',
              'text-red-600': cusDecData.status === 'Rejected',
              'text-amber-600': cusDecData.status === 'On Hold' || cusDecData.status === 'Waiting Confirmation'
            }">{{ cusDecData.status }}</span>
          </span>
          <span v-if="props.itemType === 'container' && containerData">
            ID: {{ containerData.id }} | Status: <span :class="{
              'text-green-600': containerData.status === 'Released',
              'text-blue-600': containerData.status === 'Processing' || containerData.status === 'Scanning',
              'text-red-600': containerData.status === 'Detained',
              'text-amber-600': containerData.status === 'Officer Checked' || containerData.status === 'Waiting Confirmation'
            }">{{ containerData.status }}</span>
          </span>
        </SheetDescription>
      </SheetHeader>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-80">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
      
      <!-- Content when loaded -->
      <div v-else class="py-6">
        <!-- Tabs navigation -->
        <div class="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400 mb-6 w-full grid grid-cols-3">
          <button 
            type="button"
            @click="activeTab = 'general'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              activeTab === 'general' ? 'bg-white text-gray-900 shadow-sm' : ''
            ]"
          >
            General
          </button>
          <button 
            v-if="props.itemType === 'cusdec'"
            type="button"
            @click="activeTab = 'cargo'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              activeTab === 'cargo' ? 'bg-white text-gray-900 shadow-sm' : ''
            ]"
          >
            Cargo Items
          </button>
          <button 
            v-if="props.itemType === 'cusdec'"
            type="button"
            @click="activeTab = 'containers'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              activeTab === 'containers' ? 'bg-white text-gray-900 shadow-sm' : ''
            ]"
          >
            Containers
          </button>
          <button 
            v-if="props.itemType === 'container'"
            type="button"
            @click="activeTab = 'shipping'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              activeTab === 'shipping' ? 'bg-white text-gray-900 shadow-sm' : ''
            ]"
          >
            Shipping
          </button>
          <button 
            v-if="props.itemType === 'container'"
            type="button"
            @click="activeTab = 'cusdec'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              activeTab === 'cusdec' ? 'bg-white text-gray-900 shadow-sm' : ''
            ]"
          >
            CusDec
          </button>
        </div>
          
        <!-- General Tab -->
        <div v-if="activeTab === 'general'">
          <!-- CusDec General Information -->
          <div v-if="props.itemType === 'cusdec' && cusDecData" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Declarant</p>
                <p class="text-sm font-semibold">{{ cusDecData.declarantName }}</p>
                <p class="text-xs text-gray-500">TIN: {{ cusDecData.declarantTIN }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Consignee</p>
                <p class="text-sm font-semibold">{{ cusDecData.consigneeName }}</p>
                <p class="text-xs text-gray-500">TIN: {{ cusDecData.consigneeTIN }}</p>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Registration Date</p>
                  <p class="text-sm">{{ formatDate(cusDecData.regDate) }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Release Date</p>
                  <p class="text-sm">{{ cusDecData.releaseDate ? formatDate(cusDecData.releaseDate) : '-' }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">B/L Number</p>
                  <p class="text-sm">{{ cusDecData.blNumber }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Office Code</p>
                  <p class="text-sm">{{ cusDecData.officeCode }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Channel</p>
                  <p class="text-sm">
                    <span v-if="cusDecData.channel" :class="{
                      'px-2 py-0.5 text-xs font-medium rounded-full': true,
                      'bg-red-100 text-red-700': cusDecData.channel.toLowerCase() === 'red',
                      'bg-amber-100 text-amber-700': cusDecData.channel.toLowerCase() === 'yellow',
                      'bg-green-100 text-green-700': cusDecData.channel.toLowerCase() === 'green',
                      'bg-blue-100 text-blue-700': cusDecData.channel.toLowerCase() === 'blue'
                    }">{{ cusDecData.channel || 'Not Assigned' }}</span>
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Container Count</p>
                  <p class="text-sm">{{ cusDecData.containerCount }}</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Exporter</p>
                  <p class="text-sm">{{ cusDecData.exporterName }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Origin Country</p>
                  <p class="text-sm">{{ cusDecData.originCountry }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Incoterm</p>
                  <p class="text-sm">{{ cusDecData.incoterm }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Invoice Value</p>
                  <p class="text-sm font-medium">{{ formatCurrency(cusDecData.invoiceValue) }}</p>
                </div>
              </div>
              
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Destination</p>
                <p class="text-sm">{{ cusDecData.destination }}</p>
              </div>
            </div>
          </div>
          
          <!-- Container General Information -->
          <div v-if="props.itemType === 'container' && containerData" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Container Number</p>
                <p class="text-sm font-semibold">{{ containerData.number }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Status</p>
                <p class="text-sm">
                  <span :class="{
                    'px-2 py-0.5 text-xs font-medium rounded-full': true,
                    'bg-green-100 text-green-700': containerData.status === 'Released',
                    'bg-blue-100 text-blue-700': containerData.status === 'Processing' || containerData.status === 'Scanning',
                    'bg-red-100 text-red-700': containerData.status === 'Detained',
                    'bg-amber-100 text-amber-700': containerData.status === 'Officer Checked' || containerData.status === 'Waiting Confirmation',
                    'bg-purple-100 text-purple-700': containerData.status === 'AcknowledgedYard' || containerData.status === 'AcknowledgedGate',
                    'bg-gray-100 text-gray-700': !['Released', 'Processing', 'Scanning', 'Detained', 'Officer Checked', 'Waiting Confirmation', 'AcknowledgedYard', 'AcknowledgedGate'].includes(containerData.status)
                  }">{{ containerData.status }}</span>
                </p>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Size</p>
                  <p class="text-sm">{{ containerData.size }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Type</p>
                  <p class="text-sm">{{ containerData.type }}</p>
                </div>
              </div>
              
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Location</p>
                <p class="text-sm">{{ containerData.location }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Channel</p>
                  <p class="text-sm">
                    <span :class="{
                      'px-2 py-0.5 text-xs font-medium rounded-full': true,
                      'bg-red-100 text-red-700': containerData.channel.toLowerCase() === 'red',
                      'bg-amber-100 text-amber-700': containerData.channel.toLowerCase() === 'yellow',
                      'bg-green-100 text-green-700': containerData.channel.toLowerCase() === 'green',
                      'bg-blue-100 text-blue-700': containerData.channel.toLowerCase() === 'blue'
                    }">{{ containerData.channel }}</span>
                  </p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">CusDec ID</p>
                  <p class="text-sm">{{ containerData.cusdecId }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Cargo Items Tab -->
        <div v-if="activeTab === 'cargo'">
          <div v-if="cargoItems.length > 0" class="space-y-4">
            <div v-for="(item, index) in cargoItems" :key="index" class="p-4 bg-gray-50 rounded-lg">
              <div class="flex justify-between">
                <h4 class="text-sm font-medium">Item #{{ index + 1 }}</h4>
                <span class="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{{ item.hsCode }}</span>
              </div>
              <p class="text-sm mt-2">{{ item.description }}</p>
              <div class="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p class="text-gray-500">Quantity</p>
                  <p class="font-medium">{{ item.quantity }} {{ item.unit }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Unit Price</p>
                  <p class="font-medium">{{ formatCurrency(item.unitPrice) }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Total Value</p>
                  <p class="font-medium">{{ formatCurrency(item.totalValue) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center">
            <p class="text-gray-500">No cargo items found for this declaration.</p>
          </div>
        </div>
        
        <!-- Containers Tab -->
        <div v-if="activeTab === 'containers'">
          <div v-if="linkedContainers.length > 0" class="space-y-4">
            <div v-for="container in linkedContainers" :key="container.id" class="p-4 border border-gray-200 rounded-lg">
              <div class="flex justify-between">
                <h4 class="text-sm font-medium">{{ container.number }}</h4>
                <span :class="{
                  'px-2 py-0.5 text-xs font-medium rounded-full': true,
                  'bg-green-100 text-green-700': container.status === 'Released',
                  'bg-blue-100 text-blue-700': container.status === 'Processing' || container.status === 'Scanning',
                  'bg-red-100 text-red-700': container.status === 'Detained',
                  'bg-amber-100 text-amber-700': container.status === 'Officer Checked' || container.status === 'Waiting Confirmation'
                }">{{ container.status }}</span>
              </div>
              <div class="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p class="text-gray-500">Size & Type</p>
                  <p class="font-medium">{{ container.size }} {{ container.type }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Location</p>
                  <p class="font-medium">{{ container.location }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Arrival Date</p>
                  <p class="font-medium">{{ formatDate(container.arrivalDate) }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Last Updated</p>
                  <p class="font-medium">{{ formatDate(container.lastUpdated) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center">
            <p class="text-gray-500">No containers found for this declaration.</p>
          </div>
        </div>
        
        <!-- Shipping Tab -->
        <div v-if="activeTab === 'shipping' && props.itemType === 'container' && containerData">
          <div class="space-y-6">
            <div class="bg-gray-50 p-4 rounded-lg space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Shipping Line</p>
                  <p class="text-sm">{{ containerData.shippingLine }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Vessel Name</p>
                  <p class="text-sm">{{ containerData.vesselName }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Voyage</p>
                  <p class="text-sm">{{ containerData.voyage }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-500">Arrival Date</p>
                  <p class="text-sm">{{ formatDate(containerData.arrivalDate) }}</p>
                </div>
              </div>
              
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Last Updated</p>
                <p class="text-sm">{{ formatDate(containerData.lastUpdated) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- CusDec Tab (for Container view) -->
        <div v-if="activeTab === 'cusdec' && props.itemType === 'container' && cusDecData">
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 rounded-lg">
              <div class="flex justify-between">
                <h4 class="text-sm font-medium">{{ cusDecData.cusdecNumber }}</h4>
                <span :class="{
                  'px-2 py-0.5 text-xs font-medium rounded-full': true,
                  'bg-green-100 text-green-700': cusDecData.status === 'Released' || cusDecData.status === 'Exempted',
                  'bg-blue-100 text-blue-700': cusDecData.status === 'Processing',
                  'bg-red-100 text-red-700': cusDecData.status === 'Rejected',
                  'bg-amber-100 text-amber-700': cusDecData.status === 'On Hold' || cusDecData.status === 'Waiting Confirmation'
                }">{{ cusDecData.status }}</span>
              </div>
              
              <div class="mt-3 space-y-3">
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p class="text-gray-500">Declarant</p>
                    <p class="font-medium">{{ cusDecData.declarantName }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Consignee</p>
                    <p class="font-medium">{{ cusDecData.consigneeName }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p class="text-gray-500">Registration Date</p>
                    <p class="font-medium">{{ formatDate(cusDecData.regDate) }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">B/L Number</p>
                    <p class="font-medium">{{ cusDecData.blNumber }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p class="text-gray-500">Origin Country</p>
                    <p class="font-medium">{{ cusDecData.originCountry }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Invoice Value</p>
                    <p class="font-medium">{{ formatCurrency(cusDecData.invoiceValue) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template> 
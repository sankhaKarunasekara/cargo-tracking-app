<script setup lang="ts">
import ButtonComponent from './ui/button/index'

const props = defineProps<{
  title?: string;
  filters: Array<{
    id: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'select' | 'date';
    options?: Array<{ value: string; label: string }>;
    value: string;
  }>;
}>()

const emit = defineEmits(['update:filters', 'search', 'reset'])

const updateFilter = (id: string, value: string) => {
  const updatedFilters = props.filters.map(filter => {
    if (filter.id === id) {
      return { ...filter, value }
    }
    return filter
  })
  
  emit('update:filters', updatedFilters)
}

const handleSearch = () => {
  emit('search')
}

const handleReset = () => {
  const resetFilters = props.filters.map(filter => ({ ...filter, value: '' }))
  emit('update:filters', resetFilters)
  emit('reset')
}

const handleSelectChange = (id: string, event: Event) => {
  const target = event.target as HTMLSelectElement
  updateFilter(id, target.value)
}

const handleInputChange = (id: string, event: Event) => {
  const target = event.target as HTMLInputElement
  updateFilter(id, target.value)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <h3 v-if="title" class="text-lg font-medium mb-4">{{ title || 'Filters' }}</h3>
    
    <!-- Mobile-friendly grid layout for filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="filter in filters" :key="filter.id" class="space-y-1">
        <label :for="filter.id" class="text-sm font-medium text-gray-700 block">{{ filter.label }}</label>
        
        <select
          v-if="filter.type === 'select'"
          :id="filter.id"
          class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          :value="filter.value"
          @change="(e) => handleSelectChange(filter.id, e)"
        >
          <option value="">Select {{ filter.label }}</option>
          <option
            v-for="option in filter.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        
        <input
          v-else
          :id="filter.id"
          type="text"
          :placeholder="filter.placeholder || `Enter ${filter.label}`"
          class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          :value="filter.value"
          @input="(e) => handleInputChange(filter.id, e)"
        />
      </div>
    </div>
    
    <!-- Responsive button group -->
    <div class="flex flex-col sm:flex-row gap-2 mt-6">
      <ButtonComponent
        variant="primary"
        size="md"
        class="w-full sm:flex-1 flex items-center justify-center"
        @click="handleSearch"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Search
      </ButtonComponent>
      
      <ButtonComponent
        variant="secondary"
        size="md"
        class="w-full sm:w-auto"
        @click="handleReset"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M2 12C2 6.48 6.48 2 12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12"></path>
          <path d="M8 12H16"></path>
        </svg>
        Reset
      </ButtonComponent>
    </div>
  </div>
</template> 
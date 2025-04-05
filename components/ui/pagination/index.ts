import { defineComponent, h, computed } from 'vue'
import { cn } from '../../../lib/utils'

const Pagination = defineComponent({
  name: 'Pagination',
  props: {
    class: {
      type: String,
      default: ''
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    const pages = computed(() => {
      const items = []
      const maxPages = 5
      const startPage = Math.max(1, props.currentPage - Math.floor(maxPages / 2))
      const endPage = Math.min(props.totalPages, startPage + maxPages - 1)

      for (let i = startPage; i <= endPage; i++) {
        items.push(i)
      }

      return items
    })

    return () => h('div', {
      class: cn('flex items-center justify-center space-x-2', props.class)
    }, [
      h('button', {
        class: 'p-2 rounded-md hover:bg-gray-100 disabled:opacity-50',
        disabled: props.currentPage === 1,
        onClick: () => emit('change', props.currentPage - 1)
      }, '<'),
      ...pages.value.map(page =>
        h('button', {
          class: cn(
            'w-8 h-8 rounded-md flex items-center justify-center',
            page === props.currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
          ),
          onClick: () => emit('change', page)
        }, page)
      ),
      h('button', {
        class: 'p-2 rounded-md hover:bg-gray-100 disabled:opacity-50',
        disabled: props.currentPage === props.totalPages,
        onClick: () => emit('change', props.currentPage + 1)
      }, '>')
    ])
  }
})

export { Pagination }
export default Pagination 
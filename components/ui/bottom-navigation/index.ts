import { defineComponent, h } from 'vue'
import { cn } from '../../../lib/utils'

const BottomNavigation = defineComponent({
  name: 'BottomNavigation',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around py-2 z-40 shadow-md',
        props.class
      )
    }, slots.default?.())
  }
})

const BottomNavigationItem = defineComponent({
  name: 'BottomNavigationItem',
  props: {
    class: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () => h('button', {
      class: cn(
        'flex flex-col items-center justify-center px-4 py-2 text-xs',
        props.active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400',
        props.class
      ),
      onClick: () => emit('click')
    }, [
      h('div', {
        class: 'mb-1',
        innerHTML: props.icon
      }),
      h('span', {}, props.label)
    ])
  }
})

export { BottomNavigation, BottomNavigationItem }
export default BottomNavigation 
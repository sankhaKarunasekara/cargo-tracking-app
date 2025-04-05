import { defineComponent, computed, h } from 'vue'
import { cn } from '../../../lib/utils'

export default defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['default', 'primary', 'secondary', 'danger', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots, attrs }) {
    const classes = computed(() => {
      const variants = {
        default: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        outline: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
      }

      const sizes = {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-4',
        lg: 'py-3 px-6 text-lg'
      }

      return cn(
        'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
        variants[props.variant as keyof typeof variants],
        sizes[props.size as keyof typeof sizes],
        props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        props.class
      )
    })

    return () => h('button', {
      class: classes.value,
      disabled: props.disabled,
      ...attrs
    }, slots.default?.())
  }
}) 
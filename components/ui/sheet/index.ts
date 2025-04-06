import { defineComponent, h, ref, computed, watch, Teleport, Transition, provide, inject, Ref } from 'vue'
import { cn } from '../../../lib/utils'

// Create a sheet context
const SheetContext = Symbol('SheetContext')

export interface SheetContextValue {
  open: Ref<boolean>
  toggleSheet: () => void
}

// Hook to use the sheet context
export function useSheet(): SheetContextValue {
  const context = inject<SheetContextValue>(SheetContext)
  if (!context) {
    throw new Error('useSheet must be used within a SheetProvider')
  }
  return context
}

// Sheet Provider component
export const SheetProvider = defineComponent({
  name: 'SheetProvider',
  props: {
    open: {
      type: Boolean,
      default: undefined
    },
    defaultOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const controlled = computed(() => props.open !== undefined)
    const openState = ref(controlled.value ? !!props.open : props.defaultOpen)

    watch(() => props.open, (value) => {
      if (controlled.value && value !== undefined) {
        openState.value = value
      }
    })

    const toggleSheet = () => {
      const newValue = !openState.value
      if (controlled.value) {
        emit('update:open', newValue)
      } else {
        openState.value = newValue
      }
    }

    // Provide the sheet context
    provide(SheetContext, {
      open: openState,
      toggleSheet
    })

    return () => slots.default?.()
  }
})

// Sheet component
export const Sheet = defineComponent({
  name: 'Sheet',
  props: {
    open: {
      type: Boolean,
      default: undefined
    },
    defaultOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const controlled = computed(() => props.open !== undefined)
    const baseOpenState = ref(controlled.value ? !!props.open : props.defaultOpen)

    watch(() => props.open, (value) => {
      if (controlled.value && value !== undefined) {
        baseOpenState.value = value
      }
    })

    const toggleSheet = () => {
      const newValue = !baseOpenState.value
      if (controlled.value) {
        emit('update:open', newValue)
      } else {
        baseOpenState.value = newValue
      }
    }

    // Provide context for nested components
    provide(SheetContext, {
      open: baseOpenState,
      toggleSheet
    })

    return () => slots.default?.()
  }
})

// Sheet Trigger component
export const SheetTrigger = defineComponent({
  name: 'SheetTrigger',
  setup(props, { slots, attrs }) {
    const { toggleSheet } = useSheet()

    return () => {
      const slot = slots.default?.()
      if (!slot) return null

      const triggerElement = slot[0]
      const originalClick = triggerElement.props?.onClick
      
      return h(triggerElement, {
        ...triggerElement.props,
        onClick: (e: Event) => {
          toggleSheet()
          if (typeof originalClick === 'function') {
            originalClick(e)
          }
        }
      })
    }
  }
})

// Sheet Close component
export const SheetClose = defineComponent({
  name: 'SheetClose',
  setup(props, { slots, attrs }) {
    const { toggleSheet } = useSheet()

    return () => {
      const slot = slots.default?.()
      if (!slot) return null

      const closeElement = slot[0]
      const originalClick = closeElement.props?.onClick
      
      return h(closeElement, {
        ...closeElement.props,
        onClick: (e: Event) => {
          toggleSheet()
          if (typeof originalClick === 'function') {
            originalClick(e)
          }
        }
      })
    }
  }
})

// Sheet Content component
export const SheetContent = defineComponent({
  name: 'SheetContent',
  props: {
    side: {
      type: String,
      default: 'right',
      validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value)
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { open, toggleSheet } = useSheet()

    const handleOutsideClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-sheet-content]')) return
      toggleSheet()
    }

    return () => h(Teleport, { to: 'body' }, [
      h(Transition, {
        enterActiveClass: 'transition-opacity duration-300',
        enterFromClass: 'opacity-0',
        enterToClass: 'opacity-100',
        leaveActiveClass: 'transition-opacity duration-300',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'opacity-0'
      }, {
        default: () => open.value && h('div', {
          class: 'fixed inset-0 z-50 bg-black/50',
          'aria-hidden': 'true',
          onClick: handleOutsideClick
        }, [
          h(Transition, {
            enterActiveClass: 'transition-transform duration-300 ease-in-out',
            enterFromClass: [
              props.side === 'top' ? 'translate-y-[-100%]' : '',
              props.side === 'right' ? 'translate-x-[100%]' : '',
              props.side === 'bottom' ? 'translate-y-[100%]' : '',
              props.side === 'left' ? 'translate-x-[-100%]' : ''
            ].filter(Boolean).join(' '),
            enterToClass: 'translate-x-0 translate-y-0',
            leaveActiveClass: 'transition-transform duration-300 ease-in-out',
            leaveFromClass: 'translate-x-0 translate-y-0',
            leaveToClass: [
              props.side === 'top' ? 'translate-y-[-100%]' : '',
              props.side === 'right' ? 'translate-x-[100%]' : '',
              props.side === 'bottom' ? 'translate-y-[100%]' : '',
              props.side === 'left' ? 'translate-x-[-100%]' : ''
            ].filter(Boolean).join(' ')
          }, {
            default: () => h('div', {
              class: cn(
                'fixed z-50 bg-white p-6 shadow-lg transition ease-in-out flex flex-col',
                props.side === 'top' ? 'inset-x-0 top-0 border-b max-h-[80vh] overflow-auto' : '',
                props.side === 'right' ? 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm' : '',
                props.side === 'bottom' ? 'inset-x-0 bottom-0 border-t max-h-[80vh] overflow-auto' : '',
                props.side === 'left' ? 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm' : '',
                props.className
              ),
              'data-sheet-content': true
            }, slots.default?.())
          })
        ])
      })
    ])
  }
})

// Sheet Header component
export const SheetHeader = defineComponent({
  name: 'SheetHeader',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn('flex flex-col space-y-2 text-center sm:text-left', props.className)
    }, slots.default?.())
  }
})

// Sheet Title component
export const SheetTitle = defineComponent({
  name: 'SheetTitle',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('h2', {
      class: cn('text-lg font-semibold', props.className)
    }, slots.default?.())
  }
})

// Sheet Description component
export const SheetDescription = defineComponent({
  name: 'SheetDescription',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('p', {
      class: cn('text-sm text-gray-500', props.className)
    }, slots.default?.())
  }
})

// Sheet Footer component
export const SheetFooter = defineComponent({
  name: 'SheetFooter',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', props.className)
    }, slots.default?.())
  }
}) 
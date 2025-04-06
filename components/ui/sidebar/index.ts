import { defineComponent, h, ref, provide, inject, computed, watch, onMounted, Ref } from 'vue'
import { cn } from '../../../lib/utils'

// Sidebar context
const SidebarContext = Symbol('SidebarContext')

export interface SidebarContextValue {
  open: Ref<boolean>
  toggleSidebar: () => void
  collapsed: Ref<boolean>
  collapsible: Ref<string | boolean>
}

// Hook to use the sidebar context
export function useSidebar(): SidebarContextValue {
  const context = inject<SidebarContextValue>(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

// SidebarProvider component
export const SidebarProvider = defineComponent({
  name: 'SidebarProvider',
  props: {
    open: {
      type: Boolean,
      default: undefined
    },
    defaultOpen: {
      type: Boolean,
      default: true
    },
    collapsible: {
      type: [String, Boolean],
      default: false
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const controlled = computed(() => props.open !== undefined)
    const openState = ref(controlled.value ? !!props.open : props.defaultOpen)
    const collapsedState = ref(props.defaultCollapsed)
    const collapsibleState = ref(props.collapsible)

    watch(() => props.open, (value) => {
      if (controlled.value && value !== undefined) {
        openState.value = value
      }
    })

    const toggleSidebar = () => {
      const newValue = !openState.value
      if (controlled.value) {
        emit('update:open', newValue)
      } else {
        openState.value = newValue
      }
    }

    // Provide the sidebar context
    provide(SidebarContext, {
      open: openState,
      toggleSidebar,
      collapsed: collapsedState,
      collapsible: collapsibleState
    })

    return () => slots.default?.()
  }
})

// Sidebar component
export const Sidebar = defineComponent({
  name: 'Sidebar',
  props: {
    className: {
      type: String,
      default: ''
    },
    collapsible: {
      type: [String, Boolean],
      default: false
    }
  },
  setup(props, { slots }) {
    // Try to use external sidebar context, but don't fail if not available
    let open = ref(true);
    let collapsible = ref(props.collapsible);
    let contextAvailable = true;
    
    try {
      const context = useSidebar();
      open = context.open;
      collapsible = context.collapsible;
      
      // Set collapsible state if it's provided at this level
      if (props.collapsible) {
        collapsible.value = props.collapsible;
      }
    } catch (error) {
      // Create local state if no context is available
      contextAvailable = false;
      console.warn('No SidebarProvider found, using local state');
    }

    return () => h('aside', {
      'data-open': open.value,
      'data-collapsible': collapsible.value,
      class: cn(
        'group flex h-full flex-col overflow-hidden bg-sidebar-background text-sidebar-foreground',
        'border-r border-sidebar-border data-[open=false]:w-0',
        collapsible.value === 'icon' ? 'data-[collapsible=icon]:w-16 data-[collapsible=icon]:data-[open=true]:w-64 transition-[width] duration-300' : '',
        collapsible.value === 'collapsed' ? 'data-[collapsible=collapsed]:w-16 data-[collapsible=collapsed]:data-[open=true]:w-64 transition-[width] duration-300' : '',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarHeader component
export const SidebarHeader = defineComponent({
  name: 'SidebarHeader',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'flex h-14 items-center border-b border-sidebar-border px-4',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarContent component
export const SidebarContent = defineComponent({
  name: 'SidebarContent',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'flex-1 overflow-auto',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarFooter component
export const SidebarFooter = defineComponent({
  name: 'SidebarFooter',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'mt-auto border-t border-sidebar-border p-4',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarGroup component
export const SidebarGroup = defineComponent({
  name: 'SidebarGroup',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'px-2 py-4',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarGroupLabel component
export const SidebarGroupLabel = defineComponent({
  name: 'SidebarGroupLabel',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    // Try to use context, but provide fallback
    let collapsible = ref<string | boolean>(false);
    
    try {
      const context = useSidebar();
      collapsible = context.collapsible;
    } catch (error) {
      // Use default if no context available
    }
    
    return () => h('div', {
      class: cn(
        'mb-2 px-2 text-xs font-semibold tracking-tight',
        'group-data-[collapsible=icon]:text-center group-data-[collapsible=icon]:text-[0.625rem]',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarGroupContent component
export const SidebarGroupContent = defineComponent({
  name: 'SidebarGroupContent',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'space-y-1',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarMenu component
export const SidebarMenu = defineComponent({
  name: 'SidebarMenu',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('nav', {
      class: cn(
        'grid gap-1',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarMenuItem component
export const SidebarMenuItem = defineComponent({
  name: 'SidebarMenuItem',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      role: 'none',
      class: cn(
        'group flex items-center justify-between rounded-md',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarMenuButton component
export const SidebarMenuButton = defineComponent({
  name: 'SidebarMenuButton',
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    // Try to use context, but provide fallback
    let collapsible = ref<string | boolean>(false);
    
    try {
      const context = useSidebar();
      collapsible = context.collapsible;
    } catch (error) {
      // Use default if no context available
    }

    const Element = props.asChild ? 'slot' : 'button'
    
    if (Element === 'slot' && !slots.default) {
      console.warn('SidebarMenuButton: asChild prop was passed without a child component.')
      return () => null
    }

    return () => {
      const slotContent = slots.default?.()
      
      if (props.asChild && slotContent) {
        // Get the first child from the slot
        const child = Array.isArray(slotContent) ? slotContent[0] : slotContent
        
        // Clone the child element with added props
        return h(child, {
          role: 'menuitem',
          'data-active': props.active,
          class: cn(
            'peer/menu-button group/menu-button flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
            'group-data-[collapsible=icon]:justify-center',
            child.props?.className,
            props.className
          )
        })
      }
      
      return h('button', {
        role: 'menuitem',
        'data-active': props.active,
        class: cn(
          'peer/menu-button group/menu-button flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
          'group-data-[collapsible=icon]:justify-center',
          props.className
        )
      }, slots.default?.())
    }
  }
})

// SidebarMenuAction component
export const SidebarMenuAction = defineComponent({
  name: 'SidebarMenuAction',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('button', {
      class: cn(
        'flex h-7 w-7 items-center justify-center rounded opacity-0 transition-opacity hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'group-hover:opacity-100',
        'focus:opacity-100',
        props.className
      )
    }, slots.default?.())
  }
})

// SidebarSeparator component
export const SidebarSeparator = defineComponent({
  name: 'SidebarSeparator',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => h('hr', {
      class: cn(
        'my-2 border-sidebar-border',
        props.className
      )
    })
  }
})

// SidebarTrigger component
export const SidebarTrigger = defineComponent({
  name: 'SidebarTrigger',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    // Default toggle function that does nothing
    let toggleSidebar = () => {
      console.warn('No SidebarProvider found for SidebarTrigger')
    }
    
    try {
      const context = useSidebar()
      toggleSidebar = context.toggleSidebar
    } catch (error) {
      // Use default if no context available
    }

    return () => h('button', {
      onClick: toggleSidebar,
      class: cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent',
        props.className
      )
    }, slots.default || (() => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      h('path', { d: 'M3 12h18' }),
      h('path', { d: 'M3 6h18' }),
      h('path', { d: 'M3 18h18' })
    ])))
  }
})

// SidebarRail component
export const SidebarRail = defineComponent({
  name: 'SidebarRail',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    // Default toggle function that does nothing
    let toggleSidebar = () => {
      console.warn('No SidebarProvider found for SidebarRail')
    }
    
    try {
      const context = useSidebar()
      toggleSidebar = context.toggleSidebar
    } catch (error) {
      // Use default if no context available
    }

    return () => h('div', {
      class: cn(
        'absolute right-0 top-0 h-full w-2 cursor-col-resize border-l border-sidebar-border opacity-0 transition-opacity group-hover:opacity-100',
        props.className
      ),
      onClick: toggleSidebar
    }, slots.default?.())
  }
}) 
import { defineComponent, h, provide, inject, computed, ref, watch, Teleport, Ref, Component } from 'vue'
import { cn } from '../../../lib/utils'

// Sidebar context
interface SidebarContextValue {
  isOpen: Ref<boolean>;
  toggleSidebar: () => void;
  collapsibleState: Ref<CollapsibleState>;
}

const SidebarContext = Symbol('SidebarContext')

// Types
export type CollapsibleState = 'visible' | 'icon' | 'hidden'

export const useSidebar = (): SidebarContextValue => {
  const context = inject<SidebarContextValue | undefined>(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

// SidebarProvider
export const SidebarProvider = defineComponent({
  name: 'SidebarProvider',
  props: {
    open: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:open'],
  setup(props, { slots, emit }) {
    const isOpen = ref(props.open)

    watch(() => props.open, (newValue) => {
      isOpen.value = newValue
    })

    const toggleSidebar = () => {
      isOpen.value = !isOpen.value
      emit('update:open', isOpen.value)
    }

    const collapsibleState = computed<CollapsibleState>(() => {
      return isOpen.value ? 'visible' : 'icon'
    })

    // Provide sidebar context
    provide<SidebarContextValue>(SidebarContext, {
      isOpen,
      toggleSidebar,
      collapsibleState
    })

    return () => h('div', { class: 'flex h-screen' }, slots.default?.())
  }
})

// Sidebar
export const Sidebar = defineComponent({
  name: 'Sidebar',
  props: {
    collapsible: {
      type: String,
      default: 'visible',
      validator: (value: string) => ['visible', 'icon', 'hidden'].includes(value)
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { isOpen, collapsibleState } = useSidebar()

    const sidebarClasses = computed(() => {
      return cn(
        'group/sidebar bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]',
        'border-r border-[hsl(var(--sidebar-border))] h-screen',
        'flex flex-col overflow-hidden transition-all duration-300',
        isOpen.value ? 'w-64' : 'w-[4.5rem]',
        props.class
      )
    })

    return () => h('aside', {
      class: sidebarClasses.value,
      'data-collapsible': collapsibleState.value
    }, slots.default?.())
  }
})

// SidebarHeader
export const SidebarHeader = defineComponent({
  name: 'SidebarHeader',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'h-14 flex items-center gap-2 px-4 border-b border-[hsl(var(--sidebar-border))]',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarFooter
export const SidebarFooter = defineComponent({
  name: 'SidebarFooter',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'mt-auto p-4 border-t border-[hsl(var(--sidebar-border))]',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarContent
export const SidebarContent = defineComponent({
  name: 'SidebarContent',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'flex-1 overflow-auto py-2',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarGroup
export const SidebarGroup = defineComponent({
  name: 'SidebarGroup',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'px-2 py-2',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarGroupLabel
export const SidebarGroupLabel = defineComponent({
  name: 'SidebarGroupLabel',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { isOpen } = useSidebar()

    return () => h('div', {
      class: cn(
        'text-xs uppercase font-semibold text-[hsl(var(--sidebar-foreground))] opacity-60 px-2 mb-2',
        isOpen.value ? 'block' : 'hidden',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarGroupContent
export const SidebarGroupContent = defineComponent({
  name: 'SidebarGroupContent',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'space-y-1',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarMenu
export const SidebarMenu = defineComponent({
  name: 'SidebarMenu',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('nav', {
      class: cn(
        'space-y-1',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarMenuItem
export const SidebarMenuItem = defineComponent({
  name: 'SidebarMenuItem',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'group/menu-item relative flex items-center',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarMenuButton
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
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { isOpen } = useSidebar()

    const buttonClasses = computed(() => {
      return cn(
        'group/menu-button peer/menu-button relative flex w-full cursor-pointer items-center rounded-md px-2 py-2',
        'hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]',
        props.active && 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]',
        props.class
      )
    })

    if (props.asChild) {
      return () => {
        const child = slots.default?.()[0]
        if (!child) return null

        return h(child.type, {
          ...child.props,
          class: buttonClasses.value,
          'data-active': props.active
        }, {
          default: () => child.children?.default?.()
        })
      }
    }

    return () => h('button', {
      class: buttonClasses.value,
      'data-active': props.active
    }, [
      slots.default?.()
    ])
  }
})

// SidebarMenuAction
export const SidebarMenuAction = defineComponent({
  name: 'SidebarMenuAction',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const { isOpen } = useSidebar()

    return () => h('button', {
      class: cn(
        'absolute right-2 flex h-6 w-6 items-center justify-center rounded-md opacity-0',
        'text-[hsl(var(--sidebar-foreground))]',
        'hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]',
        'focus:opacity-100',
        'group-hover/menu-item:opacity-100',
        isOpen.value ? 'visible' : 'hidden',
        props.class
      )
    }, slots.default?.())
  }
})

// SidebarSeparator
export const SidebarSeparator = defineComponent({
  name: 'SidebarSeparator',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => h('div', {
      class: cn(
        'my-2 h-px bg-[hsl(var(--sidebar-border))]',
        props.class
      )
    })
  }
})

// SidebarTrigger
export const SidebarTrigger = defineComponent({
  name: 'SidebarTrigger',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { toggleSidebar } = useSidebar()

    return () => h('button', {
      class: cn(
        'flex h-10 w-10 items-center justify-center rounded-md',
        'text-[hsl(var(--sidebar-foreground))]',
        'hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]',
        props.class
      ),
      onClick: toggleSidebar
    }, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '20',
        height: '20',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('path', { d: 'M3 12h18M3 6h18M3 18h18' })
      ])
    ])
  }
})

// SidebarRail
export const SidebarRail = defineComponent({
  name: 'SidebarRail',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { toggleSidebar } = useSidebar()

    return () => h('div', {
      class: cn(
        'absolute bottom-4 right-0 translate-x-1/2 cursor-pointer rounded-full border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))] p-1 shadow-md',
        props.class
      ),
      onClick: toggleSidebar
    }, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '16',
        height: '16',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('path', { d: 'M15 18l-6-6 6-6' })
      ])
    ])
  }
}) 
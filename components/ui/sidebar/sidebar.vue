<script setup lang="ts">
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from './index'

// Re-export all components so they can be imported from this file
defineExpose({
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
})
</script>

<template>
  <slot />
</template>

<style>
/*
 * These styles will be injected into the page when any component is used.
 * Components will use CSS variables to customize their appearance.
 */
.bg-sidebar-background {
  background-color: hsl(var(--sidebar-background));
}

.text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}

.bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}

.text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}

.border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
</style> 
<script setup lang="ts">
import { SidebarProvider } from '../components/ui/sidebar'
import Navbar from '../components/Navbar.vue'
import AppSidebar from '../components/AppSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <div class="flex h-screen overflow-hidden bg-gray-50">
      <!-- Sidebar -->
      <AppSidebar />
      
      <!-- Main content -->
      <div class="flex flex-col flex-1 w-full overflow-hidden">
        <!-- Navbar -->
        <Navbar />
        
        <!-- Page content -->
        <main class="flex-1 overflow-auto">
          <div class="container p-4 mx-auto">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>

<style>
/* Add custom styles for the sidebar */
:root {
  --sidebar-background: 0 0% 100%;
  --sidebar-foreground: 222.2 47.4% 11.2%;
  --sidebar-primary: 221.2 83.2% 53.3%;
  --sidebar-primary-foreground: 210 40% 98%;
  --sidebar-accent: 210 40% 96.1%;
  --sidebar-accent-foreground: 222.2 47.4% 11.2%;
  --sidebar-border: 214.3 31.8% 91.4%;
  --sidebar-ring: 221.2 83.2% 53.3%;
}

.dark {
  --sidebar-background: 222.2 84% 4.9%;
  --sidebar-foreground: 210 40% 98%;
  --sidebar-primary: 217.2 91.2% 59.8%;
  --sidebar-primary-foreground: 222.2 47.4% 11.2%;
  --sidebar-accent: 217.2 32.6% 17.5%;
  --sidebar-accent-foreground: 210 40% 98%;
  --sidebar-border: 217.2 32.6% 17.5%;
  --sidebar-ring: 224.3 76.3% 48%;
}

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
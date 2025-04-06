<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
// Add viewport meta tag for proper mobile rendering
export default {
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
    ]
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
  overflow: hidden; /* Prevent body scrollbars */
}

#__nuxt {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.app-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevent overflow in flex children */
}

:root {
  /* Sidebar colors */
  --sidebar-background: 0 0% 100%;
  --sidebar-foreground: 222.2 84% 4.9%;
  --sidebar-accent: 214.3 100% 98%;
  --sidebar-accent-foreground: 222.2 47.4% 11.2%;
  --sidebar-border: 214.3 31.8% 91.4%;
}

/* Custom scrollbar styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.4) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 0.4);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(148, 163, 184, 0.6);
}

/* Small devices scrollbar adjustments */
@media (max-width: 768px) {
  .custom-scrollbar::-webkit-scrollbar {
    width: 3px;
  }
}

/* Fix for iOS fixed position issues */
@supports (-webkit-touch-callout: none) {
  .fixed {
    position: fixed;
    /* Add iOS specific CSS for hardware acceleration and smoother experience */
    -webkit-backface-visibility: hidden;
  }
}
</style>
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0)
  const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 768 : false)

  function handleResize() {
    width.value = window.innerWidth
    height.value = window.innerHeight
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    // Initial call to set values
    handleResize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { width, height, isMobile }
} 
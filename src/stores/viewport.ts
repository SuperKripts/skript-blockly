import { defineStore } from 'pinia'
import { ref } from 'vue'

const MOBILE_MEDIA_QUERY = '(max-width: 768px)'

export const useViewportStore = defineStore('viewport', () => {
  const isMobile = ref(false)

  function init() {
    const mediaQuery = globalThis.matchMedia(MOBILE_MEDIA_QUERY)
    isMobile.value = mediaQuery.matches
    mediaQuery.addEventListener('change', (event) => {
      isMobile.value = event.matches
    })
  }

  if (globalThis.window) {
    init()
  }

  return {
    isMobile,
  }
})

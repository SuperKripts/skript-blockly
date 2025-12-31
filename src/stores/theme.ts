import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const CURRENT_THEME_KEY = 'skriptblockly-theme-override'
  const override = ref<boolean | null>(null)
  const isDark = ref(false)

  function init() {
    const saved = localStorage.getItem(CURRENT_THEME_KEY)
    if (saved) {
      override.value = saved === 'true'
    } else {
      const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', () => {
        if (override.value) updateTheme()
      })
    }

    updateTheme()

    watch(override, updateTheme)
    watch(
      isDark,
      (dark) => {
        document.documentElement.classList.toggle('dark', dark)
      },
      { immediate: true },
    )
  }

  function updateTheme() {
    isDark.value = override.value ?? globalThis.matchMedia('(prefers-color-scheme: dark)').matches
  }

  function toggle() {
    override.value = !isDark.value
    localStorage.setItem(CURRENT_THEME_KEY, String(override.value))
    updateTheme()
  }

  if (globalThis.window) {
    init()
  }

  return {
    isDark,
    toggle,
  }
})

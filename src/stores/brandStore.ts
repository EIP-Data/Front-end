import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useBrandStore = defineStore('brand', () => {
  const appName = ref(import.meta.env.VITE_APP_NAME || 'Datalyz')
  const primaryColor = ref(import.meta.env.VITE_PRIMARY_COLOR || '#F9AB3B')

  function applyBrandColor() {
    document.documentElement.style.setProperty('--color-brand', primaryColor.value)
    document.documentElement.style.setProperty('--color-brand-dark', shadeColor(primaryColor.value, -10))
    document.documentElement.style.setProperty('--primary-color', primaryColor.value)
  }

  function shadeColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const r = Math.min(255, Math.max(0, (num >> 16) + amt))
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt))
    const b = Math.min(255, Math.max(0, (num & 0xff) + amt))
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
  }

  return {
    appName: readonly(appName),
    primaryColor: readonly(primaryColor),
    applyBrandColor,
  }
})

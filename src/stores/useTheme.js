import { ref } from 'vue'

const themes = ['light', 'red', 'yellow', 'dark']
const theme = ref('light')
const currentThemeIndex = ref(0)

const setTheme = (value) => {
  theme.value = value
  themes.forEach(t => {
    if (t !== 'light') {
      document.documentElement.classList.remove(t)
    }
  })
  if (value !== 'light') {
    document.documentElement.classList.add(value)
  }
}

const getNextTheme = () => {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length
  return themes[currentThemeIndex.value]
}

setTheme(theme.value)

export function useTheme() {
  return { theme, setTheme, getNextTheme, themes }
}

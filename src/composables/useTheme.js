// src/composables/useTheme.js
//
// Тёмная тема: и то, и другое —
//  1) по умолчанию подстраивается под системные настройки устройства
//     (prefers-color-scheme), автоматически обновляется "на лету",
//     если пользователь переключит тему в ОС прямо во время просмотра сайта;
//  2) если пользователь сам нажал кнопку-переключатель — его выбор
//     запоминается в localStorage и дальше имеет приоритет над системой,
//     пока он не нажмёт "Сбросить" (вернуться к авто).
//
// Переключение реализовано через класс .dark на <html> (см. main.css,
// там это общий слой dark:-переопределений).

import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'hasapp_theme' // 'light' | 'dark' | null (null = авто по системе)

const stored = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
})()

const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null
const systemPrefersDark = ref(media ? media.matches : false)

// override: null = следуем системе, 'light'/'dark' = пользователь выбрал вручную
const override = ref(stored === 'light' || stored === 'dark' ? stored : null)

const isDark = ref(override.value ? override.value === 'dark' : systemPrefersDark.value)

function applyClass(dark) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', dark)
}

watchEffect(() => {
  isDark.value = override.value ? override.value === 'dark' : systemPrefersDark.value
  applyClass(isDark.value)
})

if (media) {
  media.addEventListener('change', (e) => {
    systemPrefersDark.value = e.matches
  })
}

function setTheme(mode) {
  // mode: 'light' | 'dark' | 'auto'
  if (mode === 'auto') {
    override.value = null
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // приватный режим / localStorage недоступен — просто не сохранится
    }
    return
  }
  override.value = mode
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // приватный режим / localStorage недоступен — просто не сохранится
  }
}

function toggleTheme() {
  setTheme(isDark.value ? 'light' : 'dark')
}

export function useTheme() {
  return { isDark, isAuto: () => override.value === null, setTheme, toggleTheme }
}

// вызывается один раз при старте приложения (main.js), ДО монтирования —
// чтобы класс .dark уже стоял на <html> в момент первой отрисовки и не было
// мигания светлой темой на тёмных системах
export function initTheme() {
  applyClass(isDark.value)
}

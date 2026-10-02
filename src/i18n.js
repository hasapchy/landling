import { createI18n } from 'vue-i18n'
import tm from './locales/tm.json'
import ru from './locales/ru.json'
import en from './locales/en.json'

const LOCALE_KEY = 'hasapp_locale'

function getSavedLocale() {
  try {
    return localStorage.getItem(LOCALE_KEY)
  } catch {
    return null
  }
}

export default createI18n({
  legacy: false,          // используем Composition API
  locale: getSavedLocale() || 'ru',           // язык по умолчанию — рынок Туркменистана
  fallbackLocale: 'tm',
  messages: { tm, ru, en }
})
import { createI18n } from 'vue-i18n'
import tm from './locales/tm.json'
import ru from './locales/ru.json'
import en from './locales/en.json'

export default createI18n({
  legacy: false,          // используем Composition API
  locale: 'ru',           // язык по умолчанию — рынок Туркменистана
  fallbackLocale: 'ru',
  messages: { tm, ru, en }
})
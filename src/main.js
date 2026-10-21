import { createApp } from 'vue'
// import { createHead } from '@unhead/vue'
import App from './App.vue'
import './assets/main.css'
import i18n from './i18n'
import { initTheme } from './composables/useTheme'

// ставим класс .dark на <html> ДО монтирования — иначе на тёмных системах
// страница на долю секунды мигнёт светлой темой при загрузке
initTheme()

const app = createApp(App)


app.use(i18n)
app.mount('#app')
import { createApp } from 'vue'
// import { createHead } from '@unhead/vue' 
import App from './App.vue'
import './assets/main.css'
import i18n from './i18n'
// createApp(App).use(i18n).mount('#app')
const app = createApp(App)

 
app.use(i18n)
app.mount('#app')

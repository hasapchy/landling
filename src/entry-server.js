// src/entry-server.js
//
// Используется ТОЛЬКО при сборке (npm run build): рендерит страницу сайта в
// обычный HTML-текст, чтобы поисковики видели содержимое без выполнения
// JavaScript. В браузере этот файл не загружается.
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import i18n from './i18n'

export async function render(path) {
  globalThis.__SSR_PATH__ = path
  i18n.global.locale.value = 'ru' // в HTML для поисковиков — русская версия
  const app = createSSRApp(App)
  app.use(i18n)
  return renderToString(app)
}

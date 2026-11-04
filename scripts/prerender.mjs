// scripts/prerender.mjs
//
// Запускается после сборки (см. "build" в package.json).
// Берёт готовый dist/index.html и вставляет в него отрендеренный текст
// страницы, чтобы он был виден в HTML без JavaScript:
//   /         -> dist/index.html
//   /privacy  -> dist/privacy.html
// Затем dist-ssr (служебная сборка) удаляется.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = resolve(root, 'dist')
const SITE_URL = 'https://hasapp.online'

const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const ru = JSON.parse(readFileSync(resolve(root, 'src/locales/ru.json'), 'utf-8'))

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')
if (!template.includes('<div id="app"></div>')) {
  throw new Error('prerender: в dist/index.html не найден <div id="app"></div>')
}

// на случай, если у посетителя отключён JavaScript: показываем блоки сразу
const noscript = '<noscript><style>#app *{opacity:1!important;transform:none!important;visibility:visible!important}</style></noscript>'

function page(html) {
  return template.replace('<div id="app"></div>', `<div id="app">${html}</div>${noscript}`)
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// --- главная ---
const home = await render('/')
writeFileSync(resolve(dist, 'index.html'), page(home))

// --- /privacy: свой title, canonical и og:url ---
const privacyTitle = esc(`${ru.privacy.title} — HasApp`)
let privacy = page(await render('/privacy'))
privacy = privacy
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${privacyTitle}</title>`)
  .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${privacyTitle}$2`)
  .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${privacyTitle}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE_URL}/privacy$2`)
  .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE_URL}/privacy$2`)
writeFileSync(resolve(dist, 'privacy.html'), privacy)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: index.html (${home.length} симв.) и privacy.html готовы`)

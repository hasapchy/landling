// scripts/prerender.mjs
//
// Запускается после сборки (см. "build" в package.json).
// Берёт готовый dist/index.html и вставляет в него отрендеренный текст
// страницы, чтобы он был виден в HTML без JavaScript:
//   /         -> dist/index.html
//   /privacy  -> dist/privacy.html
//   /sklad, /crm и т.д. (список в src/pages/seoPages.js) -> dist/sklad.html, dist/crm.html
// На главную добавляется разметка Schema.org (JSON-LD): Organization,
// SoftwareApplication и FAQPage — из тех же данных, что и сам сайт
// (ru.json и src/config/contacts.js), поэтому с текстом на странице она не расходится.
// Затем dist-ssr (служебная сборка) удаляется.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = resolve(root, 'dist')
const SITE_URL = 'https://hasapp.online'

const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const { CONTACTS } = await import(pathToFileURL(resolve(root, 'src/config/contacts.js')).href)
const { SEO_PAGES, getSeoPage } = await import(pathToFileURL(resolve(root, 'src/pages/seoPages.js')).href)
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

// ---------- Schema.org (JSON-LD) ----------
// ВАЖНО: цены тарифов (коробочное решение, разовая лицензия) дублируют planMeta в
// src/sections/Pricing.vue. Если меняешь цены там — поменяй и здесь.
const PLAN_PRICES = [20000, 40000]

const phoneDigits = (href) => String(href).replace(/^tel:/, '')
const mailAddress = String(CONTACTS.emailHref || '').replace(/^mailto:/, '') || CONTACTS.email
const sameAs = [CONTACTS.instagram, CONTACTS.telegram, CONTACTS.linkedin].filter((u) => /^https?:\/\//.test(u || ''))

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'HasApp',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  description: ru.footer.description,
  email: mailAddress,
  telephone: [phoneDigits(CONTACTS.phoneHref), phoneDigits(CONTACTS.phone2Href)],
  address: {
    '@type': 'PostalAddress',
    streetAddress: ru.contactModal.address,
    addressLocality: 'Ашхабад',
    addressCountry: 'TM',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: phoneDigits(CONTACTS.phoneHref),
    email: mailAddress,
    availableLanguage: ['ru', 'en', 'tk'],
  },
  ...(sameAs.length ? { sameAs } : {}),
}

const softwareApplication = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: 'HasApp',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/og-cover.jpg`,
  description: ru.seo.description,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  inLanguage: ['ru', 'en', 'tk'],
  publisher: { '@id': `${SITE_URL}/#organization` },
  offers: ru.pricing.plans.slice(0, PLAN_PRICES.length).map((plan, i) => ({
    '@type': 'Offer',
    name: plan.name,
    description: plan.description,
    price: String(PLAN_PRICES[i]),
    priceCurrency: 'TMT',
    url: `${SITE_URL}/`,
  })),
}

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: ru.faq.items.map((it) => ({
    '@type': 'Question',
    name: it.question,
    acceptedAnswer: { '@type': 'Answer', text: it.answer },
  })),
}

const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization, softwareApplication, faqPage] })
  .replace(/</g, '\\u003c')
const ldTag = `<script type="application/ld+json">${jsonLd}</script>`

// --- главная ---
const home = await render('/')
writeFileSync(
  resolve(dist, 'index.html'),
  page(home).replace('</head>', () => `${ldTag}\n  </head>`),
)

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

// --- отдельные страницы под запросы: свой title, description, canonical и разметка FAQ ---
const seoPaths = Object.keys(SEO_PAGES)
for (const path of seoPaths) {
  const p = getSeoPage(path, 'ru', ru, ru)
  const title = esc(p.title)
  const desc = esc(p.description)
  const url = `${SITE_URL}${path}`
  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: (p.faq || []).map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'HasApp', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: p.badge, item: url },
        ],
      },
    ],
  }).replace(/</g, '\\u003c')
  const html = page(await render(path))
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => `${a}${desc}${b}`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, a, b) => `${a}${title}${b}`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, a, b) => `${a}${desc}${b}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, (_, a, b) => `${a}${title}${b}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, (_, a, b) => `${a}${desc}${b}`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, a, b) => `${a}${url}${b}`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => `${a}${url}${b}`)
    .replace('</head>', () => `<script type="application/ld+json">${faqLd}</script>\n  </head>`)
  writeFileSync(resolve(dist, `${path.replace(/^\//, '')}.html`), html)
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: index.html (${home.length} симв.) privacy.html и ${seoPaths.length} стр. под запросы готовы; JSON-LD: ${ldTag.length} симв.`)

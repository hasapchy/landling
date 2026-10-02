// src/composables/useSeo.js
//
// Реактивно обновляет <title> и meta-теги при смене языка (i18n.locale),
// БЕЗ внешних библиотек (@unhead/vue и т.п.) — просто напрямую через document.
//
// Использование (один раз, например в App.vue):
//
//   import { useSeo } from '@/composables/useSeo'
//   useSeo()

import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const SITE_URL = 'https://hasapp.example' // TODO: заменить на реальный домен
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSeo() {
  const { t, locale } = useI18n()

  watchEffect(() => {
    const title = t('seo.title')
    const description = t('seo.description')
    const ogLocale = locale.value === 'ru' ? 'ru_RU' : 'en_US'

    document.title = title
    document.documentElement.setAttribute('lang', locale.value)

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:url', SITE_URL)
    setMeta('property', 'og:locale', ogLocale)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', OG_IMAGE)
  })
}
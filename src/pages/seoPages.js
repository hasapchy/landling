// Страницы под поисковые запросы (/sklad, /crm и т.д.).
// ВСЕ ТЕКСТЫ (title, description, заголовки, FAQ) лежат в языковых файлах src/locales/*.json:
//   seoPages['/sklad'] — тексты страницы и SEO, seoUi.sklad — надписи внутри анимаций и кнопки.
// Здесь — только служебное: какая вёрстка у страницы, иконки, ключи картинок, цены и число пользователей.
// Порядок элементов в массивах совпадает с порядком в языковых файлах.
export const SEO_PAGES = {
  '/sklad': {
    layout: 'sklad',
    why: [{ icon: 'window' }, { icon: 'sheet' }, { icon: 'live' }, { icon: 'tag' }],
    caps: [{ icon: 'in' }, { icon: 'cart' }, { icon: 'out' }, { icon: 'undo' }, { icon: 'check' }, { icon: 'bars' }],
    blocks: [{ key: 'in' }, { key: 'out' }, { key: 'inv' }],
  },
  '/crm': {
    layout: 'crm',
    bento: [{ key: 'funnel' }, { key: 'mail' }, { key: 'widgets' }, { key: 'ai' }, { key: 'flex' }],
  },
  '/finance': {
    layout: 'finance',
    bento: [{ key: 'cash' }, { key: 'currency' }, { key: 'company' }, { key: 'widgets' }, { key: 'rights' }],
  },
  '/zakazy': { layout: 'zakazy' },
  '/personal': {
    layout: 'personal',
    bento: [{ key: 'time' }, { key: 'salary' }, { key: 'org' }, { key: 'vacation' }, { key: 'device' }],
  },
  '/zadachi': {
    layout: 'zadachi',
    bento: [{ key: 'board' }, { key: 'progress' }, { key: 'reports' }, { key: 'chat' }],
  },
  '/tarify': {
    layout: 'tarify',
    plans: [{ key: 'basic', users: 10, price: 20000 }, { key: 'standard', users: 50, price: 40000, popular: true }],
    included: [{ icon: 'key' }, { icon: 'box' }, { icon: 'cap' }, { icon: 'shield' }],
    years: [{ free: true }, { free: false }, { free: false }],
    modules: [{ icon: 'chart' }, { icon: 'coins' }, { icon: 'box' }, { icon: 'tasks' }, { icon: 'people' }, { icon: 'chat' }, { icon: 'folder' }, { icon: 'sliders' }],
    modes: [{ icon: 'server' }, { icon: 'cloud' }],
  },
}

// перевод поверх русского: строки заменяются, массивы объединяются по номеру элемента;
// чего нет в en/tm — берётся из ru.json
function overlay(base, over) {
  if (over === undefined || over === null) return base
  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return base
    return base.map((b, i) => overlay(b, over[i]))
  }
  if (base && typeof base === 'object') {
    const out = { ...base }
    for (const k of Object.keys(over)) out[k] = k in base ? overlay(base[k], over[k]) : over[k]
    return out
  }
  return typeof over === typeof base ? over : base
}

// добавляет к текстам служебные поля отсюда (иконки, цены и т.п.)
function withMeta(text, meta) {
  if (meta === undefined || meta === null) return text
  if (Array.isArray(meta)) return (Array.isArray(text) ? text : []).map((t, i) => withMeta(t, meta[i]))
  if (typeof meta === 'object') {
    const out = { ...(text || {}) }
    for (const k of Object.keys(meta)) out[k] = withMeta(out[k], meta[k])
    return out
  }
  return meta
}

const cache = {}

// messages — сообщения выбранного языка, ruMessages — русские (запасной вариант)
export function getSeoPage(path, locale, messages, ruMessages) {
  const meta = SEO_PAGES[path]
  if (!meta) return null
  const key = locale + path
  if (!cache[key]) {
    const ru = (ruMessages && ruMessages.seoPages && ruMessages.seoPages[path]) || {}
    const loc = (messages && messages.seoPages && messages.seoPages[path]) || null
    cache[key] = withMeta(locale === 'ru' ? ru : overlay(ru, loc), meta)
  }
  return cache[key]
}

// надписи внутри анимаций и кнопки страницы (seoUi.<страница> в языковом файле)
export function seoUi(key, locale, getMessage) {
  const m = getMessage(locale)
  const ru = getMessage('ru')
  return (m && m.seoUi && m.seoUi[key]) || (ru && ru.seoUi && ru.seoUi[key]) || {}
}
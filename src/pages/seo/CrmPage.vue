<template>
  <main class="overflow-x-clip">
    <!-- ===== первый экран: текст слева, живая воронка справа ===== -->
    <section class="relative pt-[96px] sm:pt-28 md:pt-32 px-4 sm:px-8 pb-12 sm:pb-20 w-full max-w-[1280px] mx-auto">
      <div :class="GLOW_A" aria-hidden="true"></div>
      <div :class="GLOW_B" style="animation-delay:-6s" aria-hidden="true"></div>

      <div class="relative z-[2] grid items-center gap-10 lg:gap-14 lg:grid-cols-[1fr_1.15fr]">
        <div class="flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
          <LabelBadge :class="RISE" style="animation-delay:0ms">
            <template #icon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h14l-5.2 6.2V15l-3.6-1.8V9.2z" />
              </svg>
            </template>
            {{ page.badge }}
          </LabelBadge>
          <h1 :class="RISE" class="font-display font-bold leading-tight text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]" style="animation-delay:80ms">
            {{ page.h1 }}
          </h1>
          <p :class="RISE" class="max-w-xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.4]" style="animation-delay:160ms">{{ page.lead }}</p>
          <div :class="RISE" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4" style="animation-delay:240ms">
            <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer"
              class="btn-primary !px-6 !py-3 sm:!px-8 sm:!py-3.5 text-center no-underline">{{ t('nav.tryDemo') }}</a>
            <button type="button" @click="openContactModal" :class="BTN_GHOST">{{ u.leave }}</button>
          </div>
        </div>

        <!-- воронка сделок: карточки сами переезжают по этапам -->
        <div :class="RISE" style="animation-delay:340ms">
          <div :class="WINDOW" class="text-left">
            <div :class="WINDOW_BAR">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
              <b :class="WINDOW_TITLE">{{ u.funnel }}</b>
              <em :class="WINDOW_ONLINE"><i :class="WINDOW_DOT"></i> {{ u.online }}</em>
            </div>
            <div class="relative px-2 sm:px-3 pt-3 pb-4" :style="{ height: BOARD_H + 'px' }">
              <div class="grid grid-cols-3 gap-0 absolute inset-x-2 sm:inset-x-3 top-3 bottom-4">
                <div v-for="(c, i) in columns" :key="c.name" class="mx-[3px] rounded-2xl px-2.5 pt-2.5"
                  :class="i === 2 ? 'bg-[rgba(34,197,94,.08)]' : 'bg-[rgba(3,146,255,.06)] dark:bg-[rgba(255,255,255,.04)]'">
                  <div class="flex items-center justify-between gap-1.5 text-xs font-bold"
                    :class="i === 2 ? 'text-green-700 dark:text-green-400' : 'text-[#054C86] dark:text-[#6cb6f2]'">
                    <span>{{ c.name }}</span>
                    <b class="rounded-full px-2 py-px text-[11px]" :class="i === 2 ? 'bg-[rgba(34,197,94,.2)]' : 'bg-[rgba(3,146,255,.16)]'">{{ c.count }}</b>
                  </div>
                  <div class="mt-[3px] text-[11px] tabular-nums text-black/45 dark:text-white/50">{{ c.sum }} <small class="opacity-70">TMT</small></div>
                </div>
              </div>
              <TransitionGroup tag="div" class="absolute inset-x-2 sm:inset-x-3 top-3 bottom-4 pointer-events-none"
                enter-from-class="opacity-0 scale-[.85]" leave-to-class="opacity-0 scale-[.85]"
                leave-active-class="transition-[opacity,scale]! duration-[400ms]!">
                <div v-for="d in deals" :key="d.id"
                  class="absolute box-border rounded-xl border px-2.5 py-2 bg-[#fff] dark:bg-[#0f1f3d] transition-[top,left,box-shadow,border-color,opacity,scale] duration-[900ms] ease-[cubic-bezier(.3,.7,.2,1)]"
                  :class="hot === d.id
                    ? 'z-[2] border-[#0392FF] shadow-[0_10px_26px_rgba(3,146,255,.35)]'
                    : d.stage === 2
                      ? 'border-green-500/50 dark:border-green-400/50 shadow-[0_6px_18px_rgba(5,76,134,.12)] dark:shadow-[0_6px_18px_rgba(0,0,0,.35)]'
                      : 'border-[#0392FF]/25 dark:border-[rgba(60,140,255,.4)] shadow-[0_6px_18px_rgba(5,76,134,.12)] dark:shadow-[0_6px_18px_rgba(0,0,0,.35)]'"
                  :style="dealStyle(d)">
                  <div class="flex justify-between gap-1 text-[11px] font-semibold text-[#054C86] dark:text-[#6cb6f2]">
                    <span class="truncate">{{ d.label }}</span><i class="not-italic font-medium opacity-45">#{{ d.id }}</i>
                  </div>
                  <div class="mt-[5px] whitespace-nowrap text-[15px] font-bold tabular-nums text-[#111] dark:text-white">{{ fmt(d.amount) }} <small class="text-[10px] font-medium opacity-50">TMT</small></div>
                </div>
              </TransitionGroup>
            </div>
            <div class="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-[#0392FF]/20 text-sm">
              <span class="text-black/55 dark:text-white/55">{{ u.paid }}</span>
              <b class="text-lg tabular-nums text-green-700 dark:text-green-400">{{ fmt(Math.round(paidShown)) }} <small class="text-[11px] opacity-70">TMT</small></b>
            </div>
          </div>
          <p :class="NOTE">{{ u.note }}</p>
        </div>
      </div>
    </section>

    <!-- ===== путь сделки: горизонтальная линия ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.pathTitle }}</h2>
      <div v-reveal
        class="group relative mt-12 sm:mt-16 grid gap-[34px] text-left md:grid-cols-4 md:gap-6
          before:absolute before:left-[21px] before:top-[22px] before:bottom-[22px] before:w-[3px] before:rounded-[3px] before:bg-[rgba(3,146,255,.18)] before:content-['']
          md:before:left-[22px] md:before:right-[22px] md:before:top-[21px] md:before:bottom-auto md:before:h-[3px] md:before:w-auto
          after:absolute after:left-[21px] after:top-[22px] after:h-0 after:w-[3px] after:rounded-[3px] after:bg-[linear-gradient(180deg,#0392FF,#054C86)] after:content-[''] after:transition-[height,width] after:duration-[1800ms] after:delay-200 after:ease-[cubic-bezier(.2,.7,.2,1)]
          md:after:left-[22px] md:after:top-[21px] md:after:h-[3px] md:after:w-0 md:after:bg-[linear-gradient(90deg,#0392FF,#054C86)]
          [&.is-in]:after:h-[calc(100%-44px)] md:[&.is-in]:after:h-[3px] md:[&.is-in]:after:w-[calc(100%-44px)]
          motion-reduce:after:h-[calc(100%-44px)] md:motion-reduce:after:h-[3px] md:motion-reduce:after:w-[calc(100%-44px)]">
        <div v-for="(s, i) in page.path" :key="s.title" :class="SLIDE_Y" class="relative z-[1] pl-16 md:pl-0" :style="{ '--d': i * 320 + 'ms' }">
          <span class="absolute left-0 top-0 z-[1] flex h-11 w-11 items-center justify-center rounded-full font-bold text-white shadow-[0_8px_22px_rgba(3,146,255,.4)] md:relative" :class="GRAD">{{ i + 1 }}</span>
          <h3 class="mt-0 pt-2 md:pt-0 md:mt-4 font-display font-bold text-lg sm:text-xl text-[#054C86] dark:text-[#6cb6f2]">{{ s.title }}</h3>
          <p class="mt-1.5 text-black/65 dark:text-white/65 leading-relaxed">{{ s.text }}</p>
        </div>
      </div>
    </section>

    <!-- ===== мозаика возможностей (разные по размеру плитки) ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.bentoTitle }}</h2>

      <div class="mt-10 sm:mt-16 grid gap-3 sm:gap-4 md:grid-cols-6 text-left">
        <!-- воронка -->
        <article v-reveal :class="TILE" class="md:col-span-4 md:row-span-2">
          <h3 :class="TILE_TITLE">{{ page.bento[0].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[0].text }}</p>
          <div class="mt-6 flex flex-col gap-3.5">
            <div v-for="(f, i) in funnel" :key="f.name" :style="{ '--w': f.w + '%', '--d': i * 160 + 'ms' }">
              <span class="flex h-[58px] w-0 items-center overflow-hidden whitespace-nowrap rounded-[14px] px-4 text-[13px] font-semibold text-white bg-[linear-gradient(90deg,#0392FF,#054C86)] transition-[width] duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] [transition-delay:var(--d)] group-[.is-in]:w-[var(--w)] group-[.is-in]:[animation:crm-wide_4.2s_ease-in-out_calc(1.8s+var(--d))_infinite] motion-reduce:w-[var(--w)] motion-reduce:animate-none"><em class="not-italic">{{ f.name }}</em></span>
            </div>
          </div>
        </article>

        <!-- почта -->
        <article v-reveal :class="TILE" class="md:col-span-2" style="transition-delay:100ms">
          <h3 :class="TILE_TITLE">{{ page.bento[1].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[1].text }}</p>
          <div class="relative mt-5 flex flex-col gap-[9px]">
            <span v-for="l in mailLines" :key="l.w" :style="{ '--w': l.w, '--d': l.d }"
              class="block h-[9px] w-0 rounded-full bg-[rgba(5,76,134,.22)] dark:bg-[rgba(108,182,242,.3)] group-[.is-in]:[animation:crm-type_1.1s_steps(14,end)_var(--d)_forwards] motion-reduce:w-[var(--w)]"></span>
            <span :class="CHIP.in" class="self-start opacity-0 translate-y-1.5 group-[.is-in]:[animation:seo-slide_.6s_ease_2.5s_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0">{{ u.sent }}</span>
          </div>
        </article>

        <!-- виджеты -->
        <article v-reveal :class="TILE" class="md:col-span-2" style="transition-delay:180ms">
          <h3 :class="TILE_TITLE">{{ page.bento[2].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[2].text }}</p>
          <div class="mt-5 flex h-[92px] items-end gap-2" aria-hidden="true">
            <span v-for="(h, i) in [38, 62, 48, 80, 58, 92]" :key="i" :style="{ '--h': h + '%', '--d': i * 120 + 'ms' }"
              class="h-[8%] flex-1 origin-bottom rounded-[8px_8px_3px_3px] bg-[linear-gradient(180deg,#0392FF,#054C86)] group-[.is-in]:[animation:crm-bar_1.2s_cubic-bezier(.2,.7,.2,1)_var(--d)_forwards,crm-breath_3.6s_ease-in-out_calc(1.5s+var(--d))_infinite] motion-reduce:h-[var(--h)] motion-reduce:group-[.is-in]:animate-none"></span>
          </div>
        </article>

        <!-- ИИ -->
        <article v-reveal :class="TILE" class="md:col-span-3" style="transition-delay:100ms">
          <h3 :class="TILE_TITLE">{{ page.bento[3].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[3].text }}</p>
          <div class="mt-5 flex flex-col items-start gap-2.5">
            <div class="rounded-[16px_16px_16px_4px] bg-[rgba(3,146,255,.12)] px-3.5 py-2.5 text-sm text-[#054C86] dark:bg-[rgba(3,146,255,.2)] dark:text-[#9fd0ff]">{{ u.ask }}</div>
            <div class="inline-flex gap-[5px] rounded-2xl bg-[rgba(5,76,134,.1)] px-3.5 py-[11px] dark:bg-[rgba(255,255,255,.08)]">
              <i v-for="d in [0, 150, 300]" :key="d" class="h-[7px] w-[7px] rounded-full bg-[#0392FF] [animation:crm-dot_1.2s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ animationDelay: d + 'ms' }"></i>
            </div>
          </div>
        </article>

        <!-- гибкость -->
        <article v-reveal :class="TILE" class="md:col-span-3" style="transition-delay:180ms">
          <h3 :class="TILE_TITLE">{{ page.bento[4].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[4].text }}</p>
          <ul class="mt-5 flex flex-col gap-2.5">
            <li v-for="(w, i) in u.own" :key="w" :style="{ '--d': i * 260 + 'ms' }"
              class="flex items-center justify-between rounded-xl bg-[rgba(255,255,255,.7)] px-3.5 py-2.5 text-sm font-semibold text-[#054C86] dark:bg-[rgba(255,255,255,.06)] dark:text-[#6cb6f2]">
              <span>{{ w }}</span>
              <i class="relative h-[22px] w-10 rounded-full bg-[rgba(5,76,134,.2)] transition-colors duration-[400ms] [transition-delay:var(--d)] dark:bg-[rgba(255,255,255,.2)] group-[.is-in]:bg-[#0392FF] motion-reduce:bg-[#0392FF]
                after:absolute after:left-[3px] after:top-[3px] after:h-4 after:w-4 after:rounded-full after:bg-[#fff] after:shadow-[0_2px_6px_rgba(0,0,0,.25)] after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(.3,.7,.2,1)] after:[transition-delay:var(--d)] after:content-[''] group-[.is-in]:after:translate-x-[18px] motion-reduce:after:translate-x-[18px]"></i>
            </li>
          </ul>
        </article>
      </div>
    </section>
    <!-- ===== вопросы: заголовок слева, ответы справа ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto">
      <div class="grid gap-8 lg:gap-14 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div v-reveal class="text-center lg:text-left lg:sticky lg:top-28">
          <h2 class="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-[#054C86] dark:text-[#6cb6f2] leading-tight">{{ page.faqTitle }}</h2>
          <p class="mt-4 text-black/60 dark:text-white/60">{{ u.notFound }}</p>
          <button type="button" @click="openContactModal" class="btn-primary mt-6 !px-7 !py-3 cursor-pointer">{{ u.leave }}</button>
        </div>
        <SeoFaq :items="page.faq" />
      </div>
    </section>

    <!-- ===== призыв ===== -->
    <section class="px-6 sm:px-8 pt-6 pb-16 sm:pb-24 w-full max-w-[1000px] mx-auto text-center">
      <div v-reveal :class="CTA">
        <h2 class="relative font-display font-bold text-2xl sm:text-4xl">{{ page.ctaTitle }}</h2>
        <p class="relative mt-3 max-w-xl mx-auto text-white/85 text-base sm:text-lg">{{ page.ctaText }}</p>
        <div class="relative mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer" :class="CTA_MAIN">{{ t('nav.tryDemo') }}</a>
          <button type="button" @click="openContactModal" :class="CTA_GHOST">{{ u.leave }}</button>
        </div>
        <p class="relative mt-6 text-sm text-white/70">{{ u.see }} <a href="/sklad" class="underline">{{ u.sklad }}</a> · <a href="/" class="underline">{{ u.home }}</a> · <a href="/#pricing" class="underline">{{ u.pricing }}</a></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import SeoFaq from '@/components/SeoFaq.vue'
import { H2, GRAD, RISE, GLOW_A, GLOW_B, WINDOW, WINDOW_BAR, WINDOW_TITLE, WINDOW_ONLINE, WINDOW_DOT, NOTE, CHIP, CTA, CTA_MAIN, CTA_GHOST, BTN_GHOST, SLIDE_Y } from './ui'
import { vReveal } from '@/composables/useReveal'
import { seoUi } from '@/pages/seoPages.js'

defineProps({ page: { type: Object, required: true } })
const { t, locale, getLocaleMessage } = useI18n()
// надписи страницы лежат в языковых файлах: seoUi.crm
const u = seoUi('crm', locale.value, getLocaleMessage)
const openContactModal = inject('openContactModal', () => {})

// ---------- воронка сделок (условные данные для примера) ----------
const BOARD_H = 340
const CARD_H = 70
const HEAD_H = 62
const stageNames = u.stages
const POOL = [
  { label: u.deals[0], amount: 4200 },
  { label: u.deals[1], amount: 2800 },
  { label: u.deals[2], amount: 7500 },
  { label: u.deals[3], amount: 3100 },
  { label: u.deals[4], amount: 12400 },
  { label: u.deals[5], amount: 5300 },
  { label: u.deals[6], amount: 9600 },
]
let nextId = 1040
let order = 0
let poolI = 0
const mk = (stage) => {
  const p = POOL[poolI++ % POOL.length]
  return { id: ++nextId, label: p.label, amount: p.amount, stage, order: ++order }
}
const deals = reactive([mk(2), mk(1), mk(1), mk(0), mk(0)])
const hot = ref(0)
const paid = ref(deals.filter((d) => d.stage === 2).reduce((s, d) => s + d.amount, 0) + 38400)
const paidShown = ref(paid.value)
let stepN = 0
let timer = 0
let raf = 0

const fmt = (n) => n.toLocaleString('ru-RU').replace(/ /g, ' ')

const layout = computed(() => {
  const map = new Map()
  for (let s = 0; s < 3; s++) {
    deals.filter((d) => d.stage === s).sort((a, b) => b.order - a.order).forEach((d, i) => map.set(d.id, { col: s, idx: i }))
  }
  return map
})
const columns = computed(() =>
  stageNames.map((name, s) => {
    const ds = deals.filter((d) => d.stage === s)
    return { name, count: ds.length, sum: fmt(ds.reduce((a, d) => a + d.amount, 0)) }
  }),
)
function dealStyle(d) {
  const p = layout.value.get(d.id) || { col: d.stage, idx: 0 }
  return {
    height: CARD_H - 8 + 'px',
    width: 'calc(33.333% - 10px)',
    left: 'calc(' + p.col + ' * 33.333% + 5px)',
    top: HEAD_H + p.idx * CARD_H + 'px',
  }
}

function tweenPaid() {
  cancelAnimationFrame(raf)
  const tick = () => {
    const d = paid.value - paidShown.value
    if (Math.abs(d) > 1) { paidShown.value += d * 0.1; raf = requestAnimationFrame(tick) } else paidShown.value = paid.value
  }
  raf = requestAnimationFrame(tick)
}

function oldest(stage) {
  return deals.filter((d) => d.stage === stage).sort((a, b) => a.order - b.order)[0]
}
function advance() {
  const m = stepN++ % 3
  if (m === 0) {
    const d = oldest(1)
    if (d) { d.stage = 2; d.order = ++order; hot.value = d.id; paid.value += d.amount; tweenPaid() }
  } else if (m === 1) {
    const d = oldest(0)
    if (d) { d.stage = 1; d.order = ++order; hot.value = d.id }
  } else {
    const n = mk(0)
    deals.push(n)
    hot.value = n.id
    // оплаченные «уходят», чтобы колонка не переполнялась
    const done = deals.filter((d) => d.stage === 2).sort((a, b) => a.order - b.order)
    while (done.length > 2) { const x = done.shift(); deals.splice(deals.indexOf(x), 1) }
    const wait = deals.filter((d) => d.stage === 0).sort((a, b) => a.order - b.order)
    while (wait.length > 3) { const x = wait.shift(); deals.splice(deals.indexOf(x), 1) }
  }
}

// ---------- плитки ----------
const TILE = 'group overflow-hidden rounded-[26px] border border-[#0392FF]/30 px-[22px] pt-[22px] pb-6 bg-[linear-gradient(145deg,rgba(255,255,255,.85),rgba(3,146,255,.07))] dark:border-[rgba(60,140,255,.4)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,.05),rgba(3,146,255,.08))]'
const TILE_TITLE = 'font-display font-bold text-[19px] leading-[1.2] text-[#054C86] dark:text-[#6cb6f2]'
const TILE_TEXT = 'mt-2 text-[15px] leading-normal text-black/60 dark:text-white/65'
const mailLines = [
  { w: '92%', d: '0ms' },
  { w: '70%', d: '700ms' },
  { w: '84%', d: '1300ms' },
]
const funnel = [
  { name: u.fun[0], w: 100 },
  { name: u.fun[1], w: 72 },
  { name: u.fun[2], w: 48 },
  { name: u.fun[3], w: 31 },
]

onMounted(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) timer = window.setInterval(advance, 1900)
})
onBeforeUnmount(() => {
  clearInterval(timer)
  cancelAnimationFrame(raf)
})
</script>
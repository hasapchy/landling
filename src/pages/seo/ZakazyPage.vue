<template>
  <main class="overflow-x-clip">
    <!-- ===== первый экран: заголовок по центру + шторка «было / стало» ===== -->
    <section class="relative pt-[96px] sm:pt-28 md:pt-32 pb-10 sm:pb-16 px-4 sm:px-8 w-full">
      <div :class="GLOW_A" aria-hidden="true"></div>
      <div :class="GLOW_B" style="animation-delay:-6s" aria-hidden="true"></div>

      <div class="relative z-[2] mx-auto flex max-w-[960px] flex-col items-center gap-5 text-center">
        <LabelBadge :class="RISE" style="animation-delay:0ms">
          <template #icon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l1 2h3v14H5V6h3zM9 12l2 2 4-4" /></svg>
          </template>
          {{ page.badge }}
        </LabelBadge>
        <h1 :class="RISE" class="font-display font-bold leading-[1.1] text-3xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#0392FF,#054C86)] [-webkit-text-fill-color:transparent]" style="animation-delay:80ms">
          {{ page.h1 }}
        </h1>
        <p :class="RISE" class="max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.4]" style="animation-delay:160ms">{{ page.lead }}</p>
        <div :class="RISE" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4" style="animation-delay:240ms">
          <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer"
            class="btn-primary !px-6 !py-3 sm:!px-8 sm:!py-3.5 text-center no-underline">{{ t('nav.tryDemo') }}</a>
          <button type="button" @click="openContactModal" :class="BTN_GHOST">{{ u.leave }}</button>
        </div>
      </div>

      <!-- шторка: слева хаос, справа порядок; можно тянуть, иначе ездит сама -->
      <div :class="RISE" class="relative z-[2] mx-auto mt-10 w-full max-w-[1100px] sm:mt-14" style="animation-delay:380ms">
        <div ref="stage" role="slider" tabindex="0" :aria-label="u.aria" :aria-valuenow="Math.round(pos)" aria-valuemin="0" aria-valuemax="100"
          class="relative h-[400px] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] border-2 border-[#0392FF] shadow-[0_30px_70px_rgba(5,76,134,.22)] sm:h-[440px]"
          @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @keydown="key">
          <!-- СТАЛО (основа) -->
          <div class="absolute inset-0 bg-[linear-gradient(150deg,#fff,#e3f0ff)] dark:bg-[linear-gradient(150deg,#0d1b36,#0a1530)]">
            <div class="mx-auto flex h-full max-w-[760px] flex-col justify-center gap-3 px-4 pt-10 sm:px-8">
              <div v-for="(o, i) in ORDERS" :key="o[0]" class="rounded-2xl border border-[#0392FF]/25 bg-[#fff] px-4 py-3 shadow-[0_6px_18px_rgba(5,76,134,.1)] dark:bg-[#0f1f3d]">
                <div class="flex items-center justify-between gap-3 text-sm font-semibold">
                  <span class="truncate text-[#054C86] dark:text-[#9fd0ff]">{{ o[0] }}</span>
                  <span class="flex items-center gap-3 whitespace-nowrap">
                    <span :class="[CHIP[o[3]], 'hidden sm:inline-flex']">{{ o[2] }}</span>
                    <b class="tabular-nums text-[#111] dark:text-white">{{ fmt(o[1]) }} <small class="font-medium opacity-60">TMT</small></b>
                  </span>
                </div>
                <div class="mt-2 h-[7px] overflow-hidden rounded-full bg-[rgba(3,146,255,.14)]">
                  <span class="block h-full rounded-full bg-[linear-gradient(90deg,#0392FF,#054C86)] [animation:zd-fill_6s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ '--w': o[4] + '%', width: o[4] + '%', animationDelay: i * 0.8 + 's' }"></span>
                </div>
              </div>
            </div>
          </div>
          <span class="absolute right-4 top-4 z-[1] rounded-full px-3.5 py-1.5 text-xs font-bold text-white" :class="GRAD">{{ u.now }} · {{ page.afterTitle }}</span>

          <!-- БЫЛО (сверху, обрезается шторкой) -->
          <div class="absolute inset-0 bg-[#e9e6df] bg-[linear-gradient(#d5d0c4_1px,transparent_1px),linear-gradient(90deg,#d5d0c4_1px,transparent_1px)] bg-[size:44px_30px] dark:bg-[#26241f] dark:bg-[linear-gradient(#3a372f_1px,transparent_1px),linear-gradient(90deg,#3a372f_1px,transparent_1px)]"
            :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }">
            <span class="absolute left-4 top-4 z-[1] rounded-full bg-[#8a8472] px-3.5 py-1.5 text-xs font-bold text-white">{{ u.was }} · {{ page.beforeTitle }}</span>
            <div v-for="(c, i) in CHAOS" :key="i" class="absolute max-w-[46%] whitespace-nowrap text-[12px] sm:text-[13px] [animation:zv-wob_5s_ease-in-out_infinite] motion-reduce:animate-none"
              :class="[c.cls]" :style="{ left: c.x + '%', top: c.y + '%', '--r': c.r + 'deg', animationDelay: i * 0.6 + 's' }">{{ c.text }}</div>
          </div>

          <!-- ручка -->
          <div class="pointer-events-none absolute inset-y-0 z-[3] w-[4px] -translate-x-1/2 bg-[#0392FF]" :style="{ left: pos + '%' }">
            <span class="absolute left-1/2 top-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xl text-white shadow-[0_8px_24px_rgba(3,146,255,.5)]" :class="GRAD">⇄</span>
          </div>
        </div>
        <p :class="NOTE">{{ page.stageNote }}</p>
      </div>
    </section>

    <!-- ===== пары: проблема → решение ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1000px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.pairsTitle }}</h2>
      <div class="mt-10 sm:mt-14 flex flex-col gap-4 sm:gap-5">
        <div v-for="(p, i) in page.pairs" :key="p.before" v-reveal="i % 2 ? 'right' : 'left'"
          class="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1.15fr] md:gap-4">
          <div class="flex items-center gap-3 rounded-2xl border border-[#b3a98f]/50 bg-[rgba(233,230,223,.7)] px-5 py-4 text-[#5b5645] dark:border-[#6b6554]/60 dark:bg-[rgba(70,66,55,.35)] dark:text-[#cfc8b4]">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(220,38,38,.14)] text-red-600 [animation:zv-shake_5s_ease-in-out_infinite] motion-reduce:animate-none dark:text-red-400" :style="{ animationDelay: i * 0.7 + 's' }">!</span>
            <span class="font-medium leading-snug">{{ p.before }}</span>
          </div>
          <div class="flex items-center justify-center text-[#0392FF]">
            <svg viewBox="0 0 24 24" class="hidden h-7 w-7 md:block [animation:zv-arrow_1.8s_ease-in-out_infinite] motion-reduce:animate-none" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
            <svg viewBox="0 0 24 24" class="h-6 w-6 md:hidden" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
          </div>
          <div class="flex items-center gap-3 rounded-2xl border border-[#0392FF]/40 bg-[linear-gradient(150deg,rgba(255,255,255,.95),rgba(3,146,255,.1))] px-5 py-4 text-[#054C86] shadow-[0_10px_28px_rgba(3,146,255,.12)] dark:border-[rgba(60,140,255,.5)] dark:bg-[linear-gradient(150deg,rgba(255,255,255,.06),rgba(3,146,255,.14))] dark:text-[#cfe6ff]">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(34,197,94,.16)] text-green-600 dark:text-green-400">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
            </span>
            <span class="font-semibold leading-snug">{{ p.after }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== заказ в центре ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1080px] mx-auto text-center">
      <h2 v-reveal :class="H2">{{ page.hubTitle }}</h2>
      <p v-reveal class="mx-auto mt-4 max-w-2xl text-base text-black/65 dark:text-white/65 sm:text-lg">{{ page.hubText }}</p>

      <!-- широкий экран: заказ в центре, вокруг парят блоки, по линиям бегут точки -->
      <div v-reveal class="group relative mx-auto mt-10 hidden aspect-[1000/440] w-full max-w-[1000px] md:block">
        <svg viewBox="0 0 1000 440" class="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <g stroke="#0392FF" stroke-width="2" stroke-dasharray="6 6" opacity=".55">
            <path v-for="(n, i) in HUB" :key="i" :d="`M500 220 L${n[0]} ${n[1]}`" />
          </g>
          <g fill="#0392FF" class="motion-reduce:hidden">
            <circle v-for="(n, i) in HUB" :key="'d' + i" r="5"><animateMotion :path="`M500 220 L${n[0]} ${n[1]} L500 220`" dur="3.6s" :begin="`${i * 0.5}s`" repeatCount="indefinite" /></circle>
          </g>
        </svg>
        <div class="absolute left-1/2 top-1/2 z-[2] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-3xl px-5 py-5 text-white shadow-[0_24px_60px_rgba(3,146,255,.45)] [animation:seo-glowpulse_3s_ease-in-out_infinite] motion-reduce:animate-none" :class="GRAD">
          <small class="block text-sm opacity-80">{{ u.order }} #1042</small>
          <b class="mt-1 block text-3xl tabular-nums">4 200 TMT</b>
          <small class="mt-1 block text-sm opacity-85">{{ pct >= 100 ? u.done : u.wip }} · {{ pct }}%</small>
          <span class="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/25"><i class="block h-full rounded-full bg-white transition-[width] duration-700" :style="{ width: pct + '%' }"></i></span>
        </div>
        <div v-for="(n, i) in HUB" :key="'s' + i" class="absolute z-[2] -translate-x-1/2 -translate-y-1/2" :style="{ left: n[0] / 10 + '%', top: (n[1] / 440) * 100 + '%' }">
          <div class="rounded-2xl border-[1.5px] border-[#0392FF] bg-[#fff] px-4 py-2.5 text-left shadow-[0_10px_26px_rgba(5,76,134,.15)] [animation:seo-hover_4.2s_ease-in-out_infinite] dark:bg-[#0f1f3d] motion-reduce:animate-none" :style="{ animationDelay: i * 0.5 + 's' }">
            <b class="block whitespace-nowrap text-sm text-[#054C86] dark:text-[#9fd0ff]">{{ page.hub[i].title }}</b>
            <span class="block whitespace-nowrap text-xs text-black/55 dark:text-white/60">{{ page.hub[i].text }}</span>
          </div>
        </div>
      </div>

      <!-- телефон: заказ и блоки списком -->
      <div class="mt-8 md:hidden">
        <div class="mx-auto w-[250px] rounded-3xl px-5 py-5 text-white shadow-[0_24px_60px_rgba(3,146,255,.4)]" :class="GRAD">
          <small class="block text-sm opacity-80">{{ u.order }} #1042</small>
          <b class="mt-1 block text-3xl tabular-nums">4 200 TMT</b>
          <small class="mt-1 block text-sm opacity-85">{{ pct >= 100 ? u.done : u.wip }} · {{ pct }}%</small>
        </div>
        <span class="mx-auto block h-6 w-0.5 bg-[#0392FF]/50"></span>
        <div class="grid grid-cols-2 gap-2.5 text-left">
          <div v-for="h in page.hub" :key="h.title" v-reveal class="rounded-2xl border-[1.5px] border-[#0392FF]/60 bg-[#fff] px-3 py-2.5 dark:bg-[#0f1f3d]">
            <b class="block text-sm text-[#054C86] dark:text-[#9fd0ff]">{{ h.title }}</b>
            <span class="block text-xs text-black/55 dark:text-white/60">{{ h.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== трекинг заказа ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto">
      <div class="grid items-center gap-8 lg:gap-14 lg:grid-cols-[1fr_1.05fr]">
        <div v-reveal class="text-center lg:text-left">
          <span class="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0b2540] px-3.5 py-1.5 text-sm text-white"><i class="h-2 w-2 rounded-full bg-white"></i>{{ u.order }} #1042 · {{ u.banners }}</span>
          <h2 :class="H2">{{ page.trackTitle }}</h2>
          <p class="mt-4 text-base leading-relaxed text-black/65 dark:text-white/65 sm:text-lg">{{ page.trackText }}</p>
        </div>
        <div v-reveal class="rounded-[28px] border border-[#0392FF]/30 bg-[#fff] px-6 py-6 text-left shadow-[0_30px_70px_rgba(5,76,134,.18)] dark:border-[rgba(60,140,255,.4)] dark:bg-[#0d1b36] sm:px-8">
          <ol>
            <li v-for="(s, i) in page.track" :key="s.title" class="relative flex gap-4 pb-6 last:pb-0">
              <span v-if="i < page.track.length - 1" class="absolute bottom-0 left-[13px] top-7 w-[3px] rounded-full transition-colors duration-500" :class="i < tr ? 'bg-green-500' : 'bg-[#cde6ff] dark:bg-[#24406b]'"></span>
              <span class="relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs text-white transition-all duration-500"
                :class="i < tr ? 'bg-green-500' : i === tr ? 'bg-[#0392FF] shadow-[0_0_0_6px_rgba(3,146,255,.22)]' : 'border-2 border-[#b7d7f5] bg-transparent dark:border-[#2d4d7c]'">
                <svg v-if="i < tr" viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                <i v-else-if="i === tr" class="h-2 w-2 rounded-full bg-white"></i>
              </span>
              <span class="min-w-0 flex-1 transition-opacity duration-500" :class="i > tr ? 'opacity-50' : ''">
                <b class="block text-base text-[#0b2540] dark:text-white">{{ s.title }}</b>
                <span class="block text-sm text-black/55 dark:text-white/60">{{ s.text }}</span>
              </span>
              <span class="whitespace-nowrap text-sm font-semibold text-black/45 transition-opacity duration-500 dark:text-white/50" :class="i <= tr ? 'opacity-100' : 'opacity-0'">{{ i === tr ? u.cur : s.time }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ===== вопросы ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[820px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.faqTitle }}</h2>
      <div class="mt-10 sm:mt-14"><SeoFaq :items="page.faq" /></div>
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
        <p class="relative mt-6 text-sm text-white/70">{{ u.see }} <a href="/crm" class="underline">CRM</a> · <a href="/sklad" class="underline">{{ u.stock }}</a> · <a href="/finance" class="underline">{{ u.fin }}</a> · <a href="/tarify" class="underline">{{ u.cost }}</a> · <a href="/" class="underline">{{ u.home }}</a></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import SeoFaq from '@/components/SeoFaq.vue'
import { H2, GRAD, RISE, GLOW_A, GLOW_B, NOTE, CHIP, CTA, CTA_MAIN, CTA_GHOST, BTN_GHOST } from './ui'
import { vReveal } from '@/composables/useReveal'
import { seoUi } from '@/pages/seoPages.js'

defineProps({ page: { type: Object, required: true } })
const { t, locale, getLocaleMessage } = useI18n()
// надписи страницы лежат в языковых файлах: seoUi.zakazy
const u = seoUi('zakazy', locale.value, getLocaleMessage)
const openContactModal = inject('openContactModal', () => {})
const fmt = (n) => n.toLocaleString('ru-RU').replace(/ /g, ' ')

// условные данные для картинок: [название, сумма, статус, цвет статуса, прогресс]
const ORDERS = [
  [u.orders[0] + ' #1042', 4200, u.st.done, 'in', 100],
  [u.orders[1] + ' #1043', 7500, u.st.wip, 'out', 68],
  [u.orders[2] + ' #1044', 5300, u.st.wip, 'out', 42],
  [u.orders[3] + ' #1045', 2800, u.st.fresh, 'ret', 14],
]
const STICKY = 'rounded-[3px] bg-[#fff59d] px-3 py-2.5 text-[#4a4420] shadow-[2px_4px_10px_rgba(0,0,0,.22)]'
const BUBBLE = 'rounded-2xl bg-[#fff] px-3 py-2 text-[#333] shadow-[0_2px_6px_rgba(0,0,0,.18)]'
const GREEN = 'rounded-2xl bg-[#dcf8c6] px-3 py-2 text-[#264d1c] shadow-[0_2px_6px_rgba(0,0,0,.18)]'
const ERR = 'border border-[#b00020] bg-[#ffd5d5] px-2 py-0.5 font-bold text-[#b00020]'
const CHAOS = [
  { text: u.chaos[0], x: 7, y: 20, r: -4, cls: STICKY },
  { text: u.chaos[1], x: 34, y: 14, r: 2, cls: ERR },
  { text: u.chaos[2], x: 20, y: 38, r: -1, cls: BUBBLE },
  { text: u.chaos[3], x: 5, y: 56, r: 1, cls: GREEN },
  { text: u.chaos[4], x: 38, y: 70, r: -2, cls: ERR },
  { text: u.chaos[5], x: 60, y: 28, r: 3, cls: 'rounded-[3px] bg-[#ffcc80] px-3 py-2.5 text-[#5a3600] shadow-[2px_4px_10px_rgba(0,0,0,.22)]' },
  { text: u.chaos[6], x: 66, y: 52, r: -2, cls: BUBBLE },
  { text: u.chaos[7], x: 52, y: 82, r: 1, cls: GREEN },
  { text: u.chaos[8], x: 14, y: 80, r: -3, cls: ERR },
]

// ---------- шторка ----------
const stage = ref(null)
const pos = ref(50)
const dragging = ref(false)
let raf = 0
let resumeAt = 0
const setFrom = (e) => {
  const r = stage.value.getBoundingClientRect()
  pos.value = Math.max(4, Math.min(96, ((e.clientX - r.left) / r.width) * 100))
}
const down = (e) => { dragging.value = true; stage.value.setPointerCapture(e.pointerId); setFrom(e) }
const move = (e) => { if (dragging.value) setFrom(e) }
const up = () => { dragging.value = false; resumeAt = performance.now() + 3500 }
const key = (e) => {
  if (e.key === 'ArrowLeft') pos.value = Math.max(4, pos.value - 5)
  else if (e.key === 'ArrowRight') pos.value = Math.min(96, pos.value + 5)
  else return
  resumeAt = performance.now() + 3500
}

// ---------- заказ в центре и трекинг ----------
const HUB = [[130, 50], [870, 50], [90, 220], [910, 220], [130, 390], [870, 390]]
const pct = ref(72)
const tr = ref(3)
let stepTimer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { tr.value = 5; pct.value = 100; return }
  const t0 = performance.now()
  let phase = 0
  let last = t0
  const frame = (now) => {
    if (!dragging.value && now > resumeAt) {
      phase += (now - last) / 1900
      pos.value = 50 + 30 * Math.sin(phase)
    }
    last = now
    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)
  stepTimer = setInterval(() => {
    tr.value = (tr.value + 1) % 8
    pct.value = pct.value >= 100 ? 12 : Math.min(100, pct.value + 11)
  }, 1500)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); clearInterval(stepTimer) })
</script>
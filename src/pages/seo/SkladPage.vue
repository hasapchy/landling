<template>
  <main class="overflow-x-clip">
    <!-- ===== первый экран + живая сцена склада ===== -->
    <section class="relative text-center pt-[96px] sm:pt-28 md:pt-32 px-4 sm:px-6 pb-10 sm:pb-16 w-full max-w-[1440px] mx-auto">
      <div :class="GLOW_A" aria-hidden="true"></div>
      <div :class="GLOW_B" style="animation-delay:-6s" aria-hidden="true"></div>

      <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
        <LabelBadge :class="RISE" style="animation-delay:0ms">
          <template #icon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 6.5 9 3l7 3.5v7L9 17l-7-3.5z" /><path d="M2 6.5 9 10l7-3.5M9 10v7" />
            </svg>
          </template>
          {{ page.badge }}
        </LabelBadge>
        <h1 :class="RISE" class="max-w-[95%] md:max-w-4xl font-display font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]"
          style="animation-delay:80ms">
          {{ page.h1 }}
        </h1>
        <p :class="RISE" class="max-w-[90%] sm:max-w-xl md:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.35]" style="animation-delay:160ms">
          {{ page.lead }}
        </p>
        <div :class="RISE" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4" style="animation-delay:240ms">
          <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer"
            class="btn-primary !px-6 !py-3 sm:!px-8 sm:!py-3.5 text-center no-underline">{{ t('nav.tryDemo') }}</a>
          <button type="button" @click="openContactModal" :class="BTN_GHOST">{{ u.leave }}</button>
        </div>
      </div>

      <!-- живая сцена: движения товара в реальном времени -->
      <div :class="RISE" class="relative z-[2] mt-10 sm:mt-14 mx-auto w-full max-w-[920px] text-left" style="animation-delay:360ms">
        <div :class="WINDOW">
          <div :class="WINDOW_BAR">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
            <b :class="WINDOW_TITLE">{{ u.winTitle }}</b>
            <em :class="WINDOW_ONLINE"><i :class="WINDOW_DOT"></i> {{ u.online }}</em>
          </div>
          <div class="grid md:grid-cols-[1.25fr_1fr] gap-0">
            <!-- остатки -->
            <div class="p-3 sm:p-5">
              <div :class="SMALL_HEAD">{{ u.stock }}</div>
              <ul class="flex flex-col gap-2.5">
                <li v-for="(it, i) in items" :key="it.name"
                  class="rounded-[14px] border px-3 py-2.5 transition-colors duration-[400ms]"
                  :class="flash !== i ? 'border-transparent' : flashType === 'out' ? 'border-amber-500/40 bg-amber-500/10' : 'border-[#0392FF]/35 bg-[#0392FF]/10'">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-sm font-semibold">{{ it.name }}</span>
                    <span class="font-bold tabular-nums text-[#054C86] dark:text-[#6cb6f2]">{{ Math.round(it.shown) }} <small class="font-medium opacity-60">{{ u.pcs }}</small></span>
                  </div>
                  <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0392FF]/15">
                    <span class="block h-full rounded-full bg-[linear-gradient(90deg,#0392FF,#054C86)]" :style="{ width: Math.min(100, (it.shown / it.max) * 100) + '%' }"></span>
                  </div>
                </li>
              </ul>
            </div>
            <!-- лента событий -->
            <div class="p-3 sm:p-5 border-t md:border-t-0 md:border-l border-[#0392FF]/20">
              <div :class="SMALL_HEAD">{{ u.moves }}</div>
              <TransitionGroup tag="ul" class="relative flex flex-col gap-2 min-h-[188px]"
                enter-active-class="transition-all duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                move-class="transition-all duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                leave-active-class="transition-all duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] absolute w-full"
                enter-from-class="opacity-0 translate-x-[26px]"
                leave-to-class="opacity-0 -translate-x-5">
                <li v-for="e in feed" :key="e.id" class="flex items-center gap-2.5 rounded-xl bg-[#0392FF]/[.06] px-2.5 py-2 text-sm">
                  <span :class="CHIP[e.type]">{{ e.sign }}{{ e.n }}</span>
                  <span class="min-w-0 truncate">{{ e.label }}</span>
                </li>
              </TransitionGroup>
            </div>
          </div>
        </div>
        <p :class="NOTE">{{ u.note }}</p>
      </div>
    </section>

    <!-- ===== склад и продажи — в одном пространстве ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto">
      <div class="grid items-center gap-10 md:gap-14 md:grid-cols-2">
        <div v-reveal:left class="text-left">
          <h2 class="font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-[#054C86] dark:text-[#6cb6f2]">{{ page.spaceTitle }}</h2>
          <p class="mt-4 text-black/70 dark:text-white/70 text-base sm:text-lg leading-relaxed">{{ page.spaceText }}</p>
          <ul class="mt-6 flex flex-col gap-3">
            <li v-for="pt in page.spacePoints" :key="pt" class="flex items-start gap-3">
              <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" :class="GRAD">
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
              </span>
              <span class="text-black/75 dark:text-white/80">{{ pt }}</span>
            </li>
          </ul>
          <button type="button" @click="openContactModal" class="btn-primary mt-7 !px-7 !py-3 cursor-pointer">{{ u.leave }}</button>
        </div>
        <div v-reveal:right :class="VISUAL">
          <div class="relative flex flex-col gap-[34px] py-1.5 before:absolute before:left-[25px] before:top-8 before:bottom-8 before:w-[3px] before:rounded-[3px] before:bg-[#0392FF]/20 before:content-['']">
            <div v-for="(m, i) in u.mods" :key="m"
              class="relative z-[1] flex items-center gap-3.5 rounded-[18px] bg-[rgba(255,255,255,.78)] p-[18px] text-lg text-[#054C86] [animation:seo-node_5.1s_ease-in-out_infinite] motion-reduce:animate-none dark:bg-[rgba(255,255,255,.06)] dark:text-[#6cb6f2]"
              :style="{ animationDelay: i * 1.7 + 's' }">
              <span class="h-3.5 w-3.5 shrink-0 rounded-full" :class="GRAD"></span><b>{{ m }}</b>
            </div>
            <span class="absolute z-[2] left-5 top-6 h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_0_6px_rgba(34,197,94,.25)] [animation:seo-travel_3.4s_ease-in-out_infinite_alternate] motion-reduce:animate-none"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== почему не отдельная программа ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto text-center">
      <h2 v-reveal :class="H2">{{ page.whyTitle }}</h2>
      <p v-reveal class="mt-4 mx-auto max-w-2xl text-black/65 dark:text-white/65 text-base sm:text-lg">{{ page.whyText }}</p>
      <div class="mt-10 sm:mt-14 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
        <div v-for="(w, i) in page.why" :key="w.title" v-reveal :style="{ transitionDelay: i * 110 + 'ms' }">
          <div :class="CARD" class="group/c h-full p-[22px] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(5,76,134,.16)]">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-[15px] text-white shadow-[0_10px_24px_rgba(3,146,255,.35)] transition-transform duration-[400ms] ease-[cubic-bezier(.3,.7,.2,1)] group-hover/c:-rotate-[8deg] group-hover/c:scale-[1.08]" :class="GRAD">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[w.icon]"></svg>
            </span>
            <h3 class="mt-4 font-display font-bold text-lg text-[#054C86] dark:text-[#6cb6f2]">{{ w.title }}</h3>
            <p class="mt-2 text-sm sm:text-base text-black/65 dark:text-white/65 leading-relaxed">{{ w.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== возможности ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto text-center">
      <h2 v-reveal :class="H2">{{ page.capsTitle }}</h2>
      <p v-reveal class="mt-4 text-black/65 dark:text-white/65 text-base sm:text-lg">{{ page.capsText }}</p>
      <div class="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-8">
        <div v-for="(c, i) in page.caps" :key="c.title" v-reveal :style="{ transitionDelay: i * 90 + 'ms' }">
          <div class="group/c flex flex-col items-center px-1 text-center">
            <span class="inline-flex h-[68px] w-[68px] items-center justify-center rounded-[22px] text-white shadow-[0_14px_30px_rgba(3,146,255,.32)] [animation:seo-bob_4.2s_ease-in-out_infinite] motion-reduce:animate-none transition-[scale] duration-300 group-hover/c:scale-110"
              :class="GRAD" :style="{ animationDelay: i * 0.35 + 's' }">
              <svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[c.icon]"></svg>
            </span>
            <h3 class="mt-3 font-display font-bold text-base text-[#054C86] dark:text-[#6cb6f2]">{{ c.title }}</h3>
            <p class="mt-1 text-sm text-black/60 dark:text-white/60 leading-snug">{{ c.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== как это работает на практике ===== -->
    <section class="px-6 sm:px-8 py-10 sm:py-16 w-full max-w-[1100px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.scenariosTitle }}</h2>

      <div class="mt-12 sm:mt-20 flex flex-col gap-10 sm:gap-16">
        <template v-for="(b, i) in page.blocks" :key="b.key">
        <!-- тонкая линия между блоками, как перед «Контактами» на главной -->
        <div v-if="i > 0" class="pointer-events-none mx-auto h-px w-[min(90%,720px)] bg-[linear-gradient(90deg,transparent,rgba(3,146,255,0.45),transparent)]"></div>
        <div class="grid items-center gap-8 md:gap-14 md:grid-cols-2">
          <div v-reveal="i % 2 ? 'right' : 'left'" class="text-left" :class="i % 2 ? 'md:order-2' : ''">
            <span class="inline-flex rounded-full bg-[#054C86]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#054C86] dark:text-[#6cb6f2]">{{ b.label }}</span>
            <h3 class="mt-4 font-display font-bold text-2xl sm:text-3xl leading-tight text-[#054C86] dark:text-[#6cb6f2]">{{ b.title }}</h3>
            <p class="mt-4 text-black/70 dark:text-white/70 text-base sm:text-lg leading-relaxed">{{ b.text }}</p>
          </div>

          <div v-reveal="i % 2 ? 'left' : 'right'" :class="VISUAL">
            <!-- приход -->
            <div v-if="b.key === 'in'" class="flex flex-col gap-2.5">
              <div v-for="(r, k) in incoming" :key="r.name" :class="SLIDE_X"
                class="flex items-center gap-3 rounded-[14px] bg-[rgba(255,255,255,.7)] px-3.5 py-3 font-semibold dark:bg-[rgba(255,255,255,.06)]" :style="{ '--d': k * 220 + 'ms' }">
                <span :class="CHIP.in">+{{ r.n }}</span>
                <span class="truncate">{{ r.name }}</span>
                <svg viewBox="0 0 24 24" class="ml-auto h-5 w-5 text-green-600 [stroke-dasharray:30] [stroke-dashoffset:30] group-[.is-in]:[animation:seo-draw_.5s_ease_calc(var(--d)+.5s)_forwards] motion-reduce:[stroke-dashoffset:0]" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
              </div>
            </div>
            <!-- списания и возвраты -->
            <div v-else-if="b.key === 'out'" class="flex flex-col gap-2.5">
              <div v-for="(r, k) in history" :key="k" :class="SLIDE_X"
                class="flex items-center gap-3 rounded-[14px] bg-[rgba(255,255,255,.7)] px-3.5 py-3 font-semibold dark:bg-[rgba(255,255,255,.06)]" :style="{ '--d': k * 260 + 'ms' }">
                <span class="h-[9px] w-[9px] shrink-0 rounded-full" :class="DOT[r.type]"></span>
                <span :class="CHIP[r.type]">{{ r.sign }}{{ r.n }}</span>
                <span class="truncate">{{ r.label }}</span>
              </div>
            </div>
            <!-- инвентаризация -->
            <div v-else class="flex flex-col gap-2.5">
              <div v-for="(r, k) in audit" :key="r.name" :class="SLIDE_Y" :style="{ '--d': k * 240 + 'ms' }">
                <div class="flex items-center justify-between text-sm"><span class="truncate">{{ r.name }}</span>
                  <span :class="r.fact === r.book ? 'text-emerald-500' : 'text-amber-500'">{{ r.fact === r.book ? u.match : (r.fact - r.book) + ' ' + u.pcs }}</span></div>
                <div class="mt-1.5 flex flex-col gap-[5px]">
                  <span class="block h-2 w-0 rounded-full bg-[rgba(5,76,134,.35)] dark:bg-[rgba(108,182,242,.4)] transition-[width] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] [transition-delay:calc(var(--d)+.25s)] group-[.is-in]:w-[var(--w)] group-[.is-in]:[animation:crm-wide_5s_ease-in-out_calc(var(--d)+2s)_infinite] motion-reduce:w-[var(--w)] motion-reduce:animate-none" :style="{ '--w': r.book + '%' }"></span>
                  <span class="block h-2 w-0 rounded-full bg-[linear-gradient(90deg,#0392FF,#054C86)] transition-[width] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] [transition-delay:calc(var(--d)+.25s)] group-[.is-in]:w-[var(--w)] group-[.is-in]:[animation:crm-wide_4.4s_ease-in-out_calc(var(--d)+2s)_infinite] motion-reduce:w-[var(--w)] motion-reduce:animate-none" :style="{ '--w': r.fact + '%' }"></span>
                </div>
              </div>
              <div class="mt-3 flex gap-4 text-xs text-black/50 dark:text-white/50">
                <span><i class="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-[rgba(5,76,134,.35)] dark:bg-[rgba(108,182,242,.4)]"></i>{{ u.byBook }}</span>
                <span><i class="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-[#0392FF]"></i>{{ u.byFact }}</span>
              </div>
            </div>
          </div>
        </div>
        </template>
      </div>
    </section>

    <!-- ===== кому подходит ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.forTitle }}</h2>
      <div class="mt-10 sm:mt-14 grid gap-3 sm:gap-4 md:grid-cols-3 text-left">
        <div v-for="(f, i) in page.forItems" :key="f.title" v-reveal :style="{ transitionDelay: i * 120 + 'ms' }"
          class="relative overflow-hidden rounded-3xl border border-[#5aaeff]/60 p-[26px] text-white shadow-[0_16px_38px_rgba(5,76,134,.22)] bg-[linear-gradient(135deg,#2a76d6_0%,#0d4a9e_100%)] dark:bg-[linear-gradient(135deg,#0e3278_0%,#051230_100%)]">
          <span class="inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[rgba(255,255,255,.18)] font-bold">{{ i + 1 }}</span>
          <h3 class="mt-4 font-display font-bold text-xl text-white">{{ f.title }}</h3>
          <p class="mt-2 text-white/80 leading-relaxed">{{ f.text }}</p>
        </div>
      </div>
    </section>
    <!-- ===== вопросы ===== -->
    <section class="px-6 sm:px-8 py-10 sm:py-16 w-full max-w-[820px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.faqTitle }}</h2>
      <SeoFaq :items="page.faq" class="mt-10" />
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
        <p class="relative mt-6 text-sm text-white/70">{{ u.see }} <a href="/" class="underline">{{ u.home }}</a> · <a href="/#pricing" class="underline">{{ u.pricing }}</a></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, inject, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import SeoFaq from '@/components/SeoFaq.vue'
import { H2, GRAD, RISE, GLOW_A, GLOW_B, WINDOW, WINDOW_BAR, WINDOW_TITLE, WINDOW_ONLINE, WINDOW_DOT, SMALL_HEAD, NOTE, CHIP, DOT, CTA, CTA_MAIN, CTA_GHOST, BTN_GHOST, CARD, VISUAL, SLIDE_X, SLIDE_Y } from './ui'
import { vReveal } from '@/composables/useReveal'
import { seoUi } from '@/pages/seoPages.js'

defineProps({ page: { type: Object, required: true } })
const { t, locale, getLocaleMessage } = useI18n()
// надписи страницы лежат в языковых файлах: seoUi.sklad
const u = seoUi('sklad', locale.value, getLocaleMessage)
const openContactModal = inject('openContactModal', () => {})

// ---------- живая сцена склада (условные данные для примера) ----------
const items = reactive([
  { name: u.names[0], qty: 64, shown: 64, max: 120 },
  { name: u.names[1], qty: 38, shown: 38, max: 120 },
  { name: u.names[2], qty: 25, shown: 25, max: 120 },
  { name: u.names[3], qty: 52, shown: 52, max: 120 },
])
// цикл из 8 движений: в сумме остатки возвращаются к исходным, поэтому цифры не «уплывают»
const script = [
  { type: 'in', i: 0, n: 30, label: `${u.v.in}: ${u.names[0]}` },
  { type: 'out', i: 1, n: 12, label: `${u.v.out}: ${u.names[1]}` },
  { type: 'ret', i: 2, n: 3, label: `${u.v.ret}: ${u.names[2]}` },
  { type: 'in', i: 3, n: 25, label: `${u.v.buy}: ${u.names[3]}` },
  { type: 'out', i: 0, n: 30, label: `${u.v.sale}: ${u.names[0]}` },
  { type: 'in', i: 1, n: 12, label: `${u.v.buy}: ${u.names[1]}` },
  { type: 'out', i: 2, n: 3, label: `${u.v.sale}: ${u.names[2]}` },
  { type: 'out', i: 3, n: 25, label: `${u.v.sale}: ${u.names[3]}` },
]
const feed = ref([])
const flash = ref(-1)
const flashType = ref('')
let step = 0
let eid = 0
let timer = 0
let tween = 0

const SIGN = { in: '+', ret: '+', out: '−' }

function animateTo() {
  cancelAnimationFrame(tween)
  const tick = () => {
    let moving = false
    for (const it of items) {
      const d = it.qty - it.shown
      if (Math.abs(d) > 0.2) { it.shown += d * 0.12; moving = true } else it.shown = it.qty
    }
    if (moving) tween = requestAnimationFrame(tick)
  }
  tween = requestAnimationFrame(tick)
}

function fire() {
  const e = script[step % script.length]
  step++
  const it = items[e.i]
  it.qty = Math.max(0, Math.min(it.max, it.qty + (e.type === 'out' ? -e.n : e.n)))
  flash.value = e.i
  flashType.value = e.type
  setTimeout(() => { flash.value = -1 }, 900)
  feed.value = [{ id: ++eid, type: e.type, sign: SIGN[e.type], n: e.n, label: e.label }, ...feed.value].slice(0, 5)
  animateTo()
}

// ---------- данные для картинок в блоках ----------
const incoming = [
  { name: u.names[0], n: 40 },
  { name: u.names[3], n: 25 },
  { name: u.names[2], n: 15 },
]
const history = [
  { type: 'out', sign: '−', n: 12, label: `${u.v.out}: ${u.names[1]}` },
  { type: 'ret', sign: '+', n: 3, label: u.clientRet },
  { type: 'out', sign: '−', n: 18, label: `${u.v.sale}: ${u.names[0]}` },
  { type: 'in', sign: '+', n: 25, label: `${u.v.buy}: ${u.jacketShort}` },
]
const audit = [
  { name: u.names[0], book: 86, fact: 86 },
  { name: u.names[1], book: 72, fact: 66 },
  { name: u.names[2], book: 54, fact: 54 },
]

// ---------- иконки (24x24, stroke) ----------
const ICONS = {
  window: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18"/><path d="M7 7.5h.01M10 7.5h.01"/>',
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/>',
  live: '<path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>',
  tag: '<path d="M3 12V4h8l9 9-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
  in: '<path d="M12 3v11"/><path d="m8 10 4 4 4-4"/><path d="M4 17v3h16v-3"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8H17a1 1 0 0 0 1-.8L19.5 8H6"/>',
  out: '<path d="M12 15V4"/><path d="m8 8 4-4 4 4"/><path d="M4 17v3h16v-3"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  check: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="m9.5 14 2 2 3.5-4"/>',
  bars: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
}

onMounted(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // стартовая картина: первые два движения сразу
  for (let i = 0; i < 2; i++) fire()
  if (!reduce) timer = window.setInterval(fire, 2200)

})

onBeforeUnmount(() => {
  clearInterval(timer)
  cancelAnimationFrame(tween)
})
</script>
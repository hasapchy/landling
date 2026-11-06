<template>
  <main class="overflow-x-clip">
    <!-- ===== первый экран: текст слева, живой учёт времени справа ===== -->
    <section class="relative pt-[96px] sm:pt-28 md:pt-32 px-4 sm:px-8 pb-12 sm:pb-20 w-full max-w-[1280px] mx-auto">
      <div :class="GLOW_A" aria-hidden="true"></div>
      <div :class="GLOW_B" style="animation-delay:-6s" aria-hidden="true"></div>

      <div class="relative z-[2] grid items-center gap-10 lg:gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
          <LabelBadge :class="RISE" style="animation-delay:0ms">
            <template #icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.4 2.7-6 6-6s6 2.6 6 6M16 5a3 3 0 0 1 0 6M18 14c2 .6 3 2.4 3 5" /></svg>
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

        <!-- рабочий день: по линии времени едет «сейчас» -->
        <div :class="RISE" style="animation-delay:340ms" class="min-w-0">
        <div class="w-full overflow-hidden rounded-[28px] border-2 border-[#0392FF]/55 bg-[linear-gradient(150deg,rgba(255,255,255,.9),rgba(3,146,255,.07))] shadow-[0_30px_80px_rgba(5,76,134,.2)] dark:bg-[linear-gradient(150deg,rgba(255,255,255,.05),rgba(3,146,255,.09))]">
                <!-- сводка -->
                <div class="grid grid-cols-2 border-b border-[#0392FF]/25 text-center">
                  <div class="px-2 py-4"><div :class="SMALL_HEAD" class="!mb-1">{{ u.now }}</div><b class="text-2xl tabular-nums text-[#054C86] dark:text-white sm:text-3xl">{{ clock }}</b></div>
                  <div class="border-l border-[#0392FF]/25 px-2 py-4"><div :class="SMALL_HEAD" class="!mb-1">{{ u.atWork }}</div><b class="text-2xl tabular-nums text-green-700 dark:text-green-400 sm:text-3xl">{{ present }}</b></div>
                </div>
        
                <div class="px-3 pb-5 pt-4 sm:px-6">
                  <!-- часы по оси -->
                  <div class="grid sm:grid-cols-[130px_1fr] sm:gap-3">
                    <span class="hidden sm:block"></span>
                    <div class="relative h-5 text-[11px] font-semibold text-black/40 dark:text-white/45">
                      <span v-for="h in HOURS" :key="h" class="absolute -translate-x-1/2" :style="{ left: ((h - 8) / 10) * 100 + '%' }">{{ String(h).padStart(2, '0') }}</span>
                    </div>
                  </div>
        
                  <div class="relative">
                    <!-- сетка и курсор -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 left-0 sm:left-[142px]" aria-hidden="true">
                      <span v-for="h in HOURS" :key="'g' + h" class="absolute inset-y-0 w-px bg-[rgba(3,146,255,.12)]" :style="{ left: ((h - 8) / 10) * 100 + '%' }"></span>
                      <span class="absolute inset-y-0 z-[3] w-[3px] -translate-x-1/2 rounded-full bg-[#0392FF] shadow-[0_0_18px_rgba(3,146,255,.8)]" :style="{ left: cursor + '%' }"></span>
                    </div>
        
                    <div v-for="r in ROWS" :key="r.name" class="relative grid items-center gap-1 py-2 sm:grid-cols-[130px_1fr] sm:gap-3">
                      <div class="flex items-center gap-2 text-sm font-semibold text-[#054C86] dark:text-[#9fd0ff]">
                        <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" :class="GRAD">{{ r.name[0] }}</span>{{ r.name }}
                      </div>
                      <div class="relative h-9 rounded-xl bg-[rgba(3,146,255,.07)] dark:bg-[rgba(255,255,255,.04)]">
                        <!-- отпуск -->
                        <span v-if="r.vac" class="absolute inset-0 flex items-center justify-center rounded-xl text-xs font-bold text-amber-700 [background:repeating-linear-gradient(135deg,rgba(245,158,11,.22)_0_10px,rgba(245,158,11,.1)_10px_20px)] dark:text-amber-400">{{ u.vac }}</span>
                        <template v-else>
                          <span class="absolute inset-y-1 rounded-lg transition-colors duration-500" :class="nowMin >= r.e ? 'bg-[linear-gradient(90deg,#94a3b8,#64748b)] opacity-70' : 'bg-[linear-gradient(90deg,#4ade80,#16a34a)]'" :style="{ left: pct(r.s) + '%', width: visible(r) + '%' }"></span>
                          <span v-if="nowMin >= r.s" class="absolute top-1/2 z-[2] -translate-y-1/2 whitespace-nowrap rounded-md bg-[#fff] px-1.5 py-0.5 text-[10px] font-bold text-green-700 shadow-[0_2px_8px_rgba(0,0,0,.18)] dark:bg-[#0f1f3d] dark:text-green-400" :style="{ left: `calc(${pct(r.s)}% + 4px)` }">→ {{ hm(r.s) }}</span>
                          <span v-if="nowMin >= r.e" class="absolute top-1/2 z-[2] -translate-y-1/2 whitespace-nowrap rounded-md bg-[#fff] px-1.5 py-0.5 text-[10px] font-bold text-amber-700 shadow-[0_2px_8px_rgba(0,0,0,.18)] dark:bg-[#0f1f3d] dark:text-amber-400" :style="{ left: `calc(${pct(r.e)}% - 52px)` }">{{ hm(r.e) }} ←</span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
        
                <!-- от табеля к зарплате -->
                <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-[#0392FF]/25 bg-[rgba(3,146,255,.06)] px-4 py-4 text-sm font-semibold text-[#054C86] dark:text-[#9fd0ff]">
                  <span class="rounded-full bg-[rgba(34,197,94,.16)] px-3 py-1 text-green-700 dark:text-green-400">{{ u.timesheet }}</span>
                  <svg viewBox="0 0 24 24" class="h-5 w-5 text-[#0392FF] [animation:zv-arrow_1.8s_ease-in-out_infinite] motion-reduce:animate-none" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
                  <span class="rounded-full px-3 py-1 text-white" :class="GRAD">{{ u.payroll }}</span>
                </div>
              </div>
          <p :class="NOTE">{{ page.timelineNote }}</p>
        </div>
      </div>
    </section>

    <!-- ===== от прихода до зарплаты ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.stepsTitle }}</h2>
      <div class="relative mt-12 sm:mt-16">
        <!-- линия с заполнением (только на широких экранах) -->
        <div class="absolute left-[12.5%] right-[12.5%] top-[21px] hidden h-[3px] rounded-full bg-[rgba(3,146,255,.18)] md:block">
          <span class="block h-full rounded-full bg-[linear-gradient(90deg,#0392FF,#054C86)] transition-[width] duration-[1200ms] ease-out" :style="{ width: (active / 3) * 100 + '%' }"></span>
        </div>
        <div class="relative grid gap-6 text-left md:grid-cols-4 md:gap-5">
          <div v-for="(s, i) in page.steps" :key="s.title" v-reveal :style="{ transitionDelay: i * 90 + 'ms' }" class="md:text-center">
            <span class="relative flex h-11 w-11 items-center justify-center rounded-full font-bold text-white transition-all duration-500 md:mx-auto"
              :class="[GRAD, active >= i ? 'scale-110 shadow-[0_8px_22px_rgba(3,146,255,.45)]' : 'scale-90 opacity-50 grayscale']">
              {{ i + 1 }}
              <span v-if="active === i" class="absolute inset-0 rounded-full bg-[#0392FF]/50 [animation:seo-ping_1.6s_ease-out_infinite] motion-reduce:animate-none"></span>
            </span>
            <h3 class="mt-4 font-display font-bold text-lg text-[#054C86] transition-opacity duration-500 dark:text-[#6cb6f2]" :class="active >= i ? 'opacity-100' : 'opacity-60'">{{ s.title }}</h3>
            <p class="mt-1.5 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== мозаика ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.bentoTitle }}</h2>

      <div class="mt-10 sm:mt-16 grid gap-3 sm:gap-4 md:grid-cols-6 text-left">
        <!-- табель -->
        <article v-reveal :class="TILE" class="flex flex-col md:col-span-4">
          <h3 :class="TILE_TITLE">{{ page.bento[0].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[0].text }}</p>
          <div class="mt-5 flex flex-col gap-1.5" aria-hidden="true">
            <div class="grid grid-cols-[72px_repeat(10,1fr)] items-center gap-1.5 text-[11px] font-semibold text-black/40 dark:text-white/45">
              <span></span><span v-for="d in DAYS" :key="d" class="text-center">{{ d }}</span>
            </div>
            <div v-for="(r, ri) in ROLES" :key="r" class="grid grid-cols-[72px_repeat(10,1fr)] items-center gap-1.5">
              <span class="truncate text-xs font-semibold text-[#054C86] dark:text-[#9fd0ff]">{{ r }}</span>
              <span v-for="d in 10" :key="d" class="h-6 rounded-md bg-[linear-gradient(135deg,#0392FF,#054C86)] opacity-15 group-[.is-in]:[animation:ps-cell_4.8s_ease-in-out_infinite] motion-reduce:opacity-70 motion-reduce:animate-none"
                :style="{ animationDelay: ((ri * 7 + d * 3) % 10) * 0.45 + 's' }"></span>
            </div>
          </div>
        </article>

        <!-- зарплата -->
        <article v-reveal :class="TILE" class="md:col-span-2" style="transition-delay:100ms">
          <h3 :class="TILE_TITLE">{{ page.bento[1].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[1].text }}</p>
          <div class="mt-5 flex flex-col gap-3" aria-hidden="true">
            <div v-for="(m, i) in PAY" :key="m[0]">
              <div class="flex justify-between text-xs font-semibold text-[#054C86] dark:text-[#9fd0ff]"><span>{{ m[0] }}</span></div>
              <div class="mt-1 h-2.5 overflow-hidden rounded-full bg-[rgba(3,146,255,.14)]">
                <span class="block h-full rounded-full bg-[linear-gradient(90deg,#4ade80,#16a34a)] group-[.is-in]:[animation:zk-stock_4.6s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ '--w': m[1] + '%', width: m[1] + '%', animationDelay: i * 0.7 + 's' }"></span>
              </div>
            </div>
          </div>
        </article>

        <!-- оргструктура -->
        <article v-reveal :class="TILE" class="md:col-span-3" style="transition-delay:100ms">
          <h3 :class="TILE_TITLE">{{ page.bento[2].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[2].text }}</p>
          <div class="relative mx-auto mt-4 h-[150px] w-full max-w-[280px]" aria-hidden="true">
            <svg viewBox="0 0 280 150" class="absolute inset-0 h-full w-full" fill="none" stroke="#0392FF" stroke-width="2" stroke-linecap="round">
              <path v-for="(n, i) in ORG" :key="i" :d="`M140 26 L${n[0]} ${n[1]}`" stroke-dasharray="140" stroke-dashoffset="140" class="opacity-60 group-[.is-in]:[animation:seo-draw_.9s_ease_forwards] motion-reduce:[stroke-dashoffset:0]" :style="{ animationDelay: 300 + i * 150 + 'ms' }" />
            </svg>
            <svg viewBox="0 0 280 150" class="absolute inset-0 h-full w-full motion-reduce:hidden" fill="#0392FF">
              <circle v-for="(n, i) in ORG" :key="'d' + i" r="3.5"><animateMotion :path="`M140 26 L${n[0]} ${n[1]} L140 26`" dur="3.4s" :begin="`${i * 0.55}s`" repeatCount="indefinite" /></circle>
            </svg>
            <span class="absolute left-[calc(50%-18px)] top-[8px] flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white" :class="GRAD">
              <span class="absolute inset-0 rounded-full bg-[#0392FF]/50 [animation:seo-ping_2.4s_ease-out_infinite] motion-reduce:animate-none"></span>
              <span class="relative">★</span>
            </span>
            <span v-for="(n, i) in ORG" :key="'n' + i" :style="{ left: `calc(${(n[0] / 280) * 100}% - 12px)`, top: `calc(${(n[1] / 150) * 100}% - 12px)` }"
              class="absolute h-6 w-6 scale-0 rounded-full border-2 border-[#0392FF] bg-[#fff] transition-transform duration-500 dark:bg-[#0f1f3d] group-[.is-in]:scale-100 group-[.is-in]:[animation:seo-glowpulse_2.4s_ease-in-out_infinite] motion-reduce:scale-100"></span>
          </div>
        </article>

        <!-- отпуска -->
        <article v-reveal :class="TILE" class="md:col-span-3" style="transition-delay:180ms">
          <h3 :class="TILE_TITLE">{{ page.bento[3].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[3].text }}</p>
          <div class="relative mt-5 flex flex-col gap-3 overflow-hidden rounded-2xl bg-[rgba(3,146,255,.06)] px-3 py-4 dark:bg-[rgba(255,255,255,.04)]" aria-hidden="true">
            <div v-for="(g, i) in VAC" :key="i" class="relative h-[18px]">
              <span class="absolute top-0 h-full rounded-full group-[.is-in]:[animation:zk-slide_6s_ease-in-out_infinite] motion-reduce:animate-none"
                :class="g[2]" :style="{ left: g[0] + '%', width: g[1] + '%', '--x': g[3] + '%', animationDelay: i * 0.8 + 's' }"></span>
            </div>
          </div>
        </article>

        <!-- регистратор -->
        <article v-reveal :class="TILE" class="md:col-span-6" style="transition-delay:100ms">
          <div class="flex flex-col items-center gap-6 md:flex-row md:gap-10">
            <div class="flex shrink-0 items-center gap-5" aria-hidden="true">
              <span class="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0392FF]/40 bg-[rgba(3,146,255,.08)] text-[#054C86] dark:text-[#6cb6f2]">
                <span class="absolute inset-0 rounded-2xl bg-[#0392FF]/30 [animation:seo-ping_2.4s_ease-out_infinite] motion-reduce:animate-none"></span>
                <svg viewBox="0 0 24 24" class="relative h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>
              </span>
              <span class="relative h-[3px] w-24 overflow-hidden rounded-full bg-[rgba(3,146,255,.2)]"><i class="absolute inset-y-0 w-10 bg-[linear-gradient(90deg,transparent,#0392FF,transparent)] [animation:fin-run_1.6s_linear_infinite] motion-reduce:animate-none"></i></span>
              <span class="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-sm font-bold text-white" :class="GRAD">HasApp</span>
            </div>
            <div class="text-center md:text-left">
              <h3 :class="TILE_TITLE">{{ page.bento[4].title }}</h3>
              <p :class="TILE_TEXT">{{ page.bento[4].text }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ===== вопросы ===== -->
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
        <p class="relative mt-6 text-sm text-white/70">{{ u.see }} <a href="/crm" class="underline">CRM</a> · <a href="/sklad" class="underline">{{ u.sklad }}</a> · <a href="/finance" class="underline">{{ u.fin }}</a> · <a href="/tarify" class="underline">{{ u.cost }}</a> · <a href="/" class="underline">{{ u.home }}</a></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import SeoFaq from '@/components/SeoFaq.vue'
import { H2, GRAD, RISE, GLOW_A, GLOW_B, SMALL_HEAD, NOTE, CTA, CTA_MAIN, CTA_GHOST, BTN_GHOST } from './ui'
import { vReveal } from '@/composables/useReveal'
import { seoUi } from '@/pages/seoPages.js'

defineProps({ page: { type: Object, required: true } })
const { t, locale, getLocaleMessage } = useI18n()
// надписи страницы лежат в языковых файлах: seoUi.personal
const u = seoUi('personal', locale.value, getLocaleMessage)
const openContactModal = inject('openContactModal', () => {})

const TILE = 'group overflow-hidden rounded-[26px] border border-[#0392FF]/30 px-[22px] pt-[22px] pb-6 bg-[linear-gradient(145deg,rgba(255,255,255,.85),rgba(3,146,255,.07))] dark:border-[rgba(60,140,255,.4)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,.05),rgba(3,146,255,.08))]'
const TILE_TITLE = 'font-display font-bold text-[19px] leading-[1.2] text-[#054C86] dark:text-[#6cb6f2]'
const TILE_TEXT = 'mt-2 text-[15px] leading-normal text-black/60 dark:text-white/65'

// условные данные для картинок
const DAYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const ROLES = u.roles
const PAY = [[u.roles[0], 78], [u.roles[1], 64], [u.roles[2], 52]]
const ORG = [[40, 118], [140, 118], [240, 118]]
const VAC = [
  [4, 30, 'bg-[linear-gradient(90deg,#0392FF,#054C86)]', 24],
  [30, 26, 'bg-[linear-gradient(90deg,#4ade80,#16a34a)]', -18],
  [52, 34, 'bg-[linear-gradient(90deg,#fbbf24,#d97706)]', 14],
]

// условные данные: смены в минутах от полуночи
const HOURS = [8, 10, 12, 14, 16, 18]
const ROWS = [
  { name: u.roles[0], s: 8 * 60 + 52, e: 17 * 60 + 40 },
  { name: u.roles[1], s: 9 * 60 + 3, e: 17 * 60 + 55 },
  { name: u.roles[2], s: 8 * 60 + 10, e: 16 * 60 + 30 },
  { name: u.roles[3], vac: true },
  { name: u.admin, s: 8 * 60 + 40, e: 17 * 60 + 20 },
  { name: u.driver, s: 10 * 60, e: 17 * 60 + 50 },
]
const pct = (m) => ((m - 480) / 600) * 100
const hm = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0')

const nowMin = ref(12 * 60 + 30)
const cursor = computed(() => pct(nowMin.value))
const clock = computed(() => hm(Math.round(nowMin.value)))
const visible = (r) => Math.max(0, Math.min(nowMin.value, r.e) - r.s) / 6
const present = computed(() => ROWS.filter((r) => !r.vac && nowMin.value >= r.s && nowMin.value < r.e).length)

const active = ref(0)
let raf = 0
let stepTimer = null
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { nowMin.value = 18 * 60; active.value = 3; return }
  stepTimer = setInterval(() => { active.value = (active.value + 1) % 4 }, 1700)
  let last = performance.now()
  let hold = 0
  const frame = (now) => {
    const dt = (now - last) / 1000
    last = now
    if (hold > 0) { hold -= dt; if (hold <= 0) nowMin.value = 8 * 60 }
    else {
      nowMin.value += dt * 46
      if (nowMin.value >= 18 * 60) { nowMin.value = 18 * 60; hold = 2.2 }
    }
    raf = requestAnimationFrame(frame)
  }
  nowMin.value = 8 * 60
  raf = requestAnimationFrame(frame)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); clearInterval(stepTimer) })
</script>
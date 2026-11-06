<template>
  <main class="overflow-x-clip">
    <!-- ===== первый экран: текст слева, живой проект справа ===== -->
    <section class="relative pt-[96px] sm:pt-28 md:pt-32 px-4 sm:px-8 pb-12 sm:pb-20 w-full max-w-[1280px] mx-auto">
      <div :class="GLOW_A" aria-hidden="true"></div>
      <div :class="GLOW_B" style="animation-delay:-6s" aria-hidden="true"></div>

      <div class="relative z-[2] grid items-center gap-10 lg:gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div class="flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
          <LabelBadge :class="RISE" style="animation-delay:0ms">
            <template #icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 12l3 3 5-6" /></svg>
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

        <!-- проект: задачи сами выполняются, кольцо растёт -->
        <div :class="RISE" style="animation-delay:340ms">
          <div :class="WINDOW" class="text-left">
            <div :class="WINDOW_BAR">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
              <b :class="WINDOW_TITLE">{{ u.project }}</b>
              <em :class="WINDOW_ONLINE"><i :class="WINDOW_DOT"></i> {{ u.online }}</em>
            </div>
            <div class="flex items-center gap-5 px-4 pt-5 sm:px-6">
              <div class="relative h-[92px] w-[92px] shrink-0">
                <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90" fill="none" stroke-width="10" aria-hidden="true">
                  <circle cx="50" cy="50" r="42" stroke="rgba(3,146,255,.16)" />
                  <circle cx="50" cy="50" r="42" stroke="url(#zdGrad)" stroke-linecap="round" pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100 - percent" class="transition-[stroke-dashoffset] duration-700 ease-out" />
                  <defs><linearGradient id="zdGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0392FF" /><stop offset="100%" stop-color="#054C86" /></linearGradient></defs>
                </svg>
                <b class="absolute inset-0 flex items-center justify-center text-xl tabular-nums text-[#054C86] dark:text-white">{{ percent }}%</b>
              </div>
              <div>
                <div :class="SMALL_HEAD" class="!mb-1">{{ u.doneTasks }}</div>
                <b class="text-2xl tabular-nums text-[#054C86] dark:text-white">{{ doneN }} <small class="text-sm font-medium opacity-60">{{ u.of }} {{ tasks.length }}</small></b>
              </div>
            </div>
            <ul class="flex flex-col gap-2 px-4 pb-5 pt-4 sm:px-6">
              <li v-for="tk in tasks" :key="tk.id" class="flex items-center gap-3 rounded-xl border border-[#0392FF]/20 bg-[#fff] px-3.5 py-3 transition-colors duration-500 dark:bg-[#0f1f3d]" :class="tk.done ? '!border-green-500/40' : ''">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-500"
                  :class="tk.done ? 'scale-110 border-green-500 bg-green-500 text-white' : 'border-[#0392FF]/50 text-transparent'">
                  <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                </span>
                <span class="min-w-0 flex-1 truncate text-sm font-semibold transition-all duration-500" :class="tk.done ? 'text-black/40 line-through dark:text-white/40' : 'text-[#054C86] dark:text-[#9fd0ff]'">{{ tk.label }}</span>
                <span :class="tk.done ? CHIP.in : CHIP.out" class="!min-w-[78px] whitespace-nowrap transition-colors duration-300">{{ tk.done ? u.done : u.wip }}</span>
              </li>
            </ul>
          </div>
          <p :class="NOTE">{{ u.note }}</p>
        </div>
      </div>
    </section>

    <!-- ===== как идёт работа ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.stepsTitle }}</h2>
      <div class="mt-10 sm:mt-16 grid gap-3 sm:gap-4 md:grid-cols-4 text-left">
        <div v-for="(s, i) in page.steps" :key="s.title" v-reveal :style="{ transitionDelay: i * 90 + 'ms' }">
          <div class="relative h-full rounded-[22px] border p-5 transition-all duration-500"
            :class="active === i
              ? '-translate-y-1.5 border-[#0392FF] bg-[linear-gradient(150deg,#fff,#dcedff)] shadow-[0_18px_44px_rgba(3,146,255,.3)] dark:bg-[linear-gradient(150deg,rgba(3,146,255,.22),rgba(5,76,134,.2))]'
              : 'border-[#0392FF]/25 bg-[rgba(255,255,255,.6)] dark:border-[rgba(60,140,255,.3)] dark:bg-[rgba(255,255,255,.04)]'">
            <span class="relative flex h-11 w-11 items-center justify-center rounded-full font-bold text-white transition-transform duration-500" :class="[GRAD, active === i ? 'scale-110' : 'scale-100']">
              {{ i + 1 }}
              <span v-if="active === i" class="absolute inset-0 rounded-full bg-[#0392FF]/50 [animation:seo-ping_1.6s_ease-out_infinite] motion-reduce:animate-none"></span>
            </span>
            <h3 class="mt-4 font-display font-bold text-lg text-[#054C86] dark:text-[#6cb6f2]">{{ s.title }}</h3>
            <p class="mt-1.5 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== мозаика ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.bentoTitle }}</h2>

      <div class="mt-10 sm:mt-16 grid gap-3 sm:gap-4 md:grid-cols-6 text-left">
        <!-- доска -->
        <article v-reveal :class="TILE" class="md:col-span-4">
          <h3 :class="TILE_TITLE">{{ page.bento[0].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[0].text }}</p>
          <div class="mt-5 grid grid-cols-3 gap-3 text-xs" aria-hidden="true">
            <div v-for="(c, ci) in COLS" :key="c" class="rounded-2xl bg-[rgba(3,146,255,.06)] px-2.5 pb-2.5 pt-2.5 dark:bg-[rgba(255,255,255,.04)]" :class="ci === 2 ? '!bg-[rgba(34,197,94,.08)]' : ''">
              <div class="mb-2 font-bold" :class="ci === 2 ? 'text-green-700 dark:text-green-400' : 'text-[#054C86] dark:text-[#6cb6f2]'">{{ c }}</div>
              <div class="h-[92px]"></div>
            </div>
          </div>
          <!-- карточки едут по колонкам поверх доски -->
          <div class="relative -mt-[100px] mb-[8px] grid grid-cols-3 gap-3 px-2.5" aria-hidden="true">
            <div v-for="(k, i) in CARDS" :key="i" class="relative h-[28px]" :style="{ gridColumn: 1, gridRow: i + 1 }">
              <span class="absolute inset-x-0 top-0 flex h-[28px] items-center rounded-lg border border-[#0392FF]/30 bg-[#fff] px-2.5 text-[11px] font-semibold text-[#054C86] shadow-[0_4px_12px_rgba(5,76,134,.14)] group-[.is-in]:[animation:zd-move_9s_ease-in-out_infinite] dark:bg-[#0f1f3d] dark:text-[#9fd0ff] motion-reduce:animate-none"
                :style="{ animationDelay: i * 1.6 + 's' }">{{ k }}</span>
            </div>
          </div>
        </article>

        <!-- проекты на виду -->
        <article v-reveal :class="TILE" class="md:col-span-2" style="transition-delay:100ms">
          <h3 :class="TILE_TITLE">{{ page.bento[1].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[1].text }}</p>
          <div class="mt-5 flex flex-col gap-3.5" aria-hidden="true">
            <div v-for="(m, i) in PROJ" :key="m[0]">
              <div class="flex justify-between text-xs font-semibold text-[#054C86] dark:text-[#9fd0ff]"><span>{{ m[0] }}</span><span>{{ m[1] }}%</span></div>
              <div class="mt-1 h-2.5 overflow-hidden rounded-full bg-[rgba(3,146,255,.14)]">
                <span class="block h-full rounded-full bg-[linear-gradient(90deg,#0392FF,#054C86)] group-[.is-in]:[animation:zd-fill_5s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ '--w': m[1] + '%', width: m[1] + '%', animationDelay: i * 0.9 + 's' }"></span>
              </div>
            </div>
          </div>
        </article>

        <!-- отчёты -->
        <article v-reveal :class="TILE" class="md:col-span-3" style="transition-delay:100ms">
          <h3 :class="TILE_TITLE">{{ page.bento[2].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[2].text }}</p>
          <div class="mt-5 flex h-[110px] items-end gap-2" aria-hidden="true">
            <span v-for="(h, i) in [45, 70, 55, 85, 60, 92, 50]" :key="i" :style="{ height: h + '%', animationDelay: i * 0.35 + 's' }"
              class="flex-1 origin-bottom rounded-[8px_8px_3px_3px] bg-[linear-gradient(180deg,#0392FF,#054C86)] group-[.is-in]:[animation:fin-bar_3.4s_ease-in-out_infinite] motion-reduce:animate-none"></span>
          </div>
        </article>

        <!-- чаты -->
        <article v-reveal :class="TILE" class="md:col-span-3" style="transition-delay:180ms">
          <h3 :class="TILE_TITLE">{{ page.bento[3].title }}</h3>
          <p :class="TILE_TEXT">{{ page.bento[3].text }}</p>
          <div class="mt-5 flex flex-col items-start gap-2.5" aria-hidden="true">
            <div class="rounded-[16px_16px_16px_4px] bg-[rgba(3,146,255,.12)] px-3.5 py-2.5 text-sm text-[#054C86] dark:bg-[rgba(3,146,255,.2)] dark:text-[#9fd0ff]">{{ u.chat1 }}</div>
            <div class="self-end rounded-[16px_16px_4px_16px] px-3.5 py-2.5 text-sm text-white" :class="GRAD">{{ u.chat2 }}</div>
            <div class="inline-flex gap-[5px] rounded-2xl bg-[rgba(5,76,134,.1)] px-3.5 py-[11px] dark:bg-[rgba(255,255,255,.08)]">
              <i v-for="d in [0, 150, 300]" :key="d" class="h-[7px] w-[7px] rounded-full bg-[#0392FF] [animation:crm-dot_1.2s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ animationDelay: d + 'ms' }"></i>
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
        <p class="relative mt-6 text-sm text-white/70">{{ u.see }} <a href="/crm" class="underline">CRM</a> · <a href="/zakazy" class="underline">{{ u.orders }}</a> · <a href="/personal" class="underline">{{ u.staff }}</a> · <a href="/tarify" class="underline">{{ u.cost }}</a> · <a href="/" class="underline">{{ u.home }}</a></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import SeoFaq from '@/components/SeoFaq.vue'
import { H2, GRAD, RISE, GLOW_A, GLOW_B, WINDOW, WINDOW_BAR, WINDOW_TITLE, WINDOW_ONLINE, WINDOW_DOT, SMALL_HEAD, NOTE, CHIP, CTA, CTA_MAIN, CTA_GHOST, BTN_GHOST } from './ui'
import { vReveal } from '@/composables/useReveal'
import { seoUi } from '@/pages/seoPages.js'

defineProps({ page: { type: Object, required: true } })
const { t, locale, getLocaleMessage } = useI18n()
// надписи страницы лежат в языковых файлах: seoUi.zadachi
const u = seoUi('zadachi', locale.value, getLocaleMessage)
const openContactModal = inject('openContactModal', () => {})

const TILE = 'group overflow-hidden rounded-[26px] border border-[#0392FF]/30 px-[22px] pt-[22px] pb-6 bg-[linear-gradient(145deg,rgba(255,255,255,.85),rgba(3,146,255,.07))] dark:border-[rgba(60,140,255,.4)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,.05),rgba(3,146,255,.08))]'
const TILE_TITLE = 'font-display font-bold text-[19px] leading-[1.2] text-[#054C86] dark:text-[#6cb6f2]'
const TILE_TEXT = 'mt-2 text-[15px] leading-normal text-black/60 dark:text-white/65'

// условные данные для картинок
const COLS = u.cols
const CARDS = u.cards
const PROJ = [[u.projects[0], 82], [u.projects[1], 56], [u.projects[2], 34]]

// ---------- задачи проекта ----------
const tasks = reactive([
  { id: 1, label: u.tasks[0], done: true },
  { id: 2, label: u.tasks[1], done: false },
  { id: 3, label: u.tasks[2], done: false },
  { id: 4, label: u.tasks[3], done: false },
])
const doneN = computed(() => tasks.filter((x) => x.done).length)
const percent = computed(() => Math.round((doneN.value / tasks.length) * 100))
const active = ref(0)

let timer = null
let stepTimer = null
let hold = 0
const tick = () => {
  const next = tasks.find((x) => !x.done)
  if (next) { next.done = true; return }
  if (++hold >= 2) { hold = 0; tasks.forEach((x, i) => { x.done = i === 0 }) }
}
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(tick, 1500)
  stepTimer = setInterval(() => { active.value = (active.value + 1) % 4 }, 1800)
})
onBeforeUnmount(() => { clearInterval(timer); clearInterval(stepTimer) })
</script>
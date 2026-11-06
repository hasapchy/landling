<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full">
    <div class="relative mx-auto max-w-[1320px] px-4 sm:px-6 mt-3 sm:mt-4" @mouseleave="closeMega(160)">
      <div class="flex items-center justify-between gap-4
          rounded-full px-4 sm:px-6 py-2.5 sm:py-3
          bg-white/40 backdrop-blur [-webkit-backdrop-filter:blur(4px)]
          border border-white/40 dark:border-white/10
          shadow-[0_4px_24px_rgba(5,76,134,0.08)]">

        <!-- лого -->
                <a href="#" class="flex items-center gap-2 shrink-0">
          <img src="/images/logo.webp" alt="HasApp" width="2612" height="719" loading="eager" decoding="async"
            class="h-7 sm:h-8 w-auto" />
        </a>

        <!-- навигация -->
        <nav class="hidden xl:flex items-center gap-3 min-[1500px]:gap-8">
          <a href="#about" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('about.badge') }}</a>
          <a href="#features" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('nav.features') }}</a>
          <button type="button" @click="megaOpen = !megaOpen" @mouseenter="openMega" @keydown.escape="megaOpen = false"
            :aria-expanded="megaOpen" aria-haspopup="true"
            class="group inline-flex items-center gap-1 whitespace-nowrap text-md font-medium transition-colors"
            :class="megaOpen ? 'text-[#054C86] dark:text-[#6cb6f2]' : 'text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2]'">
            {{ modulesLabel }}
            <svg viewBox="0 0 20 20" class="h-4 w-4 transition-transform duration-300" :class="megaOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5" /></svg>
          </button>
          <a href="#how-it-works" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('nav.howItWorks') }}</a>
          <a href="#cases" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('cases.badge') }}</a>
          <!-- <a href="#testimonials" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] transition-colors">{{
            t('nav.testimonials') }}</a> -->
          <a href="#pricing" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('nav.pricing') }}</a>
          <a href="#faq" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('nav.faq') }}</a>
          <a href="#contacts" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('nav.contacts') }}</a>
        </nav>

        <div class="flex items-center gap-2 min-[400px]:gap-3 sm:gap-4 shrink-0">
          <!-- переключатель языка -->
          <div class="relative">
            <button type="button" @click="langOpen = !langOpen"
              class="flex items-center gap-1.5 text-sm font-medium text-black/70 hover:text-[#054C86] transition-colors">
              <img :src="`https://flagcdn.com/24x18/${flagCodes[locale]}.png`" :alt="locale.toUpperCase()"
                class="w-5 h-[15px] rounded-[2px] object-cover" />

            </button>

            <div v-if="langOpen"
              class="absolute right-0 mt-2 py-1.5 min-w-[50px] rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-[0_4px_24px_rgba(5,76,134,0.12)]">
              <button type="button" @click="setLocale('tm')"
                class="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-[#054C86]/5">
                <img :src="`https://flagcdn.com/24x18/${flagCodes.tm}.png`" alt="TM"
                  class="w-5 h-[15px] rounded-[2px] object-cover" />
              </button>
              <button type="button" @click="setLocale('ru')"
                class="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-[#054C86]/5">
                <img :src="`https://flagcdn.com/24x18/${flagCodes.ru}.png`" alt="RU"
                  class="w-5 h-[15px] rounded-[2px] object-cover" />
              </button>
              <button type="button" @click="setLocale('en')"
                class="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-[#054C86]/5">
                <img :src="`https://flagcdn.com/24x18/${flagCodes.en}.png`" alt="EN"
                  class="w-5 h-[15px] rounded-[2px] object-cover" />
              </button>
            </div>
          </div>

          <!-- переключатель тёмной темы -->
          <button type="button" @click="toggleTheme" :aria-label="isDark ? t('nav.lightMode') : t('nav.darkMode')"
            class="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-black/70 dark:text-white/80 hover:text-[#054C86] dark:hover:text-white transition-colors">
            <svg v-if="isDark" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 sm:h-[18px] sm:w-[18px]">
              <path d="M10 2.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2.5zM10 15.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM17.5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.75 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM15.657 4.343a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zM6.464 13.536a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zM15.657 15.657a.75.75 0 01-1.06 0l-1.061-1.06a.75.75 0 111.06-1.061l1.061 1.06a.75.75 0 010 1.061zM6.464 6.464a.75.75 0 01-1.06 0l-1.061-1.06a.75.75 0 011.06-1.061l1.061 1.06a.75.75 0 010 1.061zM10 6a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <svg v-else viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 sm:h-[18px] sm:w-[18px]">
              <path fill-rule="evenodd"
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <!-- кнопка меню (всё, что уже xl) -->
          <button type="button" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Menu"
            class="relative z-[70] flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black/70 dark:text-white/80 hover:text-[#054C86] dark:hover:text-white transition-colors xl:hidden">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="h-5 w-5">
              <path v-if="!menuOpen" d="M3 6h14M3 10h14M3 14h14" />
              <path v-else d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>

          <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer"
            class="btn-primary hidden min-[480px]:inline-flex whitespace-nowrap !px-4 min-[400px]:!px-5 !py-2.5 sm:!px-6 sm:!py-3 !text-xs sm:!text-sm shrink-0 no-underline">
            {{ t('nav.tryDemo') }}
          </a>
        </div>
      </div>

    <!-- мега-меню «Модули»: CRM крупно, остальные — цветными карточками -->
    <Transition name="mega">
      <div v-if="megaOpen" class="absolute left-1/2 top-full z-[60] hidden w-[min(1080px,calc(100%-2rem))] -translate-x-1/2 pt-3 xl:block" @mouseenter="openMega">
        <div class="rounded-[28px] border border-white/60 bg-white/95 p-4 shadow-[0_30px_80px_rgba(5,76,134,.22)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0a1b36]/95">
          <div class="grid grid-cols-[1.1fr_1fr_1fr] grid-rows-[repeat(3,84px)] gap-3">
            <!-- крупная карточка -->
            <a :href="bigModule.href" @click="megaOpen = false" :key="bigModule.key"
              class="mega-swap group relative row-span-2 flex flex-col overflow-hidden rounded-3xl p-6 text-white no-underline transition-transform duration-300 hover:-translate-y-0.5"
              :style="{ background: bigModule.grad, boxShadow: '0 16px 40px ' + bigModule.glow }">
              <span class="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 transition-transform duration-500 group-hover:scale-125"></span>
              <span class="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/25">
                <svg viewBox="0 0 24 24" class="h-[22px] w-[22px]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="bigModule.icon"></svg>
              </span>
              <span class="relative mt-auto font-display text-[26px] font-extrabold leading-none">{{ bigModule.title }}</span>
              <span v-if="bigModule.text" class="relative mt-2 text-sm text-white/85">{{ bigModule.text }}</span>
              <span class="relative mt-3 text-sm font-bold">{{ moreLabel }} <span class="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>
            </a>
            <a v-for="m in smallModules" :key="m.href" :href="m.href" @click="megaOpen = false" @mouseenter="activeKey = m.key" @focus="activeKey = m.key"
              class="group flex items-center gap-3.5 rounded-[20px] border bg-[#fff] px-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(5,76,134,.14)] dark:bg-[rgba(255,255,255,.04)]"
              :class="[m.key === activeKey ? 'border-[#0392FF] ring-2 ring-[#0392FF]/25 dark:border-[#6cb6f2]' : 'border-[#0392FF]/20 hover:border-[#0392FF]/50 dark:border-white/10 dark:hover:border-[#6cb6f2]/50']">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" :style="{ background: m.grad, boxShadow: '0 8px 20px ' + m.glow }">
                <svg viewBox="0 0 24 24" class="h-[22px] w-[22px]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="m.icon"></svg>
              </span>
              <span class="min-w-0">
                <span class="block font-display text-[15px] font-bold text-[#054C86] dark:text-white">{{ m.title }}</span>
                <span v-if="m.text" class="mt-0.5 block truncate text-[13px] text-black/55 dark:text-white/55">{{ m.text }}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
    </div>
  </header>
  <Teleport to="body">
    <Transition name="menu-fade">
      <div v-if="menuOpen" class="fixed inset-0 z-[45] xl:hidden overflow-y-auto overflow-x-hidden
          bg-[linear-gradient(160deg,#eaf4ff_0%,#cfe5fb_55%,#b4d5f7_100%)]
          dark:bg-[linear-gradient(160deg,#061a33_0%,#04142a_55%,#020b18_100%)]"
        role="dialog" aria-modal="true" @click.self="menuOpen = false">
        <!-- свечения -->
        <div aria-hidden="true" class="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-[40px]
            bg-[radial-gradient(circle,rgba(0,140,255,0.4)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,140,255,0.45)_0%,transparent_70%)]"></div>
        <div aria-hidden="true" class="pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full blur-[40px]
            bg-[radial-gradient(circle,rgba(5,90,190,0.35)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(5,90,190,0.5)_0%,transparent_70%)]"></div>

        <div class="relative mx-auto flex min-h-full w-full max-w-[560px] flex-col px-5 pt-24 pb-10">
          <nav class="flex flex-col">
            <template v-for="(l, i) in menuLinks" :key="l.href || 'modules'">
            <div v-if="l.modules" class="menu-item border-b border-[#054C86]/15 dark:border-white/10" :style="{ transitionDelay: (i * 45 + 80) + 'ms' }">
              <button type="button" @click="modsOpen = !modsOpen" :aria-expanded="modsOpen" class="flex w-full items-center justify-between gap-4 py-3.5 text-left sm:py-4">
                <span class="flex-1 text-[20px] sm:text-[24px] font-semibold leading-tight text-[#054C86] dark:text-white">{{ modulesLabel }}</span>
                <svg viewBox="0 0 20 20" class="h-5 w-5 text-[#054C86]/60 transition-transform duration-300 dark:text-white/50" :class="modsOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l5 5 5-5" /></svg>
              </button>
              <div class="grid transition-all duration-300" :class="modsOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'">
                <div class="overflow-hidden">
                  <a v-for="m in modules" :key="m.href" :href="m.href" @click="menuOpen = false" class="flex items-center gap-3 rounded-xl px-1 py-2.5 no-underline">
                    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white" :style="{ background: m.grad }"><svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="m.icon"></svg></span>
                    <span class="text-[17px] font-semibold text-[#054C86] dark:text-white">{{ m.title }}</span>
                  </a>
                </div>
              </div>
            </div>
            <a v-else :href="l.href" @click="menuOpen = false"
              :style="{ transitionDelay: (i * 45 + 80) + 'ms' }"
              class="menu-item group flex items-center justify-between gap-4 border-b border-[#054C86]/15 dark:border-white/10 py-3.5 sm:py-4">
              <span class="flex-1 text-[20px] sm:text-[24px] font-semibold leading-tight text-[#054C86] dark:text-white transition-transform duration-200 group-hover:translate-x-1.5">{{ l.label }}</span>
              <span class="text-lg text-[#054C86]/50 dark:text-white/40 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            </template>
          </nav>

          <div class="menu-item mt-8" :style="{ transitionDelay: (menuLinks.length * 45 + 120) + 'ms' }">
            <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer"
              @click="menuOpen = false"
              class="btn-primary w-full !py-3.5 !text-sm no-underline">
              {{ t('nav.tryDemo') }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
const { t, locale } = useI18n()
const { isDark, toggleTheme } = useTheme()

const langOpen = ref(false)
const menuOpen = ref(false)
watch(menuOpen, (v) => { document.documentElement.style.overflow = v ? 'hidden' : '' })
const onKey = (e) => { if (e.key === 'Escape') menuOpen.value = false }
const onResize = () => { if (window.innerWidth >= 1280) menuOpen.value = false }
onMounted(() => { window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize) })
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); document.documentElement.style.overflow = '' })
const menuLinks = computed(() => [
  { href: '#about', label: t('about.badge') },
  { href: '#features', label: t('nav.features') },
  { modules: true },
  { href: '#how-it-works', label: t('nav.howItWorks') },
  { href: '#cases', label: t('cases.badge') },
  { href: '#pricing', label: t('nav.pricing') },
  { href: '#faq', label: t('nav.faq') },
  { href: '#contacts', label: t('nav.contacts') },
])

// ---------- мега-меню «Модули» (туркменские тексты — на проверку носителем) ----------
const megaOpen = ref(false)
const modsOpen = ref(false)
let megaTimer = null
const openMega = () => { clearTimeout(megaTimer); megaOpen.value = true }
const closeMega = (d = 0) => { clearTimeout(megaTimer); megaTimer = setTimeout(() => { megaOpen.value = false }, d) }
const onDocClick = (e) => { if (megaOpen.value && !e.target.closest('header')) megaOpen.value = false }
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
const MOD_ICONS = {
  sklad: '<path d="M3 8l9-5 9 5v10l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v10" />',
  crm: '<circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.4 2.7-6 6-6s6 2.6 6 6M16 5a3 3 0 0 1 0 6M18 14c2 .6 3 2.4 3 5" />',
  zakazy: '<rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" />',
  finance: '<circle cx="9" cy="9" r="6" /><path d="M15 6.3a6 6 0 1 1-5.7 8.7M7 9h4M9 7v4" />',
  personal: '<circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" />',
  zadachi: '<rect x="3" y="4" width="5" height="16" rx="1.5" /><rect x="10" y="4" width="5" height="10" rx="1.5" /><rect x="17" y="4" width="4" height="6" rx="1.5" />',
  tarify: '<path d="M20 12l-8 8-9-9V4h7z" /><circle cx="8" cy="8" r="1.4" />',
}
// названия и описания модулей — в языковых файлах (modulesMenu); порядок ссылок — здесь
const MOD_LINKS = [['/sklad', 'sklad'], ['/crm', 'crm'], ['/zakazy', 'zakazy'], ['/finance', 'finance'], ['/personal', 'personal'], ['/zadachi', 'zadachi'], ['/tarify', 'tarify']]
const modulesLabel = computed(() => t('modulesMenu.label'))
const MOD_GRAD = {
  sklad: ['linear-gradient(135deg,#38bdf8,#0369a1)', 'rgba(3,105,161,.4)'],
  crm: ['linear-gradient(135deg,#818cf8,#4338ca)', 'rgba(67,56,202,.4)'],
  zakazy: ['linear-gradient(135deg,#34d399,#047857)', 'rgba(4,120,87,.4)'],
  finance: ['linear-gradient(135deg,#fbbf24,#b45309)', 'rgba(180,83,9,.4)'],
  personal: ['linear-gradient(135deg,#f472b6,#be185d)', 'rgba(190,24,93,.4)'],
  zadachi: ['linear-gradient(135deg,#a78bfa,#6d28d9)', 'rgba(109,40,217,.4)'],
  tarify: ['linear-gradient(135deg,#0392FF,#054C86)', 'rgba(3,146,255,.4)'],
}
const moreLabel = computed(() => t('modulesMenu.more'))
const modules = computed(() => MOD_LINKS.map(([href, k]) => ({ href, title: t(`modulesMenu.items.${k}.title`), text: t(`modulesMenu.items.${k}.text`), icon: MOD_ICONS[k], grad: MOD_GRAD[k][0], glow: MOD_GRAD[k][1], key: k })))
const activeKey = ref('crm')
const bigModule = computed(() => modules.value.find((m) => m.key === activeKey.value) || modules.value[0])
// порядок в сетке: Заказы, Финансы, Склад, Персонал, Задачи, Производство, Стоимость (CRM — крупная карточка)
const SMALL_ORDER = ['sklad', 'crm', 'zakazy', 'finance', 'personal', 'zadachi', 'tarify']
const smallModules = computed(() => SMALL_ORDER.map((k) => modules.value.find((m) => m.key === k)))
const flagCodes = { tm: 'tm', ru: 'ru', en: 'gb' }
function setLocale(lang) {
  locale.value = lang
  try {
    localStorage.setItem('hasapp_locale', lang)
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — просто не сохранится
  }
  langOpen.value = false
}
</script>

<style scoped>
.mega-swap { animation: mega-swap .3s ease; }
@keyframes mega-swap { from { opacity: .4; transform: scale(.98); } to { opacity: 1; transform: scale(1); } }
.mega-enter-active, .mega-leave-active { transition: opacity .22s ease, transform .22s ease; }
.mega-enter-from, .mega-leave-to { opacity: 0; transform: translateY(-8px); }
.menu-fade-enter-active, .menu-fade-leave-active { transition: opacity .25s ease; }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; }
.menu-fade-enter-active .menu-item { transition: opacity .4s ease, transform .4s ease; }
.menu-fade-enter-from .menu-item { opacity: 0; transform: translateY(16px); }
</style>
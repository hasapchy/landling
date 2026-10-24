<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full">
    <div class="mx-auto max-w-[1320px] px-4 sm:px-6 mt-3 sm:mt-4">
      <div class="flex items-center justify-between gap-4
          rounded-full px-4 sm:px-6 py-2.5 sm:py-3
          bg-white/40 backdrop-blur [-webkit-backdrop-filter:blur(4px)]
          border border-white/40 dark:border-white/10
          shadow-[0_4px_24px_rgba(5,76,134,0.08)]">

        <!-- лого -->
                <a href="#" class="flex items-center gap-2 shrink-0">
          <img src="/images/logo.png" alt="HasApp" width="2612" height="719" loading="eager" decoding="async"
            class="h-7 sm:h-8 w-auto" />
        </a>

        <!-- навигация -->
        <nav class="hidden xl:flex items-center gap-8">
          <a href="#about" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('about.badge') }}</a>
          <a href="#features" class="whitespace-nowrap text-md font-medium text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{
            t('nav.features') }}</a>
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
            <a v-for="(l, i) in menuLinks" :key="l.href" :href="l.href" @click="menuOpen = false"
              :style="{ transitionDelay: (i * 45 + 80) + 'ms' }"
              class="menu-item group flex items-center justify-between gap-4 border-b border-[#054C86]/15 dark:border-white/10 py-3.5 sm:py-4">
              <span class="flex-1 text-[20px] sm:text-[24px] font-semibold leading-tight text-[#054C86] dark:text-white transition-transform duration-200 group-hover:translate-x-1.5">{{ l.label }}</span>
              <span class="text-lg text-[#054C86]/50 dark:text-white/40 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
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
  { href: '#how-it-works', label: t('nav.howItWorks') },
  { href: '#cases', label: t('cases.badge') },
  { href: '#pricing', label: t('nav.pricing') },
  { href: '#faq', label: t('nav.faq') },
  { href: '#contacts', label: t('nav.contacts') },
])
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
.menu-fade-enter-active, .menu-fade-leave-active { transition: opacity .25s ease; }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; }
.menu-fade-enter-active .menu-item { transition: opacity .4s ease, transform .4s ease; }
.menu-fade-enter-from .menu-item { opacity: 0; transform: translateY(16px); }
</style>
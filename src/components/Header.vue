<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full">
    <div class="mx-auto max-w-[1320px] px-4 sm:px-6 mt-0 sm:mt-4">
      <div class="flex items-center justify-between gap-4
          rounded-full px-4 sm:px-6 py-2.5 sm:py-3
          bg-white/40 backdrop-blur [-webkit-backdrop-filter:blur(4px)]
          border border-white/40
          shadow-[0_4px_24px_rgba(5,76,134,0.08)]">

        <!-- лого -->
        <a href="#" class="flex items-center gap-2 shrink-0">
          <img src="/images/logo.png" alt="HasApp" class="h-7 sm:h-8 w-auto" />
        </a>

        <!-- навигация -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="#about" class="text-md font-medium text-black/70 hover:text-[#054C86] transition-colors">{{
            t('about.badge') }}</a>
          <a href="#features" class="text-md font-medium text-black/70 hover:text-[#054C86] transition-colors">{{
            t('nav.features') }}</a>
          <a href="#how-it-works" class="text-md font-medium text-black/70 hover:text-[#054C86] transition-colors">{{
            t('nav.howItWorks') }}</a>
          <!-- <a href="#testimonials" class="text-md font-medium text-black/70 hover:text-[#054C86] transition-colors">{{
            t('nav.testimonials') }}</a> -->
          <a href="#pricing" class="text-md font-medium text-black/70 hover:text-[#054C86] transition-colors">{{
            t('nav.pricing') }}</a>
          <a href="#faq" class="text-md font-medium text-black/70 hover:text-[#054C86] transition-colors">{{
            t('nav.faq') }}</a>
        </nav>

        <div class="flex items-center gap-3 sm:gap-4 shrink-0">
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

          <!-- кнопка -->
          <button type="button" @click="openContactModal"
            class="btn-primary !px-5 !py-2.5 sm:!px-6 sm:!py-3 !text-xs sm:!text-sm shrink-0">
            {{ t('nav.cta') }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const langOpen = ref(false)
const flagCodes = { tm: 'tm', ru: 'ru', en: 'gb' }
const openContactModal = inject('openContactModal')
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
<script setup>
import { ref, provide, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Hero from './sections/Hero.vue'
import LogoMarquee from './sections/LogoMarquee.vue'
import Features from './sections/Features.vue'
import Steps from './sections/Steps.vue'
import Pricing from './sections/Pricing.vue'
import FAQ from './sections/FAQ.vue'
import CTA from './sections/CTA.vue'
import Contacts from './sections/Contacts.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ContactModal from './components/ContactModal.vue'
import { useSeo } from '@/composables/useSeo'
import About from './sections/About.vue'
import Cases from './sections/Cases.vue'
import AppBanner from './sections/AppBanner.vue'
import PrivacyPage from './pages/PrivacyPage.vue'
import SkladPage from './pages/seo/SkladPage.vue'
import CrmPage from './pages/seo/CrmPage.vue'
import TarifyPage from './pages/seo/TarifyPage.vue'
import FinancePage from './pages/seo/FinancePage.vue'
import ZakazyPage from './pages/seo/ZakazyPage.vue'
import PersonalPage from './pages/seo/PersonalPage.vue'
import ZadachiPage from './pages/seo/ZadachiPage.vue'
import { SEO_PAGES, getSeoPage } from './pages/seoPages.js'

const { locale, getLocaleMessage } = useI18n()

// страница политики конфиденциальности: адрес /privacy
// (при пререндере на этапе сборки window нет — путь передаётся через __SSR_PATH__)
const currentPath = typeof window !== 'undefined'
  ? window.location.pathname
  : (globalThis.__SSR_PATH__ || '/')
const cleanPath = currentPath.replace(/\/+$/, '') || '/'
const isPrivacy = cleanPath === '/privacy'
const isSeo = !!SEO_PAGES[cleanPath]
const seoPage = computed(() => (isSeo ? getSeoPage(cleanPath, locale.value, getLocaleMessage(locale.value), getLocaleMessage('ru')) : null))
// у каждой страницы своя вёрстка и свои эффекты (layout указан в seoPages.js)
const SEO_COMPONENTS = { sklad: SkladPage, crm: CrmPage, tarify: TarifyPage, finance: FinancePage, zakazy: ZakazyPage, personal: PersonalPage, zadachi: ZadachiPage }
// title, description и адрес: для главной — из языковых файлов, для отдельных страниц — из seoPages.js
useSeo(isSeo ? () => ({ title: seoPage.value.title, description: seoPage.value.description, path: cleanPath }) : null)
if ((isPrivacy || isSeo) && typeof document !== 'undefined') {
  // ссылки-якоря шапки и подвала (#about и т.п.) ведут на главную страницу
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]')
    if (!a) return
    e.preventDefault()
    const href = a.getAttribute('href')
    window.location.href = '/' + (href === '#' ? '' : href)
  })
}

const isModalOpen = ref(false)
function openContactModal() {
  isModalOpen.value = true
}

provide('openContactModal', openContactModal)
</script>

<template class="overflow-x-hidden max-w-[100vw]">
  <Header />
  <PrivacyPage v-if="isPrivacy" />
  <component :is="SEO_COMPONENTS[seoPage.layout]" v-else-if="seoPage" :page="seoPage" :key="locale" />
  <template v-else>
    <Hero />
    <About />
    <LogoMarquee />
    <Features />
    <Steps />
    <Cases />
    <AppBanner />
    <Pricing />
    <FAQ />
    <CTA />
    <Contacts />
  </template>
  <Footer />

  <ContactModal v-model="isModalOpen" />
</template>
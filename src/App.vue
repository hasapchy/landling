<script setup>
import { ref, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import GlowCard from './components/GlowCard.vue'
import StarField from './components/StarField.vue'
import LabelBadge from './components/LabelBadge.vue';
import Hero from './sections/Hero.vue';
import LogoMarquee from './sections/LogoMarquee.vue';
import Features from './sections/Features.vue';
import Steps from './sections/Steps.vue';
import Users from './sections/Users.vue';
import Pricing from './sections/Pricing.vue';
import FAQ from './sections/FAQ.vue';
import CTA from './sections/CTA.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ContactModal from './components/ContactModal.vue';
import { useSeo } from '@/composables/useSeo'
import About from './sections/About.vue';
import Cases from './sections/Cases.vue';
import AppBanner from './sections/AppBanner.vue';
import PrivacyPage from './pages/PrivacyPage.vue';

const { locale, t } = useI18n()

useSeo()

// страница политики конфиденциальности: адрес /privacy
const isPrivacy = window.location.pathname.replace(/\/+$/, '') === '/privacy'
if (isPrivacy) {
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

// доступно в любом дочернем компоненте через inject('openContactModal')
provide('openContactModal', openContactModal)
</script>

<template class="overflow-x-hidden max-w-[100vw]">
  <Header />
  <PrivacyPage v-if="isPrivacy" />
  <template v-else>
    <Hero />
    <About />
    <LogoMarquee />
    <Features />
    <Steps />
    <Cases />
    <AppBanner />
    <!-- <Users /> -->
    <Pricing />
    <FAQ />
    <CTA />
  </template>
  <Footer />

  <ContactModal v-model="isModalOpen" />
</template>
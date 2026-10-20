<script setup>
import { ref, provide } from 'vue'
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

useI18n()
useSeo()

const isModalOpen = ref(false)
function openContactModal() {
  isModalOpen.value = true
}

provide('openContactModal', openContactModal)
</script>

<template class="overflow-x-hidden max-w-[100vw]">
  <Header />
  <Hero />
  <About />
  <LogoMarquee />
  <Features />
  <Steps />
  <Cases />
  <Pricing />
  <FAQ />
  <CTA />
  <Contacts />
  <Footer />

  <ContactModal v-model="isModalOpen" />
</template>

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

const { locale, t } = useI18n()

const isModalOpen = ref(false)
function openContactModal() {
  isModalOpen.value = true
}

// доступно в любом дочернем компоненте через inject('openContactModal')
provide('openContactModal', openContactModal)
</script>

<template class="overflow-x-hidden max-w-[100vw]">
  <Header />
  <Hero />
  <LogoMarquee />
  <Features />
  <Steps />
  <!-- <Users /> -->
  <Pricing />
  <FAQ />
  <CTA />
  <Footer />

  <ContactModal v-model="isModalOpen" />
</template>
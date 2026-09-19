<script setup>
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

const { locale, t } = useI18n()
</script>

<template class="overflow-x-hidden max-w-[100vw]">
  <Hero />
  <LogoMarquee />
  <Features />
  <Steps />
  <Users />
  <Pricing />
  <FAQ />
</template>
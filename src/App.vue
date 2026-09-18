<script setup>
import { useI18n } from 'vue-i18n'
import GlowCard from './components/GlowCard.vue'
import StarField from './components/StarField.vue'
import LabelBadge from './components/LabelBadge.vue';
import Hero from './sections/Hero.vue';
import LogoMarquee from './sections/LogoMarquee.vue';
import Features from './sections/Features.vue';

const { locale, t } = useI18n()
</script>

<template>
  <Hero />
  <LogoMarquee />
  <Features />
</template>
<template>
  <div class="glow-section w-full">

    <div class="glow-section__effect">
      <div class="glow-section__aura" :class="{ 'glow-section__aura--grid': grid }"></div>
      <StarField class="star-field" />
    </div>

    <div class="glow-card" :class="{ 'fade-bottom': fade }">
      <div class="glow-card__panel">
        <img v-if="src" :src="src" :alt="alt ?? ''" class="feature-image__img" />
        <slot v-else />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import StarField from '@/components/StarField.vue'

withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fade?: boolean
    grid?: boolean
  }>(),
  {
    fade: true,
    grid: false,
  }
)
</script>

<style scoped>
.fade-bottom {
  mask-image: linear-gradient(to bottom, black 35%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 35%, transparent 100%);
}
</style>
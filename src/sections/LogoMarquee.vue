<template>
  <div
    class="relative overflow-hidden w-full max-w-7xl mx-auto py-8 sm:py-10 md:py-12 flex items-center justify-start
           [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]
           [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]"
  >
    <div class="flex w-max shrink-0 marquee-track" :style="{ animationDuration: `${duration}s` }">
      <div v-for="s in 2" :key="s" class="flex items-center shrink-0">
        <div v-for="r in repeatWithin" :key="r" class="flex items-center shrink-0">
          <div
            v-for="(logo, i) in logos"
            :key="i"
            class="flex items-center justify-center shrink-0 px-5 sm:px-7 md:px-10"
          >
            <!-- светлая тема: тёмная версия логотипа; тёмная тема: оригинал (белый текст).
                 Оба файла лежат на странице, тема просто переключает видимость — без задержки -->
            <img
              :src="logo.light"
              :alt="logo.alt"
              :width="logo.width" :height="logo.height" loading="lazy" decoding="async"
              class="h-8 sm:h-12 md:h-16 w-auto object-contain dark:hidden"
            />
            <img
              :src="logo.dark"
              :alt="logo.alt"
              :width="logo.width" :height="logo.height" loading="lazy" decoding="async"
              class="hidden dark:block h-8 sm:h-12 md:h-16 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  logos: {
    type: Array,
    default: () => [
      { alt: 'Takyk Abzal', light: '/images/partners/ta-light.svg', dark: '/images/partners/ta-dark.svg', width: 712, height: 200 },
      { alt: 'Altyn Arzuw', light: '/images/partners/aa-light.svg', dark: '/images/partners/aa-dark.svg', width: 754, height: 200 },
      { alt: 'Lebizli Türkmen', light: '/images/partners/lt-light.svg', dark: '/images/partners/lt-dark.svg', width: 331, height: 200 },
      { alt: 'ZNY-logistics', light: '/images/partners/ZNY.png', dark: '/images/partners/ZNY.png', width: 331, height: 200 },
      // Zehinli Logistik — добавить, когда будет файл: { alt, light, dark, width, height }
    ],
  },
  repeatWithin: {
    type: Number,
    default: 6,
  },
  duration: {
    type: Number,
    default: 30,
  },
})
</script>

<style>
.marquee-track {
  animation-name: marquee-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

@keyframes marquee-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
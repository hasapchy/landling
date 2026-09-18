<template>
  <div
    class="relative overflow-hidden w-full max-w-7xl mx-auto py-8 sm:py-10 md:py-12 flex items-center justify-center
           [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]
           [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]"
  >
    <div class="flex w-max marquee-track" :style="{ animationDuration: `${duration}s` }">
      <div v-for="s in 2" :key="s" class="flex items-center shrink-0">
        <div v-for="r in repeatWithin" :key="r" class="flex items-center shrink-0">
          <div
            v-for="(logo, i) in logos"
            :key="i"
            class="flex items-center justify-center shrink-0 px-5 sm:px-7 md:px-10"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="h-8 sm:h-12 md:h-18 w-auto object-contain opacity-60 grayscale transition-opacity duration-200 hover:opacity-100 hover:grayscale-0"
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
      { src: '/images/logo.png', alt: 'Logo 1' },
      { src: '/images/logo.png', alt: 'Logo 2' },
      { src: '/images/logo.png', alt: 'Logo 3' },
      { src: '/images/logo.png', alt: 'Logo 4' },
      { src: '/images/logo.png', alt: 'Logo 5' },
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
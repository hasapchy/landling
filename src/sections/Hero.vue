<template>
  <section class="relative overflow-hidden text-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-10 sm:pb-12 md:pb-15 w-full max-w-[1440px] mx-auto">

    <img src="/images/hero-grid.png" alt=""
    class="absolute top-0 left-1/2 z-0 pointer-events-none -translate-x-1/2 object-contain
           w-[320px]
           xs:w-[400px]
           sm:w-[500px]
           md:w-[700px]
           lg:w-[900px]
           xl:w-[1500px]
           transition-all duration-1000 ease-out"
    :class="show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'" />

    <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
      <LabelBadge
        class="transition-all duration-700 ease-out"
        :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        style="transition-delay: 80ms">
        <template #icon>
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0l1.2 4.8L14 6l-4.8 1.2L8 12l-1.2-4.8L2 6l4.8-1.2L8 0z"/>
          </svg>
        </template>
        {{ t('hero.badge') }}
      </LabelBadge>

      <h1
        class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
               text-3xl sm:text-4xl md:text-6xl lg:text-7xl
               bg-clip-text text-transparent
               bg-[linear-gradient(90deg,#054C86,#065A9D)]
               [-webkit-text-fill-color:transparent]
               transition-all duration-700 ease-out"
        :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        style="transition-delay: 180ms"
      >
      {{ t('hero.headline') }}
      </h1>

      <p class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]
                transition-all duration-700 ease-out"
        :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        style="transition-delay: 300ms">
        {{ t('hero.description') }}
      </p>

      <button class="btn-primary !px-6 !py-3 sm:!px-8 sm:!py-3.5 md:!px-10 md:!py-4 z-5
                     transition-all duration-700 ease-out"
        :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        style="transition-delay: 420ms">
        {{ t('nav.cta') }} →
      </button>

      <GlowCard src="/images/1.jpg" :alt="t('hero.badge')"
        class="-mt-8 sm:-mt-12 md:-mt-16 transition-all duration-1000 ease-out"
        :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        style="transition-delay: 540ms" />
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import GlowCard from '@/components/GlowCard.vue'

const { t } = useI18n()

const show = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    show.value = true
  })
})
</script>
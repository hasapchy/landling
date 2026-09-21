<template>
    <section class="relative overflow-hidden text-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 w-full max-w-[1440px] mx-auto">

        <img src="/images/center.png" alt=""
            class="absolute z-[1] pointer-events-none object-contain top-0 left-1/2 -translate-x-1/2
                   w-[700px]
                   sm:w-[900px]
                   md:w-[1100px]
                   lg:w-[1300px]" />

        <div ref="contentRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6
             transition-all duration-700 ease-out"
             :class="contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
            <LabelBadge>
                <template #icon>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.5l1.8 4.7L14.5 8l-4.7 1.8L8 14.5l-1.8-4.7L1.5 8l4.7-1.8L8 1.5z" fill="currentColor" />
                    </svg>
                </template>
                {{ t('cta.badge') }}
            </LabelBadge>

            <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
                 text-3xl sm:text-4xl md:text-6xl lg:text-7xl
                 bg-clip-text text-transparent
                 bg-[linear-gradient(180deg,#054C86,#065A9D)]
                 [-webkit-text-fill-color:transparent]">
                {{ t('cta.headline') }}
            </h2>

            <p class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t('cta.description') }}
            </p>

            <button type="button" class="btn-primary mt-4 sm:mt-6">
                {{ t('cta.button') }}
            </button>
        </div>

    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'

const { t } = useI18n()

const contentRef = ref(null)
const contentVisible = ref(false)

let observer

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                contentVisible.value = true
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.2 })

    if (contentRef.value) observer.observe(contentRef.value)
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
</script>
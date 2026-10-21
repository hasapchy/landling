<template>
    <section
        class="relative overflow-hidden text-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 w-full max-w-[1440px] mx-auto">

        <img src="/images/center.png" alt="" width="2672" height="1120" loading="lazy" decoding="async"
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
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="CurrentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_64_142)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.2 4.5C7.2 4.0032 7.6032 3.6 8.1 3.6H12.6C13.5945 3.6 14.4 4.4055 14.4 5.4V9.9C14.4 10.3968 13.9968 10.8 13.5 10.8C13.0032 10.8 12.6 10.3968 12.6 9.9V7.75898C12.6 7.35848 12.1149 7.15776 11.8314 7.44126L9.1089 10.1637C8.7579 10.5147 8.1882 10.5147 7.8363 10.1637C7.4853 9.81177 7.4853 9.24202 7.8363 8.89102L10.5588 6.1686C10.8423 5.8851 10.6416 5.4 10.2411 5.4H8.1C7.6032 5.4 7.2 4.9968 7.2 4.5ZM1.8 2.7C1.8 2.2032 2.2032 1.8 2.7 1.8H15.3C15.7968 1.8 16.2 2.2032 16.2 2.7V15.3C16.2 15.7968 15.7968 16.2 15.3 16.2H8.1C7.6032 16.2 7.2 15.7968 7.2 15.3V12.6C7.2 11.6055 6.3945 10.8 5.4 10.8H2.7C2.2032 10.8 1.8 10.3968 1.8 9.9V2.7ZM18 1.8C18 0.8055 17.1945 0 16.2 0H1.8C0.8055 0 0 0.8055 0 1.8V16.2C0 17.1945 0.8055 18 1.8 18H16.2C17.1945 18 18 17.1945 18 16.2V1.8Z" />
                        </g>
                        <defs>
                            <clipPath id="clip0_64_142">
                                <rect width="18" height="18" />
                            </clipPath>
                        </defs>
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

            <p
                class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t('cta.description') }}
            </p>

            <button type="button" @click="openContactModal" class="btn-primary mt-4 sm:mt-6">
                {{ t('cta.button') }}
            </button>
        </div>

    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'

const { t } = useI18n()
const openContactModal = inject('openContactModal')
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
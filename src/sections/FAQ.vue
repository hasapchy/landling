<template>
    <section id="faq"
        class="relative overflow-hidden text-center pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 pb-16 sm:pb-20 md:pb-42 w-full max-w-[1440px] mx-auto">

        <!-- место под изображение, добавишь сама -->
        <img src="/images/faq-bg.png" alt="" width="1740" height="1740" loading="lazy" decoding="async"
          class="absolute z-[1] pointer-events-none object-contain left-1/2 -translate-x-1/2 -translate-y-1/2
           w-[600px]
           top-[520px]
           sm:w-[750px] sm:top-[580px]
           md:w-[900px] md:top-[360px]
           lg:w-[1100px] lg:top-[500px]" />

        <div ref="headingRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6
             transition-all duration-700 ease-out"
            :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
            <LabelBadge>
                <template #icon>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 16.5C10.4834 16.5 11.9334 16.0601 13.1668 15.236C14.4001 14.4119 15.3614 13.2406 15.9291 11.8701C16.4968 10.4997 16.6453 8.99168 16.3559 7.53683C16.0665 6.08197 15.3522 4.7456 14.3033 3.6967C13.2544 2.64781 11.918 1.9335 10.4632 1.64411C9.00832 1.35472 7.50032 1.50325 6.12987 2.07091C4.75943 2.63856 3.58809 3.59986 2.76398 4.83323C1.93987 6.06659 1.5 7.51664 1.5 9C1.5 10.9891 2.29018 12.8968 3.6967 14.3033C4.39314 14.9997 5.21993 15.5522 6.12987 15.9291C7.03982 16.306 8.01509 16.5 9 16.5ZM9 15C8.7775 15 8.55999 14.934 8.37498 14.8104C8.18998 14.6868 8.04578 14.5111 7.96063 14.3055C7.87549 14.1 7.85321 13.8738 7.89662 13.6555C7.94002 13.4373 8.04717 13.2368 8.2045 13.0795C8.36184 12.9222 8.56229 12.815 8.78052 12.7716C8.99875 12.7282 9.22495 12.7505 9.43052 12.8356C9.63609 12.9208 9.81179 13.065 9.9354 13.25C10.059 13.435 10.125 13.6525 10.125 13.875C10.125 14.1734 10.0065 14.4595 9.79549 14.6705C9.58452 14.8815 9.29837 15 9 15ZM6 6.7455C5.98894 6.16929 6.14805 5.60262 6.4574 5.11637C6.76676 4.63012 7.21264 4.24589 7.73925 4.01175C8.20623 3.80319 8.7182 3.71559 9.22795 3.75701C9.7377 3.79843 10.2288 3.96754 10.656 4.24875C11.0499 4.50955 11.3767 4.85968 11.6096 5.27065C11.8426 5.68161 11.9753 6.14179 11.9968 6.61372C12.0182 7.08564 11.928 7.55597 11.7333 7.98641C11.5386 8.41685 11.2451 8.79524 10.8765 9.09075C10.3596 9.48908 9.98782 10.0461 9.81825 10.6763C9.7715 10.8696 9.64987 11.0365 9.4801 11.1401C9.31034 11.2438 9.10634 11.2757 8.913 11.229C8.71966 11.1823 8.5528 11.0606 8.44914 10.8909C8.34548 10.7211 8.31351 10.5171 8.36025 10.3238C8.60438 9.37114 9.15847 8.52681 9.93525 7.92375C10.1199 7.77608 10.267 7.58685 10.3646 7.37152C10.4621 7.15618 10.5074 6.92082 10.4968 6.68465C10.4861 6.44847 10.4197 6.21816 10.3031 6.01251C10.1865 5.80685 10.0229 5.63167 9.82575 5.50125C9.60484 5.35666 9.35056 5.27109 9.08718 5.25271C8.8238 5.23432 8.5601 5.28375 8.32125 5.39625C8.06798 5.51748 7.85527 5.7095 7.70885 5.94909C7.56244 6.18868 7.48859 6.46557 7.49625 6.74625C7.48332 6.93556 7.39913 7.11292 7.26063 7.24262C7.12213 7.37231 6.93961 7.44468 6.74987 7.44516C6.56013 7.44563 6.37726 7.37417 6.23811 7.24518C6.09896 7.11618 6.01387 6.93924 6 6.75V6.7455Z"
                             />
                    </svg>

                </template>
                {{ t('faq.badge') }}
            </LabelBadge>

            <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
                 text-3xl sm:text-4xl md:text-6xl lg:text-7xl
                 bg-clip-text text-transparent
                 bg-[linear-gradient(90deg,#054C86,#065A9D)]
                 [-webkit-text-fill-color:transparent]">
                {{ t('faq.headline') }}
            </h2>

            <p
                class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 dark:text-white/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t('faq.description') }}
            </p>
        </div>

        <div
            class="relative z-[2] mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 md:gap-x-8 text-left">
            <div v-for="(column, colIndex) in [leftColumn, rightColumn]" :key="colIndex"
                class="flex flex-col gap-4 sm:gap-5">
                <div v-for="item in column" :key="item.id" :ref="el => setCardRef(el, item.id)" class="faq-card rounded-[16px] px-5 sm:px-6 overflow-hidden
                           transition-[opacity,transform] duration-700 ease-out"
                    :class="visibleCards.has(item.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{
                        transitionDelay: visibleCards.has(item.id) ? `${(item.id - 1) * 90}ms` : '0ms',
                        backgroundImage: isDark
                            ? 'linear-gradient(180deg, rgba(14,24,38,1) 0%, rgba(14,24,38,1) 100%), linear-gradient(180deg, #0392ff 0%, #2f6fa8 35%, #0e1826 100%)'
                            : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%), linear-gradient(180deg, #0392ff 0%, #7fc4ff 35%, #ffffff 100%)'
                    }">
                    <button type="button" @click="toggle(item.id)"
                        class="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left">
                        <span class="font-bold text-base sm:text-lg text-black dark:text-white">{{ item.question }}</span>
                        <span class="relative h-6 w-6 shrink-0 flex items-center justify-center text-[#054C86] dark:text-[#6cb6f2]">
                            <span class="absolute w-6 h-[2px] bg-current"></span>
                            <span class="absolute w-[2px] h-6 bg-current transition-transform duration-300"
                                :class="openIds.has(item.id) ? 'scale-y-0' : 'scale-y-100'"></span>
                        </span>
                    </button>

                    <div class="grid transition-[grid-template-rows] duration-300 ease-in-out"
                        :style="{ gridTemplateRows: openIds.has(item.id) ? '1fr' : '0fr' }">
                        <div class="overflow-hidden">
                            <p class="pb-5 sm:pb-6 text-sm sm:text-base text-black/60 dark:text-white/60 leading-relaxed">
                                {{ item.answer }}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import { useTheme } from '@/composables/useTheme'

const { t, tm } = useI18n()
const { isDark } = useTheme()

const openIds = ref(new Set())

function toggle(id) {
    const next = new Set(openIds.value)
    if (next.has(id)) {
        next.delete(id)
    } else {
        next.add(id)
    }
    openIds.value = next
}

const faqs = computed(() =>
    tm('faq.items').map((item, i) => ({
        id: i + 1,
        question: item.question,
        answer: item.answer,
    }))
)

const leftColumn = computed(() => faqs.value.filter((_, i) => i % 2 === 0))
const rightColumn = computed(() => faqs.value.filter((_, i) => i % 2 === 1))

const headingRef = ref(null)
const headingVisible = ref(false)

const cardRefs = new Map()
const visibleCards = ref(new Set())

function setCardRef(el, id) {
    if (el) cardRefs.set(id, el)
}

let observer

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target === headingRef.value) {
                    headingVisible.value = true
                    observer.unobserve(entry.target)
                } else {
                    for (const [id, el] of cardRefs.entries()) {
                        if (el === entry.target) {
                            visibleCards.value = new Set(visibleCards.value).add(id)
                            observer.unobserve(entry.target)
                            break
                        }
                    }
                }
            }
        })
    }, { threshold: 0.15 })

    if (headingRef.value) observer.observe(headingRef.value)
    cardRefs.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
</script>

<style scoped>
.faq-card {
    border: 1.5px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: border-box;
    background-image:
        linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%),
        linear-gradient(180deg, #0392ff 0%, #7fc4ff 35%, #ffffff 100%);
    box-shadow:
        inset 0 10px 36px -6px rgba(3, 146, 255, 0.25),
        inset 0 5px 20px -4px rgba(3, 146, 255, 0.15);
}
</style>
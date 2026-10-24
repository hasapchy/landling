<template>
    <section id="how-it-works"
        class="relative  text-center pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 pb-10 sm:pb-12 md:pb-15 w-full max-w-[1440px] mx-auto">

        <img src="/images/Left.png" alt="" width="1560" height="1740" loading="lazy" decoding="async"
            class="how-it-works__side how-it-works__side--left" />
        <img src="/images/Right.png" alt="" width="1740" height="1740" loading="lazy" decoding="async"
            class="how-it-works__side how-it-works__side--right" />

        <div ref="headingRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6
             transition-all duration-700 ease-out"
            :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
            <LabelBadge>
                <template #icon>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="CurrentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_60_117)">
                            <path
                                d="M8.99961 0C8.20404 0 7.44197 0.180282 6.93987 0.751758C6.43778 1.32323 6.42166 1.93254 6.3926 2.30326C6.36355 2.67398 6.33937 2.90475 6.28333 3.0477C6.22728 3.19064 6.18106 3.29985 5.83046 3.50262C5.47985 3.70538 5.36243 3.69077 5.21083 3.66791C5.05922 3.64505 4.84772 3.55074 4.51268 3.39059C4.17764 3.23043 3.64266 2.9397 2.89755 3.08953C2.15243 3.23937 1.61551 3.8103 1.21772 4.50047C0.819929 5.19064 0.594838 5.94191 0.837859 6.66322C1.08087 7.38453 1.59963 7.70328 1.90561 7.91385C2.21159 8.12441 2.39892 8.26069 2.49448 8.38078C2.59004 8.50087 2.66141 8.59552 2.66141 9.00105C2.66141 9.40659 2.59004 9.50124 2.49448 9.62133C2.39892 9.74142 2.21159 9.8777 1.90561 10.0883C1.59963 10.2988 1.08087 10.6176 0.837859 11.3389C0.594838 12.0602 0.819929 12.8115 1.21772 13.5016C1.61551 14.1918 2.15243 14.7627 2.89755 14.9126C3.64266 15.0624 4.17764 14.7717 4.51268 14.6115C4.84772 14.4514 5.05922 14.3571 5.21083 14.3342C5.36243 14.3113 5.47985 14.2967 5.83046 14.4995C6.18106 14.7023 6.22728 14.8115 6.28333 14.9544C6.33937 15.0974 6.36355 15.3281 6.3926 15.6988C6.42166 16.0696 6.43778 16.6789 6.93987 17.2504C7.44197 17.8218 8.20404 18.0021 8.99961 18.0021C9.79519 18.0021 10.5573 17.8218 11.0594 17.2504C11.5615 16.6789 11.5776 16.0696 11.6066 15.6988C11.6357 15.3281 11.6599 15.0974 11.7159 14.9544C11.7719 14.8115 11.8182 14.7023 12.1688 14.4995C12.5194 14.2967 12.6368 14.3113 12.7884 14.3342C12.94 14.3571 13.1515 14.4514 13.4865 14.6115C13.8216 14.7717 14.3566 15.0624 15.1017 14.9126C15.8468 14.7627 16.3837 14.1918 16.7815 13.5016C17.1793 12.8115 17.4044 12.0602 17.1614 11.3389C16.9184 10.6176 16.3996 10.2988 16.0936 10.0883C15.7876 9.8777 15.6003 9.74142 15.5048 9.62133C15.4092 9.50124 15.3378 9.40659 15.3378 9.00105C15.3378 8.59552 15.4092 8.50087 15.5048 8.38078C15.6003 8.26069 15.7876 8.12441 16.0936 7.91385C16.3996 7.70328 16.9184 7.38453 17.1614 6.66322C17.4044 5.94191 17.1793 5.19064 16.7815 4.50047C16.3837 3.8103 15.8468 3.23937 15.1017 3.08953C14.3566 2.9397 13.8216 3.23043 13.4865 3.39059C13.1515 3.55074 12.94 3.64505 12.7884 3.66791C12.6368 3.69077 12.5194 3.70538 12.1688 3.50262C11.8182 3.29985 11.7719 3.19064 11.7159 3.0477C11.6599 2.90475 11.6357 2.67398 11.6066 2.30326C11.5776 1.93254 11.5615 1.32323 11.0594 0.751758C10.5573 0.180282 9.79519 0 8.99961 0ZM9.00032 5.10047C11.1663 5.10047 12.9002 6.83405 12.9002 9.00105C12.9002 11.1681 11.1663 12.9016 9.00032 12.9016C6.83438 12.9016 5.10044 11.1681 5.10044 9.00105C5.10044 6.83405 6.83438 5.10047 9.00032 5.10047Z" />
                            <path
                                d="M8.99963 6.60156C7.68512 6.60156 6.59961 7.68772 6.59961 9.00125C6.59961 10.3148 7.68512 11.4009 8.99963 11.4009C10.3141 11.4009 11.3996 10.3148 11.3996 9.00125C11.3996 7.68772 10.3141 6.60156 8.99963 6.60156Z"
                                />
                        </g>
                        <defs>
                            <clipPath id="clip0_60_117">
                                <rect width="18" height="18" />
                            </clipPath>
                        </defs>
                    </svg>

                </template>
                {{ t('howItWorks.badge') }}
            </LabelBadge>

            <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
             text-3xl sm:text-4xl md:text-6xl lg:text-7xl
             bg-clip-text text-transparent
             bg-[linear-gradient(90deg,#054C86,#065A9D)]
             [-webkit-text-fill-color:transparent]">
                {{ t('howItWorks.headline') }}
            </h2>

            <p
                class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t('howItWorks.description') }}
            </p>
        </div>

        <!-- вкладки + общая сцена -->
        <div ref="showcaseRef" class="relative z-[2] mt-10 sm:mt-14 md:mt-16 lg:mt-20 w-full max-w-[880px] mx-auto
                   transition-all duration-700 ease-out"
            :class="inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">

            <!-- кнопки-вкладки -->
            <div class="grid grid-cols-3 gap-2 sm:gap-4" role="tablist">
                <button v-for="(step, index) in steps" :key="step.title" type="button" role="tab"
                    :aria-selected="active === index" @click="selectStep(index)"
                    class="relative overflow-hidden rounded-[16px] sm:rounded-[22px] border px-2 sm:px-5 py-3 sm:py-5
                           flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center
                           font-display font-bold leading-tight transition-all duration-300 cursor-pointer
                           text-[11px] sm:text-base lg:text-xl"
                    :class="active === index
                        ? 'bg-white/90 dark:bg-white/[0.09] border-[#0392FF]/40 text-[#054C86] dark:text-[#6cb6f2] shadow-[0_10px_30px_rgba(3,146,255,0.18)]'
                        : 'bg-white/50 dark:bg-white/[0.04] border-black/5 dark:border-white/10 text-black/55 dark:text-white/50 hover:bg-white/75 dark:hover:bg-white/[0.07] hover:text-black/80 dark:hover:text-white/80'">

                    <span class="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[9px] sm:rounded-[11px] text-white
                                 bg-[linear-gradient(135deg,#0392FF,#054C86)] transition-opacity duration-300"
                        :class="active === index ? 'opacity-100' : 'opacity-60'">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
                            stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 sm:h-5 sm:w-5"
                            v-html="tabIcons[index]"></svg>
                    </span>
                    <span>{{ step.title }}</span>

                    <!-- индикатор воспроизведения -->
                    <span class="absolute left-0 right-0 bottom-0 h-[3px] bg-[#0392FF]/10" v-if="active === index">
                        <span class="block h-full rounded-r-full bg-[linear-gradient(90deg,#0392FF,#054C86)]"
                            :style="{ width: (progress * 100) + '%' }"></span>
                    </span>
                </button>
            </div>

            <!-- сцена -->
            <div class="mt-3 sm:mt-5 rounded-[18px] sm:rounded-[28px] border border-[#0392FF]/60
                        bg-[radial-gradient(circle_at_50%_50%,rgba(0,94,173,0.3)_0%,rgba(218,236,248,0.2)_100%)] p-2.5 sm:p-5">
                <div ref="stageRef" class="relative w-full overflow-hidden rounded-[12px] sm:rounded-[18px]"
                    style="aspect-ratio: 900 / 481;">
                    <div v-if="inView" class="absolute left-0 top-0"
                        :style="{ width: BASE_W + 'px', transform: `scale(${stageScale})`, transformOrigin: '0 0' }">
                        <component :is="demos[active]" :key="active + '-' + runId" @finished="onDemoFinished"
                            class="w-full block rounded-[12px] sm:rounded-[16px]" />
                    </div>
                </div>
            </div>

            <!-- описание активного шага -->
            <div class="relative mt-5 sm:mt-7 min-h-[88px] sm:min-h-[84px]">
                <div v-for="(step, index) in steps" :key="'d-' + step.title"
                    class="absolute inset-0 flex flex-col items-center gap-3 text-center transition-all duration-500"
                    :class="active === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'">
                    <div class="inline-flex items-center rounded-full bg-[#054C86]/10 px-4 py-1.5">
                        <span class="text-xs sm:text-sm font-bold uppercase tracking-wider
                                     bg-clip-text text-transparent bg-[linear-gradient(180deg,#054C86,#065A9D)]
                                     [-webkit-text-fill-color:transparent]">{{ step.label }}</span>
                    </div>
                    <p class="max-w-2xl text-black/70 text-base sm:text-lg leading-relaxed">{{ step.subtitle }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import AccountSetupDemo from '@/components/demos/AccountSetupDemo.vue'
import ContactDemoSetup from '@/components/demos/ContactDemoSetup.vue'
import AccountModulesDemo from '@/components/demos/AccountModulesDemo.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t, tm } = useI18n()

const demos = [AccountSetupDemo, ContactDemoSetup, AccountModulesDemo]

// иконки на кнопках-вкладках (24x24, stroke)
const tabIcons = [
    '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M10 13h6M10 17h4"/>',
    '<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>',
    '<path d="M12 15l-3-3a22 22 0 0 1 2-4 12 12 0 0 1 9-5c0 3-1 6-5 9a22 22 0 0 1-3 3z"/><path d="M9 12H4s.5-3 2-4c1.5-1 5 0 5 0"/><path d="M12 15v5s3-.5 4-2c1-1.5 0-5 0-5"/><path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5"/>',
]

const steps = computed(() =>
    tm('howItWorks.steps').map((step) => ({
        label: step.label,
        title: step.title,
        subtitle: step.subtitle,
    }))
)

// примерная длительность одного прогона каждой анимации (мс) — для полоски-индикатора;
// переключение на следующую вкладку происходит по событию finished от самой анимации
const DURATIONS = [12600, 12100, 10500]

const BASE_W = 560 // ширина, при которой анимации задуманы; дальше масштабируются под сцену

const active = ref(0)
const progress = ref(0)
const runId = ref(0)
const inView = ref(false)
const stageScale = ref(1)

const showcaseRef = ref(null)
const stageRef = ref(null)

let raf = 0
let startT = 0
let io = null
let ro = null

function stopProgress() {
    cancelAnimationFrame(raf)
}

function startProgress() {
    stopProgress()
    progress.value = 0
    startT = performance.now()
    const tick = (now) => {
        progress.value = Math.min(1, (now - startT) / DURATIONS[active.value])
        raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
}

function selectStep(i) {
    active.value = i
    runId.value++
    if (inView.value) startProgress()
}

function onDemoFinished() {
    if (!inView.value) return
    progress.value = 1
    selectStep((active.value + 1) % demos.length)
}

function updateScale() {
    if (!stageRef.value) return
    stageScale.value = stageRef.value.clientWidth / BASE_W
}

onMounted(() => {
    updateScale()
    ro = new ResizeObserver(updateScale)
    if (stageRef.value) ro.observe(stageRef.value)

    io = new IntersectionObserver(
        ([entry]) => {
            const visible = entry.isIntersecting
            if (visible === inView.value) return
            inView.value = visible
            if (visible) {
                updateScale()
                runId.value++
                startProgress()
            } else {
                stopProgress()
                progress.value = 0
            }
        },
        { threshold: 0.35 },
    )
    if (showcaseRef.value) io.observe(showcaseRef.value)
})

onBeforeUnmount(() => {
    stopProgress()
    if (io) io.disconnect()
    if (ro) ro.disconnect()
})

const { headingRef, headingVisible } = useScrollReveal()
</script>

<style scoped>
.how-it-works__side {
    position: absolute;
    top: -280px;
    width: 880px;
    max-width: 55%;
    pointer-events: none;
    z-index: 1;
    object-fit: contain;
}

.how-it-works__side--left {
    left: -360px;
}

.how-it-works__side--right {
    right: -360px;
}

@media (max-width: 1280px) {
    .how-it-works__side {
        width: 650px;
        top: -190px;
    }

    .how-it-works__side--left {
        left: -240px;
    }

    .how-it-works__side--right {
        right: -240px;
    }
}

@media (max-width: 1024px) {
    .how-it-works__side {
        width: 480px;
        top: -130px;
    }

    .how-it-works__side--left {
        left: -170px;
    }

    .how-it-works__side--right {
        right: -170px;
    }
}

@media (max-width: 768px) {
    .how-it-works__side {
        width: 340px;
        top: -80px;
    }

    .how-it-works__side--left {
        left: -130px;
    }

    .how-it-works__side--right {
        right: -130px;
    }
}

@media (max-width: 640px) {
    .how-it-works__side {
        width: 260px;
        top: -40px;
    }

    .how-it-works__side--left {
        left: -100px;
    }

    .how-it-works__side--right {
        right: -100px;
    }
}

@media (max-width: 480px) {
    .how-it-works__side {
        width: 250px;
        top: -20px;
    }

    .how-it-works__side--left {
        left: -40px;
    }

    .how-it-works__side--right {
        right: -45px;
    }
}
</style>
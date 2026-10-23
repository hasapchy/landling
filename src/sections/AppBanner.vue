<template>
    <section class="relative px-6 sm:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12 w-full max-w-[1440px] mx-auto overflow-x-clip">
        <div ref="headingRef"
            class="app-card relative mx-auto max-w-[1180px]
                   min-h-[460px] max-lg:overflow-hidden max-lg:rounded-[28px] sm:max-lg:rounded-[36px]
                   transition-all duration-700 ease-out"
            :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">

            <!-- левая панель: тонкая рамка и синий градиент, к правому краю растворяются в фон сайта -->
            <div class="panel pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[36px]
                        border border-[#2a6fe8]/25
                        bg-[linear-gradient(135deg,rgba(110,165,255,0.26),rgba(180,210,255,0.14)_55%,rgba(255,255,255,0))]
                        shadow-[inset_0_0_50px_rgba(90,150,255,0.12)]
                        dark:border-[#3f86ff]/55
                        dark:bg-[linear-gradient(135deg,rgba(18,70,190,0.55),rgba(6,35,95,0.5)_55%,rgba(4,26,64,0.15))]
                        dark:shadow-[inset_0_0_40px_rgba(50,120,255,0.22)]"></div>

            <!-- мягкое свечение под телефонами -->
            <div class="pointer-events-none absolute -right-24 -bottom-32 h-[520px] w-[720px] rounded-full
                        bg-[radial-gradient(closest-side,rgba(50,110,255,0.34),transparent)]
                        dark:bg-[radial-gradient(closest-side,rgba(40,120,255,0.4),transparent)]"></div>

            <!-- мягкие голубые блики на светлой теме -->
            <div class="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full dark:hidden
                        bg-[radial-gradient(closest-side,rgba(70,140,255,0.22),transparent)]"></div>
            <div class="pointer-events-none absolute left-[18%] -bottom-32 h-[300px] w-[420px] rounded-full dark:hidden
                        bg-[radial-gradient(closest-side,rgba(70,140,255,0.2),transparent)]"></div>

            <!-- тонкая окружность вокруг телефонов -->
            <div class="pointer-events-none absolute hidden lg:block aspect-square rounded-full border
                        border-[#2a6fe8]/30 dark:border-[#5aa2ff]/30
                        h-[125%] left-[36%] top-1/2 -translate-y-1/2"></div>

            <!-- телефоны и лента: тень на обёртке, маска на картинке (иначе тень обрезается рамкой картинки) -->
            <div class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,560px)] aspect-[1200/728]
                        lg:left-auto lg:translate-x-0 lg:top-[5%] lg:bottom-auto lg:h-[90%] lg:w-auto lg:right-[70px]
                        drop-shadow-[0_18px_30px_rgba(5,60,160,0.25)]
                        dark:drop-shadow-[0_0_38px_rgba(40,120,255,0.55)]">
                <img src="/images/app/banner.webp" alt="" width="1200" height="728" loading="lazy" decoding="async"
                    class="phones w-full h-auto lg:h-full lg:w-auto max-w-none select-none" />
            </div>

            <!-- декор слева: вертикальная линия, точки, нижняя линия -->
            <div class="pointer-events-none absolute left-4 sm:left-7 top-6 sm:top-8 bottom-[calc(min(100vw_-_3rem,560px)*0.607+16px)] sm:bottom-[calc(min(100vw_-_4rem,560px)*0.607+16px)] lg:bottom-8 w-px">
                <span class="absolute inset-0 bg-gradient-to-b from-[#2a6fe8]/10 via-[#2a6fe8]/40 to-[#2a6fe8]/10 dark:from-[#5aa2ff]/10 dark:via-[#5aa2ff]/40 dark:to-[#5aa2ff]/10"></span>
                <span class="absolute left-[-1px] top-3 h-[3px] w-[3px] rounded-full bg-[#2a6fe8]/70 dark:bg-[#8fc4ff]/80"></span>
                <span class="absolute left-[8px] top-3 h-[3px] w-[3px] rounded-full bg-[#1d6dff] dark:bg-[#3dd6ff]"></span>
                <span class="absolute left-[-3.5px] bottom-0 h-2 w-2 rounded-full bg-[#1d6dff] dark:bg-[#3dd6ff] dark:shadow-[0_0_10px_#3dd6ff]"></span>
                <span class="absolute left-3 bottom-[3.5px] h-px w-44 bg-gradient-to-r from-[#2a6fe8]/60 to-transparent dark:from-[#3dd6ff]/70"></span>
                <span class="absolute left-[200px] bottom-[1px] hidden sm:flex gap-[10px]">
                    <i class="block h-2 w-px bg-[#2a6fe8]/40 dark:bg-[#5aa2ff]/50"></i>
                    <i class="block h-2 w-px bg-[#2a6fe8]/40 dark:bg-[#5aa2ff]/50"></i>
                    <i class="block h-2 w-px bg-[#1d6dff] dark:bg-[#3dd6ff]"></i>
                </span>
            </div>

            <!-- декор справа: крестики, подпись, вертикальная линия с точкой -->
            <div class="pointer-events-none absolute right-3 lg:right-4 top-6 bottom-6 hidden lg:flex w-11 flex-col items-center justify-between">
                <svg viewBox="0 0 24 24" class="h-5 w-5 text-[#2a6fe8]/60 dark:text-[#5aa2ff]/70" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 1v22M1 12h22"/></svg>
                <div class="flex flex-1 flex-col items-center gap-3 pt-6 pb-5">
                    <span class="text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.2em] text-center text-[#4d6a8f] dark:text-[#9cc4ff]">HasApp<br>Mobile</span>
                    <span class="relative w-px flex-1 bg-gradient-to-b from-[#2a6fe8]/10 via-[#2a6fe8]/45 to-[#2a6fe8]/10 dark:from-[#5aa2ff]/10 dark:via-[#5aa2ff]/45 dark:to-[#5aa2ff]/10">
                        <i class="absolute left-1/2 top-[22%] h-2 w-2 -translate-x-1/2 rounded-full bg-[#1d6dff] dark:bg-[#3dd6ff] dark:shadow-[0_0_10px_#3dd6ff]"></i>
                    </span>
                </div>
                <svg viewBox="0 0 24 24" class="h-5 w-5 text-[#2a6fe8]/60 dark:text-[#5aa2ff]/70" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 1v22M1 12h22"/></svg>
            </div>

            <!-- текст -->
            <div class="relative z-[1] flex max-w-[600px] flex-col items-start gap-4 sm:gap-5 pl-10 pr-6 pt-10 pb-[calc(min(100vw_-_3rem,560px)*0.607+24px)] sm:pl-[88px] sm:pr-10 sm:pb-[calc(min(100vw_-_4rem,560px)*0.607+24px)] lg:py-16 text-left">
                <span v-if="!anyLive"
                    class="inline-flex items-center rounded-full border border-[#9db8f2] bg-[#e8f0ff] px-4 py-1.5 text-sm font-semibold text-[#1d56c4]
                           shadow-[0_2px_8px_rgba(42,111,232,0.15)]
                           dark:border-[#3dd6ff]/60 dark:bg-[#3dd6ff]/10 dark:text-[#6fe0ff] dark:shadow-[0_0_16px_rgba(61,214,255,0.3)]">
                    {{ t('cases.soon') }}
                </span>
                <h2 class="max-w-[360px] font-display font-extrabold tracking-[-0.02em] leading-[1.02] text-[clamp(27px,8.4vw,40px)] sm:text-[46px] text-[#0b1f3a] dark:text-white">
                    {{ t('app.bannerTitle') }}
                </h2>
                <p class="text-base sm:text-lg text-[#5b78a0] dark:text-[#b9d2f5]">
                    {{ anyLive ? t('app.bannerLive') : t('app.bannerSoon') }}
                </p>
                <AppStoreButtons variant="glass" class="mt-1" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppStoreButtons from '@/components/AppStoreButtons.vue'
import { CONTACTS } from '@/config/contacts'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n()
const { headingRef, headingVisible } = useScrollReveal()

// если хотя бы одна ссылка уже настоящая — вместо «Скоро» пишем «Доступно»
const anyLive = computed(() => [CONTACTS.appStore, CONTACTS.googlePlay].some((h) => h && h !== '#'))
</script>

<style scoped>
@media (min-width: 1024px) {
    /* панель (рамка и фон) плавно исчезает к правому краю */
    .panel {
        -webkit-mask-image: linear-gradient(to right, #000 0, #000 55%, transparent 96%);
        mask-image: linear-gradient(to right, #000 0, #000 55%, transparent 96%);
    }
}
    /* края картинки (обрезанная лента) плавно растворяются в фон */
    .phones {
        -webkit-mask-image: linear-gradient(to right, transparent 0, #000 9%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%);
        mask-image: linear-gradient(to right, transparent 0, #000 9%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%);
        -webkit-mask-composite: source-in;
        mask-composite: intersect;
    }

</style>
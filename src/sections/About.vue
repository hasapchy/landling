<!-- src/sections/About.vue -->
<template>
    <section id="about"
        class="relative px-6 sm:px-8 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 w-full max-w-[1440px] mx-auto">

        <!-- ===== Блок 1: заголовок + фото-коллаж + факты ===== -->
        <div ref="headingRef" class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start
             transition-all duration-700 ease-out"
            :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">

            <!-- левая колонка: заголовок + большое фото -->
            <div class="text-left">
                <div class="inline-block">
                    <LabelBadge class="ml-8">
                        <template #icon>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM9 4.5C9.62129 4.5 10.125 5.00371 10.125 5.625C10.125 6.24629 9.62129 6.75 9 6.75C8.37871 6.75 7.875 6.24629 7.875 5.625C7.875 5.00371 8.37871 4.5 9 4.5ZM10.6875 12.9375H7.3125C6.99609 12.9375 6.75 12.6914 6.75 12.375C6.75 12.0586 6.99609 11.8125 7.3125 11.8125H8.4375V8.4375H7.59375C7.27734 8.4375 7.03125 8.19141 7.03125 7.875C7.03125 7.55859 7.27734 7.3125 7.59375 7.3125H9C9.31641 7.3125 9.5625 7.55859 9.5625 7.875V11.8125H10.6875C11.0039 11.8125 11.25 12.0586 11.25 12.375C11.25 12.6914 11.0039 12.9375 10.6875 12.9375Z" />
                            </svg>
                        </template>
                        {{ t('about.badge') }}
                    </LabelBadge>
                </div>

                <div class="mt-4 sm:mt-5 flex items-stretch gap-3 sm:gap-4">
                    <!-- блок 1 -->
                    <span class="gradient-bar w-1.5 sm:w-4 rounded-full shrink-0
    bg-[linear-gradient(180deg,#054C86_0%,#0392FF_40%,#FFFFFF_100%)]" :class="{ 'pour-in': headingVisible }"></span>
                    <h2 class="font-display font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]">
                        {{ t('about.headline') }}
                        <span
                            class="bg-clip-text text-transparent bg-[linear-gradient(90deg,#0392FF,#054C86)] [-webkit-text-fill-color:transparent]">
                            {{ t('about.headlineAccent') }}
                        </span>
                    </h2>
                </div>

                <!-- большое фото — путь оставила, вставишь своё -->
                <div class="relative mt-6 sm:mt-8">
                    <!-- синяя плашка — повёрнутый квадрат, снизу слева за фото -->
                    <div class="absolute left-10 bottom-18 -translate-x-1/3 translate-y-1/5 rotate-[-18deg]
        w-24 h-24 sm:w-60 sm:h-60 rounded-[22px] sm:rounded-[28px]  bg-[linear-gradient(180deg,#64BBFA_0%,#E2F3FF_100%)]"></div>

                    <!-- само фото -->
                    <img src="/images/about.jpg" alt="HasApp" width="1400" height="706" loading="lazy"
                        decoding="async"
                        class="relative w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover rounded-[20px] sm:rounded-[24px] bg-[#F4F7FC]" />
                </div>
            </div>

            <!-- правая колонка: коллаж из 2 фото + текст + факты -->
            <div class="text-left">
                <div class="">
                    <img src="/images/user.webp" alt="" width="1440" height="720" loading="lazy" decoding="async"
    class="w-full h-[260px] sm:h-[320px] object-contain
    [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]
    [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" />
</div>

                <p class="mt-6 sm:mt-8 text-base sm:text-lg text-black/70 leading-relaxed">
                    {{ t('about.description') }}
                </p>

                <div class="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    <div v-for="(stat, index) in stats" :key="stat.label" :ref="el => setStatRef(el, index)"
                        class="stat-card rounded-[16px] p-4 sm:p-5 transition-all duration-700 ease-out"
                        :class="visibleStats.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
                        :style="{ transitionDelay: visibleStats.has(index) ? `${index * 120}ms` : '0ms' }">
                        <div class="stat-icon mb-3 flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-2xl
        [&_svg]:h-8 [&_svg]:w-8 text-[#0392FF]" v-html="statIcons[index]"></div>
                        <p
                            class="text-lg sm:text-xl font-display font-bold leading-snug
        bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]">
                            {{ stat.value }}
                        </p>
                        <p class="mt-1.5 text-xs sm:text-sm text-black/50">{{ stat.label }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== Блок 2: карточка "наша история" на фоне фото ===== -->
        <!-- ===== Блок 2: карточка "наша история" на фоне фото ===== -->
        <div ref="storyRef" class="relative mt-16 sm:mt-20 md:mt-24 rounded-[24px] sm:rounded-[32px] overflow-hidden
     transition-all duration-700 ease-out"
            :class="storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">

            <!-- фоновое фото на весь блок — путь оставила, вставишь своё -->
            <img src="/images/ab-2.jpg" alt="" width="1400" height="645" loading="lazy" decoding="async"
                class="absolute inset-0 w-full h-full object-cover rounded-[30px] lg:rounded-[40px] bg-black" />

            <!-- осветляющий градиент слева направо — текст слева читаемый
                 (на тёмной теме — тёмный градиент вместо белого, иначе
                 текст становится невидимым: белый на белом) -->
            <div
                class="absolute inset-0
        bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.85)_30%,rgba(255,255,255,0.2)_60%,transparent_85%)]
        dark:bg-[linear-gradient(90deg,rgba(10,20,32,0.96)_0%,rgba(10,20,32,0.85)_30%,rgba(10,20,32,0.2)_60%,transparent_85%)]">
            </div>
            <!-- осветляющий градиент снизу — под таймлайн, на всю ширину -->
            <div class="absolute inset-0
        bg-[linear-gradient(0deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.6)_30%,transparent_55%)]
        dark:bg-[linear-gradient(0deg,rgba(10,20,32,0.95)_0%,rgba(10,20,32,0.6)_30%,transparent_55%)]"></div>
            <!-- на мобильных (колонка одна, во всю ширину) добавляем ещё и градиент сверху вниз -->
            <div class="absolute inset-0 lg:hidden
        bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.55)_55%,rgba(255,255,255,0.15)_100%)]
        dark:bg-[linear-gradient(180deg,rgba(10,20,32,0.95)_0%,rgba(10,20,32,0.55)_55%,rgba(10,20,32,0.15)_100%)]">
            </div>

            <div class="relative z-[1] p-6 sm:p-10 md:p-14">
                <div class="w-full lg:max-w-[420px] xl:max-w-[480px] text-left">
                    <div class="inline-block">
                        <LabelBadge>
                            <template #icon>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.6572 0C16.6572 0 16.0041 0.994817 11.7375 2.46698C7.38801 3.96773 4.71065 10.075 4.71065 10.075C4.06575 11.3258 1.51801 16.5245 1.51801 16.5245C0.816535 17.8665 2.10248 18.6597 2.85616 17.2738C4.30305 14.6124 5.23582 12.1806 7.43526 12.1113C10.6422 12.0103 12.8356 9.15437 12.1456 9.28621C11.2371 9.68994 9.23537 9.31697 10.4148 9.13184C13.2459 8.90002 14.9895 6.73077 14.4215 6.58301C13.4173 6.97743 12.4818 6.60333 12.2984 6.48963C17.295 5.87053 16.6572 0 16.6572 0Z" />
                                </svg>
                            </template>
                            {{ t('about.storyBadge') }}
                        </LabelBadge>
                    </div>

                    <h3 class="mt-4 sm:mt-5 font-display font-bold leading-tight text-2xl sm:text-3xl md:text-4xl
    bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]">
                        {{ t('about.storyHeadline') }}
                        <span
                            class="bg-clip-text text-transparent bg-[linear-gradient(90deg,#0392FF,#054C86)] [-webkit-text-fill-color:transparent]">
                            {{ t('about.storyHeadlineAccent') }}
                        </span>
                    </h3>

                    <p class="mt-4 sm:mt-5 text-sm sm:text-base text-black/70 leading-relaxed">
                        {{ t('about.storyDescription') }}
                    </p>

                    <button type="button" @click="openContactModal" class="btn-primary mt-6 sm:mt-8">
                        {{ t('about.knowMore') }}
                    </button>
                </div>

                <!-- таймлайн — ниже, на всю ширину -->
                <div class="relative mt-20 sm:mt-28 md:mt-32 px-2 sm:px-6">
                    <div class="absolute left-0 right-0 top-[7px] sm:top-[9px] h-[2px] bg-[#0392FF]/30"></div>
                    <div class="relative flex justify-between">
                        <div v-for="(point, index) in timeline" :key="point.label"
                            :ref="el => setTimelineRef(el, index)"
                            class="flex flex-col items-center text-center gap-2 sm:gap-3 flex-1 transition-all duration-700 ease-out"
                            :class="visibleTimeline.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
                            :style="{ transitionDelay: visibleTimeline.has(index) ? `${index * 150}ms` : '0ms' }">
                            <span class="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-white"
                                :class="index === 0 ? 'bg-[#0392FF]' : 'bg-[#96D0FD]'"></span>
                            <p class="text-sm sm:text-base font-bold text-black">{{ point.year }}</p>
                            <p class="max-w-[110px] sm:max-w-[140px] text-[11px] sm:text-xs text-black/50 leading-snug">
                                {{ point.label }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'

const { t, tm } = useI18n()

const openContactModal = inject('openContactModal')

const stats = computed(() => tm('about.stats'))
const timeline = computed(() => tm('about.timeline'))

// анимация появления двух блоков независимо друг от друга
const headingRef = ref(null)
const headingVisible = ref(false)
const storyRef = ref(null)
const storyVisible = ref(false)

// анимация карточек статистики и точек таймлайна по очереди
const statItems = new Map()
const visibleStats = reactive(new Set())
function setStatRef(el, index) {
    if (el) statItems.set(index, el)
}

const timelineItems = new Map()
const visibleTimeline = reactive(new Set())
function setTimelineRef(el, index) {
    if (el) timelineItems.set(index, el)
}

let observer
let itemObserver

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            if (entry.target === headingRef.value) {
                headingVisible.value = true
                observer.unobserve(entry.target)
            } else if (entry.target === storyRef.value) {
                storyVisible.value = true
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' })

    if (headingRef.value) observer.observe(headingRef.value)
    if (storyRef.value) observer.observe(storyRef.value)

    itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            for (const [index, el] of statItems) {
                if (el === entry.target) {
                    visibleStats.add(index)
                    itemObserver.unobserve(el)
                }
            }
            for (const [index, el] of timelineItems) {
                if (el === entry.target) {
                    visibleTimeline.add(index)
                    itemObserver.unobserve(el)
                }
            }
        })
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' })

    statItems.forEach((el) => itemObserver.observe(el))
    timelineItems.forEach((el) => itemObserver.observe(el))

    // подстраховка на случай прыжка по якорю (как в остальных секциях)
    requestAnimationFrame(() => {
        const vh = window.innerHeight

        if (headingRef.value && !headingVisible.value) {
            const rect = headingRef.value.getBoundingClientRect()
            if (rect.top < vh && rect.bottom > 0) {
                headingVisible.value = true
                observer.unobserve(headingRef.value)
            }
        }
        if (storyRef.value && !storyVisible.value) {
            const rect = storyRef.value.getBoundingClientRect()
            if (rect.top < vh && rect.bottom > 0) {
                storyVisible.value = true
                observer.unobserve(storyRef.value)
            }
        }

        statItems.forEach((el, index) => {
            if (visibleStats.has(index)) return
            const rect = el.getBoundingClientRect()
            if (rect.top < vh && rect.bottom > 0) {
                visibleStats.add(index)
                itemObserver.unobserve(el)
            }
        })
        timelineItems.forEach((el, index) => {
            if (visibleTimeline.has(index)) return
            const rect = el.getBoundingClientRect()
            if (rect.top < vh && rect.bottom > 0) {
                visibleTimeline.add(index)
                itemObserver.unobserve(el)
            }
        })
    })
})
const statIcons = [
    // Гибкая настройка — шестерёнка
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M38.9627 6.98555H14.3102V6.01078C14.3102 4.58109 13.1471 3.41797 11.7174 3.41797H7.69398C6.2643 3.41797 5.10117 4.58109 5.10117 6.01078V6.98555H1.03711C0.464297 6.98555 0 7.45 0 8.02273C0 8.59547 0.464297 9.05984 1.03711 9.05984H5.10102V10.0343C5.10102 11.464 6.26414 12.6271 7.69383 12.6271H11.7173C13.147 12.6271 14.3102 11.464 14.3102 10.0343V9.05984H38.9627C39.5355 9.05984 39.9998 8.59539 39.9998 8.02273C39.9999 7.45 39.5355 6.98555 38.9627 6.98555ZM12.236 10.0343C12.236 10.3202 12.0034 10.5529 11.7174 10.5529H7.69391C7.40797 10.5529 7.17531 10.3202 7.17531 10.0343V6.01078C7.17531 5.72484 7.40797 5.49219 7.69391 5.49219H11.7174C12.0034 5.49219 12.236 5.72484 12.236 6.01078V10.0343Z"/>
<path d="M38.9629 18.5405H34.8989V17.5655C34.8989 16.1358 33.7358 14.9727 32.3061 14.9727H28.2826C26.8529 14.9727 25.6898 16.1358 25.6898 17.5655V18.5405H1.03711C0.464297 18.5405 0 19.0049 0 19.5777C0 20.1504 0.464297 20.6148 1.03711 20.6148H25.6897V21.5889C25.6897 23.0186 26.8528 24.1817 28.2825 24.1817H32.306C33.7357 24.1817 34.8988 23.0186 34.8988 21.5889V20.6148H38.9628C39.5356 20.6148 39.9999 20.1503 39.9999 19.5777C40 19.0049 39.5357 18.5405 38.9629 18.5405ZM32.8246 21.589C32.8246 21.8749 32.592 22.1076 32.306 22.1076H28.2825C27.9966 22.1076 27.7639 21.8749 27.7639 21.589V17.5655C27.7639 17.2795 27.9966 17.0469 28.2825 17.0469H32.306C32.592 17.0469 32.8246 17.2795 32.8246 17.5655V21.589Z"/>
<path d="M38.9629 30.9384H21.5963V29.9639C21.5963 28.5342 20.4331 27.3711 19.0034 27.3711H14.9799C13.5502 27.3711 12.3871 28.5342 12.3871 29.9639V30.9384H1.03711C0.464297 30.9384 0 31.4028 0 31.9755C0 32.5482 0.464297 33.0126 1.03711 33.0126H12.387V33.9873C12.387 35.417 13.5502 36.5802 14.9798 36.5802H19.0034C20.433 36.5802 21.5962 35.417 21.5962 33.9873V33.0126H38.9628C39.5356 33.0126 39.9999 32.5481 39.9999 31.9755C40 31.4027 39.5357 30.9384 38.9629 30.9384ZM19.522 33.9874C19.522 34.2734 19.2893 34.506 19.0034 34.506H14.9798C14.6939 34.506 14.4613 34.2734 14.4613 33.9874V29.9639C14.4613 29.678 14.6939 29.4453 14.9798 29.4453H19.0034C19.2893 29.4453 19.522 29.678 19.522 29.9639V33.9874Z"/>
</svg>`,
    // Поддержка на месте — люди
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M36.6086 14.3427C35.9998 14.0802 35.2911 13.9277 34.5473 13.9277C33.7348 13.9277 32.9661 14.1089 32.2761 14.4339L32.3086 14.4202L25.9073 17.2964C25.5073 15.5964 24.0023 14.3502 22.2073 14.3502C22.1361 14.3502 22.0648 14.3527 21.9936 14.3564H22.0036H17.3648L11.5011 12.6402C11.3711 12.6002 11.2198 12.5764 11.0648 12.5764C11.0636 12.5764 11.0623 12.5764 11.0611 12.5764H8.97484V12.2539C8.97484 11.3914 8.27484 10.6914 7.41234 10.6914H2.55859C1.69609 10.6914 0.996094 11.3914 0.996094 12.2539V27.5139C0.996094 28.3764 1.69609 29.0764 2.55859 29.0764H7.41234C8.27484 29.0764 8.97484 28.3764 8.97484 27.5139V26.9639C10.9698 27.3589 12.7161 27.8864 14.3873 28.5614L14.1886 28.4902C15.6998 29.0314 17.4423 29.3452 19.2586 29.3452C21.3536 29.3452 23.3498 28.9289 25.1723 28.1752L25.0698 28.2127C26.6586 27.5089 28.0086 26.7627 29.2848 25.9139L29.1811 25.9789C29.5986 25.7202 30.0161 25.4639 30.4361 25.2152C32.5036 23.9902 34.1598 22.9202 35.6461 21.8439C36.3923 21.3114 37.0448 20.7852 37.6636 20.2239L37.6461 20.2402C38.1786 19.8014 38.6023 19.2514 38.8848 18.6227L38.8961 18.5952C38.9623 18.4277 39.0011 18.2339 39.0011 18.0314C39.0011 17.9152 38.9886 17.8027 38.9648 17.6939L38.9673 17.7039C38.7473 16.2427 37.8611 15.0252 36.6323 14.3564L36.6086 14.3439V14.3427ZM5.85109 25.9514H4.12234V13.8164H5.85109V25.9514ZM35.4761 17.9902C34.9773 18.4364 34.4361 18.8702 33.8711 19.2739L33.8136 19.3127C32.4073 20.3289 30.8298 21.3502 28.8448 22.5239C28.4048 22.7852 27.9736 23.0539 27.5386 23.3227C26.4973 24.0202 25.2973 24.6877 24.0448 25.2564L23.8848 25.3214C22.5148 25.8864 20.9248 26.2152 19.2586 26.2152C17.8373 26.2152 16.4723 25.9764 15.1998 25.5377L15.2873 25.5639C13.4736 24.8064 11.3523 24.1939 9.14859 23.8252L8.97609 23.8014V15.7014H10.8373L16.7011 17.4177C16.8311 17.4577 16.9823 17.4814 17.1373 17.4814C17.1386 17.4814 17.1398 17.4814 17.1411 17.4814H22.0036C22.5573 17.4814 22.8748 17.6952 22.8748 18.0689C22.8748 18.4427 22.5573 18.6564 22.0036 18.6564H13.4923C12.6298 18.6564 11.9298 19.3564 11.9298 20.2189C11.9298 21.0814 12.6298 21.7814 13.4923 21.7814H23.2186C23.4498 21.7814 23.6711 21.7314 23.8686 21.6402L23.8586 21.6439L33.6098 17.2614C33.8948 17.1302 34.2273 17.0539 34.5786 17.0539C34.8073 17.0539 35.0286 17.0864 35.2373 17.1464L35.2211 17.1427C35.4523 17.2839 35.6286 17.4964 35.7211 17.7489L35.7236 17.7577L35.4761 17.9902Z"/>
</svg>`,
    // Без абонплаты — щит с галочкой
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.12481 12.3763L8.74981 11.8763C9.74981 11.1263 10.4998 9.87629 10.6248 8.62629L10.7498 8.12629C11.2498 4.87629 14.7498 2.87629 17.9998 4.12629C19.3748 4.62629 20.7498 4.62629 22.1248 4.12629C25.2498 2.75129 28.8748 4.75129 29.3748 8.12629L29.4998 8.62629C29.6248 9.87629 30.3748 11.1263 31.3748 11.8763L31.9998 12.3763C34.6248 14.3763 34.6248 18.1263 31.9998 20.1263L31.2498 20.6263C30.2498 21.3763 29.4998 22.6263 29.3748 23.8763L29.2498 24.3763C28.7498 27.6263 25.2498 29.6263 21.9998 28.3763C20.6248 27.8763 19.2498 27.8763 17.8748 28.3763C14.7498 29.7513 11.1248 27.7513 10.6248 24.3763L10.4998 23.8763C10.3748 22.6263 9.62481 21.3763 8.62481 20.6263L7.99981 20.1263C5.62481 18.1263 5.62481 14.3763 8.12481 12.3763Z" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.5 27.5V36.25L20 32.5L12.5 36.25V27.5" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 11.25V12.5" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 20V21.25" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.25 12.5H19.375C18.375 12.5 17.5 13.375 17.5 14.375C17.5 15.375 18.375 16.25 19.375 16.25H20.625C21.625 16.25 22.5 17.125 22.5 18.125C22.5 19.125 21.625 20 20.625 20H18.75" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
]
onBeforeUnmount(() => {
    if (observer) observer.disconnect()
    if (itemObserver) itemObserver.disconnect()
})
</script>

<style scoped>
.gradient-bar {
    clip-path: inset(0 0 100% 0);
}

.gradient-bar.pour-in {
    animation: pour-down 900ms ease-out forwards;
}

@keyframes pour-down {
    from {
        clip-path: inset(0 0 100% 0);
    }

    to {
        clip-path: inset(0 0 0% 0);
    }
}

.stat-icon {
    background: radial-gradient(circle at 30% 30%,
            rgba(3, 146, 255, 0.22) 0%,
            rgba(3, 146, 255, 0.06) 60%,
            transparent 100%);
}
</style>
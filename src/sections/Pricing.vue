<template>
    <section id="pricing"
        class="relative text-center pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 pb-10 sm:pb-12 md:pb-16 w-full max-w-[1440px] mx-auto">

        <img src="/images/Right-3.png" alt="" width="647" height="622" loading="lazy" decoding="async"
          class="absolute z-[1] pointer-events-none object-contain
                   top-[-50px] right-[-110px] w-[820px]
                   sm:right-[-100px] sm:w-[460px]
                   md:right-[-140px] md:w-[600px]
                    lg:right-[-280px] lg:w-[960px] lg:top-[-200px]" />

        <div ref="headingRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6
             transition-all duration-700 ease-out"
            :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
            <LabelBadge>
                <template #icon>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="CurrentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_63_137)">
                            <path
                                d="M17.5432 14.4922L8.01582 17.8391L3.50176 5.07734L4.87988 3.24922C5.02754 3.29141 5.18223 3.33359 5.33691 3.38281C6.28613 3.69219 7.0666 4.10703 7.58691 4.56406C7.34785 4.97188 7.28457 5.47109 7.45332 5.94922C7.75566 6.80703 8.69785 7.26406 9.55566 6.96172C10.4135 6.65938 10.8705 5.71719 10.5682 4.85938C10.2658 4.00156 9.32363 3.54453 8.46582 3.84688C8.44473 3.85391 8.43066 3.86094 8.40957 3.86797C7.67832 3.17891 6.62363 2.65859 5.52676 2.31406L7.15098 0.148438L13.0361 1.61797L17.5432 14.4922ZM5.49863 2.34219C4.27519 1.88516 1.65254 1.68828 0.204102 1.81484L0.211133 2.86953C1.45566 2.75703 3.74785 2.91172 4.85879 3.23516L5.49863 2.34219Z" />
                        </g>
                        <defs>
                            <clipPath id="clip0_63_137">
                                <rect width="18" height="18" />
                            </clipPath>
                        </defs>
                    </svg>

                </template>
                {{ t('pricing.badge') }}
            </LabelBadge>

            <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
                 text-3xl sm:text-4xl md:text-6xl lg:text-7xl
                 bg-clip-text text-transparent
                 bg-[linear-gradient(90deg,#054C86,#065A9D)]
                 [-webkit-text-fill-color:transparent]">
                {{ t('pricing.headline') }}
            </h2>

            <div class="inline-flex p-1 rounded-full bg-[#F0F6FC] dark:bg-white/5 border border-[#054C86]/10 dark:border-white/10"
                role="tablist" :aria-label="t('pricing.badge')">
                <button v-for="item in modes" :key="item.id" type="button" role="tab"
                    :aria-selected="mode === item.id" @click="mode = item.id"
                    class="min-w-[140px] sm:min-w-[160px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-200"
                    :class="mode === item.id
                        ? 'bg-[linear-gradient(90deg,#0392FF,#054C86)] text-white shadow-[0_2px_8px_rgba(5,76,134,0.25)]'
                        : 'text-[#054C86]/70 dark:text-white/60 hover:text-[#054C86] dark:hover:text-white'">
                    {{ item.label }}
                </button>
            </div>

            <p
                class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 dark:text-white/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t(`pricing.modeDescription.${mode}`) }}
            </p>

            <p
                class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl -mt-1 sm:-mt-2 text-sm sm:text-base text-[#054C86]/80 dark:text-[#6cb6f2]/80 leading-relaxed">
                {{ t(`pricing.modeHint.${mode}`) }}
            </p>
        </div>

        <div :key="mode" ref="gridRef"
            class="relative z-[2] mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start max-w-[1000px] mx-auto">
            <!-- на телефоне и планшете (карточки в столбик, до 1024px) следующий тариф при прокрутке наезжает на предыдущий:
                 карточка «залипает» (sticky) на высоте stickyTops[index], а следующая заезжает поверх -->
            <div v-for="(plan, index) in plans" :key="`${mode}-${plan.name}`" ref="wrapRefs"
                class="relative max-lg:sticky" :style="stickyTops[index] !== undefined ? { top: stickyTops[index] + 'px' } : null">
                <!-- внешний ореол свечения вокруг выделенного тарифа -->
                <div v-if="plan.highlight" class="absolute -inset-5 sm:-inset-7 rounded-[36px] blur-2xl pointer-events-none z-0
                           bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(3,80,221,0.45)_0%,transparent_70%)]
                           dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(3,80,221,0.55)_0%,transparent_70%)]"></div>

                <!-- бейдж "рекомендуем" — сидит прямо на рамке карточки, по центру верхнего края -->
                <div v-if="plan.highlight"
                    class="absolute top-[-7px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white
                           bg-[linear-gradient(90deg,#0392FF,#054C86)] shadow-[0_4px_14px_rgba(3,80,221,0.5)]">
                    {{ t('pricing.popularBadge') }}
                </div>

            <div :ref="el => setItemRef(el, index)" class="pricing-card relative z-[1] overflow-hidden rounded-[24px] p-6 sm:p-8 text-left flex flex-col
                       transition-all duration-700 ease-out" :class="[
                        plan.highlight ? 'bg-[linear-gradient(180deg,rgba(3,80,221,0.10)_0%,rgba(3,80,221,0.03)_100%)] dark:bg-[linear-gradient(180deg,rgba(5,76,134,0.35)_0%,rgba(10,20,32,0.6)_100%)] border-2 border-[#0392FF] md:-mt-3 shadow-[0_14px_36px_rgba(3,80,221,0.28)] dark:shadow-[0_14px_40px_rgba(3,80,221,0.45)]' : 'bg-white dark:bg-[#0e1826]',
                        visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    ]" :style="{
                        transitionDelay: visibleItems.has(index) ? `${index * 120}ms` : '0ms',
                        backgroundImage: isDark
                            ? 'linear-gradient(180deg, rgba(14,24,38,1) 0%, rgba(14,24,38,1) 100%), linear-gradient(180deg, #0392ff 0%, #2f6fa8 35%, #0e1826 100%)'
                            : (plan.highlight
                                ? 'linear-gradient(180deg, #eef6ff 0%, #ffffff 100%), linear-gradient(180deg, #0392ff 0%, #7fc4ff 35%, #9dedf796 100%)'
                                : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%), linear-gradient(180deg, #0392ff 0%, #7fc4ff 35%, #9dedf796 100%)')
                    }">

                <!-- эффект в правом верхнем углу у первой карточки -->
                <div v-if="plan.corner === 'glow'" class="absolute -top-40 -right-40 w-100 h-100 rounded-full pointer-events-none
                           bg-[radial-gradient(circle,rgba(3,80,221,0.20)_0%,transparent_70%)] blur-7xl"></div>

                <!-- картинка в правом верхнем углу у второй карточки -->
                <img v-if="plan.corner === 'image'" src="/images/corner-2.png" alt="" width="494" height="508"
                    loading="lazy" decoding="async"
                    class="absolute top-0 right-0 w-32 sm:w-70 pointer-events-none opacity-60 object-contain" />

                <!-- подсветка снизу вверх у выделенного тарифа: в тёмной теме — яркое свечение, в светлой — мягкий градиент без засветки -->
                <div v-if="plan.highlight && isDark" class="absolute inset-x-0 bottom-0 h-full pointer-events-none z-0
                           bg-[radial-gradient(ellipse_110%_120%_at_50%_100%,rgba(3,80,221,0.75)_0%,rgba(3,80,221,0.35)_35%,rgba(3,80,221,0.1)_60%,transparent_85%)]"></div>
                <div v-else-if="plan.highlight" class="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-0
                           bg-[linear-gradient(180deg,transparent_0%,rgba(3,80,221,0.14)_100%)]"></div>

                <div class="relative z-[1] flex flex-col flex-1" :class="plan.highlight ? 'pt-3 sm:pt-4' : ''">
                    <div class="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center mb-5 sm:mb-6 overflow-hidden"
                        :class="plan.highlight
                            ? 'bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)]'
                            : 'bg-[linear-gradient(135deg,#eaf4ff_0%,#ffffff_100%)] dark:bg-[linear-gradient(135deg,#16314a_0%,#0e1826_100%)] shadow-[inset_0_0_10px_rgba(3,146,255,0.35)]'">
                        <span class="h-7 w-7 sm:h-8 sm:w-8 [&_svg]:h-full [&_svg]:w-full [&_path]:transition-colors [&_circle]:transition-colors"
    :class="plan.highlight ? 'text-white' : 'text-[#054C86] dark:text-[#6cb6f2]'"
    v-html="plan.icon"></span>
                    </div>

                    <h3 class="text-xl sm:text-2xl font-display font-bold text-black dark:text-white">{{ plan.name }}</h3>
                    <p class="mt-2 text-sm sm:text-base text-black/60 dark:text-white/60 leading-relaxed">{{ plan.description }}</p>

                    <div class="mt-6 sm:mt-8 flex items-end gap-1">
                        <span v-if="plan.custom"
                            class="text-3xl sm:text-4xl font-display font-bold
                            bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]">
                            {{ t('pricing.custom') }}
                        </span>
                        <template v-else>
                            <span
                                class="text-3xl sm:text-4xl font-display font-bold
                                bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]">
                                {{ formatPrice(plan.price) }} TMT
                            </span>
                            <span class="text-sm sm:text-base text-black/50 dark:text-white/50 mb-1">{{ periodLabel }}</span>
                        </template>
                    </div>

                    <a href="#contacts"
                        class="mt-5 sm:mt-6 w-full rounded-full py-3 sm:py-3.5 text-sm sm:text-base font-bold transition-all duration-200 text-center no-underline"
                        :class="plan.highlight
                            ? 'btn-primary'
                            : 'bg-transparent border border-[#0392FF]/60 text-[#054C86] hover:text-white hover:border-transparent hover:bg-[linear-gradient(90deg,#0392FF,#054C86)]'">
                        {{ plan.cta }}
                    </a>

                    <!-- разделитель -->
                    <div class="mt-6 sm:mt-8 border-t border-black/10 dark:border-white/10"></div>

                    <p class="mt-5 sm:mt-6 text-sm font-bold uppercase tracking-wider text-black/70 dark:text-white/70">{{
                        t('pricing.features') }}
                    </p>

                    <ul class="mt-4 flex flex-col gap-3">
                        <li v-for="feature in plan.features" :key="feature"
                            class="flex items-center gap-2.5 text-sm sm:text-base text-black/70 dark:text-white/70">
                            <span
                                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#0392FF]/60 text-[#054C86]">
                                <svg viewBox="0 0 16 16" fill="none" class="h-3 w-3">
                                    <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" stroke-width="1.6"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useTheme } from '@/composables/useTheme'

const { t, tm } = useI18n()

const { isDark } = useTheme()
const mode = ref('boxed')
const modes = computed(() => [
    { id: 'boxed', label: t('pricing.modes.boxed') },
    { id: 'cloud', label: t('pricing.modes.cloud') },
])
const periodLabel = computed(() =>
    mode.value === 'cloud' ? t('pricing.perMonth') : t('pricing.oneTime')
)

const planMeta = [
    {
        price: 20000, custom: false, highlight: false, corner: 'glow',
        icon: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.4138 13.6L17.5862 21.44L12.6207 16.96L6 23.68L17.5862 36L38 15.28L30.8276 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
</svg>`
    },
    {
        price: 40000, custom: false, highlight: true, corner: 'image',
        icon: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.0099 9.41776C24.4476 10.1521 23.8071 11.294 22.8558 13.0005L22.3752 13.8627C22.3435 13.9196 22.312 13.9762 22.2806 14.0326C21.8502 14.8085 21.4501 15.5294 20.8021 16.0213C20.1459 16.5194 19.3484 16.6981 18.5084 16.8863C18.4475 16.9 18.3863 16.9137 18.3249 16.9276L17.3916 17.1388C15.5411 17.5575 14.3136 17.8392 13.4801 18.1677C12.6726 18.486 12.5912 18.7121 12.5607 18.8103C12.5255 18.9236 12.4728 19.1845 12.9581 19.9554C13.4528 20.7412 14.2934 21.7297 15.5526 23.2023L16.1889 23.9462C16.2296 23.9939 16.2701 24.041 16.3104 24.0881C16.8888 24.7619 17.4187 25.3795 17.6624 26.1631C17.9043 26.941 17.824 27.7555 17.7353 28.6555C17.7291 28.7184 17.7229 28.7815 17.7167 28.8451L17.6205 29.8378C17.4303 31.8004 17.3056 33.1224 17.3477 34.0673C17.3897 35.0099 17.5865 35.171 17.6491 35.2185L17.6525 35.2212C17.6981 35.2564 17.8697 35.3895 18.6886 35.1549C19.5477 34.9088 20.6999 34.3825 22.4328 33.5848L23.3066 33.1824C23.3652 33.1554 23.4235 33.1285 23.4817 33.1016C24.2623 32.74 25.0105 32.3935 25.8302 32.3935C26.6498 32.3935 27.398 32.74 28.1785 33.1016C28.2368 33.1285 28.2951 33.1554 28.3537 33.1824L29.2275 33.5848C30.9602 34.3825 32.1126 34.9088 32.9715 35.1549C33.7907 35.3895 33.9621 35.2564 34.0077 35.2212L34.0112 35.2185C34.0737 35.171 34.2706 35.0099 34.3126 34.0673C34.3546 33.1224 34.2299 31.8004 34.0398 29.8378L33.9436 28.8451C33.9373 28.7815 33.9311 28.7182 33.9251 28.6555C33.8363 27.7555 33.756 26.941 33.9978 26.1631C34.2415 25.3795 34.7715 24.7619 35.3499 24.088C35.3903 24.041 35.4308 23.9939 35.4715 23.9462L36.1076 23.2023C37.367 21.7297 38.2075 20.7412 38.7022 19.9554C39.1875 19.1845 39.1348 18.9236 39.0996 18.8103C39.069 18.7121 38.9876 18.486 38.18 18.1677C37.3466 17.8392 36.1192 17.5575 34.2686 17.1388L33.3355 16.9276C33.274 16.9137 33.2128 16.9 33.1519 16.8863C32.3119 16.6981 31.5142 16.5194 30.8583 16.0213C30.2102 15.5294 29.8101 14.8085 29.3795 14.0326C29.3483 13.9762 29.3168 13.9195 29.2851 13.8627L28.8046 13.0005C27.8532 11.294 27.2127 10.1521 26.6502 9.41776C26.103 8.70307 25.8767 8.70637 25.8333 8.70699L25.8302 8.70703L25.827 8.70699C25.7836 8.70637 25.5574 8.70307 25.0099 9.41776ZM22.8266 7.74578C23.5411 6.81287 24.4764 5.95703 25.8302 5.95703C27.1839 5.95703 28.1193 6.81287 28.8335 7.74578C29.5329 8.65892 30.2696 9.98063 31.1518 11.5632L31.6871 12.5237C32.2749 13.5779 32.3929 13.7338 32.5209 13.831C32.6403 13.9216 32.7988 13.9867 33.9423 14.2454L34.9882 14.482C36.6958 14.8683 38.134 15.1936 39.1884 15.6092C40.2919 16.044 41.327 16.712 41.7255 17.9937C42.1195 19.2604 41.6665 20.4085 41.0294 21.4205C40.4143 22.3976 39.4381 23.5392 38.2697 24.9053L38.1976 24.9896L37.5615 25.7336C36.7884 26.6376 36.6776 26.8068 36.6239 26.9797C36.5682 27.1584 36.564 27.3748 36.6807 28.5798L36.7874 29.6815C36.9645 31.5073 37.1118 33.0258 37.0599 34.1896C37.0069 35.3787 36.7348 36.6036 35.6741 37.4088C34.5906 38.2312 33.3424 38.1219 32.2142 37.7985C31.1274 37.4872 29.7817 36.8676 28.1832 36.1315L27.2035 35.6803C26.1284 35.1853 25.9667 35.1435 25.8302 35.1435C25.6934 35.1435 25.5319 35.1853 24.4568 35.6803L23.4769 36.1315C21.8784 36.8676 20.5329 37.4872 19.4461 37.7985C18.3178 38.1219 17.0697 38.2312 15.9863 37.4088C14.9254 36.6036 14.6534 35.3787 14.6004 34.1896C14.5486 33.0258 14.6958 31.5071 14.8728 29.6813L14.9795 28.5798C15.0963 27.3748 15.092 27.1584 15.0364 26.9797C14.9827 26.8068 14.872 26.6376 14.0989 25.7336L13.3905 24.9053C12.2223 23.5392 11.246 22.3976 10.6308 21.4205C9.99374 20.4085 9.54079 19.2604 9.9347 17.9937C10.3333 16.712 11.3684 16.044 12.4719 15.6092C13.5263 15.1937 14.9645 14.8683 16.6721 14.482L17.718 14.2454C18.8613 13.9867 19.0199 13.9216 19.1394 13.831C19.2674 13.7338 19.3854 13.5779 19.9732 12.5237L20.5085 11.5632C21.3907 9.98063 22.1274 8.65892 22.8266 7.74578ZM16.0337 9.53623C12.4008 8.48932 8.50371 9.04231 4.74369 11.2443L4.36207 11.4678C3.70678 11.8515 2.86447 11.6314 2.4807 10.9761C2.09695 10.3208 2.31708 9.4785 2.97236 9.09474L3.35399 8.87126C7.68143 6.33699 12.3515 5.61324 16.7952 6.89375L17.1763 7.00357C17.906 7.21385 18.3271 7.97584 18.1168 8.70555C17.9065 9.43525 17.1445 9.85633 16.4148 9.64605L16.0337 9.53623ZM8.86684 18.2153C8.9313 18.972 8.37017 19.6375 7.61352 19.7021C7.33273 19.7259 7.11744 19.7397 6.93702 19.751C6.61182 19.7717 6.39993 19.7851 6.12187 19.8385C5.76163 19.9078 5.2939 20.0541 4.44506 20.4785C3.76583 20.8182 2.93991 20.5428 2.60031 19.8636C2.2607 19.1843 2.53599 18.3584 3.21523 18.0189C4.19971 17.5266 4.91425 17.2701 5.60349 17.1379C6.05614 17.051 6.5234 17.0205 6.9436 16.9932C7.0963 16.9832 7.24278 16.9737 7.3801 16.962C8.13674 16.8975 8.80238 17.4587 8.86684 18.2153ZM10.8498 29.068C8.67918 28.5593 6.3923 29.0638 4.68112 30.412C4.08465 30.8821 3.2201 30.7794 2.75011 30.1831C2.28013 29.5865 2.38267 28.7221 2.97917 28.252C5.35845 26.3772 8.50536 25.6941 11.4772 26.3904C12.2165 26.5637 12.6755 27.3036 12.5022 28.0428C12.329 28.7822 11.5891 29.2413 10.8498 29.068Z" fill="currentColor"/>
</svg>`
    },
]

const plans = computed(() =>
    tm('pricing.plans').map((plan, i) => ({
        name: plan.name,
        description: plan.description,
        features: plan.features,
        cta: plan.cta,
        ...planMeta[i],
    }))
)

// 20000 -> «20 000» (неразрывный пробел между тысячами)
const formatPrice = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')

const { headingRef, headingVisible, setItemRef, visibleItems } = useScrollReveal()

watch(mode, () => {
    visibleItems.value = new Set([0, 1])
    nextTick(measureStack)
})

// ---- эффект «карточки накладываются друг на друга» (телефон и планшет, до 1024px — пока тарифы стоят в один столбец) ----
// Верхняя граница, на которой залипает карточка: под шапкой, у каждой следующей чуть ниже,
// чтобы из-под неё выглядывал край предыдущей. Если карточка выше экрана, она сначала
// доезжает до своего низа и только потом залипает — чтобы ничего не оказалось скрытым.
const STACK_TOP = 96      // отступ от верха экрана (под плавающей шапкой), px
const STACK_STEP = 14     // на сколько каждая следующая карточка ниже предыдущей, px
const STACK_BOTTOM = 16   // минимальный зазор снизу, px
const gridRef = ref(null)
const wrapRefs = ref([])
const stickyTops = ref([])

function measureStack() {
    if (typeof window === 'undefined' || !window.matchMedia('(max-width: 1023px)').matches) {
        stickyTops.value = []
        return
    }
    stickyTops.value = wrapRefs.value.map((el, i) => {
        const h = el ? el.offsetHeight : 0
        return Math.round(Math.min(STACK_TOP + i * STACK_STEP, window.innerHeight - h - STACK_BOTTOM))
    })
}

let ro
onMounted(() => {
    measureStack()
    window.addEventListener('resize', measureStack)
    if ('ResizeObserver' in window && gridRef.value) {
        ro = new ResizeObserver(measureStack)
        ro.observe(gridRef.value)
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureStack)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', measureStack)
    if (ro) ro.disconnect()
})
</script>

<style scoped>
.pricing-card {
    border: 1.5px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: border-box;
    background-image:
        linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%),
        linear-gradient(180deg, #0392ff 0%, #7fc4ff 35%, #9dedf796 100%);
}

:global(.dark) .pricing-card {
    background-image:
        linear-gradient(180deg, rgba(14, 24, 38, 1) 0%, rgba(14, 24, 38, 1) 100%),
        linear-gradient(180deg, #0392ff 0%, #2f6fa8 35%, #0e1826 100%);
}
</style>
<!-- {
    "name": "Enterprise",
    "description": "For large organizations with custom requirements and integrations.",
    "features": [
      "Everything in Standard",
      "Unlimited users",
      "Custom development",
      "Dedicated account manager",
      "On-premise deployment",
      "Team training and onboarding"
    ],
    "cta": "Contact Us"
  } -->
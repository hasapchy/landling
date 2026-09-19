<template>
    <section
        class="relative text-center pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 pb-10 sm:pb-12 md:pb-16 w-full max-w-[1440px] mx-auto">

        <img src="/images/Right-3.png" alt="" class="absolute z-[1] pointer-events-none object-contain
                   top-[-50px] right-[-110px] w-[820px]
                   sm:right-[-100px] sm:w-[460px]
                   md:right-[-140px] md:w-[600px]
                    lg:right-[-280px] lg:w-[960px] lg:top-[-200px]" />

        <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <LabelBadge>
                <template #icon>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4z"
                            stroke="currentColor" stroke-width="1.2" />
                        <path d="M1.5 6.5h13" stroke="currentColor" stroke-width="1.2" />
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

            <p
                class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t('pricing.description') }}
            </p>
        </div>

        <!-- контент тарифов ниже (добавим позже) -->
        <div class="relative z-[2] flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
            <span class="text-sm sm:text-base font-semibold" :class="isAnnual ? 'text-black/40' : 'text-[#054C86]'">
                {{ t('pricing.monthly') }}
            </span>

            <button type="button" @click="isAnnual = !isAnnual"
                class="relative inline-flex items-center w-12 h-6 sm:w-14 sm:h-7 rounded-full bg-[linear-gradient(90deg,#054C86,#065A9D)] transition-colors shrink-0"
                :aria-pressed="isAnnual">
                <span
                    class="absolute h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-300"
                    :class="isAnnual ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'"></span>
            </button>

            <span class="text-sm sm:text-base font-semibold" :class="isAnnual ? 'text-[#054C86]' : 'text-black/40'">
                {{ t('pricing.annually') }}
            </span>

            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-[#054C86]/10 text-[#054C86]">
                {{ t('pricing.discount') }}
            </span>
        </div>

        <!-- карточки тарифов -->
        <!-- карточки тарифов -->
<div class="relative z-[2] mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div v-for="plan in plans" :key="plan.name"
                class="pricing-card relative overflow-hidden rounded-[24px] p-6 sm:p-8 text-left flex flex-col"
                :class="plan.highlight ? 'bg-[linear-gradient(180deg,rgba(5,76,134,0.12)_0%,rgba(6,90,157,0.03)_100%)]' : 'bg-white'">

                <!-- эффект в правом верхнем углу у первой карточки -->
                <div v-if="plan.corner === 'glow'" class="absolute -top-40 -right-40 w-130 h-130 rounded-full pointer-events-none
                           bg-[radial-gradient(circle,rgba(3,146,255,0.35)_0%,transparent_70%)] blur-4xl"></div>

                <!-- картинка в правом верхнем углу у второй карточки -->
                <img v-if="plan.corner === 'image'" src="/images/corner-2.png" alt=""
                    class="absolute top-0 right-0 w-32 sm:w-70 pointer-events-none opacity-60 object-contain" />

                <div class="relative z-[1] flex flex-col flex-1">
                    <div class="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center mb-5 sm:mb-6 overflow-hidden"
                        :class="plan.highlight
                            ? 'bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)]'
                            : 'bg-[linear-gradient(135deg,#eaf4ff_0%,#ffffff_100%)] shadow-[inset_0_0_10px_rgba(3,146,255,0.35)]'">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 sm:h-6 sm:w-6" :class="plan.highlight ? 'text-white' : 'text-[#054C86]'">
                            <path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"
                                v-if="plan.corner === 'none'" />
                            <circle cx="4.5" cy="4.5" r="2" fill="currentColor" v-else />
                            <circle cx="11.5" cy="4.5" r="2" fill="currentColor" v-if="plan.corner !== 'none'" />
                            <circle cx="4.5" cy="11.5" r="2" fill="currentColor" v-if="plan.corner !== 'none'" />
                            <circle cx="11.5" cy="11.5" r="2" fill="currentColor" v-if="plan.corner !== 'none'" />
                        </svg>
                    </div>

                    <h3 class="text-xl sm:text-2xl font-display font-bold text-black">{{ plan.name }}</h3>
                    <p class="mt-2 text-sm sm:text-base text-black/60 leading-relaxed">{{ plan.description }}</p>

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
                                ${{ isAnnual ? plan.annualPrice : plan.monthlyPrice }}
                            </span>
                            <span class="text-sm sm:text-base text-black/50 mb-1">{{ isAnnual ? t('pricing.perYear') :
                                t('pricing.perMonth') }}</span>
                        </template>
                    </div>

                    <p class="mt-6 sm:mt-8 text-sm font-bold uppercase tracking-wider text-black/70">{{
                        t('pricing.features') }}
                    </p>

                    <ul class="mt-4 flex flex-col gap-3">
                        <li v-for="feature in plan.features" :key="feature"
                            class="flex items-center gap-2.5 text-sm sm:text-base text-black/70">
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

                    <button type="button"
                        class="mt-8 sm:mt-10 w-full rounded-full py-3 sm:py-3.5 text-sm sm:text-base font-bold transition"
                        :class="plan.highlight
                            ? 'btn-primary'
                            : 'bg-transparent border border-[#0392FF]/60 text-[#054C86] hover:bg-[#054C86]/5'">
                        {{ plan.cta }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'

const { t } = useI18n()

const isAnnual = ref(false)

const plans = [
    {
        name: 'Стандарт',
        description: 'Для небольших команд, которым нужны базовые модули учёта и продаж.',
        monthlyPrice: 99,
        annualPrice: 79,
        custom: false,
        highlight: false,
        corner: 'glow',
        features: [
            'До 10 пользователей',
            'CRM и продажи',
            'Складской учёт',
            'Учёт рабочего времени',
            'Email-уведомления',
            'Поддержка 24/7',
        ],
        cta: 'Начать',
    },
    {
        name: 'Бизнес',
        description: 'Для растущих компаний, которым нужна гибкая настройка и больше пользователей.',
        monthlyPrice: 199,
        annualPrice: 159,
        custom: false,
        highlight: true,
        corner: 'image',
        features: [
            'До 50 пользователей',
            'Все функции тарифа Стандарт',
            'Мультивалютность и мультикомпании',
            'Более 300 прав доступа',
            'Приоритетная поддержка',
            'Физический регистратор времени',
        ],
        cta: 'Начать',
    },
    {
        name: 'Корпоративный',
        description: 'Для крупных организаций с индивидуальными требованиями и интеграциями.',
        custom: true,
        highlight: false,
        corner: 'none',
        features: [
            'Все функции тарифа Бизнес',
            'Неограниченное число пользователей',
            'Выделенный менеджер',
            'Индивидуальные интеграции',
            'Развёртывание на своём сервере',
            'Обучение и онбординг команды',
        ],
        cta: 'Связаться с нами',
    },
]
</script>

<style scoped>
.pricing-card {
    border: 1.5px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: border-box;
    background-image:
        linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%),
        linear-gradient(180deg, #0392ff 0%, #7fc4ff 35%, #9dedf796 100%);
    /* box-shadow:
        0 0 2px 0 rgba(3, 146, 255, 0.5),
        0 0 10px 0 rgba(3, 146, 255, 0.3),
        0 0 22px 1px rgba(3, 146, 255, 0.15); */
}
</style>
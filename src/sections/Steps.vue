<template>
    <section
        class="relative  text-center pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 pb-10 sm:pb-12 md:pb-15 w-full max-w-[1440px] mx-auto">

        <img src="/images/Left.png" alt="" class="how-it-works__side how-it-works__side--left" />
        <img src="/images/Right.png" alt="" class="how-it-works__side how-it-works__side--right" />

        <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <LabelBadge>
                <template #icon>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                            fill="currentColor" />
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

        <!-- контент шагов ниже -->
        <div class="mt-10 sm:mt-14 md:mt-16 lg:mt-20 flex flex-wrap justify-center gap-6 lg:gap-8 relative z-[2]">
            <div v-for="step in steps" :key="step.title"
                class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-[520px] flex flex-col items-start text-left overflow-hidden rounded-[18px] sm:rounded-[24px] border border-[#0392FF]/60 bg-[radial-gradient(circle_at_50%_50%,rgba(0,94,173,0.3)_0%,rgba(218,236,248,0.2)_100%)] p-5 sm:p-8 ">
                <img :src="step.img" :alt="step.title" class="w-full block rounded-[12px] sm:rounded-[16px]" />

                <div class="flex flex-col items-start gap-4 sm:gap-5 pt-5 sm:pt-6 pb-2 sm:pb-3">
                    <div class="inline-flex items-center gap-2.5 rounded-full bg-[#054C86]/10 pl-3 pr-4 py-1.5">
                        <span class="text-sm font-bold uppercase tracking-wider
 bg-clip-text text-transparent
 bg-[linear-gradient(180deg,#054C86,#065A9D)]
 [-webkit-text-fill-color:transparent]">
                            {{ step.label }}
                        </span>
                    </div>

                    <h3 class="font-display font-bold leading-tight text-2xl sm:text-3xl md:text-4xl
bg-clip-text text-transparent
bg-[linear-gradient(90deg,#054C86,#065A9D)]
[-webkit-text-fill-color:transparent]">
                        {{ step.title }}
                    </h3>

                    <p class="text-black/70 text-base sm:text-lg leading-relaxed">
                        {{ step.subtitle }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'

const { t } = useI18n()

const steps = [
    {
        label: 'STEP 1',
        title: 'Настройте аккаунт',
        subtitle: 'Начните с базовой информации о компании и сотрудниках — регистрация занимает пару минут.',
        img: '/images/1.jpg',
    },
    {
        label: 'STEP 2',
        title: 'Подключите модули',
        subtitle: 'Выберите нужные разделы — продажи, склад, финансы, персонал — под задачи вашего бизнеса.',
        img: '/images/1.jpg',
    },
    {
        label: 'STEP 3',
        title: 'Начните работу',
        subtitle: 'Система готова за 1–3 дня: настройте права доступа и начинайте управлять бизнесом.',
        img: '/images/1.jpg',
    },
]
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
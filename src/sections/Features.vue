<template>
    <section class="relative overflow-hidden text-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-10 sm:pb-12 md:pb-15 w-full max-w-[1440px] mx-auto">

        <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
    <LabelBadge>
        <template #icon>
            <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0l1.2 4.8L14 6l-4.8 1.2L8 12l-1.2-4.8L2 6l4.8-1.2L8 0z" />
            </svg>
        </template>
        {{ t('features.badge') }}
    </LabelBadge>

    <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
         text-3xl sm:text-4xl md:text-6xl lg:text-7xl
         bg-clip-text text-transparent
         bg-[linear-gradient(90deg,#054C86,#065A9D)]
         [-webkit-text-fill-color:transparent]">
        {{ t('features.headline') }}
    </h2>

    <p class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
        {{ t('features.description') }}
    </p>
</div>

        <!-- ===== 4 блока функций, чередование сторон ===== -->
        <div class="mt-12 sm:mt-16 md:mt-24 flex flex-col gap-12 sm:gap-16 md:gap-24">
            <div v-for="(feature, index) in features" :key="feature.title"
                class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center text-left">
                <!-- текстовая колонка -->
                <div class="flex flex-col items-start gap-4 sm:gap-5 md:gap-6" :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
                    <div class="inline-flex items-center gap-2.5 rounded-full bg-[#054C86]/10 pl-3 pr-4 py-1.5">
                        <span class="flex h-4 w-4 shrink-0 items-center justify-center text-[#054C86]">
                            <svg viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4" v-html="feature.icon"></svg>
                        </span>
                        <span class="text-xs font-bold uppercase tracking-wider
           bg-clip-text text-transparent
           bg-[linear-gradient(180deg,#054C86,#065A9D)]
           [-webkit-text-fill-color:transparent]">
                            {{ feature.label }}
                        </span>
                    </div>

                    <h3 class="max-w-lg font-display font-bold leading-tight text-2xl sm:text-3xl md:text-4xl
         bg-clip-text text-transparent
         bg-[linear-gradient(90deg,#054C86,#065A9D)]
         [-webkit-text-fill-color:transparent]">
                        {{ feature.title }}{{ feature.titleAccent }}
                    </h3>

                    <p class="max-w-md text-black/70 text-base sm:text-lg leading-relaxed">
                        {{ feature.subtitle }}
                    </p>
                </div>

                <!-- картинка через твой GlowCard -->
                <div class="relative" :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
                    <GlowCard :src="feature.img" :alt="feature.title" :fade="false" grid />
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import GlowCard from '@/components/GlowCard.vue'

const { t } = useI18n()

const icons = {
    calendar: '<path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3z"/>',
    box: '<path d="M8 0l1.2 4.8L14 6l-4.8 1.2L8 12l-1.2-4.8L2 6l4.8-1.2L8 0z"/>',
}

const features = [
  {
    label: 'CRM и продажи',
    title: 'Сделки, лиды и клиенты',
    titleAccent: ' в одном окне',
    subtitle:
      'Больше никаких потерянных заявок и разрозненных таблиц: воронка сделок, база клиентов и товары — в единой системе, с полной видимостью по каждой сделке.',
    icon: icons.calendar,
    img: '/images/1.jpg',
  },
  {
    label: 'Складской учёт',
    title: 'Контроль',
    titleAccent: ' склада в реальном времени',
    subtitle:
      'Приход, закупки, списания, возвраты и инвентаризация — без Excel и без «недостачи, которую никто не может объяснить».',
    icon: icons.box,
    img: '/images/1.jpg',
  },
  {
    label: 'Зарплата и время',
    title: 'Зарплата и рабочее время',
    titleAccent: ' без ошибок',
    subtitle:
      'Учёт рабочего времени, отчёты сотрудников, график отпусков и расчёт зарплаты — включая поддержку физического регистратора начала и конца рабочего дня.',
    icon: icons.calendar,
    img: '/images/1.jpg',
  },
  {
    label: 'Гибкость и безопасность',
    title: 'Настраивается',
    titleAccent: ' под ваш бизнес',
    subtitle:
      'Свои поля, категории и права доступа — более 300 прав в системе. Мультивалютность и мультикомпании для бизнеса с несколькими юрлицами. Работает даже без интернета, а данные остаются на вашем сервере.',
    icon: icons.box,
    img: '/images/1.jpg',
  },
]
</script>
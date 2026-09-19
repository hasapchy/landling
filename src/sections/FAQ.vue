<template>
    <section class="relative overflow-hidden text-center pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 pb-16 sm:pb-20 md:pb-24 w-full max-w-[1440px] mx-auto">

        <!-- место под изображение, добавишь сама -->
        <img src="/images/faq-bg.png" alt=""
    class="absolute z-[1] pointer-events-none object-contain left-1/2 -translate-x-1/2 -translate-y-1/2
           w-[600px]
           top-[520px]
           sm:w-[750px] sm:top-[580px]
           md:w-[900px] md:top-[360px]
           lg:w-[1100px] lg:top-[500px]" />

        <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <LabelBadge>
                <template #icon>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10.5v.01M6.2 5.8a1.8 1.8 0 1 1 2.6 1.6c-.6.3-.8.7-.8 1.3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" />
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

            <p class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t('faq.description') }}
            </p>
        </div>

        <div class="relative z-[2] mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 md:gap-x-8 text-left">
            <div v-for="(column, colIndex) in [leftColumn, rightColumn]" :key="colIndex" class="flex flex-col gap-4 sm:gap-5">
                <div v-for="item in column" :key="item.id" class="faq-card rounded-[16px] px-5 sm:px-6 overflow-hidden">
                    <button type="button" @click="toggle(item.id)"
                        class="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left">
                        <span class="font-bold text-base sm:text-lg text-black">{{ item.question }}</span>
                        <span class="relative h-6 w-6 shrink-0 flex items-center justify-center text-[#054C86]">
    <span class="absolute w-6 h-[2px] bg-current"></span>
    <span class="absolute w-[2px] h-6 bg-current transition-transform duration-300"
        :class="openIds.has(item.id) ? 'scale-y-0' : 'scale-y-100'"></span>
</span>
                    </button>

                    <div class="grid transition-[grid-template-rows] duration-300 ease-in-out"
                        :style="{ gridTemplateRows: openIds.has(item.id) ? '1fr' : '0fr' }">
                        <div class="overflow-hidden">
                            <p class="pb-5 sm:pb-6 text-sm sm:text-base text-black/60 leading-relaxed">
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'

const { t } = useI18n()

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

const faqs = [
    { id: 1, question: 'Что такое HasApp?', answer: 'HasApp — система для управления бизнесом: продажи, склад, финансы, персонал и коммуникации в одном месте.' },
    { id: 2, question: 'Насколько безопасны мои данные в HasApp?', answer: 'Данные остаются на вашем сервере, доступ настраивается через систему прав (более 300 прав доступа).' },
    { id: 3, question: 'Как работает система?', answer: 'Вы регистрируете компанию, подключаете нужные модули и начинаете работать — развёртывание занимает 1–3 дня.' },
    { id: 4, question: 'Можно ли настроить уведомления и напоминания?', answer: 'Да, уведомления и напоминания настраиваются под сотрудников и бизнес-процессы.' },
    { id: 5, question: 'Поддерживает ли HasApp несколько компаний?', answer: 'Да, система поддерживает мультикомпании и мультивалютность для бизнеса с несколькими юрлицами.' },
    { id: 6, question: 'Как начать работу с HasApp?', answer: 'Оставьте заявку — мы развернём систему под ваш бизнес и настроим права доступа за 1–3 дня.' },
    { id: 7, question: 'Может ли HasApp учитывать рабочее время сотрудников?', answer: 'Да, включая поддержку физического регистратора начала и конца рабочего дня.' },
    { id: 8, question: 'Какие есть тарифы у HasApp?', answer: 'Есть несколько пакетов по числу пользователей и индивидуальный тариф для крупного бизнеса — подробности в разделе «Тарифы».' },
]

const leftColumn = computed(() => faqs.filter((_, i) => i % 2 === 0))
const rightColumn = computed(() => faqs.filter((_, i) => i % 2 === 1))
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
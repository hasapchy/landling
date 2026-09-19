<template>
    <section class="relative  text-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-10 sm:pb-12 md:pb-16 w-full max-w-[1440px] mx-auto">

        <img src="/images/Left-2.png" alt=""
            class="absolute z-[1] pointer-events-none object-contain top-[-70px] w-[300px]  left-[-70px] sm:top-[-80px] sm:w-[420px] sm:left-[-110px] lg:top-[-250px] lg:w-[880px] lg:left-[-350px]" />
        <img src="/images/Right-2.png" alt=""
            class="absolute z-[1] pointer-events-none object-contain top-[-20px] w-[420px]  right-[-70px] sm:top-[-70px] sm:w-[550px] sm:right-[-210px] lg:top-[-130px] lg:w-[880px] lg:right-[-170px]" />

        <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-14 md:mb-16">
            <LabelBadge>
                <template #icon>
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 8c0-2.2 1.8-4 4-4V2C4.7 2 2 4.7 2 8s2.7 6 6 6v-2c-2.2 0-4-1.8-4-4zm8 0c0-2.2 1.8-4 4-4V2c-3.3 0-6 2.7-6 6s2.7 6 6 6v-2c-2.2 0-4-1.8-4-4z" />
                    </svg>
                </template>
                {{ t('testimonials.badge') }}
            </LabelBadge>

            <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
                 text-3xl sm:text-4xl md:text-6xl lg:text-7xl
                 bg-clip-text text-transparent
                 bg-[linear-gradient(90deg,#054C86,#065A9D)]
                 [-webkit-text-fill-color:transparent]">
                {{ t('testimonials.headline') }}
            </h2>

            <p class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
                {{ t('testimonials.description') }}
            </p>
        </div>

        <div class="relative z-[2] flex flex-col gap-5 sm:gap-6 ">
            <!-- строка 1: скролл влево -->
            <div class="relative w-full overflow-x-hidden overflow-y-visible [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
                <div class="flex w-max gap-4 sm:gap-5 will-change-transform animate-[testimonial-scroll-left_45s_linear_infinite]">
                    <template v-for="group in 2" :key="'row1-' + group">
                        <div v-for="(item, i) in row1" :key="'row1-' + group + '-' + i"
                            class="w-[340px] sm:w-[400px] flex-none rounded-[18px] border border-[#0392FF]/50 bg-[radial-gradient(circle_at_50%_0%,rgba(0,94,173,0.25)_0%,rgba(218,236,248,0.08)_100%)] p-5 sm:p-6">
                            <div class="flex items-center justify-between gap-3">
                                <div class="text-left">
                                    <p class="font-bold text-sm sm:text-base text-[#054C86]">{{ item.name }}</p>
                                    <p class="text-xs sm:text-sm text-black/50">{{ item.role }}</p>
                                </div>
                                <img :src="item.avatar" :alt="item.name" class="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0 overflow-hidden bg-gray-100" />
                            </div>
                            <p class="mt-4 text-left text-sm sm:text-base text-black/70 leading-relaxed">
                                {{ item.text }}
                            </p>
                        </div>
                    </template>
                </div>
            </div>

            <!-- строка 2: скролл вправо -->
            <div class="relative w-full pb-2 [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
                <div class="flex w-max gap-4 sm:gap-5 will-change-transform animate-[testimonial-scroll-right_45s_linear_infinite]">
                    <template v-for="group in 2" :key="'row2-' + group">
                        <div v-for="(item, i) in row2" :key="'row2-' + group + '-' + i"
                            class="w-[340px] sm:w-[400px] flex-none rounded-[18px] border border-[#0392FF]/50 bg-[radial-gradient(circle_at_50%_0%,rgba(0,94,173,0.25)_0%,rgba(218,236,248,0.08)_100%)] p-5 sm:p-6">
                            <div class="flex items-center justify-between gap-3">
                                <div class="text-left">
                                    <p class="font-bold text-sm sm:text-base text-[#054C86]">{{ item.name }}</p>
                                    <p class="text-xs sm:text-sm text-black/50">{{ item.role }}</p>
                                </div>
                                <img :src="item.avatar" :alt="item.name" class="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0 overflow-hidden bg-gray-100" />
                            </div>
                            <p class="mt-4 text-left text-sm sm:text-base text-black/70 leading-relaxed">
                                {{ item.text }}
                            </p>
                        </div>
                    </template>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'

const { t } = useI18n()

const row1 = [
    { name: 'Максат Аннаев', role: 'Директор, торговая компания', text: 'Перевели весь склад и продажи в HasApp за пару дней — сразу увидели, где терялись заявки.', avatar: '/images/avatars/1.jpg' },
    { name: 'Огулджерен Оразова', role: 'HR-менеджер', text: 'Учёт рабочего времени и график отпусков теперь в одном месте, без бумажных журналов.', avatar: '/images/avatars/2.jpg' },
    { name: 'Сердар Курбанов', role: 'Владелец сети магазинов', text: 'Наконец видно все сделки и остатки по каждой точке в реальном времени.', avatar: '/images/avatars/3.jpg' },
    { name: 'Айгуль Реджепова', role: 'Финансовый директор', text: 'Отчёты по зарплате стали занимать минуты вместо дней — ошибок стало в разы меньше.', avatar: '/images/avatars/4.jpg' },
    { name: 'Довлет Ходжаев', role: 'Руководитель склада', text: 'Списания и инвентаризация теперь под контролем — недостачи больше не «теряются».', avatar: '/images/avatars/5.jpg' },
]

const row2 = [
    { name: 'Джемал Атаева', role: 'Менеджер по продажам', text: 'Воронка сделок перед глазами — я точно знаю, на каком этапе каждый клиент.', avatar: '/images/avatars/6.jpg' },
    { name: 'Ресул Байрамов', role: 'Директор производства', text: 'Настроили права доступа под каждого сотрудника — данные теперь под контролем.', avatar: '/images/avatars/7.jpg' },
    { name: 'Мая Союнова', role: 'Бухгалтер', text: 'Мультивалютность и учёт по нескольким юрлицам — то, чего нам не хватало годами.', avatar: '/images/avatars/8.jpg' },
    { name: 'Шохрат Гельдиев', role: 'IT-директор', text: 'Работает даже без интернета, а данные остаются на нашем сервере — то, что нужно.', avatar: '/images/avatars/9.jpg' },
    { name: 'Гозель Бердиева', role: 'Операционный директор', text: 'Развернули систему за 2 дня — команда начала работать в HasApp практически сразу.', avatar: '/images/avatars/10.jpg' },
]
</script>

<style>
@keyframes testimonial-scroll-left {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

@keyframes testimonial-scroll-right {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0);
    }
}
</style>
<template>
    <section id="testimonials" class="relative  text-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 pb-10 sm:pb-12 md:pb-16 w-full max-w-[1440px] mx-auto">

        <img src="/images/Left-2.png" alt=""
            class="absolute z-[1] pointer-events-none object-contain top-[-70px] w-[300px]  left-[-70px] sm:top-[-80px] sm:w-[420px] sm:left-[-110px] lg:top-[-250px] lg:w-[880px] lg:left-[-350px]" />
        <img src="/images/Right-2.png" alt=""
            class="absolute z-[1] pointer-events-none object-contain top-[-20px] w-[420px]  right-[-70px] sm:top-[-70px] sm:w-[550px] sm:right-[-210px] lg:top-[-130px] lg:w-[880px] lg:right-[-170px]" />

        <div ref="headingRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-14 md:mb-16
             transition-all duration-700 ease-out"
             :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
            <LabelBadge>
                <template #icon>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.98809 2.49361C4.75685 2.99804 3.0061 4.71278 2.46895 6.91982C2.17523 8.12663 2.17792 9.39653 2.47163 10.6034C3.01718 12.8449 4.62194 14.7104 6.7747 15.5796L6.86854 15.6175C7.80015 15.9937 8.86733 15.5406 9.24953 14.6177C9.35475 14.3636 9.60525 14.1951 9.88208 14.1951H10.7249C13.0173 14.1951 15.0116 12.6374 15.5496 10.4266C15.8168 9.32865 15.8168 8.18347 15.5496 7.08556L15.479 6.79566C14.9604 4.66468 13.27 3.00903 11.1157 2.52198L10.813 2.45356C9.61245 2.18215 8.36573 2.18215 7.16522 2.45356L6.98809 2.49361ZM6.37646 6.27502C6.08787 6.27502 5.85393 6.50712 5.85393 6.79344C5.85393 7.07976 6.08787 7.31187 6.37646 7.31187H11.1663C11.4549 7.31187 11.6888 7.07976 11.6888 6.79344C11.6888 6.50712 11.4549 6.27502 11.1663 6.27502H6.37646ZM7.24734 8.86717C6.95876 8.86717 6.72482 9.09923 6.72482 9.38558C6.72482 9.67185 6.95876 9.90398 7.24734 9.90398H10.2954C10.584 9.90398 10.8179 9.67185 10.8179 9.38558C10.8179 9.09923 10.584 8.86717 10.2954 8.86717H7.24734Z"/>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
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

const headingRef = ref(null)
const headingVisible = ref(false)

let observer

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                headingVisible.value = true
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.15 })

    if (headingRef.value) observer.observe(headingRef.value)
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
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
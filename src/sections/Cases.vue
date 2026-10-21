<template>
  <section id="cases"
    class="relative text-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-8 pb-14 sm:pb-16 md:pb-24 w-full max-w-[1440px] mx-auto">

    <!-- декор в левом верхнем углу — та же картинка и размеры, что у блока «Как это работает» -->
    <img src="/images/Left.png" alt="" aria-hidden="true" width="1560" height="1740" loading="lazy" decoding="async"
      class="absolute z-[1] pointer-events-none object-contain max-w-[55%]
             w-[250px] top-[-20px] left-[-40px]
             min-[481px]:w-[260px] min-[481px]:top-[-40px] min-[481px]:left-[-100px]
             min-[641px]:w-[340px] min-[641px]:top-[-80px] min-[641px]:left-[-130px]
             min-[769px]:w-[480px] min-[769px]:top-[-130px] min-[769px]:left-[-170px]
             min-[1025px]:w-[650px] min-[1025px]:top-[-190px] min-[1025px]:left-[-240px]
             min-[1281px]:w-[880px] min-[1281px]:top-[-280px] min-[1281px]:left-[-360px]" />

    <div ref="headingRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6
           transition-all duration-700 ease-out"
      :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
      <div class="flex items-center gap-3">
        <span class="hidden sm:block h-px w-20 bg-[linear-gradient(90deg,transparent,#2a8bff)]"></span>
        <LabelBadge>
          <template #icon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3 3.75A1.5 1.5 0 0 1 4.5 2.25h9A1.5 1.5 0 0 1 15 3.75v10.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 14.25V3.75Zm3 2.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H6Zm0 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H6Zm0 3a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5H6Z" />
            </svg>
          </template>
          {{ t('cases.badge') }}
        </LabelBadge>
        <span class="hidden sm:block h-px w-20 bg-[linear-gradient(270deg,transparent,#2a8bff)]"></span>
      </div>

      <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
       text-3xl sm:text-4xl md:text-6xl lg:text-7xl
       bg-clip-text text-transparent
       bg-[linear-gradient(90deg,#054C86,#065A9D)]
       [-webkit-text-fill-color:transparent]">
        {{ t('cases.headline') }}
      </h2>

      <p class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 dark:text-white/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
        {{ t('cases.description') }}
      </p>
    </div>

    <div class="relative z-[2] mt-10 sm:mt-12 md:mt-16 mx-auto max-w-[1180px] flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch text-left">

      <!-- вкладки отраслей -->
      <div role="tablist" class="lg:w-[350px] shrink-0 flex lg:flex-col gap-2.5 lg:gap-3 overflow-x-auto lg:overflow-visible py-3 lg:py-0 -mx-2 px-2 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button v-for="(c, i) in cases" :key="c.key" type="button" role="tab" :aria-selected="i === active"
          @click="active = i"
          class="group flex items-center gap-3 sm:gap-4 border p-2.5 sm:p-3.5 pr-4 sm:pr-5 text-left shrink-0 lg:shrink lg:w-full cursor-pointer"
          :class="i === active
            ? tabActive
            : 'rounded-[20px] border-[#0392FF]/30 dark:border-[#3c8cff]/25 bg-[#ffffff] dark:bg-[#ffffff]/[0.04] text-[#0b1b2b] dark:text-white hover:border-[#0392FF]/70'">
          <span class="shrink-0 flex items-center justify-center h-11 w-11 sm:h-14 sm:w-14 rounded-2xl border"
            :class="i === active
              ? badgeActive
              : 'bg-[#eaf4ff] dark:bg-[linear-gradient(135deg,#0c3a86,#0a2a66)] border-[#0392FF]/25 dark:border-[#3c8cff]/30 text-[#054C86] dark:text-[#7fc4ff]'">
            <svg class="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="c.icon" /></svg>
          </span>
          <span class="flex flex-col gap-0.5 min-w-0 flex-1">
            <span class="text-[15px] sm:text-[17px] font-semibold leading-tight whitespace-nowrap lg:whitespace-normal">{{ c.industry }}</span>
            <span v-if="c.soon" class="mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[12px] font-semibold"
              :class="i === active ? 'border-white/40 bg-white/15 text-white' : 'border-[#0392FF]/45 bg-[#0392FF]/10 text-[#054C86] dark:text-[#9fd0ff]'">
              <svg class="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              {{ t('cases.soon') }}
            </span>
            <span v-else class="text-[12.5px] sm:text-sm" :class="i === active ? 'text-[#bcdcff]' : 'opacity-75'">{{ c.client }}</span>
          </span>
          <span class="hidden lg:block text-lg opacity-80 transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </button>
      </div>

      <!-- карточка выбранного кейса -->
      <div class="relative flex-1 min-w-0 overflow-hidden rounded-[24px] sm:rounded-[28px] border border-[#0392FF]/35 dark:border-[#3c8cff]/45
                  bg-[linear-gradient(120deg,#e7f2ff_0%,#d8eafd_45%,#c4dcf8_100%)] dark:bg-[linear-gradient(135deg,rgba(14,50,120,0.55)_0%,rgba(5,18,48,0.75)_100%)]
                  shadow-[0_18px_50px_rgba(5,76,134,0.14)] dark:shadow-[0_0_0_1px_rgba(60,140,255,0.15),0_20px_60px_rgba(0,60,200,0.35),inset_0_0_60px_rgba(30,100,255,0.12)]
                  min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between p-5 sm:p-8 lg:p-10">

        <!-- иллюстрация отрасли: если есть картинка — она, иначе большая иконка -->
        <div aria-hidden="true" class="pointer-events-none absolute inset-0">
          <!-- светлая тема: голубое градиентное свечение вокруг картинки вместо белой дымки -->
          <div class="dark:hidden absolute inset-0 bg-[radial-gradient(ellipse_at_12%_8%,rgba(3,146,255,0.16)_0%,transparent_60%)]"></div>
          <div class="dark:hidden absolute right-0 bottom-0 h-full w-[78%]
                      bg-[radial-gradient(ellipse_at_72%_62%,rgba(3,146,255,0.34)_0%,rgba(3,146,255,0.14)_42%,transparent_74%)]"></div>
          <!-- светлая тема: «солнце» — тёмно-синее круглое свечение между кнопкой и картинкой -->
          <div class="dark:hidden absolute left-[2%] bottom-[-18%] h-[420px] w-[420px] sm:left-[14%] sm:h-[620px] sm:w-[620px] rounded-full blur-[30px]
                      bg-[radial-gradient(circle,rgba(0,140,255,0.55)_0%,rgba(0,140,255,0.34)_30%,rgba(0,140,255,0.14)_55%,transparent_72%)]"></div>
          <div class="absolute right-[-60px] bottom-[-40px] h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] rounded-full blur-[40px]
                      bg-[radial-gradient(circle,rgba(60,150,255,0.45)_0%,rgba(60,150,255,0.12)_55%,transparent_75%)]
                      dark:bg-[radial-gradient(circle,rgba(40,130,255,0.7)_0%,rgba(20,80,220,0.25)_55%,transparent_75%)]"></div>
          <Transition name="case-fade" mode="out-in">
            <img v-if="current.image && !failed[current.key]" :key="current.key" :src="current.image" alt="" loading="lazy" decoding="async" @error="failed[current.key] = true"
              class="absolute right-0 bottom-0 h-[62%] w-full sm:h-[80%] sm:w-[66%] object-cover object-center opacity-50 sm:opacity-100
                     [mask-image:linear-gradient(to_right,transparent_0%,#000_45%),linear-gradient(to_bottom,transparent_0%,#000_38%)]
                     [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_45%),linear-gradient(to_bottom,transparent_0%,#000_38%)]
                     [mask-composite:intersect] [-webkit-mask-composite:source-in]" />
            <svg v-else :key="current.key + '-i'" viewBox="0 0 24 24" fill="none" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"
              class="absolute right-2 sm:right-12 bottom-6 sm:bottom-auto sm:top-12 h-[260px] w-[260px] sm:h-[360px] sm:w-[360px] stroke-[#054C86]/35 dark:stroke-[#96cdff]/55">
              <path :d="current.icon" />
            </svg>
          </Transition>
        </div>

        <div class="relative flex items-start justify-between gap-4">
          <div class="max-w-[440px]">
            <p class="text-[12px] sm:text-sm font-medium uppercase tracking-wider text-[#0a6ab8] dark:text-[#8fc2ff]">{{ current.industry }}</p>
            <h3 class="mt-2.5 font-display font-bold leading-[1.12] text-2xl sm:text-3xl lg:text-[38px] text-[#0b1b2b] dark:text-white">{{ current.title }}</h3>
            <p class="mt-4 text-base sm:text-lg leading-relaxed text-black/70 dark:text-[#c8dcff]/80">{{ current.text }}</p>
            <div v-if="current.modules.length" class="mt-5 flex flex-wrap gap-2.5">
              <span v-for="m in current.modules" :key="m"
                class="rounded-full border px-4 py-1.5 text-sm font-medium
                       border-[#0392FF]/50 bg-[#ffffff]/70 text-[#054C86]
                       dark:border-[#2a8bff]/70 dark:bg-[#0a2a66]/40 dark:text-[#cfe6ff]
                       dark:shadow-[0_0_12px_rgba(42,139,255,0.35),inset_0_0_10px_rgba(42,139,255,0.15)]">{{ m }}</span>
            </div>
          </div>
          <!-- логотип клиента без подложки: светлая/тёмная версия под тему -->
          <div class="shrink-0 flex items-center justify-end w-[96px] sm:w-[150px] h-[40px] sm:h-[56px]">
            <template v-if="current.logo">
              <img :src="current.logo" :alt="current.client" loading="lazy" decoding="async"
                class="max-h-full max-w-full w-auto object-contain dark:hidden" />
              <img :src="current.logoDark || current.logo" :alt="current.client" loading="lazy" decoding="async"
                class="hidden dark:block max-h-full max-w-full w-auto object-contain" />
            </template>
            <span v-else-if="current.soon"
              class="inline-flex items-center gap-2 rounded-xl border border-[#4db3ff]/70 px-3.5 py-2 text-sm sm:text-base font-semibold text-white
                     bg-[linear-gradient(135deg,#1d74ff_0%,#0a46c4_100%)]
                     shadow-[0_0_16px_rgba(42,139,255,0.45),inset_0_1px_0_rgba(255,255,255,0.35)]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              {{ t('cases.soon') }}
            </span>
            <span v-else class="font-display font-extrabold text-right leading-tight text-base sm:text-xl text-[#054C86] dark:text-white">{{ current.mono }}</span>
          </div>
        </div>

        <div class="relative mt-10">
          <button type="button" @click="openContactModal && openContactModal()" class="btn-primary">
            {{ t('cases.more') }}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t, tm, rt } = useI18n()
const openContactModal = inject('openContactModal', null)

// Активная вкладка: синее стекло с неоновым свечением (Tailwind).
// Строка вынесена сюда, потому что внутри содержит кавычки content-[''].
const tabActive =
  "relative isolate overflow-hidden rounded-[17px] border border-transparent text-white "
  + "bg-[radial-gradient(ellipse_at_80%_0%,rgba(3,146,255,0.5)_0%,transparent_50%),linear-gradient(115deg,#065A9D_0%,#054C86_50%,#043a69_100%)] "
  + "[&>*]:relative [&>*]:z-[1] "
  + "before:content-[''] before:absolute before:-inset-[3px] before:-z-10 before:rounded-[inherit] before:pointer-events-none before:opacity-60 before:blur-[8px] "
  + "before:bg-[radial-gradient(ellipse_at_83%_0%,rgba(3,146,255,0.9)_0%,rgba(3,120,220,0.5)_14%,transparent_36%),radial-gradient(ellipse_at_100%_100%,rgba(3,146,255,0.8)_0%,rgba(3,120,220,0.45)_12%,transparent_32%),radial-gradient(ellipse_at_5%_15%,rgba(3,146,255,0.5)_0%,transparent_30%)] "
  + "after:content-[''] after:absolute after:inset-0 after:p-px after:rounded-[inherit] after:pointer-events-none "
  + "after:bg-[linear-gradient(125deg,#4db3ff_0%,#0a6ab8_30%,#054C86_60%,#3aa8ff_100%)] "
  + "after:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] after:[-webkit-mask-composite:xor] "
  + "after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] after:[mask-composite:exclude]"

// Иконка активной вкладки — стеклянная плашка
const badgeActive =
  "border-[rgba(190,225,255,0.4)] text-white bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] shadow-[0_0_10px_rgba(60,150,255,0.35),inset_0_0_10px_rgba(120,190,255,0.2)] [&>svg]:drop-shadow-[0_0_4px_rgba(180,220,255,0.6)]"

// Логотипы, иконки и картинки — здесь; тексты — в locales (cases.items).
// image: большая иллюстрация отрасли справа в карточке — файлы кладём в public/images/cases/
//        (JPG/PNG/WebP ~1200×900, тёмно-синий фон). Нет файла или null — показывается иконка.
const META = [
  { key: 'print', client: 'Altyn Arzuw', logo: '/images/partners/aa-light.svg', logoDark: '/images/partners/aa-dark.svg', mono: 'AA', image: '/images/cases/1.jpg',
    icon: 'M6 9V3h12v6 M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2 M6 14h12v7H6z' },
  { key: 'logistics', client: 'Zehinli', logo: '/images/partners/ZNY.png', logoDark: '/images/partners/ZNY.png', mono: 'ZNY', image: '/images/cases/1.jpg',
    icon: 'M2 6h11v10H2z M13 9h4l3 3v4h-7z M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { key: 'ads', client: 'LT', logo: '/images/partners/lt-light.svg', logoDark: '/images/partners/lt-dark.svg', mono: 'LT', image: '/images/cases/1.jpg',
    icon: 'M3 11v3a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z M15 9a4 4 0 0 1 0 6 M18 6.5a8 8 0 0 1 0 11' },
  { key: 'edu', client: 'Takyk Abzal', logo: '/images/partners/ta-light.svg', logoDark: '/images/partners/ta-dark.svg', mono: 'TA', image: '/images/cases/1.jpg',
    icon: 'M2 9l10-5 10 5-10 5z M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5 M22 9v6' },
  { key: 'hammam', client: '7 Hammam', logo: '/images/partners/7H.png', mono: '7 hammam', image: '/images/cases/1.jpg',
    icon: 'M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17 M15 9h3a1 1 0 0 1 1 1v11 M3 21h18 M9 7h2 M9 11h2 M9 15h2' },
  { key: 'beauty', client: '', logo: null, mono: '', soon: true, image: '/images/cases/1.jpg',
    icon: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z' },
]

const cases = computed(() =>
  tm('cases.items').map((item, i) => ({
    ...META[i],
    client: META[i].client || rt(item.client),
    mono: META[i].mono || rt(item.client),
    industry: rt(item.industry),
    title: rt(item.title),
    text: rt(item.text),
    modules: (item.modules || []).map((m) => rt(m)),
  })),
)

// если файла картинки нет (404) — вместо неё показывается иконка отрасли
const failed = reactive({})
const active = ref(0)
const current = computed(() => cases.value[active.value] || cases.value[0])

const { headingRef, headingVisible } = useScrollReveal()
</script>

<style>
.case-fade-enter-active,
.case-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.case-fade-enter-from,
.case-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
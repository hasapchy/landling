<template>
  <section id="contacts"
    class="relative text-center pt-14 sm:pt-16 md:pt-20 px-6 sm:px-8 pb-10 sm:pb-12 md:pb-16 w-full max-w-[1440px] mx-auto">

    <!-- тонкая линия-разделитель между блоком CTA и контактами -->
    <div aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,720px)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(3,146,255,0.45),transparent)]"></div>

    <div ref="headingRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6
             transition-all duration-700 ease-out"
      :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
      <LabelBadge>
        <template #icon>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 3.5h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm.5 1.6 6.2 4.3a.5.5 0 0 0 .6 0L15.5 5.1V4.5H3zm0 1.9V13.5h12V7l-5.7 3.95a1.5 1.5 0 0 1-1.7 0L3 7z" />
          </svg>
        </template>
        {{ t('contacts.badge') }}
      </LabelBadge>

      <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
                 text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                 bg-clip-text text-transparent
                 bg-[linear-gradient(90deg,#054C86,#065A9D)] dark:bg-[linear-gradient(90deg,#38A6EA,#7fc4ff)]
                 [-webkit-text-fill-color:transparent]">
        {{ t('contacts.headline') }}
      </h2>

      <p
        class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
        {{ t('contacts.description') }}
      </p>
    </div>

    <div ref="cardRef" class="relative z-[2] mt-10 sm:mt-12 md:mt-16 max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left
             transition-all duration-700 ease-out"
      :class="cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">

      <div class="contacts-card [--c1:#ffffff] [--c2:#ffffff] dark:[--c1:#16293f] dark:[--c2:#060b12] [--b1:#0392ff] [--b2:#7fc4ff] [--b3:#9dedf796] dark:[--b1:rgba(3,146,255,0.6)] dark:[--b2:rgba(127,196,255,0.28)] dark:[--b3:rgba(157,237,247,0.14)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col gap-5 sm:gap-6">
        <div class="flex flex-col gap-2">
          <h3
            class="text-2xl sm:text-3xl font-display font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] dark:bg-[linear-gradient(90deg,#38A6EA,#7fc4ff)] [-webkit-text-fill-color:transparent]">
            {{ t('contactModal.title') }}
          </h3>
          <p class="text-sm sm:text-base text-black/60 leading-relaxed">{{ t('contactModal.subtitle') }}</p>
        </div>
        <!-- в тёмной теме делаем текст и подсказки в полях светлыми -->
        <div class="dark:[&_input]:text-white! dark:[&_textarea]:text-white! dark:[&_input::placeholder]:text-white/40! dark:[&_textarea::placeholder]:text-white/40!">
          <ContactForm />
        </div>
      </div>

      <div class="contacts-card [--c1:#F4F7FC] [--c2:#F4F7FC] dark:[--c1:#10263d] dark:[--c2:#0a1524] [--b1:#0392ff] [--b2:#7fc4ff] [--b3:#9dedf796] dark:[--b1:rgba(3,146,255,0.6)] dark:[--b2:rgba(127,196,255,0.28)] dark:[--b3:rgba(157,237,247,0.14)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
        <div class="flex flex-col gap-5">
          <h3 class="text-xl sm:text-2xl font-display font-bold text-[#054C86] dark:text-[#7fc4ff]">{{ t('contacts.infoTitle') }}</h3>

          <div class="flex flex-col gap-4">
            <div class="flex items-start gap-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffffff] text-[#054C86] dark:bg-white/10 dark:text-[#6cb6f2]">
                <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                  <path d="M8 14.5s5-4.2 5-8.2A5 5 0 0 0 3 6.3c0 4 5 8.2 5 8.2z" stroke="currentColor"
                    stroke-width="1.3" />
                  <circle cx="8" cy="6.3" r="1.8" stroke="currentColor" stroke-width="1.3" />
                </svg>
              </span>
              <div class="pt-2">
                <p class="text-xs uppercase tracking-wider font-bold text-black/40">{{ t('contacts.addressLabel') }}</p>
                <p class="mt-1 text-sm sm:text-base text-black/70 leading-snug">{{ t('contactModal.address') }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffffff] text-[#054C86] dark:bg-white/10 dark:text-[#6cb6f2]">
                <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                  <path
                    d="M2.5 3h2.2l1 3-1.4 1a8 8 0 0 0 3.7 3.7l1-1.4 3 1v2.2c0 .6-.5 1-1 1C6.6 13.5 2.5 9.4 2.5 4c0-.5.4-1 1-1z"
                    stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
                </svg>
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider font-bold text-black/40">{{ t('contacts.phoneLabel') }}</p>
                <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5">
                  <a :href="CONTACTS.phoneHref" class="text-sm sm:text-base text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{ CONTACTS.phone }}</a>
                  <a :href="CONTACTS.phone2Href" class="text-sm sm:text-base text-black/70 hover:text-[#054C86] dark:hover:text-[#6cb6f2] transition-colors">{{ CONTACTS.phone2 }}</a>
                </div>
              </div>
            </div>

            <a :href="CONTACTS.emailHref" class="flex items-center gap-3 group">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffffff] text-[#054C86] dark:bg-white/10 dark:text-[#6cb6f2]">
                <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                  <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2" />
                  <path d="M2 4l6 4.5L14 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider font-bold text-black/40">{{ t('contacts.emailLabel') }}</p>
                <p class="mt-1 text-sm sm:text-base text-black/70 group-hover:text-[#054C86] dark:group-hover:text-[#6cb6f2] transition-colors">{{
                  CONTACTS.email }}</p>
              </div>
            </a>
          </div>
        </div>


        <!-- карта офиса — занимает оставшееся место -->
        <div class="relative flex-1 min-h-[140px] overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_6px_20px_rgba(5,76,134,0.10)]">
          <iframe :src="CONTACTS.mapEmbed" title="HasApp — карта" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="absolute inset-0 h-full w-full border-0"></iframe>
        </div>

        <div class="flex flex-col gap-3">
          <p class="text-xs uppercase tracking-wider font-bold text-black/40">{{ t('footer.socialMedia') }}</p>
          <div class="flex items-center gap-3">
            <a :href="CONTACTS.instagram" target="_blank" rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)] text-white hover:opacity-90 transition-opacity">
              <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" stroke-width="1.3" />
                <circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.3" />
                <circle cx="11.3" cy="4.7" r="0.6" fill="currentColor" />
              </svg>
            </a>
            <a :href="CONTACTS.telegram" target="_blank" rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)] text-white hover:opacity-90 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.2265 2.04859C13.7217 1.85169 14.1619 2.24608 13.9418 3.36273L11.9059 13.3477C11.7958 14.0045 11.4656 14.1358 11.0255 13.8732L8.329 11.508L7.00837 13.0193C6.84328 13.2164 6.73304 13.3477 6.51296 13.3477L6.73329 9.99738L11.8507 4.47908C12.0706 4.28206 11.7955 4.15081 11.5204 4.34783L5.19233 9.07757L2.44112 8.02652C1.83583 7.82944 1.83573 7.30391 2.55107 6.97547L13.2265 2.04859Z"
                  fill="currentColor" />
              </svg>
            </a>
            <a :href="CONTACTS.linkedin" target="_blank" rel="noopener"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)] text-white hover:opacity-90 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.57086 5.85547H2V13.9965H4.57086V5.85547Z" fill="currentColor" />
                <circle cx="3.28543" cy="3.28543" r="1.28543" fill="currentColor" />
                <path
                  d="M5.85645 5.85816H8.42731V7.14359C8.67912 6.13632 9.58416 5.42969 10.6224 5.42969H11.1102C12.7048 5.42969 13.9975 6.7224 13.9975 8.31704V13.9992H11.4266V9.28598C11.4266 8.57605 10.8511 8.00055 10.1412 8.00055C9.43129 8.00055 8.85578 8.57605 8.85578 9.28598V13.9992H5.85645V5.85816Z"
                  fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import ContactForm from '@/components/ContactForm.vue'
import { CONTACTS } from '@/config/contacts'

const { t } = useI18n()

const headingRef = ref(null)
const cardRef = ref(null)
const headingVisible = ref(false)
const cardVisible = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      if (entry.target === headingRef.value) headingVisible.value = true
      if (entry.target === cardRef.value) cardVisible.value = true
      observer.unobserve(entry.target)
    })
  }, { threshold: 0 })

  if (headingRef.value) observer.observe(headingRef.value)
  if (cardRef.value) observer.observe(cardRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.contacts-card {
  border: 1.5px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: border-box;
  background-image:
    linear-gradient(150deg, var(--c1), var(--c2)),
    linear-gradient(180deg, var(--b1), var(--b2) 35%, var(--b3));
}
</style>
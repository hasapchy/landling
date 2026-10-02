<!-- src/components/ContactModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4">

        <!-- затемнение фона -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>

        <!-- окно -->
        <div class="relative z-[1] w-full max-w-[920px] max-h-[92vh] overflow-y-auto rounded-[24px] bg-white shadow-[0_20px_60px_rgba(5,76,134,0.25)]
                    grid grid-cols-1 md:grid-cols-2">

          <!-- кнопка закрытия -->
          <button type="button" @click="close"
            class="absolute top-4 right-4 sm:top-5 sm:right-5 z-[2] flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-black/50 hover:bg-black/5 hover:text-black transition-colors">
            <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>

          <!-- левая колонка: заголовок + форма -->
          <div class="p-6 sm:p-8 md:p-10 flex flex-col gap-5 sm:gap-6">
            <div class="flex flex-col gap-2 pr-8">
              <h3
                class="text-2xl sm:text-3xl font-display font-bold
                         bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]">
                {{ t('contactModal.title') }}
              </h3>
              <p class="text-sm sm:text-base text-black/60 leading-relaxed">{{ t('contactModal.subtitle') }}</p>
            </div>

            <!-- успешная отправка -->
            <div v-if="submitted" class="flex flex-col items-center text-center gap-4 py-10">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)]">
                <svg viewBox="0 0 16 16" fill="none" class="h-6 w-6 text-white">
                  <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
              <p class="text-lg font-bold text-black">{{ t('contactModal.successTitle') }}</p>
              <p class="text-sm text-black/60">{{ t('contactModal.successText') }}</p>
            </div>

            <!-- форма -->
            <form v-else @submit.prevent="submitForm" novalidate class="flex flex-col gap-4">

              <!-- honeypot — невидимая ловушка для ботов, не трогай -->
              <div style="position: absolute; left: -9999px; top: -9999px;" aria-hidden="true">
                <input v-model="form.hp" type="text" name="hp_9f2k" tabindex="-1" autocomplete="off"
  readonly @focus="$event.target.removeAttribute('readonly')" />
              </div>

              <div class="flex flex-col gap-1.5">
                <input v-model="form.name" type="text" :placeholder="t('contactModal.name')" @blur="touched.name = true"
                  class="w-full rounded-xl bg-[#F4F7FC] border px-4 py-3.5 text-sm sm:text-base outline-none transition-colors placeholder:text-black/40"
                  :class="errors.name ? 'border-red-400' : 'border-transparent focus:border-[#0392FF]'" />
                <span v-if="errors.name" class="text-xs text-red-500">{{ errors.name }}</span>
              </div>

              <div class="flex flex-col gap-1.5">
                <input v-model="form.email" type="email" :placeholder="t('contactModal.email')"
                  @blur="touched.email = true"
                  class="w-full rounded-xl bg-[#F4F7FC] border px-4 py-3.5 text-sm sm:text-base outline-none transition-colors placeholder:text-black/40"
                  :class="errors.email ? 'border-red-400' : 'border-transparent focus:border-[#0392FF]'" />
                <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
              </div>

              <div class="flex flex-col gap-1.5">
                <input v-model="form.phone" type="tel" :placeholder="t('contactModal.phone')"
                  @blur="touched.phone = true"
                  class="w-full rounded-xl bg-[#F4F7FC] border px-4 py-3.5 text-sm sm:text-base outline-none transition-colors placeholder:text-black/40"
                  :class="errors.phone ? 'border-red-400' : 'border-transparent focus:border-[#0392FF]'" />
                <span v-if="errors.phone" class="text-xs text-red-500">{{ errors.phone }}</span>
              </div>

              <div class="flex flex-col gap-1.5">
                <textarea v-model="form.message" rows="4" :placeholder="t('contactModal.messagePlaceholder')"
                  @blur="touched.message = true"
                  class="w-full rounded-xl bg-[#F4F7FC] border px-4 py-3.5 text-sm sm:text-base outline-none transition-colors resize-none placeholder:text-black/40"
                  :class="errors.message ? 'border-red-400' : 'border-transparent focus:border-[#0392FF]'"></textarea>
                <span v-if="errors.message" class="text-xs text-red-500">{{ errors.message }}</span>
              </div>

              <p v-if="sendError" class="text-sm text-red-500 text-center -mt-1">{{ t('contactModal.sendError') }}</p>
              <div ref="turnstileContainer" class="flex justify-center"></div>
              <button type="submit" :disabled="loading" class="btn-primary mt-2 w-full disabled:opacity-60">
                {{ loading ? t('contactModal.sending') : t('contactModal.submit') }}
              </button>
            </form>
          </div>

          <!-- правая колонка: картинка + контакты -->
          <div
            class="relative bg-[#F4F7FC] p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6 rounded-b-[24px] md:rounded-b-none md:rounded-r-[24px]">

            <!-- место под изображение (добавишь сама) -->
            <div class="relative flex items-center justify-center flex-1 min-h-[160px]">
              <img src="/images/logo.png" alt="" class="w-full max-w-[280px] object-contain" />
            </div>

            <!-- контактная информация -->
            <div class="flex flex-col gap-3.5">
              <div class="flex items-start gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#054C86]">
                  <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                    <path d="M8 14.5s5-4.2 5-8.2A5 5 0 0 0 3 6.3c0 4 5 8.2 5 8.2z" stroke="currentColor"
                      stroke-width="1.3" />
                    <circle cx="8" cy="6.3" r="1.8" stroke="currentColor" stroke-width="1.3" />
                  </svg>
                </span>
                <p class="text-sm text-black/70 leading-snug pt-2">{{ t('contactModal.address') }}</p>
              </div>

              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#054C86]">
                  <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                    <path
                      d="M2.5 3h2.2l1 3-1.4 1a8 8 0 0 0 3.7 3.7l1-1.4 3 1v2.2c0 .6-.5 1-1 1C6.6 13.5 2.5 9.4 2.5 4c0-.5.4-1 1-1z"
                      stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
                  </svg>
                </span>
                <p class="text-sm text-black/70">{{ CONTACTS.phone }}</p>
              </div>

              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#054C86]">
                  <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                    <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2" />
                    <path d="M2 4l6 4.5L14 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>
                <p class="text-sm text-black/70">{{ CONTACTS.email }}</p>
              </div>
            </div>

            <!-- соц-иконки -->
            <div class="flex items-center gap-3">
              <a :href="CONTACTS.instagram" target="_blank" rel="noopener"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)] text-white">
                <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                  <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" stroke-width="1.3" />
                  <circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.3" />
                  <circle cx="11.3" cy="4.7" r="0.6" fill="currentColor" />
                </svg>
              </a>
              <a :href="CONTACTS.telegram" target="_blank" rel="noopener"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)] text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.2265 2.04859C13.7217 1.85169 14.1619 2.24608 13.9418 3.36273L11.9059 13.3477C11.7958 14.0045 11.4656 14.1358 11.0255 13.8732L8.329 11.508L7.00837 13.0193C6.84328 13.2164 6.73304 13.3477 6.51296 13.3477L6.73329 9.99738L11.8507 4.47908C12.0706 4.28206 11.7955 4.15081 11.5204 4.34783L5.19233 9.07757L2.44112 8.02652C1.83583 7.82944 1.83573 7.30391 2.55107 6.97547L13.2265 2.04859Z"
                    fill="currentColor" />
                </svg>

              </a>
              <a :href="CONTACTS.linkedin" target="_blank" rel="noopener"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)] text-white">
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
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONTACTS } from '@/config/contacts'

const { t } = useI18n()

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const form = reactive({ name: '', phone: '', email: '', message: '', website: '' })
const touched = reactive({ name: false, phone: false, email: false, message: false })
const loading = ref(false)
const submitted = ref(false)
const sendError = ref(false)

const phoneRegex = /^[+\d][\d\s\-()]{6,}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => {
  const e = {}
  if (touched.name && !form.name.trim()) e.name = t('contactModal.errors.name')
  if (touched.phone && !phoneRegex.test(form.phone.trim())) e.phone = t('contactModal.errors.phone')
  if (touched.email && !emailRegex.test(form.email.trim())) e.email = t('contactModal.errors.email')
  if (touched.message && !form.message.trim()) e.message = t('contactModal.errors.message')
  return e
})

const isValid = computed(() =>
  form.name.trim() &&
  phoneRegex.test(form.phone.trim()) &&
  emailRegex.test(form.email.trim()) &&
  form.message.trim()
)

const turnstileContainer = ref(null)
const turnstileToken = ref('')
let widgetId = null

function renderTurnstile() {
  if (window.turnstile && turnstileContainer.value) {
    widgetId = window.turnstile.render(turnstileContainer.value, {
      sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
      callback: (token) => {
        turnstileToken.value = token
      },
      'expired-callback': () => {
        turnstileToken.value = ''
      },
    })
  }
}

function resetTurnstile() {
  if (window.turnstile && widgetId !== null) {
    window.turnstile.reset(widgetId)
    turnstileToken.value = ''
  }
}

function close() {
  emit('update:modelValue', false)
}

async function submitForm() {
  touched.name = true
  touched.phone = true
  touched.email = true
  touched.message = true

  if (!isValid.value) return
  if (!turnstileToken.value) {
    sendError.value = true
    return
  }

  loading.value = true
  sendError.value = false

  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
        website: form.website,
        turnstileToken: turnstileToken.value,
      }),
    })

    if (!res.ok) throw new Error('send_failed')
    submitted.value = true
  } catch (err) {
    console.error('Ошибка отправки:', err)
    sendError.value = true
    resetTurnstile()
  } finally {
    loading.value = false
  }
}

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    submitted.value = false
    sendError.value = false
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    form.website = ''
    turnstileToken.value = ''
    touched.name = false
    touched.phone = false
    touched.email = false
    touched.message = false

    nextTick(() => {
      renderTurnstile()
    })
  } else if (window.turnstile && widgetId !== null) {
    window.turnstile.remove(widgetId)
    widgetId = null
  }
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active>div:last-child,
.modal-fade-leave-active>div:last-child {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-fade-enter-from>div:last-child,
.modal-fade-leave-to>div:last-child {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
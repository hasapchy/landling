<!-- src/components/ContactModal.vue -->
<template>
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
  
          <!-- затемнение фона -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>
  
          <!-- окно -->
          <div class="relative z-[1] w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-[24px] bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(5,76,134,0.25)]">
  
            <!-- кнопка закрытия -->
            <button type="button" @click="close"
                class="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-9 w-9 items-center justify-center rounded-full text-black/50 hover:bg-black/5 hover:text-black transition-colors">
              <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </button>
  
            <div class="flex flex-col gap-1.5 mb-6 sm:mb-8 pr-8">
              <h3 class="text-2xl sm:text-3xl font-display font-bold
                         bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]">
                {{ t('contactModal.title') }}
              </h3>
              <p class="text-sm sm:text-base text-black/60">{{ t('contactModal.subtitle') }}</p>
            </div>
  
            <!-- успешная отправка -->
            <div v-if="submitted" class="flex flex-col items-center text-center gap-4 py-8">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0392FF_0%,#054C86_100%)]">
                <svg viewBox="0 0 16 16" fill="none" class="h-6 w-6 text-white">
                  <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <p class="text-lg font-bold text-black">{{ t('contactModal.successTitle') }}</p>
              <p class="text-sm text-black/60">{{ t('contactModal.successText') }}</p>
            </div>
  
            <!-- форма -->
            <form v-else @submit.prevent="submitForm" novalidate class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-semibold text-black/80">{{ t('contactModal.name') }}</label>
                <input v-model="form.name" type="text" @blur="touched.name = true"
                    class="w-full rounded-xl border px-4 py-3 text-sm sm:text-base outline-none transition-colors"
                    :class="errors.name ? 'border-red-400 focus:border-red-400' : 'border-black/10 focus:border-[#0392FF]'" />
                <span v-if="errors.name" class="text-xs text-red-500">{{ errors.name }}</span>
              </div>
  
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-semibold text-black/80">{{ t('contactModal.phone') }}</label>
                <input v-model="form.phone" type="tel" @blur="touched.phone = true"
                    class="w-full rounded-xl border px-4 py-3 text-sm sm:text-base outline-none transition-colors"
                    :class="errors.phone ? 'border-red-400 focus:border-red-400' : 'border-black/10 focus:border-[#0392FF]'" />
                <span v-if="errors.phone" class="text-xs text-red-500">{{ errors.phone }}</span>
              </div>
  
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-semibold text-black/80">{{ t('contactModal.email') }}</label>
                <input v-model="form.email" type="email" @blur="touched.email = true"
                    class="w-full rounded-xl border px-4 py-3 text-sm sm:text-base outline-none transition-colors"
                    :class="errors.email ? 'border-red-400 focus:border-red-400' : 'border-black/10 focus:border-[#0392FF]'" />
                <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
              </div>
  
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-semibold text-black/80">{{ t('contactModal.company') }}</label>
                <input v-model="form.company" type="text"
                    class="w-full rounded-xl border border-black/10 px-4 py-3 text-sm sm:text-base outline-none transition-colors focus:border-[#0392FF]" />
              </div>
  
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-semibold text-black/80">{{ t('contactModal.message') }}</label>
                <textarea v-model="form.message" rows="3" @blur="touched.message = true"
                    class="w-full rounded-xl border px-4 py-3 text-sm sm:text-base outline-none transition-colors resize-none"
                    :class="errors.message ? 'border-red-400 focus:border-red-400' : 'border-black/10 focus:border-[#0392FF]'"></textarea>
                <span v-if="errors.message" class="text-xs text-red-500">{{ errors.message }}</span>
              </div>
  
              <button type="submit" :disabled="loading" class="btn-primary mt-2 w-full disabled:opacity-60">
                {{ loading ? t('contactModal.sending') : t('contactModal.submit') }}
              </button>
            </form>
  
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const props = defineProps({
    modelValue: { type: Boolean, default: false },
  })
  const emit = defineEmits(['update:modelValue'])
  
  const form = reactive({ name: '', phone: '', email: '', company: '', message: '' })
  const touched = reactive({ name: false, phone: false, email: false, message: false })
  const loading = ref(false)
  const submitted = ref(false)
  
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
  
  function close() {
    emit('update:modelValue', false)
  }
  
  async function submitForm() {
    touched.name = true
    touched.phone = true
    touched.email = true
    touched.message = true
  
    if (!isValid.value) return
  
    loading.value = true
    // сюда позже подключим реальную отправку (API/Telegram/почта)
    await new Promise((resolve) => setTimeout(resolve, 800))
    loading.value = false
    submitted.value = true
  }
  
  watch(() => props.modelValue, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      submitted.value = false
      form.name = ''
      form.phone = ''
      form.email = ''
      form.company = ''
      form.message = ''
      touched.name = false
      touched.phone = false
      touched.email = false
      touched.message = false
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
  .modal-fade-enter-active > div:last-child,
  .modal-fade-leave-active > div:last-child {
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .modal-fade-enter-from > div:last-child,
  .modal-fade-leave-to > div:last-child {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  </style>
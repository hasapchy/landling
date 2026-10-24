<template>
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

  <form v-else @submit.prevent="submitForm" novalidate class="flex flex-col gap-4">
    <div style="position: absolute; left: -9999px; top: -9999px;" aria-hidden="true">
      <input v-model="form.website" type="text" name="hp_9f2k" tabindex="-1" autocomplete="off" readonly
        @focus="$event.target.removeAttribute('readonly')" />
    </div>

    <div class="flex flex-col gap-1.5">
      <input v-model="form.name" type="text" :placeholder="t('contactModal.name')" @blur="touched.name = true"
        class="w-full rounded-xl bg-[#F4F7FC] border px-4 py-3.5 text-sm sm:text-base outline-none transition-colors placeholder:text-black/40"
        :class="errors.name ? 'border-red-400' : 'border-transparent focus:border-[#0392FF]'" />
      <span v-if="errors.name" class="text-xs text-red-500">{{ errors.name }}</span>
    </div>

    <div class="flex flex-col gap-1.5">
      <input v-model="form.email" type="email" :placeholder="t('contactModal.email')" @blur="touched.email = true"
        class="w-full rounded-xl bg-[#F4F7FC] border px-4 py-3.5 text-sm sm:text-base outline-none transition-colors placeholder:text-black/40"
        :class="errors.email ? 'border-red-400' : 'border-transparent focus:border-[#0392FF]'" />
      <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
    </div>

    <div class="flex flex-col gap-1.5">
      <input v-model="form.phone" type="tel" :placeholder="t('contactModal.phone')" @blur="touched.phone = true"
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
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useContactForm } from '@/composables/useContactForm'

const { t } = useI18n()
const {
  form,
  touched,
  errors,
  loading,
  submitted,
  sendError,
  turnstileContainer,
  submitForm,
} = useContactForm()
</script>

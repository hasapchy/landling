import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

export function useContactForm() {
  const { t } = useI18n()

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
    if (window.turnstile && turnstileContainer.value && widgetId === null) {
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

  function resetForm() {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    form.website = ''
    touched.name = false
    touched.phone = false
    touched.email = false
    touched.message = false
    sendError.value = false
    resetTurnstile()
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
      resetForm()
    } catch (err) {
      console.error('Ошибка отправки:', err)
      sendError.value = true
      resetTurnstile()
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    const tryRender = () => {
      if (window.turnstile) {
        renderTurnstile()
        return
      }
      window.setTimeout(tryRender, 200)
    }
    tryRender()
  })

  onBeforeUnmount(() => {
    if (window.turnstile && widgetId !== null) {
      window.turnstile.remove(widgetId)
      widgetId = null
    }
  })

  return {
    form,
    touched,
    errors,
    loading,
    submitted,
    sendError,
    turnstileContainer,
    submitForm,
  }
}

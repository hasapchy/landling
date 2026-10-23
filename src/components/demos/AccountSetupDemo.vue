<!-- Шаг 1 «Оставьте заявку»: посетитель открывает сайт, жмёт «Оставить заявку», заполняет форму и отправляет -->
<template>
  <div ref="stage" class="relative w-full overflow-hidden rounded-[12px] sm:rounded-[16px] bg-[#ffffff] select-none"
    style="aspect-ratio: 900 / 481; container-type: inline-size; container-name: demo-stage;">

    <!-- ===== мини-сайт ===== -->
    <div class="absolute inset-0 flex flex-col">
      <div class="flex items-center justify-between sd-bar">
        <img src="/images/logo.png" alt="" class="sd-logo" />
        <div class="flex items-center sd-nav">
          <i class="sd-skel" style="width:5.5cqw"></i>
          <i class="sd-skel" style="width:7cqw"></i>
          <i class="sd-skel" style="width:5cqw"></i>
        </div>
        <div ref="ctaBtn" class="sd-cta" :class="{ 'sd-cta--press': ctaPressed }">{{ t('nav.cta') }}</div>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center text-center sd-hero">
        <span class="sd-pill">{{ t('hero.badge') }}</span>
        <h3 class="sd-h1">{{ t('hero.headline') }}</h3>
        <i class="sd-skel" style="width:46cqw;height:1.1cqw"></i>
        <i class="sd-skel" style="width:38cqw;height:1.1cqw"></i>
        <div class="sd-hero-btn"></div>
      </div>
    </div>

    <!-- затемнение под окном -->
    <div class="absolute inset-0 bg-black/40 transition-opacity duration-500"
      :style="{ opacity: phase === 'site' ? 0 : 1 }"></div>

    <!-- ===== окно заявки ===== -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="sd-modal transition-[opacity,transform] duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
        :style="{ opacity: phase === 'site' ? 0 : 1, transform: phase === 'site' ? 'scale(.92) translateY(2cqw)' : 'scale(1) translateY(0)' }">

        <!-- форма -->
        <div v-if="phase !== 'success'" class="flex flex-col sd-gap">
          <h4 class="sd-title">{{ t('contactModal.title') }}</h4>
          <div ref="fName" class="sd-input"><span :class="{ 'sd-ph': !vals.name }">{{ vals.name || t('contactModal.name') }}</span></div>
          <div ref="fPhone" class="sd-input"><span :class="{ 'sd-ph': !vals.phone }">{{ vals.phone || t('contactModal.phone') }}</span></div>
          <div ref="fEmail" class="sd-input"><span :class="{ 'sd-ph': !vals.email }">{{ vals.email || t('contactModal.email') }}</span></div>
          <div ref="fMsg" class="sd-input sd-input--area"><span :class="{ 'sd-ph': !vals.msg }">{{ vals.msg || t('contactModal.messagePlaceholder') }}</span></div>
          <div ref="sendBtn" class="sd-send" :class="{ 'sd-send--press': sending }">{{ t('contactModal.submit') }}</div>
        </div>

        <!-- успех -->
        <div v-else class="flex flex-col items-center justify-center text-center sd-gap sd-success">
          <div class="sd-check">
            <svg viewBox="0 0 16 16" fill="none" style="width:55%;height:55%"><path d="M3.5 8.5l3 3 6-6.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <p class="sd-title">{{ t('contactModal.successTitle') }}</p>
          <p class="sd-sub">{{ t('contactModal.successText') }}</p>
        </div>
      </div>
    </div>

    <!-- курсор -->
    <div class="pointer-events-none absolute left-0 top-0 z-20 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.35,.1,.25,1)]"
      :style="{ transform: `translate(${cursorX}px, ${cursorY}px)`, opacity: cursorVisible ? 1 : 0 }">
      <svg width="16" height="16" viewBox="0 0 22 22">
        <path d="M2 1l16 8.5-7 1.5-3.5 7z" fill="#1E2532" stroke="#FFFFFF" stroke-width="1.4" stroke-linejoin="round" />
      </svg>
      <div ref="ring" class="sd-ring"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const stage = ref(null)
const ring = ref(null)
const ctaBtn = ref(null)
const fName = ref(null)
const fPhone = ref(null)
const fEmail = ref(null)
const fMsg = ref(null)
const sendBtn = ref(null)

const phase = ref('site') // 'site' | 'form' | 'success'
const cursorX = ref(0)
const cursorY = ref(0)
const cursorVisible = ref(false)
const ctaPressed = ref(false)
const sending = ref(false)
const vals = reactive({ name: '', phone: '', email: '', msg: '' })

// пример сообщения под язык сайта
const sampleMsg = computed(() => ({
  ru: 'Хотим подключить HasApp',
  en: "We'd like to try HasApp",
  tm: 'HasApp-y birikdirmek isleýäris',
}[locale.value] || 'HasApp'))

let alive = true
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function pointOf(el) {
  const s = stage.value.getBoundingClientRect()
  const b = el.getBoundingClientRect()
  return { x: b.left - s.left + b.width / 2, y: b.top - s.top + b.height / 2 }
}

async function moveTo(el, ms = 650) {
  if (!alive || !el || !stage.value) return
  const p = pointOf(el)
  cursorVisible.value = true
  cursorX.value = p.x
  cursorY.value = p.y
  await wait(ms)
}

async function tap() {
  if (!alive) return
  const r = ring.value
  if (r) {
    r.classList.remove('sd-tap')
    void r.offsetWidth
    r.classList.add('sd-tap')
  }
  await wait(260)
}

async function typeInto(key, text, perChar = 40) {
  for (const ch of text) {
    if (!alive) return
    vals[key] += ch
    await wait(perChar)
  }
  await wait(200)
}

function resetAll() {
  phase.value = 'site'
  vals.name = vals.phone = vals.email = vals.msg = ''
  ctaPressed.value = false
  sending.value = false
  cursorVisible.value = false
}

async function run() {
  while (alive) {
    resetAll()
    await wait(1000)
    if (!alive) return

    // сайт открыт, жмём «Оставить заявку»
    await moveTo(ctaBtn.value)
    ctaPressed.value = true
    await tap()
    phase.value = 'form'
    ctaPressed.value = false
    await wait(800)
    if (!alive) return

    // заполняем форму
    await moveTo(fName.value, 550)
    await tap()
    await typeInto('name', 'Alem Trading')
    if (!alive) return

    await moveTo(fPhone.value, 450)
    await tap()
    await typeInto('phone', '+993 65 00 00 00')
    if (!alive) return

    await moveTo(fEmail.value, 450)
    await tap()
    await typeInto('email', 'info@alemtrading.tm')
    if (!alive) return

    await moveTo(fMsg.value, 450)
    await tap()
    await typeInto('msg', sampleMsg.value, 35)
    if (!alive) return

    // отправка
    await moveTo(sendBtn.value, 550)
    sending.value = true
    await tap()
    await wait(300)
    cursorVisible.value = false
    phase.value = 'success'
    await wait(2300)
  }
}

onMounted(() => nextTick(() => run()))
onBeforeUnmount(() => { alive = false })
</script>

<style scoped>
.sd-bar { padding: 2.2cqw 3.5cqw; border-bottom: 1px solid #EEF1F6; }
.sd-logo { height: 3.4cqw; width: auto; }
.sd-nav { gap: 2.2cqw; }
.sd-skel { display: block; height: 1.2cqw; border-radius: 999px; background: #E7ECF4; }
.sd-cta {
  padding: 1.2cqw 2.6cqw; border-radius: 999px; color: #fff; font-weight: 700; white-space: nowrap;
  font-size: clamp(6px, 1.5cqw, 11px);
  background: linear-gradient(90deg, #102D65, #1B4BB1);
  transition: transform .2s, box-shadow .2s;
}
.sd-cta--press { transform: scale(.94); box-shadow: 0 0 0 .7cqw rgba(3, 146, 255, .25); }
.sd-hero { gap: 1.6cqw; padding: 0 8cqw; }
.sd-pill {
  padding: .7cqw 2cqw; border-radius: 999px; background: #EAF3FC; color: #054C86; font-weight: 600;
  font-size: clamp(5px, 1.3cqw, 10px);
}
.sd-h1 { font-weight: 800; color: #12161F; line-height: 1.12; font-size: clamp(9px, 4.1cqw, 30px); max-width: 78cqw; }
.sd-hero-btn { margin-top: 1cqw; width: 15cqw; height: 4.2cqw; border-radius: 999px; background: linear-gradient(90deg, #102D65, #1B4BB1); opacity: .9; }

.sd-modal {
  width: 44cqw; background: #fff; border-radius: 2.2cqw; padding: 2.4cqw 3cqw;
  box-shadow: 0 2cqw 6cqw rgba(5, 40, 90, .3);
}
.sd-gap { gap: 1.1cqw; }
.sd-title { font-weight: 800; color: #054C86; font-size: clamp(8px, 2.6cqw, 18px); line-height: 1.15; }
.sd-sub { color: rgba(0, 0, 0, .55); font-size: clamp(6px, 1.5cqw, 11px); }
.sd-input {
  height: 4.2cqw; border-radius: 1.1cqw; background: #F4F7FC; padding: 0 1.8cqw; display: flex; align-items: center;
  font-size: clamp(6px, 1.5cqw, 11px); color: #12161F; white-space: nowrap; overflow: hidden;
}
.sd-input--area { height: 7.2cqw; align-items: flex-start; padding-top: 1.5cqw; white-space: normal; }
.sd-ph { color: #A7B0BE; }
.sd-send {
  margin-top: .4cqw; height: 4.6cqw; border-radius: 999px; color: #fff; font-weight: 700;
  display: flex; align-items: center; justify-content: center; font-size: clamp(6px, 1.5cqw, 11px);
  background: linear-gradient(90deg, #102D65, #1B4BB1); transition: transform .2s;
}
.sd-send--press { transform: scale(.96); }
.sd-success { padding: 3cqw 0; }
.sd-check {
  width: 7cqw; height: 7cqw; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #0392FF, #054C86);
}

.sd-ring {
  position: absolute; left: -9px; top: -9px; width: 26px; height: 26px; border-radius: 50%;
  border: 2px solid #0392FF; opacity: 0; transform: scale(.4);
}
.sd-ring.sd-tap { animation: sdTap .38s ease-out; }
@keyframes sdTap {
  0% { opacity: .9; transform: scale(.4); }
  70% { opacity: .25; transform: scale(1.35); }
  100% { opacity: 0; transform: scale(1.6); }
}
</style>
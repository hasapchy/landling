<!-- Шаг 3 «Установка и запуск»: развёртывание на сервере → права доступа → обучение сотрудников → система запущена -->
<template>
  <div ref="stage" class="relative w-full overflow-hidden rounded-[12px] sm:rounded-[16px] select-none demo-install-bg"
    style="aspect-ratio: 900 / 481; container-type: inline-size; container-name: demo-stage;">

    <!-- карточка с тремя этапами -->
    <div class="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
      :style="{ opacity: phase === 'work' ? 1 : 0 }">
      <div class="demo-card">

        <!-- 1. сервер -->
        <div class="demo-row" :class="{ 'is-on': active >= 1, 'is-done': done[0] }">
          <div class="demo-row-ico">
            <svg viewBox="0 0 24 24" fill="none" class="demo-ico">
              <rect x="3" y="4" width="18" height="6.5" rx="1.6" stroke="currentColor" stroke-width="1.7" />
              <rect x="3" y="13.5" width="18" height="6.5" rx="1.6" stroke="currentColor" stroke-width="1.7" />
              <circle cx="7" cy="7.25" r="1" fill="currentColor" />
              <circle cx="7" cy="16.75" r="1" fill="currentColor" />
            </svg>
          </div>
          <div class="demo-row-body">
            <p class="demo-row-title">{{ L.t1 }}</p>
            <div class="demo-bar"><div class="demo-bar-fill" :style="{ width: pct + '%' }"></div></div>
          </div>
          <span class="demo-tick" :class="{ 'is-shown': done[0] }">
            <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </div>

        <!-- 2. права доступа -->
        <div class="demo-row" :class="{ 'is-on': active >= 2, 'is-done': done[1] }">
          <div class="demo-row-ico">
            <svg viewBox="0 0 24 24" fill="none" class="demo-ico">
              <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" stroke-width="1.7" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          </div>
          <div class="demo-row-body">
            <p class="demo-row-title">{{ L.t2 }}</p>
            <div class="demo-chips">
              <span v-for="(r, i) in L.roles" :key="r" class="demo-chip" :class="{ 'is-on': rolesOn[i] }">
                <svg viewBox="0 0 16 16" fill="none" class="demo-chip-check"><path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                {{ r }}
              </span>
            </div>
          </div>
          <span class="demo-tick" :class="{ 'is-shown': done[1] }">
            <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </div>

        <!-- 3. обучение -->
        <div class="demo-row" :class="{ 'is-on': active >= 3, 'is-done': done[2] }">
          <div class="demo-row-ico">
            <svg viewBox="0 0 24 24" fill="none" class="demo-ico">
              <circle cx="9" cy="8.5" r="3.2" stroke="currentColor" stroke-width="1.7" />
              <path d="M3 19c.6-3 3-4.8 6-4.8s5.4 1.8 6 4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
              <circle cx="17.5" cy="9.5" r="2.4" stroke="currentColor" stroke-width="1.7" />
              <path d="M17 14.4c2 .2 3.6 1.6 4 3.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          </div>
          <div class="demo-row-body">
            <p class="demo-row-title">{{ L.t3 }}</p>
            <div class="demo-staff">
              <span v-for="(s, i) in 5" :key="i" class="demo-ava" :class="{ 'is-on': staffOn[i] }" :style="{ '--h': i * 47 + 200 }">
                <svg viewBox="0 0 16 16" fill="none" class="demo-ava-check"><path d="M3.5 8.5l3 3 6-6.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
            </div>
          </div>
          <span class="demo-tick" :class="{ 'is-shown': done[2] }">
            <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-6.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </div>
      </div>
    </div>

    <!-- итог: система запущена -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center demo-gap transition-opacity duration-700"
      :style="{ opacity: phase === 'done' ? 1 : 0 }">
      <div class="demo-done-check" :class="{ 'demo-done-check--pop': phase === 'done' }">
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <h3 class="demo-done-title">{{ L.done }}</h3>
      <p class="demo-done-text">{{ L.doneText }}</p>
      <div class="demo-done-btn">
        {{ L.btn }}
        <svg viewBox="0 0 24 24" fill="none" class="demo-btn-arrow">
          <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['finished'])
const { t } = useI18n()

// тексты анимации берутся из locales (howItWorks.demo.step3) и меняются вместе с языком сайта
const L = computed(() => ({
  t1: t('howItWorks.demo.step3.t1'),
  t2: t('howItWorks.demo.step3.t2'),
  t3: t('howItWorks.demo.step3.t3'),
  done: t('howItWorks.demo.step3.done'),
  doneText: t('howItWorks.demo.step3.doneText'),
  btn: t('howItWorks.demo.step3.btn'),
  roles: [t('howItWorks.demo.step3.role1'), t('howItWorks.demo.step3.role2'), t('howItWorks.demo.step3.role3')],
}))


const phase = ref('work') // 'work' | 'done'
const active = ref(0) // сколько этапов уже начато
const pct = ref(0)
const done = reactive([false, false, false])
const rolesOn = reactive([false, false, false])
const staffOn = reactive([false, false, false, false, false])

let alive = true
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function resetAll() {
  phase.value = 'work'
  active.value = 0
  pct.value = 0
  done.fill(false)
  rolesOn.fill(false)
  staffOn.fill(false)
}

async function run() {
  resetAll()
  await nextTick()
  await wait(700)
  if (!alive) return

  // 1. сервер
  active.value = 1
  await wait(250)
  pct.value = 100
  await wait(1800)
  if (!alive) return
  done[0] = true
  await wait(400)
  if (!alive) return

  // 2. права доступа
  active.value = 2
  await wait(300)
  for (let i = 0; i < rolesOn.length; i++) {
    if (!alive) return
    rolesOn[i] = true
    await wait(520)
  }
  await wait(200)
  if (!alive) return
  done[1] = true
  await wait(400)
  if (!alive) return

  // 3. обучение
  active.value = 3
  await wait(300)
  for (let i = 0; i < staffOn.length; i++) {
    if (!alive) return
    staffOn[i] = true
    await wait(320)
  }
  await wait(200)
  if (!alive) return
  done[2] = true
  await wait(800)
  if (!alive) return

  // система запущена
  phase.value = 'done'
  await wait(2000)
  if (!alive) return

  emit('finished')
}

onMounted(() => nextTick(() => run()))
onBeforeUnmount(() => { alive = false })
</script>

<style scoped>
.demo-install-bg {
  background: linear-gradient(160deg, #4baeff 0%, #0A3F7A 100%);
}

.demo-gap { gap: clamp(3px, 1.4cqw, 9px); }

.demo-card {
  width: 66cqw;
  display: flex;
  flex-direction: column;
  gap: 1.6cqw;
  padding: 2.4cqw;
  background: #ffffff;
  border-radius: 2.2cqw;
  box-shadow: 0 2cqw 6cqw rgba(5, 40, 90, .35);
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 1.8cqw;
  padding: 1.6cqw 1.8cqw;
  border-radius: 1.4cqw;
  background: #F4F7FC;
  opacity: .4;
  transition: opacity .4s ease, background-color .4s ease;
}
.demo-row.is-on { opacity: 1; }
.demo-row.is-done { background: #EAF6EF; }

.demo-row-ico {
  width: 5.4cqw; height: 5.4cqw; flex: 0 0 auto;
  border-radius: 1.3cqw;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #0392FF, #054C86);
  color: #fff;
}
.demo-ico { width: 3.2cqw; height: 3.2cqw; }

.demo-row-body { text-align: left; flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1cqw; }
.demo-row-title { font-weight: 700; color: #12161F; font-size: clamp(6px, 1.75cqw, 12px); line-height: 1.2; }

.demo-bar { height: .9cqw; border-radius: 999px; background: #DCE5F2; overflow: hidden; }
.demo-bar-fill { height: 100%; width: 0; border-radius: 999px; background: linear-gradient(90deg, #0392FF, #054C86); transition: width 1.8s cubic-bezier(.4, 0, .2, 1); }

.demo-chips { display: flex; gap: 1cqw; flex-wrap: nowrap; }
.demo-chip {
  display: inline-flex; align-items: center; gap: .5cqw;
  padding: .6cqw 1.5cqw;
  border-radius: 999px;
  background: #E3EAF5; color: rgba(18, 22, 31, .55);
  font-weight: 700; white-space: nowrap;
  font-size: clamp(5px, 1.35cqw, 9px);
  transition: background-color .3s ease, color .3s ease;
}
.demo-chip.is-on { background: #054C86; color: #fff; }
.demo-chip-check { width: 0; height: 1.3cqw; opacity: 0; transition: width .3s ease, opacity .3s ease; }
.demo-chip.is-on .demo-chip-check { width: 1.3cqw; opacity: 1; }

.demo-staff { display: flex; gap: 1cqw; }
.demo-ava {
  width: 3.4cqw; height: 3.4cqw; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #D3DCEA;
  transition: background-color .3s ease, transform .3s ease;
}
.demo-ava-check { width: 0; height: 0; opacity: 0; transition: all .3s ease; }
.demo-ava.is-on { background: hsl(var(--h) 70% 52%); transform: scale(1.08); }
.demo-ava.is-on .demo-ava-check { width: 2cqw; height: 2cqw; opacity: 1; }

.demo-tick {
  width: 3.6cqw; height: 3.6cqw; flex: 0 0 auto; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #22B86A, #0F6F3E);
  transform: scale(0);
  transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
}
.demo-tick svg { width: 62%; height: 62%; }
.demo-tick.is-shown { transform: scale(1); }

.demo-done-check {
  width: clamp(26px, 9cqw, 54px); height: clamp(26px, 9cqw, 54px);
  border-radius: 50%;
  background: linear-gradient(135deg, #22B86A, #0F6F3E);
  color: #fff; padding: clamp(6px, 2cqw, 12px);
  box-shadow: 0 6px 18px rgba(15, 111, 62, .35);
  transform: scale(0);
}
.demo-done-check--pop { animation: demoPop .5s cubic-bezier(.34, 1.56, .64, 1) forwards; }
@keyframes demoPop { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }

.demo-done-title { font-weight: 800; color: #fff; font-size: clamp(9px, 3.1cqw, 17px); line-height: 1.15; }
.demo-done-text { color: rgba(255, 255, 255, .8); font-size: clamp(6px, 1.5cqw, 10px); }
.demo-done-btn {
  white-space: nowrap;
  height: clamp(13px, 4.8cqw, 30px);
  border-radius: 999px;
  background: #fff; color: #054C86;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; letter-spacing: .04em;
  font-size: clamp(6px, 1.4cqw, 9.5px);
  padding: 0 clamp(8px, 2.5cqw, 16px);
  box-shadow: 0 6px 16px rgba(5, 40, 90, .3);
}
.demo-btn-arrow { width: clamp(7px, 2cqw, 12px); height: clamp(7px, 2cqw, 12px); margin-left: clamp(3px, 1cqw, 6px); flex-shrink: 0; }
</style>
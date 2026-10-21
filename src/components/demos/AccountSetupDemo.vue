<template>
  <div ref="stage" class="demo-no-dark relative w-full overflow-hidden rounded-[12px] sm:rounded-[16px] bg-white select-none"
    style="aspect-ratio: 900 / 481; container-type: inline-size; container-name: demo-stage;">

    <!-- логотип объявлен один раз, дальше переиспользуется через <use> -->
    <svg width="0" height="0" style="position:absolute">
      <symbol id="hasapp-mark-step1" viewBox="0 0 2623 687">
        <path d="M349.664 15.5L309.205 17.6435C285.933 18.8765 262.901 22.9714 240.631 29.8357C214.457 37.9027 189.59 49.7161 166.802 64.9083L164.536 66.4188C144.031 80.0884 125.274 96.2123 108.681 114.432L104.917 118.565C90.1151 134.818 76.886 152.438 65.4072 171.186L64.8294 172.13C46.8129 201.557 33.1238 233.423 24.1827 266.749L21.1641 278C14.219 313.717 13.6566 350.383 19.503 386.297L21.1641 396.5L27.1202 419.783C34.1381 447.217 43.349 474.042 54.6641 500L69.689 524.416C78.3256 538.45 88.0562 551.781 98.7903 564.284L99.4368 565.037C118.49 587.231 140.624 606.582 165.164 622.5C189.114 636.138 214.263 647.551 240.297 656.597L260.164 663.5C286.097 668.82 312.503 671.5 338.976 671.5H349.664" stroke="currentColor" stroke-width="31" stroke-linecap="round" fill="none" />
        <path d="M353.164 100H324.943C305.505 100 286.176 102.911 267.6 108.635C249.643 114.168 232.582 122.271 216.947 132.693L212.878 135.404C197.401 145.72 183.243 157.888 170.718 171.638L167.88 174.754C156.707 187.019 146.721 200.316 138.056 214.465L137.622 215.173C124.023 237.38 113.691 261.428 106.942 286.577L104.664 295.064L104.191 298.446C100.194 326.998 100.353 355.978 104.664 384.485L109.159 402.053C114.456 422.755 121.409 442.998 129.949 462.586L141.288 481.008C147.808 491.6 155.153 501.66 163.255 511.096L163.741 511.662C178.123 528.41 194.829 543.013 213.351 555.025C231.428 565.316 250.41 573.928 270.059 580.754L285.055 585.963C304.628 589.977 324.558 592 344.54 592H347.164" stroke="currentColor" stroke-width="31" stroke-linecap="round" fill="none" />
        <path d="M111.148 344.512H252.68" stroke="currentColor" stroke-width="31" stroke-linecap="round" fill="none" />
        <path d="M336.664 438V310" stroke="currentColor" stroke-width="31" stroke-linecap="round" fill="none" />
        <path d="M514.164 438.003V271" stroke="currentColor" stroke-width="31" stroke-linecap="round" fill="none" />
        <path d="M427.664 438V201" stroke="currentColor" stroke-width="31" stroke-linecap="round" fill="none" />
        <path d="M413.164 631C444.111 619.02 474.019 604.511 502.583 587.618L506.164 585.5L543.164 556.5L559.294 540.101C568.525 530.716 576.973 520.592 584.552 509.829L585.4 508.626C593.889 496.571 601.18 483.715 607.168 470.242L607.45 469.606C611.92 459.55 615.618 449.169 618.513 438.552C623.591 419.934 626.164 400.722 626.164 381.423V354" stroke="currentColor" stroke-width="31" stroke-linecap="round" fill="none" />
        <path d="M2317.57 468.384C2320.14 460.216 2321.43 451.067 2321.43 440.934V361.078C2321.43 355.482 2320.74 349.583 2319.38 343.382C2318.17 337.182 2316.2 331.056 2313.49 325.006C2310.76 318.806 2307.21 312.907 2302.82 307.312C2298.59 301.716 2293.37 296.8 2287.18 292.565C2281.12 288.331 2274.09 284.928 2266.07 282.357C2258.06 279.786 2248.99 278.5 2238.85 278.5H2132.46C2127.02 278.5 2121.12 279.181 2114.77 280.542C2108.57 281.752 2102.37 283.718 2096.17 286.44C2090.12 289.162 2084.3 292.717 2078.71 297.103C2073.1 301.337 2068.11 306.555 2063.72 312.756C2059.5 318.806 2056.09 325.838 2053.52 333.855C2050.95 341.87 2049.66 350.945 2049.66 361.078V628.418H2108.65V361.078C2108.65 353.365 2110.69 347.541 2114.77 343.609C2118.85 339.526 2124.91 337.485 2132.92 337.485H2238.85C2246.57 337.485 2252.38 339.45 2256.31 343.382C2260.41 347.315 2262.45 353.365 2262.45 361.531V440.934C2262.45 448.646 2260.48 454.545 2256.55 458.628C2252.61 462.711 2246.72 464.754 2238.85 464.754H2108.68V523.738H2238.85C2244.44 523.738 2250.34 523.133 2256.55 521.923C2262.74 520.562 2268.87 518.52 2274.92 515.798C2281.12 513.075 2287.02 509.597 2292.62 505.362C2298.21 500.976 2303.13 495.758 2307.36 489.708C2311.6 483.507 2315 476.399 2317.57 468.384Z" fill="currentColor" />
        <path d="M2618.57 468.384C2621.14 460.216 2622.43 451.067 2622.43 440.934V361.078C2622.43 355.482 2621.74 349.583 2620.38 343.382C2619.17 337.182 2617.2 331.056 2614.49 325.006C2611.76 318.806 2608.21 312.907 2603.82 307.312C2599.59 301.716 2594.37 296.8 2588.18 292.565C2582.12 288.331 2575.09 284.928 2567.07 282.357C2559.06 279.786 2549.99 278.5 2539.85 278.5H2433.46C2428.02 278.5 2422.12 279.181 2415.77 280.542C2409.57 281.752 2403.37 283.718 2397.17 286.44C2391.12 289.162 2385.3 292.717 2379.71 297.103C2374.1 301.337 2369.11 306.555 2364.72 312.756C2360.5 318.806 2357.09 325.838 2354.52 333.855C2351.95 341.87 2350.66 350.945 2350.66 361.078V628.418H2409.65V361.078C2409.65 353.365 2411.69 347.541 2415.77 343.609C2419.85 339.526 2425.91 337.485 2433.92 337.485H2539.85C2547.57 337.485 2553.38 339.45 2557.31 343.382C2561.41 347.315 2563.45 353.365 2563.45 361.531V440.934C2563.45 448.646 2561.48 454.545 2557.55 458.628C2553.61 462.711 2547.72 464.754 2539.85 464.754H2409.68V523.738H2539.85C2545.44 523.738 2551.34 523.133 2557.55 521.923C2563.74 520.562 2569.87 518.52 2575.92 515.798C2582.12 513.075 2588.02 509.597 2593.62 505.362C2599.21 500.976 2604.13 495.758 2608.36 489.708C2612.6 483.507 2616 476.399 2618.57 468.384Z" fill="currentColor" />
        <path d="M1685.82 468.911C1688.38 460.118 1689.66 450.269 1689.66 439.361C1689.66 430.405 1688.16 425.718 1685.14 415.298C1682.27 404.879 1677.59 396.272 1671.1 387.481C1664.61 378.526 1656.08 371.117 1645.51 365.257C1634.94 359.396 1622.11 356.465 1607.02 356.465H1515.76H1511.46C1510.1 356.302 1508.82 355.894 1507.61 355.243C1506.56 354.592 1505.65 353.534 1504.9 352.069C1504.14 350.603 1503.69 319.568 1503.54 316.964C1503.54 315.661 1503.61 314.359 1503.76 313.055C1503.91 311.591 1504.37 310.289 1505.12 309.148C1506.03 307.846 1507.31 306.87 1508.97 306.217C1510.78 305.403 1513.2 304.997 1516.22 304.997L1653.53 303.572C1657.37 303.532 1660.45 300.41 1660.45 296.572V265.5C1660.45 261.634 1657.32 258.5 1653.46 258.5H1515.76C1508.52 258.5 1500.74 259.884 1492.44 262.652C1484.14 265.257 1476.44 269.571 1469.35 275.595C1462.25 281.619 1456.36 289.516 1451.68 299.284C1447 308.89 1444.66 320.776 1444.66 334.94C1444.66 342.267 1445.87 350.164 1448.29 358.629C1450.85 367.096 1454.93 374.992 1460.51 382.319C1466.25 389.646 1473.65 395.751 1482.71 400.635C1491.76 405.52 1502.78 407.961 1515.76 407.961H1619.02C1634.11 407.961 1630.04 433.428 1630.79 450.361C1630.79 458.663 1628.75 465.013 1624.68 469.409C1620.6 473.805 1614.56 476.004 1606.56 476.004L1454.61 476C1450.74 476 1447.61 479.134 1447.61 483V515.5C1447.61 519.366 1450.74 522.5 1454.61 522.5H1607.02C1612.6 522.5 1618.49 521.849 1624.68 520.546C1631.02 519.081 1638.13 518.431 1644.16 515.5C1650.35 512.569 1658.08 509.558 1663.66 505C1669.25 500.278 1673.94 494.013 1678.16 487.5C1682.39 480.825 1683.25 477.539 1685.82 468.911Z" fill="currentColor" />
        <path d="M1032.16 310.591H872.164V164.5H814.664V522H872.164V375.909H1032.16V522H1088.66V164.5H1032.16V310.591Z" fill="currentColor" />
        <path d="M1412.07 462.251C1415 451.838 1416.47 442.17 1416.47 433.245V342.755C1416.47 326.558 1413.69 312.839 1408.12 301.601C1402.56 290.196 1395.6 281.023 1387.25 274.081C1382.5 269.959 1377.49 266.504 1372.21 263.716C1364.66 259.724 1356 258.71 1347.46 258.71C1343.46 258.71 1339.29 258.71 1336.16 258.71H1152.66V301.601H1331.1C1339.23 301.601 1347.02 308.267 1349.64 315.957C1350.44 318.308 1351.77 328.979 1351.77 331.462C1351.77 335.053 1351.77 339.192 1351.77 342.755L1353.16 431.5C1353.16 439.433 1354.65 447.212 1350.16 452.5C1345.68 457.79 1341.64 460.516 1333.45 460.516H1225.15C1218.04 460.516 1211.85 458.202 1206.6 453.574C1201.5 448.781 1198.95 442.17 1198.95 433.741C1198.95 430.775 1199.74 426.148 1200.75 421.518C1202.86 411.734 1210.37 404.148 1219.89 401.057C1223.07 400.026 1226.39 399.52 1229.73 399.558L1355.66 401V353.167H1208.66L1197.03 354.231C1187.94 355.063 1179.1 358.075 1172.04 363.868C1167.69 367.437 1163.07 371.654 1160.22 375.48C1153.72 384.239 1149.01 393.826 1146.07 404.239C1143.13 414.651 1141.66 424.32 1141.66 433.245C1141.66 449.442 1144.45 463.243 1150.01 474.647C1155.58 485.886 1162.46 495.059 1170.65 502.166C1179 509.108 1187.97 514.149 1197.55 517.289C1207.29 520.43 1216.34 522 1224.69 522H1333.45C1348.6 522 1361.43 519.025 1371.95 513.074C1382.62 507.125 1391.2 499.77 1397.69 491.011C1404.34 482.085 1409.13 472.498 1412.07 462.251Z" fill="currentColor" />
        <path d="M1972.16 523.889L1942.7 452.705C1941.77 450.462 1939.58 449 1937.15 449H1797.85C1795.34 449 1793.09 450.57 1792.22 452.932L1764.66 528H1703.66L1828.32 188.239C1833.51 174.089 1845.61 163.602 1860.36 160.474L1860.71 160.4C1866.61 159.148 1872.71 159.177 1878.6 160.486C1892.66 163.609 1904.15 173.689 1909.07 187.218L2031.66 523.889H1972.16ZM1920.43 403.821C1921.78 403.821 1922.75 402.505 1922.34 401.215L1884.16 281L1876.1 253.973C1874.95 250.132 1871.42 247.5 1867.41 247.5C1863.41 247.5 1859.88 250.126 1858.73 253.961L1851.66 277.5L1812.98 401.224C1812.57 402.512 1813.54 403.821 1814.88 403.821H1920.43Z" fill="currentColor" />
      </symbol>
    </svg>

    <!-- форма заявки, как на реальном сайте (имя / телефон / email / сообщение) -->
    <div class="absolute inset-0 flex items-center justify-center transition-[filter,transform] duration-700 ease-[cubic-bezier(.4,0,.2,1)]"
      :style="{ filter: `blur(${blurPx}px)`, transform: `scale(${zoomScale})`, transformOrigin: '50% 45%', opacity: phase === 'success' ? 0 : 1 }">

      <div class="w-full h-full bg-white flex flex-col justify-center demo-gap px-[9%]">
        <svg class="demo-logo-svg"><use href="#hasapp-mark-step1" /></svg>
        <h3 class="demo-h1">Оставить заявку</h3>
        <p class="demo-sub">Расскажите немного о своём бизнесе</p>

        <div ref="fName" class="demo-input">
          <span :class="{ 'demo-placeholder': !form.name }">{{ form.name || 'Ваше имя' }}</span>
        </div>
        <div ref="fPhone" class="demo-input">
          <span :class="{ 'demo-placeholder': !form.phone }">{{ form.phone || 'Ваш телефон' }}</span>
        </div>
        <div ref="fEmail" class="demo-input">
          <span :class="{ 'demo-placeholder': !form.email }">{{ form.email || 'Ваш email' }}</span>
        </div>
        <div ref="fMessage" class="demo-input demo-input--area">
          <span :class="{ 'demo-placeholder': !form.message }">{{ form.message || 'Напишите, если хотите что-то уточнить...' }}</span>
        </div>
        <div ref="submitBtn" class="demo-btn-solid">ОТПРАВИТЬ ЗАЯВКУ</div>
      </div>
    </div>

    <!-- экран успешной отправки -->
    <div class="absolute inset-0 flex flex-col items-center justify-center demo-gap text-center transition-opacity duration-700"
      :style="{ opacity: phase === 'success' ? 1 : 0 }">
      <div class="demo-check">
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <h3 class="demo-h1">Заявка отправлена!</h3>
      <p class="demo-sub">Мы свяжемся с вами в ближайшее время</p>
    </div>

    <!-- курсор -->
    <div class="pointer-events-none absolute left-0 top-0 z-20 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.35,.1,.25,1)]"
      :style="{ transform: `translate(${cursorX}px, ${cursorY}px)`, opacity: cursorVisible ? 1 : 0 }">
      <svg width="16" height="16" viewBox="0 0 22 22">
        <path d="M2 1l16 8.5-7 1.5-3.5 7z" fill="#1E2532" stroke="#FFFFFF" stroke-width="1.4" stroke-linejoin="round" />
      </svg>
      <div ref="ring" class="demo-ring"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'

const emit = defineEmits(['finished'])

const stage = ref(null)
const ring = ref(null)

const fName = ref(null)
const fPhone = ref(null)
const fEmail = ref(null)
const fMessage = ref(null)
const submitBtn = ref(null)

const phase = ref('form') // 'form' | 'success'
const cursorX = ref(0)
const cursorY = ref(0)
const cursorVisible = ref(false)
const zoomScale = ref(1)
const blurPx = ref(0)

const form = reactive({ name: '', phone: '', email: '', message: '' })

let alive = true

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function pointOf(el) {
  const stageBox = stage.value.getBoundingClientRect()
  const box = el.getBoundingClientRect()
  const k = stageBox.width / stage.value.offsetWidth || 1 // сцена может быть масштабирована родителем
  return {
    x: (box.left - stageBox.left + box.width / 2) / k,
    y: (box.top - stageBox.top + box.height / 2) / k,
  }
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
    r.classList.remove('demo-tap')
    void r.offsetWidth
    r.classList.add('demo-tap')
  }
  await wait(260)
}

async function typeInto(obj, key, text, perChar = 45) {
  for (const ch of text) {
    if (!alive) return
    obj[key] += ch
    await wait(perChar)
  }
  await wait(200)
}

function resetAll() {
  phase.value = 'form'
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
  zoomScale.value = 1
  blurPx.value = 0
  cursorVisible.value = false
}

async function run() {
  while (alive) {
    resetAll()
    await wait(900)
    if (!alive) return

    // зум к полям формы
    zoomScale.value = 1.16
    await wait(500)
    if (!alive) return

    // заполнение формы
    await moveTo(fName.value, 500)
    await tap()
    await typeInto(form, 'name', 'Мердан Оразов')
    if (!alive) return

    await moveTo(fPhone.value, 500)
    await tap()
    await typeInto(form, 'phone', '+993 65 00 00 00')
    if (!alive) return

    await moveTo(fEmail.value, 500)
    await tap()
    await typeInto(form, 'email', 'info@alemtrading.tm')
    if (!alive) return

    await moveTo(fMessage.value, 500)
    await tap()
    await typeInto(form, 'message', 'Хочу подключить CRM для магазина')
    if (!alive) return

    await moveTo(submitBtn.value, 500)
    await tap()
    if (!alive) return

    // блюр + переход на экран успеха
    cursorVisible.value = false
    zoomScale.value = 1.3
    blurPx.value = 14
    await wait(450)
    if (!alive) return

    phase.value = 'success'
    await wait(1900)
    if (!alive) return

    emit('finished')
    return
  }
}

onMounted(() => {
  nextTick(() => run())
})

onBeforeUnmount(() => {
  alive = false
})
</script>

<style scoped>
.demo-gap {
  gap: clamp(2px, 1.4cqw, 9px);
}

.demo-logo-svg {
  width: clamp(24px, 8cqw, 46px);
  height: calc(clamp(24px, 8cqw, 46px) * 687 / 2623);
  color: #0F6FBF;
  flex-shrink: 0;
}

.demo-logo-svg--big {
  width: clamp(56px, 18cqw, 110px);
  height: calc(clamp(56px, 18cqw, 110px) * 687 / 2623);
}

.demo-h1 {
  font-weight: 800;
  font-size: clamp(9px, 3.1cqw, 17px);
  color: #12161F;
  line-height: 1.15;
}

.demo-h1--white {
  color: #fff;
}

.demo-sub {
  font-size: clamp(6px, 1.5cqw, 10px);
  color: rgba(0, 0, 0, .4);
  line-height: 1.25;
}

.demo-sub--white {
  color: rgba(255, 255, 255, .7);
}

.demo-blue {
  background: linear-gradient(160deg, #0F6FBF 0%, #0A3F7A 100%);
}

.demo-input {
  height: clamp(13px, 4.6cqw, 28px);
  border: 1px solid #E1E7F0;
  border-radius: 5px;
  padding: 0 clamp(4px, 1.5cqw, 9px);
  display: flex;
  align-items: center;
  font-size: clamp(6px, 1.5cqw, 10px);
  color: #12161F;
  background: #fff;
}

.demo-input--area {
  height: clamp(20px, 7cqw, 42px);
  align-items: flex-start;
  padding-top: clamp(3px, 1cqw, 6px);
}

.demo-placeholder {
  color: #A7B0BE;
}

.demo-eye {
  font-size: clamp(6px, 1.5cqw, 9.5px);
  opacity: .45;
  transition: opacity .2s;
}

.demo-eye--on {
  opacity: .85;
}

.demo-btn-solid {
  height: clamp(13px, 4.8cqw, 30px);
  border-radius: 999px;
  background: linear-gradient(90deg, #102D65, #1B4BB1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: .04em;
  font-size: clamp(6px, 1.4cqw, 9.5px);
}

.demo-btn-outline {
  border: 1px solid rgba(255, 255, 255, .7);
  border-radius: 999px;
  color: #fff;
  padding: clamp(3px, 1.2cqw, 8px) clamp(7px, 2.2cqw, 16px);
  font-weight: 700;
  letter-spacing: .04em;
  font-size: clamp(6px, 1.4cqw, 9.5px);
  white-space: nowrap;
}

.demo-check {
  width: clamp(26px, 9cqw, 54px);
  height: clamp(26px, 9cqw, 54px);
  border-radius: 50%;
  background: linear-gradient(135deg, #1B9E5A, #0F6F3E);
  color: #fff;
  padding: clamp(6px, 2cqw, 12px);
  box-shadow: 0 6px 18px rgba(15, 111, 62, 0.3);
}

.demo-ring {
  position: absolute;
  left: -9px;
  top: -9px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #0392FF;
  opacity: 0;
  transform: scale(.4);
}

.demo-ring.demo-tap {
  animation: demoTap .38s ease-out;
}

@keyframes demoTap {
  0% {
    opacity: .9;
    transform: scale(.4);
  }

  70% {
    opacity: .25;
    transform: scale(1.35);
  }

  100% {
    opacity: 0;
    transform: scale(1.6);
  }
}
</style>

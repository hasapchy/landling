// src/composables/useScrollReveal.js
//
// Общая логика "появление заголовка + карточек при скролле" —
// используется во всех секциях с анимацией (HowItWorks, Pricing, Features, FAQ и т.д.)
//
// Использование в компоненте:
//
//   import { useScrollReveal } from '@/composables/useScrollReveal'
//   const { headingRef, headingVisible, setItemRef, visibleItems } = useScrollReveal()
//
//   <div ref="headingRef" :class="headingVisible ? '...' : '...'">
//   <div v-for="(x, index) in items" :ref="el => setItemRef(el, index)" :class="visibleItems.has(index) ? '...' : '...'">
//
// Ключ во втором аргументе setItemRef может быть чем угодно — индексом массива
// (0, 1, 2…) или произвольным id (как в FAQ, где карточки разложены по двум
// колонкам и нумеруются через item.id, а не порядковый индекс).
//
// Чинит два бага:
// 1) При переходе по ссылке из шапки (резкий прыжок к якорю, а не
//    плавный постепенный скролл) IntersectionObserver с threshold: 0.2 иногда
//    не успевает поймать момент пересечения 20% — элемент так и остаётся
//    невидимым (opacity-0) навсегда. Фикс: threshold: 0 (ловит любое пересечение)
//    + ручная проверка через requestAnimationFrame сразу после mount — на случай,
//    если элемент уже оказался в видимой области ДО первого срабатывания observer'а.
// 2) Если элементы списка (карточки) появляются в DOM ПОЗЖЕ, чем сработал
//    onMounted (например, из-за асинхронной подгрузки переводов/данных),
//    observer на момент onMounted ещё не видит эти элементы и никогда их не
//    подписывает — они остаются невидимыми навсегда. Фикс: setItemRef сам
//    подписывает элемент на уже существующий observer, если тот появился
//    в DOM уже после создания observer'а.

import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollReveal() {
  const headingRef = ref(null)
  const headingVisible = ref(false)

  const itemRefs = new Map()
  const visibleItems = ref(new Set())

  let observer

  function setItemRef(el, key) {
    if (!el) return
    itemRefs.set(key, el)

    // если observer уже создан (элемент появился ПОСЛЕ onMounted —
    // например, список подгрузился чуть позже из-за асинхронных переводов),
    // подписываем его сразу, а не ждём следующего onMounted
    if (observer && !visibleItems.value.has(key)) {
      observer.observe(el)
    }
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0
  }

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        if (entry.target === headingRef.value) {
          headingVisible.value = true
          observer.unobserve(entry.target)
        } else {
          for (const [key, el] of itemRefs.entries()) {
            if (el === entry.target) {
              visibleItems.value = new Set(visibleItems.value).add(key)
              observer.unobserve(entry.target)
              break
            }
          }
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' })

    if (headingRef.value) observer.observe(headingRef.value)
    itemRefs.forEach((el) => el && observer.observe(el))

    // подстраховка для резкого прыжка по якорю из шапки —
    // проверяем видимость вручную сразу после подписки на observer
    requestAnimationFrame(() => {
      if (headingRef.value && !headingVisible.value && isInViewport(headingRef.value)) {
        headingVisible.value = true
        observer.unobserve(headingRef.value)
      }

      itemRefs.forEach((el, key) => {
        if (!el || visibleItems.value.has(key)) return
        if (isInViewport(el)) {
          visibleItems.value = new Set(visibleItems.value).add(key)
          observer.unobserve(el)
        }
      })
    })
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })

  return { headingRef, headingVisible, setItemRef, visibleItems }
}
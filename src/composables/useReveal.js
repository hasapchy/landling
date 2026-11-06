// Директива v-reveal: элемент плавно появляется, когда доходит до экрана.
//   v-reveal        — снизу вверх
//   v-reveal:left   — слева
//   v-reveal:right  — справа   (или v-reveal="'right'" — когда сторона вычисляется)
// Стили — классы Tailwind (подставляются здесь, в браузере). Когда блок появился, на нём остаётся
// класс .is-in — по нему анимируются вложенные элементы (group-[.is-in]:...).
// В пререндере и без JS блок просто виден, потому что скрывающие классы ставятся только в браузере.
const HIDE = {
  up: 'opacity-0 translate-y-[26px]',
  left: 'opacity-0 -translate-x-[34px]',
  right: 'opacity-0 translate-x-[34px]',
}
const MOTION = 'transition-[opacity,translate] duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)]'

export const vReveal = {
  mounted(el, binding) {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') { el.classList.add('is-in'); return }
    const hide = (HIDE[binding.arg || binding.value] || HIDE.up).split(' ')
    const motion = MOTION.split(' ')
    el.classList.add(...hide, ...motion)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      el.classList.remove(...hide)
      el.classList.add('is-in')
      io.disconnect()
      // когда появление закончилось, убираем переходы, чтобы они не мешали hover-эффектам
      const delay = parseFloat(el.style.transitionDelay) || 0
      setTimeout(() => el.classList.remove(...motion), 800 + delay + 150)
    }, { threshold: 0.18 })
    io.observe(el)
  },
}
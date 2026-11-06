// Общие наборы классов Tailwind для страниц /sklad и /crm (чтобы не повторять длинные строки).
// Ключевые кадры анимаций лежат в src/assets/seo-keyframes.css.
import '@/assets/seo-keyframes.css'

export const H2 = 'font-display font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-[#054C86] dark:text-[#6cb6f2]'
export const GRAD = 'bg-[linear-gradient(135deg,#0392FF,#054C86)]'

// плавное появление блоков первого экрана
export const RISE = 'opacity-0 translate-y-[18px] [animation:seo-rise_.8s_cubic-bezier(.2,.7,.2,1)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0'

// мягкие светящиеся пятна на фоне первого экрана
const GLOW = 'absolute z-0 rounded-full blur-[80px] opacity-50 pointer-events-none [animation:seo-float_14s_ease-in-out_infinite] motion-reduce:animate-none'
export const GLOW_A = GLOW + ' w-[420px] h-[420px] -left-[120px] top-20 bg-[rgba(3,146,255,.28)]'
export const GLOW_B = GLOW + ' w-[380px] h-[380px] -right-[100px] top-[360px] bg-[rgba(5,76,134,.28)]'

// окно-сцена («живой» пример)
export const WINDOW = 'overflow-hidden rounded-3xl border border-[#0392FF]/45 bg-[rgba(255,255,255,.72)] backdrop-blur-[6px] shadow-[0_30px_80px_rgba(5,76,134,.22),inset_0_0_0_1px_rgba(255,255,255,.5)] dark:bg-[rgba(10,22,48,.72)] dark:shadow-[0_30px_80px_rgba(0,60,200,.25)]'
export const WINDOW_BAR = 'flex items-center gap-[7px] border-b border-[#0392FF]/20 px-4 py-3 text-[13px]'
export const WINDOW_TITLE = 'ml-2 font-semibold text-[#054C86] dark:text-[#6cb6f2]'
export const WINDOW_ONLINE = 'ml-auto inline-flex items-center gap-1.5 not-italic text-green-600'
export const WINDOW_DOT = 'h-[7px] w-[7px] rounded-full bg-green-500 [animation:seo-pulse_1.8s_ease-in-out_infinite] motion-reduce:animate-none'
export const SMALL_HEAD = 'mb-3 text-[11px] font-bold uppercase tracking-[.08em] text-[#054C86]/60 dark:text-[#6cb6f2]/70'
export const NOTE = 'mt-3 text-center text-xs text-black/40 dark:text-white/40'

// цветные «бейджи» количества: приход / возврат / списание
const CHIP_BASE = 'inline-flex min-w-11 justify-center rounded-full px-2 py-0.5 text-xs font-bold tabular-nums '
export const CHIP = {
  in: CHIP_BASE + 'bg-[rgba(34,197,94,.15)] text-green-600',
  ret: CHIP_BASE + 'bg-[rgba(3,146,255,.15)] text-[#0b7fe0]',
  out: CHIP_BASE + 'bg-[rgba(245,158,11,.17)] text-amber-600',
}
export const DOT = { in: 'bg-green-500', ret: 'bg-[#0392FF]', out: 'bg-amber-500' }

// блок-призыв внизу страницы
export const CTA = "relative overflow-hidden rounded-[28px] border border-[#5aaeff]/60 px-6 py-12 text-white sm:py-16 bg-[linear-gradient(135deg,#2a76d6_0%,#0d4a9e_100%)] bg-[length:160%_160%] [animation:seo-grad_9s_ease-in-out_infinite] dark:bg-[linear-gradient(135deg,#0e3278_0%,#051230_100%)] before:absolute before:-right-20 before:-top-[140px] before:h-[360px] before:w-[360px] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,.28),transparent_65%)] before:content-[''] before:[animation:seo-float_10s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:before:animate-none"
export const CTA_MAIN = 'btn-primary !px-7 !py-3 text-center no-underline'
export const CTA_GHOST = 'cursor-pointer rounded-full border-[1.5px] border-white/30 bg-[rgba(3,146,255,.1)] px-7 py-3 text-center font-semibold text-white transition-all duration-300 hover:border-[#5db8ff] hover:text-[#5db8ff]'

// второстепенная кнопка «Оставить заявку» — такая же, как кнопки App Store / Google Play в футере
export const BTN_GHOST = 'cursor-pointer rounded-full border-[1.5px] border-[#054C86]/35 bg-[rgba(255,255,255,.6)] px-6 py-3 text-center font-semibold text-[#054C86] transition-all duration-300 hover:border-[#0392FF] hover:text-[#0392FF] sm:px-8 sm:py-3.5 dark:border-white/30 dark:bg-[rgba(3,146,255,.1)] dark:text-white dark:hover:border-[#5db8ff] dark:hover:text-[#5db8ff]'

// карточка со стеклянным градиентом (почему / плитки)
export const CARD = 'rounded-3xl border border-[#0392FF]/30 bg-[linear-gradient(150deg,rgba(255,255,255,.85),rgba(3,146,255,.07))] dark:border-[rgba(60,140,255,.4)] dark:bg-[linear-gradient(150deg,rgba(255,255,255,.05),rgba(3,146,255,.08))]'

// «картинка» рядом с текстом (рамка с лёгким градиентом); group — чтобы дети реагировали на .is-in
export const VISUAL = 'group rounded-[26px] border border-[#0392FF]/40 bg-[linear-gradient(135deg,rgba(3,146,255,.1),rgba(5,76,134,.08))] p-[18px]'

// элементы, которые выезжают, когда родитель с классом group получил .is-in
export const SLIDE_X = 'opacity-0 translate-x-5 group-[.is-in]:[animation:seo-slide_.6s_cubic-bezier(.2,.7,.2,1)_var(--d)_forwards] motion-reduce:opacity-100 motion-reduce:translate-x-0'
export const SLIDE_Y = 'opacity-0 translate-y-3 group-[.is-in]:[animation:seo-slide_.6s_cubic-bezier(.2,.7,.2,1)_var(--d)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0'
export const SLIDE_L7 = 'opacity-0 -translate-x-4 group-[.is-in]:[animation:seo-slide_.7s_cubic-bezier(.2,.7,.2,1)_var(--d)_forwards] motion-reduce:opacity-100 motion-reduce:translate-x-0'
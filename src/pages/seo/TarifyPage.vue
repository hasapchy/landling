<template>
  <main class="overflow-x-clip">
    <!-- ===== первый экран: подбор тарифа ползунком ===== -->
    <section class="relative text-center pt-[96px] sm:pt-28 md:pt-32 px-4 sm:px-6 pb-10 sm:pb-16 w-full max-w-[1440px] mx-auto">
      <div :class="GLOW_A" aria-hidden="true"></div>
      <div :class="GLOW_B" style="animation-delay:-6s" aria-hidden="true"></div>

      <div class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
        <LabelBadge :class="RISE" style="animation-delay:0ms">
          <template #icon>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 9.5V2.8h6.7L16 10.1l-5.9 5.9z" /><circle cx="5.6" cy="6.2" r="1.1" />
            </svg>
          </template>
          {{ page.badge }}
        </LabelBadge>
        <h1 :class="RISE" class="max-w-[95%] md:max-w-4xl font-display font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]" style="animation-delay:80ms">
          {{ page.h1 }}
        </h1>
        <p :class="RISE" class="max-w-[90%] sm:max-w-xl md:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.35]" style="animation-delay:160ms">{{ page.lead }}</p>
      </div>

      <!-- ползунок -->
      <div :class="RISE" class="relative z-[2] mt-10 sm:mt-14 mx-auto w-full max-w-[860px] text-left" style="animation-delay:260ms">
        <div :class="WINDOW" class="p-5 sm:p-8">
          <div class="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h2 class="font-display font-bold text-xl sm:text-2xl text-[#054C86] dark:text-[#6cb6f2]">{{ page.calcTitle }}</h2>
              <p class="mt-1 text-sm sm:text-base text-black/60 dark:text-white/60">{{ page.calcText }}</p>
              <div class="mt-6 flex items-end gap-2">
                <span class="font-display font-bold text-6xl leading-none tabular-nums text-[#054C86] dark:text-[#6cb6f2]">{{ users }}</span>
                <span class="pb-1.5 text-black/55 dark:text-white/55">{{ page.calcUnit }}</span>
              </div>
              <div class="relative mt-6">
                <input v-model.number="users" @input="touched = true" type="range" min="1" max="60" step="1" :aria-label="page.calcTitle"
                  class="block h-2.5 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(90deg,#0392FF_var(--p),rgba(3,146,255,.2)_var(--p))] outline-none
                    [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#0392FF] [&::-webkit-slider-thumb]:bg-[#fff] [&::-webkit-slider-thumb]:shadow-[0_4px_14px_rgba(3,146,255,.5)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110
                    [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[#0392FF] [&::-moz-range-thumb]:bg-[#fff]"
                  :style="{ '--p': pct(users) + '%' }" />
                <div class="relative mt-3 h-5 text-xs text-black/45 dark:text-white/45">
                  <span class="absolute -translate-x-1/2" :style="{ left: pct(1) + '%' }">1</span>
                  <span class="absolute -translate-x-1/2 font-semibold text-[#054C86] dark:text-[#6cb6f2]" :style="{ left: pct(10) + '%' }">10</span>
                  <span class="absolute -translate-x-1/2 font-semibold text-[#054C86] dark:text-[#6cb6f2]" :style="{ left: pct(50) + '%' }">50</span>
                  <span class="absolute -translate-x-1/2" :style="{ left: pct(60) + '%' }">60</span>
                </div>
              </div>
            </div>

            <!-- результат -->
            <div class="rounded-3xl border border-[#0392FF]/40 p-6 text-center bg-[linear-gradient(150deg,rgba(255,255,255,.85),rgba(3,146,255,.1))] dark:border-[rgba(60,140,255,.45)] dark:bg-[linear-gradient(150deg,rgba(255,255,255,.05),rgba(3,146,255,.14))]">
              <template v-if="recommended">
                <span class="inline-flex rounded-full bg-[#054C86]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#054C86] dark:text-[#6cb6f2]">{{ u.fit }}</span>
                <div class="mt-3 font-display font-bold text-2xl text-[#054C86] dark:text-[#6cb6f2]">{{ recommended.name }}</div>
                <div class="mt-2 font-display font-bold text-4xl sm:text-5xl tabular-nums text-black dark:text-white">{{ fmt(Math.round(priceShown)) }}<span class="ml-1.5 text-xl font-semibold text-black/50 dark:text-white/50">TMT</span></div>
                <div class="mt-1 text-sm text-black/55 dark:text-white/55">{{ u.once }}</div>
                <button type="button" @click="openContactModal" class="btn-primary mt-5 !px-7 !py-3 w-full cursor-pointer">{{ u.leave }}</button>
              </template>
              <template v-else>
                <div class="font-display font-bold text-2xl text-[#054C86] dark:text-[#6cb6f2]">{{ u.custom }}</div>
                <p class="mt-2 text-sm text-black/60 dark:text-white/60">{{ page.calcCustom }}</p>
                <button type="button" @click="openContactModal" class="btn-primary mt-5 !px-7 !py-3 w-full cursor-pointer">{{ u.leave }}</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== два пакета ===== -->
    <section ref="plansEl" class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1000px] mx-auto text-center">
      <h2 v-reveal :class="H2">{{ page.plansTitle }}</h2>
      <div class="mt-10 sm:mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 text-left">
        <div v-for="(p, i) in page.plans" :key="p.key" v-reveal="i ? 'right' : 'left'" class="group">
          <div class="relative h-full overflow-hidden rounded-[28px] border p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1"
            :class="[
              p.popular ? POPULAR : CARD_PLAIN + ' hover:shadow-[0_20px_50px_rgba(5,76,134,.18)]',
              recommended && recommended.key === p.key ? 'ring-4 ring-[#0392FF]/50 -translate-y-1.5' : '',
            ]">
            <span v-if="p.popular" class="absolute right-6 top-6 z-[1] rounded-full bg-[linear-gradient(135deg,#0392FF,#054C86)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{{ u.rec }}</span>
            <h3 class="font-display font-bold text-2xl" :class="p.popular ? 'text-[#054C86] dark:text-white' : 'text-[#054C86] dark:text-[#6cb6f2]'">{{ p.name }}</h3>
            <p class="mt-2 min-h-[48px]" :class="p.popular ? 'text-black/70 dark:text-white/80' : 'text-black/65 dark:text-white/65'">{{ p.text }}</p>
            <div class="mt-5 font-display font-bold text-5xl tabular-nums" :class="'text-black dark:text-white'">{{ fmt(Math.round(cardPrice[i])) }}<span class="ml-1.5 text-xl font-semibold opacity-60">TMT</span></div>
            <div class="mt-1 text-sm" :class="p.popular ? 'text-black/60 dark:text-white/70' : 'text-black/55 dark:text-white/55'">{{ u.onceUsers }} {{ p.users }} {{ u.users }}</div>
            <button type="button" @click="openContactModal" class="relative z-[1] mt-6 w-full" :class="p.popular ? CTA_MAIN_FULL : BTN_GHOST">{{ u.leave }}</button>
            <ul class="mt-7 flex flex-col gap-3">
              <li v-for="(f, k) in p.features" :key="f" class="flex items-start gap-3" :style="{ '--d': 300 + k * 90 + 'ms' }">
                <span class="mt-0.5 flex h-5 w-5 shrink-0 scale-0 items-center justify-center rounded-full text-white group-[.is-in]:[animation:seo-pop_.45s_cubic-bezier(.3,1.5,.5,1)_var(--d)_forwards] motion-reduce:scale-100" :class="p.popular ? GRAD + ' dark:bg-[rgba(255,255,255,.25)] dark:[background-image:none]' : GRAD">
                  <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                </span>
                <span :class="p.popular ? 'text-black/80 dark:text-white/90' : 'text-black/75 dark:text-white/80'">{{ f }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== таблица сравнения ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[900px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.tableTitle }}</h2>
      <div v-reveal :class="VISUAL" class="mt-10 sm:mt-14 !p-2 sm:!p-4">
        <div class="grid grid-cols-[1.6fr_1fr_1fr] px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#054C86]/70 dark:text-[#6cb6f2]/80">
          <span v-for="(h, i) in page.tableHead" :key="h" :class="i ? 'text-center' : ''">{{ h }}</span>
        </div>
        <div v-for="(r, k) in page.rows" :key="r[0]" :class="SLIDE_Y" :style="{ '--d': k * 70 + 'ms' }"
          class="grid grid-cols-[1.6fr_1fr_1fr] items-center rounded-2xl px-3 sm:px-4 py-3 text-sm sm:text-base transition-colors duration-200 odd:bg-[rgba(255,255,255,.6)] hover:!bg-[rgba(3,146,255,.12)] dark:odd:bg-[rgba(255,255,255,.04)]">
          <span class="pr-2 font-medium text-black/80 dark:text-white/80">{{ r[0] }}</span>
          <span v-for="(c, j) in [r[1], r[2]]" :key="j" class="flex justify-center">
            <svg v-if="c === true" viewBox="0 0 24 24" class="h-5 w-5 scale-0 text-green-600 group-[.is-in]:[animation:seo-pop_.45s_cubic-bezier(.3,1.5,.5,1)_calc(var(--d)+.3s)_forwards] motion-reduce:scale-100 dark:text-green-400" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg>
            <span v-else-if="c === false" class="inline-block h-[3px] w-4 rounded-full bg-[#054C86]/55 dark:bg-white/60" role="img" :aria-label="u.no"></span>
            <span v-else class="font-semibold text-[#054C86] dark:text-[#6cb6f2]">{{ c }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- ===== что входит в стоимость: коробка, из которой «вылетает» всё включённое ===== -->
    <section class="relative px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1000px] mx-auto text-center">
      <h2 v-reveal :class="H2">{{ page.includedTitle }}</h2>
      <p v-reveal class="mt-4 text-black/65 dark:text-white/65 text-base sm:text-lg">{{ u.boxed }}</p>

      <div v-reveal class="group relative mx-auto mt-10 h-[320px] w-full sm:mt-14 md:h-[460px]">
        <!-- мягкое свечение из коробки -->
        <span class="absolute left-1/2 top-[52%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0392FF]/25 blur-[70px] opacity-0 transition-opacity duration-1000 delay-500 group-[.is-in]:opacity-100 motion-reduce:opacity-100 md:h-[420px] md:w-[420px]"></span>

        <!-- коробка -->
        <svg viewBox="0 0 240 240" class="absolute left-1/2 top-[56%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 md:top-[58%] md:h-[300px] md:w-[300px]" aria-hidden="true">
          <defs>
            <linearGradient id="bxBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2a8bff" /><stop offset="100%" stop-color="#054C86" /></linearGradient>
            <linearGradient id="bxLid" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4aa6ff" /><stop offset="100%" stop-color="#0a5fae" /></linearGradient>
            <linearGradient id="bxRib" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity=".95" /><stop offset="100%" stop-color="#cfe6ff" stop-opacity=".9" /></linearGradient>
            <radialGradient id="bxIn" cx="50%" cy="100%" r="80%"><stop offset="0%" stop-color="#bfe3ff" /><stop offset="100%" stop-color="#0392FF" stop-opacity="0" /></radialGradient>
          </defs>
          <ellipse cx="120" cy="214" rx="86" ry="11" fill="#000" opacity=".22" />
          <!-- внутренность (видна, когда крышка открыта) -->
          <rect x="44" y="96" width="152" height="26" rx="6" fill="url(#bxIn)" class="opacity-0 transition-opacity duration-700 delay-500 group-[.is-in]:opacity-100 motion-reduce:opacity-100" />
          <!-- корпус -->
          <rect x="40" y="108" width="160" height="100" rx="12" fill="url(#bxBody)" />
          <rect x="108" y="108" width="24" height="100" fill="url(#bxRib)" />
          <rect x="40" y="108" width="160" height="14" rx="6" fill="#fff" opacity=".12" />
          <!-- крышка -->
          <g class="[transform-box:fill-box] origin-bottom-left transition-all duration-[900ms] delay-300 ease-[cubic-bezier(.3,1.4,.5,1)] group-[.is-in]:-translate-y-8 group-[.is-in]:-translate-x-6 group-[.is-in]:-rotate-[14deg] motion-reduce:-translate-y-8 motion-reduce:-translate-x-6 motion-reduce:-rotate-[14deg]">
            <rect x="32" y="78" width="176" height="36" rx="10" fill="url(#bxLid)" />
            <rect x="108" y="78" width="24" height="36" fill="url(#bxRib)" />
            <path d="M120 78c-14-22-40-18-34-4 4 10 24 8 34 4zM120 78c14-22 40-18 34-4-4 10-24 8-34 4z" fill="url(#bxRib)" />
            <circle cx="120" cy="78" r="6" fill="#fff" />
          </g>
        </svg>

        <!-- бирка «0 TMT» качается под коробкой -->
        <div class="absolute left-1/2 top-[84%] -ml-[10px] origin-top [animation:seo-sway_4.5s_ease-in-out_infinite] motion-reduce:animate-none md:top-[86%]">
          <span class="mx-auto block h-6 w-px bg-[#0392FF]/50"></span>
          <span class="block -translate-x-1/2 rounded-xl border border-green-500/50 bg-[rgba(34,197,94,.12)] px-4 py-2 text-center font-display text-sm font-bold text-green-700 dark:text-green-400 sm:text-base">{{ u.zero }}</span>
        </div>

        <!-- вылетающие элементы (на широких экранах) -->
        <div v-for="(c, i) in page.included" :key="c.title"
          class="absolute left-1/2 top-[42%] hidden -ml-[100px] -mt-[30px] w-[200px] scale-[.2] opacity-0 transition-all duration-[1100ms] ease-[cubic-bezier(.2,1.2,.3,1)] [translate:0_0] group-[.is-in]:scale-100 group-[.is-in]:opacity-100 group-[.is-in]:[translate:var(--tx)_var(--ty)] motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:[translate:var(--tx)_var(--ty)] md:block"
          :style="{ '--tx': FLY[i][0] + 'px', '--ty': FLY[i][1] + 'px', transitionDelay: 700 + i * 220 + 'ms' }">
          <div class="flex items-center gap-3 rounded-2xl border border-[#0392FF]/35 bg-[rgba(255,255,255,.92)] p-3 text-left shadow-[0_16px_40px_rgba(5,76,134,.25)] backdrop-blur-md dark:border-[rgba(60,140,255,.5)] dark:bg-[rgba(10,22,48,.9)] [animation:seo-hover_4s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ animationDelay: i * 0.7 + 's' }">
            <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" :class="GRAD">
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[c.icon]"></svg>
            </span>
            <span class="min-w-0">
              <span class="block truncate font-display text-[15px] font-bold leading-tight text-[#054C86] dark:text-[#6cb6f2]">{{ c.title }}</span>
              <span class="block text-xs font-semibold text-green-700 dark:text-green-400">{{ c.chip }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- на телефоне: те же пункты просто списком -->
      <div class="mt-2 grid gap-3 text-left md:hidden">
        <div v-for="c in page.included" :key="c.title" v-reveal class="flex items-center gap-3 rounded-2xl border border-[#0392FF]/30 bg-[rgba(255,255,255,.85)] p-3.5 dark:border-[rgba(60,140,255,.4)] dark:bg-[rgba(255,255,255,.05)]">
          <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" :class="GRAD">
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[c.icon]"></svg>
          </span>
          <span><span class="block font-display font-bold text-[#054C86] dark:text-[#6cb6f2]">{{ c.title }}</span><span class="block text-sm text-black/65 dark:text-white/65">{{ c.text }}</span></span>
        </div>
      </div>
    </section>

    <!-- ===== что платно и когда: линия времени ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1000px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.yearsTitle }}</h2>
      <div v-reveal
        class="group relative mt-12 sm:mt-16 grid gap-9 text-left md:grid-cols-3 md:gap-6
          before:absolute before:left-[21px] before:top-[22px] before:bottom-[22px] before:w-[3px] before:rounded-[3px] before:bg-[rgba(3,146,255,.18)] before:content-['']
          md:before:left-[22px] md:before:right-[22px] md:before:top-[21px] md:before:bottom-auto md:before:h-[3px] md:before:w-auto
          after:absolute after:left-[21px] after:top-[22px] after:h-0 after:w-[3px] after:rounded-[3px] after:bg-[linear-gradient(180deg,#22c55e,#0392FF,#054C86)] after:content-[''] after:transition-[height,width] after:duration-[2200ms] after:delay-200 after:ease-[cubic-bezier(.2,.7,.2,1)]
          md:after:left-[22px] md:after:top-[21px] md:after:h-[3px] md:after:w-0 md:after:bg-[linear-gradient(90deg,#22c55e,#0392FF,#054C86)]
          [&.is-in]:after:h-[calc(100%-44px)] md:[&.is-in]:after:h-[3px] md:[&.is-in]:after:w-[calc(100%-44px)]
          motion-reduce:after:h-[calc(100%-44px)] md:motion-reduce:after:h-[3px] md:motion-reduce:after:w-[calc(100%-44px)]">
        <div v-for="(y, i) in page.years" :key="y.title" :class="SLIDE_Y" class="relative z-[1] pl-16 md:pl-0" :style="{ '--d': i * 450 + 'ms' }">
          <span class="absolute left-0 top-0 z-[1] flex h-11 w-11 items-center justify-center rounded-full font-bold text-white md:relative"
            :class="y.free ? 'bg-[linear-gradient(135deg,#22c55e,#15803d)] shadow-[0_8px_22px_rgba(34,197,94,.45)]' : GRAD + ' shadow-[0_8px_22px_rgba(3,146,255,.4)]'">
            <span class="absolute inset-0 rounded-full [animation:seo-ping_2.4s_ease-out_infinite] motion-reduce:hidden" :class="y.free ? 'bg-green-500/50' : 'bg-[#0392FF]/45'" :style="{ animationDelay: i * 0.5 + 's' }"></span>
            <span class="relative">{{ i + 1 }}</span>
          </span>
          <span class="mt-0 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider md:mt-4"
            :class="y.free ? 'bg-green-500/15 text-green-700 dark:text-green-400' : 'bg-[#054C86]/10 text-[#054C86] dark:text-[#6cb6f2]'">{{ y.tag }}</span>
          <h3 class="mt-3 font-display font-bold text-xl text-[#054C86] dark:text-[#6cb6f2]">{{ y.title }}</h3>
          <p class="mt-1.5 text-black/70 dark:text-white/70 leading-relaxed">{{ y.text }}</p>
        </div>
      </div>
    </section>

    <!-- ===== что есть в системе: орбита модулей ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.modulesTitle }}</h2>
      <p v-reveal class="mt-4 text-center text-black/65 dark:text-white/65 text-base sm:text-lg">{{ page.modulesText }}</p>
      <div class="mt-10 sm:mt-14 grid items-center gap-10 lg:grid-cols-[440px_1fr]">
        <!-- орбита: модули кружатся вокруг HasApp -->
        <div v-reveal class="mx-auto">
          <div class="relative h-[340px] w-[340px] [--r:128px] sm:h-[440px] sm:w-[440px] sm:[--r:168px]">
            <span class="absolute inset-[18%] rounded-full border border-dashed border-[#0392FF]/30"></span>
            <span class="absolute inset-[2%] rounded-full border border-dashed border-[#0392FF]/40"></span>
            <div class="absolute inset-0 [animation:seo-spin_50s_linear_infinite] motion-reduce:animate-none">
              <div v-for="(m, i) in page.modules.slice(0, 7)" :key="m.title" class="absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16"
                :style="{ transform: `rotate(${(360 / 7) * i}deg) translateY(calc(var(--r) * -1))` }">
                <div :style="{ transform: `rotate(${-(360 / 7) * i}deg)` }">
                  <div class="flex flex-col items-center [animation:seo-spin-rev_50s_linear_infinite] motion-reduce:animate-none">
                    <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_rgba(3,146,255,.4)] sm:h-14 sm:w-14" :class="GRAD">
                      <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[m.icon]"></svg>
                    </span>
                    <span class="mt-1 whitespace-nowrap text-[11px] font-semibold text-[#054C86] sm:text-xs dark:text-[#6cb6f2]">{{ m.title }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute left-1/2 top-1/2 flex h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg font-bold text-white shadow-[0_0_50px_rgba(3,146,255,.55)]" :class="GRAD">
              <span class="absolute inset-0 rounded-full bg-[#0392FF]/40 [animation:seo-ping_2.6s_ease-out_infinite] motion-reduce:hidden"></span>
              <span class="relative font-display">HasApp</span>
            </div>
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-2 text-left">
          <div v-for="(m, i) in page.modules" :key="m.title" v-reveal :style="{ transitionDelay: (i % 2) * 90 + 'ms' }" class="group">
            <div :class="CARD" class="h-full p-5 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(5,76,134,.16)]">
              <div class="flex items-center gap-3">
                <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_rgba(3,146,255,.3)]" :class="GRAD">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[m.icon]"></svg>
                </span>
                <h3 class="font-display font-bold text-lg text-[#054C86] dark:text-[#6cb6f2]">{{ m.title }}</h3>
              </div>
              <ul class="mt-4 flex flex-col gap-2 text-sm text-black/70 dark:text-white/70">
                <li v-for="(it, k) in m.items" :key="it" :class="SLIDE_X" class="flex items-start gap-2" :style="{ '--d': 200 + k * 130 + 'ms' }">
                  <span class="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0392FF]"></span>{{ it }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== где работает система ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1000px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.modesTitle }}</h2>
      <p v-reveal class="mt-4 mx-auto max-w-2xl text-center text-black/65 dark:text-white/65 text-base sm:text-lg">{{ page.modesText }}</p>
      <div class="mt-10 sm:mt-14 grid gap-4 md:grid-cols-2 text-left">
        <div v-for="(m, i) in page.modes" :key="m.title" v-reveal="i ? 'right' : 'left'" :class="VISUAL" class="!p-6 sm:!p-8">
          <span class="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_12px_28px_rgba(3,146,255,.35)]" :class="GRAD">
            <span class="absolute inset-0 rounded-2xl bg-[#0392FF]/40 [animation:seo-ping_2.6s_ease-out_infinite] motion-reduce:hidden" :style="{ animationDelay: i * 0.7 + 's' }"></span>
            <svg viewBox="0 0 24 24" class="relative h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS[m.icon]"></svg>
          </span>
          <h3 class="mt-4 font-display font-bold text-2xl text-[#054C86] dark:text-[#6cb6f2]">{{ m.title }}</h3>
          <p class="mt-3 text-black/70 dark:text-white/70 leading-relaxed">{{ m.text }}</p>
        </div>
      </div>
    </section>

    <!-- ===== демо ===== -->
    <section class="px-6 sm:px-8 py-8 sm:py-12 w-full max-w-[900px] mx-auto">
      <div v-reveal :class="VISUAL" class="!p-6 sm:!p-10">
        <div class="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div class="relative h-[120px] w-[120px] shrink-0">
            <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(3,146,255,.2)" stroke-width="7" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#demoGrad)" stroke-width="7" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="264"
                class="group-[.is-in]:[animation:seo-dash-loop_5s_cubic-bezier(.2,.7,.2,1)_.3s_infinite] motion-reduce:[stroke-dashoffset:0] motion-reduce:animate-none" />
              <defs><linearGradient id="demoGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0392FF" /><stop offset="100%" stop-color="#054C86" /></linearGradient></defs>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="font-display text-3xl font-bold leading-none text-[#054C86] dark:text-[#6cb6f2]">30</span>
              <span class="text-xs text-black/55 dark:text-white/55">{{ u.days }}</span>
            </div>
          </div>
          <div>
            <h2 class="font-display font-bold text-2xl sm:text-3xl text-[#054C86] dark:text-[#6cb6f2]">{{ page.demoTitle }}</h2>
            <p class="mt-3 max-w-2xl text-black/70 dark:text-white/70 text-base sm:text-lg leading-relaxed">{{ page.demoText }}</p>
            <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer" class="btn-primary mt-5 !px-8 !py-3.5 inline-flex no-underline">{{ t('nav.tryDemo') }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== вопросы ===== -->
    <section class="px-6 sm:px-8 py-10 sm:py-16 w-full max-w-[820px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.faqTitle }}</h2>
      <SeoFaq :items="page.faq" class="mt-10" />
    </section>

    <!-- ===== призыв ===== -->
    <section class="px-6 sm:px-8 pt-6 pb-16 sm:pb-24 w-full max-w-[1000px] mx-auto text-center">
      <div v-reveal :class="CTA">
        <h2 class="relative font-display font-bold text-2xl sm:text-4xl">{{ page.ctaTitle }}</h2>
        <p class="relative mt-3 max-w-xl mx-auto text-white/85 text-base sm:text-lg">{{ page.ctaText }}</p>
        <div class="relative mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer" :class="CTA_MAIN">{{ t('nav.tryDemo') }}</a>
          <button type="button" @click="openContactModal" :class="CTA_GHOST">{{ u.leave }}</button>
        </div>
        <p class="relative mt-6 text-sm text-white/70">{{ u.see }} <a href="/sklad" class="underline">{{ u.sklad }}</a> · <a href="/crm" class="underline">CRM</a> · <a href="/" class="underline">{{ u.home }}</a></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import SeoFaq from '@/components/SeoFaq.vue'
import { vReveal } from '@/composables/useReveal'
import { seoUi } from '@/pages/seoPages.js'
import { H2, GRAD, RISE, GLOW_A, GLOW_B, WINDOW, CARD, VISUAL, SLIDE_X, SLIDE_Y, CTA, CTA_MAIN, CTA_GHOST, BTN_GHOST } from './ui'

const props = defineProps({ page: { type: Object, required: true } })
const { t, locale, getLocaleMessage } = useI18n()
// надписи страницы лежат в языковых файлах: seoUi.tarify
const u = seoUi('tarify', locale.value, getLocaleMessage)
const openContactModal = inject('openContactModal', () => {})

// оформление карточек пакетов
const POPULAR = "border-2 border-[#0392FF] bg-[linear-gradient(160deg,#ffffff_0%,#dcedff_100%)] shadow-[0_24px_60px_rgba(3,146,255,.3)] dark:border dark:border-[#0392FF]/70 dark:bg-[linear-gradient(160deg,#0e3278_0%,#051230_50%,#0e3278_100%)] dark:bg-[length:200%_200%] dark:[animation:seo-grad_8s_ease-in-out_infinite] dark:shadow-[0_24px_60px_rgba(0,60,200,.35)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[26px] after:bg-[linear-gradient(110deg,transparent_35%,rgba(3,146,255,.14)_50%,transparent_65%)] dark:after:bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,.14)_50%,transparent_65%)] after:[background-size:250%_100%] after:[animation:seo-shimmer_4.5s_linear_infinite] after:content-['']"
const CARD_PLAIN = 'border-[#0392FF]/30 bg-[linear-gradient(150deg,rgba(255,255,255,.85),rgba(3,146,255,.07))] dark:border-[rgba(60,140,255,.4)] dark:bg-[linear-gradient(150deg,rgba(255,255,255,.05),rgba(3,146,255,.08))]'
const CTA_MAIN_FULL = 'btn-primary !px-7 !py-3 cursor-pointer'

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
const pct = (v) => ((v - 1) / 59) * 100

// ---------- подбор тарифа ----------
const users = ref(8)
const touched = ref(false)
const recommended = computed(() => props.page.plans.find((p) => users.value <= p.users) || null)

const priceShown = ref(props.page.plans[0].price)
let raf = 0
watch(recommended, (r) => {
  if (!r) return
  cancelAnimationFrame(raf)
  const tick = () => {
    const d = r.price - priceShown.value
    if (Math.abs(d) > 1) { priceShown.value += d * 0.14; raf = requestAnimationFrame(tick) } else priceShown.value = r.price
  }
  raf = requestAnimationFrame(tick)
})

// при открытии ползунок сам «проезжает» от 5 до 28, чтобы было видно, что он живой
let sweep = 0
onMounted(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  users.value = 5
  const start = performance.now() + 900
  const from = 5, to = 28, dur = 1800
  const step = (now) => {
    if (touched.value) return
    const k = Math.min(1, Math.max(0, (now - start) / dur))
    const e = 1 - Math.pow(1 - k, 3)
    users.value = Math.round(from + (to - from) * e)
    if (k < 1) sweep = requestAnimationFrame(step)
  }
  sweep = requestAnimationFrame(step)
})

// цены в карточках пакетов «набегают» от нуля, когда блок появился на экране
const plansEl = ref(null)
const cardPrice = reactive(props.page.plans.map((p) => p.price))
let io = null
let raf2 = 0

onMounted(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || typeof IntersectionObserver === 'undefined' || !plansEl.value) return
  props.page.plans.forEach((_, i) => { cardPrice[i] = 0 })
  io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    const t0 = performance.now()
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / 1400)
      const ease = 1 - Math.pow(1 - k, 3)
      props.page.plans.forEach((p, i) => { cardPrice[i] = p.price * ease })
      if (k < 1) raf2 = requestAnimationFrame(tick)
    }
    raf2 = requestAnimationFrame(tick)
  }, { threshold: 0.25 })
  io.observe(plansEl.value)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); cancelAnimationFrame(sweep); cancelAnimationFrame(raf2); if (io) io.disconnect() })

// куда «вылетают» пункты из коробки (смещение от центра коробки, px)
const FLY = [[-330, -120], [330, -120], [-370, 60], [370, 60]]

// ---------- иконки ----------
const ICONS = {
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5z"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3M14 9l2 2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  coins: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  tasks: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 9 1.5 1.5L12 8M8 15l1.5 1.5L12 14M14.5 9.5H17M14.5 15.5H17"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c2.7.1 5 2.2 5 5.3"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  sliders: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
}
</script>
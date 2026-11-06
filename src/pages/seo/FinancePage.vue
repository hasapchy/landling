<template>
  <main class="overflow-x-clip">
    <!-- ===== первый экран: заголовок по центру + живая касса ===== -->
    <section class="relative pt-[96px] sm:pt-28 md:pt-32 pb-10 sm:pb-16 px-4 sm:px-8 w-full">
      <div :class="GLOW_A" aria-hidden="true"></div>
      <div :class="GLOW_B" style="animation-delay:-6s" aria-hidden="true"></div>

      <div class="relative z-[2] mx-auto flex max-w-[960px] flex-col items-center gap-5 text-center">
        <LabelBadge :class="RISE" style="animation-delay:0ms">
          <template #icon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS.coins"></svg>
          </template>
          {{ page.badge }}
        </LabelBadge>
        <h1 :class="RISE" class="font-display font-bold leading-[1.1] text-3xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#0392FF,#054C86)] [-webkit-text-fill-color:transparent]" style="animation-delay:80ms">{{ page.h1 }}</h1>
        <p :class="RISE" class="max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.4]" style="animation-delay:160ms">{{ page.lead }}</p>
        <div :class="RISE" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4" style="animation-delay:240ms">
          <a href="https://demo.hasapp.online/auth/login#signup" target="_blank" rel="noopener noreferrer" class="btn-primary !px-6 !py-3 sm:!px-8 sm:!py-3.5 text-center no-underline">{{ t('nav.tryDemo') }}</a>
          <button type="button" @click="openContactModal" :class="BTN_GHOST">{{ u.leave }}</button>
        </div>
      </div>

      <!-- касса: один кошелёк. Купюры заходят слева, выходят справа, чек подсказывает операцию -->
      <div :class="RISE" class="relative z-[2] mx-auto mt-24 w-full max-w-[1000px] sm:mt-28" style="animation-delay:380ms">
        <div class="grid grid-cols-[1fr_auto_1fr] items-center">
          <!-- приходит -->
          <div class="min-w-0">
            <div class="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[.05em] text-green-700 dark:text-green-400 sm:text-sm sm:tracking-[.16em]">{{ u.inflow }}
              <svg viewBox="0 0 24 24" class="hidden h-5 w-5 sm:block [animation:zv-arrow_1.6s_ease-in-out_infinite] motion-reduce:animate-none" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
            </div>
            <div class="relative h-14 overflow-hidden bg-[linear-gradient(90deg,rgba(34,197,94,0),rgba(34,197,94,.28))] sm:h-[72px]">
              <span v-for="c in coins.filter((x) => x.side === 'in')" :key="c.id" :class="NOTE_CLS" class="[animation:fin-in_1.5s_ease-in_forwards] bg-[linear-gradient(135deg,#4ade80,#16a34a)]">
                <i class="absolute left-1.5 top-1.5 h-1 w-2.5 rounded-sm bg-white/40"></i>+{{ c.short }}
              </span>
            </div>
            <p class="mt-3 text-center text-xs font-semibold text-black/60 dark:text-white/65 sm:text-sm">+{{ fmt(Math.round(totals.in)) }} TMT {{ u.period }}</p>
          </div>

          <!-- кошелёк -->
          <div class="relative mx-1 w-[150px] sm:mx-6 sm:w-[300px]">
            <!-- чек -->
            <div class="absolute inset-x-0 -top-[54px] z-[4] flex justify-center sm:-top-[68px]" aria-hidden="true">
              <div v-if="lastOp" :key="lastOp.id" class="w-[132px] rounded-lg bg-white px-2 py-1.5 text-center shadow-[0_10px_24px_rgba(0,0,0,.3)] [animation:fin-receipt_1.9s_ease_forwards] sm:w-[170px] sm:px-3 sm:py-2">
                <b class="block text-[9px] tracking-[.12em] text-[#054C86] sm:text-[10px]">{{ u.check }}{{ lastOp.id + 127 }}</b>
                <b class="block text-sm sm:text-base" :class="lastOp.side === 'in' ? 'text-green-600' : 'text-amber-600'">{{ lastOp.side === 'in' ? '+' : '−' }}{{ fmt(lastOp.amount) }} TMT</b>
                <span class="block truncate text-[9px] text-slate-500 sm:text-[11px]">{{ lastOp.label }}</span>
              </div>
            </div>
            <!-- купюры в кошельке -->
            <span v-for="(n, k) in [[-14, '#22c55e', -34], [0, '#16a34a', -42], [14, '#4ade80', -34]]" :key="k" class="absolute left-1/2 top-0 h-[104px] w-[78px] -translate-x-1/2 rounded-lg border border-white/40 sm:h-[150px] sm:w-[120px]" :style="{ background: n[1], transform: `translateX(-50%) rotate(${n[0]}deg)`, top: n[2] / 4 + 'px', opacity: .92 }"></span>
            <div class="relative mt-6 rounded-[28px] border-2 border-[#0392FF] bg-[linear-gradient(180deg,#1b5fb0,#0a2a55)] px-4 pb-7 pt-12 text-center shadow-[0_24px_60px_rgba(3,146,255,.3)] sm:mt-9 sm:rounded-[36px] sm:pb-9 sm:pt-[70px]" :class="bump ? '[animation:fin-bump_.4s_ease]' : ''">
              <span class="absolute inset-x-0 top-0 h-[44px] rounded-t-[26px] bg-white/10 sm:h-[56px] sm:rounded-t-[34px]"></span>
              <span class="absolute -right-3 top-[64%] h-[40px] w-[34px] rounded-2xl border-2 border-[#6cb6f2]/60 bg-[#06152d] sm:-right-5 sm:top-[60%] sm:h-[56px] sm:w-[70px] sm:rounded-3xl"><i class="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400 sm:left-[34%] sm:h-3.5 sm:w-3.5"></i></span>
              <span class="relative block text-[9px] font-bold uppercase tracking-[.1em] text-[#9fd0ff] sm:text-xs">{{ page.balanceLabel }}</span>
              <b class="relative mt-1 block text-[24px] leading-none tabular-nums text-white sm:text-[44px]">{{ fmt(Math.round(balance)) }}</b>
              <span class="relative mt-1 block text-xs font-semibold text-white/60 sm:text-sm">TMT</span>
            </div>
          </div>

          <!-- уходит -->
          <div class="min-w-0">
            <div class="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[.05em] text-amber-700 dark:text-amber-400 sm:text-sm sm:tracking-[.16em]">{{ u.outflow }}
              <svg viewBox="0 0 24 24" class="hidden h-5 w-5 sm:block [animation:zv-arrow_1.6s_ease-in-out_infinite] motion-reduce:animate-none" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
            </div>
            <div class="relative h-14 overflow-hidden bg-[linear-gradient(90deg,rgba(245,158,11,.28),rgba(245,158,11,0))] sm:h-[72px]">
              <span v-for="c in coins.filter((x) => x.side === 'out')" :key="c.id" :class="NOTE_CLS" class="[animation:fin-out_1.5s_ease-out_forwards] bg-[linear-gradient(135deg,#fbbf24,#d97706)]">
                <i class="absolute left-1.5 top-1.5 h-1 w-2.5 rounded-sm bg-white/40"></i>−{{ c.short }}
              </span>
            </div>
            <p class="mt-3 text-center text-xs font-semibold text-black/60 dark:text-white/65 sm:text-sm">−{{ fmt(Math.round(totals.out)) }} TMT {{ u.period }}</p>
          </div>
        </div>
        <p :class="NOTE">{{ page.stageNote }}</p>
      </div>
    </section>

    <!-- ===== что есть в модуле: вкладки, переключаются сами ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.tabsTitle }}</h2>
      <p v-reveal class="mx-auto mt-4 max-w-2xl text-center text-black/65 dark:text-white/65 text-base sm:text-lg">{{ page.cashText }}</p>
      <div v-reveal class="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="flex flex-col gap-2">
          <button v-for="(b, i) in page.bento" :key="b.key" type="button" @click="pick(i)"
            class="relative cursor-pointer overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300"
            :class="tab === i ? 'border-[#0392FF] bg-[linear-gradient(150deg,#fff,#dcedff)] shadow-[0_14px_36px_rgba(3,146,255,.25)] dark:bg-[linear-gradient(150deg,rgba(3,146,255,.22),rgba(5,76,134,.2))]' : 'border-[#0392FF]/25 bg-[rgba(255,255,255,.6)] hover:border-[#0392FF]/60 dark:border-[rgba(60,140,255,.3)] dark:bg-[rgba(255,255,255,.04)]'">
            <b class="block font-display text-[17px] text-[#054C86] dark:text-[#6cb6f2]">{{ b.title }}</b>
            <span class="mt-1 block text-sm leading-snug text-black/60 dark:text-white/65" :class="tab === i ? '' : 'hidden sm:block'">{{ b.text }}</span>
            <span v-if="tab === i && !paused" :key="'bar' + tab" class="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[#0392FF] [animation:fin-progress_5s_linear_forwards] motion-reduce:hidden"></span>
          </button>
        </div>

        <div class="relative min-h-[340px] overflow-hidden rounded-[26px] border border-[#0392FF]/35 bg-[linear-gradient(145deg,rgba(255,255,255,.9),rgba(3,146,255,.08))] p-6 dark:border-[rgba(60,140,255,.4)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,.05),rgba(3,146,255,.1))] sm:p-8" aria-hidden="true">
          <Transition enter-from-class="opacity-0 translate-y-3" enter-active-class="transition duration-500" leave-active-class="absolute inset-6 opacity-0 transition duration-200" mode="out-in">
            <div :key="tab" class="flex h-full min-h-[280px] flex-col items-center justify-center">
              <!-- 0: касса -->
              <div v-if="tab === 0" class="flex h-[230px] w-full items-end justify-between gap-2 sm:gap-3">
                <div v-for="(m, i) in MONTHS" :key="i" class="flex h-full flex-1 items-end justify-center gap-1">
                  <span :style="{ height: m[0] + '%', animationDelay: i * 0.3 + 's' }" class="w-full max-w-[22px] origin-bottom rounded-[8px_8px_3px_3px] bg-[linear-gradient(180deg,#4ade80,#16a34a)] [animation:fin-bar_3.6s_ease-in-out_infinite] motion-reduce:animate-none"></span>
                  <span :style="{ height: m[1] + '%', animationDelay: i * 0.3 + 0.45 + 's' }" class="w-full max-w-[22px] origin-bottom rounded-[8px_8px_3px_3px] bg-[linear-gradient(180deg,#fbbf24,#d97706)] [animation:fin-bar_3.6s_ease-in-out_infinite] motion-reduce:animate-none"></span>
                </div>
              </div>
              <!-- 1: валюты -->
              <div v-else-if="tab === 1" class="flex flex-col items-center gap-6">
                <div class="flex items-center gap-5">
                  <span v-for="(c, i) in ['TMT', 'USD']" :key="c" :style="{ animationDelay: i * 0.9 + 's' }" class="flex h-[92px] w-[92px] items-center justify-center rounded-full font-display text-xl font-bold text-white shadow-[0_14px_34px_rgba(3,146,255,.45)] [animation:seo-bob_3.4s_ease-in-out_infinite] motion-reduce:animate-none" :class="GRAD"><i class="not-italic [animation:fin-flip_5s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ animationDelay: i * 1.2 + 's' }">{{ c }}</i></span>
                </div>
                <div class="flex gap-3 text-sm font-semibold text-[#054C86] dark:text-[#9fd0ff]"><span class="rounded-full bg-[rgba(3,146,255,.12)] px-4 py-1.5">{{ u.till }} · TMT</span><span class="rounded-full bg-[rgba(3,146,255,.12)] px-4 py-1.5">{{ u.till }} · USD</span></div>
              </div>
              <!-- 2: компании -->
              <div v-else-if="tab === 2" class="relative h-[200px] w-full max-w-[320px]">
                <svg viewBox="0 0 220 120" class="absolute inset-0 h-full w-full" fill="none" stroke="#0392FF" stroke-width="2" stroke-linecap="round">
                  <path v-for="(n, i) in NODES" :key="i" :d="`M110 60 L${n[0]} ${n[1]}`" stroke-dasharray="100" stroke-dashoffset="100" class="opacity-60 [animation:seo-draw_.9s_ease_forwards]" :style="{ animationDelay: 300 + i * 200 + 'ms' }" />
                </svg>
                <svg viewBox="0 0 220 120" class="absolute inset-0 h-full w-full motion-reduce:hidden" fill="#0392FF">
                  <circle v-for="(n, i) in NODES" :key="'d' + i" r="3.5"><animateMotion :path="`M110 60 L${n[0]} ${n[1]} L110 60`" dur="3.2s" :begin="`${i * 0.8}s`" repeatCount="indefinite" /></circle>
                </svg>
                <span class="absolute left-[calc(50%-22px)] top-[calc(50%-22px)] flex h-11 w-11 items-center justify-center rounded-full text-white" :class="GRAD"><span class="absolute inset-0 rounded-full bg-[#0392FF]/50 [animation:seo-ping_2.4s_ease-out_infinite] motion-reduce:animate-none"></span><svg viewBox="0 0 24 24" class="relative h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="ICONS.coins"></svg></span>
                <span v-for="(n, i) in NODES" :key="'n' + i" :style="{ left: `calc(${(n[0] / 220) * 100}% - 12px)`, top: `calc(${(n[1] / 120) * 100}% - 12px)`, animationDelay: i * 0.4 + 's' }" class="absolute h-6 w-6 rounded-full border-2 border-[#0392FF] bg-[#fff] dark:bg-[#0f1f3d] [animation:seo-glowpulse_2.4s_ease-in-out_infinite] motion-reduce:animate-none"></span>
              </div>
              <!-- 3: виджеты -->
              <div v-else-if="tab === 3" class="flex items-center gap-6">
                <div class="h-[140px] w-[140px] shrink-0 [animation:seo-spin-slow_16s_linear_infinite] motion-reduce:animate-none">
                  <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90" fill="none" stroke-width="12">
                    <circle cx="50" cy="50" r="38" stroke="rgba(3,146,255,.15)" />
                    <circle v-for="(r, i) in RING" :key="i" cx="50" cy="50" r="38" :stroke="r.c" stroke-linecap="round" pathLength="100" :stroke-dasharray="`${r.len} 100`" :stroke-dashoffset="-r.off" class="[animation:fin-seg_5s_ease-in-out_infinite] motion-reduce:animate-none" :style="{ animationDelay: i * 0.9 + 's', '--a': r.len, '--b': Math.round(r.len * 0.55) }" />
                  </svg>
                </div>
                <ul class="flex flex-col gap-2 text-sm font-semibold text-[#054C86] dark:text-[#9fd0ff]"><li v-for="r in RING" :key="r.name" class="flex items-center gap-2"><i class="h-2.5 w-2.5 rounded-full" :style="{ background: r.c }"></i>{{ r.name }}</li></ul>
              </div>
              <!-- 4: права -->
              <ul v-else class="flex w-full max-w-[360px] flex-col gap-3">
                <li v-for="(w, i) in u.perms" :key="w" :style="{ '--d': i * 900 + 'ms' }" class="flex items-center justify-between rounded-xl bg-[rgba(255,255,255,.75)] px-4 py-3 text-sm font-semibold text-[#054C86] dark:bg-[rgba(255,255,255,.06)] dark:text-[#6cb6f2]">
                  <span>{{ w }}</span>
                  <i class="relative h-[22px] w-10 rounded-full bg-[rgba(5,76,134,.2)] [animation:fin-tgl_6s_ease-in-out_var(--d)_infinite] motion-reduce:bg-[#0392FF] after:absolute after:left-[3px] after:top-[3px] after:h-4 after:w-4 after:rounded-full after:bg-[#fff] after:shadow-[0_2px_6px_rgba(0,0,0,.25)] after:content-[''] after:[animation:fin-knob_6s_ease-in-out_var(--d)_infinite] motion-reduce:after:translate-x-[18px] motion-reduce:after:animate-none"></i>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ===== история ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1180px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.storyTitle }}</h2>
      <div v-reveal
        class="group relative mt-12 sm:mt-16 grid gap-[34px] text-left md:grid-cols-3 md:gap-6
          before:absolute before:left-[21px] before:top-[22px] before:bottom-[22px] before:w-[3px] before:rounded-[3px] before:bg-[rgba(3,146,255,.18)] before:content-['']
          md:before:left-[22px] md:before:right-[22px] md:before:top-[21px] md:before:bottom-auto md:before:h-[3px] md:before:w-auto
          after:absolute after:left-[21px] after:top-[22px] after:h-0 after:w-[3px] after:rounded-[3px] after:bg-[linear-gradient(180deg,#0392FF,#054C86)] after:content-[''] after:transition-[height,width] after:duration-[1800ms] after:delay-200 after:ease-[cubic-bezier(.2,.7,.2,1)]
          md:after:left-[22px] md:after:top-[21px] md:after:h-[3px] md:after:w-0 md:after:bg-[linear-gradient(90deg,#0392FF,#054C86)]
          [&.is-in]:after:h-[calc(100%-44px)] md:[&.is-in]:after:h-[3px] md:[&.is-in]:after:w-[calc(100%-44px)]
          motion-reduce:after:h-[calc(100%-44px)] md:motion-reduce:after:h-[3px] md:motion-reduce:after:w-[calc(100%-44px)]">
        <div v-for="(s, i) in page.story" :key="s.title" :class="SLIDE_Y" class="relative z-[1] pl-16 md:pl-0" :style="{ '--d': i * 420 + 'ms' }">
          <span class="absolute left-0 top-0 z-[1] flex h-11 w-11 items-center justify-center rounded-full font-bold text-white shadow-[0_8px_22px_rgba(3,146,255,.4)] md:relative" :class="GRAD">{{ i + 1 }}</span>
          <span class="mt-0 block pt-2 text-xs font-bold uppercase tracking-[.08em] text-[#0392FF] md:mt-4 md:pt-0">{{ s.tag }}</span>
          <h3 class="mt-1 font-display font-bold text-lg sm:text-xl text-[#054C86] dark:text-[#6cb6f2]">{{ s.title }}</h3>
          <p class="mt-1.5 text-black/65 dark:text-white/65 leading-relaxed">{{ s.text }}</p>
        </div>
      </div>
    </section>

    <!-- ===== от сделки до отчёта ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[1100px] mx-auto text-center">
      <h2 v-reveal :class="H2">{{ page.flowTitle }}</h2>
      <p v-reveal class="mx-auto mt-4 max-w-2xl text-black/65 dark:text-white/65 text-base sm:text-lg">{{ page.flowText }}</p>
      <div v-reveal class="group mt-10 sm:mt-14 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-0">
        <template v-for="(f, i) in page.flow" :key="f">
          <div v-if="i > 0" class="relative h-10 w-[3px] overflow-hidden rounded-full bg-[rgba(3,146,255,.18)] md:h-[3px] md:w-24">
            <span class="absolute top-0 h-full w-full -translate-y-full bg-[linear-gradient(180deg,transparent,#0392FF,transparent)] [animation:seo-travel-y_1.8s_linear_infinite] md:left-0 md:w-10 md:translate-y-0 md:[animation:fin-run_1.8s_linear_infinite] md:bg-[linear-gradient(90deg,transparent,#0392FF,transparent)] motion-reduce:hidden" :style="{ animationDelay: i * 0.6 + 's' }"></span>
          </div>
          <div :style="{ '--d': i * 500 + 'ms' }" class="relative flex items-center gap-3 rounded-2xl border border-[#0392FF]/35 bg-[linear-gradient(150deg,rgba(255,255,255,.9),rgba(3,146,255,.08))] px-6 py-4 font-display text-lg font-bold text-[#054C86] opacity-0 translate-y-3 dark:border-[rgba(60,140,255,.45)] dark:bg-[linear-gradient(150deg,rgba(255,255,255,.06),rgba(3,146,255,.1))] dark:text-[#6cb6f2] group-[.is-in]:[animation:seo-slide_.6s_cubic-bezier(.2,.7,.2,1)_var(--d)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl text-white" :class="GRAD">{{ i + 1 }}</span>{{ f }}
          </div>
        </template>
      </div>
    </section>

    <!-- ===== вопросы ===== -->
    <section class="px-6 sm:px-8 py-12 sm:py-20 w-full max-w-[820px] mx-auto">
      <h2 v-reveal :class="H2" class="text-center">{{ page.faqTitle }}</h2>
      <div class="mt-10 sm:mt-14"><SeoFaq :items="page.faq" /></div>
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
        <p class="relative mt-6 text-sm text-white/70">{{ u.see }} <a href="/crm" class="underline">CRM</a> · <a href="/sklad" class="underline">{{ u.sklad }}</a> · <a href="/zakazy" class="underline">{{ u.orders }}</a> · <a href="/tarify" class="underline">{{ u.cost }}</a> · <a href="/" class="underline">{{ u.home }}</a></p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import SeoFaq from '@/components/SeoFaq.vue'
import { H2, GRAD, RISE, GLOW_A, GLOW_B, NOTE, CTA, CTA_MAIN, CTA_GHOST, BTN_GHOST, SLIDE_Y } from './ui'
import { vReveal } from '@/composables/useReveal'
import { seoUi } from '@/pages/seoPages.js'

defineProps({ page: { type: Object, required: true } })
const { t, locale, getLocaleMessage } = useI18n()
// надписи страницы лежат в языковых файлах: seoUi.finance
const u = seoUi('finance', locale.value, getLocaleMessage)
const openContactModal = inject('openContactModal', () => {})

const ICONS = { coins: '<circle cx="9" cy="9" r="6"/><path d="M15 6.3a6 6 0 1 1-5.7 8.7M7 9h4M9 7v4"/>' }
const MONTHS = [[42, 30], [55, 38], [48, 44], [70, 46], [62, 52], [88, 58]]
const NODES = [[30, 22], [190, 22], [110, 104]]
const RING = [
  { name: u.ring[0], c: '#0392FF', len: 44, off: 0 },
  { name: u.ring[1], c: '#16a34a', len: 28, off: 47 },
  { name: u.ring[2], c: '#f59e0b', len: 18, off: 78 },
]
const SIDES = [
  { key: 'in', sign: '+', border: 'border-green-500/60', chip: 'bg-[rgba(34,197,94,.18)] text-green-700 dark:text-green-400', liquid: 'bg-[linear-gradient(180deg,rgba(74,222,128,.8),rgba(22,163,74,.95))]', wave: 'text-[#4ade80]', coin: 'bg-[linear-gradient(135deg,#4ade80,#16a34a)]' },
  { key: 'out', sign: '−', border: 'border-amber-500/60', chip: 'bg-[rgba(245,158,11,.2)] text-amber-700 dark:text-amber-400', liquid: 'bg-[linear-gradient(180deg,rgba(251,191,36,.8),rgba(217,119,6,.95))]', wave: 'text-[#fbbf24]', coin: 'bg-[linear-gradient(135deg,#fbbf24,#d97706)]' },
]
const fmt = (n) => n.toLocaleString('ru-RU').replace(/ /g, ' ')

// ---------- касса ----------
const AMOUNTS = { in: [4200, 7500, 2800, 5300, 9600], out: [1800, 3500, 2200, 4100, 1200] }
const totals = reactive({ in: 128400, out: 74300 })
const shown = reactive({ in: 128400, out: 74300 })
const balance = ref(54100)
const coins = reactive([])
let coinId = 1
let n = 0
const NOTE_CLS = 'absolute top-1/2 z-[2] flex h-8 w-[58px] -translate-y-1/2 items-center justify-center rounded-md border border-white/60 text-[10px] font-bold text-white shadow-[0_6px_14px_rgba(0,0,0,.25)] sm:h-[42px] sm:w-[84px] sm:text-[13px]'
const lastOp = ref(null)
const LABELS = { in: u.lblIn, out: u.lblOut }
const bump = ref(false)
let raf = 0
const tween = () => {
  let moving = false
  for (const k of ['in', 'out']) {
    const d = totals[k] - shown[k]
    if (Math.abs(d) > 0.5) { shown[k] += d * 0.12; moving = true } else shown[k] = totals[k]
  }
  balance.value = shown.in - shown.out
  if (moving) raf = requestAnimationFrame(tween)
}
const drop = () => {
  const side = n % 5 === 2 || n % 5 === 4 ? 'out' : 'in'
  const amount = AMOUNTS[side][n % AMOUNTS[side].length]
  const c = { id: coinId++, side, amount, label: LABELS[side][n % 3], short: amount >= 1000 ? (amount / 1000).toString().replace('.', ',') + 'k' : String(amount) }
  n++
  coins.push(c)
  setTimeout(() => {
    lastOp.value = c
    totals[side] += amount
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(tween)
    bump.value = true
    setTimeout(() => { bump.value = false }, 420)
  }, side === 'in' ? 1250 : 150)
  setTimeout(() => { const i = coins.findIndex((x) => x.id === c.id); if (i > -1) coins.splice(i, 1) }, 1550)
}

// ---------- вкладки ----------
const tab = ref(0)
const paused = ref(false)
let dropTimer = null
let tabTimer = null
let resume = null
const pick = (i) => {
  tab.value = i
  paused.value = true
  clearInterval(tabTimer)
  clearTimeout(resume)
  resume = setTimeout(() => { paused.value = false; startTabs() }, 12000)
}
const startTabs = () => { tabTimer = setInterval(() => { tab.value = (tab.value + 1) % 5 }, 5000) }

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { balance.value = totals.in - totals.out; return }
  setTimeout(drop, 600)
  dropTimer = setInterval(drop, 1500)
  startTabs()
})
onBeforeUnmount(() => { clearInterval(dropTimer); clearInterval(tabTimer); clearTimeout(resume); cancelAnimationFrame(raf) })
</script>
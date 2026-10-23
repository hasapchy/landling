<!-- src/pages/PrivacyPage.vue — страница /privacy -->
<template>
    <main class="mx-auto w-full max-w-[820px] px-6 sm:px-8 pt-28 sm:pt-36 pb-16 sm:pb-24">
        <a href="/" class="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-[#054C86] transition-colors">
            <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            {{ t('privacy.back') }}
        </a>

        <h1 class="mt-6 text-3xl sm:text-5xl font-display font-bold leading-tight
                   bg-clip-text text-transparent bg-[linear-gradient(90deg,#054C86,#065A9D)] [-webkit-text-fill-color:transparent]
                   dark:bg-[linear-gradient(90deg,#2aa4ff,#0392FF)]">
            {{ t('privacy.title') }}
        </h1>
        <p class="mt-3 text-sm text-black/50">{{ t('privacy.updated') }}</p>

        <section v-for="(s, i) in sections" :key="i" class="mt-9">
            <h2 class="text-lg sm:text-xl font-bold text-black">{{ s.title }}</h2>
            <p v-if="s.intro" class="mt-3 text-base leading-relaxed text-black/70">{{ s.intro }}</p>
            <ul v-if="s.items.length" class="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-black/70 marker:text-[#0392FF]">
                <li v-for="(item, j) in s.items" :key="j">{{ item }}</li>
            </ul>
            <p v-if="s.text" class="mt-3 whitespace-pre-line text-base leading-relaxed text-black/70">{{ s.text }}</p>
        </section>
    </main>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

// заголовок вкладки браузера
watchEffect(() => {
    document.title = `${t('privacy.title')} — HasApp`
})

// разделы берём из языковых файлов: заголовок, вводная строка, список, текст
const sections = computed(() =>
    tm('privacy.sections').map((s) => ({
        title: rt(s.title),
        intro: s.intro ? rt(s.intro) : '',
        items: (s.items || []).map((x) => rt(x)),
        text: s.text ? rt(s.text) : '',
    }))
)
</script>

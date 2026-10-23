<template>
    <div class="flex flex-wrap gap-3" :class="align === 'center' ? 'justify-center' : 'justify-start'">
        <component :is="isLive(s.href) ? 'a' : 'span'" v-for="s in stores" :key="s.name"
            v-bind="isLive(s.href) ? { href: s.href, target: '_blank', rel: 'noopener' } : { 'aria-disabled': 'true' }"
            class="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] text-[15px] font-semibold transition-all duration-300"
            :class="[
                variant === 'glass' ? 'px-5 py-3 sm:px-6 sm:py-3.5' : 'px-5 py-2.5',
                variant === 'glass'
                    ? 'border-[#9db8f2] bg-gradient-to-b from-white to-[#e6eeff] text-[#1d56c4] shadow-[0_6px_18px_rgba(42,111,232,0.18)] dark:border-[#3d8bff]/70 dark:from-[#0b3fb0]/35 dark:to-[#06236a]/35 dark:text-white dark:shadow-[0_0_22px_rgba(40,120,255,0.4),inset_0_0_14px_rgba(60,140,255,0.25)]'
                    : tone === 'onDark'
                    ? 'border-white/45 bg-white/10 text-white backdrop-blur-sm'
                    : 'border-[#054C86]/35 bg-white/60 text-[#054C86] dark:border-white/30 dark:bg-[#0392FF]/10 dark:text-white',
                isLive(s.href)
                    ? (variant === 'glass' ? 'hover:border-[#1d6dff] dark:hover:border-[#3dd6ff]' : tone === 'onDark' ? 'hover:bg-white/20 hover:border-white' : 'hover:border-[#0392FF] hover:text-[#0392FF] dark:hover:border-[#5db8ff] dark:hover:text-[#5db8ff]')
                    : 'cursor-default'
            ]">
            <svg :viewBox="s.viewBox" fill="currentColor" class="h-5 w-5 shrink-0" aria-hidden="true" v-html="s.icon"></svg>
            {{ s.name }}
            <span v-if="!isLive(s.href)" class="text-[13px] font-normal" :class="tone === 'onDark' ? 'text-white/65' : 'text-[#7a8ca8] dark:text-white/55'">· {{ t('cases.soon').toLowerCase() }}</span>
        </component>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { CONTACTS } from '@/config/contacts'

defineProps({
    align: { type: String, default: 'left' },
    // 'onDark' — для кнопок на синем фоне (белые контуры)
    tone: { type: String, default: 'auto' },
    // 'glass' — крупные кнопки для баннера приложения
    variant: { type: String, default: 'plain' },
})

const { t } = useI18n()

// ссылка считается рабочей, если это не заглушка '#'
const isLive = (href) => !!href && href !== '#'

const stores = [
    {
        name: 'App Store',
        href: CONTACTS.appStore,
        viewBox: '0 0 24 24',
        icon: '<path d="M22,17a1,1,0,0,1-1,1H19.48l1.39,2.51a1,1,0,0,1-.38,1.36A1,1,0,0,1,20,22a1,1,0,0,1-.87-.51L13.42,11.21a1,1,0,0,1,1.74-1L18.37,16H21A1,1,0,0,1,22,17Zm-9-1H7.92l7-12.51a1,1,0,0,0-1.74-1L12,4.54l-1.13-2a1,1,0,1,0-1.74,1L10.86,6.6,5.63,16H3a1,1,0,0,0,0,2H4.52L3.13,20.51a1,1,0,0,0,.38,1.36A1,1,0,0,0,4,22a1,1,0,0,0,.87-.51L6.81,18H13a1,1,0,0,0,0-2Z"/>',
    },
    {
        name: 'Google Play',
        href: CONTACTS.googlePlay,
        viewBox: '0 0 32 32',
        icon: '<path d="M17,14.5l4.2-4.5L4.9,1.2C4.8,1.1,4.6,1.1,4.3,1L17,14.5z"/><path d="M23,21l5.9-3.2c0.7-0.4,1.1-1,1.1-1.8s-0.4-1.5-1.1-1.8L23,11l-4.7,5L23,21z"/><path d="M2.4,1.9C2.1,2.2,2,2.6,2,3V29c0,0.4,0.1,0.8,0.4,1.2L15.6,16L2.4,1.9z"/><path d="M17,17.5L4.3,31c0.2,0,0.4-0.1,0.6-0.2L21.2,22L17,17.5z"/>',
    },
]
</script>
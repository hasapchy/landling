<template>
    <footer class="relative w-full bg-white border-t border-black/5 px-6 sm:px-8 pt-12 sm:pt-16 pb-8 overflow-hidden">
        <div class="absolute left-1/2 -translate-x-1/2 -bottom-[180px] sm:-bottom-[260px] md:-bottom-[340px]
              w-[500px] h-[360px] sm:w-[800px] sm:h-[560px] md:w-[1100px] md:h-[760px]
              rounded-full pointer-events-none
              bg-[radial-gradient(ellipse_at_center,rgba(3,146,255,0.35)_0%,rgba(5,76,134,0.15)_40%,transparent_70%)]
              blur-3xl"></div>
        <div class="mx-auto max-w-[1320px] flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">

            <!-- лого + описание -->
            <div class="max-w-full md:max-w-xs">
                <a href="#" class="flex items-center gap-2">
                    <img src="/images/logo.png" alt="HasApp" class="h-7 sm:h-8 w-auto" />
                </a>
                <p class="mt-4 text-sm sm:text-base text-black/60 leading-relaxed">
                    {{ t('footer.description') }}
                </p>
            </div>

            <!-- колонки ссылок -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
                <div>
                    <p class="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#054C86]">{{ t('footer.pages')
                        }}</p>
                    <ul class="mt-4 flex flex-col gap-2.5 sm:gap-3">
                        <li v-for="link in pageLinks" :key="link.label">
                            <a :href="link.href"
                                class="inline-block text-sm sm:text-base text-black/70 transition-transform duration-200 ease-in-out hover:translate-x-1.5 hover:text-[#054C86]">
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#054C86]">{{
                        t('footer.resources') }}</p>
                    <ul class="mt-4 flex flex-col gap-2.5 sm:gap-3">
                        <li v-for="link in resourceLinks" :key="link.label">
                            <a :href="link.href"
                                class="inline-block text-sm sm:text-base text-black/70 transition-transform duration-200 ease-in-out hover:translate-x-1.5 hover:text-[#054C86]">
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- в шаблоне вместо колонки Social Media со списком -->
                <div class="col-span-2 sm:col-span-1">
                    <p class="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#054C86]">{{
                        t('footer.socialMedia') }}</p>
                    <div class="mt-4 flex items-center gap-4 sm:gap-5">
                        <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank"
                            rel="noopener"
                            class="group relative inline-flex transition-transform duration-200 ease-in-out ">

                            <!-- обычная (серая) иконка -->
                            <span class="block [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-10 sm:[&_svg]:w-10"
                                v-html="social.svg"></span>

                            <!-- градиентная копия: на мобильных активна всегда, на md+ только при hover -->
                            <span class="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300
                 [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-10 sm:[&_svg]:w-10 [&_path]:!fill-[url(#social-gradient)]"
                                v-html="social.svg"></span>
                        </a>
                    </div>

                </div>
            </div>
        </div>

        <div class="mx-auto max-w-[1320px] mt-10 sm:mt-14 pt-6 border-t border-black/5">
            <p class="text-xs sm:text-sm text-black/50">
                {{ t('footer.copyright') }}
            </p>
        </div>
        <!-- градиент для соц-иконок при hover -->
        <svg width="0" height="0" class="absolute">
            <defs>
                <linearGradient id="social-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0392FF" />
                    <stop offset="100%" stop-color="#054C86" />
                </linearGradient>
            </defs>
        </svg>
    </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const pageLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
]

const resourceLinks = [
    { label: 'Changelog', href: '#' },
    { label: 'Licenses', href: '#' },
    { label: 'Style Guide', href: '#' },
]

const socialLinks = [
    {
        name: 'Instagram',
        href: '#',
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0C31.0457 2.57703e-07 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 2.5772e-07 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM13.5713 8.57227C10.8101 8.57242 8.57144 10.8111 8.57129 13.5723V27.1436C8.57129 29.9049 10.81 32.1434 13.5713 32.1436H27.1426C29.904 32.1436 32.1426 29.905 32.1426 27.1436V13.5723C32.1424 10.811 29.9039 8.57227 27.1426 8.57227H13.5713ZM27.1426 10.5723C28.7993 10.5723 30.1424 11.9155 30.1426 13.5723V27.1436C30.1426 28.8004 28.7994 30.1436 27.1426 30.1436H13.5713C11.9146 30.1434 10.5713 28.8003 10.5713 27.1436V13.5723C10.5714 11.9156 11.9147 10.5724 13.5713 10.5723H27.1426ZM20.3574 14.2871C17.0044 14.2872 14.2862 17.0054 14.2861 20.3584C14.2863 23.7114 17.0044 26.4296 20.3574 26.4297C23.7104 26.4295 26.4286 23.7113 26.4287 20.3584C26.4286 17.0054 23.7104 14.2873 20.3574 14.2871ZM20.3574 16.2871C22.6058 16.2873 24.4286 18.11 24.4287 20.3584C24.4286 22.6068 22.6058 24.4295 20.3574 24.4297C18.109 24.4296 16.2863 22.6068 16.2861 20.3584C16.2862 18.1099 18.1089 16.2872 20.3574 16.2871ZM27.1426 12.8584C26.3538 12.8586 25.7148 13.4983 25.7148 14.2871C25.715 15.0758 26.3539 15.7156 27.1426 15.7158C27.9315 15.7158 28.5711 15.076 28.5713 14.2871C28.5713 13.4981 27.9316 12.8584 27.1426 12.8584Z" fill="#9CA4AA"/>
</svg>`
    },
    {
        name: 'LinkedIn',
        href: '#',
        svg: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0ZM8 20H11V10.5H8V20ZM18.0615 10C16.8499 10 15.7939 10.8246 15.5 12V10.5H12.5V20H16V14.5C16 13.6716 16.6716 13 17.5 13C18.3284 13 19 13.6716 19 14.5V20H22V13.3691C21.9999 11.5085 20.4915 10.0001 18.6309 10H18.0615ZM9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6Z" fill="#9CA4AA"/>
</svg>`
    },
    {
        name: 'Telegram',
        href: '#',
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM30.0676 13.5848C30.4374 12.013 29.6977 11.4578 28.8656 11.735L10.9261 18.6703C9.724 19.1326 9.72417 19.8723 10.7413 20.1498L15.3646 21.6292L25.9985 14.9715C26.4608 14.6942 26.9231 14.8789 26.5536 15.1562L17.9541 22.924L17.5838 27.64C17.9537 27.64 18.1389 27.4552 18.4163 27.1777L20.6356 25.0504L25.1668 28.3797C25.9064 28.7494 26.4614 28.5646 26.6463 27.64L30.0676 13.5848Z" fill="#9CA4AA"/>
</svg>`
    },
]
</script>
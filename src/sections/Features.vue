<template>
  <section id="features"
    class="relative overflow-hidden text-center pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 pb-10 sm:pb-12 md:pb-15 w-full max-w-[1440px] mx-auto">

    <div ref="headingRef" class="relative z-[2] flex flex-col items-center gap-4 sm:gap-5 md:gap-6
           transition-all duration-700 ease-out"
      :class="headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
      <LabelBadge>
        <template #icon>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M14.2328 11.0928C16.2557 9.0699 16.2557 5.7901 14.2328 3.76718C12.2099 1.74427 8.9301 1.74427 6.90721 3.76718C5.564 5.11039 5.11268 7.00774 5.55324 8.72332C5.6243 9 5.56119 9.29925 5.35919 9.5013L2.57512 12.2853C2.33669 12.5238 2.21956 12.8576 2.2568 13.1928L2.43085 14.7592C2.4494 14.9263 2.52425 15.082 2.64306 15.2008L2.79922 15.3569C2.91804 15.4757 3.07376 15.5506 3.24076 15.5692L4.8072 15.7432C5.14234 15.7804 5.47623 15.6633 5.71467 15.4249L6.24719 14.8924L4.93757 13.597C4.7167 13.3786 4.71474 13.0225 4.9332 12.8016C5.15166 12.5807 5.50781 12.5788 5.72869 12.7972L7.0427 14.0968L8.49893 12.6406C8.70098 12.4386 9 12.3757 9.27668 12.4468C10.9922 12.8873 12.8896 12.436 14.2328 11.0928ZM9 5.625C9.93193 4.69301 11.4431 4.69301 12.375 5.625C13.3071 6.55699 13.3071 8.06807 12.375 9C11.4431 9.93205 9.93193 9.93205 9 9C8.06795 8.06807 8.06795 6.55699 9 5.625Z" />
          </svg>
        </template>
        {{ t('features.badge') }}
      </LabelBadge>

      <h2 class="max-w-[90%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl font-display font-bold leading-tight
       text-3xl sm:text-4xl md:text-6xl lg:text-7xl
       bg-clip-text text-transparent
       bg-[linear-gradient(90deg,#054C86,#065A9D)]
       [-webkit-text-fill-color:transparent]">
        {{ t('features.headline') }}
      </h2>

      <p
        class="max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl text-black/70 text-base sm:text-lg md:text-xl leading-[1.3] sm:leading-[1.2]">
        {{ t('features.description') }}
      </p>
    </div>

    <!-- ===== 4 блока функций, чередование сторон ===== -->
    <div class="mt-12 sm:mt-16 md:mt-24 flex flex-col gap-12 sm:gap-16 md:gap-24">
      <div v-for="(feature, index) in features" :key="feature.title" :ref="el => setItemRef(el, index)" class="grid grid-cols-1 md:grid-cols-2 gap-0 sm:gap-1 md:gap-16 items-center text-center md:text-left
                     transition-all duration-700 ease-out"
        :class="visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
        <!-- текстовая колонка -->
        <div class="flex flex-col items-center text-center gap-4 sm:gap-5 md:items-start md:text-left md:gap-6"
          :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
          <div class="inline-flex items-center gap-2.5 rounded-full bg-[#054C86]/10 pl-3 pr-4 py-1.5">
            <span class="flex h-4 w-4 shrink-0 items-center justify-center text-[#054C86]">
              <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" v-html="feature.icon"></svg>
            </span>
            <span class="text-xs font-bold uppercase tracking-wider
         bg-clip-text text-transparent
         bg-[linear-gradient(180deg,#054C86,#065A9D)]
         [-webkit-text-fill-color:transparent]">
              {{ feature.label }}
            </span>
          </div>

          <h3 class="max-w-lg font-display font-bold leading-tight text-2xl sm:text-3xl md:text-4xl
       bg-clip-text text-transparent
       bg-[linear-gradient(90deg,#054C86,#065A9D)]
       [-webkit-text-fill-color:transparent]">
            {{ feature.title }}{{ feature.titleAccent }}
          </h3>

          <p class="max-w-md text-black/70 text-base sm:text-lg leading-relaxed">
            {{ feature.subtitle }}
          </p>
        </div>

        <!-- картинка через твой GlowCard, карусель + драг/свайп + открытие в лайтбоксе -->
        <div class="relative -mt-8 sm:-mt-10 md:mt-0" :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
          @mouseenter="pauseCarousel(index)"
          @mouseleave="onPointerLeave(index)"
          @pointerdown="onPointerDown(index, $event)"
          @pointermove="onPointerMove(index, $event)"
          @pointerup="onPointerUp(index, $event)"
          @pointercancel="onPointerUp(index, $event)"
          @dragstart.prevent
          :style="{ touchAction: 'pan-y', userSelect: 'none', cursor: dragState[index].active ? 'grabbing' : 'grab' }">

          <!-- сами слои картинок, кроссфейд друг на друге -->
          <div class="relative" style="-webkit-user-drag: none;">
            <template v-for="(img, imgIndex) in feature.images" :key="img">
              <div
                class="transition-opacity duration-700 ease-in-out cursor-zoom-in"
                :class="imgIndex === activeSlide[index] ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'"
                draggable="false"
                style="-webkit-user-drag: none;">
                <GlowCard :src="img" :alt="feature.title" :fade="false" grid />
              </div>
            </template>
          </div>

          <!-- точки-индикаторы, только если картинок больше одной -->
          <div v-if="feature.images.length > 1"
            class="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            <button v-for="(img, dotIndex) in feature.images" :key="'dot-' + dotIndex" type="button"
              @click="goToSlide(index, dotIndex)"
              @pointerdown.stop
              class="h-1.5 rounded-full transition-all duration-300"
              :class="dotIndex === activeSlide[index]
                ? 'w-6 bg-[#054C86]'
                : 'w-1.5 bg-[#054C86]/25 hover:bg-[#054C86]/45'"
              :aria-label="`Слайд ${dotIndex + 1}`" />
          </div>
        </div>
      </div>
    </div>

    <!-- ===== лайтбокс: открытие картинки на весь экран, prev/next только внутри своей группы ===== -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div v-if="lightbox.open" class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          @click.self="closeLightbox">
          <div class="absolute inset-0 bg-black/85 backdrop-blur-sm"></div>

          <!-- закрыть -->
          <button type="button" @click="closeLightbox"
            class="absolute top-4 right-4 sm:top-6 sm:right-6 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
            <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>

          <!-- назад -->
          <button v-if="lightboxTotal > 1" type="button" @click="lightboxPrev"
            class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[2] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Предыдущее фото">
            <svg viewBox="0 0 16 16" fill="none" class="h-5 w-5">
              <path d="M10 3l-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>

          <!-- вперёд -->
          <button v-if="lightboxTotal > 1" type="button" @click="lightboxNext"
            class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-[2] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Следующее фото">
            <svg viewBox="0 0 16 16" fill="none" class="h-5 w-5">
              <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>

          <!-- картинка -->
          <div class="relative z-[1] max-w-[92vw] max-h-[86vh] flex flex-col items-center gap-4" @click.stop>
            <img :src="lightboxImage" :alt="lightboxAlt"
              class="max-w-[92vw] max-h-[78vh] object-contain rounded-2xl shadow-2xl select-none" draggable="false" />

            <!-- точки внутри лайтбокса, переключают только эту группу -->
            <div v-if="lightboxTotal > 1" class="flex items-center gap-2">
              <button v-for="(img, dotIndex) in lightboxImages" :key="'lb-dot-' + dotIndex" type="button"
                @click="lightbox.slideIndex = dotIndex"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="dotIndex === lightbox.slideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'"
                :aria-label="`Фото ${dotIndex + 1}`" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LabelBadge from '@/components/LabelBadge.vue'
import GlowCard from '@/components/GlowCard.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t, tm } = useI18n()

const icons = {
  crm: '<g clip-path="url(#clip0_65_154)"><path d="M15.1366 6.60831V4.23665C15.4505 4.08989 15.7163 3.85712 15.9032 3.56535C16.0901 3.27359 16.1904 2.9348 16.1925 2.58831V2.53248C16.1912 2.04812 15.9982 1.58397 15.6558 1.2414C15.3134 0.898833 14.8493 0.705685 14.365 0.704145H14.3091C13.8249 0.705684 13.361 0.898717 13.0186 1.24111C12.6762 1.5835 12.4832 2.04744 12.4816 2.53165V2.58748C12.4832 2.93195 12.5819 3.269 12.7665 3.55985C12.951 3.85071 13.2139 4.08357 13.525 4.23165L13.5358 4.23665V6.61331C12.629 6.75186 11.7752 7.12857 11.0616 7.70498L11.0716 7.69665L4.54831 2.61748C4.67251 2.15219 4.63147 1.65823 4.4322 1.21982C4.23294 0.781405 3.88777 0.42568 3.45556 0.213295C3.02334 0.000909393 2.53084 -0.0549858 2.06203 0.0551388C1.59321 0.165264 1.17711 0.43459 0.88466 0.817198C0.592211 1.19981 0.441525 1.67201 0.458294 2.15329C0.475062 2.63457 0.658247 3.09514 0.976616 3.45647C1.29498 3.8178 1.72882 4.05751 2.20417 4.13474C2.67951 4.21197 3.16693 4.12193 3.58331 3.87998L3.57331 3.88498L9.98747 8.87748C9.42045 9.7276 9.11933 10.7273 9.12247 11.7491C9.1211 12.8261 9.45518 13.8767 10.0783 14.755L10.0675 14.7383L8.11581 16.6908C7.95957 16.6404 7.79664 16.6137 7.63248 16.6116H7.63081C7.29573 16.6116 6.96818 16.711 6.68958 16.8972C6.41098 17.0833 6.19383 17.3479 6.0656 17.6575C5.93738 17.9671 5.90382 18.3077 5.96919 18.6363C6.03456 18.965 6.19592 19.2668 6.43285 19.5038C6.66979 19.7407 6.97166 19.9021 7.30029 19.9674C7.62893 20.0328 7.96957 19.9992 8.27914 19.871C8.58871 19.7428 8.8533 19.5256 9.03946 19.247C9.22561 18.9684 9.32497 18.6409 9.32497 18.3058C9.32272 18.1372 9.29461 17.97 9.24164 17.81L9.24581 17.8216L11.1766 15.8908C11.806 16.371 12.5365 16.7014 13.3128 16.8568C14.089 17.0121 14.8904 16.9885 15.6561 16.7875C16.4218 16.5865 17.1316 16.2136 17.7314 15.6971C18.3313 15.1805 18.8055 14.534 19.1179 13.8066C19.4303 13.0792 19.5727 12.2902 19.5343 11.4995C19.4958 10.7088 19.2776 9.93731 18.8961 9.24366C18.5147 8.55001 17.9801 7.95248 17.3329 7.49654C16.6858 7.0406 15.9432 6.73825 15.1616 6.61248L15.1316 6.60831H15.1366ZM14.3333 14.4233C13.8053 14.4218 13.2895 14.2639 12.8511 13.9695C12.4128 13.675 12.0715 13.2573 11.8704 12.7691C11.6694 12.2808 11.6175 11.7439 11.7213 11.2262C11.8252 10.7084 12.0802 10.2331 12.454 9.86015C12.8279 9.48723 13.3038 9.23345 13.8218 9.13088C14.3398 9.0283 14.8766 9.08153 15.3644 9.28383C15.8521 9.48614 16.269 9.82844 16.5623 10.2675C16.8557 10.7066 17.0123 11.2228 17.0125 11.7508V11.7525C17.0126 12.1035 16.9435 12.451 16.8093 12.7753C16.675 13.0996 16.4781 13.3943 16.23 13.6425C15.9818 13.8907 15.6871 14.0875 15.3628 14.2218C15.0385 14.356 14.691 14.4251 14.34 14.425L14.3333 14.4233Z"/></g><defs><clipPath id="clip0_65_154"><rect width="20" height="20"/></clipPath></defs>',
  inventory: '<g clip-path="url(#clip0_66_156)"><mask id="mask0_66_156" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20"><path d="M20 0H0V20H20V0Z" fill="white"/></mask><g mask="url(#mask0_66_156)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.833333 0C1.29357 0 1.66667 0.373096 1.66667 0.833333V6.66667H4.16667C3.70643 6.66667 3.33333 6.29357 3.33333 5.83333V4.16667C3.33333 3.70643 3.70643 3.33333 4.16667 3.33333H7.5C7.96023 3.33333 8.33333 3.70643 8.33333 4.16667V5.83333C8.33333 6.29357 7.96023 6.66667 7.5 6.66667H10.8333C10.3731 6.66667 10 6.29357 10 5.83333V2.5C10 2.03977 10.3731 1.66667 10.8333 1.66667H15.8333C16.2936 1.66667 16.6667 2.03977 16.6667 2.5V5.83333C16.6667 6.29357 16.2936 6.66667 15.8333 6.66667H18.3333V0.833333C18.3333 0.373096 18.7064 0 19.1667 0C19.6269 0 20 0.373096 20 0.833333V19.1667C20 19.6269 19.6269 20 19.1667 20C18.7064 20 18.3333 19.6269 18.3333 19.1667V18.3333H1.66667V19.1667C1.66667 19.6269 1.29357 20 0.833333 20C0.373096 20 0 19.6269 0 19.1667V0.833333C0 0.373096 0.373096 0 0.833333 0ZM18.3333 16.6667H15.8333C16.2936 16.6667 16.6667 16.2936 16.6667 15.8333V12.5C16.6667 12.0397 16.2936 11.6667 15.8333 11.6667H11.6667C11.2064 11.6667 10.8333 12.0397 10.8333 12.5V15.8333C10.8333 16.2936 11.2064 16.6667 11.6667 16.6667H8.33333C8.79358 16.6667 9.16667 16.2936 9.16667 15.8333V10.8333C9.16667 10.3731 8.79358 10 8.33333 10H4.16667C3.70643 10 3.33333 10.3731 3.33333 10.8333V15.8333C3.33333 16.2936 3.70643 16.6667 4.16667 16.6667H1.66667V8.33333H18.3333V16.6667Z"/></g></g><defs><clipPath id="clip0_66_156"><rect width="20" height="20" fill="white"/></clipPath></defs>',
  money: '<path d="M11.721 3.62164L14.1492 4.26605C14.2122 4.27895 14.2639 4.3307 14.2786 4.39438L14.9186 6.82242C14.9359 6.89375 14.9982 6.94379 15.0712 6.94379C15.1448 6.94379 15.2071 6.89371 15.2238 6.82242L15.8645 4.39438C15.8784 4.3307 15.9302 4.27895 15.9932 4.26605L18.4215 3.62164C18.4925 3.60836 18.5429 3.54504 18.5429 3.47207C18.5429 3.39844 18.4925 3.33645 18.4215 3.32215L15.9932 2.67812C15.9302 2.66453 15.8784 2.61348 15.8645 2.5498L15.2237 0.121719C15.2071 0.0510937 15.1448 0 15.0712 0C14.9982 0 14.9359 0.0510937 14.9186 0.121719L14.2786 2.54977C14.2639 2.61344 14.2122 2.66449 14.1492 2.67809L11.721 3.32215C11.6493 3.33641 11.5996 3.39844 11.5996 3.47207C11.5996 3.54504 11.6493 3.60836 11.721 3.62164Z"/><path d="M3.18795 6.84777L3.64498 8.58266C3.6576 8.63406 3.70232 8.66957 3.75439 8.66957C3.80682 8.66957 3.85127 8.6341 3.86354 8.58266L4.32088 6.84777C4.33049 6.80203 4.36799 6.76523 4.41342 6.75559L6.14857 6.29594C6.19932 6.28535 6.23549 6.23957 6.23549 6.18781C6.23549 6.13605 6.19932 6.09164 6.14857 6.08102L4.41342 5.6207C4.36795 5.61074 4.33049 5.57492 4.32088 5.52914L3.86354 3.79328C3.85127 3.74289 3.80682 3.70703 3.75439 3.70703C3.70232 3.70703 3.6576 3.74285 3.64498 3.79328L3.18795 5.52914C3.17697 5.57492 3.14084 5.61074 3.09506 5.6207L1.36018 6.08102C1.30846 6.09164 1.27295 6.13605 1.27295 6.18781C1.27295 6.23953 1.30842 6.28531 1.36018 6.29594L3.09506 6.75559C3.14088 6.76523 3.17697 6.80203 3.18795 6.84777Z"/><path d="M1.48877 14.3594V15.9221C1.48877 16.1798 1.54053 16.4309 1.64369 16.6803C1.74682 16.9291 1.90139 17.1761 2.10732 17.4176C2.19424 17.5187 2.29174 17.6189 2.39619 17.7174V15.2164C2.32787 15.1653 2.26154 15.1139 2.19689 15.0618C1.92787 14.8423 1.6901 14.6078 1.48877 14.3594Z"/><path d="M3.12207 18.2844C3.36418 18.4432 3.62953 18.5955 3.9177 18.738C4.04141 18.7998 4.17039 18.8581 4.30145 18.9152V16.2559C3.87793 16.0848 3.48324 15.8948 3.12207 15.6875V18.2844Z"/><path d="M5.02715 16.5234V19.1883H4.98438C5.50141 19.373 6.06223 19.5313 6.65988 19.6576V16.95C6.27246 16.8721 5.89707 16.7825 5.53758 16.6804C5.36383 16.6305 5.19332 16.5785 5.02715 16.5234Z"/><path d="M7.38672 19.7858C8.13359 19.9065 8.92359 19.9814 9.74543 19.9981V17.2742C8.92789 17.2583 8.13793 17.1903 7.38672 17.0742V19.7858Z"/><path d="M10.4717 19.9966C11.3274 19.98 12.1479 19.8991 12.9211 19.7701V17.0625C12.1436 17.1859 11.3221 17.2598 10.4717 17.2764V19.9966Z"/><path d="M13.6465 19.6359C13.9324 19.5736 14.2116 19.5056 14.4796 19.4293C14.7575 19.3504 15.0241 19.2641 15.2802 19.1713V16.4922C14.7681 16.665 14.2216 16.8129 13.6465 16.9316V19.6359Z"/><path d="M16.0059 16.2204V18.8783C16.4463 18.6793 16.8416 18.4604 17.1852 18.2249V15.6367C17.0055 15.7429 16.8171 15.8453 16.6208 15.9431C16.4238 16.0403 16.2181 16.1325 16.0059 16.2204Z"/><path d="M17.8682 15.1779H17.9112V17.6302C18.2177 17.3227 18.4399 17.002 18.5726 16.6796C18.6761 16.4302 18.7278 16.1792 18.7278 15.9214V14.3594C18.7059 14.3866 18.684 14.4138 18.6607 14.4406C18.4366 14.703 18.1693 14.948 17.8682 15.1779Z"/><path d="M18.5721 12.7541C18.6756 12.5047 18.7273 12.254 18.7273 11.9966C18.7273 11.7393 18.6756 11.4886 18.5721 11.2392C18.4692 10.9901 18.3147 10.743 18.1084 10.5019C17.6972 10.0194 17.079 9.56367 16.2983 9.17828C14.7381 8.40489 12.5395 7.91274 10.1081 7.91407C8.51256 7.91407 7.01709 8.1243 5.73658 8.48879C4.45576 8.85262 3.39049 9.37301 2.65557 9.97297C2.16439 10.372 1.82346 10.8037 1.64369 11.2392C1.54057 11.4886 1.48877 11.7393 1.48877 11.9967C1.48877 12.2541 1.54053 12.5048 1.64369 12.7542C1.74682 13.0029 1.90139 13.25 2.10732 13.4911C2.51924 13.9743 3.13744 14.4293 3.91748 14.8151C5.47756 15.5888 7.67674 16.0807 10.1081 16.0797C11.704 16.0797 13.1993 15.8691 14.4794 15.5043C15.7603 15.1405 16.8262 14.6204 17.5605 14.0208C18.0514 13.6211 18.393 13.1893 18.5721 12.7541ZM13.0196 12.8878C12.9065 13.0921 12.7263 13.2662 12.4813 13.4105C12.2309 13.5577 11.9174 13.6685 11.5413 13.7421C11.3757 13.7746 11.2009 13.7965 11.0233 13.8145L11.0956 14.6943H9.6901L9.68045 13.8317C9.29857 13.8082 8.9349 13.7634 8.59529 13.6938C8.08174 13.5883 7.44963 13.1757 7.44963 13.1757C7.39541 13.1515 7.36256 13.1094 7.36041 13.063C7.35811 13.0166 7.38494 12.9701 7.43537 12.9376L8.10979 12.4925C8.18029 12.4461 8.28459 12.4378 8.36283 12.4716C8.36283 12.4716 8.82002 12.7572 9.17873 12.8268C9.54022 12.8958 9.90154 12.9309 10.2606 12.9309C10.7143 12.9303 11.0853 12.8732 11.3696 12.7605C11.6515 12.6477 11.7747 12.4772 11.7445 12.2491C11.7235 12.0889 11.6384 11.9652 11.4883 11.8753C11.3409 11.7861 11.1028 11.7314 10.7749 11.7075L9.7042 11.6484C9.07404 11.608 8.59545 11.4936 8.27111 11.3095C7.95256 11.128 7.81561 10.8614 7.85174 10.5172C7.87096 10.3327 7.94775 10.1722 8.08041 10.0336C8.21025 9.89801 8.37955 9.78489 8.58666 9.69403C8.79248 9.60449 9.02693 9.53684 9.29213 9.49239C9.40154 9.47379 9.51666 9.46188 9.63369 9.45028L9.62924 9.03637L10.6305 9.03371L10.664 9.43996C10.9059 9.45258 11.1374 9.47449 11.3553 9.50832C11.7282 9.56434 12.1431 9.73914 12.1431 9.73914C12.1946 9.75438 12.233 9.78125 12.2472 9.81313C12.2615 9.84594 12.2499 9.87778 12.2153 9.90098L11.7607 10.2088C11.7113 10.2419 11.6284 10.2512 11.5561 10.2297C11.5561 10.2297 11.2382 10.1006 10.9746 10.0608C10.7127 10.0211 10.4407 10.0018 10.156 10.0025C9.78506 10.0031 9.50998 10.0459 9.33139 10.1318C9.14998 10.2193 9.05678 10.3334 9.05299 10.477C9.04916 10.6087 9.11166 10.7109 9.244 10.7832C9.37666 10.8561 9.60166 10.9039 9.92158 10.9231L10.8192 10.9709C11.4883 11.0074 12.0108 11.1201 12.3901 11.3125C12.7794 11.5092 13.0176 11.805 13.1031 12.2106C13.1569 12.4633 13.129 12.6895 13.0196 12.8878ZM17.3828 12.3005L16.3321 12.5791C16.3042 12.5844 16.2817 12.6073 16.2757 12.6354L15.9984 13.6858C15.9912 13.7166 15.9646 13.7385 15.9328 13.7385C15.9009 13.7385 15.8738 13.7166 15.8665 13.6858L15.5892 12.6354C15.5826 12.6072 15.5607 12.5843 15.5328 12.5791L14.4821 12.3005C14.451 12.2941 14.4291 12.2666 14.4291 12.2355C14.4291 12.2036 14.451 12.1764 14.4821 12.1701L15.5328 11.8918C15.5607 11.8849 15.5826 11.864 15.5892 11.8361L15.8665 10.7848C15.8738 10.7536 15.9009 10.7321 15.9328 10.7321C15.9646 10.7321 15.9912 10.7536 15.9984 10.7848L16.2757 11.8361C16.2817 11.864 16.3042 11.8849 16.3321 11.8918L17.3828 12.1701C17.4133 12.1764 17.4358 12.2036 17.4358 12.2355C17.4358 12.2666 17.4133 12.2941 17.3828 12.3005Z"/>',
  security: '<g clip-path="url(#clip0_68_181)"><path d="M19.6875 7.6875C19.625 7.375 19.3125 7.1875 19 7.1875C18.0625 7.3125 17.1875 6.875 16.75 6.0625C16.3125 5.25 16.375 4.3125 16.9375 3.5625C17.125 3.3125 17.125 2.9375 16.875 2.75C15.75 1.6875 14.3125 0.875 12.8125 0.4375C12.5 0.375 12.1875 0.5 12.0625 0.8125C11.6875 1.6875 10.875 2.1875 10 2.1875C9.125 2.1875 8.25 1.625 7.9375 0.8125C7.8125 0.5 7.5 0.375 7.1875 0.4375C5.6875 0.875 4.25 1.6875 3.125 2.75C2.875 3 2.875 3.3125 3.0625 3.5625C3.625 4.3125 3.6875 5.25 3.25 6.0625C2.8125 6.875 1.9375 7.3125 1 7.1875C0.6875 7.125 0.375 7.375 0.3125 7.6875C0.125 8.4375 0 9.25 0 10C0 10.75 0.125 11.5625 0.3125 12.3125C0.375 12.625 0.6875 12.8125 1 12.8125C1.875 12.6875 2.75 13.125 3.1875 13.9375C3.625 14.75 3.5625 15.6875 3 16.4375C2.8125 16.6875 2.8125 17.0625 3.0625 17.25C4.1875 18.3125 5.625 19.125 7.125 19.5625C7.4375 19.625 7.75 19.5 7.875 19.1875C8.25 18.3125 9.0625 17.8125 9.9375 17.8125C10.8125 17.8125 11.6875 18.375 12 19.1875C12.125 19.4375 12.3125 19.5625 12.5625 19.5625C12.625 19.5625 12.6875 19.5625 12.75 19.5625C14.25 19.125 15.625 18.3125 16.8125 17.25C17.0625 17 17.0625 16.6875 16.875 16.4375C16.3125 15.6875 16.25 14.75 16.6875 13.9375C17.125 13.125 18 12.6875 18.9375 12.8125C19.25 12.875 19.5625 12.625 19.625 12.3125C19.8125 11.5 19.9375 10.75 19.9375 10C19.9375 9.25 19.875 8.4375 19.6875 7.6875ZM10.25 15.5625C10.1875 15.625 10.0625 15.625 10 15.625C9.9375 15.625 9.8125 15.625 9.75 15.5625C7.5625 14.5625 5 12.75 5 7.25C5 7.0625 5.125 6.875 5.25 6.75C5.4375 6.625 5.625 6.625 5.8125 6.6875C7.1875 7.125 8.5625 6.75 9.5625 5.8125C9.8125 5.5625 10.1875 5.5625 10.4375 5.8125C11.4375 6.75 12.8125 7.125 14.1875 6.6875C14.375 6.625 14.5625 6.6875 14.75 6.75C14.9375 6.875 15 7.0625 15 7.25C15 12.75 12.4375 14.5625 10.25 15.5625Z"/></g><defs><clipPath id="clip0_68_181"><rect width="20" height="20"/></clipPath></defs>'
}

// по 1–3 картинки на каждый блок — карусель сама переключает их по кругу
const featureImages = {
  crm: [
    '/images/fea/features-1.jpg',
    '/images/fea/1.jpg',
  ],
  inventory: [
    '/images/fea/features-2.jpg',
    '/images/fea/2.jpg',
    '/images/fea/2-1.jpg',
  ],
  money: [
    '/images/fea/features-3.jpg',
    '/images/fea/3.jpg',
    '/images/fea/3-1.jpg',
  ],
  security: [
    '/images/fea/features-4.jpg',
    '/images/fea/4.jpg',
  ],
}

const iconKeys = ['crm', 'inventory', 'money', 'security']

const features = computed(() =>
  tm('features.items').map((item, i) => ({
    label: item.label,
    title: item.title,
    titleAccent: item.titleAccent,
    subtitle: item.subtitle,
    icon: icons[iconKeys[i]],
    images: featureImages[iconKeys[i]],
  }))
)

// ---- карусель ----
const activeSlide = reactive(iconKeys.map(() => 0))
const timers = []
const paused = reactive(iconKeys.map(() => false))
const SLIDE_INTERVAL = 2000
const DRAG_THRESHOLD = 50 // px — минимальный сдвиг, чтобы считать это свайпом

const dragState = reactive(iconKeys.map(() => ({ active: false, startX: 0, deltaX: 0 })))
const CLICK_THRESHOLD = 8 // px — если сдвиг меньше этого, считаем это кликом/тапом, а не свайпом

function startCarousel(index) {
  stopCarousel(index)
  timers[index] = setInterval(() => {
    if (paused[index]) return
    const total = features.value[index]?.images.length || 1
    if (total <= 1) return
    activeSlide[index] = (activeSlide[index] + 1) % total
  }, SLIDE_INTERVAL)
}

function stopCarousel(index) {
  if (timers[index]) {
    clearInterval(timers[index])
    timers[index] = null
  }
}

function pauseCarousel(index) {
  paused[index] = true
}

function resumeCarousel(index) {
  paused[index] = false
}

function goToSlide(index, slideIndex) {
  const total = features.value[index]?.images.length || 1
  activeSlide[index] = ((slideIndex % total) + total) % total
}

function nextSlide(index) {
  goToSlide(index, activeSlide[index] + 1)
}

function prevSlide(index) {
  goToSlide(index, activeSlide[index] - 1)
}

// ---- драг / свайп мышью и пальцем ----
function onPointerDown(index, e) {
  // клик по точке-индикатору — это не начало драга
  if (e.target.closest('button')) return

  pauseCarousel(index)
  dragState[index].active = true
  dragState[index].startX = e.clientX
  dragState[index].deltaX = 0
  e.currentTarget.setPointerCapture?.(e.pointerId)
}

function onPointerMove(index, e) {
  if (!dragState[index].active) return
  dragState[index].deltaX = e.clientX - dragState[index].startX
}

function onPointerUp(index, e) {
  if (!dragState[index].active) return
  const delta = dragState[index].deltaX
  const total = features.value[index]?.images.length || 1

  if (Math.abs(delta) > DRAG_THRESHOLD && total > 1) {
    // реальный свайп — переключаем слайд
    if (delta < 0) {
      nextSlide(index)
    } else {
      prevSlide(index)
    }
  } else if (Math.abs(delta) < CLICK_THRESHOLD) {
    // указатель почти не сдвинулся — это клик/тап, открываем лайтбокс
    // (setPointerCapture перенаправляет обычный @click на этот же контейнер,
    // поэтому открытие лайтбокса обрабатываем прямо здесь, а не через @click)
    openLightbox(index, activeSlide[index])
  }

  dragState[index].active = false
  dragState[index].deltaX = 0
  resumeCarousel(index)
}

function onPointerLeave(index) {
  if (dragState[index].active) {
    dragState[index].active = false
    dragState[index].deltaX = 0
  }
  resumeCarousel(index)
}

// ---- лайтбокс: открытие фото на весь экран, prev/next только внутри своего блока ----
const lightbox = reactive({ open: false, groupIndex: 0, slideIndex: 0 })

const lightboxImages = computed(() => features.value[lightbox.groupIndex]?.images || [])
const lightboxImage = computed(() => lightboxImages.value[lightbox.slideIndex])
const lightboxTotal = computed(() => lightboxImages.value.length)
const lightboxAlt = computed(() => features.value[lightbox.groupIndex]?.title || '')

function openLightbox(index, imgIndex) {
  lightbox.open = true
  lightbox.groupIndex = index
  lightbox.slideIndex = imgIndex
  pauseCarousel(index)
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.open = false
  resumeCarousel(lightbox.groupIndex)
  document.body.style.overflow = ''
}

function lightboxNext() {
  const total = lightboxTotal.value
  if (total <= 1) return
  lightbox.slideIndex = (lightbox.slideIndex + 1) % total
}

function lightboxPrev() {
  const total = lightboxTotal.value
  if (total <= 1) return
  lightbox.slideIndex = (lightbox.slideIndex - 1 + total) % total
}

function handleLightboxKeydown(e) {
  if (!lightbox.open) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') lightboxPrev()
  else if (e.key === 'ArrowRight') lightboxNext()
}

// ---- анимация появления при скролле ----
const { headingRef, headingVisible, setItemRef, visibleItems } = useScrollReveal()

onMounted(() => {
  iconKeys.forEach((_, index) => startCarousel(index))

  window.addEventListener('keydown', handleLightboxKeydown)
})

onBeforeUnmount(() => {
  iconKeys.forEach((_, index) => stopCarousel(index))
  window.removeEventListener('keydown', handleLightboxKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
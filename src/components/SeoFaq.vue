<template>
  <div class="flex flex-col gap-4 sm:gap-5 text-left">
    <!-- карточки оформлены так же, как блок вопросов на главной (FAQ.vue): рамка-градиент, внутренняя подсветка -->
    <div v-for="(f, i) in items" :key="f.q" v-reveal :style="{ transitionDelay: i * 90 + 'ms' }"
      class="overflow-hidden rounded-[16px] border-[1.5px] border-transparent px-5 sm:px-6
        [background-clip:padding-box,border-box] [background-origin:border-box]
        bg-[linear-gradient(180deg,#fff,#fff),linear-gradient(180deg,#0392ff_0%,#7fc4ff_35%,#fff_100%)]
        dark:bg-[linear-gradient(180deg,#0e1826,#0e1826),linear-gradient(180deg,#0392ff_0%,#2f6fa8_35%,#0e1826_100%)]
        shadow-[inset_0_10px_36px_-6px_rgba(3,146,255,.25),inset_0_5px_20px_-4px_rgba(3,146,255,.15)]">
      <button type="button" @click="toggle(i)" :aria-expanded="open === i"
        class="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left cursor-pointer">
        <span class="font-bold text-base sm:text-lg text-black dark:text-white">{{ f.q }}</span>
        <span class="relative h-6 w-6 shrink-0 flex items-center justify-center text-[#054C86] dark:text-[#6cb6f2]">
          <span class="absolute w-6 h-[2px] bg-current"></span>
          <span class="absolute w-[2px] h-6 bg-current transition-transform duration-300"
            :class="open === i ? 'scale-y-0' : 'scale-y-100'"></span>
        </span>
      </button>
      <!-- плавное раскрытие: высота меняется через grid-template-rows -->
      <div class="grid transition-[grid-template-rows] duration-300 ease-in-out"
        :class="open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
        <div class="overflow-hidden">
          <p class="pb-5 sm:pb-6 text-sm sm:text-base text-black/60 dark:text-white/60 leading-relaxed">{{ f.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vReveal } from '@/composables/useReveal'

defineProps({ items: { type: Array, required: true } })

// как на главной: одновременно открыт один ответ
const open = ref(-1)
function toggle(i) {
  open.value = open.value === i ? -1 : i
}
</script>
<template>
  <div class="flex flex-col justify-between items-start border-gray-200 dark:border-gray-800 p-4 border-b">
    <!-- user post and details -->
    <div class="flex items-start gap-x-2 w-full">
      <!-- image -->
      <nuxt-img fit="cover" loading="lazy" class="h-8 w-8 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
      />
      <!-- details -->
      <div class="flex flex-col text-sm leading-tight gap-x-3 grow">
        <nuxt-link :to="`/profile/${comment.user?.username }`">
            <div class="flex flex-row items-center gap-x-2 flex-wrap">
                <span class="text-black dark:text-white text-base font-bold">
                {{comment?.user?.name}}</span>
                <span class="text-gray-500 dark:text-gray-400 font-light text-base">
                @{{ comment.user?.username }}</span>
           </div>
        </nuxt-link>
        <p class="text-black dark:text-white block text-md leading-snug mt-1 text-sm">
          {{ comment.content }}
        </p>
      </div>

      <!-- more icon -->
      <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">{{ timeAgo }}</p>
      <button
        class="hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md"
      >
        <Icon name="teenyicons:more-horizontal-outline" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useTimeAgo } from '@vueuse/core'
  import {Comment} from '~/utils/types'

  const props = defineProps<{
    comment: Comment,
  }>()

  const timeAgo = useTimeAgo( props.comment.created_at!)

</script>
<style></style>

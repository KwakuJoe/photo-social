<template>

<div v-if="error" class="flex flex-col items-center w-full gap-y-2 py-2 "> 
      <Icon name="mdi:server-network-off" class="text-gray-500 text-center text-4xl" />
      <p class="text-xl text-center">Something went wrong !</p>
      <p class="text-gray-500 text-center">{{ error.message }}</p>
        <UButton label="refresh" @click="emit('refresh')" />
    </div>

      <div v-else-if="data?.users && data?.users.length! > 0" v-for="user in data?.users" :key="user.id" class="flex items-start gap-x-2 py-3 px-3 grow border-gray-200 dark:border-gray-800 text-base font-bold border-x border-b">
          <nuxt-img fit="cover" loading="lazy" class="h-10 w-10 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/>
          <div class="ml-1.5 text-sm leading-tight w-full flex-wrap">
            <nuxt-link :to="`/profile/${user.username}`" class="flex flex-col gap-x-1 items-start  flex-wrap grow">
                <span class="text-black  dark:text-white text-base font-bold overflow-hidden truncate">{{ user.name }}</span>
                <span class="text-gray-500 grow dark:text-white text-sm overflow-hidden truncate sm:w-1/2">
                @{{ user.username }}</span>
            </nuxt-link>
          </div>
      </div>

       <!-- empty state -->
      <div v-else  class="flex flex-col items-center w-full gap-y-2 mt-10"> 
        <Icon name="ic:outline-camera" class="text-gray-500 text-center text-7xl" />
        <div  class="flex flex-col items-center gap-y-2">
            <p class="text-3xl font-bold text-center"> No Post Available</p>
            <p class="text-gray-500 text-center">Be the first to share your creative art .. :)</p>
        </div>
    </div>
    
</template>
<script setup lang="ts">
  import { SearchType} from '~/utils/types'
  import {usePostStore} from '~/stores/post'
  const postStore = usePostStore()

  //  props 
  const props = defineProps<{
    data: SearchType | null,
    error: any,
    pending: boolean
  }>()

  // emit
  const emit = defineEmits(['refresh'])
</script>
<style>
    
</style>
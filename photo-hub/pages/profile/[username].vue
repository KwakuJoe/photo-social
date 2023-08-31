<template>

    <div v-if="error" class="flex flex-col items-center w-full gap-y-2"> 

      <Icon name="mdi:server-network-off" class="text-gray-500 text-center text-4xl" />

      <div v-if="error.data" class="flex flex-col items-center gap-y-2">
        <p class="text-3xl font-bold text-center">:( Something went wrong!</p>
        <p class="text-gray-500 text-center">{{ error.data.message }}</p>
        <UButton label="refresh" @click="refresh" />

      </div>
      <div v-else class="flex flex-col items-center gap-y-2">
        <p class="text-3xl font-bold text-center">:( Something went wrong!</p>
        <p class="text-gray-500 text-center">{{ error.message }}</p>
        <UButton label="refresh" @click="refresh" />

      </div>
    </div>

    <!-- Profile & tab -->
    <UserProfile v-else :profile="data" />

    <div v-if="pending" class=" fixed z-90 bottom-20 right-8 justify-center items-center">
    <UButton :loading="pending"/>
  </div>

</template>
<script setup lang="ts">
  import { Profile} from '~/utils/types'
  import {useUserStore} from '~/stores/user'
  import {usePostStore} from '~/stores/post'
  import {storeToRefs} from 'pinia'

  
  const {isProfileChanged} = storeToRefs(useUserStore());
  const {isPostChanged} = storeToRefs(usePostStore());

    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl =  runTimeConfig.public.baseUrl

    // route parameters
    const { username } = useRoute().params

    // user token
    const myCookieToken = useCookie('myCookieToken')


    // header
    let headers ={
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${myCookieToken.value}`
    }
  
    // get profile
    const {pending, data, error, refresh} = await useFetch<Profile>(`${baseUrl}/api/profile/${username}`, {
            cache:'default',
            method:"GET",
            headers:headers,
            watch:[isProfileChanged, isPostChanged],
        })


// auth middle ware
definePageMeta({
  middleware:["auth"]
});
</script>
<style>
    
</style>
<template>
  <UPopover>
      <!-- <UButton color="white" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" /> -->
      <UAvatar :alt="username!" size="sm" />
    
      <template #panel>
        <!-- Content -->

        <UVerticalNavigation :links="links" />
          <hr />
        <UButton class=" border-0" @click="logout()"  icon="i-heroicons-arrow-left-on-rectangle" variant="link" color="white" label="logout"/>
      </template>
  </UPopover>
</template>
<script setup lang="ts">
// import { storeToRefs } from "pinia";
import {useUserStore} from '~/stores/user'
const userStore = useUserStore();

// username from cookie
const myUsername = useCookie('myUsername')
    const username = ref<string | null | undefined>(null)
    username.value = myUsername.value



// handle logout
async function logout() {
  userStore.logout()
  await navigateTo('/auth/login')
}


const links = [{
  label: `${username.value}`,
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  to:`/profile/${myUsername.value}`
}, 
//  {
//   label: 'Account Settings',
//   icon: 'i-heroicons-chart-bar',
//   to: ''
//  },
]
</script>
<style>
    
</style>
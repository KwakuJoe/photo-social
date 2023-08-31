<template>
   <div class="flex flex-col items-start px-4">
        <!-- vertical navigation -->
        <UVerticalNavigation :links="links" />


   </div>
</template>
<script setup lang="ts">


    // username from cookie
    const myUsername = useCookie('myUsername')
    const username = ref<string | null | undefined>(null)
    username.value = myUsername.value

    // <nuxt-link class="flex items-start gap-x-2 w-full mt-3" :to="`/profile/${user.username }`">
    const links = [{
      label: `${myUsername.value}`,
      to:`/profile/${myUsername.value}`,
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      },
      
    }, 
    // {
    //   label: 'Notifications',
    //   icon: 'i-heroicons-bell',
    //   to: '/getting-started/installation',
    //   badge: 100
    // }
  ]



</script>
<style>
    
</style>
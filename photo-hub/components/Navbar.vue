<template>
    <nav
      class="flex flex-wrap items-center justify-between mx-auto py-2 px-10 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30"
    >
    <div class="ms-4 flex flex-col justify-center gap-x-2">
            <nuxt-link to="/">
              <Icon name="uiw:camera-o" class="text-4xl" />
              <p class="text-xs text-gray-400 font-medium">Photo-hub</p>
            </nuxt-link>
        </div>

      <!-- toggle buttom -->
      <button
      @click="isOpen = true"
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-1 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <div class="flex gap-x-4">
        <!-- search -->
          <div class="flex">
            <SearchBar />
          </div>
          <div class="flex gap-x-3">
          <!-- navlinks slots -->
                <!-- <UButton color="black" label="Team" @click="scrollToTeam()" variant="link" />
                <UButton color="black" label="Blog" @click="scrollToBlog()" variant="link" /> -->
                <PostModal/>

          </div>
          <p>|</p>

          <!-- that button -->
          <!-- <button type="button" class="px-4 bg-black dark:bg-white text-white dark:text-black bg-dark">Contact us</button> -->

          <!-- avatar dropdown -->
          <AvatarDropDown/>
          <!-- togleg -->
          <ThemeToggleButton />
        </div>
      </div>
    </nav>




    <!-- slider over -->
    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1 h-screen overflow-y-auto" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <!-- Content -->
        <div class="flex flex-row justify-between">
          <div class="ms-4 flex flex-col justify-center gap-x-2">
            <Icon name="uiw:camera-o" class="text-4xl" />
            <p class="text-xs text-gray-400 font-medium">X Photo</p>
        </div>
          <UButton label="close" @click="isOpen = false" variant="link" color="white" icon="i-heroicons-x-mark" />
        </div>
      </template>


      <!-- Left Content -->
      <LeftPanel/>
      
      <!-- space -->
      <div class="h-2 w-full"></div>
      
      <!-- rigth content -->
      <RightPanel/>

      <!-- <template #footer> -->
        <!-- Content -->
        <!-- <p>Footer </p>
      </template> -->
    </UCard>
  </USlideover>

</template>
<script setup>
    import { storeToRefs } from "pinia";
    import {useUserStore} from '~/stores/user'
    // const { isAuthenticated } = storeToRefs(useUserStore());
    const isOpen = ref(false)


</script>
<style lang="">

</style>






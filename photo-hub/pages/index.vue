<template>
<!-- component -->

    <!-- profile tabs -->
    <!-- <TabGroup> -->
        <!-- <TabList as="div" class="sticky top-16  backdrop-filter backdrop-blur-2xl bg-opacity-30 border-gray-200 dark:border-gray-800 text-base font-bold border-x border-t"> -->
            <!-- <div class="flex flex-row w-full justify-around"> -->
                <!-- Use the `selected` state to conditionally style the selected tab. -->
                <!-- <Tab as="template" v-slot="{ selected }">
                    <button :class="{ 'border-b-4 w-1/4 border-green-500 text-base font-medium py-2': selected, 'text-gray-400 font-medium text-base w-1/4': !selected }">
                    For you
                    </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                    <button :class="{ 'border-b-4 w-1/4 border-green-500 text-base font-medium py-2 ': selected, ' text-gray-400 text-base font-medium w-1/4': !selected }">
                    Following
                    </button>
                </Tab>
            </div> -->
        <!-- </TabList> -->
    <!-- <TabPanels> -->
    <!-- All posts -->
      <!-- <TabPanel>
        <Posts :data="data" :error="error" :pending="pending" @refresh="refresh" />
      </TabPanel> -->
      <!-- Following liked -->
      <!-- <TabPanel>
      </TabPanel>
    </TabPanels>
  </TabGroup> -->

  <Posts :data="data" :error="error" :pending="pending" @refresh="refresh" />


</template>


<script setup lang="ts">
  import {PostsType} from '~/utils/types'
  import {usePostStore} from '~/stores/post'
  import {storeToRefs} from 'pinia'
  const {isPostChanged} = storeToRefs(usePostStore());

  // import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl
 
      // All post
      const {pending, error, data, refresh} = await useFetch<PostsType>(`${baseUrl}/api/posts`, {
        cache:'default',
        keepalive:true,
        method:"GET",
        watch:[isPostChanged],
    })


// auth middleware
definePageMeta({
  middleware:["auth"]
});

</script>
<style>
    
</style>
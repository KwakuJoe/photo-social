<template>
    <p class="text-4xl font-medium mb-4 font-mono">Search Result - {{searchStore.data?.text }}</p>
    <TabGroup>
        <TabList as="div" class="sticky top-16  backdrop-filter backdrop-blur-2xl bg-opacity-30 border-gray-200 dark:border-gray-800 text-base font-bold border-x border-y">
            <div class="flex flex-row w-full justify-around">
                <!-- Use the `selected` state to conditionally style the selected tab. -->
                <Tab as="template" v-slot="{ selected }">
                    <button :class="{ 'border-b-4 w-1/4 border-green-500 text-base font-medium py-2': selected, 'text-gray-400 font-medium text-base w-1/4': !selected }">
                        People ({{ searchStore.data?.users.length }})
                    </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                    <button :class="{ 'border-b-4 w-1/4 border-green-500 text-base font-medium py-2 ': selected, ' text-gray-400 text-base font-medium w-1/4': !selected }">
                        Top ({{ searchStore.data?.posts.length }})
                    </button>
                </Tab>
            </div>
        </TabList>
    <TabPanels>
    <!-- All posts -->
      <TabPanel>
        <SearchPeople :data="searchStore.data" :error="searchStore.searchError" :pending="searchStore.is_search_loading" @refresh="searchStore.search" />
      </TabPanel>
      <!-- Following liked -->
      <TabPanel>
        <SearchPosts :data="searchStore.data" :error="searchStore.searchError" :pending="searchStore.is_search_loading" @refresh="searchStore.search" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
<script setup lang="ts">
  import {PostsType} from '~/utils/types'
  import {useSearchStore} from '~/stores/search'
  import {storeToRefs} from 'pinia'
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

      // instance of search store
      const searchStore = useSearchStore()

      // route parameters % asign it to store search term
      const { term } = useRoute().params
      searchStore.searchTerm = term.toString()

      await searchStore.search()



// auth middleware
definePageMeta({
  middleware:["auth"]
});

</script>
<style>
    
</style>
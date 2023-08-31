<template>
  <!-- input search button -->
  <UButton @click="openModal" label="Search People, post etc"   variant="ghost" icon="i-heroicons-magnifying-glass-20-solid"  />

  <!-- Modal-->
  <TransitionRoot appear :show="isOpen" as="template">
  <Dialog as="div" @close="closeModal" class="relative z-10">
    <TransitionChild
      as="template"
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-black bg-opacity-25" />
    </TransitionChild>

    <div class="fixed inset-0 overflow-y-auto">
      <div
        class="flex min-h-full items-start justify-center p-4 text-center"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class=" w-full md:w-1/3  transform overflow-hidden rounded-2xl dark:bg-black bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <div class="flex items-center justify-start">
            <!-- close button -->
              <button class="p-3  bg-slate-300 w-10 h-10 bg-opacity-10 rounded-full flex items-center justify-center" @click="closeModal">
                  <Icon class="text-xl " name="mdi:close"/>
              </button>
              <!-- Search input -->
              <div class="grow">
                 <UInput variant="none"  class=" h-10" v-model="searchStore.searchTerm" placeholder="Search people & posts" icon="i-heroicons-magnifying-glass-20-solid" size="sm"  :trailing="false" />
              </div>

              <!-- search button -->
              <UButton class="" @click="handleSearch()" icon="i-heroicons-magnifying-glass-20-solid"/>
            </div>
              <!-- {{ searchStore.data }} -->

            <!-- list of user -->
              <div v-for="user in searchStore.data?.users" >
                <nuxt-link class="flex items-start gap-x-2 w-full mt-3" :to="`/profile/${user.username }`">
                    <nuxt-img fit="cover" loading="lazy" class="h-10 w-10 rounded-full border-gray-200 dark:border-gray-400 border-x border-y" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/>
                    <div class="ml-1.5 text-sm leading-tight">
                      <div class="flex gap-x-2 w-full flex-wrap">
                          <span class="text-black dark:text-white font-bold block ">{{ user.name }}</span>
                      </div>
                      <p class="text-white block text-md leading-snug"></p>
                      <div class="flex gap-x-2  mt-1 sm:flex-row flex-col">
                          <span class="text-black dark:text-white font-normal block"> @{{user.username}}r</span>
                      </div>
                    </div>
                </nuxt-link>
                </div>

              <!-- Search for post -->
              <nuxt-link :to="`/search/${searchStore.searchTerm}`">
                <p v-if="searchStore.searchTerm" class="mt-5 cursor-pointer hover:bg-gray-300  hover:bg-opacity-10 px-3 py-2 rounded-md" >Search for {{ searchStore.searchTerm }}</p>
              </nuxt-link>

              <!-- Loading -->
              <div class="relative">
                <UButton :loading="searchStore.is_search_loading" class="absolute bottom-1 right-0" variant="link"/>
              </div>

          </DialogPanel>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel} from '@headlessui/vue'
import { useSearchStore } from '~/stores/search';

const searchStore = useSearchStore()

const searchTerm = ref('')
// modal toggle
const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
  // searchStore.searchTerm = ''
  // searchStore.data = null
}
function openModal() {
  isOpen.value = true
}


onMounted(() => {
    searchStore.search()
})


function handleSearch(){
  searchStore.search()
  // closeModal()
}
</script>



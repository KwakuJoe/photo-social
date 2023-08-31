<template>
    <!-- button -->

    <button @click="openModal" class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
        <!-- comment -->
        <Icon class="text-xl" name="ic:baseline-keyboard-double-arrow-right"/>
      </button>

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
          class="flex min-h-full items-start justify-center text-center"
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
            <DialogPanel class=" w-full h-screen  transform overflow-hidden rounded-2xl dark:bg-black bg-white  p-6 text-left align-middle shadow-xl transition-all"
            >
                <!-- Image full screen -->
                <div class="flex flex-col justify-center items-center w-full">

                    <!-- close button -->
                    <button class="p-3 mb-5 bg-slate-300 bg-opacity-10 rounded-full flex items-center justify-center" @click="closeModal">
                        <Icon class="text-xl " name="mdi:close"/>
                    </button>

                    <!-- image -->
                    <nuxt-img fit="cover" loading="lazy" class="max-w-xs  md:max-w-md lg:mx-w-lg w-full justify-center" :src="image"/>
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
import { useCommentStore } from '~/stores/comment';
import { usePostStore } from '~/stores/post';

// modal toggle
const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}


// recieve props
const props = defineProps<{
  image: string | undefined
}>()


// format date
const {formateDateTime} = useUtils();



</script>
<style lang="">
    
</style>
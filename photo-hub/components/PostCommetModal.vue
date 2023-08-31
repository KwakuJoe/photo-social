<template>
    <!-- button -->

    <button @click="openModal" class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
        <!-- comment -->
        <Icon  name="iconamoon:comment-remove-light" class="" />
        <span class="ml-3">{{ commentCount }}</span>
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
            <!-- close button -->
            <button class="p-3 mb-5 bg-slate-300 bg-opacity-10 rounded-full flex items-center justify-center" @click="closeModal">
                 <Icon class="text-xl " name="mdi:close"/>
            </button>

            <!-- text -->
              <!-- <DialogTitle class="text-xl text-white font-medium">
                Share you creativity
              </DialogTitle> -->

              <div class="flex items-start gap-x-2 w-full">
                    <nuxt-img fit="cover" loading="lazy" class="h-10 w-10 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/>
                    <div class="ml-1.5 text-sm leading-tight">
                    <div class="flex gap-x-2 w-full flex-wrap">
                        <span class="text-black dark:text-white font-bold block ">{{ name }}</span>
                        <span class="text-black dark:text-white font-normal block">@{{ username }}</span>
                        <span class="text-black dark:text-white font-normal block"> {{ formateDateTime(date) }} </span>
                    </div>
                    <p class="text-white block text-md leading-snug"></p>
                    <div class="flex gap-x-2  mt-1 sm:flex-row flex-col">
                        <span class="text-black dark:text-white font-normal block"> Replying to</span>
                        <span class="text-green-500 font-normal block"> @{{ username }} </span>
                    </div>
                    </div>
                </div>


              <!-- Post Comment -->
              <form @submit.prevent="onSubmit">

                <div class="flex gap-x-5 w-full items-start mt-7">
                    <nuxt-img fit="cover" loading="lazy" class="w-8 h-8 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium" alt="Rounded avatar"/>
                    <div class="flex flex-col gap-y-5 w-full items-start">
                        <!-- comment -->
                          <textarea ref="textarea" v-bind="content"  class=" mr-5 w-full bg-none bg-transparent focus:outline-none placeholder:text-lg placeholder:text-black dark:placeholder:text-white text-lg text-black dark:text-white" rows="1" placeholder="Post your reply"/>
                      <div class="text-sm font-medium text-red-500">{{ errors.content }}</div>
                    </div>
                </div>


              <div class="mt-4">
                <!-- Submit button -->
                <UButton label="Reply" :loading="commentStore.is_commenting_loading"  @click="onSubmit" class="h-10" block />

              </div>

            </form>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
const { textarea, input } = useTextareaAutosize()
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle} from '@headlessui/vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useCommentStore } from '~/stores/comment';
import { usePostStore } from '~/stores/post';

const postStore = usePostStore()
const commentStore = useCommentStore()
// modal toggle
const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

// text area binding
// function typing(event:any) {
//     event.target.value
// }

// recieve props
const props = defineProps<{
  name: string | undefined
  username: string | undefined
  content: string | undefined
  date:Date | undefined,
  commentCount: number | undefined
  // comment:string
  postId:number | undefined
}>()


// format date
const {formateDateTime} = useUtils();


const {errors, handleSubmit,   defineInputBinds } = useForm({
  validationSchema: yup.object({
    content: yup.string().required('This field is required to create comment')
  }),
});

const onSubmit = handleSubmit(values => {
  console.log(JSON.stringify(values.content, null, 2));
  commentStore.new_comment.content = values.content;
  commentStore.new_comment.post_id = props.postId
  // assign fields to store

  // call the create method
  handleCreatePost()

  // clode modal
  closeModal()

});

const content = defineInputBinds('content');

async function handleCreatePost(){
  await commentStore.createComment()
  
}


</script>
<style lang="">
    
</style>
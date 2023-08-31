<template>
    <!-- button -->
    <ButtonComponent @onClick="openModal">
        <div class="flex items-center gap-x-2">
          <Icon class="" name="akar-icons:leaf"/>
          Post
        </div>
    </ButtonComponent>

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
            <button class="p-3 mb-3 bg-slate-300 bg-opacity-10 rounded-full flex items-center justify-center" @click="closeModal">
                 <Icon class="text-xl " name="mdi:close"/>
            </button>

            <!-- text -->
              <DialogTitle class="text-xl  font-medium">
                Share you creativity
              </DialogTitle>

              <!-- Post Title -->
                <div class="flex gap-x-5 w-full items-start my-5">
                    <nuxt-img fit="cover" loading="lazy" class="w-10 h-10 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium" alt="Rounded avatar"/>
                    <div class="flex flex-col gap-y-5 w-full items-start">
                        <!-- comment -->
                        <textarea  ref="textarea" v-model="postStore.newPosts.body"  class=" mr-5 w-full bg-transparent focus:outline-none placeholder:text-xl text-black dark:text-white  text-xl " rows="1" placeholder="Tell the story behind your art"/>
                    </div>
                </div>

                    <!-- preview -->
                <div v-if="imagePrev" class="flex relative w-full justify-center items-end">
                    <nuxt-img v-if="imagePrev" class="flex " :src="imagePrev" fit="cover"></nuxt-img>
                    <button class="p-3 mb-3 absolute bottom-10 left-50 bg-red-300 bg-opacity-50 rounded-full flex items-center justify-center" @click="clearPrev">
                        <Icon class="text-xl text-red-500" name="ic:sharp-delete"/>
                    </button>
                </div>

                <!-- upload image -->
                <label v-else for="dropzone-file" class="flex my-5 flex-col items-center justify-center  h-24 border-2  border-dashed rounded-lg cursor-pointer">
                    <div class="flex flex-col items-center justify-center pb-6">
                    <Icon name=""/>
                        <p class="mb-2 text-lg font-medium "> Click here to upload your art</p>
                        <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" @change="onFileSelected" class="hidden">
                </label>


              <div class="mt-4">
                <!-- Submit button -->
                 <UButton label="Post" :loading="postStore.is_posting_loading"  @click="handlePost()" class="h-10" block />
                
              </div>
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
import { usePostStore } from '~/stores/post';
import {Post} from '~/utils/types'
const postStore = usePostStore()
// modal toggle
const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
  postStore.newPosts.image = null
  postStore.newPosts.body = ''
  imagePrev.value = null
}
function openModal() {
  isOpen.value = true
  
}




const imagePrev = ref<Object | null | any>(null)

const clearPrev = () => {
    imagePrev.value = null
    postStore.newPosts.image = null
    postStore.newPosts.body = ''
}




const onFileSelected = (event:any) => {
  if (event.target.files && event.target.files[0]) {
    console.log(event.target.files[0].name);
    const file = event.target.files[0]

    if(file){

      const isValidate = validateImage(file)

      if(isValidate){

        postStore.newPosts.image = event.target.files[0]
        // postStore.post_upload.image = event.target.files[0]
        // console.log(postStore.post_upload.image)

        let reader = new FileReader();
        reader.onload = (event) => {
            imagePrev.value = event.target!.result
        //   productDetails.image_view = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

      }else{

        const toast = useToast()
          toast.add({
            id: 'image_validation_failed',
            title: '): Image validation failed',
            description: 'SVG, PNG, JPG or GIF is only allowed',
            timeout: 5000,
          })
      }

    }
  }
}


function validateImage(file:any) {
  if (file.type.startsWith('image/')) {
    // File is an image
    console.log('Valid image!');
    return true;
  } else {
    // File is not an image
    console.error('Invalid file type. Please select an image.');
    return false;
  }
}


async function  handlePost(){
  if(postStore.newPosts.body === '' || postStore.newPosts.image === null) {
    const toast = useToast()
          toast.add({
            id: 'post_failed',
            title: 'Oops! Empty fields',
            description: 'Make sure image and content is not empty',
            timeout: 5000,
        })
  }else{


    await postStore.createPost()
    
    // close modal
    closeModal()

    console.log(postStore.newPosts.body)
    console.log(postStore.newPosts.image)

  }
}




</script>
<style lang="">
    
</style>
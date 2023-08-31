<template>
    <!-- button -->
    <button @click="openModal" class="border-gray-200 dark:border-gray-600 p-1 px-2 text-sm font-medium  border-y border-x rounded-md absolute -bottom-9 right-0">Edit Profile</button>


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
              class=" w-full md:w-9/12 lg:w-2/5 transform overflow-hidden rounded-2xl dark:bg-black bg-white  p-6 text-left align-middle shadow-xl transition-all"
            >
            <!-- close button -->
            <div class="flex  items-center gap-x-3">
                <button class="p-3  bg-slate-300 bg-opacity-10 rounded-full flex items-center justify-center" @click="closeModal">
                    <Icon class="text-xl " name="mdi:close"/>
                </button>
                      <!-- text -->
              <DialogTitle class="text-xl font-medium">
                Edit Profile 
              </DialogTitle>
            </div>

            
            <div class="relative bg-slate-300 bg-opacity-10 flex w-full h-36 mt-5">
                <div   class="flex flex-col absolute -bottom-16 left-10">
                  <!-- default avatar -->
                  <!-- <Avatar  :size="80"  name="Mujahid Anuar"  /> -->
                  <nuxt-img v-if="user?.avatar === null" loading="lazy" fit="cover" class="absolute h-20 w-20 rounded-full" :src="imagePrev ? imagePrev : 'https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg'" />
                  <!-- user profile -->
                  <nuxt-img v-else loading="lazy" fit="cover" class="h-20 w-20 rounded-full" 
                  :src=" imagePrev ? imagePrev : fullImageUrl" />
                  <!-- Uplod button -->
                  <label  for="dropzone-file" class="flex flex-col px-2 items-center mt-2 justify-center text-xs    font-medium cursor-pointer ">
                  <p>Change profile</p>
                    <input id="dropzone-file" @change="onFileSelected" type="file" class="hidden">
                </label>
                </div>


                <!-- background image -->
                <div class="flex w-full h-full justify-center items-center">
                  <button class="bg-slate-300 bg-opacity-20 px-3.5  rounded-full py-2 pb-3">
                    <Icon name="material-symbols:add-a-photo-outline-sharp"/>
                  </button>
                </div>
            </div>

            
                <!-- forms -->
                <form class="mt-20"  @submit="onSubmit">

                <div class="flex flex-row gap-y-2 justify-between gap-x-2 mb-2">
                  <div class="flex flex-col gap-y-2 w-full">
                      <p class="text-sm font-medium">Username</p>
                      <UInput color="green" v-model="update_user_data.username" placeholder="eg. ama_creative" class="w-full h-10 focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none" disabled />
                  </div>
                  <div class="flex flex-col gap-y-2 w-full mb-2">
                      <p class="text-sm font-medium">Full name</p>
                      <UInput color="gray" v-model="update_user_data.name" placeholder="eg. John Doe" class="w-full h-10 focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none"/>

                  </div>
                </div>

                <!-- bio -->
                <div class="flex flex-col gap-y-2 w-full mb-2">
                  <p class="text-sm font-medium">Bio</p>
                  <UTextarea placeholder="Your bio" v-model="update_user_data.bio" class=" focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none" autoresize />
                </div>


                <!-- Socials -->
                <p class="text-base font-medium my-4">Social Links</p>

                <div class="flex flex-row gap-y-2 justify-between gap-x-2 mb-2">
                  <div class="flex flex-col gap-y-2 w-full">
                      <p class="text-sm font-medium">Email address</p>
                      <UInput color="green" v-model="update_user_data.email"  placeholder="eg. John Doe" class="w-full h-10 focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none" disabled />
                  </div>
                  <div class="flex flex-col gap-y-2 w-full mb-2">
                      <p class="text-sm font-medium">Linkedin Url</p>
                      <UInput color="gray" v-model="update_user_data.linkedin_url" v-bind="linkedin_url" placeholder="eg. John Doe" class="w-full h-10 focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none"/>
                      <div class="text-sm font-medium text-red-500">{{ errors.linkedin_url }}</div>

                  </div>
                </div>

                <div class="flex flex-row gap-y-2 justify-between gap-x-2 mb-2">
                  <div class="flex flex-col gap-y-2 w-full">
                      <p class="text-sm font-medium">Facebook</p>
                      <UInput color="green" v-bind="facebook_url" v-model="update_user_data.facebook_url" placeholder="eg. John Doe" class="w-full h-10 focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none"/>
                      <div class="text-sm font-medium text-red-500">{{ errors.facebook_url }}</div>
                  </div>
                  <div class="flex flex-col gap-y-2 w-full mb-2">
                      <p class="text-sm font-medium">Twitter</p>
                      <UInput color="gray" v-model="update_user_data.twitter_url" v-bind="twitter_url" placeholder="eg. John Doe" class="w-full h-10 focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none"/>
                      <div class="text-sm font-medium text-red-500">{{ errors.twitter_url }}</div>
                  </div>
                </div>

                <!-- address -->

                <div class="flex flex-col gap-y-2 mb-2">
                <p class="text-sm font-medium">Address</p>
                <UInput color="zinc" v-model="update_user_data.location" placeholder="eg. John Doe" class="w-full h-10 focus:border-green-500 dark:focus:border-green-500 focus:border-2  border-black dark:border-gray-100 p-4 border-y border-x rounded-md" variant="none"/>
                </div>

                <!-- Update posr -->
                <UButton label="Update Profile" class="h-10 mt-5" :loading="userStore.is_update_profile_loading" type="submit" @click="onSubmit()" block />
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
import {User} from '~/utils/types'
import Avatar from "vue-boring-avatars";
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useUserStore} from '~/stores/user'

const userStore = useUserStore();

  //  props 
  const props = defineProps<{
    user: User | undefined
  }>()

//   createuser
const update_user_data = reactive({
  email: props.user?.email,
  username: props.user?.username,
  name: props.user?.name,
  bio: props.user?.bio,
  linkedin_url: props.user?.linkedin_url,
  facebook_url: props.user?.facebook_url,
  twitter_url: props.user?.twitter_url,
  location: props.user?.location,
});


const { errors, handleSubmit,   defineInputBinds } = useForm({
  validationSchema: yup.object({
    linkedin_url: yup.string().url('Enter a valid url address eg. http://example.com'),
    facebook_url: yup.string().url('Enter a valid url address eg. http://example.com'),
    twitter_url: yup.string().url('Enter a valid url address eg. http://example.com'),
  }),
});

const onSubmit = handleSubmit(values => {
  // console.log(JSON.stringify(values, null, 2));
    userStore.update_user.name = update_user_data.name
    userStore.update_user.bio = update_user_data.bio
    userStore.update_user.linkedin_url = update_user_data.linkedin_url
    userStore.update_user.facebook_url = update_user_data.facebook_url
    userStore.update_user.twitter_url = update_user_data.twitter_url
    userStore.update_user.location = update_user_data.location
    UpdateUserProfile()
});

const linkedin_url = defineInputBinds('linkedin_url');
const facebook_url = defineInputBinds('facebook_url');
const twitter_url = defineInputBinds('twitter_url');




async function UpdateUserProfile() {

    await userStore.update_user_profile(props.user?.id)
    closeModal()
}


// modal toggle
const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
  imagePrev.value = null
  userStore.update_user.avatar = null
  userStore.update_user.name = update_user_data.name
  userStore.update_user.bio = ''
  userStore.update_user.linkedin_url = ''
  userStore.update_user.facebook_url = ''
  userStore.update_user.twitter_url = ''
  userStore.update_user.location = ''

}

function openModal() {
  isOpen.value = true
}

  // runtime fonfig for base url
  const runTimeConfig = useRuntimeConfig()
  const baseUrl =  runTimeConfig.public.baseUrl

  // full image url
   const fullImageUrl = ref(`${baseUrl}${props.user?.avatar?.url}`)
  //  fullImageUrl.value + props.user?.avatar?.url

  // image preview
  const imagePrev = ref<Object | null | any>(null)



// profile upload
const onFileSelected = (event:any) => {
  if (event.target.files && event.target.files[0]) {
    // console.log(event.target.files[0].name);
    const file = event.target.files[0]

    if(file){

      const isValidate = validateImage(file)

      if(isValidate){

        userStore.update_user.avatar = event.target.files[0]
        // postStore.post_upload.image = event.target.files[0]
        console.log(userStore.update_user.avatar )

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


// function validate
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



</script>
<style lang="">
    
</style>
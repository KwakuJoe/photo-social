<template>
    <div class=" border-gray-200 dark:border-gray-800 p-4  border-x border-t w-full">
    <div class="flex justify-between mb-2 items-start">
      <div class="flex items-start gap-x-2 grow">
          <nuxt-img fit="cover" loading="lazy" class="h-10 w-10 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/>
          <div class="ml-1.5 text-sm leading-tight w-full flex-wrap">
            <nuxt-link :to="`/profile/${username }`" class="flex gap-x-1 items-center  flex-wrap grow">
                <span class="text-black  dark:text-white text-base font-bold overflow-hidden truncate">{{ name }}</span>
                <span class="text-gray-500 grow dark:text-white text-sm overflow-hidden truncate sm:w-1/2">@{{ username }}</span>
                <p class="text-gray-500 dark:text-white text-xs overflow-hidden truncate w-1/2">{{ timeAgo }}</p>
            </nuxt-link>
          <p class="text-black dark:text-white block text-md leading-snug mt-3">{{ content }}</p>
          </div>
      </div>
      <!-- Twitter Bird -->
      <button class="hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md ">
          <Icon name="teenyicons:more-horizontal-outline"/>
      </button>
    </div>

     <div  class="flex flex-row justify-center  ms-14 border-x border-y border-gray-200 dark:border-gray-800 mt-2 rounded-md">
      <nuxt-link :to="`/post/full/${postUUid}`">
         <nuxt-img fit="cover" loading="lazy" class=" max-w-xs  md:max-w-md lg:mx-w-lg w-full flex justify-center" :src="fullImageUrl"/>
      </nuxt-link>
     </div>

    <div class="text-gray-500 dark:text-gray-400 flex mt-3 gap-x-2">

      <button @click="emit('unlike')" v-if="checkIdExists(likes, toNumber(myUserId))"  class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
        <!-- unlike love icon -->
        <Icon name="ic:round-favorite" class="" />
        <span class="ml-3">{{ likeCount }}</span>
      </button>

      <button v-else @click="emit('like')" class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
        <!-- likelove icon -->
        <Icon  name="uiw:heart-off" class="" />
        <span class="ml-3">{{ likeCount }}</span>
      </button>

      <PostCommetModal :name=name :postId="postId" :username=username :commentCount="commentCount"  :content = content :date = date />
      

       <button class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1"> 
         <!-- comment -->
         <Icon @click="emit('onDownload')" name="material-symbols:download" class="" />
        <span class="ml-3">{{}}</span>
      </button> 
      
    </div>
  </div>
</template>
<script setup lang="ts">
  import {Image, User, Comment} from '~/utils/types'
  import { useTimeAgo } from '@vueuse/core'


  const props = defineProps<{
    name: string | undefined,
    username: string | undefined
    content: string | undefined
    avatar: string | undefined
    image: Image | undefined | null
    likeCount: number | undefined,
    commentCount: number | undefined,
    date:Date | undefined,
    likes:User[] | any,
    postId:number | undefined,
    postUUid:string | undefined | any,
    comments:Comment[] | undefined

  }>()

const postLikes = ref<User[] | null>(null)

postLikes.value = props.likes

  // format error
  const timeAgo = useTimeAgo( props.date!)


  // runtime fonfig for base url
  const runTimeConfig = useRuntimeConfig()
  const baseUrl =  runTimeConfig.public.baseUrl

// full image url
  const fullImageUrl = baseUrl + props.image?.url

    // get the user id
    const myUserId = useCookie('myUserId')

  // check if id exist in likes array
    function checkIdExists(array:User[] , id:number) {
      if(array){
        return array.some((item) => item!.id === id) ;
      }
      return false ;
    }

  // convert string to number
  function toNumber(val:any ) {
    var n = parseFloat(val);
    return n
}



// emit
const emit = defineEmits(['like', 'unlike', 'onDownload'])
</script>
<style>
    
</style>
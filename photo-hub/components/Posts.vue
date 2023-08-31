<template>
<div class="w-full flex flex-col items-center justify-center">
    <!-- <div  v-if="pending" class="flex flex-col w-full justify-center items-center">
      <Icon name="uiw:camera-o" class=" text-center text-4xl animate-spin h-5 w-5 mr-3 ..." />
      <p>Loading ..</p>
    </div> -->
    <!-- <UButton label="refresh" @click="refresh" /> -->
    
    <div v-if="error" class="flex flex-col items-center w-full gap-y-2"> 
      <Icon name="mdi:server-network-off" class="text-gray-500 text-center text-4xl" />
      <p class="text-xl text-center">Something went wrong !</p>
      <p class="text-gray-500 text-center">{{ error.message }}</p>
        <UButton label="refresh" @click="emit('refresh')" />
    </div>
    

    <PostCard v-else-if="data?.posts && data?.posts.length! > 0"   v-for="post in data?.posts" :key="post.id"
      :name = post.user?.name
      :postId=post.id
      :username = post.user?.username
      :content =  post.body
      avatar = "https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
      :image = post.image
      :likeCount = post.user_posts_likes?.length
      :likes = post.user_posts_likes
      :commentCount = post.comments?.length
      :comments = post.comments
      :postUUid="post.uuid"
      :date = post.created_at
      @like="handleLike(post.id)"
      @unlike="handleUnlike(post.id)"
      @onDownload="handleDownload(post.image?.url!, post.image?.extname!)"
      />

      <!-- empty state -->
      <div v-else  class="flex flex-col items-center w-full gap-y-2 mt-10"> 
        <Icon name="ic:outline-camera" class="text-gray-500 text-center text-7xl" />
        <div  class="flex flex-col items-center gap-y-2">
            <p class="text-3xl font-bold text-center"> No Post Available</p>
            <p class="text-gray-500 text-center">Be the first to share your creative art .. :)</p>
        </div>
    </div>

  <div class="md:hidden fixed z-90 bottom-10 right-8 justify-center items-center">
    <PostModal/>
  </div>




  <div v-if="pending" class=" fixed z-90 bottom-20 right-8 justify-center items-center">
    <UButton :loading="pending"/>
  </div>

</div>

  <!-- notfications -->
  <UNotifications/>
</template>
<script setup lang="ts">
  import {PostsType} from '~/utils/types'
  import {usePostStore} from '~/stores/post'
  const postStore = usePostStore()
  import {storeToRefs} from 'pinia'
import axios from 'axios';
  const {isPostChanged} = storeToRefs(usePostStore());



  //  props 
  const props = defineProps<{
    data: PostsType | null,
    error: any,
    pending: boolean
  }>()

  // emit
const emit = defineEmits(['refresh'])

// handle like

async function handleLike(postId:number | undefined) {
  postStore.postId = postId
  console.log(postStore.postId)

  console.log('is working .... ??')

  // call the like function from store
  await postStore.like()

}



// handle unlike
async function handleUnlike(postId:number | undefined) {
  postStore.postId = postId
  console.log(postStore.postId)
  console.log('is working .... ??')
  // call the like function from store
 await postStore.unlike()

}

  // runtime fonfig for base url
  const runTimeConfig = useRuntimeConfig()
  const baseUrl =  runTimeConfig.public.baseUrl

// handle download



 async function handleDownload(imageUrl:string, ext:string){
  // const fullImageUrl = baseUrl + url
  // console.log(imageUrl)

  // do this
  postStore.download(imageUrl, ext)


}

// handle refresh
</script>
<style>
    
</style>
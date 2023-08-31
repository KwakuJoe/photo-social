<template>
    <Navbar/>

    <div v-if="error" class="flex flex-col items-center w-full gap-y-2"> 
      <Icon name="mdi:server-network-off" class="text-gray-500 text-center text-4xl" />
      <p class="text-xl text-center">Something went wrong !</p>
      <p class="text-gray-500 text-center">{{ error.message }}</p>
        <UButton label="refresh" @click="refresh" />
    </div> 

    <PostCardFull
      :name = data?.post.user?.name
      :postId= data?.post.id
      :username = data?.post.user?.username
      :content =  data?.post.body
      avatar = "https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
      :image = data?.post.image 
      :likeCount = data?.post.user_posts_likes?.length
      :likes="data?.post.user_posts_likes"
      :commentCount = data?.comments.length
      :postUUid=data?.post.uuid
      :date = data?.post.created_at
      @like="handleLike(data?.post.id)"
      @unlike="handleUnlike(data?.post.id)"
      :comments="data?.comments"
    />


    <div v-if="pending" class=" fixed z-90 bottom-20 right-8 justify-center items-center">
    <UButton :loading="pending"/>
  </div>
</template>
<script setup lang="ts">
  import {usePostStore} from '~/stores/post'
  const postStore = usePostStore()
  import {storeToRefs} from 'pinia'
  import { PostType} from '~/utils/types'


  const {isPostChanged} = storeToRefs(usePostStore());


// auth middleware
definePageMeta({
  middleware:["auth"]
});


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


    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl


    // route parameters
    const { uuid } = useRoute().params

    // user token
    const myCookieToken = useCookie('myCookieToken')

   // header
   let headers ={
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization" : `Bearer ${myCookieToken.value}`
    }

    const {pending, data, error, refresh} = await useFetch<PostType>(`${baseUrl}/api/post/${uuid}`, {
        cache:'default',
        method:"GET",
        headers:headers,
        watch:[isPostChanged],
    })
    
definePageMeta({
  layout: false,
});
</script>
<style lang="">
    
</style>
<template>

<div class="h-screen">

     <PostCard v-if="liked!.length > 0"  v-for="post in liked" :key="post.id"
      :name = post.user?.name
      :postId=post.id
      :username = post.user?.username
      :content =  post.body
      avatar = "https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
      :image = post.image
      :likeCount = post.user_posts_likes?.length
      :likes = post.user_posts_likes
      :commentCount = post.comments?.length
      :comments=post.comments
      :postUUid="post.uuid"
      :date = post.created_at
      @like="handleLike(post.id)"
      @unlike="handleUnlike(post.id)"
      /> 

        <!-- empty state -->
      <div v-else  class="flex flex-col items-center w-full gap-y-2 mt-10"> 
        <Icon name="ic:outline-camera" class="text-gray-500 text-center text-7xl" />
        <div  class="flex flex-col items-center gap-y-2">
            <p class="text-3xl font-bold text-center"> No Post Available</p>
            <p class="text-gray-500 text-center">No liked post yet .. :)</p>
        </div>
    </div> 
</div>

    <!-- loading state -->

</template>
<script setup lang="ts">
  import {usePostStore} from '~/stores/post'
  import {Post, PostsType} from '~/utils/types'
  import {storeToRefs} from 'pinia'

  
  const {isPostChanged} = storeToRefs(usePostStore());
  const postStore = usePostStore()

  
  // base ur from env in runtime config
  const runTimeConfig = useRuntimeConfig()
  const baseUrl:String =  runTimeConfig.public.baseUrl
  
// prop
const props = defineProps<{
  userLikedPosts: Post[] | undefined,
  userId: number | undefined,
}>()


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

// userLiked


  // computed to fiter the one user liked
    const filteredPost = computed(() => {
      return props.userLikedPosts!.filter(post =>
      post.user_posts_likes?.some(like => like.id === props.userId))
  })

const liked = ref<Post[]>(filteredPost.value)



    





</script>
<style>
    
</style>
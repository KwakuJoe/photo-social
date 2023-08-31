<template>
    <div class="h-screen">
        <PostCard v-if="posts!.length > 0"  v-for="post in posts" :key="post.id"
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
            
      <div v-else  class="flex flex-col items-center w-full gap-y-2 mt-10"> 
        <Icon name="ic:outline-camera" class="text-gray-500 text-center text-7xl" />
        <div  class="flex flex-col items-center gap-y-2">
            <p class="text-3xl font-bold text-center"> No Post Available</p>
            <p class="text-gray-500 text-center">User has no post yet .. :)</p>
        </div>
    </div>

    </div>


</template>
<script setup lang="ts">
  import {Post} from '~/utils/types'
  import {usePostStore} from '~/stores/post'
  const postStore = usePostStore()
  //  props 
  const props = defineProps<{
    posts: Post[] | null | undefined,
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

  
</script>
<style>
    
</style>
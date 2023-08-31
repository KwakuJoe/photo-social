<template>
    <div class="flex flex-col gap-y-3">
        <!-- Trend List -->
        <div v-if="trendingPosts && trendingPosts.length > 0" class="flex flex-col w-full bg-gray-200 dark:bg-gray-700 dark:bg-opacity-30 bg-opacity-30 rounded-md p-5">
        <p class="text-lg font-bold">Trending Posts</p>
        <nuxt-link :to="`/post/full/${post.uuid}`" v-for="post in trendingPosts" :key="post.id">
            <div class="flex flex-col mt-3 gap-y-1 cursor-pointer hover:bg-gray-300  hover:bg-opacity-10 px-3 py-2 rounded-md">
                <div class="flex items-center gap-x-2">
                    <p class="text-gray-500 text-xs">{{ post.comments?.length }} comment</p>
                    <div class="h-0.5 w-0.5 bg-gray-400 rounded-full"></div>
                    <p class="text-gray-500 text-xs">{{ post.user_posts_likes?.length }} Likes</p>
                    <div class="h-0.5 w-0.5 bg-gray-400 rounded-full"></div>
                     <p class="text-gray-500 text-xs">{{ post.user?.username}}</p>
                </div>
                <p class="font-medium text-sm">{{ post.body }}</p>
            </div>
        </nuxt-link>
    </div>

       <!-- empty state for top viewed -->
       <div v-else  class="flex flex-col items-start w-full gap-y-2  bg-gray-200 dark:bg-gray-700 dark:bg-opacity-30 bg-opacity-30 rounded-md p-5"> 
        <p class="text-lg font-bold text-start">Trending Posts  </p>
        <Icon name="ic:outline-camera" class=" flex justify-center  w-full text-gray-500 text-center text-7xl" />
        <div  class="flex flex-col justify-center w-full items-center gap-y-2">
            <p class="text-3xl font-bold"> No Post Available</p>
            <p class="text-gray-500 text-center">  No post has yet reach that standard :)</p>
        </div>
    </div>
    
    <!-- most viewed -->
    <div v-if="MostViewedPosts && MostViewedPosts.length > 0" class="flex flex-col w-full bg-gray-200 dark:bg-gray-700 dark:bg-opacity-30 bg-opacity-30 rounded-md p-5">
        <p class="text-lg font-bold">Top viewed </p>
        <nuxt-link :to="`/post/full/${post.uuid}`" v-for="post in MostViewedPosts" :key="post.id">
            <div class="flex flex-col mt-3 gap-y-1 cursor-pointer hover:bg-gray-300  hover:bg-opacity-10 px-3 py-2 rounded-md">
                <div class="flex items-center gap-x-2">
                    <p class="text-gray-500 text-xs">{{ post.post_user_views?.length }} views</p>
                    <div class="h-0.5 w-0.5 bg-gray-400 rounded-full"></div>
                    <p class="text-gray-500 text-xs">{{ post.user_posts_likes?.length }} Likes</p>
                    <div class="h-0.5 w-0.5 bg-gray-400 rounded-full"></div>
                     <p class="text-gray-500 text-xs">{{ post.user?.username}}</p>
                </div>
                <p class="font-medium text-sm">{{ post.body }}</p>
            </div>
        </nuxt-link>
    </div>

       <!-- empty state for top viewed -->
       <div v-else  class="flex flex-col items-start w-full gap-y-2  bg-gray-200 dark:bg-gray-700 dark:bg-opacity-30 bg-opacity-30 rounded-md p-5"> 
        <p class="text-lg font-bold text-start">Top viewed </p>
        <Icon name="ic:outline-camera" class=" flex justify-center  w-full text-gray-500 text-center text-7xl" />
        <div  class="flex flex-col justify-center w-full items-center gap-y-2">
            <p class="text-3xl font-bold"> No Post Available</p>
            <p class="text-gray-500 text-center">  No post has yet reach that standard :)</p>
        </div>
    </div>
</div>

</template>
<script setup lang="ts">
import {Post, PostsType} from '~/utils/types'
import {usePostStore} from '~/stores/post'
import {storeToRefs} from 'pinia'
const {isPostChanged} = storeToRefs(usePostStore());


    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl
 
      // All post
      const {pending, error, data, refresh} = await useFetch<PostsType>(`${baseUrl}/api/posts`, {
        cache:'default',
        keepalive:true,
        method:"GET",
        watch:[isPostChanged],
    })

    
  // computed to fiter the one user liked
  const trendingPosts = computed(() => {
      return data.value?.posts.filter(post =>
      post.comments?.length! > 1)
  })

    // computed to fiter the one user liked
  const MostViewedPosts = computed(() => {
      return data.value?.posts.filter(post =>
      post.post_user_views?.length! > 10)
  })

</script>
<style>
    
</style>
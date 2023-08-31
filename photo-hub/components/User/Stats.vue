<template>
    <div class="h-screen w-full">
        <div class="w-full flex flex-col md:flex-row gap-x-2 mt-5 gap-y-2">
            <div class="flex flex-col md:w-1/2 border-gray-200 dark:border-gray-800 p-4 border-y border-x rounded-md">
                <Icon class="text-xl" name="tabler:heart"/>
                <p class="font-bold text-xl">{{ totalPostCount }}</p>
                <p class="text-sm text-gray-400 mt-5">Likes</p>
            </div>
            <div class="flex flex-col md:w-1/2 border-gray-200 dark:border-gray-800 p-4 border-y border-x rounded-md">
                <Icon class="text-xl" name="ph:eye-light"/>
                <p class="font-bold text-xl">{{ totalViewCount }}</p>
                <p class="text-sm text-gray-400 mt-5">Views</p>
            </div>
        </div>
        <!-- <div class="flex flex-col mt-2 border-gray-200 dark:border-gray-800 p-4 border-y border-x rounded-md">
                <Icon class="text-xl" name="material-symbols:download"/>
                <p class="font-bold text-xl">300k</p>
                <p class="text-sm text-gray-400 mt-5">Downloads</p>
        </div> -->
    </div>
</template>
<script setup lang="ts">
  import { Post} from '~/utils/types'

// Recieving props
const props = defineProps<{
    posts: Post[] | null | undefined,
  }>()

 
// 
const totalPostCount = ref<number | undefined>(props.posts?.reduce((sum:number, post:Post) => sum + post.user_posts_likes?.length!, 0))
const totalViewCount = ref<number | undefined>(props.posts?.reduce((sum:number, post:Post) => sum + post.post_user_views?.length!, 0))


console.log(totalPostCount.value); 
console.log(totalViewCount.value?.toString); 







      // this handles the total likes count of a user post
    // const totalNumbersCount = props.posts?.[Symbol]. .reduce((sum, post) => sum + post.numbers.length, 0);

</script>
<style>
    
</style>
<template>
    <!-- cover image and profile image -->
 <div class="w-full flex flex-col justify-center">
    <div class="relative bg-gray-400 flex w-full h-48">
        <nuxt-img loading="lazy" fit="cover" class="absolute -bottom-10 left-5 h-20 w-20 border-gray-200 dark:border-gray-800 border-4 md:h-24 md:w-24 rounded-full" 
        :src="fullImageUrl ? fullImageUrl : 'https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium' "  />
        <!-- edit profile button -->
        <EditProfile v-if="profile?.user.id === myUserId " :user="profile?.user" />
        
    </div>

    <!-- name & username & co-->
    <div class="flex flex-col  my-12 px-5 w-full">
        <p class="text-lg font-bold">{{ profile?.user.name }}</p>
        <p class="text-base text-gray-400">@{{profile?.user.username}}</p>

        <div class="flex gap-x-3 mt-3">
            <div class="flex items-center gap-x-1">
                <p class="text-base font-bold">344</p>
                <p class="text-base text-gray-400">Following</p>
            </div>
            <div class="flex items-center gap-x-1">
                <p class="text-base font-bold">1k</p>
                <p class="text-base text-gray-400">Follower</p>
            </div>
        </div>

        <!-- following button -->
        
        <!-- bio -->
        <p class="mt-3">{{ profile?.user.bio === '' ? 'Bio is empty, Kindly Update your profile' : profile?.user.bio }}</p>


        <!-- socials tiltle -->
        <div class="flex items-center gap-x-2 mt-5">
            <Icon class="" name="ph:user-thin" />
            <p class="text-base font-medium">Contact & Socials</p>
            
        </div>

        <!-- Rest of user info -->
        <div class="flex gap-x-3 flex-wrap gap-y-2 mt-2">
            <div class="flex items-center gap-x-2">
                <Icon class="text-gray-400" name="clarity:map-marker-line" />
                <p class="text-base text-gray-400">{{ profile?.user.location === '' ? 'Setup address' : profile?.user.location }}</p>
            </div>
            <div class="flex items-center gap-x-1">
                <Icon class="text-gray-400" name="material-symbols:mail" />
                <p class="text-base text-gray-400">{{ profile?.user.email === '' ? 'Setup email' : profile?.user.email }}</p>
            </div>
            <div class="flex items-center gap-x-1">
                <Icon class="text-gray-400" name="mdi:facebook" />
                <p class="text-base text-gray-400">{{ profile?.user.facebook_url === '' ? 'Setup Facebook ' : profile?.user.facebook_url }}</p>
            </div>
            <div class="flex items-center gap-x-1">
                <Icon class="text-gray-400" name="mdi:twitter" />
                <p class="text-base text-gray-400">{{ profile?.user.twitter_url === '' ? 'Setup Twitter ' : profile?.user.twitter_url }}</p>
            </div>
            <div class="flex items-center gap-x-1">
                <Icon class="text-gray-400" name="mdi:linkedin" />
                <p class="text-base text-gray-400">{{ profile?.user.linkedin_url === '' ? 'Setup Linkedin ' : profile?.user.linkedin_url }}</p>
            </div>
        </div>

    </div>
    <!-- profile tabs -->
    <TabGroup>
        <TabList as="div" class="sticky top-16  backdrop-filter backdrop-blur-lg bg-opacity-30">
            <div class="flex flex-row w-full justify-between">
                <!-- Use the `selected` state to conditionally style the selected tab. -->
                <Tab as="template" v-slot="{ selected }">
                    <button :class="{ 'border-b-4 w-1/4 border-green-500 text-base font-medium py-2 ': selected, ' text-gray-400 text-base font-medium w-1/4': !selected }">
                    Post
                    </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                    <button :class="{ 'border-b-4 w-1/4 border-green-500 text-base font-medium py-2 ': selected, ' text-gray-400 text-base font-medium w-1/4': !selected }">
                    Likes
                    </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                    <button :class="{ 'border-b-4 w-1/4 border-green-500 text-base font-medium py-2 ': selected, ' text-gray-400 text-base font-medium w-1/4': !selected }">
                    Stats
                    </button>
                </Tab>
            </div>
        </TabList>
    <TabPanels>
    <!-- user posts -->
      <TabPanel>
        <UserPosts :posts="profile?.posts"/>
      </TabPanel>
      <!-- user liked -->
      <TabPanel>
        <UserLikes :userLikedPosts="data?.posts"  :userId="profile?.user.id" />
      </TabPanel>
      <!-- stats -->
      <TabPanel>
        <UserStats :posts="profile?.posts"/>
      </TabPanel>
      
    </TabPanels>
  </TabGroup>
</div>
  <!-- notfications -->
  <UNotifications/>
</template>
<script setup lang="ts">
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
  import {Profile} from '~/utils/types'
  import {usePostStore} from '~/stores/post'
  import { PostsType} from '~/utils/types'
  import {storeToRefs} from 'pinia'

  const {isPostChanged} = storeToRefs(usePostStore());
  const postStore = usePostStore()

    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl


  //  props 
  const props = defineProps<{
    profile: Profile | null
  }>()

    // full image url
    const fullImageUrl = ref(`${baseUrl}${props.profile?.user.avatar?.url}`)

      // This is going to handle the liked post by theuser
      // var to hold data
      const res = ref<PostsType | null>(null)

      // Auth user id
      const myUserId = useCookie('myUserId')
      

        // single post
        const {pending, error, data, refresh} = await useFetch<PostsType>(`${baseUrl}/api/posts`, {
            cache:'default',
            keepalive:true,
            method:"GET",
            watch:[isPostChanged],
            onResponse({ request, response, options }) {
                // Process the response data
                res.value = response._data
                // localStorage.setItem('token', response._data.token)
            }
    })
</script>
<style>
    
</style>
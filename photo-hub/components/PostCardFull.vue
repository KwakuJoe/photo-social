<template>
    <div class="flex flex-col md:flex-row justify-center w-grow">

      <!-- 1st half -->
      <div class="w-full md:px-10 px-5 flex flex-col  items-center border-gray-200 dark:border-gray-800  border-y ">
           <!-- close & full screen -->
          <div class="flex justify-between items-center w-full my-4">
            <!-- back button -->
            <nuxt-link to="/" class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
              <Icon class="text-xl" name="mdi:close"/>
            </nuxt-link>


            <div class="text-gray-500 dark:text-gray-400 flex mt-3 gap-x-2">
                <button @click="emit('unlike')" v-if="checkIdExists(props.likes, toNumber(myUserId))"  class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
                  <!-- unlike love icon -->
                  <!-- v-if="checkIdExists(props.likes, toNumber(myUserId))" -->
                  <Icon name="ic:round-favorite" class="" />
                  <span class="ml-3">{{ likeCount }}</span>
                </button>
                
                <button  @click="emit('like')" v-else  class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
                  <!-- likelove icon -->
                  <Icon  name="uiw:heart-off" class="" />
                  <span class="ml-3">{{ likeCount }}</span>
                </button>

                <!-- post comment -->
                <PostCommetModal :name=name :postId="postId" :username=username :commentCount="commentCount"  :content = content :date = date />

                <button class="flex items-center hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md py-1">
                  <!-- comment -->
                  <Icon @click="emit('onComment')" name="material-symbols:download" class="" />
                  <span class="ml-3">200</span>
                </button>
            </div>  

              <!-- image full screen modal -->
            <ImageFullScreenModal :image="fullImageUrl"/>
          </div>
            <!-- image -->
            <nuxt-img   class="max-w-xs  md:max-w-md lg:mx-w-lg w-full justify-center" :src="fullImageUrl"></nuxt-img>
      </div>

      
      <!-- 2nd half -->
      <div class="lg:w-1/3 h-screen border-gray-200 dark:border-gray-800 border-x hidden md:block ">
      <!-- user post title  -->
    
        <div class="md:sticky md:top-16 h-screen overflow-y-auto">
            
            <!-- user info -->
          <div class="flex flex-col justify-between items-start border-gray-200 dark:border-gray-800 p-4  border-t ">
              <!-- user post and details -->
              <div class="flex items-start gap-x-2 w-full">
                  <!-- image -->

                  <nuxt-img fit="cover" loading="lazy" class="h-10 w-10 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/>
                  <!-- details -->
                    <div class="flex flex-row text-sm leading-tight flex-wrap items-start justify-between gap-x-3 w-full grow">
                          <div class="flex flex-col">
                            <nuxt-link class="flex gap-x-2 items-center" :to="`/profile/${username}`">
                              <span class="text-black  dark:text-white text-base font-bold">{{ name }}</span>
                              <span class="text-gray-500  dark:text-white text-sm ">@{{ username }}</span>
                            </nuxt-link>
                          </div>
                          <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">{{timeAgo }}</p>
                    </div>

                  <!-- more icon -->
                  <button class="hover:bg-slate-400 hover:bg-opacity-10 px-3 cursor-pointer rounded-md ">
                      <Icon name="teenyicons:more-horizontal-outline"/>
                  </button>
                  
                </div>
                <p class="text-black dark:text-white block text-md leading-snug mt-1 text-lg">{{ content }}</p>

            </div>

              <!-- comment Field -->
              <div class="flex gap-x-3 w-full items-start border-gray-200 dark:border-gray-800 p-4  border-y ">
              <!-- avatar -->
                  <nuxt-img fit="cover" loading="lazy" class="w-8 h-8 rounded-full" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium" alt="Rounded avatar"/>
                  <div class="flex flex-col gap-y-5 w-full items-start">
                      <!-- comment --> 
                      <textarea ref="textarea" v-bind="comment" class=" mr-5 w-full bg-none bg-transparent focus:outline-none placeholder:text-xl text-xl" rows="1" placeholder="What's on your mind?"/>
                      <div class="text-sm font-medium text-red-500">{{ errors.comment }}</div>
                      <!-- Submit button -->
                      <UButton label="Reply" :loading="commentStore.is_commenting_loading"  @click="onSubmit" class="h-10" block />
                  </div>
              </div>
              

              <!-- comment list -->
              <CommentCard v-for="comment in comments" :key="comment.id"  :comment="comment"/>

        </div>
      </div>
    </div>
    <!-- notfications -->
  <UNotifications/>
</template>
<script setup lang="ts">
  // import {usePostStore} from '~/stores/post'
  import { User,  Comment, Image} from '~/utils/types'
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';
  import { useCommentStore } from '~/stores/comment';
  import { useTimeAgo } from '@vueuse/core'

  const commentStore = useCommentStore()
  // const postStore = usePostStore()

// prop
const props = defineProps<{
  name: string | undefined,
  username: string | undefined
  content: string | undefined
  avatar: string | undefined
  image: Image | undefined | null
  likeCount: number | undefined,
  commentCount: number | undefined,
  date:Date | undefined,
  likes?:User[] | any,
  postId:number | undefined,
  postUUid:string | undefined | any,
  comments:Comment[] | undefined
}>()

const postLikes = ref<User[] | null>(null)
postLikes.value = props.likes



  // runtime fonfig for base url
  const runTimeConfig = useRuntimeConfig()
  const baseUrl =  runTimeConfig.public.baseUrl

  // full image url
  const fullImageUrl = baseUrl + props.image?.url


  // get the user id
  const myUserId = useCookie('myUserId')

  // check if id exist in likes array
  function checkIdExists(array:User[] , id:number) {
      return array!.some((item) => item!.id === id);
    }

  // format date utils
  const timeAgo = useTimeAgo(props.date!)

  // get the current route
  const route = useRoute()
  

  // emit
  const emit = defineEmits(['like', 'unlike', 'onComment'])


// handle Commet
const {errors, handleSubmit,   defineInputBinds } = useForm({
  validationSchema: yup.object({
    comment: yup.string().required('This field is required to create comment')
  }),
});


const onSubmit = handleSubmit(values => {
  console.log(JSON.stringify(values.comment, null, 2));

    //   assign fields to store
  commentStore.new_comment.content = values.comment;
  commentStore.new_comment.post_id = props.postId

  // call the create method
  handleCreatePost()

});

const comment = defineInputBinds('comment');
async function handleCreatePost(){
  await commentStore.createComment()
  
}

// go back functionality
function goBack() {
  navigateTo('/')
}


  // convert string to number
  function toNumber(val:any ) {
    var n = parseFloat(val);
    return n
}

</script>
<style>
    
</style>
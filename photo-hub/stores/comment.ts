import { defineStore } from 'pinia'
import {Comment} from '~/utils/types'
import axios from 'axios';
import { usePostStore } from '~/stores/post';
import {storeToRefs} from 'pinia'


export const useCommentStore = defineStore('comment', () => {
    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl
    const is_commenting_loading = ref<boolean>(false)

    const new_comment = reactive<Comment>({
        post_id:0,
        content: ''
    })
               // create a user
               async function createComment(){

                try{
                    // make loadin true
                    is_commenting_loading.value = true;
      
                    
                    // cookie info
                    const myCookieToken = useCookie('myCookieToken')
                    const myUserId = useCookie('myUserId')
    
                    // user data to register
                    let formData = new FormData();
                    // formData.append("tile", newPosts.tile as string);
                    formData.append("postId", new_comment.post_id as any);
                    formData.append("content", new_comment.content as any);
      
                    // header
                    let headers ={
                    //   'Content-Type': 'multipart/form-data',
                      Accept: "application/json",
                      "Authorization": `Bearer ${myCookieToken.value}`
                    }
      
                    const res =  await axios.post(
                          `${baseUrl}/api/comments`,
                          formData,
                          {
                              headers: headers
                          }
                      )
      
                      if(res.data.message === 'Comment created successfully'){
                          const toast = useToast()
                          toast.add({
                            id: 'comment_created_success',
                            title: ':) Hurray!, Your comment was created successfully',
                            description: 'Keep sharing and giving feedbacks to others',
                            timeout: 5000,
                          })
      
                          console.log(res.data)
                          
                          const {isPostChanged} = storeToRefs( usePostStore());
                          // refresh the post
                          isPostChanged.value++;
                    
                      }
                
                      is_commenting_loading.value = false;
      
      
                }catch(error:any){
      
                  is_commenting_loading.value = false;
      
                    console.log(error);
      
                    const toast = useToast()
      
                    if(error.response && error.response.data.errors.length > 0){
      
                        error.response.data.errors.forEach((validated_error: any) => {
                            toast.add({
                                id: 'comment_validation_failed',
                                title: 'Oops! Failed to create comment',
                                description: `${validated_error.message}`,
                                timeout: 10000,
                            })
                        });
      
                    }else if (error){
      
                      toast.add({
                        id: 'comment_failed',
                        title: 'Oops! Failed to create post',
                        description: `${error.message}`,
                        timeout: 10000,
                    })
      
                    }else{
                      console.log('no error')
                    }
      
                }finally{
                  is_commenting_loading.value = false;
                }
              
          }


          return {
            // create comment
            is_commenting_loading,
            new_comment,
            createComment,
          }
});
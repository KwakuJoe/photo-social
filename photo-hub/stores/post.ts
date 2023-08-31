import { defineStore } from 'pinia'
import axios from 'axios';
import {Post, PostType} from '~/utils/types'

export const usePostStore = defineStore('post', () => {
    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl

    // store variables
    const is_posting_loading = ref<boolean>(false)

    const error = ref<String | null>(null)
    const postId = ref<number | undefined >(0)


    // this variable is being  watched by the usefetch()
    const isPostChanged = ref<number>(0)

    const newPosts = reactive<Post>({
      body: '',
      image: null,
    })



           // create a user
    async function createPost(){

            try{
                // make loadin true
                is_posting_loading.value = true;
  
                
                // cookie info
                const myCookieToken = useCookie('myCookieToken')
                const myUserId = useCookie('myUserId')

                // user data to register
                let formData = new FormData();
                // formData.append("tile", newPosts.tile as string);
                formData.append("body", newPosts.body as any);
                formData.append("userId", myUserId.value as any);
                formData.append("image", newPosts.image as any);
  
                // header
                let headers ={
                  'Content-Type': 'multipart/form-data',
                  Accept: "application/json",
                  "Authorization": `Bearer ${myCookieToken.value}`
                }
  
                const res =  await axios.post(
                      `${baseUrl}/api/posts`,
                      formData,
                      {
                          headers: headers
                      }
                  )
  
                  if(res.data.message === 'Post created successfully'){
                      const toast = useToast()
                      toast.add({
                        id: 'post_created_success',
                        title: ':) Hurray!, Your post was created successfully',
                        description: 'People are probably reacting to your creative work',
                        timeout: 5000,
                      })
  
                      console.log(res.data)

                      // refresh the post
                      isPostChanged.value ++ 
                
                  }
            
                  is_posting_loading.value = false;
  
  
            }catch(error:any){
  
              is_posting_loading.value = false;
  
                console.log(error);
  
                const toast = useToast()
  
                if(error.response && error.response.data.errors.length > 0){
  
                    error.response.data.errors.forEach((validated_error: any) => {
                        toast.add({
                            id: 'post_validation_failed',
                            title: 'Oops! Failed to create post',
                            description: `${validated_error.message}`,
                            timeout: 10000,
                        })
                    });
  
                }else if (error){
  
                  toast.add({
                    id: 'post_failed',
                    title: 'Oops! Failed to create post',
                    description: `${error.message}`,
                    timeout: 10000,
                })
  
                }else{
                  console.log('no error')
                }
  
            }finally{
              is_posting_loading.value = false;
            }
          
      }


    // like a post
    async function like(){

        try{

            // user token
            const myCookieToken = useCookie('myCookieToken')

            // header
            let headers ={
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization" : `Bearer ${myCookieToken.value}`
              }

            // get ID from cookie
            const myUserId = useCookie('myUserId')

            console.log(`User id - ${myUserId.value}`)
              // user data to register
              let formData = new FormData();
              formData.append("postId", postId.value as any);
              formData.append("userId", myUserId.value as any);

            const res = await axios.post(`${baseUrl}/api/post/like`, formData, {headers: headers},)

            if(res.data.message = "Post liked successfully"){

                console.log(res.data)
                const toast = useToast()
                toast.add({
                  id: 'user_likepost_success',
                  title: ':) Hurray!, You have successfully liked this post',
                  description: 'All liked posts are stored in your profile page',
                  timeout: 5000,
                })

                // refresh the post
                isPostChanged.value ++ 

            }

        }catch(error:any){
            
            console.log(error)
            const toast = useToast()
            toast.add({
              id: 'user_likepost_failed',
              title:   `${error.message}`,
              description: 'All liked posts are stored in your profile page',
              timeout: 10000,
            })

            
        }

    }


    async function unlike(){

        try{

              // user token
              const myCookieToken = useCookie('myCookieToken')

            // header
            let headers ={
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization" : `Bearer ${myCookieToken.value}`
              }

            // get ID from cookie
            const myUserId = useCookie('myUserId')

            console.log(`User id - ${myUserId.value}`)
              // user data to register
              let formData = new FormData();
              formData.append("postId", postId.value as any);
              formData.append("userId", myUserId.value as any);

            const res = await axios.post(`${baseUrl}/api/post/unlike`, formData, {headers: headers},)

            if(res.data.message = "Post unliked successfully"){

                console.log(res.data)
                const toast = useToast()
                toast.add({
                  id: 'user_unlikepost_success',
                  title: '): Post unliked successfully',
                  description: 'All unliked posts will be removed from your liked list',
                  timeout: 5000,
                })

                // refresh the post
                isPostChanged.value ++ 
            }

        }catch(error:any){
            
            console.log(error)

            const toast = useToast()
            toast.add({
              id: 'user_unlikepost_failed',
              title:   'Failed to unlike post, try gaim',
              description: `${error.message}`,
              timeout: 10000,
            })

            
        }

    }



      async function download(imgUrl:string, ext:string){
          console.log( )
          // return false;

          const  full = baseUrl + imgUrl;
          axios({
            url:full,
            method:'GET',
            responseType:'blob',
            headers:{}
          }).then((response) => {
            console.log(response.data)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download',  'file.jpg')
            document.body.appendChild(link)
            console.log(link)
            link.click()
          })

          // try{
            
          //   const res = await axios.get(baseUrl + imgUrl, {
          //     responseType: 'blob', // Set the response type to blob
          //   }); 

          //   console.log(res.data)
          //   const url = window.URL.createObjectURL(new Blob([res.data]))
          //   const link = document.createElement('a')
          //   link.href = url
          //   link.setAttribute('download',  `file.${ext}`)
          //   document.body.appendChild(link)
          //   link.click()

          // }catch(error) {

          //   console.log(error)
          // }

      }



      // if(res.data.message === 'Image found successfully'){

      // }
      
      // function forceDownload(response: any, name: string) {
      //   const url = window.URL.createObjectURL(new Blob([response.data]))
      //   const link = document.createElement('a')
      //   link.href = url
      //   link.setAttribute('download', name)
      //   document.body.appendChild(link)
      //   link.click()
      // }
  
    return {
        // like post
        like,
        postId,

        // create a new post
        is_posting_loading,
        createPost,
        newPosts,


        // unlike post
        unlike,

        // ispostChange
        isPostChanged,

        // download
        download
        
  }
})
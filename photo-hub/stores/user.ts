import { defineStore } from 'pinia'
import { User,} from '~/utils/types';
import axios from 'axios';
import { usePostStore } from '~/stores/post';
import {storeToRefs} from 'pinia'
import { Image } from '~/utils/types';

export const useUserStore = defineStore('user', () => {
    
    // new user
    const create_user = reactive<User>({
        email: "",
        password:"",
        name:"",
        username: ""
    })

    // logn user credentials
    const login_user = reactive<User>({
        email:"",
        password: ""
    })

    //update user credentials
    const update_user = reactive<User>({
        name:"",
        bio:"",
        avatar:null,
        linkedin_url:"",
        facebook_url:"",
        twitter_url:"",
        location:"",
    })


    // variables 
    const isAuthenticated = ref<boolean>(false)
    const is_signup_loading = ref<boolean>(false)
    const is_login_loading = ref<boolean>(false)
    const is_update_profile_loading = ref<boolean>(false)

    // this variable is being  watched by the usefetch()
    const isProfileChanged = ref<number>(0)

    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl



       // create a user
       async function signup(){

          try{
              // make loadin true
              is_signup_loading.value = true;

              // user data to register
              let formData = new FormData();
              formData.append("username", create_user.username!);
              formData.append("name", create_user.name!);
              formData.append("email", create_user.email!);
              formData.append("password", create_user.password!);
              
              // header
              let headers ={
                  "Content-Type": "application/json",
                  Accept: "application/json",
              }

              const res =  await axios.post(
                    `${baseUrl}/api/signup`,
                    formData,
                    {
                        headers: headers
                    }
                )

                if(res.data.message === 'User created successfully'){
                    const toast = useToast()
                    toast.add({
                      id: 'user_register_success',
                      title: ':) Hurray!, You have successfully created an account',
                      description: 'Start exploring & sharing high quality images with others creatives',
                      timeout: 5000,

                    })

                    console.log(res.data)

                    const myCookieToken = useCookie('myCookieToken', { maxAge: 60 * 60 * 24 * 7 })
                    const myUsername = useCookie('myUsername', { maxAge: 60 * 60 * 24 * 7 })
                    const myUserId = useCookie('myUserId', { maxAge: 60 * 60 * 24 * 7 })

                    myCookieToken.value = res.data.token.token
                    myUsername.value = res.data.user.username
                    myUserId.value = res.data.user.id
                    isAuthenticated.value = true;
              
                }
          
                is_signup_loading.value = false;


          }catch(error:any){

              is_signup_loading.value = false;

              console.log(error);

              const toast = useToast()

              if(error.response && error.response.data.errors.length > 0){

                  error.response.data.errors.forEach((validated_error: any) => {
                      toast.add({
                          id: 'user_register_validation_failed',
                          title: 'Oops! Failed to register user! 1',
                          description: `${validated_error.message}`,
                          timeout: 5000,

                      })
                  });

              }else if (error){

                toast.add({
                  id: 'user_register_failed',
                  title: 'Oops! Failed to register user! 2',
                  description: `${error.message}`,
                  timeout: 5000,


              })

              }else{
                console.log('no error')
              }

          }finally{
              is_signup_loading.value = false;
          }
        
    }


           // create a user
           async function login(){

            try{
                // make loadin true
                is_login_loading.value = true;
  
                // user data to register
                let formData = new FormData();
                formData.append("email", login_user.email!);
                formData.append("password", login_user.password!);
                
                // cookie info
                const myCookieToken = useCookie('myCookieToken')

                // header
                let headers ={
                    'Content-Type': 'multipart/form-data',
                    Accept: "application/json",
                    "Authorization": `Bearer ${myCookieToken.value}`
                }
  
                const res =  await axios.post(
                      `${baseUrl}/api/signin`,
                      formData,
                      {
                          headers: headers
                      }
                  )
  
                  if(res.data.message === 'You have successfully Authenticated'){
                      const toast = useToast()
                      toast.add({
                        id: 'user_logged_success',
                        title: ':) Hurray!, You have successfully logged into your account',
                        description: 'Exploring & sharing high quality images with others creatives',
                        timeout: 0,
                      })
  
                      console.log(res.data)
  
                      const myCookieToken = useCookie('myCookieToken', { maxAge: 60 * 60 * 24 * 7 })
                      const myUsername = useCookie('myUsername', { maxAge: 60 * 60 * 24 * 7 })
                      const myUserId = useCookie('myUserId', { maxAge: 60 * 60 * 24 * 7 })
  
                      myCookieToken.value = res.data.token.token
                      myUsername.value = res.data.user.username
                      myUserId.value = res.data.user.id
                      isAuthenticated.value = true;
                
                  }
            
                  is_login_loading.value = false;
  
  
            }catch(error:any){
  
                is_login_loading.value = false;
  
                console.log(error);
  
                const toast = useToast()
    
                toast.add({
                    id: 'user_login_failed',
                    title: 'Oops! Authentication Failed!',
                    description: `${error.response.data.message}`,
                    timeout: 0,
                })
  
            }finally{
                is_login_loading.value = false;
            }
          
      }


    //   update user profile
    async function update_user_profile(uuid:number | undefined){

        try{
            // make loadin true
            is_update_profile_loading.value = true;

            // user data to register
            let formData = new FormData();
            formData.append("name", update_user.name as any);
            formData.append("avatar", update_user.avatar as any);
            formData.append("bio", update_user.bio!);
            formData.append("linkedinUrl", update_user.linkedin_url as any);
            formData.append("facebookUrl", update_user.facebook_url as any);
            formData.append("twitterUrl", update_user.twitter_url as any);
            formData.append("location", update_user.location as any);

            // user token
             const myCookieToken = useCookie('myCookieToken')
            // header
            let headers ={
                'Content-Type': 'multipart/form-data',
                Accept: "application/json",
                "Authorization" : `Bearer ${myCookieToken.value}`

            }

            const res =  await axios.post(
                  `${baseUrl}/api/profile/${uuid}/update`,
                  {
                    'name': update_user.name,
                    'avatar': update_user.avatar,
                    'bio': update_user.bio,
                    'linkedinUrl': update_user.linkedin_url,
                    'facebookUrl': update_user.facebook_url,
                    'twitterUrl': update_user.twitter_url,
                    'location': update_user.location
                  },
                  {
                      headers: headers
                  }
              )

              if(res.data.message === 'Profile updated successfully'){
                  const toast = useToast()
                  toast.add({
                    id: 'user_logged_success',
                    title: ':) Hurray!, You have successfully updated profile',
                    description: 'Exploring & sharing high quality images with others creatives',
                    timeout: 0,
                  })

                  console.log(res.data)

                  // update profile watcher
                  isProfileChanged.value++
              }
        
              is_update_profile_loading.value = false;


        }catch(error:any){

            is_update_profile_loading.value = false;

            console.log(error);

            const toast = useToast()

            toast.add({
                id: 'user_profile_update_failed',
                title: 'Oops! Profile Update Failed!',
                description: `${error.response.data.message}`,
                timeout: 0,
            })

        }finally{
            is_update_profile_loading.value = false;
        }
      
  }

    // logout

    function logout(){
        // useCookie new hook in nuxt 3
        const myCookieToken = useCookie('myCookieToken')
        const myUsername = useCookie('myUsername')
        const myUserId = useCookie('myUserId')

        // clear the token cookie
        myCookieToken.value = null,
        myUsername.value = null
        myUserId.value = null

         // set authenticated  state value to false
        isAuthenticated.value = false;
    }
  
    return {
       isAuthenticated,
        // sign up 
       create_user,
       signup,
       is_signup_loading,

        //  login  
       is_login_loading,
       login,
       login_user,
       
        //logout
       logout,

       // update profile
       is_update_profile_loading,
       update_user_profile,
       update_user,
       
      // check if user profile changed
      isProfileChanged,


    
      }
  })
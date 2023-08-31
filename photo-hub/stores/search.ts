import { defineStore } from 'pinia'
import {SearchType} from '~/utils/types'
import {usePostStore} from '~/stores/post'
import {storeToRefs} from 'pinia'

  export const useSearchStore = defineStore('search', () => {
    const searchTerm = ref('')
    const is_search_loading = ref<boolean>(false)
    const searchError = ref<any>(null)
    const data = ref<SearchType | null>(null)
    const {isPostChanged} = storeToRefs(usePostStore());

    async function search() {

      const toast = useToast()

          // base ur from env in runtime config
        const runTimeConfig = useRuntimeConfig()
        const baseUrl:String =  runTimeConfig.public.baseUrl

        // user token
        const myCookieToken = useCookie('myCookieToken')
        // header
        // let headers ={
        //     'Content-Type': 'multipart/form-data',
        //     'Accept': "application/json",
        //     "Authorization" : `Bearer ${myCookieToken.value}`

        // }


        await useFetch(`${baseUrl}/api/search`, {
            method:'post',
            cache:'default',
            watch:[isPostChanged],
            onRequest({ request, options }) {
              // Set the request headers
              options.headers = options.headers || {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization" : `Bearer ${myCookieToken.value}`
              } 
              // body
              options.body = {
                "searchTerm": searchTerm.value,
              }
                 // set loading state to true
                is_search_loading.value = true

            },
            onRequestError({ request, options, error }) {
              // Handle the request errors
              console.log(error.message);
              is_search_loading.value = false
            },

            onResponse({ request, response, options }) {

              if(response.status === 200){
                 data.value = response._data
              }

              is_search_loading.value = false

            },

            onResponseError({ request, response, options, error }) {
              is_search_loading.value = false
              searchError.value = error?.message
              response.status 
              // Handle the response errors
              console.log(response._data)
              toast.add({
                id: 'request_error',
                title: '): Oops!, Error try to search, please try again',
                description: `${response._data.message}`,
                timeout: 0,
              })
            }
          })

          // output_text.value = data.value
          // is_search_loading.value = pending.value

    }
  
    return { searchTerm, is_search_loading, data, search, searchError }
  })
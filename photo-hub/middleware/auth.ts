import { storeToRefs } from "pinia";
import {useUserStore} from '~/stores/user'


export default defineNuxtRouteMiddleware((to) => {
    const { isAuthenticated } = storeToRefs(useUserStore()); // make authenticated state reactive
    const myCookieToken = useCookie('myCookieToken')
 // get token from cookies
  
    if (myCookieToken.value) {
      // check if value exists
      isAuthenticated.value = true; // update the state to authenticated
    }
  
    // if token exists and url is /login redirect to homepage
    if (myCookieToken.value && to.path === '/auth/login') {
      return navigateTo('/');
    }

    
  
    // if token doesn't exist redirect to log in
    if (!myCookieToken.value && to.path !== '/auth/login') {
      abortNavigation();
      return navigateTo('/auth/login');
    }
    
  });
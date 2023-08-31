// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', 'nuxt-icon', '@vueuse/nuxt', '@nuxt/image', '@pinia/nuxt'],
  runtimeConfig: {
    public:{
      baseUrl:process.env.BASE_URL, 
      // encryptStorageKey:'8Jv7sT3qL4fRnKpW9yXh6ZbN2mUcDxG5'
    }
  },
  
})

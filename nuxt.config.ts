// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  app: {
    head: {
      title: 'Lista de Tareas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Aplicación Nuxt con Bootstrap para la lista de tareas' }
      ],
      link: [
        // Agrega el CSS de Bootstrap desde el CDN
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
        }
      ],
      script: [
        // Agrega el JavaScript de Bootstrap desde el CDN (opcional)
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          type: 'text/javascript',
          defer: true
        }
      ]
    },
  },
  modules: ['@nuxtjs/apollo'],
  apollo: {    
    clients: {      
      default: {        
        httpEndpoint: 'http://localhost:8000/graphql/'      
      }    
    },  
  },
})


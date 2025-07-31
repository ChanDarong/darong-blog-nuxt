// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['nuxt-mongoose', '@nuxt/content', '@nuxt/ui', '@nuxt/image', '@nuxt/eslint', '@nuxt/icon'],

  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'server/models',
  },

  app: {
    head: {
      title: 'Darong Blog', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        {
          name: 'description',
          content: 'Tutorials, tips, and best practices for building modern web applications with Laravel.'
        }
      ],
    }
  },

  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: true },
    // Cached for 1 hour
    // '/api/*': { cache: { maxAge: 60 * 60 } },
    // Redirection to avoid 404
    '/old-page': {
      redirect: { to: '/new-page', statusCode: 302 }
    }
    // ...
  },
  runtimeConfig: {
    public: {
      fileUrl: process.env.VERCEL === '1'
        ? 'https://852vat8eczkxtknb.public.blob.vercel-storage.com'
        : process.env.BASE_URL || 'http://localhost:3000'
    }
  }
})
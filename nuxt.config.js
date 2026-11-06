const fs = require('fs');
const path = require('path');

const articleDirectory = path.resolve(__dirname, 'content/articles');
const articleRoutes = fs.readdirSync(articleDirectory)
  .filter(file => file.endsWith('.md'))
  .map(file => `/blog/${file.slice(0, -3)}`);

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Abdelaziz Mahmoud (@abdelaziz321) | Software Engineer',
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Abdelaziz Mahmoud (@abdelaziz321) is a software engineer from Alexandria, Egypt. Explore his work, technical articles, and software engineering notes.'
      },
      { name: 'author', content: 'Abdelaziz Mahmoud' },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Abdelaziz Mahmoud' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Abdelaziz Mahmoud (@abdelaziz321) | Software Engineer'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Software engineer from Alexandria, Egypt. Explore technical articles and notes by Abdelaziz Mahmoud.'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://abdelaziz321.github.io/'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://github.com/abdelaziz321.png'
      },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Abdelaziz Mahmoud (@abdelaziz321) | Software Engineer'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Software engineer from Alexandria, Egypt. Explore technical articles and notes by Abdelaziz Mahmoud.'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://github.com/abdelaziz321.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        hid: 'person-jsonld',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Abdelaziz Mahmoud',
          alternateName: 'abdelaziz321',
          url: 'https://abdelaziz321.github.io/',
          image: 'https://github.com/abdelaziz321.png',
          jobTitle: 'Software Engineer',
          homeLocation: {
            '@type': 'Place',
            name: 'Alexandria, Egypt'
          },
          sameAs: [
            'https://github.com/abdelaziz321',
            'https://www.linkedin.com/in/abdelaziz-mahmoud-2b344b138/',
            'https://stackoverflow.com/users/6739241/abdelaziz-mahmoud'
          ]
        })
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'person-jsonld': ['innerHTML']
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main',
    { src: '~/node_modules/highlight.js/styles/base16/hopscotch.css', lang: 'css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/event-bus.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/svg',
    [
      '@nuxtjs/sitemap',
      {
        hostname: 'https://abdelaziz321.github.io',
        gzip: true,
        routes: articleRoutes
      }
    ]
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-dark.css'
      }
    }
  },

  generate: {
    routes: articleRoutes
  },

  build: {
    transpile: [
      'defu'
    ]
  }
}



























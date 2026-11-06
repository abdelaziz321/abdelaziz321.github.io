<template>
  <div class="home mb-50">
    <about class="mb-50" />
    <!-- <tools class="mb-50" /> -->
    <notes class="mb-50" />
  </div>
</template>


<script>
import About from '~/components/home/About';
import Notes from '~/components/home/Notes';

export default {
  name: 'home-index',
  components: {
    About,
    Notes
  },

  head() {
    const title = 'Abdelaziz Mahmoud (@abdelaziz321) | Software Engineer';
    const description = 'I’m Abdelaziz Mahmoud (@abdelaziz321), a software engineer from Alexandria, Egypt. I build web applications, REST APIs, and cloud-native services, and share what I learn.';

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:url', property: 'og:url', content: 'https://abdelaziz321.github.io/' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https://abdelaziz321.github.io/' }
      ]
    };
  }
}
</script>
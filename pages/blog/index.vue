<template>
  <div class="blog mb-50">
    <section :key="index" v-for="(article, index) in articles" class="mb-40 pb-20 pt-20 pt-30">
      <p class="text-right text-gray">{{ article.date }}</p>
      <h1 class="mb-20">🤿 {{ article.title }}</h1>
      <hr class="divider-line side-label mb-20" />
      <p>{{ article.description }}</p>

      <p class="mb-5 mt-10">
        <router-link :to="`/blog/${article.slug}`">>> Start Reading</router-link>
      </p>
    </section>
  </div>
</template>


<script>
export default {
  name: 'blog-index',

  head() {
    const title = 'Abdelaziz Mahmoud | Blog';
    const description = 'Technical articles and notes by Abdelaziz Mahmoud (@abdelaziz321) on software engineering, web development, and technology.';

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:url', property: 'og:url', content: 'https://abdelaziz321.github.io/blog' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'https://abdelaziz321.github.io/blog' }
      ]
    };
  },

  async asyncData({ $content }) {
    const articles = await $content('articles')
      .without(['body', 'toc'])
      .sortBy('slug', 'desc')
      .fetch();

    return {
      articles: articles.map(article => ({
        ...article,
        date: article.slug.slice(0, 10).replace(/_/g, '-')
      }))
    };
  }
}
</script>
<template>
  <div>
    <section class="article mb-40 pb-20 pt-20 paper">
      <p class="text-right mb-35">{{ article.date }}</p>
      <h1 class="mb-30">🤿 {{ article.title }}</h1>
      <nuxt-content :document="article" />
    </section>

    <!-- <support /> -->

    <comments />
  </div>
</template>


<script>
import Comments from '@/components/blog/Comments';

export default {
  name: 'blog-index',
  components: { Comments },

  head() {
    const title = `${this.article.title} | Abdelaziz Mahmoud (@abdelaziz321)`;
    const description = this.article.description;
    const canonical = `https://abdelaziz321.github.io/blog/${this.article.slug}`;

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:url', property: 'og:url', content: canonical },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: canonical }
      ]
    };
  },


  async asyncData ({ $content, route }) {
    const article = await $content(`articles/${route.params.article}`).fetch();
    article.date = article.slug.slice(0, 10).replace(/_/g, '-');
    return { article };
  }
}
</script>
<template>
  <div>
    <section class="article mb-40 pb-20 pt-20 paper">
      <p class="text-right mb-35">{{ article.date }}</p>
      <h1 class="mb-30">⛵ {{ article.title }}</h1>
      <nuxt-content :document="article" />
    </section>

    <support />

    <comments />
  </div>
</template>


<script>
import Comments from '@/components/blog/Comments';
import Support from '@/components/partials/Support.vue';

export default {
  name: 'blog-index',
  components: { Comments, Support },

  head() {
    return {
      title: `Abdelaziz Mahmoud: ${this.article.title}`,
      meta: [
        {
          hid: this.article.title,
          name: this.article.title,
          content: this.article.description
        }
      ]
    };
  },


  async asyncData ({ $content, route }) {
    const article = await $content(`articles/${route.params.article}`).fetch();
    article.date = article.slug.substr(0, 10).replace(/_/g, '-');
    return { article: article };
  }
}
</script>
<template>
  <div class="blog mb-50">
    <section :key="index" v-for="(article, index) in articles" class="mb-40 pb-20 pt-20 pt-30">
      <p class="text-right text-gray">{{ article.date }}</p>
      <h1 class="mb-20">⛵ {{ article.title }}</h1>
      <hr class="divider-line side-label mb-20" />
      <p>{{ article.description }}</p>

      <p class="mb-5 mt-10">
        <router-link :to="`/blog/${article.slug}`">>> Start Reading</router-link>
      </p>
    </section>

    <!-- <support /> -->
  </div>
</template>


<script>
import Support from '~/components/partials/Support.vue';

export default {
  name: 'blog-index',
  components: { Support },

  head() {
    return {
      title: 'Abdelaziz Mahmoud | Blog'
    };
  },


  data: function () {
    return {
      articles: []
    };
  },


  created() {
    this.fetchArticles();
  },


  methods: {
    async fetchArticles() {
      const articles = await this.$content('articles')
        .without(['body', 'toc'])
        .sortBy('title', 'desc')
        .fetch();

      for (const article of articles) {
        article.date = article.slug.substr(0, 10).replace(/_/g, '-');
      }

      this.articles = articles.sort();
    }
  }
}
</script>
<template>
  <div class="blog mb-50">
    <section :key="index" v-for="(article, index) in articles" class="single-article mb-40 pb-20 pt-20 pt-30">
      <p class="text-right text-gray">{{ article.date }}</p>
      <h1 class="mb-15">⛵ {{ article.title }}</h1>
      <hr />
      <p>{{ article.description }}</p>

      <p class="mb-5 mt-10">
        <router-link class="text-primary"  :to="`blog/${article.slug}`">>> Start Reading</router-link>
      </p>
    </section>
  </div>
</template>


<script>
export default {
  name: 'blog-index',

  head() {
    return {
      title: 'Abdelaziz Sliem | Blog'
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
        .limit(10)
        .fetch();

      for (const article of articles) {
        article.date = article.slug.substr(0, 10).replace(/_/g, '-');
      }

      this.articles = articles.sort();
    }
  }
}
</script>
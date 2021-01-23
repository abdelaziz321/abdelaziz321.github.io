<template>
  <div>
    <section class="article mb-40 pb-20 pt-20 paper">
      <p class="text-right mb-35">{{ article.date }}</p>
      <h1 class="mb-30">⛵ {{ article.title }}</h1>
      <nuxt-content :document="article" />
    </section>

    <section class="mb-40" ref="utteranc-comments-element"></section>
  </div>
</template>


<script>

export default {
  name: 'blog-index',

  head() {
    return {
      title: `Abdelaziz Sliem: ${this.article.title}`,
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
  },


  mounted() {
    let utterancScript = document.createElement('script');
  
    utterancScript.setAttribute('src', 'https://utteranc.es/client.js');
    utterancScript.setAttribute('repo', 'abdelaziz321/abdelaziz321.github.io');
    utterancScript.setAttribute('issue-term', 'pathname');
    utterancScript.setAttribute('label', 'Comments');
    utterancScript.setAttribute('theme', 'github-light');
    utterancScript.setAttribute('crossorigin', 'anonymous');
    utterancScript.setAttribute('async', true);

    this.$refs['utteranc-comments-element'].appendChild(utterancScript);
  }
}
</script>
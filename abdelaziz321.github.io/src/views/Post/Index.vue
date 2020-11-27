<template>
  <section class="post mb-40 pb-20 pt-20 paper">
    <p class="text-right mb-35">{{ post.date }}</p>
    <h1 class="mb-30">⛵ {{ post.title }}</h1>

    <markdown :source="post.content" @rendered="highlightCode()" />
  </section>
</template>


<script>
import Markdown from 'vue-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-liquid';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-scss';
import 'prismjs/themes/prism-coy.css';

export default {
  name: 'blog-index',
  components: { Markdown },
  
  data: function () {
    return {
      post: {
        date: null,
        title: null,
        content: null
      }
    };
  },


  watch: {
    '$route': {
      async handler(route) {
        const postFileName = route.params.post;

        this.post.title = this.getPostTitle(postFileName);
        this.post.date = this.getPostDate(postFileName);

        this.fetchPost(postFileName);
      },
      deep: true,
      immediate: true,
    }
  },

  methods: {
    fetchPost(postFileName) {
      const vue = this;
      const postFileUrl = `${process.env.VUE_APP_BASE_URL}/_posts/${postFileName}`;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState != 4 || this.status != 200) return;
          vue.generatePost(this.responseText);
      };
      xhttp.open("GET", postFileUrl, true);
      xhttp.send();
    },

    generatePost(postFile) {
      this.post.content = postFile;
    },

    highlightCode() {
      this.$nextTick(() => {
        Prism.highlightAll();
      })
    }
  }
}
</script>
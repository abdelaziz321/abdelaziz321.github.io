<template>
  <div class="blog mb-50">
    <section :key="index" v-for="(post, index) in posts" class="single-post mb-40 pb-20 pt-20">
      <p class="text-right">{{ post.date }}</p>
      <h1 class="mb-15">⛵ {{ post.title }}</h1>

      <p class="text-right mb-5">
        <router-link class="btn btn-dark"  :to="`blog/${post.fileName}`">Start Reading</router-link>
      </p>
    </section>
  </div>
</template>


<script>
export default {
  name: 'blog-index',

  data: function () {
    return {
      posts: []
    };
  },


  created() {
    this.fetchPosts();
    document.title = 'Abdelaziz Sliem | Blog';
  },


  methods: {
    fetchPosts() {
      const vue = this;
      const postsDirectoryUrl = 'https://api.github.com/repos/abdelaziz321/abdelaziz321.github.io/contents/public/_posts?ref=master';

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState != 4 || this.status != 200) return;
          vue.generatePostsList(this.responseText);
      };
      xhttp.open("GET", postsDirectoryUrl, true);
      xhttp.send();
    },

    generatePostsList(response) {
      const posts = [];
      const postsDirectories = JSON.parse(response);

      for (const postFile of postsDirectories) {
        if (postFile.type != 'file') continue;

        posts.push({
          title: this.getPostTitle(postFile.name),
          date: this.getPostDate(postFile.name),
          fileName: postFile.name
        });
      }

      this.posts = posts.sort().reverse();
    }
  }
}
</script>
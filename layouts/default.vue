<template>
  <div id="app">
    <!-- NAVBAR -->
    <div class="nav text-center pt-50 pb-50">
      <router-link class="nav-item" to="/">Home</router-link>
      <router-link class="nav-item" to="/blog">Blog</router-link>
    </div>

    <!-- CONTENT -->
    <main class="container">
      <Nuxt />
    </main>

    <!-- FOOTER -->
    <div class="site-footer text-center pt-5 pb-5">developed with ♥ by Abdelaziz Sliem © {{ (new Date).getFullYear() }}</div>
  </div>
</template>


<script>
export default {
  name: 'app',

  created() {
    // this is workaround for gh-pages after handling the 404 page
    if (!process.client) return;

    let pathname = window.sessionStorage.redirect;
    delete window.sessionStorage.redirect;

    if (pathname && pathname != location.pathname) {
      this.$router.push(pathname);
    }
  }
}
</script>
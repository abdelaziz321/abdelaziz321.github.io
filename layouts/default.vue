<template>
  <div id="app">
    <!-- NAVBAR -->
    <nav-bar />

    <!-- CONTENT -->
    <main class="container" style="min-height: calc(100vh - 167px)">
      <Nuxt />
    </main>

    <!-- FOOTER -->
    <page-footer />
  </div>
</template>


<script>
import NavBar from '@/components/partials/NavBar';
import PageFooter from '@/components/partials/PageFooter';

export default {
  name: 'app',

  components: { NavBar, PageFooter },

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
<template>
  <div id="app">
    <!-- NAVBAR -->
    <div class="nav text-center pt-50 pb-50">
      <router-link class="nav-item" to="/">Home</router-link>
      <router-link class="nav-item" to="/blog">Blog</router-link>
    </div>

    <!-- CONTENT -->
    <main>
      <router-view/>
    </main>

    <!-- FOOTER -->
    <div class="site-footer text-center pt-5 pb-5">developed with ♥ by Abdelaziz Sliem © {{ (new Date).getFullYear() }}</div>
  </div>
</template>


<script>
export default {
  name: 'app',
}
</script>


<style lang="scss">
@import './assets/styles/app.scss';
</style>

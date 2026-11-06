<template>
  <div class="page-footer text-center pt-5 pb-5">
    <p>Made with ♥ by <a href="https://github.com/abdelaziz321">@abdelaziz321</a> · © {{ currentYear }}</p>
  </div>
</template>

<script>
export default {
  name: 'page-footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss">
.page-footer {
  font-size: 0.9em;
  background-color: #FFFFFF;
  border-top: 1px solid #DDDDDD;
}

body.dark-mode .page-footer {
  background-color: #1D232F;
  border-top: 1px solid #222222;
}
</style>
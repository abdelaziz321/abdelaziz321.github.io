<template>
  <div class="page-footer text-center pt-5 pb-5">
    developed with ♥ by Abdelaziz Mahmoud ©
    {{ (new Date).getFullYear() }}
  </div>
</template>


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
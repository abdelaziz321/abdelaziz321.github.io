<template>
  <div class="home mb-50">
    <about class="mb-50" />
    <tools class="mb-50" />
    <notes class="mb-50" />
  </div>
</template>


<script>
import About from '~/components/Home/About';
import Tools from '~/components/Home/Tools';
import Notes from '~/components/Home/Notes';

export default {
  name: 'home-index',
  components: {
    About, Tools, Notes
  },


  created() {
    // document.title = 'Abdelaziz Sliem';
  }
}
</script>
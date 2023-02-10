<template>
  <div class="home mb-50">
    <about class="mb-50" />
    <!-- <tools class="mb-50" /> -->
    <notes class="mb-50" />
  </div>
</template>


<script>
import About from '~/components/home/About';
import Tools from '~/components/home/Tools';
import Notes from '~/components/home/Notes';

export default {
  name: 'home-index',
  components: {
    About, Tools, Notes
  }
}
</script>
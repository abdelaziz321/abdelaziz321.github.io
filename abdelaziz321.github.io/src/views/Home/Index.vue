<template>
  <div class="home container mb-50">
    <about class="mb-50" />
    <tools class="mb-50" />
    <notes class="mb-50" />
  </div>
</template>


<script>
import About from './About';
import Tools from './Tools';
import Notes from './Notes';

export default {
  name: 'home-index',
  components: {
    About, Tools, Notes
  }
}
</script>
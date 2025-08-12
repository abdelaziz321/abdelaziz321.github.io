<template>
  <div>
    <!-- NAVBAR -->
    <div style="text-align: center; background-color: #000">
      <svg width="25px" viewBox="0 0 6 3">
        <rect fill="#009639" width="5" height="3"/>
        <rect fill="#FFF" width="5" height="2"/>
        <rect width="5" height="1"/>
        <path fill="#ED2E38" d="M0,0l2,1.5L0,3Z"/>
      </svg>
      <a href="https://www.youtube.com/watch?v=MQ1TAOibLss" target="_blank" style="color: #FFF; text-decoration: none; font-size: 1.3rem;">Free Palestine</a></div>
    <div class="nav text-center pt-50 pb-50">
      <router-link class="nav-item" to="/">Home</router-link>
      <router-link class="nav-item" to="/blog">Blog</router-link>

      <label class="nav-item nav-switch mb-0">
        <input type="checkbox" v-model="isDarkMode" @change="updateColorScheme(isDarkMode ? 'dark' : 'light')" />
        <span class="slider">
          <crescent-icon class="crescent-icon" />
        </span>
      </label>
    </div>
  </div>
</template>


<script>
import CrescentIcon from '@/assets/images/crescent.svg?inline';

export default {
  name: 'nav-bar',
  components: { CrescentIcon },

  head () {
    return {
      bodyAttrs: {
        class: this.isDarkMode ? 'dark-mode' : ''
      }
    }
  },

  data: function () {
    return {
      isDarkMode: true,
    };
  },

  mounted() {
    if (!process.client) return;
    const storedColorScheme = window.localStorage.getItem('color-scheme-preference');
    this.isDarkMode = storedColorScheme ? storedColorScheme === 'dark' : true;
  },

  methods: {
    updateColorScheme(colorScheme) {
      window.localStorage.setItem('color-scheme-preference', colorScheme);
      this.$bus.$emit('updateColorScheme', colorScheme);
    }
  }
}
</script>


<style lang="scss">
.upper-nav {
  text-align: center;
  background-color: #1e2933;

  a {
    color: #FFFFFF !important;
  }
}

.nav-item {
  margin: 0 1em;
  color: #333333;
  text-decoration: none;

  body.dark-mode & {
    color: #BBBBBB;
  }
}

.nav-switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 22px;
  vertical-align: middle;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider .crescent-icon {
      transform: translateX(18px);
      fill: #666666;
    }

    &:checked + .slider {
      background-color: #f5f5f5;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.2s;
    border-radius: 10px;
    background-color: #666666;

    .crescent-icon {
      position: absolute;
      fill: #f5f5f5;
      height: 16px;
      width: 16px;
      left: 6px;
      bottom: 3px;
      transition: .2s;
      border-radius: 50%;
    }
  }
}
</style>

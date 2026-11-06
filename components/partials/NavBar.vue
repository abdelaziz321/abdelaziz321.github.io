<template>
  <div>
    <div class="solidarity-banner">
      <svg width="25" viewBox="0 0 6 3" aria-hidden="true" focusable="false">
        <rect fill="#009639" width="5" height="3"/>
        <rect fill="#FFF" width="5" height="2"/>
        <rect width="5" height="1"/>
        <path fill="#ED2E38" d="M0,0l2,1.5L0,3Z"/>
      </svg>
      <span>Free Palestine</span>
    </div>
    <nav class="nav text-center pt-50 pb-50" aria-label="Primary navigation">
      <nuxt-link class="nav-item" to="/" exact>Home</nuxt-link>
      <nuxt-link class="nav-item" to="/blog">Blog</nuxt-link>

      <label class="nav-item nav-switch mb-0">
        <input
          type="checkbox"
          v-model="isDarkMode"
          aria-label="Use dark color theme"
          @change="updateColorScheme(isDarkMode ? 'dark' : 'light')"
        />
        <span class="slider" aria-hidden="true">
          <crescent-icon class="crescent-icon" aria-hidden="true" focusable="false" />
        </span>
      </label>
    </nav>
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
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = storedColorScheme
      ? storedColorScheme === 'dark'
      : prefersDarkMode;
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

.solidarity-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.35rem;
  background-color: #000000;

  span {
    color: #FFFFFF;
    font-size: 1.3rem;
    text-decoration: none;
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
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);

    &:focus-visible + .slider {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }

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

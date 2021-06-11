<template>
  <section class="mb-40" ref="utteranc-comments-element"></section>
</template>


<script>
export default {
  name: 'comments',

  mounted() {
    this.setUtterancSection(
      document.body.classList.contains('dark-mode')
    );

    this.$bus.$on('updateColorScheme', (colorScheme) => {
      this.setUtterancSection(colorScheme);
    });
  },

  methods: {
    setUtterancSection (colorScheme) {
      let utterancSection = this.$refs['utteranc-comments-element'];
      if (!utterancSection) return;

      if (utterancSection.firstChild) {
        this.$refs['utteranc-comments-element'].removeChild(utterancSection.firstChild);
      }

      let utterancScript = document.createElement('script');
  
      utterancScript.setAttribute('src', 'https://utteranc.es/client.js');
      utterancScript.setAttribute('repo', 'abdelaziz321/abdelaziz321.github.io');
      utterancScript.setAttribute('issue-term', 'pathname');
      utterancScript.setAttribute('label', 'Comments');
      utterancScript.setAttribute('theme', colorScheme == 'dark' ? 'dark-blue' : 'github-light');
      utterancScript.setAttribute('crossorigin', 'anonymous');
      utterancScript.setAttribute('async', true);

      this.$refs['utteranc-comments-element'].appendChild(utterancScript);
    }
  }
}
</script>


<style lang="scss">
.utterances {
  max-width: initial;
}
</style>
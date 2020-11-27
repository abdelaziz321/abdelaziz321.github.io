import Vue from "vue";

Vue.mixin({
  methods: {
    getPostTitle(directoryName) {
      return directoryName.substring(10, directoryName.length - 3)
        .replace(/_/g, " ").replace(/\b[a-z]/g, function () {
          return arguments[0].toUpperCase();
        });
    },

    getPostDate(directoryName) {
      return directoryName.substr(0, 10).replace(/_/g, '-');
    },
  }
});

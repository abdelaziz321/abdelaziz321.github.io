exports.ids = [2];
exports.modules = {

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/partials/Support.vue?vue&type=template&id=72c1c4aa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"mb-40"},[_vm._ssrNode("<p>if you liked the content of this blog you can support me through paypal</p> <a href=\"https://paypal.me/abdelazizmahmoud1\" target=\"_blank\"><img"+(_vm._ssrAttr("src",__webpack_require__(42)))+" alt=\"paypal\" style=\"max-width: 150px; padding-top: 1rem\"></a>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/partials/Support.vue?vue&type=template&id=72c1c4aa&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/partials/Support.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Supportvue_type_script_lang_js_ = ({
  name: 'support'
});
// CONCATENATED MODULE: ./components/partials/Support.vue?vue&type=script&lang=js&
 /* harmony default export */ var partials_Supportvue_type_script_lang_js_ = (Supportvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/partials/Support.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  partials_Supportvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "45c1aff4"
  
)

/* harmony default export */ var Support = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/paypal.ad6ae0f.png";

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/blog/index.vue?vue&type=template&id=19e205fc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blog mb-50"},[_vm._l((_vm.articles),function(article,index){return _vm._ssrNode("<section class=\"mb-40 pb-20 pt-20 pt-30\">","</section>",[_vm._ssrNode("<p class=\"text-right text-gray\">"+_vm._ssrEscape(_vm._s(article.date))+"</p> <h1 class=\"mb-20\">"+_vm._ssrEscape("⛵ "+_vm._s(article.title))+"</h1> <hr class=\"divider-line side-label mb-20\"> <p>"+_vm._ssrEscape(_vm._s(article.description))+"</p> "),_vm._ssrNode("<p class=\"mb-5 mt-10\">","</p>",[_c('router-link',{attrs:{"to":("/blog/" + (article.slug))}},[_vm._v(">> Start Reading")])],1)],2)}),_vm._ssrNode(" "),_c('support')],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/blog/index.vue?vue&type=template&id=19e205fc&

// EXTERNAL MODULE: ./components/partials/Support.vue + 4 modules
var Support = __webpack_require__(41);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/blog/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var blogvue_type_script_lang_js_ = ({
  name: 'blog-index',
  components: {
    Support: Support["default"]
  },

  head() {
    return {
      title: 'Abdelaziz Sliem | Blog'
    };
  },

  data: function () {
    return {
      articles: []
    };
  },

  created() {
    this.fetchArticles();
  },

  methods: {
    async fetchArticles() {
      const articles = await this.$content('articles').without(['body', 'toc']).sortBy('title', 'desc').fetch();

      for (const article of articles) {
        article.date = article.slug.substr(0, 10).replace(/_/g, '-');
      }

      this.articles = articles.sort();
    }

  }
});
// CONCATENATED MODULE: ./pages/blog/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_blogvue_type_script_lang_js_ = (blogvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/blog/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_blogvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "d4386992"
  
)

/* harmony default export */ var blog = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {Support: __webpack_require__(41).default})


/***/ })

};;
//# sourceMappingURL=index.js.map
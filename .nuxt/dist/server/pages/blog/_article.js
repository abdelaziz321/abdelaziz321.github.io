exports.ids = [1];
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

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(3).default
module.exports.__inject__ = function (context) {
  add("52b3e994", content, true, context)
};

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blog/Comments.vue?vue&type=template&id=b8b802b6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{ref:"utteranc-comments-element",staticClass:"mb-40"},[])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/blog/Comments.vue?vue&type=template&id=b8b802b6&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/blog/Comments.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var Commentsvue_type_script_lang_js_ = ({
  name: 'comments',

  mounted() {
    this.setUtterancSection(document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    this.$bus.$on('updateColorScheme', colorScheme => {
      this.setUtterancSection(colorScheme);
    });
  },

  methods: {
    setUtterancSection(colorScheme) {
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
});
// CONCATENATED MODULE: ./components/blog/Comments.vue?vue&type=script&lang=js&
 /* harmony default export */ var blog_Commentsvue_type_script_lang_js_ = (Commentsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/blog/Comments.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(51)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blog_Commentsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "ba0110e2"
  
)

/* harmony default export */ var Comments = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comments_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".utterances{max-width:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/blog/_article.vue?vue&type=template&id=373963b8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<section class=\"article mb-40 pb-20 pt-20 paper\">","</section>",[_vm._ssrNode("<p class=\"text-right mb-35\">"+_vm._ssrEscape(_vm._s(_vm.article.date))+"</p> <h1 class=\"mb-30\">"+_vm._ssrEscape("⛵ "+_vm._s(_vm.article.title))+"</h1> "),_c('nuxt-content',{attrs:{"document":_vm.article}})],2),_vm._ssrNode(" "),_c('support'),_vm._ssrNode(" "),_c('comments')],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/blog/_article.vue?vue&type=template&id=373963b8&

// EXTERNAL MODULE: ./components/blog/Comments.vue + 4 modules
var Comments = __webpack_require__(47);

// EXTERNAL MODULE: ./components/partials/Support.vue + 4 modules
var Support = __webpack_require__(41);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/blog/_article.vue?vue&type=script&lang=js&
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


/* harmony default export */ var _articlevue_type_script_lang_js_ = ({
  name: 'blog-index',
  components: {
    Comments: Comments["default"],
    Support: Support["default"]
  },

  head() {
    return {
      title: `Abdelaziz Sliem: ${this.article.title}`,
      meta: [{
        hid: this.article.title,
        name: this.article.title,
        content: this.article.description
      }]
    };
  },

  async asyncData({
    $content,
    route
  }) {
    const article = await $content(`articles/${route.params.article}`).fetch();
    article.date = article.slug.substr(0, 10).replace(/_/g, '-');
    return {
      article: article
    };
  }

});
// CONCATENATED MODULE: ./pages/blog/_article.vue?vue&type=script&lang=js&
 /* harmony default export */ var blog_articlevue_type_script_lang_js_ = (_articlevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/blog/_article.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  blog_articlevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "5af40a3c"
  
)

/* harmony default export */ var _article = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {Support: __webpack_require__(41).default,Comments: __webpack_require__(47).default})


/***/ })

};;
//# sourceMappingURL=_article.js.map
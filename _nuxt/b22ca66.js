(window.webpackJsonp=window.webpackJsonp||[]).push([[7,3,6],{311:function(t,e,n){t.exports=n.p+"img/paypal.5212df7.png"},314:function(t,e,n){var content=n(331);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(45).default)("702fab07",content,!0,{sourceMap:!1})},315:function(t,e,n){"use strict";n.r(e);var r=[function(){var t=this,e=t._self._c;return e("section",{staticClass:"mb-40"},[e("p",[t._v("if you liked the content of this blog you can support me through paypal")]),t._v(" "),e("a",{attrs:{href:"https://paypal.me/abdelazizmahmoud1",target:"_blank"}},[e("img",{staticStyle:{"max-width":"150px","padding-top":"1rem"},attrs:{src:n(311),alt:"paypal"}})])])}],c={name:"support"},o=n(25),component=Object(o.a)(c,(function(){this._self._c;return this._m(0)}),r,!1,null,null,null);e.default=component.exports},330:function(t,e,n){"use strict";n(314)},331:function(t,e,n){var r=n(44)((function(i){return i[1]}));r.push([t.i,".utterances{max-width:none}",""]),r.locals={},t.exports=r},335:function(t,e,n){"use strict";n.r(e);var r={name:"comments",mounted:function(){var t=this;this.setUtterancSection(document.body.classList.contains("dark-mode")?"dark":"light"),this.$bus.$on("updateColorScheme",(function(e){t.setUtterancSection(e)}))},methods:{setUtterancSection:function(t){var e=this.$refs["utteranc-comments-element"];if(e){e.firstChild&&this.$refs["utteranc-comments-element"].removeChild(e.firstChild);var n=document.createElement("script");n.setAttribute("src","https://utteranc.es/client.js"),n.setAttribute("repo","abdelaziz321/abdelaziz321.github.io"),n.setAttribute("issue-term","pathname"),n.setAttribute("label","Comments"),n.setAttribute("theme","dark"==t?"dark-blue":"github-light"),n.setAttribute("crossorigin","anonymous"),n.setAttribute("async",!0),this.$refs["utteranc-comments-element"].appendChild(n)}}}},c=(n(330),n(25)),component=Object(c.a)(r,(function(){return(0,this._self._c)("section",{ref:"utteranc-comments-element",staticClass:"mb-40"})}),[],!1,null,null,null);e.default=component.exports},385:function(t,e,n){"use strict";n.r(e);var r=n(9),c=(n(57),n(30),n(55),n(26),n(58),n(335)),o=n(315),l={name:"blog-index",components:{Comments:c.default,Support:o.default},head:function(){return{title:"Abdelaziz Mahmoud: ".concat(this.article.title),meta:[{hid:this.article.title,name:this.article.title,content:this.article.description}]}},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,article;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.route,e.next=3,n("articles/".concat(r.params.article)).fetch();case 3:return(article=e.sent).date=article.slug.substr(0,10).replace(/_/g,"-"),e.abrupt("return",{article:article});case 6:case"end":return e.stop()}}),e)})))()}},m=n(25),component=Object(m.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("section",{staticClass:"article mb-40 pb-20 pt-20 paper"},[e("p",{staticClass:"text-right mb-35"},[t._v(t._s(t.article.date))]),t._v(" "),e("h1",{staticClass:"mb-30"},[t._v("⛵ "+t._s(t.article.title))]),t._v(" "),e("nuxt-content",{attrs:{document:t.article}})],1),t._v(" "),e("comments")],1)}),[],!1,null,null,null);e.default=component.exports}}]);
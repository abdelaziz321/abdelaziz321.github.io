(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{239:function(t,e,n){"use strict";n.r(e);var r=[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"mb-40"},[e("p",[this._v("if you liked the content of this blog you can support me through paypal")]),this._v(" "),e("a",{attrs:{href:"https://paypal.me/abdelazizmahmoud1",target:"_blank"}},[e("img",{staticStyle:{"max-width":"150px","padding-top":"1rem"},attrs:{src:n(240),alt:"paypal"}})])])}],o={name:"support"},c=n(17),component=Object(c.a)(o,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),r,!1,null,null,null);e.default=component.exports},240:function(t,e,n){t.exports=n.p+"img/paypal.ad6ae0f.png"},241:function(t,e,n){var r=n(3);e.f=r},242:function(t,e,n){var content=n(255);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(26).default)("52b3e994",content,!0,{sourceMap:!1})},246:function(t,e,n){"use strict";n.r(e);var r={name:"comments",mounted:function(){var t=this;this.setUtterancSection(document.body.classList.contains("dark-mode")?"dark":"light"),this.$bus.$on("updateColorScheme",(function(e){t.setUtterancSection(e)}))},methods:{setUtterancSection:function(t){var e=this.$refs["utteranc-comments-element"];if(e){e.firstChild&&this.$refs["utteranc-comments-element"].removeChild(e.firstChild);var n=document.createElement("script");n.setAttribute("src","https://utteranc.es/client.js"),n.setAttribute("repo","abdelaziz321/abdelaziz321.github.io"),n.setAttribute("issue-term","pathname"),n.setAttribute("label","Comments"),n.setAttribute("theme","dark"==t?"dark-blue":"github-light"),n.setAttribute("crossorigin","anonymous"),n.setAttribute("async",!0),this.$refs["utteranc-comments-element"].appendChild(n)}}}},o=(n(254),n(17)),component=Object(o.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("section",{ref:"utteranc-comments-element",staticClass:"mb-40"})}),[],!1,null,null,null);e.default=component.exports},250:function(t,e,n){"use strict";var r=n(2),o=n(4),c=n(30),l=n(23),f=n(12),m=n(118),h=n(174),d=n(6),y=n(11),v=n(84),S=n(8),w=n(7),O=n(20),_=n(28),j=n(80),x=n(44),C=n(85),$=n(60),k=n(114),E=n(251),P=n(117),z=n(43),A=n(19),N=n(79),J=n(21),U=n(14),D=n(115),F=n(81),R=n(82),T=n(116),I=n(3),L=n(241),M=n(252),Q=n(47),W=n(29),B=n(34).forEach,G=F("hidden"),H=I("toPrimitive"),K=W.set,V=W.getterFor("Symbol"),X=Object.prototype,Y=o.Symbol,Z=c("JSON","stringify"),tt=z.f,et=A.f,nt=E.f,it=N.f,ot=D("symbols"),st=D("op-symbols"),at=D("string-to-symbol-registry"),ct=D("symbol-to-string-registry"),ut=D("wks"),lt=o.QObject,ft=!lt||!lt.prototype||!lt.prototype.findChild,pt=f&&d((function(){return 7!=C(et({},"a",{get:function(){return et(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=tt(X,e);r&&delete X[e],et(t,e,n),r&&t!==X&&et(X,e,r)}:et,mt=function(t,e){var symbol=ot[t]=C(Y.prototype);return K(symbol,{type:"Symbol",tag:t,description:e}),f||(symbol.description=e),symbol},ht=h?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof Y},bt=function(t,e,n){t===X&&bt(st,e,n),w(t);var r=j(e,!0);return w(n),y(ot,r)?(n.enumerable?(y(t,G)&&t[G][r]&&(t[G][r]=!1),n=C(n,{enumerable:x(0,!1)})):(y(t,G)||et(t,G,x(1,{})),t[G][r]=!0),pt(t,r,n)):et(t,r,n)},yt=function(t,e){w(t);var n=_(e),r=$(n).concat(wt(n));return B(r,(function(e){f&&!vt.call(n,e)||bt(t,e,n[e])})),t},vt=function(t){var e=j(t,!0),n=it.call(this,e);return!(this===X&&y(ot,e)&&!y(st,e))&&(!(n||!y(this,e)||!y(ot,e)||y(this,G)&&this[G][e])||n)},gt=function(t,e){var n=_(t),r=j(e,!0);if(n!==X||!y(ot,r)||y(st,r)){var o=tt(n,r);return!o||!y(ot,r)||y(n,G)&&n[G][r]||(o.enumerable=!0),o}},St=function(t){var e=nt(_(t)),n=[];return B(e,(function(t){y(ot,t)||y(R,t)||n.push(t)})),n},wt=function(t){var e=t===X,n=nt(e?st:_(t)),r=[];return B(n,(function(t){!y(ot,t)||e&&!y(X,t)||r.push(ot[t])})),r};(m||(U((Y=function(){if(this instanceof Y)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=T(t),n=function(t){this===X&&n.call(st,t),y(this,G)&&y(this[G],e)&&(this[G][e]=!1),pt(this,e,x(1,t))};return f&&ft&&pt(X,e,{configurable:!0,set:n}),mt(e,t)}).prototype,"toString",(function(){return V(this).tag})),U(Y,"withoutSetter",(function(t){return mt(T(t),t)})),N.f=vt,A.f=bt,z.f=gt,k.f=E.f=St,P.f=wt,L.f=function(t){return mt(I(t),t)},f&&(et(Y.prototype,"description",{configurable:!0,get:function(){return V(this).description}}),l||U(X,"propertyIsEnumerable",vt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!m,sham:!m},{Symbol:Y}),B($(ut),(function(t){M(t)})),r({target:"Symbol",stat:!0,forced:!m},{for:function(t){var e=String(t);if(y(at,e))return at[e];var symbol=Y(e);return at[e]=symbol,ct[symbol]=e,symbol},keyFor:function(t){if(!ht(t))throw TypeError(t+" is not a symbol");if(y(ct,t))return ct[t]},useSetter:function(){ft=!0},useSimple:function(){ft=!1}}),r({target:"Object",stat:!0,forced:!m,sham:!f},{create:function(t,e){return void 0===e?C(t):yt(C(t),e)},defineProperty:bt,defineProperties:yt,getOwnPropertyDescriptor:gt}),r({target:"Object",stat:!0,forced:!m},{getOwnPropertyNames:St,getOwnPropertySymbols:wt}),r({target:"Object",stat:!0,forced:d((function(){P.f(1)}))},{getOwnPropertySymbols:function(t){return P.f(O(t))}}),Z)&&r({target:"JSON",stat:!0,forced:!m||d((function(){var symbol=Y();return"[null]"!=Z([symbol])||"{}"!=Z({a:symbol})||"{}"!=Z(Object(symbol))}))},{stringify:function(t,e,n){for(var r,o=[t],c=1;arguments.length>c;)o.push(arguments[c++]);if(r=e,(S(e)||void 0!==t)&&!ht(t))return v(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ht(e))return e}),o[1]=e,Z.apply(null,o)}});Y.prototype[H]||J(Y.prototype,H,Y.prototype.valueOf),Q(Y,"Symbol"),R[G]=!0},251:function(t,e,n){var r=n(28),o=n(114).f,c={}.toString,l="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return l&&"[object Window]"==c.call(t)?function(t){try{return o(t)}catch(t){return l.slice()}}(t):o(r(t))}},252:function(t,e,n){var path=n(173),r=n(11),o=n(241),c=n(19).f;t.exports=function(t){var e=path.Symbol||(path.Symbol={});r(e,t)||c(e,t,{value:o.f(t)})}},253:function(t,e,n){"use strict";var r=n(2),o=n(12),c=n(4),l=n(11),f=n(8),m=n(19).f,h=n(172),d=c.Symbol;if(o&&"function"==typeof d&&(!("description"in d.prototype)||void 0!==d().description)){var y={},v=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof v?new d(t):void 0===t?d():d(t);return""===t&&(y[e]=!0),e};h(v,d);var S=v.prototype=d.prototype;S.constructor=v;var w=S.toString,O="Symbol(test)"==String(d("test")),_=/^Symbol\((.*)\)[^)]+$/;m(S,"description",{configurable:!0,get:function(){var symbol=f(this)?this.valueOf():this,t=w.call(symbol);if(l(y,symbol))return"";var desc=O?t.slice(7,-1):t.replace(_,"$1");return""===desc?void 0:desc}}),r({global:!0,forced:!0},{Symbol:v})}},254:function(t,e,n){"use strict";n(242)},255:function(t,e,n){(e=n(25)(!1)).push([t.i,".utterances{max-width:none}",""]),t.exports=e},309:function(t,e,n){"use strict";n.r(e);n(250),n(253),n(27),n(42),n(33);var r=n(5),o=n(246),c=n(239),l={name:"blog-index",components:{Comments:o.default,Support:c.default},head:function(){return{title:"Abdelaziz Sliem: ".concat(this.article.title),meta:[{hid:this.article.title,name:this.article.title,content:this.article.description}]}},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,article;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.route,e.next=3,n("articles/".concat(r.params.article)).fetch();case 3:return(article=e.sent).date=article.slug.substr(0,10).replace(/_/g,"-"),e.abrupt("return",{article:article});case 6:case"end":return e.stop()}}),e)})))()}},f=n(17),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("section",{staticClass:"article mb-40 pb-20 pt-20 paper"},[n("p",{staticClass:"text-right mb-35"},[t._v(t._s(t.article.date))]),t._v(" "),n("h1",{staticClass:"mb-30"},[t._v("⛵ "+t._s(t.article.title))]),t._v(" "),n("nuxt-content",{attrs:{document:t.article}})],1),t._v(" "),n("support"),t._v(" "),n("comments")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Support:n(239).default,Comments:n(246).default})}}]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-td/u-td"],{"355a":function(t,e,n){},"6b0f":function(t,e,n){"use strict";n.r(e);var r=n("8279"),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=a.a},8279:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"u-td",props:{width:{type:[Number,String],default:"auto"},customStyle:{type:Object,default:function(){return{}}}},data:function(){return{tdStyle:{}}},created:function(){this.parent=!1},mounted:function(){if(this.parent=this.$u.$parent.call(this,"u-table"),this.parent){var t={};"auto"!=this.width&&(t.flex="0 0 ".concat(this.width)),t.textAlign=this.parent.align,t.fontSize=this.parent.fontSize+"rpx",t.padding=this.parent.padding,t.borderBottom="solid 1px ".concat(this.parent.borderColor),t.borderRight="solid 1px ".concat(this.parent.borderColor),t.color=this.parent.color,Object.assign(t,this.customStyle),this.tdStyle=t}}};e.default=r},"8c5e":function(t,e,n){"use strict";var r=n("355a"),a=n.n(r);a.a},bc51:function(t,e,n){"use strict";n.r(e);var r=n("fc6d"),a=n("6b0f");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("8c5e");var o,u=n("f0c5"),c=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"9e744e68",null,!1,r["a"],o);e["default"]=c.exports},fc6d:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.tdStyle]));t.$mp.data=Object.assign({},{$root:{s0:n}})},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-td/u-td-create-component',
    {
        'uview-ui/components/u-td/u-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("bc51"))
        })
    },
    [['uview-ui/components/u-td/u-td-create-component']]
]);

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-gap/u-gap"],{"5c8d":function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,r=(t._self._c,t.__get_style([t.gapStyle]));t.$mp.data=Object.assign({},{$root:{s0:r}})},a=[]},"5e8d":function(t,e,r){"use strict";r.r(e);var n=r("5c8d"),o=r("fb83");for(var a in o)"default"!==a&&function(t){r.d(e,t,(function(){return o[t]}))}(a);r("aa11");var u,i=r("f0c5"),c=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,"066f93f4",null,!1,n["a"],u);e["default"]=c.exports},"93ea":function(t,e,r){"use strict";function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-gap",props:{bgColor:{type:String,default:"transparent "},height:{type:[String,Number],default:30},marginTop:{type:[String,Number],default:0},marginBottom:{type:[String,Number],default:0},customStyle:{type:Object,default:function(){return{}}}},computed:{gapStyle:function(){var t={};return Object.assign(t,{backgroundColor:this.bgColor,height:this.height+"rpx",marginTop:this.marginTop+"rpx",marginBottom:this.marginBottom+"rpx"},o({},this.customStyle)),console.log("styles"+JSON.stringify(t)),t}}};e.default=u},a876:function(t,e,r){},aa11:function(t,e,r){"use strict";var n=r("a876"),o=r.n(n);o.a},fb83:function(t,e,r){"use strict";r.r(e);var n=r("93ea"),o=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-gap/u-gap-create-component',
    {
        'uview-ui/components/u-gap/u-gap-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5e8d"))
        })
    },
    [['uview-ui/components/u-gap/u-gap-create-component']]
]);
!function(n){function t(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return n[e].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=n,t.c=r,t.p="",t(0)}([function(n,t,r){"use strict";function e(n){return n&&n.__esModule?n:{"default":n}}var o=r(1),i=e(o),u=10,s=(0,i["default"])({conditions:[function(){return u>1},function(){return u>3},function(){return u>8},function(){return u>10}],relations:{result1:["1110","111*"],result2:["1000",""]}});console.info(s.run()),u=2,console.info(s.run())},function(n,t){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var e=function(){function n(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}return function(t,r,e){return r&&n(t.prototype,r),e&&n(t,e),t}}(),o=function(){function n(t){r(this,n),this.opt=t}return e(n,[{key:"run",value:function(){var n=(this.opt.conditions,this.opt.relations),t=[];for(var r in n)if(this._isPass(n[r])&&(t.push(r),this.opt.matchOnce))break;return t}},{key:"_isPass",value:function(n){var t=!1;for(var r in n)if(this._isPassByFunctions(n[r])){t=!0;break}return t}},{key:"_isPassByFunctions",value:function(n){var t=!0,r=this.opt.conditions;for(var e in n)if("*"!==n[e]){var o=n[e],i=r[e]();if(i===!0?i="1":i===!1&&(i="0"),i.toString()!==o){t=!1;break}}return t}}]),n}(),i=function(n){return new o(n)};t["default"]=i}]);
//# sourceMappingURL=test.bundle.js.map
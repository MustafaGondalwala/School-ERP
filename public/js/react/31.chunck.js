(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{361:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return y}));var r=n(0),o=n.n(r),c=n(55),i=n.n(c),u=n(1);n(3);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m(e);if(t){var o=m(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(a,e);var t,n,r,c=s(a);function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=c.call(this,e)).state={notices:""},t}return t=a,(n=[{key:"componentDidMount",value:function(){var e=this.props.notices;this.setState({notices:e})}},{key:"render",value:function(){var e=this.props.eventType,t=[{name:"id",selector:"id",sortable:!0},{name:"title",selector:"title",sortable:!0},{name:"Student",right:!0,cell:function(e){return o.a.createElement("div",null,o.a.createElement("input",{readOnly:!0,type:"checkbox",checked:e.student}))}},{name:"Staff",right:!0,cell:function(e){return o.a.createElement("div",null,o.a.createElement("input",{readOnly:!0,type:"checkbox",checked:e.staff}))}},{name:"Parent",right:!0,cell:function(e){return o.a.createElement("div",null,o.a.createElement("input",{readOnly:!0,type:"checkbox",checked:e.parent}))}},{name:"Publish",right:!0,cell:function(e){return o.a.createElement("div",null,o.a.createElement("input",{readOnly:!0,type:"checkbox",checked:e.publish}))}},{name:"View",right:!0,cell:function(t){return o.a.createElement("div",null,o.a.createElement(u.a,{primary:!0,sm:!0,onClick:function(){return e("view",t.id)}},"View"))}},{name:"Edit",right:!0,cell:function(t){return o.a.createElement("div",null,o.a.createElement(u.a,{warning:!0,sm:!0,onClick:function(){return e("edit",t.id)}},"Edit"))}},{name:"Remove",right:!0,cell:function(t){return o.a.createElement("div",null,o.a.createElement(u.a,{danger:!0,sm:!0,onClick:function(){return e("remove",t.id)}},"Remove"))}}],n=this.state.notices;return o.a.createElement("div",null,o.a.createElement(i.a,{title:"All Notice's",columns:t,data:n}))}}])&&l(t.prototype,n),r&&l(t,r),a}(r.Component)}}]);
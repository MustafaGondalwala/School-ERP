(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{260:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=(n(21),n(2)),c=n(46),l=n(7);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=b(e);if(t){var r=b(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return m(this,n)}}function m(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?p(e):t}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(l,e);var t,n,a,c=f(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=c.call(this,e)).addClickFunction=t.addClickFunction.bind(p(t)),t}return t=l,(n=[{key:"addClickFunction",value:function(){this.props.sendEventType("add",null)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.teacher_timetables,n=e.setTimetableTeacherDispatch;0==Object.keys(t).length&&n()}},{key:"updateTimeTable",value:function(e){this.props.sendEventType("edit",e)}},{key:"render",value:function(){var e=this,t=this.props.teacher_timetables;return r.a.createElement(o.default,{title:"TimeTable",back_link:"/admin/timetable",add_object:{text:"Add",clickFunction:this.addClickFunction}},Object.keys(t).length>0&&r.a.createElement("div",{className:"table-responsive"},r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Sr no."),r.a.createElement("th",null,"Time Table Name"),r.a.createElement("th",null,"Actions"))),r.a.createElement("tbody",null,Object.keys(t).map((function(n,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,a+1),r.a.createElement("td",null,t[n].time_table_name),r.a.createElement("td",{className:"table-actions"},r.a.createElement("a",{href:"#!",onClick:function(a){return e.updateTimeTable(t[n].time_table_name)},className:"table-action","data-toggle":"tooltip","data-original-title":"Edit TimeTable"},r.a.createElement("i",{className:"fas fa-user-edit"})),r.a.createElement("a",{href:"#!",onClick:function(a){return e.removeClass(t[n].time_table_name)},className:"table-action table-action-delete","data-toggle":"tooltip","data-original-title":"Delete TimeTable"},r.a.createElement("i",{className:"fas fa-trash"}))))}))))))}}])&&u(t.prototype,n),a&&u(t,a),l}(a.Component);t.default=Object(l.b)((function(e){return{teacher_timetables:e.teacher_timetables}}),{setTimetableTeacherDispatch:c.c})(d)}}]);
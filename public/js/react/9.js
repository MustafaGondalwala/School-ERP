(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{234:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(2),u=n(3),c=n(57),i=n.n(c),l=n(1),s=n(224),f=n.n(s),m=n(225),d=n.n(m),p=n(5);function h(t){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=E(t);if(e){var a=E(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return S(this,n)}}function S(t,e){return!e||"object"!==h(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(s,t);var e,n,r,c=v(s);function s(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,s),(e=c.call(this,t)).state={student_status:"",check:""},e}return e=s,(n=[{key:"fetchData",value:function(t){var e=this;this.setState({student_status:""}),u.a.teacher.homework.get_student_status(t).then((function(t){var n=t.student_status;e.setState({student_status:n})}))}},{key:"componentDidMount",value:function(){var t=this.props.homework_id;this.fetchData(t)}},{key:"componentWillReceiveProps",value:function(){var t=this.props.homework_id;this.fetchData(t)}},{key:"fetchStatus",value:function(t){switch(t){case 1:return"Pending";case 2:return"Completed";case 3:return"Issue Raised";case 4:return"Submitted";case 5:return"Rejected"}}},{key:"viewSubmition",value:function(t){this.setState({check:t})}},{key:"render",value:function(){var t=this,e=this.state,n=e.student_status,r=e.check,u=[{name:"Sr no.",selector:"id",sortable:!0},{name:"Student Roll No",sortable:!0,cell:function(t){return a.a.createElement("div",null,t.student.roll_no)}},{name:"Student Name",sortable:!0,right:!0,cell:function(t){return a.a.createElement("div",null,t.student.student_name)}},{name:"Status",sortable:!0,right:!0,cell:function(e){return a.a.createElement("div",null,t.fetchStatus(e.status))}},{name:"View Submission",cell:function(e){return a.a.createElement("div",null,(2==e.status||4==e.status)&&a.a.createElement(l.a,{onClick:function(n){return t.viewSubmition(e)},primary:!0,sm:!0},"Check"))}}];return a.a.createElement("div",null,a.a.createElement(o.default,{title:"HomeWork Student Status"},n?a.a.createElement("div",null,a.a.createElement(i.a,{title:null,columns:u,data:n})):a.a.createElement("h2",null,"Loading ...")),r&&a.a.createElement(k,{updateHomeWorkSubmission:this.updateHomeWorkSubmission,data:r}))}}])&&y(e.prototype,n),r&&y(e,r),s}(a.a.Component),k=function(t){var e=t.data,n="Submission: "+e.student.student_name,r=e.description,u=e.files;return a.a.createElement(o.default,{title:n},a.a.createElement(p.default,null,a.a.createElement(l.c,null,a.a.createElement(l.d,null,a.a.createElement(l.e,null,"Description"),a.a.createElement(f.a,{disabled:!0,editor:d.a,data:r,onInit:function(t){t.setData(r)}})),a.a.createElement(l.d,null,a.a.createElement(l.h,{files:u})))))};e.default=w}}]);
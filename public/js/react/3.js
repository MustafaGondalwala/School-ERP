(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{263:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return O}));var a=n(0),r=n.n(a),c=n(2),o=n(14),i=(n(12),n(16)),u=n(4),s=n(3),l=n(1);function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){b(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function y(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=g(t);if(e){var r=g(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return m(this,n)}}function m(t,e){return!e||"object"!==d(e)&&"function"!=typeof e?v(t):e}function v(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var w=r.a.lazy((function(){return n.e(15).then(n.bind(null,252))})),O=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(m,t);var e,n,d,f=_(m);function m(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,m),(e=f.call(this,t)).state={data:{class_id:"",select_date:""},view_type:"",student_attendance:"",errors:{},view_button:"View Attendance",fill_button:"Fill Attendance",show_class_panel:!0,user_type:""},e.sendClassId=e.sendClassId.bind(v(e)),e.submit=e.submit.bind(v(e)),e.onChange=e.onChange.bind(v(e)),e.changeState=e.changeState.bind(v(e)),e}return e=m,(n=[{key:"onChange",value:function(t){this.setState({data:p(p({},this.state.data),{},b({},t.target.name,t.target.value))})}},{key:"changeState",value:function(t,e){this.setState(b({},t,e))}},{key:"componentDidMount",value:function(){var t=this.props,e=t.class_id,n=t.user_type;console.log(e,n),null!=n&&null!=e&&(this.setState({data:p(p({},this.state.data),{},b({},"class_id",e))}),this.changeState("user_type",n))}},{key:"sendClassId",value:function(t){this.setState({data:p(p({},this.state.data),{},b({},"class_id",t))})}},{key:"validate",value:function(t){var e={};return t.select_date||(e.select_date="Can't be blank"),t.class_id||(e.class_id="Can't be blank"),e}},{key:"submit",value:function(t){var e=this,n=this.validate(this.state.data);this.setState({errors:n}),0==Object.keys(n).length&&(this.setState({student_attendance:""}),"fill"==t?this.changeState("fill_button","Loading ..."):this.changeState("view_button","Loading ..."),s.a.adminteacher.student_attendance.get(this.state.data).then((function(n){e.setState({student_attendance:n.student_attendance,view_type:t,view_button:"View Attendance",fill_button:"Fill Attendance"})})))}},{key:"updateStudentAttendance",value:function(t){return s.a.adminteacher.student_attendance.update(t).then((function(t){return t}))}},{key:"render",value:function(){var t=this,e=this.state,n=e.errors,s=e.data,d=e.student_attendance,f=e.view_type,p=e.view_button,b=e.fill_button,y=e.user_type,h="/admin/attendance";return""!=y&&(h="/teacher/attendance/class/"+s.class_id),r.a.createElement("div",null,r.a.createElement(c.default,{title:"Select Class",back_link:h},!y&&r.a.createElement(o.default,{class_id:s.class_id,errors:n,sendClassId:this.sendClassId}),r.a.createElement(u.default,null,r.a.createElement(i.a,{md:"4",sm:"6"},r.a.createElement(l.d,null,r.a.createElement(l.e,null,"Select Date"),r.a.createElement(l.f,{errors:n,type:"date",onChange:this.onChange,name:"select_date",value:s.date})))),r.a.createElement(u.default,null,r.a.createElement(i.a,{md:"12",sm:"12"},r.a.createElement(l.a,{primary:!0,onClick:function(e){return t.submit("view")}},p),r.a.createElement(l.a,{primary:!0,onClick:function(e){return t.submit("fill")}},b)))),f&&d&&r.a.createElement(a.Suspense,{fallback:r.a.createElement("h1",null,"Loading ...")},r.a.createElement(w,{select_date:s.select_date,updateStudentAttendance:this.updateStudentAttendance,view_type:f,student_attendance:d})))}}])&&y(e.prototype,n),d&&y(e,d),m}(a.Component)}}]);
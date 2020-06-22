(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{234:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return v}));var n=a(0),r=a.n(n),l=a(2),o=a(6),c=a.n(o),u=a(4);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function f(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,n=m(t);if(e){var r=m(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return h(this,a)}}function h(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?b(t):e}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=r.a.lazy((function(){return a.e(1).then(a.bind(null,140))})),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(i,t);var e,a,n,o=d(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(e=o.call(this,t)).state={title:"",staff_attendance:"",view_type:"",update_attendance:[],update_button:"Update Attendance",total_present:0,total_absent:0,total_leave:0,total_half_leave:0,total_none:0},e.stateChange=e.stateChange.bind(b(e)),e.changeSelectStatus=e.changeSelectStatus.bind(b(e)),e.updateTotalInputs=e.updateTotalInputs.bind(b(e)),e}return e=i,(a=[{key:"stateChange",value:function(t,e,a){this.setState(s({},t,e),a)}},{key:"componentDidMount",value:function(){var t="";t="fill"==this.props.view_type?"Fill Attendance":"View Attendance";var e=this.props,a=e.view_type,n=e.staff_attendance;this.stateChange("title",t),this.stateChange("staff_attendance",n),this.stateChange("view_type",a),this.updateTotalInputs(n)}},{key:"updateTotalInputs",value:function(t){var e=0,a=0,n=0,r=0;t.map((function(t){switch(t.status){case 1:e+=1;break;case 2:a+=1;break;case 3:n+=1;break;case 4:break;case 5:r+=1}})),this.setState({total_leave:n,total_present:e,total_absent:a,total_none:r})}},{key:"changeSelectStatus",value:function(t,e){var a=this.state.staff_attendance,n=t.target.value;a[e].status=n,this.stateChange("staff_attendance",a);var r=this.state.update_attendance;r[e]=[a[e].id,a[e].status],this.stateChange("update_attendance",r)}},{key:"onSubmit",value:function(){var t=this;this.stateChange("update_button","Updating ..."),this.props.updateStudentAttendance(this.state.update_attendance).then((function(e){t.stateChange("update_button","Update Attendance"),t.stateChange("update_attendance",[]),c.a.fire("Done","Staff Attendance Updated !!","success")})).catch((function(e){e.response&&422==e.response.status?c.a.fire("Validation Error","Please update Aleast One Staff Attendance","warning"):c.a.fire("Error Occured","Error Occured. Please try later","error"),t.stateChange("update_button","Update Attendance")}))}},{key:"render",value:function(){var t=this,e=this.state,a=e.title,n=e.staff_attendance,o=e.view_type,c=e.update_button,i=this.state,f=i.total_present,p=i.total_absent,d=i.total_leave,h=i.total_none,b=i.total_half_leave,m=this.props.select_date,v=[{y:f,label:"Total Present"},{y:p,label:"Total Absent"},{y:d,label:"Total Leave"},{y:b,label:"Total Half Leave"},{y:h,label:"Total None Entry"}];return r.a.createElement(l.default,{title:a},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"table-responsive"},r.a.createElement("table",{className:"table datatable"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"S.no"),r.a.createElement("th",null,"Empid"),r.a.createElement("th",null,"Staff Name"),r.a.createElement("th",null,"Staff Mobileno"),r.a.createElement("th",null,"Attendance"),r.a.createElement("th",null,"Checkbox"))),r.a.createElement("tbody",null,n&&n.map((function(e,a){var n;return r.a.createElement(_,(s(n={key:a,view_type:o,onChange:t.changeSelectStatus},"view_type",o),s(n,"index",a),s(n,"row",e),n))})))),"fill"==o&&r.a.createElement("button",{className:"btn btn-primary",onClick:function(e){return t.onSubmit()}},c))),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(u.default,null,"view"==o&&r.a.createElement(y,{title:"Staff Attendance for ".concat(m),filename:"staff_attendance",type:"pie",dataPoints:v})))}}])&&f(e.prototype,a),n&&f(e,n),i}(n.Component),_=function(t){var e=t.view_type,a=t.index,n=t.row,l=t.onChange,o="view"===e;return r.a.createElement("tr",{key:a},r.a.createElement("td",null,a+1),r.a.createElement("td",null,n.staff.empid),r.a.createElement("td",null,n.staff.staff_name),r.a.createElement("td",null,n.staff.contact_no),r.a.createElement("td",null,r.a.createElement("select",{disabled:o,onChange:function(t){return l(t,a)},value:n.status,className:"form-control"},r.a.createElement("option",{value:"1"},"Present"),r.a.createElement("option",{value:"2"},"Absent"),r.a.createElement("option",{value:"3"},"Leave"),r.a.createElement("option",{value:"4"},"Half Present"),r.a.createElement("option",{value:"5"},"None"))),r.a.createElement("td",null,r.a.createElement("input",{type:"checkbox"})))}}}]);
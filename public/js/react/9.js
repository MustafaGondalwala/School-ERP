(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{245:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(3),r=a(2);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=m(e);if(t){var l=m(this).constructor;a=Reflect.construct(n,arguments,l)}else a=n.apply(this,arguments);return f(this,a)}}function f(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p=l.a.lazy((function(){return a.e(1).then(a.bind(null,140))})),b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(f,e);var t,a,n,c=u(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=c.call(this,e)).state={class_id:"",select_month:"",total_present:0,total_absent:0,total_leave:0,total_half_leave:0,total_none:0,chart_type:"pie"},t}return t=f,(a=[{key:"fetchData",value:function(e,t){var a=this;o.a.adminteacher.student_attendance.get_classwise(e,t).then((function(e){var t=e.attendance_details,n=0,l=0,o=0,r=0;t.map((function(e){switch(e.status){case 1:n=e.total;break;case 2:l=e.total;break;case 3:o=e.total;break;case 4:e.total;break;case 5:r=e.total}})),a.setState({total_leave:o,total_present:n,total_absent:l,total_none:r})}))}},{key:"updateClassWise",value:function(){var e=this.props.data,t=e.class_id,a=e.select_month;this.setState({class_id:t,select_month:a}),this.fetchData(t,a)}},{key:"componentDidMount",value:function(){this.updateClassWise()}},{key:"componentWillReceiveProps",value:function(){this.updateClassWise()}},{key:"render",value:function(){var e=this,t=this.state,a=(t.class_id,t.select_month),n=t.chart_type,o=this.state,c=o.total_present,s=o.total_absent,i=o.total_leave,u=o.total_none,f=o.total_half_leave,m=[{y:c,label:"Total Present"},{y:s,label:"Total Absent"},{y:i,label:"Total Leave"},{y:f,label:"Total Half Leave"},{y:u,label:"Total None Entry"}];return l.a.createElement(r.default,{title:"ClassWise Details"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("label",null,l.a.createElement("h5",null,"Present Student:")),l.a.createElement("input",{type:"text",disabled:!0,value:c,className:"form-control"})),l.a.createElement("div",{className:"col"},l.a.createElement("label",null,l.a.createElement("h5",null,"Leave Student:")),l.a.createElement("input",{type:"text",disabled:!0,value:i,className:"form-control"})),l.a.createElement("div",{className:"col"},l.a.createElement("label",null,l.a.createElement("h5",null,"Absent Student:")),l.a.createElement("input",{type:"text",disabled:!0,value:s,className:"form-control"})),l.a.createElement("div",{className:"col"},l.a.createElement("label",null,l.a.createElement("h5",null,"Attendance Half Leave:")),l.a.createElement("input",{type:"text",disabled:!0,value:f,className:"form-control"})),l.a.createElement("div",{className:"col"},l.a.createElement("label",null,l.a.createElement("h5",null,"Attendance Pending:")),l.a.createElement("input",{type:"text",disabled:!0,value:u,className:"form-control"}))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("label",{className:"form-control-label"},"Chart Type"),l.a.createElement("select",{defaultValue:"pie",onChange:function(t){e.setState({chart_type:t.target.value})},className:"form-control"},l.a.createElement("option",{value:"pie"},"Pie"),l.a.createElement("option",{value:"line"},"Line"),l.a.createElement("option",{value:"bar"},"Bar"),l.a.createElement("option",{value:"area"},"Area"),l.a.createElement("option",{value:"doughnut"},"Doughnut"),l.a.createElement("option",{value:"scatter"},"Scatter"))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement(p,{title:"Class/Section Wise Attendance for ".concat(a),filename:"classwise_attendance",type:n,dataPoints:m})))}}])&&s(t.prototype,a),n&&s(t,n),f}(n.Component);t.default=b}}]);
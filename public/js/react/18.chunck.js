(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{357:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(2),u=a(1),c=a(3),s=a(6),o=a(5),i=a.n(o);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t,a){return t&&d(e.prototype,t),a&&d(e,a),e}function E(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=y(e);if(t){var r=y(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return b(this,a)}}function b(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?k(e):t}function k(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e){E(a,e);var t=v(a);function a(e){var n;return h(this,a),(n=t.call(this,e)).state={marksheet:"",row:"",marksheet_id:"",studentDetails:""},n.updateMarksheet=n.updateMarksheet.bind(k(n)),n.updateStudentMarksheet=n.updateStudentMarksheet.bind(k(n)),n}return f(a,[{key:"componentDidMount",value:function(){var e=this.props.studentDetails;this.setState({studentDetails:e})}},{key:"updateMarksheet",value:function(e){this.setState({studentDetails:e})}},{key:"submit",value:function(e,t){var a=this;this.setState({row:"",marksheet_id:""},(function(){a.setState({row:e,marksheet_id:t})}))}},{key:"updateStudentMarksheet",value:function(e,t,a,n,r,l){var u=this;c.a.adminteacher.exam.monthly_test.update_marksheet(e,t,a,n,r,l).then((function(e){var t=e.message,a=e.marksheet;i.a.fire("Success",t,"success"),u.setState({studentDetails:""}),u.updateMarksheet(a)})).catch((function(e){if(e.response){var t=e.response.status;422!=t&&400!=t||i.a.fire("Invalid Data","Data is Valid. Please Enter Correct Data","warning")}}))}},{key:"statusString",value:function(e){switch(e){case 1:return"Not Edit";case 2:return"Edited";case 3:return"Publish"}}},{key:"unpublishMarksheet",value:function(e){var t=this;i.a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, UnPublish this Marksheet !"}).then((function(a){a.value&&c.a.adminteacher.exam.monthly_test.unpublishMarksheet(e).then((function(e){var a=e.message,n=e.studentDetails;t.setState({studentDetails:""}),t.updateMarksheet(n),i.a.fire("Success",a,"success")})).catch((function(e){i.a.fire("Error Occured","Error Occured.","error")}))}))}},{key:"publishMarksheet",value:function(e){var t=this;i.a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Publish this Marksheet !"}).then((function(a){a.value&&c.a.adminteacher.exam.monthly_test.publishMarksheet(e).then((function(e){var a=e.message,n=e.studentDetails;t.setState({studentDetails:""}),t.updateMarksheet(n),i.a.fire("Success",a,"success")})).catch((function(e){i.a.fire("Error Occured","Error Occured.","error")}))}))}},{key:"render",value:function(){var e=this,t=this.props,a=(t.submit,t.exam_type),n=this.state,c=n.row,s=n.marksheet_id,o=n.studentDetails;return r.a.createElement("span",null,r.a.createElement(l.default,{title:"Students Details"},r.a.createElement(u.o,null,r.a.createElement(u.p,null,r.a.createElement("th",null,"Sr no."),r.a.createElement("th",null,"Student Roll No"),r.a.createElement("th",null,"Student Name"),r.a.createElement("th",null,"Action"),r.a.createElement("th",null,"Status"),r.a.createElement("th",null,"Publish / Unpublish"),r.a.createElement("th",null,"Publish At")),r.a.createElement("tbody",null,o.length>0&&o.map((function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("td",null,a+1),r.a.createElement("td",null,t.student.roll_no),r.a.createElement("td",null,t.student.student_name),r.a.createElement("td",null,r.a.createElement(u.a,{primary:!0,sm:!0,onClick:function(){return e.submit(t,t.id)}},"Fill")),r.a.createElement("td",null,e.statusString(t.status)),r.a.createElement("td",null,2==t.status&&r.a.createElement(u.a,{primary:!0,sm:!0,onClick:function(){return e.publishMarksheet(t.id)}},"Publish"),3==t.status&&r.a.createElement(u.a,{danger:!0,sm:!0,onClick:function(){return e.unpublishMarksheet(t.id)}},"UnPublish")),r.a.createElement("td",null,t.publish_at&&3==t.status&&new Date(t.publish_at).toLocaleString()))}))))),c&&r.a.createElement(_,{exam_type:a,submit:this.updateStudentMarksheet,marksheet_id:s,row:c}))}}]),a}(n.Component),_=function(e){E(a,e);var t=v(a);function a(e){var n;return h(this,a),(n=t.call(this,e)).state={marksheet:"",remark:"",grade:""},n.onChange=n.onChange.bind(k(n)),n.onChangeRow=n.onChangeRow.bind(k(n)),n.submit=n.submit.bind(k(n)),n}return f(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props,a=t.marksheet_id,n=t.row,r=n.remark,l=n.grade;this.setState({remark:r,grade:l}),c.a.adminteacher.exam.monthly_test.get_individual(a).then((function(t){var a=t.marksheet;e.setState({marksheet:a})}))}},{key:"onChange",value:function(e,t){var a=e.target,n=a.name,r=a.value,l=this.state.marksheet;l[t][n]=r,this.setState({marksheet:l})}},{key:"submit",value:function(){var e=this.state,t=e.remark,a=e.grade,n=e.marksheet,r=this.props,l=r.marksheet_id,u=r.exam_type,c=this.props.row.student_id;this.props.submit(t,a,n,l,u,c)}},{key:"onChangeRow",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}({},a,n))}},{key:"render",value:function(){var e=this,t=this.props.row,a=this.state,n=a.marksheet,c=a.remark,o=a.grade,i=0,m=0,h=0,d="Month Test Marksheet: "+t.student.roll_no;return r.a.createElement(l.default,{title:d},r.a.createElement(s.default,null,r.a.createElement(u.c,{md:6,sm:4},r.a.createElement(u.d,null,r.a.createElement(u.e,null,"Student Name"),r.a.createElement(u.f,{value:t.student.student_name,disabled:!0}))),r.a.createElement(u.c,{md:6,sm:4},r.a.createElement(u.d,null,r.a.createElement(u.e,null,"Student Roll No"),r.a.createElement(u.f,{value:t.student.roll_no,disabled:!0}))),r.a.createElement(u.c,{md:6,sm:4},r.a.createElement(u.d,null,r.a.createElement(u.e,null,"Father Name"),r.a.createElement(u.f,{value:t.student.father_name,disabled:!0}))),r.a.createElement(u.c,{md:6,sm:4},r.a.createElement(u.d,null,r.a.createElement(u.e,null,"Father Contact No"),r.a.createElement(u.f,{value:t.student.father_contact_no1,disabled:!0})))),r.a.createElement("br",null),n?r.a.createElement("div",{className:"table_responsive"},r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Sr no."),r.a.createElement("th",null,"Subject"),r.a.createElement("th",null,"Min Marks"),r.a.createElement("th",null,"Max Marks"),r.a.createElement("th",null,"Total Marks"),r.a.createElement("th",null,"Grade"))),r.a.createElement("tbody",null,n.map((function(t,a){return i+=parseInt(t.total_marks),h+=parseInt(t.min_marks),m+=parseInt(t.max_marks),r.a.createElement(w,{key:a,onChange:e.onChange,index:a,row:t})}))),r.a.createElement("tfoot",null,r.a.createElement("tr",null,r.a.createElement("td",null),r.a.createElement("td",null),r.a.createElement("td",null,r.a.createElement(u.f,{value:h,disabled:!0})),r.a.createElement("td",null,r.a.createElement(u.f,{value:m,disabled:!0})),r.a.createElement("td",null,r.a.createElement(u.f,{value:i,disabled:!0})),r.a.createElement("td",null,r.a.createElement(u.m,{name:"grade",onChange:this.onChangeRow,value:o},r.a.createElement(u.n,{value:""}," -- Select -- "),r.a.createElement(u.n,{value:1},"A"),r.a.createElement(u.n,{value:2},"A-"),r.a.createElement(u.n,{value:3},"A+"),r.a.createElement(u.n,{value:4},"B"),r.a.createElement(u.n,{value:5},"B-"),r.a.createElement(u.n,{value:6},"B+"),r.a.createElement(u.n,{value:7},"C"),r.a.createElement(u.n,{value:8},"D"),r.a.createElement(u.n,{value:9},"E"),r.a.createElement(u.n,{value:10},"F"))))))):r.a.createElement("h3",null,"Loading Marksheet ..."),r.a.createElement(s.default,null,r.a.createElement(u.c,{md:6,sm:4},r.a.createElement(u.d,null,r.a.createElement(u.e,null,"Remark"),r.a.createElement(u.f,{type:"text",name:"remark",onChange:this.onChangeRow,value:c})))),r.a.createElement(s.default,null,r.a.createElement("button",{className:"btn btn-primary",onClick:this.submit},"Update")))}}]),a}(n.Component),w=function(e){var t=e.index,a=e.row,n=e.onChange;return r.a.createElement("tr",{key:t},r.a.createElement("td",null,t+1),r.a.createElement("td",null,a.subject.subject_name),r.a.createElement("td",null,r.a.createElement("input",{type:"number",min:"0",name:"min_marks",onChange:function(e){return n(e,t)},value:a.min_marks||0,className:"form-control"})),r.a.createElement("td",null,r.a.createElement("input",{type:"number",min:"0",name:"max_marks",onChange:function(e){return n(e,t)},value:a.max_marks||0,className:"form-control"})),r.a.createElement("td",null,r.a.createElement("input",{type:"number",min:"0",name:"total_marks",onChange:function(e){return n(e,t)},value:a.total_marks||0,className:"form-control"})),r.a.createElement("td",null,r.a.createElement(u.m,{name:"grade",onChange:function(e){return n(e,t)},value:a.grade||0},r.a.createElement(u.n,{value:""}," -- Select -- "),r.a.createElement(u.n,{value:1},"A"),r.a.createElement(u.n,{value:2},"A-"),r.a.createElement(u.n,{value:3},"A+"),r.a.createElement(u.n,{value:4},"B"),r.a.createElement(u.n,{value:5},"B-"),r.a.createElement(u.n,{value:6},"B+"),r.a.createElement(u.n,{value:7},"C"),r.a.createElement(u.n,{value:8},"D"),r.a.createElement(u.n,{value:9},"E"),r.a.createElement(u.n,{value:10},"F"))))};t.default=g}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{191:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(2),i=n(184),c=n.n(i),l=n(185),s=n.n(l),u=n(9),m=n(31),f=n(7),b=(n(5),n(1));function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function E(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=k(e);if(t){var r=k(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return j(this,n)}}function j(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?O(e):t}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(l,e);var t,n,a,i=E(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,e)).state={data:{title:"Science HomeWork",subtitle:"Science",description:"<p>Science HomeWork</p>",submition_date:"2020-03-03",image_url:[],subject:"1",class_id:""},errors:{},add_button:"Add HomeWork"},t.onSubmit=t.onSubmit.bind(O(t)),t.makeInputNull=t.makeInputNull.bind(O(t)),t.onFileChange=t.onFileChange.bind(O(t)),t}return t=l,(n=[{key:"onChange",value:function(e){this.setState({data:h(h({},this.state.data),{},y({},e.target.name,e.target.value))})}},{key:"componentDidMount",value:function(){var e=this.props,t=e.subject,n=e.setSubjectDispatch;0==Object.keys(t).length&&n(),this.setState({data:h(h({},this.state.data),{},y({},"class_id",this.props.class_id))})}},{key:"validate",value:function(e){var t={};return e.title||(t.title="Can't be blank"),e.subtitle||(t.subtitle="Can't be blank"),e.description||(t.description="Can't be blank"),e.submition_date||(t.submition_date="Can't be blank"),e.title.length<3&&(t.title="Min. Length 3 char."),e.description.length<3&&(t.student_address="Min. Length 5 char."),t}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault();var n=this.state,a=n.data,r=n.files,o=this.validate(this.state.data);if(this.setState({errors:o}),0===Object.keys(o).length){this.setState({add_button:"Adding HomeWork ..."});var i=new FormData;Object.keys(a).map((function(e){i.append(e,a[e])}));for(var c=0;c<r.length;c++)i.append("files[".concat(c,"]"),r[c]);this.props.submit(i).then((function(){t.setState({add_button:"Add HomeWork"})})).catch((function(e){console.log("error occured")}))}}},{key:"makeInputNull",value:function(){this.setState({data:{title:"",subtitle:"",description:"",submition_date:"",images_url:[],subject:""}})}},{key:"onFileChange",value:function(e){var t=e.target,n=(t.name,t.files),a=[];Object.keys(n).map((function(e){a.push(n[e])})),this.setState({files:a});var r=[];Object.keys(n).length>0&&Object.keys(n).map((function(e){r.push(URL.createObjectURL(n[e]))})),this.setState({data:h(h({},this.state.data),{},y({},"image_url",r))})}},{key:"render",value:function(){var e=this,t=this.state,n=t.data,a=t.errors,i=t.add_button,l=this.props,m=l.insert_success,f=l.subject;return r.a.createElement(o.default,{title:"Add HomeWork"},r.a.createElement("form",null,r.a.createElement("div",{className:"row"},m&&r.a.createElement("div",{className:"alert alert-success alert-dismissible fade show",role:"alert"},r.a.createElement("span",{className:"alert-icon"},r.a.createElement("i",{className:"ni ni-like-2"})),r.a.createElement("span",{className:"alert-text"},r.a.createElement("div",null,"HomeWork Add Successfully.")),r.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"×")))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Title: "),r.a.createElement("input",{type:"text",name:"title",value:n.title,onChange:function(t){return e.onChange(t)},className:"form-control"}),a.title&&r.a.createElement(u.a,{text:a.title})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Sub Title: "),r.a.createElement("input",{type:"text",name:"subtitle",value:n.subtitle,onChange:function(t){return e.onChange(t)},className:"form-control"}),a.subtitle&&r.a.createElement(u.a,{text:a.subtitle})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Subject:"),r.a.createElement("select",{className:"form-control",value:n.subject,onChange:function(t){return e.onChange(t)},name:"subject"},r.a.createElement("option",{value:""},"-- Select --"),Object.keys(f).length>0&&f.map((function(e){return r.a.createElement("option",{value:e.id},e.subject_name)})))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Description: "),r.a.createElement(c.a,{editor:s.a,data:n.description,onChange:function(t,n){var a=n.getData();e.setState({data:h(h({},e.state.data),{},y({},"description",a))})},onInit:function(e){e.setData(n.description)}}),a.description&&r.a.createElement(u.a,{text:a.description})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Update Files: "),r.a.createElement(b.q,{onChange:this.onFileChange,name:"files"}),r.a.createElement(b.g,{files:n.image_url})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Submition Date:"),r.a.createElement("input",{type:"date",className:"form-control",name:"submition_date",onChange:function(t){return e.onChange(t)},value:n.submition_date}),a.submition_date&&r.a.createElement(u.a,{text:a.submition_date})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary",onClick:function(t){return e.onSubmit(t)}},i))))}}])&&g(t.prototype,n),a&&g(t,a),l}(a.Component);t.default=Object(f.b)((function(e){return{subject:e.subjects}}),{setSubjectDispatch:m.a})(S)}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{367:function(e,t,n){"use strict";n.r(t),n.d(t,"ViewStudentsAnswers",(function(){return p}));var a=n(0),l=n.n(a),r=n(2),u=n(1);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=f(e);if(t){var l=f(this).constructor;n=Reflect.construct(a,arguments,l)}else n=a.apply(this,arguments);return m(this,n)}}function m(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?E(e):t}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(m,e);var t,n,a,c=i(m);function m(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,m),(t=c.call(this,e)).state={onlinetest_id:"",studentsMarksheet:"",answers:"",copy_answers:"",marksheet_id:""},t.changeFinalMarks=t.changeFinalMarks.bind(E(t)),t}return t=m,(n=[{key:"componentDidMount",value:function(){var e=this.props,t=e.studentsMarksheet,n=e.onlinetest_id;this.setState({studentsMarksheet:t,onlinetest_id:n})}},{key:"viewStudentsAnswers",value:function(e,t){var n=this;this.setState({answers:"",marksheet_id:t},(function(){n.setState({answers:e,marksheet_id:t})}))}},{key:"changeFinalMarks",value:function(e,t){var n=t.target.value,a=this.state.answers;a.filter((function(t){return t.id==e}))[0].final_marks=parseInt(n),this.setState({answers:a})}},{key:"submit",value:function(){var e=this.state,t=e.answers,n=e.marksheet_id;this.props.update_marksheet(t,n)}},{key:"render",value:function(){var e=this,t=this.props,n=t.monthlytest_title,a=t.questionpaper,c=this.state,o=c.studentsMarksheet,s=c.answers;return l.a.createElement("div",null,l.a.createElement(r.default,{title:"Students Marksheet: "+n},l.a.createElement(u.o,null,l.a.createElement(u.p,null,l.a.createElement("th",null,"Sr no."),l.a.createElement("th",null,"Student Roll No"),l.a.createElement("th",null,"Student Name"),l.a.createElement("th",null,"Question Attend"),l.a.createElement("th",null,"View Question/Answers"),l.a.createElement("th",null,"Status")),l.a.createElement("tbody",null,o.length>0&&o.map((function(t,n){return l.a.createElement("tr",{key:Object(u.v)()},l.a.createElement("td",null,n+1),l.a.createElement("td",null,t.student.roll_no),l.a.createElement("td",null,t.student.student_name),l.a.createElement("td",null,t.answers.length),l.a.createElement("td",null,l.a.createElement(u.a,{primary:!0,sm:!0,onClick:function(n){return e.viewStudentsAnswers(t.answers,t.id)}},"View Answers")),l.a.createElement("td",null,Object(u.x)(t.status)))}))))),s&&l.a.createElement(r.default,{title:"Online Test Marksheet: "},l.a.createElement(u.o,null,l.a.createElement(u.p,null,l.a.createElement("th",null,"Sr no."),l.a.createElement("th",null,"Question Type"),l.a.createElement("th",null,"Question"),l.a.createElement("th",null,"Student Answer"),l.a.createElement("th",null,"Student Marks"),l.a.createElement("th",null,"Max Marks"),l.a.createElement("th",null,"Final Marks")),l.a.createElement("tbody",null,a&&a.question.map((function(t,n){var a=s.filter((function(e){return e.question_id==t.id}))[0];return l.a.createElement("tr",{key:Object(u.v)()},l.a.createElement("td",null,n+1),l.a.createElement("td",null,Object(u.y)(t.question_type)),l.a.createElement("td",null,1==t.question_type&&_(t),2==t.question_type&&y(t),3==t.question_type&&h(t),(4==t.question_type||5==t.question_type)&&d(t)),l.a.createElement("th",null,a.correct),l.a.createElement("td",null,(4==t.question_type||5==t.question_type)&&l.a.createElement("p",null,"Teacher Prevention Required!"),4!=t.question_type&&5!=t.question_type&&l.a.createElement("span",null,t.correct==a.correct?l.a.createElement("span",null,t.marks):l.a.createElement("span",null,"0"))),l.a.createElement("th",null,t.marks),l.a.createElement("td",null,(4==t.question_type||5==t.question_type)&&l.a.createElement("p",null,l.a.createElement(u.f,{type:"number",value:a.final_marks,max:t.marks,onChange:function(t){return e.changeFinalMarks(a.id,t)}})),4!=t.question_type&&5!=t.question_type&&l.a.createElement("span",null,t.correct==a.correct?l.a.createElement("p",null,l.a.createElement(u.f,{type:"number",defaultValue:t.marks,max:t.marks,onChange:function(t){return e.changeFinalMarks(a.id,t)},value:a.final_marks})):l.a.createElement("p",null,l.a.createElement(u.f,{type:"number",value:a.final_marks,defaultValue:"0",max:t.marks,onChange:function(t){return e.changeFinalMarks(a.id,t)}})))))}))),l.a.createElement("tfoot",null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement(u.a,{onClick:function(t){return e.submit()},warning:!0,sm:!0},"Update Marksheet")))))))}}])&&o(t.prototype,n),a&&o(t,a),m}(a.Component),d=function(e){return l.a.createElement("div",null,l.a.createElement("b",null,"Q:")," ",l.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.question}}))},h=function(e){return l.a.createElement("div",null,l.a.createElement("b",null,"Q:")," ",l.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.question}}),l.a.createElement(u.o,null,l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Correct:"),l.a.createElement("th",null,l.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.correct}}))))))},y=function(e){return l.a.createElement("div",null,l.a.createElement("b",null,"Q:")," ",l.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.question}}),l.a.createElement(u.o,null,l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Correct:"),l.a.createElement("th",null,1==e.correct?l.a.createElement("b",null,"True"):l.a.createElement("b",null,"False"))))))},_=function(e){return l.a.createElement("div",null,l.a.createElement("b",null,"Q:")," ",l.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.question}}),l.a.createElement(u.o,null,l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"1.")," ",e.option_1),l.a.createElement("td",null,l.a.createElement("b",null,"2.")," ",e.option_2)),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("b",null,"3.")," ",e.option_1),l.a.createElement("td",null,l.a.createElement("b",null,"4.")," ",e.option_2)),l.a.createElement("tr",null,l.a.createElement("th",null,"Correct:"),l.a.createElement("th",null,e.correct)))))};t.default=p}}]);
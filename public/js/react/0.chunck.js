(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{325:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return y}));var l=n(0),a=n.n(l),r=n(2),c=n(3),u=(n(32),n(5)),o=n(1);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,l=E(e);if(t){var a=E(this).constructor;n=Reflect.construct(l,arguments,a)}else n=l.apply(this,arguments);return s(this,n)}}function s(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(o,e);var t,n,l,u=f(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(t=u.call(this,e)).state={receiptDetails:"",rowInfo:""},t.viewReceipt=t.viewReceipt.bind(d(t)),t}return t=o,(n=[{key:"viewReceipt",value:function(e,t){var n=this,l=this.props.fee_receipts;this.setState({rowInfo:l[t],receiptDetails:""}),c.a.adminclerk.fee.view_receipt(e).then((function(e){var t=e.receiptDetails;n.setState({receiptDetails:t})}))}},{key:"render",value:function(){var e=this,t=this.props.fee_receipts,n=this.state,l=n.receiptDetails,c=n.rowInfo;return a.a.createElement("span",null,t.length>0&&a.a.createElement(r.default,{title:"Fee Receipts",back_link:this.props.back_link},a.a.createElement("div",{className:"table-responsive"},a.a.createElement("table",{className:"table"},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"Sr no."),a.a.createElement("th",null,"Receipts ID:"),a.a.createElement("th",null,"View"),a.a.createElement("th",null,"Print"),a.a.createElement("th",null,"Created By"))),a.a.createElement("tbody",null,t.map((function(t,n){return a.a.createElement("tr",{key:n},a.a.createElement("td",null,n+1),a.a.createElement("td",null,t.id),a.a.createElement("td",null,a.a.createElement("button",{className:"btn btn-primary",onClick:function(l){return e.viewReceipt(t.id,n)}},"View")),a.a.createElement("td",null,a.a.createElement("button",{className:"btn btn-success"},"Print")),a.a.createElement("td",null,t.amount_name))})))))),l&&a.a.createElement(h,{rowInfo:c,receipt:l}))}}])&&m(t.prototype,n),l&&m(t,l),o}(l.Component),h=function(e){var t=e.receipt,n=e.rowInfo,l=n.payment_type,c=(n.id,n.amount_name),i=n.created_at,m="Receipt ID: "+n.id,p=0,f=0,s=0,d=0;return a.a.createElement(r.default,{title:m},a.a.createElement(u.default,null,a.a.createElement(o.c,{md:"6",sm:"6"},a.a.createElement("h4",null,"Payment Type: ",l),a.a.createElement("h4",null,"Created By: ",c),a.a.createElement("h4",null,"Publish At: ",new Date(i).toLocaleDateString()))),a.a.createElement("br",null),a.a.createElement(u.default,null,a.a.createElement(o.o,null,a.a.createElement(o.p,null,a.a.createElement("th",null,"Sr no."),a.a.createElement("th",null,"Fee Type"),a.a.createElement("th",null,"Total Amount"),a.a.createElement("th",null,"Waiver Amount"),a.a.createElement("th",null,"Old Total Pending"),a.a.createElement("th",null,"Total Paid"),a.a.createElement("th",null,"Current Paid"),a.a.createElement("th",null,"New Total Pending")),a.a.createElement("tbody",null,t.map((function(e,t){return p+=e.current_paid,s+=e.total_pending,d+=e.total_amount,f+=e.total_pending-e.current_paid,a.a.createElement("tr",null,a.a.createElement("td",null,t+1),a.a.createElement("td",null,e.fee_type),a.a.createElement("td",null,e.total_amount),a.a.createElement("td",null,e.waiver_amount),a.a.createElement("td",null,e.total_pending),a.a.createElement("td",null,e.total_paid),a.a.createElement("td",null,e.current_paid),a.a.createElement("td",null,e.total_pending-e.current_paid))})),a.a.createElement("tr",null,a.a.createElement("td",null),a.a.createElement("td",null),a.a.createElement("td",null,d),a.a.createElement("td",null),a.a.createElement("td",null,s),a.a.createElement("td",null),a.a.createElement("td",null,p),a.a.createElement("td",null,f))))))}}}]);
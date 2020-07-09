(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./resources/js/component/fees/form/PayFeesForm.jsx":
/*!**********************************************************!*\
  !*** ./resources/js/component/fees/form/PayFeesForm.jsx ***!
  \**********************************************************/
/*! exports provided: default, PayFeesPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayFeesForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayFeesPanel", function() { return PayFeesPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var StudentReceipt = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(function () {
  return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ../utils/StudentReceipt */ "./resources/js/component/fees/utils/StudentReceipt.jsx"));
});



var PayFeesForm = /*#__PURE__*/function (_Component) {
  _inherits(PayFeesForm, _Component);

  var _super = _createSuper(PayFeesForm);

  function PayFeesForm(props) {
    var _this;

    _classCallCheck(this, PayFeesForm);

    _this = _super.call(this, props);
    _this.state = {
      fee_individual: "",
      send_message: true,
      payment_type: "1",
      fee_receipts: "",
      button_text: "Update"
    };
    _this.changeAmountData = _this.changeAmountData.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PayFeesForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var fee_individual = this.props.fee_individual;
      this.setState({
        fee_individual: fee_individual
      });
      var _this$props = this.props,
          student_id = _this$props.student_id,
          year_id = _this$props.year_id;
      _api__WEBPACK_IMPORTED_MODULE_3__["default"].adminclerk.fee.get_receipts(student_id, year_id).then(function (data) {
        _this2.setState({
          fee_receipts: data.fee_receipts
        });
      });
    }
  }, {
    key: "submit",
    value: function submit(data) {
      var payment_type = data.payment_type;
      var fee_individual = this.state.fee_individual;
      this.setState({
        button_text: "Updating ..."
      });
      this.props.payFees(fee_individual, payment_type);
    }
  }, {
    key: "changeAmountData",
    value: function changeAmountData(e, installment_label) {
      var name = e.target.name;
      var value = parseInt(e.target.value);
      var index = e.target.getAttribute('data-index');
      var fee_individual = this.state.fee_individual;
      var individual_installment = fee_individual[installment_label];

      switch (name) {
        case "temp_paid":
          if (value >= individual_installment[index].total_pending + 1) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire('Current Paid is Greater than Total Pending', "Please Check Data", "warning");
          } else {
            individual_installment[index].temp_paid = value;
          }

          break;
      }

      fee_individual[installment_label] = individual_installment;
      this.setState({
        fee_individual: fee_individual
      });
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var button_text = this.state.button_text;
      var _this$state = this.state,
          fee_individual = _this$state.fee_individual,
          send_message = _this$state.send_message,
          payment_type = _this$state.payment_type,
          fee_receipts = _this$state.fee_receipts;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, fee_receipts && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Loading ...")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StudentReceipt, {
        fee_receipts: fee_receipts
      })), fee_individual && Object.keys(fee_individual).map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PayInstallmentFeesForm, {
          onChange: _this3.changeAmountData,
          key: key,
          individual: fee_individual[item],
          individual_label: item
        });
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PayFeesPanel, {
        onSubmit: this.submit,
        button_text: button_text
      }));
    }
  }]);

  return PayFeesForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


var PayFeesPanel = /*#__PURE__*/function (_Component2) {
  _inherits(PayFeesPanel, _Component2);

  var _super2 = _createSuper(PayFeesPanel);

  function PayFeesPanel(props) {
    var _this4;

    _classCallCheck(this, PayFeesPanel);

    _this4 = _super2.call(this, props);
    _this4.state = {
      payment_type: "1"
    };
    _this4.changePaymentType = _this4.changePaymentType.bind(_assertThisInitialized(_this4));
    _this4.payDetailsSend = _this4.payDetailsSend.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(PayFeesPanel, [{
    key: "changePaymentType",
    value: function changePaymentType(e) {
      this.setState({
        payment_type: e.target.value
      });
    }
  }, {
    key: "payDetailsSend",
    value: function payDetailsSend(e) {
      this.props.onSubmit(this.state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          button_text = _this$props2.button_text,
          payment_type = _this$props2.payment_type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Pay Fee Details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        md: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["FormLabel"], null, "User Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Input"], {
        disabled: true,
        value: JSON.parse(localStorage.getItem('userAccount')).name
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        md: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["FormLabel"], null, "Payment Type:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Select"], {
        value: payment_type,
        onChange: this.changePaymentType
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1"
      }, "Cash"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "2"
      }, "Cheque"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "3"
      }, "Bank Transfer"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        md: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        onClick: this.payDetailsSend,
        primary: true
      }, button_text))));
    }
  }]);

  return PayFeesPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var PayInstallmentFeesForm = function PayInstallmentFeesForm(_ref) {
  var individual_label = _ref.individual_label,
      individual = _ref.individual,
      _onChange = _ref.onChange;
  var total_amount = 0;
  var amount = 0;
  var total_pending = 0;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "".concat(individual_label, " Fees")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr no."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Fee Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Waiver Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Total Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Total Pending"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Total Paid"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Current Paid"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, individual.map(function (item, id) {
    total_amount += item.total_amount;
    amount += item.amount;
    total_pending += item.total_pending;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, id + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.fee_type.fee_type), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      disabled: true,
      "data-index": id,
      name: "amount",
      className: "form-control",
      value: item.amount
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      disabled: true,
      "data-index": id,
      name: "waiver_amount",
      className: "form-control",
      value: item.waiver_amount
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      disabled: true,
      "data-index": id,
      name: "total_amount",
      className: "form-control",
      value: item.total_amount
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      disabled: true,
      "data-index": id,
      name: "total_pending",
      className: "form-control",
      value: item.total_pending
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      disabled: true,
      "data-index": id,
      onChange: function onChange(e) {
        return _onChange(e, individual_label);
      },
      name: "current_paid",
      className: "form-control",
      value: item.current_paid
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      "data-index": id,
      onChange: function onChange(e) {
        return _onChange(e, individual_label);
      },
      name: "temp_paid",
      className: "form-control",
      value: item.temp_paid
    })));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    value: amount,
    type: "number",
    disabled: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    value: total_amount,
    type: "number",
    disabled: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    value: total_pending,
    type: "number",
    disabled: true
  })))))));
};

/***/ })

}]);
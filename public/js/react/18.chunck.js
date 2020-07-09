(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./resources/js/component/fees/form/FeeSetIndividualForm.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/component/fees/form/FeeSetIndividualForm.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FeeSetIndividualForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
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





var FeeSetIndividualForm = /*#__PURE__*/function (_Component) {
  _inherits(FeeSetIndividualForm, _Component);

  var _super = _createSuper(FeeSetIndividualForm);

  function FeeSetIndividualForm(props) {
    var _this;

    _classCallCheck(this, FeeSetIndividualForm);

    _this = _super.call(this, props);
    _this.state = {
      fee_individual: "",
      send_message: true
    };
    _this.changeAmountData = _this.changeAmountData.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FeeSetIndividualForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fee_individual = this.props.fee_individual;
      this.setState({
        fee_individual: fee_individual
      });
    }
  }, {
    key: "changeAmountData",
    value: function changeAmountData(e, installment_label) {
      var name = e.target.name;
      var value = parseInt(e.target.value);
      if (isNaN(value)) value = 0;
      var index = e.target.getAttribute('data-index');
      var temp_state = this.state.fee_individual;
      var individual_installment = temp_state[installment_label];

      switch (name) {
        case "amount":
          individual_installment[index].amount = value;
          individual_installment[index].total_amount = parseInt(individual_installment[index].amount) - parseInt(individual_installment[index].waiver_amount);
          individual_installment[index].total_pending = parseInt(individual_installment[index].total_amount) - individual_installment[index].current_paid;
          break;

        case "waiver_amount":
          if (value > individual_installment[index].amount) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire('Waiver Amount Greater than Fee Amount', "Please Check Data", "warning");
          } else {
            individual_installment[index].waiver_amount = value;
            individual_installment[index].total_amount = parseInt(individual_installment[index].amount) - parseInt(individual_installment[index].waiver_amount);
          }

          break;
      }

      temp_state[installment_label] = individual_installment;
      this.setState({
        fee_individual: temp_state
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          fee_individual = _this$state.fee_individual,
          send_message = _this$state.send_message;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, fee_individual && Object.keys(fee_individual).map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EditInstallment, {
          onChange: _this2.changeAmountData,
          key: key,
          individual: fee_individual[item],
          individual_label: item
        });
      }), fee_individual && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Update Fees Individual"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "checkbox-inline"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: send_message,
        onChange: function onChange(e) {
          _this2.setState(_defineProperty({}, e.target.name, e.target.checked));
        },
        name: "send_message"
      }), "\xA0\xA0Send Message to Parents"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick(e) {
          return _this2.props.updateFees(fee_individual, send_message);
        },
        className: "btn btn-primary"
      }, this.props.update_button))));
    }
  }]);

  return FeeSetIndividualForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



var EditInstallment = function EditInstallment(_ref) {
  var individual_label = _ref.individual_label,
      individual = _ref.individual,
      _onChange = _ref.onChange;
  var total_amount = 0;
  var amount = 0;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "".concat(individual_label, " Fees")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr no."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Fee Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Waiver Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Total Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Current Paid"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Total Pending"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, individual.map(function (item, id) {
    var _React$createElement;

    total_amount += item.total_amount;
    amount += item.amount;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, id + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.fee_type.fee_type), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      "data-index": id,
      name: "amount",
      onChange: function onChange(e) {
        return _onChange(e, individual_label);
      },
      className: "form-control",
      value: item.amount
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      "data-index": id,
      name: "waiver_amount",
      className: "form-control",
      onChange: function onChange(e) {
        return _onChange(e, individual_label);
      },
      value: item.waiver_amount
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      disabled: true,
      "data-index": id,
      name: "total_amount",
      className: "form-control",
      onChange: function onChange(e) {
        return _onChange(e, individual_label);
      },
      value: item.total_amount
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      className: "form-control",
      disabled: true,
      value: item.current_paid
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", (_React$createElement = {
      type: "number",
      min: "0",
      className: "form-control",
      disabled: true,
      "data-index": id,
      name: "total_pending"
    }, _defineProperty(_React$createElement, "className", "form-control"), _defineProperty(_React$createElement, "onChange", function onChange(e) {
      return _onChange(e, individual_label);
    }), _defineProperty(_React$createElement, "value", item.total_pending), _React$createElement))));
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
  })))))));
};

/***/ })

}]);
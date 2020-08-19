(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./resources/js/component/fees/form/FeeClassWiseForm.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/component/fees/form/FeeClassWiseForm.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FeeClassWiseForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_4__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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







var FeeClassWiseForm = /*#__PURE__*/function (_Component) {
  _inherits(FeeClassWiseForm, _Component);

  var _super = _createSuper(FeeClassWiseForm);

  function FeeClassWiseForm(props) {
    var _this;

    _classCallCheck(this, FeeClassWiseForm);

    _this = _super.call(this, props);
    _this.state = {
      fee_class_wise: "",
      updateClassWise: [],
      update_button: "Update Fees"
    };
    _this.feeTypeAmount = _this.feeTypeAmount.bind(_assertThisInitialized(_this));
    _this.updateClassWiseFee = _this.updateClassWiseFee.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FeeClassWiseForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          fee_class_wise = _this$props.fee_class_wise,
          class_id = _this$props.class_id,
          year_id = _this$props.year_id;
      this.setState({
        fee_class_wise: fee_class_wise,
        class_id: class_id,
        year_id: year_id
      });
    }
  }, {
    key: "feeTypeAmount",
    value: function feeTypeAmount(e, label, index) {
      var value = e.target.value;
      var temp_state = this.state.fee_class_wise;
      temp_state[label][index].amount = value;
      this.setState({
        fee_class_wise: temp_state
      });
    }
  }, {
    key: "updateClassWiseFee",
    value: function updateClassWiseFee(data) {
      var _this2 = this;

      data['fee_class_wise'] = this.state.fee_class_wise;
      data['class_id'] = this.state.class_id;
      data['year_id'] = this.state.year_id;
      _api__WEBPACK_IMPORTED_MODULE_2__["default"].adminclerk.fee.update_class_wise_fees(data).then(function (data) {
        _this2.setState({
          fee_class_wise: data.fee_class_wise,
          update_button: "Updating Fees ..."
        });

        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire("Done", "Fee Class Wise Updated !!", "success");
      })["catch"](function (error) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire("Error Occured", "Error Occured while processing the data.", "error");

        _this2.setState({
          update_button: "Update Fees"
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var fee_class_wise = this.state.fee_class_wise;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, fee_class_wise && Object.keys(fee_class_wise).map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ViewInstallmentForm, {
          installment_label: item,
          feeTypeAmount: _this3.feeTypeAmount,
          installment_wise: fee_class_wise[item]
        });
      }), fee_class_wise && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SubmitForm, {
        update_button: this.state.update_button,
        updateClassWiseFee: this.updateClassWiseFee
      }));
    }
  }]);

  return FeeClassWiseForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



var ViewInstallmentForm = function ViewInstallmentForm(_ref) {
  var installment_label = _ref.installment_label,
      installment_wise = _ref.installment_wise,
      feeTypeAmount = _ref.feeTypeAmount;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: shortid__WEBPACK_IMPORTED_MODULE_4___default.a.generate(),
    title: "".concat(installment_label, " Fees:")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr No."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Fee Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Amount"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, installment_wise.map(function (item, id) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: shortid__WEBPACK_IMPORTED_MODULE_4___default.a.generate()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, id + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.fee_type.fee_type), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "0",
      "data-fee_type_id": item.fee_type_id,
      className: "form-control",
      onChange: function onChange(e) {
        return feeTypeAmount(e, installment_label, id);
      },
      value: item.amount
    })));
  })))));
};

var SubmitForm = /*#__PURE__*/function (_Component2) {
  _inherits(SubmitForm, _Component2);

  var _super2 = _createSuper(SubmitForm);

  function SubmitForm(props) {
    var _this4;

    _classCallCheck(this, SubmitForm);

    _this4 = _super2.call(this, props);
    _this4.state = {
      overwrite: false,
      send_message: true
    };
    return _this4;
  }

  _createClass(SubmitForm, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.checked));
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          overwrite = _this$state.overwrite,
          send_message = _this$state.send_message;
      var update_button = this.props.update_button;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Update Class Wise Fees"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "checkbox-inline"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: overwrite,
        onChange: function onChange(e) {
          return _this5.handleChange(e);
        },
        name: "overwrite"
      }), "\xA0\xA0Overwrite Existing Indivitual Student Fee"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "checkbox-inline"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: send_message,
        onChange: function onChange(e) {
          return _this5.handleChange(e);
        },
        name: "send_message"
      }), "\xA0\xA0Send Message to Parents"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: function onClick(e) {
          return _this5.props.updateClassWiseFee({
            overwrite: overwrite,
            send_message: send_message
          });
        }
      }, update_button)));
    }
  }]);

  return SubmitForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ })

}]);
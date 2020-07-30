(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./resources/js/component/fees/form/SetInstallments.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/component/fees/form/SetInstallments.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_fee__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/fee */ "./resources/js/component/actions/fee.js");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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









var SetInstallmentsForm = /*#__PURE__*/function (_Component) {
  _inherits(SetInstallmentsForm, _Component);

  var _super = _createSuper(SetInstallmentsForm);

  function SetInstallmentsForm(props) {
    var _this;

    _classCallCheck(this, SetInstallmentsForm);

    _this = _super.call(this, props);
    _this.state = {
      total: ["Installment1", "Installment2", "Installment3", "Installment4", "Installment5", "Installment6", "Installment7", "Installment8", "Installment9", "Installment10", "Installment11", "Installment12"],
      total_installment: [],
      errors: {},
      button_text: "Update"
    };
    return _this;
  }

  _createClass(SetInstallmentsForm, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this$props, setFeeInstallmentsDispatch, total_installment, _total_installment, total, _total;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, setFeeInstallmentsDispatch = _this$props.setFeeInstallmentsDispatch, total_installment = _this$props.total_installment;

                if (!(Object.keys(total_installment).length == 0)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 4;
                return setFeeInstallmentsDispatch();

              case 4:
                _total_installment = _context.sent;
                total = [];

                _total_installment.map(function (item) {
                  total.push(item.installment);
                });

                this.setState({
                  total_installment: total
                });
                _context.next = 13;
                break;

              case 10:
                _total = [];
                total_installment.map(function (item) {
                  _total.push(item.installment);
                });
                this.setState({
                  total_installment: _total
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "onChange",
    value: function onChange(e) {
      var _this2 = this;

      var getCurrent = this.state.total_installment;

      if (e.target.checked) {
        getCurrent.push(e.target.name);
      } else {
        var new_current = [];
        getCurrent.map(function (item) {
          if (item !== e.target.name) new_current.push(item);
        });
        getCurrent = new_current;
      }

      this.setState({
        total_installment: getCurrent,
        errors: {}
      }, function () {
        console.log(_this2.state.total_installment);
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var total_installment = this.state.total_installment;

      if (total_installment.length == 0) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire("Validation Error", "Please select atleast One Installment", "warning");
      } else {
        _api__WEBPACK_IMPORTED_MODULE_3__["default"].adminclerk.fee.update_installments(total_installment).then(function (data) {
          sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire("Success", "Fee Installments Updated!!", "success");
        })["catch"](function (error) {
          sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire("Error Occurred", "Please try again later..", "error");
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          total = _this$state.total,
          button_text = _this$state.button_text,
          total_installment = _this$state.total_installment;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
        title: "Set Installments",
        back_link: "/admin/fees"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "row col-md-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_5__["Thead"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Installment"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Enabled/Disabled")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, total_installment && total.map(function (item) {
        if (total_installment.indexOf(item) > -1) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
            name: item,
            value: item || '',
            checked: true,
            onChange: function onChange(e) {
              return _this3.onChange(e);
            },
            type: "checkbox"
          })));
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
            name: item,
            value: item || '',
            onChange: function onChange(e) {
              return _this3.onChange(e);
            },
            type: "checkbox"
          })));
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "col-md-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: function onClick(e) {
          return _this3.onSubmit();
        }
      }, button_text))));
    }
  }]);

  return SetInstallmentsForm;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

function mapStateToProps(state) {
  return {
    total_installment: state.installments
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, {
  setFeeInstallmentsDispatch: _actions_fee__WEBPACK_IMPORTED_MODULE_7__["setFeeInstallmentsDispatch"]
})(SetInstallmentsForm));

/***/ })

}]);
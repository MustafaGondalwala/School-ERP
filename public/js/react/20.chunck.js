(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./resources/js/component/fees/utils/FeeTypeShow.jsx":
/*!***********************************************************!*\
  !*** ./resources/js/component/fees/utils/FeeTypeShow.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FeeTypeShow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);
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










var FeeTypeShow = /*#__PURE__*/function (_Component) {
  _inherits(FeeTypeShow, _Component);

  var _super = _createSuper(FeeTypeShow);

  function FeeTypeShow(props) {
    var _this;

    _classCallCheck(this, FeeTypeShow);

    _this = _super.call(this, props);
    _this.state = {
      add: false,
      new_fee_type_loading: false,
      edit: ""
    };
    _this.newFeeType = _this.newFeeType.bind(_assertThisInitialized(_this));
    _this.updateFeeType = _this.updateFeeType.bind(_assertThisInitialized(_this));
    _this.changeStatus = _this.changeStatus.bind(_assertThisInitialized(_this));
    _this.eventType = _this.eventType.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FeeTypeShow, [{
    key: "newFeeType",
    value: function newFeeType(fee_type) {
      var _this2 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
        title: 'Are you sure?',
        text: "You able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add Fee Type it!'
      }).then(function (result) {
        if (result.value) {
          var class_id = _this2.props.class_id;

          _this2.setState({
            new_fee_type_loading: true
          });

          _this2.props.submitNewFeeType(class_id, fee_type)["catch"](function (error) {
            if (error.response) {
              var _error$response = error.response,
                  data = _error$response.data,
                  status = _error$response.status;

              if (status == 422) {
                var message = data.error.message;
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire("Invalid Fee Type", message, "warning");
              }
            }

            _this2.setState({
              new_fee_type_loading: false
            });
          });
        }
      });
    }
  }, {
    key: "updateFeeType",
    value: function updateFeeType(fee_type, id) {
      var _this3 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
        title: 'Are you sure?',
        text: "You able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update Fee Type it!'
      }).then(function (result) {
        if (result.value) {
          var class_id = _this3.props.class_id;

          _this3.setState({
            new_fee_type_loading: true
          });

          _this3.props.submitUpdateFeeType(class_id, fee_type, id)["catch"](function (error) {
            if (error.response) {
              var _error$response2 = error.response,
                  data = _error$response2.data,
                  status = _error$response2.status;

              if (status == 422) {
                var message = data.error.message;
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire("Invalid Fee Type", message, "warning");
              }
            }

            _this3.setState({
              new_fee_type_loading: false
            });
          });
        }
      });
    }
  }, {
    key: "changeStatus",
    value: function changeStatus(name, value) {
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "eventType",
    value: function eventType(type, data) {
      var _this4 = this;

      switch (type) {
        case "edit":
          this.changeStatus("add", false);
          this.setState({
            edit: ""
          }, function () {
            _this4.setState({
              edit: data
            });
          });
          break;

        case "add":
          this.changeStatus("add", true);
          this.changeStatus("edit", "");
          break;
      }
    }
  }, {
    key: "removeFeeType",
    value: function removeFeeType(row_id) {
      var _this5 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
        title: 'Are you sure?',
        text: "You wont able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete Fee Type it!'
      }).then(function (result) {
        if (result.value) {
          var class_id = _this5.props.class_id;

          _this5.setState({
            new_fee_type_loading: true
          });

          _this5.props.submitDeleteFeeType(class_id, row_id)["catch"](function (error) {
            if (error.response) {
              var _error$response3 = error.response,
                  data = _error$response3.data,
                  status = _error$response3.status;

              if (status == 422) {
                var message = data.error.message;
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire("Invalid Fee Type", message, "warning");
              }
            }

            _this5.setState({
              new_fee_type_loading: false
            });
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$state = this.state,
          add = _this$state.add,
          new_fee_type_loading = _this$state.new_fee_type_loading,
          edit = _this$state.edit,
          type = _this$state.type;
      var _this$props = this.props,
          class_id = _this$props.class_id,
          fee_type = _this$props.fee_type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, add && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NewFeeType, {
        title: "Add Fee Type",
        loading: new_fee_type_loading,
        type: "add",
        submit: this.newFeeType
      }), edit && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NewFeeType, {
        data: edit,
        title: "Edit Fee Type",
        loading: new_fee_type_loading,
        type: "edit",
        submit: this.updateFeeType
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
        title: "Class Fee Type",
        add_object: {
          text: "Add",
          clickFunction: function clickFunction() {
            return _this6.eventType("add", true);
          }
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Thead"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr no."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Fee Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Actions")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, fee_type && fee_type.map(function (item, id) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: shortid__WEBPACK_IMPORTED_MODULE_4___default.a.generate()
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, id + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.fee_type), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          className: "table-actions"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#!",
          onClick: function onClick(e) {
            return _this6.eventType("edit", item);
          },
          className: "table-action",
          "data-toggle": "tooltip",
          "data-original-title": "Edit Fee Type"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-user-edit"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#!",
          onClick: function onClick(e) {
            return _this6.removeFeeType(item.id);
          },
          className: "table-action table-action-delete",
          "data-toggle": "tooltip",
          "data-original-title": "Delete Fee Type"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-trash"
        }))));
      })))));
    }
  }]);

  return FeeTypeShow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



var NewFeeType = /*#__PURE__*/function (_Component2) {
  _inherits(NewFeeType, _Component2);

  var _super2 = _createSuper(NewFeeType);

  function NewFeeType(props) {
    var _this7;

    _classCallCheck(this, NewFeeType);

    _this7 = _super2.call(this, props);
    _this7.state = {
      fee_type: "",
      id: "",
      type: "",
      error: ""
    };
    _this7.submit = _this7.submit.bind(_assertThisInitialized(_this7));
    return _this7;
  }

  _createClass(NewFeeType, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          type = _this$props2.type;

      if (data) {
        this.setState({
          id: data.id,
          fee_type: data.fee_type,
          type: type
        });
      } else {
        this.setState({
          type: type
        });
      }
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this$state2 = this.state,
          fee_type = _this$state2.fee_type,
          id = _this$state2.id;
      if (fee_type == "") this.setState({
        error: "Can't be Blank"
      });else {
        this.setState({
          error: ""
        });
        if (id == "") this.props.submit(fee_type);else this.props.submit(fee_type, id);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var _this$state3 = this.state,
          fee_type = _this$state3.fee_type,
          error = _this$state3.error;
      var _this$props3 = this.props,
          loading = _this$props3.loading,
          title = _this$props3.title,
          type = _this$props3.type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
        title: title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], null, "Fee Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Input"], {
        value: fee_type,
        onChange: function onChange(e) {
          _this8.setState({
            fee_type: e.target.value
          });
        },
        placeholder: "Fee Type"
      }), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_6__["default"], {
        text: error
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["FormGroup"], null, type == "add" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, loading == false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        onClick: this.submit,
        primary: true,
        sm: true
      }, "Add") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        primary: true,
        sm: true
      }, "Adding ..")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, loading == false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        onClick: this.submit,
        primary: true,
        sm: true
      }, "Edit") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        primary: true,
        sm: true
      }, "Editing .."))))));
    }
  }]);

  return NewFeeType;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ })

}]);
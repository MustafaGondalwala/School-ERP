(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./resources/js/component/setting/utils/AddExamType.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/component/setting/utils/AddExamType.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_exam__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/exam */ "./resources/js/component/actions/exam.js");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_Col__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/Col */ "./resources/js/component/utils/Col.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var _actions_classwiseSubject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../actions/classwiseSubject */ "./resources/js/component/actions/classwiseSubject.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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













var AddExamType = /*#__PURE__*/function (_Component) {
  _inherits(AddExamType, _Component);

  var _super = _createSuper(AddExamType);

  function AddExamType(props) {
    var _this;

    _classCallCheck(this, AddExamType);

    _this = _super.call(this, props);
    _this.state = {
      data: {
        exam_type: "",
        min_marks: "",
        max_marks: "",
        subject_ids: ""
      },
      exam_type: "",
      error: "",
      subject_ids: "",
      button_text: "Add Exam Type"
    };
    return _this;
  }

  _createClass(AddExamType, [{
    key: "onChange",
    value: function onChange(e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, name, value))
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var examType = this.props.examType;
      if (Object.keys(examType).length == 0) this.props.getExamTypeDispatch();
    }
  }, {
    key: "removeExamType",
    value: function removeExamType(exam_type_id) {
      var _this2 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          _api__WEBPACK_IMPORTED_MODULE_3__["default"].admin.exam.exam_type.remove(exam_type_id).then(function (data) {
            var message = data.message,
                exam_types = data.exam_types;
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Deleted!', message, 'success');

            _this2.props.getExamType(exam_types);
          })["catch"](function (error) {
            console.log(error);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire("Error", "Error Occured in Proccess", "error");
          });
        }
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.max_marks) errors.max_marks = "Can't be blank";
      if (!data.min_marks) errors.min_marks = "Can't be blank";
      if (!data.exam_type) errors.exam_type = "Can't be blank";
      return errors;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this3 = this;

      var data = this.state.data;
      var errors = this.validate(data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length == 0) {
        this.setState({
          button_text: "Adding ..."
        });
        _api__WEBPACK_IMPORTED_MODULE_3__["default"].admin.exam.exam_type.add(data).then(function (data) {
          var message = data.message;

          _this3.props.getExamType(data.exam_types);

          _this3.setState({
            button_text: "Add Exam Type",
            exam_type: "",
            error: ""
          });

          sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire("Success", message, "success");
        })["catch"](function (error) {
          if (error.response.status == 422) {
            var message = error.response.data.error.message;
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire("Validation Error", message, "warning");
          } else {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire("Error Occured", "Error Occured in Process", "error");
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          data = _this$state.data,
          errors = _this$state.errors,
          button_text = _this$state.button_text;
      var examType = this.props.examType;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Exam Type",
        back_link: "/admin/exam"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_8__["default"], {
        md: 4,
        lg: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Exam Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        name: "exam_type",
        errors: errors,
        value: data.exam_type,
        onChange: function onChange(e) {
          return _this4.onChange(e);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_8__["default"], {
        md: 4,
        lg: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Min Marks Per Subject"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        name: "min_marks",
        errors: errors,
        value: data.min_marks,
        type: "number",
        onChange: function onChange(e) {
          return _this4.onChange(e);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_8__["default"], {
        md: 4,
        lg: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Max Marks Per Subject"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        name: "max_marks",
        errors: errors,
        value: data.max_marks,
        type: "number",
        onChange: function onChange(e) {
          return _this4.onChange(e);
        }
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: function onClick(e) {
          return _this4.onSubmit();
        }
      }, button_text)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr.no"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Exam Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Min Marks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Min Max"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Remove")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, Object.keys(examType).length > 0 && examType.map(function (item, id) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, id + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.exam_type), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.min_marks), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.max_marks), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          onClick: function onClick(e) {
            return _this4.removeExamType(item.id);
          },
          className: "btn btn-danger btn-sm"
        }, "Remove")));
      }))))));
    }
  }]);

  return AddExamType;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    examType: state.examType,
    classwiseSubject: state.classwiseSubject
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, {
  setClasswiseSubjectsDispatch: _actions_classwiseSubject__WEBPACK_IMPORTED_MODULE_10__["setClasswiseSubjectsDispatch"],
  getExamTypeDispatch: _actions_exam__WEBPACK_IMPORTED_MODULE_6__["getExamTypeDispatch"],
  getExamType: _actions_exam__WEBPACK_IMPORTED_MODULE_6__["getExamType"]
})(AddExamType));

/***/ })

}]);
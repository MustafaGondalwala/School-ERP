(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./resources/js/component/student/form/RegisterForm.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/component/student/form/RegisterForm.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_TopBreadcrumb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/TopBreadcrumb */ "./resources/js/component/utils/TopBreadcrumb.jsx");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_Col__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Col */ "./resources/js/component/utils/Col.jsx");
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_BodyComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/BodyComponent */ "./resources/js/component/utils/BodyComponent.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var _header_admin_AdminStudentHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../header/admin/AdminStudentHeader */ "./resources/js/component/header/admin/AdminStudentHeader.jsx");
/* harmony import */ var _utils_GetClassId__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/GetClassId */ "./resources/js/component/utils/GetClassId.jsx");
/* harmony import */ var _actions_classes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/classes */ "./resources/js/component/actions/classes.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils_YearSelectComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/YearSelectComponent */ "./resources/js/component/utils/YearSelectComponent.jsx");
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















var RegisterPage = /*#__PURE__*/function (_Component) {
  _inherits(RegisterPage, _Component);

  var _super = _createSuper(RegisterPage);

  function RegisterPage(props) {
    var _this;

    _classCallCheck(this, RegisterPage);

    _this = _super.call(this, props);
    _this.state = {
      button_text: "Register Student",
      data: {
        register_no: "",
        classes: "",
        student_name: "",
        mother_name: "",
        father_name: "",
        father_contact_no1: "",
        father_contact_no2: "",
        dob: "",
        gender: "male",
        doA: "",
        student_address: "",
        block: "",
        district: "",
        state: "",
        pincode: "",
        student_photo: "",
        mother_photo: "",
        father_photo: "",
        select_year: ""
      }
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.fileChange = _this.fileChange.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RegisterPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          classes = _this$props.classes,
          getClassSection = _this$props.getClassSection;

      if (Object.keys(classes).length == 0) {
        getClassSection();
      }
    }
  }, {
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
    key: "fileChange",
    value: function fileChange(e) {
      var _e$target2 = e.target,
          name = _e$target2.name,
          files = _e$target2.files;
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, name, files[0]))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.classes) errors.classes = "Can't be blank";
      if (!data.register_no) errors.register_no = "Can't be blank";
      if (!data.student_name) errors.student_name = "Can't be blank";
      if (!data.father_name) errors.father_name = "Can't be blank";
      if (!data.father_contact_no1) errors.father_contact_no1 = "Can't be blank";
      if (!data.dob) errors.dob = "Can't be blank";
      if (!data.gender) errors.gender = "Can't be blank";
      if (!data.student_address) errors.student_address = "Can't be blank";
      return errors;
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this2 = this;

      var data = this.state.data;
      var errors = this.validate(data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length == 0) {
        this.setState({
          button_text: "Registering Student ..."
        });
        this.props.newRegisterStudent(data).then(function (data) {
          _this2.setState({
            button_text: "Register Student",
            data: {
              register_no: "",
              classes: "",
              student_name: "",
              mother_name: "",
              father_name: "",
              father_contact_no1: "",
              father_contact_no2: "",
              dob: "",
              gender: "male",
              doA: "",
              student_address: "",
              block: "",
              district: "",
              state: "",
              pincode: "",
              student_photo: "",
              mother_photo: "",
              father_photo: ""
            }
          });

          sweetalert2__WEBPACK_IMPORTED_MODULE_11___default.a.fire("Success", "New Student Registered.", "success");
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var _this$state = this.state,
          data = _this$state.data,
          errors = _this$state.errors,
          button_text = _this$state.button_text;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Select Class"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Select"], {
        errors: errors,
        name: "classes",
        value: data.classes,
        onChange: this.onChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["SelectOption"], null, "-- Select --"), Object.keys(classes).length > 0 && classes.map(function (data) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["SelectOption"], {
          value: data
        }, data);
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Register No."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        errors: errors,
        type: "number",
        value: data.register_no,
        onChange: this.onChange,
        name: "register_no",
        placeholder: "Register No."
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Student Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        errors: errors,
        type: "text",
        onChange: this.onChange,
        value: data.student_name,
        name: "student_name",
        placeholder: "Student Name"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Father Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        errors: errors,
        type: "text",
        onChange: this.onChange,
        value: data.father_name,
        name: "father_name",
        placeholder: "Father Name"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Mother Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        type: "text",
        onChange: this.onChange,
        value: data.mother_name,
        name: "mother_name",
        placeholder: "Mother Name"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Father ContactNo 1"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        errors: errors,
        type: "text",
        onChange: this.onChange,
        value: data.father_contact_no1,
        name: "father_contact_no1",
        placeholder: "Father ContactNo 1"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Father ContactNo 2"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        type: "text",
        onChange: this.onChange,
        value: data.father_contact_no2,
        name: "father_contact_no2",
        placeholder: "Father ContactNo 2"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "DOB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        errors: errors,
        type: "date",
        onChange: this.onChange,
        value: data.dob,
        name: "dob"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Gender"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Select"], {
        name: "gender",
        value: data.gender,
        onChange: this.onChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["SelectOption"], null, "Male"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["SelectOption"], null, "Female")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Date of Admission"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        type: "date",
        onChange: this.onChange,
        value: data.doA,
        name: "doA"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        errors: errors,
        value: data.student_address,
        onChange: this.onChange,
        name: "student_address",
        placeholder: "Student Address"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Block"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        value: data.block,
        onChange: this.onChange,
        name: "block",
        placeholder: "Block"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "District"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        value: data.district,
        onChange: this.onChange,
        name: "district",
        placeholder: "District"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "State"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        value: data.state,
        onChange: this.onChange,
        name: "state",
        placeholder: "State"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Pincode"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Input"], {
        value: data.pincode,
        onChange: this.onChange,
        name: "pincode",
        placeholder: "Pincode"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Student Photo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["UploadImage"], {
        name: "student_photo",
        onChange: this.fileChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Mother Photo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["UploadImage"], {
        name: "mother_photo",
        onChange: this.fileChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_3__["default"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["FormLabel"], null, "Father Photo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["UploadImage"], {
        name: "father_photo",
        onChange: this.fileChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        primary: true,
        onClick: this.submit
      }, button_text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        warning: true
      }, "Reset")));
    }
  }]);

  return RegisterPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    classes: state.distinct_classes
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["connect"])(mapStateToProps, {
  getClassSection: _actions_classes__WEBPACK_IMPORTED_MODULE_9__["getClassSection"]
})(RegisterPage));

/***/ })

}]);
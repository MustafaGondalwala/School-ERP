(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./resources/js/component/attendance/utils/StudentAttendanceEditAdmin.jsx":
/*!********************************************************************************!*\
  !*** ./resources/js/component/attendance/utils/StudentAttendanceEditAdmin.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StudentAttendanceEditAdmin; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_GetClassId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/GetClassId */ "./resources/js/component/utils/GetClassId.jsx");
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var _utils_Col__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Col */ "./resources/js/component/utils/Col.jsx");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
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








var FillViewFormStudent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(function () {
  return __webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! ../form/FillViewFormStudent */ "./resources/js/component/attendance/form/FillViewFormStudent.jsx"));
});


var StudentAttendanceEditAdmin = /*#__PURE__*/function (_Component) {
  _inherits(StudentAttendanceEditAdmin, _Component);

  var _super = _createSuper(StudentAttendanceEditAdmin);

  function StudentAttendanceEditAdmin(props) {
    var _this;

    _classCallCheck(this, StudentAttendanceEditAdmin);

    _this = _super.call(this, props);
    _this.state = {
      data: {
        class_id: "",
        select_date: ""
      },
      view_type: "",
      student_attendance: "",
      errors: {},
      view_button: "View Attendance",
      fill_button: "Fill Attendance",
      show_class_panel: true,
      user_type: ""
    };
    _this.sendClassId = _this.sendClassId.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.changeState = _this.changeState.bind(_assertThisInitialized(_this));
    _this.updateStudentAttendance = _this.updateStudentAttendance.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StudentAttendanceEditAdmin, [{
    key: "onChange",
    value: function onChange(e) {
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, e.target.name, e.target.value))
      });
    }
  }, {
    key: "changeState",
    value: function changeState(type, value) {
      this.setState(_defineProperty({}, type, value));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          class_id = _this$props.class_id,
          user_type = _this$props.user_type;
      console.log(class_id, user_type);

      if (user_type != undefined && class_id != undefined) {
        this.setState({
          data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, "class_id", class_id))
        });
        this.changeState("user_type", user_type);
      }
    }
  }, {
    key: "sendClassId",
    value: function sendClassId(class_id) {
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, "class_id", class_id))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.select_date) errors.select_date = "Can't be blank";
      if (!data.class_id) errors.class_id = "Can't be blank";
      return errors;
    }
  }, {
    key: "submit",
    value: function submit(type) {
      var _this2 = this;

      var errors = this.validate(this.state.data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length == 0) {
        this.setState({
          student_attendance: ""
        });

        if (type == "fill") {
          this.changeState("fill_button", "Loading ...");
        } else {
          this.changeState("view_button", "Loading ...");
        }

        _api__WEBPACK_IMPORTED_MODULE_6__["default"].adminteacher.student_attendance.get(this.state.data).then(function (data) {
          _this2.setState({
            student_attendance: data.student_attendance,
            view_type: type,
            view_button: "View Attendance",
            fill_button: "Fill Attendance"
          });
        });
      }
    }
  }, {
    key: "updateStudentAttendance",
    value: function updateStudentAttendance(student_attendance) {
      return _api__WEBPACK_IMPORTED_MODULE_6__["default"].adminteacher.student_attendance.update(student_attendance).then(function (data) {
        // const {studentAttendances,message} = data
        // Swal.fire("Data Updated!!",message,"success");
        // this.setState({
        //     student_attendance:""
        // },() => {
        //     this.setState({
        //         student_attendance:studentAttendances
        //     })
        // })
        return data;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          errors = _this$state.errors,
          data = _this$state.data,
          student_attendance = _this$state.student_attendance,
          view_type = _this$state.view_type,
          view_button = _this$state.view_button,
          fill_button = _this$state.fill_button,
          user_type = _this$state.user_type;
      var back_link = "/admin/attendance";
      if (user_type != "") back_link = "/teacher/attendance/class/" + data.class_id;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Select Class",
        back_link: back_link
      }, !user_type && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_GetClassId__WEBPACK_IMPORTED_MODULE_2__["default"], {
        class_id: data.class_id,
        errors: errors,
        sendClassId: this.sendClassId
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_4__["default"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_7__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_7__["FormLabel"], null, "Select Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_7__["Input"], {
        errors: errors,
        type: "date",
        onChange: this.onChange,
        name: "select_date",
        value: data.date
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_4__["default"], {
        md: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        primary: true,
        onClick: function onClick(e) {
          return _this3.submit("view");
        }
      }, view_button), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        primary: true,
        onClick: function onClick(e) {
          return _this3.submit("fill");
        }
      }, fill_button)))), view_type && student_attendance && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Loading ...")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FillViewFormStudent, {
        select_date: data.select_date,
        updateStudentAttendance: this.updateStudentAttendance,
        view_type: view_type,
        student_attendance: student_attendance
      })));
    }
  }]);

  return StudentAttendanceEditAdmin;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

}]);
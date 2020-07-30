(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./resources/js/component/timetable/form/AddTimeTableStudent.jsx":
/*!***********************************************************************!*\
  !*** ./resources/js/component/timetable/form/AddTimeTableStudent.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_GetClassId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/GetClassId */ "./resources/js/component/utils/GetClassId.jsx");
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var _actions_timetable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../actions/timetable */ "./resources/js/component/actions/timetable.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _form_ViewEditStudentTimeTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../form/ViewEditStudentTimeTable */ "./resources/js/component/timetable/form/ViewEditStudentTimeTable.jsx");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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











var AddTimeTableStudent = /*#__PURE__*/function (_Component) {
  _inherits(AddTimeTableStudent, _Component);

  var _super = _createSuper(AddTimeTableStudent);

  function AddTimeTableStudent(props) {
    var _this;

    _classCallCheck(this, AddTimeTableStudent);

    _this = _super.call(this, props);
    _this.state = {
      fetch_button: "Fetch",
      timetable_name: "",
      timetable: "",
      errors: {}
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.fetchForm = _this.fetchForm.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddTimeTableStudent, [{
    key: "onChange",
    value: function onChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.timetable_name) errors.timetable_name = "Can't be blank";
      return errors;
    }
  }, {
    key: "fetchForm",
    value: function () {
      var _fetchForm = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this2 = this;

        var errors, timetable_name;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = this.validate(this.state);
                this.setState({
                  errors: errors
                });

                if (!(Object.keys(errors).length == 0)) {
                  _context.next = 7;
                  break;
                }

                this.setState({
                  fetch_button: "Fetching TimeTable ..."
                });
                timetable_name = this.state.timetable_name;
                _context.next = 7;
                return _api__WEBPACK_IMPORTED_MODULE_5__["default"].admin.timetable.add(timetable_name).then(function (data) {
                  _this2.props.setTimetable(data.new_timetable_names);

                  _this2.setState({
                    timetable: data.timetable,
                    fetch_button: "Fetch"
                  });
                })["catch"](function (error) {
                  if (error.response) {
                    if (error.response.status == 400) {
                      _this2.setState({
                        fetch_button: "Fetch"
                      });

                      sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire("Validation Error", error.response.data.error.message, "warning");
                    }
                  }
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchForm() {
        return _fetchForm.apply(this, arguments);
      }

      return fetchForm;
    }()
  }, {
    key: "submit",
    value: function submit(timetable) {
      var _this3 = this;

      _api__WEBPACK_IMPORTED_MODULE_5__["default"].admin.timetable.update(timetable).then(function (data) {
        _this3.setState({
          timetable_name: "",
          timetable: ""
        });

        sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire("success", data.message, "success");
      })["catch"](function (error) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire("Error Occured", "Error Occured in Process. Try again Later", "error");
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          fetch_button = _this$state.fetch_button,
          errors = _this$state.errors,
          timetable = _this$state.timetable;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
        title: "Add TimeTable"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "form-group col-md-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
        className: "form-control-label"
      }, "TimeTable Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "text",
        name: "timetable_name",
        placeholder: "Time Table Name",
        value: this.state.timetable_name,
        onChange: function onChange(e) {
          return _this4.onChange(e);
        },
        className: "form-control"
      }), errors.timetable_name && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_4__["default"], {
        text: errors.timetable_name
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: function onClick(e) {
          return _this4.fetchForm();
        }
      }, fetch_button))), timetable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_form_ViewEditStudentTimeTable__WEBPACK_IMPORTED_MODULE_9__["default"], {
        submit: this.submit,
        type: "add",
        timetable: timetable
      }));
    }
  }]);

  return AddTimeTableStudent;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

function mapStateToProps(state) {
  return {
    timetables: state.timetables
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, {
  setTimetable: _actions_timetable__WEBPACK_IMPORTED_MODULE_6__["setTimetable"]
})(AddTimeTableStudent));

/***/ })

}]);
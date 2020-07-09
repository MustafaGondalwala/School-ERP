(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/js/component/teacher/form/AddTeacherForm.jsx":
/*!****************************************************************!*\
  !*** ./resources/js/component/teacher/form/AddTeacherForm.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddTeacherForm; });
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var _utils_BodyComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/BodyComponent */ "./resources/js/component/utils/BodyComponent.jsx");
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
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












var AddTeacherForm = /*#__PURE__*/function (_Component) {
  _inherits(AddTeacherForm, _Component);

  var _super = _createSuper(AddTeacherForm);

  function AddTeacherForm(props) {
    var _this;

    _classCallCheck(this, AddTeacherForm);

    _this = _super.call(this, props);
    _this.state = {
      data: {
        empid: "",
        teacher_name: "",
        gender: "male",
        relative_name: "",
        email: "",
        contact_no: "",
        qualification: "",
        address: "",
        dob: "",
        blood_group: "",
        aadhar_card: "",
        bank_name: "",
        bank_number: "",
        pf_no: "",
        pf_amount: "",
        da_amount: "",
        hra_amount: "",
        salary_remark: "",
        casual_leave: "",
        sick_leave: "",
        pay_earn_leave: "",
        other_leave: "",
        emp_photo: "",
        id_proof: "",
        experience_letter: "",
        other_documents1: "",
        other_documents2: "",
        salary: "",
        send_sms: true
      },
      errors: {},
      button_text: "Add"
    };
    _this.toggleSmsChange = _this.toggleSmsChange.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.onFileChange = _this.onFileChange.bind(_assertThisInitialized(_this));
    _this.makeInputNull = _this.makeInputNull.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddTeacherForm, [{
    key: "onFileChange",
    value: function onFileChange(e) {
      var _e$target = e.target,
          name = _e$target.name,
          files = _e$target.files;
      var value = files[0];
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, name, value))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.empid) errors.empid = "Can't be blank";
      if (!data.teacher_name) errors.teacher_name = "Can't be blank";
      if (!data.gender) errors.gender = "Can't be blank";
      if (!data.relative_name) errors.relative_name = "Can't be blank";
      if (!data.email) errors.email = "Can't be blank";
      if (!data.contact_no) errors.contact_no = "Can't be blank";
      if (!data.qualification) errors.qualification = "Can't be blank";
      if (!data.address) errors.address = "Can't be blank";
      if (!data.salary) errors.salary = "Can't be blank";
      if (!data.dob) errors.dob = "Can't be blank";
      if (!data.date_of_joining) errors.date_of_joining = "Can't be blank";
      if (data.teacher_name.length < 3) errors.teacher_name = "Min. Length 3 char.";
      if (data.relative_name.length < 3) errors.relative_name = "Min. Length 3 char.";
      if (data.address.length < 3) errors.address = "Min. Length 5 char.";
      if (data.contact_no.length != 10) errors.contact_no = "Invalid Contact No.";
      if (!validator__WEBPACK_IMPORTED_MODULE_0___default.a.isMobilePhone(data.contact_no)) errors.contact_no = "Invalid Contact No.";
      return errors;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      var _this$state = this.state,
          data = _this$state.data,
          edit = _this$state.edit;
      var errors = this.validate(this.state.data);
      this.setState({
        errors: errors
      });
      var formData = new FormData();
      Object.keys(this.state.data).map(function (item) {
        formData.append(item, _this2.state.data[item]);
      });

      if (Object.keys(errors).length === 0) {
        if (!edit) {
          this.setState({
            button_text: "Adding .."
          });
        } else {
          this.setState({
            button_text: "Updating .."
          });
        }

        var text = 'Add Teacher in System';

        if (edit) {
          text = 'Update Teacher in System';
        }

        sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
          title: 'Are you sure?',
          text: "Add Teacher in System",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Yes, process it!',
          preConfirm: function preConfirm() {
            return _this2.props.submit(formData).then(function (data) {
              return data;
            })["catch"](function (error) {
              if (error.response.status == 400) sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire("Error Occured", "Validation Error", "error");else if (error.response.status) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire("Error Occured", "Validation Error", "warning");

                _this2.setState({
                  errors: error.response.data.errors
                });
              }
            });
          }
        }).then(function (result) {
          if (result.hasOwnProperty('value')) {
            if (result.value.hasOwnProperty('error')) {
              sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire("Error", "Error Occured in Process. Please check the Data", "error");
            }

            if (result.value.hasOwnProperty('message')) {
              if (!edit) _this2.makeInputNull();
              sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire("Success", result.value.message, "success");
            }

            if (!edit) {
              _this2.setState({
                button_text: "Add"
              });
            } else {
              _this2.setState({
                button_text: "Update"
              });
            }
          }
        });
      }
    }
  }, {
    key: "makeInputNull",
    value: function makeInputNull() {
      var data = {
        empid: "",
        teacher_name: "",
        gender: "male",
        relative_name: "",
        email: "",
        contact_no: "",
        qualification: "",
        address: "",
        dob: "",
        blood_group: "",
        aadhar_card: "",
        bank_name: "",
        bank_number: "",
        pf_no: "",
        pf_amount: "",
        da_amount: "",
        hra_amount: "",
        salary_remark: "",
        casual_leave: "",
        sick_leave: "",
        pay_earn_leave: "",
        other_leave: "",
        emp_photo: "",
        id_proof: "",
        experience_letter: "",
        other_documents1: "",
        other_documents2: "",
        salary: "",
        date_of_join: "",
        send_sms: true
      };
      this.setState({
        data: data
      });
    }
  }, {
    key: "toggleSmsChange",
    value: function toggleSmsChange() {
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, "send_sms", !this.state.data.send_sms))
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var data = this.props.data;
      if (data != undefined) this.setState({
        data: data,
        button_text: "Update",
        edit: true
      });
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, e.target.name, e.target.value))
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state2 = this.state,
          data = _this$state2.data,
          errors = _this$state2.errors,
          button_text = _this$state2.button_text;
      var _this$props = this.props,
          title = _this$props.title,
          back_link = _this$props.back_link;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_5__["default"], {
        title: title,
        back_link: back_link
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["RedLabel"], null, "Personal Information:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Empid: "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "empid",
        onChange: this.onChange,
        value: data.empid || ''
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Teacher Name*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "teacher_name",
        value: data.teacher_name || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Husband/Father Name*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "relative_name",
        value: data.relative_name || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Email*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "email",
        value: data.email || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Gender*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Select"], {
        errors: errors,
        name: "gender",
        value: data.gender,
        onChange: this.onChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["SelectOption"], null, "-- Select --"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["SelectOption"], {
        value: "male"
      }, "Male"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["SelectOption"], {
        value: "female"
      }, "Female"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["SelectOption"], {
        value: "other"
      }, "Other")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Contact No*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "contact_no",
        value: data.contact_no || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Address*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "address",
        value: data.address || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Qualification"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "qualification",
        value: data.qualification || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Dob*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        type: "date",
        errors: errors,
        name: "dob",
        value: data.dob || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Blood Group*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "blood_group",
        value: data.blood_group || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Date of Joining*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        type: "date",
        name: "date_of_joining",
        value: data.date_of_joining || '',
        onChange: this.onChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["RedLabel"], null, "Documents"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Aadhar Card"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "aadhar_card",
        value: data.aadhar_card || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Bank Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "bank_name",
        value: data.bank_name || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Bank Number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "bank_number",
        value: data.bank_number || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Pan Card Number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "pan_card_number",
        value: data.pan_card_number || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Teacher Photo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["UploadImage"], {
        name: "emp_photo",
        value: data.emp_photo,
        onChange: this.onFileChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["PreviewSingleImage"], {
        url: data.emp_photo
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Experience Letter"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["UploadImage"], {
        name: "experience_letter",
        value: data.experience_letter,
        onChange: this.onFileChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["PreviewSingleImage"], {
        url: data.experience_letter
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "ID Proof"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["UploadImage"], {
        name: "id_proof",
        value: data.id_proof,
        onChange: this.onFileChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["PreviewSingleImage"], {
        url: data.id_proof
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Other Documents 1"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["UploadImage"], {
        name: "other_documents1",
        value: data.other_documents1,
        onChange: this.onFileChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["PreviewSingleImage"], {
        url: data.other_documents1
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Other Documents 2"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["UploadImage"], {
        name: "other_documents2",
        value: data.other_documents2,
        onChange: this.onFileChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["PreviewSingleImage"], {
        url: data.other_documents2
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["RedLabel"], null, "Salary Details:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Salary*"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "salary",
        value: data.salary || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "PF No."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "pf_no",
        value: data.pf_no || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "PF Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "pf_amount",
        value: data.pf_amount || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "TDS Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "tds_amount",
        value: data.tds_amount || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Professional TAX Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "professional_tax",
        value: data.professional_tax || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "DA Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "da_amount",
        value: data.da_amount || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "HRA Amount "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "hra_amount",
        value: data.hra_amount || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Salary Remark "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "salary_remark",
        value: data.salary_remark || '',
        onChange: this.onChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["RedLabel"], null, "Leave Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Casual Leave "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "casual_leave",
        value: data.casual_leave || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Pay/Earn Leave "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "pay_earn_leave",
        value: data.pay_earn_leave || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Sick Leave "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "sick_leave",
        value: data.sick_leave || '',
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Col"], {
        md: "4",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Other Leave "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Input"], {
        errors: errors,
        name: "other_leave",
        value: data.other_leave || '',
        onChange: this.onChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_8__["default"], null, !data.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["FormLabel"], null, "Check for Sms Message")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "checkbox",
        checked: data.send_sms,
        onChange: function onChange(e) {
          return _this3.toggleSmsChange();
        }
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_9__["Button"], {
        primary: true,
        onClick: this.onSubmit
      }, button_text)));
    }
  }]);

  return AddTeacherForm;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ })

}]);
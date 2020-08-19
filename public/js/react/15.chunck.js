(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./resources/js/component/exam/form/AllocateSubjectForm.jsx":
/*!******************************************************************!*\
  !*** ./resources/js/component/exam/form/AllocateSubjectForm.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var _utils_MultipleSelectSubject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/MultipleSelectSubject */ "./resources/js/component/utils/MultipleSelectSubject.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_subjects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/subjects */ "./resources/js/component/actions/subjects.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_9__);
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












var AllocateSubjectForm = /*#__PURE__*/function (_Component) {
  _inherits(AllocateSubjectForm, _Component);

  var _super = _createSuper(AllocateSubjectForm);

  function AllocateSubjectForm(props) {
    var _this;

    _classCallCheck(this, AllocateSubjectForm);

    _this = _super.call(this, props);
    _this.state = {
      class_id: "",
      subjectclasswise: "",
      add: false
    };
    _this.changeStateType = _this.changeStateType.bind(_assertThisInitialized(_this));
    _this.eventType = _this.eventType.bind(_assertThisInitialized(_this));
    _this.updateSubjectPerClass = _this.updateSubjectPerClass.bind(_assertThisInitialized(_this));
    _this.deleteClass = _this.deleteClass.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AllocateSubjectForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          subjectclasswise = _this$props.subjectclasswise,
          class_id = _this$props.class_id,
          setSubjects = _this$props.setSubjects,
          subjects = _this$props.subjects;
      if (Object.keys(subjects).length == 0) _api__WEBPACK_IMPORTED_MODULE_6__["default"].subjects().then(function (data) {
        setSubjects(data.subjects);
      });
      this.setState({
        subjectclasswise: subjectclasswise,
        class_id: class_id
      });
    }
  }, {
    key: "changeStateType",
    value: function changeStateType(name, value) {
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "eventType",
    value: function eventType(type, row) {
      switch (type) {
        case "add":
          this.changeStateType("add", true);
          break;

        case "delete":
          this.deleteClass(row);
          break;
      }
    }
  }, {
    key: "deleteClass",
    value: function deleteClass(subject_id) {
      var _this2 = this;

      var class_id = this.props.class_id;
      sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire({
        title: 'Are you sure?',
        text: "You will able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Subject From Class!'
      }).then(function (result) {
        if (result.value) {
          _api__WEBPACK_IMPORTED_MODULE_6__["default"].admin["class"].delete_subject_class_wise(class_id, subject_id).then(function (data) {
            var subjectclasswise = data.subjectclasswise,
                message = data.message;

            _this2.setState({
              subjectclasswise: subjectclasswise,
              add: false
            });

            sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Success", message, "success");
          })["catch"](function (error) {
            if (error.response) {
              var _error$response = error.response,
                  status = _error$response.status,
                  data = _error$response.data;

              if (status == 422) {
                var message = data.error.message;
                sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Invalid Data", message, "warning");
              } else if (status == 400 || status == 500) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Error Occurred", "Problem Occurred in Process. Try again Later.", "warning");
              }
            }
          });
        }
      });
    }
  }, {
    key: "updateSubjectPerClass",
    value: function updateSubjectPerClass(subject) {
      var _this3 = this;

      var class_id = this.props.class_id;
      sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire({
        title: 'Are you sure?',
        text: "You will able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update subject to class!'
      }).then(function (result) {
        if (result.value) {
          _api__WEBPACK_IMPORTED_MODULE_6__["default"].admin["class"].update_subject_class_wise(class_id, subject).then(function (data) {
            var subjectclasswise = data.subjectclasswise,
                message = data.message;

            _this3.setState({
              subjectclasswise: subjectclasswise,
              add: false
            });

            sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Success", message, "success");
          })["catch"](function (error) {
            if (error.response) {
              var _error$response2 = error.response,
                  status = _error$response2.status,
                  data = _error$response2.data;

              if (status == 422) {
                var message = data.error.message;
                sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Invalid Data", message, "warning");
              }
            }
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          subjectclasswise = _this$state.subjectclasswise,
          class_id = _this$state.class_id,
          add = _this$state.add;
      var subjects = this.props.subjects;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Subject List Per Class",
        download: true,
        add_object: {
          text: "Add",
          clickFunction: function clickFunction() {
            return _this4.eventType("add", true);
          }
        }
      }, subjectclasswise.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Thead"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr no."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Subject"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Actions")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, subjectclasswise.map(function (item, id) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, id + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.subject.subject_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          className: "table-actions"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#!",
          onClick: function onClick(e) {
            return _this4.eventType("delete", item.id);
          },
          className: "table-action table-action-delete",
          "data-toggle": "tooltip",
          "data-original-title": "Delete Subject"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-trash"
        }))));
      }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, " No Subject Found for Class ")), add && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AddSubjectClass, {
        submit: this.updateSubjectPerClass,
        type: "add",
        title: "Add Subject Class",
        subjects: subjects,
        subjectclasswise: subjectclasswise
      }));
    }
  }]);

  return AllocateSubjectForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var AddSubjectClass = /*#__PURE__*/function (_Component2) {
  _inherits(AddSubjectClass, _Component2);

  var _super2 = _createSuper(AddSubjectClass);

  function AddSubjectClass(props) {
    var _this5;

    _classCallCheck(this, AddSubjectClass);

    _this5 = _super2.call(this, props);
    _this5.state = {
      select_subject: "",
      error: ""
    };
    _this5.onChange = _this5.onChange.bind(_assertThisInitialized(_this5));
    _this5.submit = _this5.submit.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(AddSubjectClass, [{
    key: "onChange",
    value: function onChange(e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this$state2 = this.state,
          select_subject = _this$state2.select_subject,
          error = _this$state2.error;

      if (select_subject == "") {
        this.setState({
          error: "Select Subject"
        });
        return false;
      }

      this.setState({
        error: ""
      });
      this.props.submit(select_subject);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          type = _this$props2.type,
          subjects = _this$props2.subjects,
          title = _this$props2.title,
          subjectclasswise = _this$props2.subjectclasswise;
      var _this$state3 = this.state,
          select_subject = _this$state3.select_subject,
          error = _this$state3.error;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], null, "Select Subject"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Select"], {
        name: "select_subject",
        onChange: this.onChange,
        value: select_subject
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["SelectOption"], {
        selected: true
      }, "-- Select --"), Object.keys(subjects).length > 0 && subjects.map(function (item, id) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["SelectOption"], {
          key: id,
          value: item.id
        }, item.subject_name);
      })), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_8__["default"], {
        text: error
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        md: 6
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        primary: true,
        sm: true,
        onClick: this.submit
      }, "Add"))));
    }
  }]);

  return AddSubjectClass;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    subjects: state.subjects
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, {
  setSubjects: _actions_subjects__WEBPACK_IMPORTED_MODULE_5__["setSubjects"]
})(AllocateSubjectForm));

/***/ })

}]);
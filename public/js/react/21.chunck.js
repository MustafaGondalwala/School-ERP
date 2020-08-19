(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./resources/js/component/homework/form/AddHomeWork.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/component/homework/form/AddHomeWork.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ckeditor/ckeditor5-react */ "./node_modules/@ckeditor/ckeditor5-react/dist/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-classic */ "./node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var _actions_subjects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/subjects */ "./resources/js/component/actions/subjects.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
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











var AddFormHomeWork = /*#__PURE__*/function (_Component) {
  _inherits(AddFormHomeWork, _Component);

  var _super = _createSuper(AddFormHomeWork);

  function AddFormHomeWork(props) {
    var _this;

    _classCallCheck(this, AddFormHomeWork);

    _this = _super.call(this, props);
    _this.state = {
      data: {
        title: "Science HomeWork",
        subtitle: "Science",
        description: "<p>Science HomeWork</p>",
        submition_date: "2020-03-03",
        image_url: [],
        subject: "1",
        class_id: ""
      },
      errors: {},
      add_button: "Add HomeWork"
    };
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.makeInputNull = _this.makeInputNull.bind(_assertThisInitialized(_this));
    _this.onFileChange = _this.onFileChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddFormHomeWork, [{
    key: "onChange",
    value: function onChange(e) {
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, e.target.name, e.target.value))
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _this$props = this.props,
          subject = _this$props.subject,
          setSubjectDispatch = _this$props.setSubjectDispatch;

      if (Object.keys(subject).length == 0) {
        setSubjectDispatch();
      }

      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, "class_id", this.props.class_id))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.title) errors.title = "Can't be blank";
      if (!data.subtitle) errors.subtitle = "Can't be blank";
      if (!data.description) errors.description = "Can't be blank";
      if (!data.submition_date) errors.submition_date = "Can't be blank";
      if (data.title.length < 3) errors.title = "Min. Length 3 char.";
      if (data.description.length < 3) errors.student_address = "Min. Length 5 char.";
      return errors;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      var _this$state = this.state,
          data = _this$state.data,
          files = _this$state.files;
      var errors = this.validate(this.state.data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length === 0) {
        this.setState({
          add_button: "Adding HomeWork ..."
        });
        var formData = new FormData(); //formdata object

        Object.keys(data).map(function (item) {
          formData.append(item, data[item]);
        });

        for (var i = 0; i < files.length; i++) {
          formData.append("files[".concat(i, "]"), files[i]);
        }

        this.props.submit(formData).then(function () {
          _this2.setState({
            add_button: "Add HomeWork"
          });
        })["catch"](function (error) {
          console.log("error occured");
        }); // if (this.state.data.id) 
        // {
        //   this.props.editSave(this.state.data);
        // }else{
        //   this.props.submit(this.state.data);
        // }
        // this.makeInputNull();
      }
    }
  }, {
    key: "makeInputNull",
    value: function makeInputNull() {
      var data = {
        title: "",
        subtitle: "",
        description: "",
        submition_date: "",
        images_url: [],
        subject: ""
      };
      this.setState({
        data: data
      });
    }
  }, {
    key: "onFileChange",
    value: function onFileChange(e) {
      var _e$target = e.target,
          name = _e$target.name,
          files = _e$target.files;
      var files_array = [];
      Object.keys(files).map(function (item) {
        files_array.push(files[item]);
      });
      this.setState({
        files: files_array
      });
      var image_url = [];

      if (Object.keys(files).length > 0) {
        Object.keys(files).map(function (item) {
          image_url.push(URL.createObjectURL(files[item]));
        });
      }

      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, "image_url", image_url))
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state2 = this.state,
          data = _this$state2.data,
          errors = _this$state2.errors,
          add_button = _this$state2.add_button;
      var _this$props2 = this.props,
          insert_success = _this$props2.insert_success,
          subject = _this$props2.subject;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Add HomeWork"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, insert_success && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert alert-success alert-dismissible fade show",
        role: "alert"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "alert-icon"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "ni ni-like-2"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "alert-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "HomeWork Add Successfully.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "close",
        "data-dismiss": "alert",
        "aria-label": "Close"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Title: "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        name: "title",
        value: data.title,
        onChange: function onChange(e) {
          return _this3.onChange(e);
        },
        className: "form-control"
      }), errors.title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_4__["default"], {
        text: errors.title
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Sub Title: "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        name: "subtitle",
        value: data.subtitle,
        onChange: function onChange(e) {
          return _this3.onChange(e);
        },
        className: "form-control"
      }), errors.subtitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_4__["default"], {
        text: errors.subtitle
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Subject:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        value: data.subject,
        onChange: function onChange(e) {
          return _this3.onChange(e);
        },
        name: "subject"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: ""
      }, "-- Select --"), Object.keys(subject).length > 0 && subject.map(function (item) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: item.id
        }, item.subject_name);
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Description: "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2___default.a, {
        editor: _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_3___default.a,
        data: data.description,
        onChange: function onChange(event, editor) {
          var data = editor.getData();

          _this3.setState({
            data: _objectSpread(_objectSpread({}, _this3.state.data), {}, _defineProperty({}, "description", data))
          });
        },
        onInit: function onInit(editor) {
          editor.setData(data.description);
        }
      }), errors.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_4__["default"], {
        text: errors.description
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Update Files: "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_8__["UploadMutitpleMutiples"], {
        onChange: this.onFileChange,
        name: "files"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_8__["PreviewFiles"], {
        files: data.image_url
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Submition Date:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "date",
        className: "form-control",
        name: "submition_date",
        onChange: function onChange(e) {
          return _this3.onChange(e);
        },
        value: data.submition_date
      }), errors.submition_date && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_4__["default"], {
        text: errors.submition_date
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: function onClick(e) {
          return _this3.onSubmit(e);
        }
      }, add_button))));
    }
  }]);

  return AddFormHomeWork;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    subject: state.subjects
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, {
  setSubjectDispatch: _actions_subjects__WEBPACK_IMPORTED_MODULE_5__["setSubjectDispatch"]
})(AddFormHomeWork));

/***/ })

}]);
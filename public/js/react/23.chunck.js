(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./resources/js/component/homework/form/HomeWorkSubmittion.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/component/homework/form/HomeWorkSubmittion.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-data-table-component */ "./node_modules/react-data-table-component/dist/index.cjs.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_data_table_component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ckeditor/ckeditor5-react */ "./node_modules/@ckeditor/ckeditor5-react/dist/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-classic */ "./node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_8__);
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












var HomeWorkSubmittion = /*#__PURE__*/function (_Component) {
  _inherits(HomeWorkSubmittion, _Component);

  var _super = _createSuper(HomeWorkSubmittion);

  function HomeWorkSubmittion(props) {
    var _this;

    _classCallCheck(this, HomeWorkSubmittion);

    _this = _super.call(this, props);
    _this.state = {
      homework_submission: "",
      check: ""
    };
    _this.updateHomeWorkSubmission = _this.updateHomeWorkSubmission.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HomeWorkSubmittion, [{
    key: "fetchSubmission",
    value: function fetchSubmission(homework_id) {
      var _this2 = this;

      _api__WEBPACK_IMPORTED_MODULE_2__["default"].teacher.homework.get_submission(homework_id).then(function (data) {
        var homework_submission = data.homework_submission;

        _this2.setState({
          homework_submission: homework_submission
        });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var homework_id = this.props.homework_id;
      this.fetchSubmission(homework_id);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      var homework_id = this.props.homework_id;
      this.fetchSubmission(homework_id);
    }
  }, {
    key: "viewSubmition",
    value: function viewSubmition(data) {
      this.setState({
        check: data
      });
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(status) {
      switch (status) {
        case 1:
          return "Pending";

        case 2:
          return "Completed";

        case 3:
          return "Issue Raised";

        case 4:
          return "Submitted";

        case 5:
          return "Rejected";
      }
    }
  }, {
    key: "updateHomeWorkSubmission",
    value: function updateHomeWorkSubmission(type, student_homework_id) {
      var _this3 = this;

      return _api__WEBPACK_IMPORTED_MODULE_2__["default"].teacher.homework.homework_check(type, student_homework_id).then(function (data) {
        _this3.setState({
          check: ""
        });
      })["catch"](function (error) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire("Error Occured", "Error Occured in Process. Try again Later", "error");
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var columns = [{
        name: "Sr no.",
        selector: "id",
        sortable: true
      }, {
        name: "Student Roll No",
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, row.student.roll_no);
        }
      }, {
        name: "Student Name",
        sortable: true,
        right: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, row.student.student_name);
        }
      }, {
        name: "Status",
        sortable: true,
        right: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _this4.fetchStatus(row.status));
        }
      }, {
        name: "Check",
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
            onClick: function onClick(e) {
              return _this4.viewSubmition(row);
            },
            primary: true,
            sm: true
          }, "Check"));
        }
      }];
      var _this$state = this.state,
          homework_submission = _this$state.homework_submission,
          check = _this$state.check;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "HomeWork Submission"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_data_table_component__WEBPACK_IMPORTED_MODULE_3___default.a, {
        title: null,
        columns: columns,
        data: homework_submission
      })), check && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ViewStudentSubmition, {
        updateHomeWorkSubmission: this.updateHomeWorkSubmission,
        data: check
      }));
    }
  }]);

  return HomeWorkSubmittion;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var ViewStudentSubmition = /*#__PURE__*/function (_Component2) {
  _inherits(ViewStudentSubmition, _Component2);

  var _super2 = _createSuper(ViewStudentSubmition);

  function ViewStudentSubmition(props) {
    var _this5;

    _classCallCheck(this, ViewStudentSubmition);

    _this5 = _super2.call(this, props);
    _this5.submit = _this5.submit.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(ViewStudentSubmition, [{
    key: "submit",
    value: function submit(type) {
      var _this6 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          var data = _this6.props.data;

          _this6.props.updateHomeWorkSubmission(type, data.id).then(function (data) {
            console.log(data);
            sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire("Success", "Student HomeWork Updated !!", "success");
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var data = this.props.data;
      var title = "Submission: " + data.student.student_name;
      var description = data.description,
          files = data.files;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_6___default.a, {
        disabled: true,
        editor: _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_7___default.a,
        data: description,
        onChange: function onChange(event, editor) {
          var data = editor.getData();

          _this7.setState({
            description: data
          });
        },
        onInit: function onInit(editor) {
          editor.setData(description);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["PreviewServerFiles"], {
        files: files
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        success: true,
        onClick: function onClick(e) {
          return _this7.submit(1);
        }
      }, "Correct"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        danger: true,
        onClick: function onClick(e) {
          return _this7.submit(2);
        }
      }, "Reject")))));
    }
  }]);

  return ViewStudentSubmition;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (HomeWorkSubmittion);

/***/ })

}]);
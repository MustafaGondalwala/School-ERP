(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/js/component/exam/form/ViewStudentDetailsExamMarksheet.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/component/exam/form/ViewStudentDetailsExamMarksheet.jsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _actions_grade__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/grade */ "./resources/js/component/actions/grade.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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










var ViewStudentDetailsExamMarksheet = /*#__PURE__*/function (_Component) {
  _inherits(ViewStudentDetailsExamMarksheet, _Component);

  var _super = _createSuper(ViewStudentDetailsExamMarksheet);

  function ViewStudentDetailsExamMarksheet(props) {
    var _this;

    _classCallCheck(this, ViewStudentDetailsExamMarksheet);

    _this = _super.call(this, props);
    _this.state = {
      marksheet: "",
      row: "",
      marksheet_id: "",
      exam_type: "",
      studentDetails: ""
    };
    _this.updateMarksheet = _this.updateMarksheet.bind(_assertThisInitialized(_this));
    _this.updateStudentMarksheet = _this.updateStudentMarksheet.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ViewStudentDetailsExamMarksheet, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          studentDetails = _this$props.studentDetails,
          exam_type = _this$props.exam_type,
          setGradeTypeDispatch = _this$props.setGradeTypeDispatch,
          gradeType = _this$props.gradeType;
      if (Object.keys(gradeType).length == 0) setGradeTypeDispatch();
      this.setState({
        studentDetails: studentDetails,
        exam_type: exam_type
      });
    }
  }, {
    key: "updateMarksheet",
    value: function updateMarksheet(studentDetails) {
      this.setState({
        studentDetails: studentDetails
      });
    }
  }, {
    key: "submit",
    value: function submit(row, marksheet_id) {
      var _this2 = this;

      this.setState({
        row: "",
        marksheet_id: ""
      }, function () {
        _this2.setState({
          row: row,
          marksheet_id: marksheet_id
        });
      });
    }
  }, {
    key: "updateStudentMarksheet",
    value: function updateStudentMarksheet(remark, marksheet, marksheet_id, student_id) {
      var _this3 = this;

      var exam_type = this.props.exam_type;
      _api__WEBPACK_IMPORTED_MODULE_3__["default"].adminteacher.exam.marksheet.update_marksheet(remark, marksheet, marksheet_id, exam_type, student_id).then(function (data) {
        var message = data.message,
            marksheet = data.marksheet;
        sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire("Success", message, "success");

        _this3.setState({
          studentDetails: ""
        });

        _this3.updateMarksheet(marksheet);
      })["catch"](function (error) {
        if (error.response) {
          var status = error.response.status;

          if (status == 422 || status == 400) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire("Invalid Data", "Data is Valid. Please Enter Correct Data", "warning");
          }
        }
      });
    }
  }, {
    key: "statusString",
    value: function statusString(status) {
      switch (status) {
        case 1:
          return "Not Edit";

        case 2:
          return "Edited";

        case 3:
          return 'Publish';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          submit = _this$props2.submit,
          exam_type = _this$props2.exam_type,
          gradeType = _this$props2.gradeType,
          max_marks = _this$props2.max_marks;
      var _this$state = this.state,
          row = _this$state.row,
          marksheet_id = _this$state.marksheet_id,
          studentDetails = _this$state.studentDetails;
      console.log(row);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, row && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MonthlyTestMarksheet, {
        max_marks: max_marks,
        gradeType: gradeType,
        submit: this.updateStudentMarksheet,
        marksheet_id: marksheet_id,
        row: row
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Students Details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Thead"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr no."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Student Roll No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Student Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Action"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, studentDetails.length > 0 && studentDetails.map(function (item, id) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: id
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, id + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.student.roll_no), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.student.student_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          primary: true,
          sm: true,
          onClick: function onClick() {
            return _this4.submit(item, item.id);
          }
        }, "Fill")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _this4.statusString(item.status)));
      })))));
    }
  }]);

  return ViewStudentDetailsExamMarksheet;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var MonthlyTestMarksheet = /*#__PURE__*/function (_Component2) {
  _inherits(MonthlyTestMarksheet, _Component2);

  var _super2 = _createSuper(MonthlyTestMarksheet);

  function MonthlyTestMarksheet(props) {
    var _this5;

    _classCallCheck(this, MonthlyTestMarksheet);

    _this5 = _super2.call(this, props);
    _this5.state = {
      marksheet: "",
      remark: ""
    };
    _this5.onChange = _this5.onChange.bind(_assertThisInitialized(_this5));
    _this5.onChangeRow = _this5.onChangeRow.bind(_assertThisInitialized(_this5));
    _this5.submit = _this5.submit.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(MonthlyTestMarksheet, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      var _this$props3 = this.props,
          marksheet_id = _this$props3.marksheet_id,
          row = _this$props3.row;
      var remark = row.remark;
      this.setState({
        remark: remark
      });
      _api__WEBPACK_IMPORTED_MODULE_3__["default"].adminteacher.exam.marksheet.get_individual(marksheet_id).then(function (data) {
        var marksheet = data.marksheet;

        _this6.setState({
          marksheet: marksheet
        });
      });
    }
  }, {
    key: "onChange",
    value: function onChange(e, index) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;
      var marksheet = this.state.marksheet;
      marksheet[index][name] = value;
      this.setState({
        marksheet: marksheet
      });
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this$state2 = this.state,
          remark = _this$state2.remark,
          marksheet = _this$state2.marksheet;
      var marksheet_id = this.props.marksheet_id;
      var student_id = this.props.row.student_id;
      this.props.submit(remark, marksheet, marksheet_id, student_id);
    }
  }, {
    key: "onChangeRow",
    value: function onChangeRow(e) {
      var _e$target2 = e.target,
          name = _e$target2.name,
          value = _e$target2.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props4 = this.props,
          row = _this$props4.row,
          gradeType = _this$props4.gradeType,
          max_marks = _this$props4.max_marks;
      var _this$state3 = this.state,
          marksheet = _this$state3.marksheet,
          remark = _this$state3.remark;
      var total_marks = 0;
      var title = "Exam  Marksheet: " + row.student.roll_no;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        md: 6,
        sm: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], null, "Student Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Input"], {
        value: row.student.student_name,
        disabled: true
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        md: 6,
        sm: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], null, "Student Roll No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Input"], {
        value: row.student.roll_no,
        disabled: true
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        md: 6,
        sm: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], null, "Father Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Input"], {
        value: row.student.father_name,
        disabled: true
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        md: 6,
        sm: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], null, "Father Contact No"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Input"], {
        value: row.student.father_contact_no1,
        disabled: true
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), marksheet ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table_responsive"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Sr no."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Subject"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Total Marks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Grade"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, marksheet.map(function (item, id) {
        total_marks += parseInt(item.total_marks);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EveryRow, {
          key: id,
          gradeType: gradeType,
          max_marks: max_marks,
          onChange: _this7.onChange,
          index: id,
          row: item
        });
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tfoot", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["Input"], {
        value: total_marks,
        disabled: true
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, Object(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["getGrade"])(gradeType, total_marks, marksheet.length * max_marks)))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Loading Marksheet ..."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: this.submit
      }, "Update")));
    }
  }]);

  return MonthlyTestMarksheet;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var EveryRow = function EveryRow(_ref) {
  var index = _ref.index,
      row = _ref.row,
      _onChange = _ref.onChange,
      gradeType = _ref.gradeType,
      max_marks = _ref.max_marks;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    key: index
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, index + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, row.subject.subject_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    min: "0",
    name: "total_marks",
    onChange: function onChange(e) {
      return _onChange(e, index);
    },
    value: row.total_marks || 0,
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, Object(_utils_Components__WEBPACK_IMPORTED_MODULE_2__["getGrade"])(gradeType, row.total_marks, max_marks)));
};

function mapStateToProps(state) {
  return {
    gradeType: state.gradeType
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, {
  setGradeTypeDispatch: _actions_grade__WEBPACK_IMPORTED_MODULE_7__["setGradeTypeDispatch"]
})(ViewStudentDetailsExamMarksheet));

/***/ })

}]);
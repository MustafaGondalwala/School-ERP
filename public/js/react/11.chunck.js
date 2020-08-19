(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./resources/js/component/attendance/form/FillViewFormStaff.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/component/attendance/form/FillViewFormStaff.jsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FillViewFormStaff; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
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





var Chart = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../../utils/Chart */ "./resources/js/component/utils/Chart.jsx"));
});

var FillViewFormStaff = /*#__PURE__*/function (_Component) {
  _inherits(FillViewFormStaff, _Component);

  var _super = _createSuper(FillViewFormStaff);

  function FillViewFormStaff(props) {
    var _this;

    _classCallCheck(this, FillViewFormStaff);

    _this = _super.call(this, props);
    _this.state = {
      title: "",
      staff_attendance: "",
      view_type: "",
      update_attendance: [],
      update_button: "Update Attendance",
      total_present: 0,
      total_absent: 0,
      total_leave: 0,
      total_half_leave: 0,
      total_none: 0
    };
    _this.stateChange = _this.stateChange.bind(_assertThisInitialized(_this));
    _this.changeSelectStatus = _this.changeSelectStatus.bind(_assertThisInitialized(_this));
    _this.updateTotalInputs = _this.updateTotalInputs.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FillViewFormStaff, [{
    key: "stateChange",
    value: function stateChange(name, value, callback) {
      this.setState(_defineProperty({}, name, value), callback);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var title = "";
      if (this.props.view_type == "fill") title = "Fill Attendance";else title = "View Attendance";
      var _this$props = this.props,
          view_type = _this$props.view_type,
          staff_attendance = _this$props.staff_attendance;
      this.stateChange("title", title);
      this.stateChange("staff_attendance", staff_attendance);
      this.stateChange("view_type", view_type);
      this.updateTotalInputs(staff_attendance);
    }
  }, {
    key: "updateTotalInputs",
    value: function updateTotalInputs(data) {
      var total_present = 0;
      var total_absent = 0;
      var total_leave = 0;
      var total_half_leave = 0;
      var total_none = 0;
      data.map(function (item) {
        switch (item.status) {
          case 1:
            total_present += 1;
            break;

          case 2:
            total_absent += 1;
            break;

          case 3:
            total_leave += 1;
            break;

          case 4:
            total_half_leave += 1;
            break;

          case 5:
            total_none += 1;
            break;
        }
      });
      this.setState({
        total_leave: total_leave,
        total_present: total_present,
        total_absent: total_absent,
        total_none: total_none,
        total_half_leave: total_half_leave
      });
    }
  }, {
    key: "changeSelectStatus",
    value: function changeSelectStatus(e, index) {
      var temp = this.state.staff_attendance;
      var value = e.target.value;
      temp[index].status = value;
      this.stateChange("staff_attendance", temp);
      var update_temp = this.state.update_attendance;
      update_temp[index] = [temp[index].id, temp[index].status];
      this.stateChange("update_attendance", update_temp);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this2 = this;

      this.stateChange("update_button", "Updating ...");
      this.props.updateStudentAttendance(this.state.update_attendance).then(function (data) {
        _this2.stateChange("update_button", "Update Attendance");

        _this2.stateChange("update_attendance", []);

        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire("Done", "Staff Attendance Updated !!", "success");
      })["catch"](function (error) {
        if (error.response) {
          if (error.response.status == 422) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire("Validation Error", "Please update Aleast One Staff Attendance", "warning");
          } else {
            sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire("Error Occured", "Error Occured. Please try later", "error");
          }
        } else {
          sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire("Error Occured", "Error Occured. Please try later", "error");
        }

        _this2.stateChange("update_button", "Update Attendance");
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          title = _this$state.title,
          staff_attendance = _this$state.staff_attendance,
          view_type = _this$state.view_type,
          update_button = _this$state.update_button;
      var _this$state2 = this.state,
          total_present = _this$state2.total_present,
          total_absent = _this$state2.total_absent,
          total_leave = _this$state2.total_leave,
          total_none = _this$state2.total_none,
          total_half_leave = _this$state2.total_half_leave;
      var select_date = this.props.select_date;
      var dataPoints = [{
        "y": total_present,
        label: "Total Present"
      }, {
        "y": total_absent,
        label: "Total Absent"
      }, {
        "y": total_leave,
        label: "Total Leave"
      }, {
        "y": total_half_leave,
        label: "Total Half Leave"
      }, {
        "y": total_none,
        label: "Total None Entry"
      }];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-responsive"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table datatable"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "S.no"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Empid"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Staff Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Staff Mobileno"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Attendance"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Checkbox"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, staff_attendance && staff_attendance.map(function (item, id) {
        var _React$createElement;

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EachAttendanceRow, (_React$createElement = {
          key: id,
          view_type: view_type,
          onChange: _this3.changeSelectStatus
        }, _defineProperty(_React$createElement, "view_type", view_type), _defineProperty(_React$createElement, "index", id), _defineProperty(_React$createElement, "row", item), _React$createElement));
      }))), view_type == "fill" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        onClick: function onClick(e) {
          return _this3.onSubmit();
        }
      }, update_button))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_3__["default"], null, view_type == "view" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Chart, {
        title: "Staff Attendance for ".concat(select_date),
        filename: "staff_attendance",
        type: "pie",
        dataPoints: dataPoints
      })));
    }
  }]);

  return FillViewFormStaff;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



var EachAttendanceRow = function EachAttendanceRow(_ref) {
  var view_type = _ref.view_type,
      index = _ref.index,
      row = _ref.row,
      _onChange = _ref.onChange;
  var disable = view_type === "view" ? true : false;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    key: index
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, index + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, row.staff.empid), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, row.staff.staff_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, row.staff.contact_no), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    disabled: disable,
    onChange: function onChange(e) {
      return _onChange(e, index);
    },
    value: row.status,
    className: "form-control"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "1"
  }, "Present"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "2"
  }, "Absent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "3"
  }, "Leave"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "4"
  }, "Half Present"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "5"
  }, "None"))));
};

/***/ })

}]);
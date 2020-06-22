(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./resources/js/component/actions/homework.js":
/*!****************************************************!*\
  !*** ./resources/js/component/actions/homework.js ***!
  \****************************************************/
/*! exports provided: setHomeWorks, setParentHomeWork, setHomeWorksDispatch, setParentHomeWorkDispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHomeWorks", function() { return setHomeWorks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParentHomeWork", function() { return setParentHomeWork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHomeWorksDispatch", function() { return setHomeWorksDispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParentHomeWorkDispatch", function() { return setParentHomeWorkDispatch; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./resources/js/component/types.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api */ "./resources/js/component/api/index.jsx");


var setHomeWorks = function setHomeWorks(class_homeworks) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_CLASS_HOMEWORK"],
    class_homeworks: class_homeworks
  };
};
var setParentHomeWork = function setParentHomeWork(parent_homework) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_PARENT_HOMEWORK"],
    parent_homework: parent_homework
  };
};
var setHomeWorksDispatch = function setHomeWorksDispatch(class_id) {
  return function (dispatch) {
    _api__WEBPACK_IMPORTED_MODULE_1__["default"].teacher.homework.get(class_id).then(function (data) {
      dispatch(setHomeWorks(data.class_homeworks));
    });
  };
};
var setParentHomeWorkDispatch = function setParentHomeWorkDispatch(student_ids) {
  return function (dispatch) {
    return _api__WEBPACK_IMPORTED_MODULE_1__["default"].parent.homework.get(student_ids).then(function (data) {
      dispatch(setParentHomeWork(data.student_homework));
      return data.student_homework;
    });
  };
};

/***/ }),

/***/ "./resources/js/component/homework/panel/ViewPanelHomeWork.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/component/homework/panel/ViewPanelHomeWork.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _actions_homework__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/homework */ "./resources/js/component/actions/homework.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-data-table-component */ "./node_modules/react-data-table-component/dist/index.cjs.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_data_table_component__WEBPACK_IMPORTED_MODULE_4__);
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







var ViewPanelHomeWork = /*#__PURE__*/function (_Component) {
  _inherits(ViewPanelHomeWork, _Component);

  var _super = _createSuper(ViewPanelHomeWork);

  function ViewPanelHomeWork(props) {
    var _this;

    _classCallCheck(this, ViewPanelHomeWork);

    _this = _super.call(this, props);
    _this.addClickFunction = _this.addClickFunction.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ViewPanelHomeWork, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          class_homeworks = _this$props.class_homeworks,
          setHomeWorksDispatch = _this$props.setHomeWorksDispatch;

      if (Object.keys(class_homeworks).length == 0) {
        setHomeWorksDispatch(this.props.class_id);
      }
    }
  }, {
    key: "addClickFunction",
    value: function addClickFunction() {
      this.props.sendEventType("add", null);
    }
  }, {
    key: "fetchStatus",
    value: function fetchStatus(status) {
      switch (status) {
        case 1:
          return "OnGoing";

        case 2:
          return "Closed";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var columns = [{
        name: "id",
        selector: "id",
        sortable: true
      }, {
        name: 'title',
        selector: 'title',
        sortable: true
      }, {
        name: 'Teacher',
        sortable: true,
        right: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, row.teacher.teacher_name);
        }
      }, {
        name: 'Subject',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, row.subject.subject_name);
        }
      }, {
        name: "Status",
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _this2.fetchStatus(row.status));
        }
      }, {
        name: 'View',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            onClick: function onClick(e) {
              return _this2.props.sendEventType("view", row.id);
            },
            className: "btn btn-sm btn-primary"
          }, "View"));
        }
      }, {
        name: 'Submittion',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            onClick: function onClick(e) {
              return _this2.props.sendEventType("homework_check", row.id);
            },
            className: "btn btn-sm btn-primary"
          }, "Check"));
        }
      }, {
        name: 'Student Status',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            onClick: function onClick(e) {
              return _this2.props.sendEventType("student_status", row.id);
            },
            className: "btn btn-sm btn-primary"
          }, "View"));
        }
      }, {
        name: 'Actions',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
            className: "table-actions"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            href: "#!",
            onClick: function onClick(e) {
              return _this2.props.sendEventType("edit_homework", row);
            },
            className: "table-action",
            "data-toggle": "tooltip",
            "data-original-title": "Edit product"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fas fa-user-edit"
          })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            href: "#!",
            className: "table-action table-action-delete",
            "data-toggle": "tooltip",
            "data-original-title": "Delete product"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fas fa-trash"
          }))));
        }
      }];
      var back_link = "/teacher/homework/class/" + this.props.class_id;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "View HomeWork",
        back_link: back_link,
        add_object: {
          'text': "Add",
          'clickFunction': this.addClickFunction
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_data_table_component__WEBPACK_IMPORTED_MODULE_4___default.a, {
        title: "Class HomeWorks",
        columns: columns,
        data: this.props.class_homeworks
      }));
    }
  }]);

  return ViewPanelHomeWork;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    class_homeworks: state.class_homeworks
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, {
  setHomeWorksDispatch: _actions_homework__WEBPACK_IMPORTED_MODULE_2__["setHomeWorksDispatch"]
})(ViewPanelHomeWork));

/***/ })

}]);
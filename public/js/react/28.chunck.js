(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./resources/js/component/homework/panel/ViewPanelHomeWorkParent.jsx":
/*!***************************************************************************!*\
  !*** ./resources/js/component/homework/panel/ViewPanelHomeWorkParent.jsx ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _actions_homework__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/homework */ "./resources/js/component/actions/homework.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-data-table-component */ "./node_modules/react-data-table-component/dist/index.cjs.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_data_table_component__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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








var ViewPanelHomeWorkParent = /*#__PURE__*/function (_Component) {
  _inherits(ViewPanelHomeWorkParent, _Component);

  var _super = _createSuper(ViewPanelHomeWorkParent);

  function ViewPanelHomeWorkParent(props) {
    var _this;

    _classCallCheck(this, ViewPanelHomeWorkParent);

    _this = _super.call(this, props);
    _this.state = {
      rows: ""
    };
    return _this;
  }

  _createClass(ViewPanelHomeWorkParent, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this$props, student_id, parent_childs, parent_homework, student_data, student_homework;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, student_id = _this$props.student_id, parent_childs = _this$props.parent_childs, parent_homework = _this$props.parent_homework;
                student_data = this.findArrayElementByTitle(this.props.parent_childs, student_id);

                if (!parent_homework[student_id]) {
                  _context.next = 6;
                  break;
                }

                this.setState({
                  rows: parent_homework[student_id]
                });
                _context.next = 10;
                break;

              case 6:
                _context.next = 8;
                return this.props.setParentHomeWorkDispatch(this.getStudentIds(parent_childs));

              case 8:
                student_homework = _context.sent;
                this.setState({
                  rows: student_homework[student_id]
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "getStudentIds",
    value: function getStudentIds(parent_childs) {
      var new_array = [];
      parent_childs.map(function (item) {
        new_array.push(item.id);
      });
      return new_array;
    }
  }, {
    key: "findArrayElementByTitle",
    value: function findArrayElementByTitle(array, student_id) {
      return array.find(function (element) {
        return element.id == student_id;
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
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, row.homework.title);
        }
      }, {
        name: 'Teacher',
        sortable: true,
        right: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, row.homework.teacher.teacher_name);
        }
      }, {
        name: 'Subject',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, row.homework.subject.subject_name);
        }
      }, {
        name: "Status",
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, _this2.fetchStatus(row.status));
        }
      }, {
        name: 'View',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
            onClick: function onClick(e) {
              return _this2.props.sendEventType("view", row.id);
            },
            className: "btn btn-sm btn-primary"
          }, "View"));
        }
      }, {
        name: 'Action',
        sortable: true,
        cell: function cell(row) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, (row.status == 1 || row.status == 5 || row.status == 3) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
            onClick: function onClick(e) {
              return _this2.props.sendEventType("submit", row.homework.id);
            },
            className: "btn btn-sm btn-success"
          }, "Submit"));
        }
      }];
      var student_id = this.props.student_id;
      var back_link = "/parent/homework/student/" + student_id;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
        title: "View HomeWork",
        back_link: back_link
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_data_table_component__WEBPACK_IMPORTED_MODULE_5___default.a, {
        title: "Student HomeWorks",
        columns: columns,
        data: this.state.rows
      }));
    }
  }]);

  return ViewPanelHomeWorkParent;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

function mapStateToProps(state) {
  return {
    parent_childs: state.parent_childs,
    parent_homework: state.parent_homework
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, {
  setParentHomeWorkDispatch: _actions_homework__WEBPACK_IMPORTED_MODULE_3__["setParentHomeWorkDispatch"]
})(ViewPanelHomeWorkParent));

/***/ })

}]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./resources/js/component/teacher/form/ViewTeacherTable.jsx":
/*!******************************************************************!*\
  !*** ./resources/js/component/teacher/form/ViewTeacherTable.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewTeacherTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ag_grid_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ag-grid-react */ "./node_modules/ag-grid-react/main.js");
/* harmony import */ var ag_grid_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ag_grid_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var ag_grid_community_dist_styles_ag_grid_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ag-grid-community/dist/styles/ag-grid.css */ "./node_modules/ag-grid-community/dist/styles/ag-grid.css");
/* harmony import */ var ag_grid_community_dist_styles_ag_grid_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ag_grid_community_dist_styles_ag_grid_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ag_grid_community_dist_styles_ag_theme_balham_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ag-grid-community/dist/styles/ag-theme-balham.css */ "./node_modules/ag-grid-community/dist/styles/ag-theme-balham.css");
/* harmony import */ var ag_grid_community_dist_styles_ag_theme_balham_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ag_grid_community_dist_styles_ag_theme_balham_css__WEBPACK_IMPORTED_MODULE_7__);
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










var ViewTeacherTable = /*#__PURE__*/function (_React$Component) {
  _inherits(ViewTeacherTable, _React$Component);

  var _super = _createSuper(ViewTeacherTable);

  function ViewTeacherTable(props) {
    var _this;

    _classCallCheck(this, ViewTeacherTable);

    _this = _super.call(this, props);
    _this.state = {
      row: "",
      redirect: ""
    };
    _this.onGridReady = _this.onGridReady.bind(_assertThisInitialized(_this));
    _this.buttonClick = _this.buttonClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ViewTeacherTable, [{
    key: "buttonClick",
    value: function buttonClick(e) {
      var type = e.target.getAttribute('type');
      var row_id = e.target.getAttribute('row_id');

      switch (type) {
        case 'edit':
          this.setState({
            redirect: "/admin/teacher/update/" + row_id
          });
          break;
      }
    }
  }, {
    key: "onGridReady",
    value: function onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    }
  }, {
    key: "checkboxSelect",
    value: function checkboxSelect(e) {
      var row = this.gridApi.getSelectedRows()[0];
      this.setState({
        row: row
      });
    }
  }, {
    key: "render",
    value: function render() {
      var teachers = this.props.teachers;
      var _this$state = this.state,
          row = _this$state.row,
          redirect = _this$state.redirect;

      if (redirect) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Redirect"], {
          to: redirect
        });
      }

      var columnDefs = [{
        headerName: "Emp ID",
        field: "user.empid",
        sortable: true,
        filter: true,
        checkboxSelection: true
      }, {
        headerName: "Class",
        field: "class",
        sortable: true,
        filter: true
      }, {
        headerName: "Teacher Name",
        field: "teacher_name",
        sortable: true,
        filter: true
      }, {
        headerName: "Husband/Relative Name",
        field: "user.relative_name",
        sortable: true,
        filter: true
      }, {
        headerName: "Email",
        field: "user.email",
        sortable: true,
        filter: true
      }, {
        headerName: "Contact No",
        field: "user.contact_no",
        sortable: true,
        filter: true
      }, {
        headerName: "Gender",
        field: "user.gender",
        sortable: true,
        filter: true
      }, {
        headerName: "Date of Joining",
        field: "user.date_of_joining",
        sortable: true,
        filter: true
      }, {
        headerName: "DOB",
        field: "user.dob",
        sortable: true,
        filter: true
      }, {
        headerName: "Address",
        field: "user.address",
        sortable: true,
        filter: true
      }, {
        headerName: "Blood Group",
        field: "user.blood_group",
        sortable: true,
        filter: true
      }, {
        headerName: "Address",
        field: "user.address",
        sortable: true,
        filter: true
      }];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        row_id: row.id,
        type: "edit",
        onClick: this.buttonClick,
        disabled: !row,
        primary: true,
        sm: true
      }, "Edit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        row_id: row.id,
        type: "drop",
        onClick: this.buttonClick,
        disabled: !row,
        danger: true,
        sm: true
      }, "Drop")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ag-theme-balham",
        style: {
          height: "800px",
          width: "100%"
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ag_grid_react__WEBPACK_IMPORTED_MODULE_1__["AgGridReact"], {
        onGridReady: this.onGridReady.bind(this),
        columnDefs: columnDefs,
        rowSelection: true,
        enableFilter: true,
        pagination: true,
        paginationAutoPageSize: true,
        onRowSelected: this.checkboxSelect.bind(this),
        rowData: teachers
      })));
    }
  }]);

  return ViewTeacherTable;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ })

}]);
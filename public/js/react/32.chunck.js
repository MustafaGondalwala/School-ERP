(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./resources/js/component/question/form/AddQuestionForm.jsx":
/*!******************************************************************!*\
  !*** ./resources/js/component/question/form/AddQuestionForm.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/CardComponent */ "./resources/js/component/utils/CardComponent.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_questionpaper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/questionpaper */ "./resources/js/component/actions/questionpaper.js");
/* harmony import */ var _utils_Components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Components */ "./resources/js/component/utils/Components.jsx");
/* harmony import */ var _utils_Row__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Row */ "./resources/js/component/utils/Row.jsx");
/* harmony import */ var _utils_Col__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/Col */ "./resources/js/component/utils/Col.jsx");
/* harmony import */ var _utils_InlineError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/InlineError */ "./resources/js/component/utils/InlineError.jsx");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../api */ "./resources/js/component/api/index.jsx");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_9__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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






var CkEditor = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../../utils/CkEditor */ "./resources/js/component/utils/CkEditor.jsx"));
});






var AddQuestionForm = /*#__PURE__*/function (_Component) {
  _inherits(AddQuestionForm, _Component);

  var _super = _createSuper(AddQuestionForm);

  function AddQuestionForm(props) {
    var _this;

    _classCallCheck(this, AddQuestionForm);

    _this = _super.call(this, props);
    _this.state = {
      question_type: "1"
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddQuestionForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          questionpaper = _this$props.questionpaper,
          question_id = _this$props.question_id;
      var question = questionpaper.filter(function (item) {
        return item.id == question_id;
      })[0];
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "render",
    value: function render() {
      var question_type = this.state.question_type;
      var _this$props2 = this.props,
          question_id = _this$props2.question_id,
          setQuestionPaper = _this$props2.setQuestionPaper;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_CardComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Add Question"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "question_type",
        checked: question_type == "1",
        value: "1",
        onChange: this.onChange,
        type: "radio"
      }), "Mutiple Choice Question"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "question_type",
        checked: question_type == "2",
        value: "2",
        onChange: this.onChange,
        type: "radio"
      }), "True or False"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "question_type",
        checked: question_type == "3",
        value: "3",
        onChange: this.onChange,
        type: "radio"
      }), "Fill in blanks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "question_type",
        checked: question_type == "4",
        value: "4",
        onChange: this.onChange,
        type: "radio"
      }), "Short Question"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "question_type",
        checked: question_type == "5",
        value: "5",
        onChange: this.onChange,
        type: "radio"
      }), "Long Question")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), question_type == 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QuestionMCB, {
        setQuestionPaper: setQuestionPaper,
        question_id: question_id
      }), question_type == 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QuestionTrueorFalse, {
        setQuestionPaper: setQuestionPaper,
        question_id: question_id
      }), question_type == 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QuestionFillinBlanks, {
        setQuestionPaper: setQuestionPaper,
        question_id: question_id
      }), question_type == 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QuestionShortLongQuestion, {
        setQuestionPaper: setQuestionPaper,
        question_id: question_id,
        question_type: question_type
      }), question_type == 5 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QuestionShortLongQuestion, {
        setQuestionPaper: setQuestionPaper,
        question_id: question_id,
        question_type: question_type
      }));
    }
  }]);

  return AddQuestionForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var QuestionShortLongQuestion = /*#__PURE__*/function (_Component2) {
  _inherits(QuestionShortLongQuestion, _Component2);

  var _super2 = _createSuper(QuestionShortLongQuestion);

  function QuestionShortLongQuestion(props) {
    var _this2;

    _classCallCheck(this, QuestionShortLongQuestion);

    _this2 = _super2.call(this, props);
    _this2.intialData = {
      question: "",
      marks: ""
    };
    _this2.state = {
      data: _this2.intialData,
      errors: {}
    };
    _this2.submit = _this2.submit.bind(_assertThisInitialized(_this2));
    _this2.onChange = _this2.onChange.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(QuestionShortLongQuestion, [{
    key: "onChange",
    value: function onChange(e) {
      var _e$target2 = e.target,
          name = _e$target2.name,
          value = _e$target2.value;
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, name, value))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.question) errors.question = "Can't be blank";
      return errors;
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this3 = this;

      var data = this.state.data;
      var errors = this.validate(data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length == 0) {
        var _this$props3 = this.props,
            question_id = _this$props3.question_id,
            question_type = _this$props3.question_type;
        _api__WEBPACK_IMPORTED_MODULE_8__["default"].adminteacher.questionbank.question.add(data, question_id, question_type).then(function (data) {
          var setQuestionPaper = _this3.props.setQuestionPaper;
          var questionpaper = data.questionpaper;
          setQuestionPaper(questionpaper);

          _this3.setState({
            data: _this3.intialData
          });

          sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Success", "Question Added!!", "success");
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          data = _this$state.data,
          errors = _this$state.errors;
      var question_type = this.props.question_type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Question"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Loading Component")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CkEditor, {
        value: data.question,
        onChange: function onChange(question) {
          _this4.setState({
            data: _objectSpread(_objectSpread({}, _this4.state.data), {}, _defineProperty({}, "question", question))
          });
        }
      })), errors.question && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_7__["default"], {
        text: errors.question
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Total Marks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        name: "marks",
        value: data.marks,
        onChange: this.onChange,
        placeholder: "Marks"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        primary: true,
        sm: true,
        onClick: this.submit
      }, "Add ", question_type == 4 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Short Questions") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Longs Questions"))));
    }
  }]);

  return QuestionShortLongQuestion;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var QuestionFillinBlanks = /*#__PURE__*/function (_Component3) {
  _inherits(QuestionFillinBlanks, _Component3);

  var _super3 = _createSuper(QuestionFillinBlanks);

  function QuestionFillinBlanks(props) {
    var _this5;

    _classCallCheck(this, QuestionFillinBlanks);

    _this5 = _super3.call(this, props);
    _this5.intialData = {
      question: "",
      correct: "",
      marks: ""
    };
    _this5.state = {
      data: _this5.intialData,
      errors: {}
    };
    _this5.submit = _this5.submit.bind(_assertThisInitialized(_this5));
    _this5.onChange = _this5.onChange.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(QuestionFillinBlanks, [{
    key: "onChange",
    value: function onChange(e) {
      var _e$target3 = e.target,
          name = _e$target3.name,
          value = _e$target3.value;
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, name, value))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.question) errors.question = "Can't be blank";
      if (!data.correct) errors.correct = "Can't be blank";
      return errors;
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this6 = this;

      var data = this.state.data;
      var errors = this.validate(data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length == 0) {
        var question_id = this.props.question_id;
        _api__WEBPACK_IMPORTED_MODULE_8__["default"].adminteacher.questionbank.question.add(data, question_id, 3).then(function (data) {
          var setQuestionPaper = _this6.props.setQuestionPaper;
          var questionpaper = data.questionpaper;
          setQuestionPaper(questionpaper);

          _this6.setState({
            data: _this6.intialData
          });

          sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Success", "Question Added!!", "success");
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$state2 = this.state,
          data = _this$state2.data,
          errors = _this$state2.errors;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Question"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Loading Component")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CkEditor, {
        value: data.question,
        onChange: function onChange(question) {
          _this7.setState({
            data: _objectSpread(_objectSpread({}, _this7.state.data), {}, _defineProperty({}, "question", question))
          });
        }
      })), errors.question && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_7__["default"], {
        text: errors.question
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Correct One:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        value: data.correct,
        name: "correct",
        onChange: this.onChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, errors.correct && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_7__["default"], {
        text: errors.correct
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Total Marks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        name: "marks",
        value: data.marks,
        onChange: this.onChange,
        placeholder: "Marks"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        primary: true,
        sm: true,
        onClick: this.submit
      }, "Add Fill in Blanks")));
    }
  }]);

  return QuestionFillinBlanks;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var QuestionTrueorFalse = /*#__PURE__*/function (_Component4) {
  _inherits(QuestionTrueorFalse, _Component4);

  var _super4 = _createSuper(QuestionTrueorFalse);

  function QuestionTrueorFalse(props) {
    var _this8;

    _classCallCheck(this, QuestionTrueorFalse);

    _this8 = _super4.call(this, props);
    _this8.intialData = {
      question: "",
      correct: "",
      marks: ""
    };
    _this8.state = {
      data: _this8.intialData,
      errors: {}
    };
    _this8.submit = _this8.submit.bind(_assertThisInitialized(_this8));
    _this8.onChange = _this8.onChange.bind(_assertThisInitialized(_this8));
    return _this8;
  }

  _createClass(QuestionTrueorFalse, [{
    key: "onChange",
    value: function onChange(e) {
      var _e$target4 = e.target,
          name = _e$target4.name,
          value = _e$target4.value;
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, name, value))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.question) errors.question = "Can't be blank";
      if (!data.correct) errors.correct = "Can't be blank";
      return errors;
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this9 = this;

      var data = this.state.data;
      var errors = this.validate(data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length == 0) {
        var question_id = this.props.question_id;
        _api__WEBPACK_IMPORTED_MODULE_8__["default"].adminteacher.questionbank.question.add(data, question_id, 2).then(function (data) {
          var setQuestionPaper = _this9.props.setQuestionPaper;
          var questionpaper = data.questionpaper;
          setQuestionPaper(questionpaper);

          _this9.setState({
            data: _this9.intialData
          });

          sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Success", "Question Added!!", "success");
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      var _this$state3 = this.state,
          data = _this$state3.data,
          errors = _this$state3.errors;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Question"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Loading Component")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CkEditor, {
        value: data.question,
        onChange: function onChange(question) {
          _this10.setState({
            data: _objectSpread(_objectSpread({}, _this10.state.data), {}, _defineProperty({}, "question", question))
          });
        }
      })), errors.question && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_7__["default"], {
        text: errors.question
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Correct One:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "1.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "correct",
        checked: data.correct == "1",
        value: "1",
        onChange: this.onChange,
        type: "radio"
      }), " ", "True"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "2.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "correct",
        checked: data.correct == "2",
        value: "2",
        onChange: this.onChange,
        type: "radio"
      }), " ", "False")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, errors.correct && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_7__["default"], {
        text: errors.correct
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 8,
        sm: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Total Marks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        name: "marks",
        value: data.marks,
        onChange: this.onChange,
        placeholder: "Marks"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        primary: true,
        sm: true,
        onClick: this.submit
      }, "Add True or False")));
    }
  }]);

  return QuestionTrueorFalse;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var QuestionMCB = /*#__PURE__*/function (_Component5) {
  _inherits(QuestionMCB, _Component5);

  var _super5 = _createSuper(QuestionMCB);

  function QuestionMCB(props) {
    var _this11;

    _classCallCheck(this, QuestionMCB);

    _this11 = _super5.call(this, props);
    _this11.intialData = {
      question: "",
      question_1: "",
      question_2: "",
      question_3: "",
      question_4: "",
      correct: "",
      marks: ""
    };
    _this11.state = {
      data: _this11.intialData,
      errors: {}
    };
    _this11.submit = _this11.submit.bind(_assertThisInitialized(_this11));
    _this11.onChange = _this11.onChange.bind(_assertThisInitialized(_this11));
    return _this11;
  }

  _createClass(QuestionMCB, [{
    key: "onChange",
    value: function onChange(e) {
      var _e$target5 = e.target,
          name = _e$target5.name,
          value = _e$target5.value;
      this.setState({
        data: _objectSpread(_objectSpread({}, this.state.data), {}, _defineProperty({}, name, value))
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var errors = {};
      if (!data.question) errors.question = "Can't be blank";
      if (!data.question_1) errors.question_1 = "Can't be blank";
      if (!data.question_2) errors.question_2 = "Can't be blank";
      if (!data.question_3) errors.question_3 = "Can't be blank";
      if (!data.question_4) errors.question_4 = "Can't be blank";
      if (!data.correct) errors.correct = "Can't be blank";
      return errors;
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this12 = this;

      var data = this.state.data;
      var errors = this.validate(data);
      this.setState({
        errors: errors
      });

      if (Object.keys(errors).length == 0) {
        var question_id = this.props.question_id;
        _api__WEBPACK_IMPORTED_MODULE_8__["default"].adminteacher.questionbank.question.add(data, question_id, 1).then(function (data) {
          var setQuestionPaper = _this12.props.setQuestionPaper;
          var questionpaper = data.questionpaper;
          setQuestionPaper(questionpaper);

          _this12.setState({
            data: _this12.intialData
          });

          sweetalert2__WEBPACK_IMPORTED_MODULE_9___default.a.fire("Success", "Question Added!!", "success");
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      var _this$state4 = this.state,
          data = _this$state4.data,
          errors = _this$state4.errors;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 6,
        sm: 6
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Question"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
        fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Loading Component")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CkEditor, {
        value: data.question,
        onChange: function onChange(question) {
          _this13.setState({
            data: _objectSpread(_objectSpread({}, _this13.state.data), {}, _defineProperty({}, "question", question))
          });
        }
      })), errors.question && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_InlineError__WEBPACK_IMPORTED_MODULE_7__["default"], {
        text: errors.question
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "1.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        value: data.question_1,
        onChange: this.onChange,
        name: "question_1"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "3.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        value: data.question_3,
        onChange: this.onChange,
        name: "question_3"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "2.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        value: data.question_2,
        onChange: this.onChange,
        name: "question_2"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "4.", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        value: data.question_4,
        onChange: this.onChange,
        name: "question_4"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 6,
        sm: 6
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Correct One"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Select"], {
        errors: errors,
        name: "correct",
        value: data.correct,
        onChange: this.onChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["SelectOption"], null, " -- Select -- "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["SelectOption"], {
        value: "1"
      }, "1"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["SelectOption"], {
        value: "2"
      }, "2"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["SelectOption"], {
        value: "3"
      }, "3"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["SelectOption"], {
        value: "4"
      }, "4")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Col__WEBPACK_IMPORTED_MODULE_6__["default"], {
        md: 6,
        sm: 6
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormLabel"], null, "Total Marks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["FormGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Input"], {
        errors: errors,
        name: "marks",
        value: data.marks,
        onChange: this.onChange,
        placeholder: "Marks"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Row__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_utils_Components__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        primary: true,
        sm: true,
        onClick: this.submit
      }, "Add MCB")));
    }
  }]);

  return QuestionMCB;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function mapStateToProps(state) {
  return {
    questionpaper: state.questionpaper
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, {
  setQuestionPaperDispatch: _actions_questionpaper__WEBPACK_IMPORTED_MODULE_3__["setQuestionPaperDispatch"],
  setQuestionPaper: _actions_questionpaper__WEBPACK_IMPORTED_MODULE_3__["setQuestionPaper"]
})(AddQuestionForm));

/***/ })

}]);
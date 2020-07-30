import React, { Component, Suspense } from "react";
import CardComponent from "../../utils/CardComponent";
import { connect } from "react-redux";
import {
  setQuestionPaperDispatch,
  setQuestionPaper,
} from "../../actions/questionpaper";
import {
  Table,
  FormLabel,
  FormGroup,
  Input,
  SelectOption,
  Select,
  Button,
} from "../../utils/Components";

const CkEditor = React.lazy(() => import("../../utils/CkEditor"));
import Row from "../../utils/Row";
import Col from "../../utils/Col";
import InlineError from "../../utils/InlineError";
import api from "../../api";
import Swal from "sweetalert2";

class AddQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question_type: "1",
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const { questionpaper, question_id } = this.props;
    const question = questionpaper.filter((item) => item.id == question_id)[0];
  }
  onChange(e) {
    const { name, value } = e.target;
    this.setState({
        [name]: value,
      });
  }
  render() {
    const { question_type } = this.state;
    const { question_id, setQuestionPaper } = this.props;
    return (
      <CardComponent title="Add Question">
        <Table>
          <tbody>
            <tr>
              <td>
                <input
                  name="question_type"
                  checked={question_type == "1"}
                  value="1"
                  onChange={this.onChange}
                  
                  type="radio"
                />
                Mutiple Choice Question
              </td>
              <td>
                <input
                  name="question_type"
                  checked={question_type == "2"}
                  value="2"
                  onChange={this.onChange}
                  
                  type="radio"
                />
                True or False
              </td>
              <td>
                <input
                  name="question_type"
                  checked={question_type == "3"}
                  value="3"
                  onChange={this.onChange}
                  
                  type="radio"
                />
                Fill in blanks
              </td>
              <td>
                <input
                  name="question_type"
                  checked={question_type == "4"}
                  value="4"
                  onChange={this.onChange}
                  
                  type="radio"
                />
                Short Question
              </td>
              <td>
                <input
                  name="question_type"
                  checked={question_type == "5"}
                  value="5"
                  onChange={this.onChange}
                  
                  type="radio"
                />
                Long Question
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
        {question_type == 1 && (
          <QuestionMCB
            setQuestionPaper={setQuestionPaper}
            question_id={question_id}
          />
        )}
        {question_type == 2 && (
          <QuestionTrueorFalse
            setQuestionPaper={setQuestionPaper}
            question_id={question_id}
          />
        )}
        {question_type == 3 && (
          <QuestionFillinBlanks
            setQuestionPaper={setQuestionPaper}
            question_id={question_id}
          />
        )}
        {question_type == 4 && (
          <QuestionShortLongQuestion
            setQuestionPaper={setQuestionPaper}
            question_id={question_id}
            question_type={question_type}
          />
        )}
        {question_type == 5 && (
          <QuestionShortLongQuestion
            setQuestionPaper={setQuestionPaper}
            question_id={question_id}
            question_type={question_type}
          />
        )}
      </CardComponent>
    );
  }
}

class QuestionShortLongQuestion extends Component {
  constructor(props) {
    super(props);
    this.intialData = {
      question: "",
      marks: "",
    };
    this.state = {
      data: this.intialData,
      errors: {},
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }

  validate(data) {
    const errors = {};
    if (!data.question) errors.question = "Can't be blank";
    return errors;
  }

  submit() {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      const { question_id,question_type } = this.props;
      api.adminteacher.questionbank.question
        .add(data, question_id, question_type)
        .then((data) => {
          const { setQuestionPaper } = this.props;
          const { questionpaper } = data;
          setQuestionPaper(questionpaper);
          this.setState({
            data: this.intialData,
          });
          Swal.fire("Success", "Question Added!!", "success");
        });
    }
  }
  render() {
    const { data, errors } = this.state;
    const {question_type} = this.props
    return (
      <div>
        <Row>
          <Col md={8} sm={12}>
            <FormGroup>
              <FormLabel>Question</FormLabel>
              <Suspense fallback={<h3>Loading Component</h3>}>
                <CkEditor
                  value={data.question}
                  onChange={(question) => {
                    this.setState({
                      data: { ...this.state.data, ["question"]: question },
                    });
                  }}
                />
              </Suspense>
              {errors.question && <InlineError text={errors.question} />}
            </FormGroup>
          </Col>
        <Col md={8} sm={12}>
            <FormGroup>
              <FormLabel>Total Marks</FormLabel>
              <Input
                errors={errors}
                name="marks"
                value={data.marks}
                onChange={this.onChange}
                placeholder="Marks"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Button primary sm onClick={this.submit}>
            Add {question_type == 4 ?  <span>{"Short Questions"}</span> : <span>{"Longs Questions"}</span> }
          </Button>
        </Row>
      </div>
    );
  }
}

class QuestionFillinBlanks extends Component {
  constructor(props) {
    super(props);
    this.intialData = {
      question: "",
      correct: "",
      marks: "",
    };
    this.state = {
      data: this.intialData,
      errors: {},
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  validate(data) {
    const errors = {};
    if (!data.question) errors.question = "Can't be blank";
    if (!data.correct) errors.correct = "Can't be blank";
    return errors;
  }

  submit() {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      const { question_id } = this.props;
      api.adminteacher.questionbank.question
        .add(data, question_id, 3)
        .then((data) => {
          const { setQuestionPaper } = this.props;
          const { questionpaper } = data;
          setQuestionPaper(questionpaper);
          this.setState({
            data: this.intialData,
          });
          Swal.fire("Success", "Question Added!!", "success");
        });
    }
  }
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <Row>
          <Col md={8} sm={12}>
            <FormGroup>
              <FormLabel>Question</FormLabel>
              <Suspense fallback={<h3>Loading Component</h3>}>
                <CkEditor
                  value={data.question}
                  onChange={(question) => {
                    this.setState({
                      data: { ...this.state.data, ["question"]: question },
                    });
                  }}
                />
              </Suspense>
              {errors.question && <InlineError text={errors.question} />}
            </FormGroup>
          </Col>
          <Col md={8} sm={12}>
            <Table>
              <tbody>
                <tr>
                  <th>Correct One:</th>
                </tr>
                <tr>
                  <td>
                    <Input value={data.correct} name="correct" onChange={this.onChange}/>
                  </td>
                </tr>
                <tr>
                  <td>
                      {errors.correct && <InlineError text={errors.correct}/>}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={8} sm={12}>
            <FormGroup>
              <FormLabel>Total Marks</FormLabel>
              <Input
                errors={errors}
                name="marks"
                value={data.marks}
                onChange={this.onChange}
                placeholder="Marks"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Button primary sm onClick={this.submit}>
            Add Fill in Blanks
          </Button>
        </Row>
      </div>
    );
  }
}

class QuestionTrueorFalse extends Component {
  constructor(props) {
    super(props);
    this.intialData = {
      question: "",
      correct: "",
      marks: "",
    };
    this.state = {
      data: this.intialData,
      errors: {},
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  validate(data) {
    const errors = {};
    if (!data.question) errors.question = "Can't be blank";
    if (!data.correct) errors.correct = "Can't be blank";
    return errors;
  }

  submit() {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      const { question_id } = this.props;
      api.adminteacher.questionbank.question
        .add(data, question_id, 2)
        .then((data) => {
          const { setQuestionPaper } = this.props;
          const { questionpaper } = data;
          setQuestionPaper(questionpaper);
          this.setState({
            data: this.intialData,
          });
          Swal.fire("Success", "Question Added!!", "success");
        });
    }
  }
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <Row>
          <Col md={8} sm={12}>
            <FormGroup>
              <FormLabel>Question</FormLabel>
              <Suspense fallback={<h3>Loading Component</h3>}>
                <CkEditor
                  value={data.question}
                  onChange={(question) => {
                    this.setState({
                      data: { ...this.state.data, ["question"]: question },
                    });
                  }}
                />
              </Suspense>
              {errors.question && <InlineError text={errors.question} />}
            </FormGroup>
          </Col>
          <Col md={8} sm={12}>
            <Table>
              <tbody>
                <tr>
                  <th>Correct One:</th>
                </tr>
                <tr>
                  <td>
                    1.{" "}
                    <input
                      name="correct"
                      checked={data.correct == "1"}
                      value="1"
                      onChange={this.onChange}
                      
                      type="radio"
                    />{" "}
                    True
                  </td>
                  <td>
                    2.{" "}
                    <input
                      name="correct"
                      checked={data.correct == "2"}
                      value="2"
                      onChange={this.onChange}
                      
                      type="radio"
                    />{" "}
                    False
                  </td>
                </tr>
                <tr>
                  <td>
                      {errors.correct && <InlineError text={errors.correct}/>}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={8} sm={12}>
            <FormGroup>
              <FormLabel>Total Marks</FormLabel>
              <Input
                errors={errors}
                name="marks"
                value={data.marks}
                onChange={this.onChange}
                placeholder="Marks"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Button primary sm onClick={this.submit}>
            Add True or False
          </Button>
        </Row>
      </div>
    );
  }
}

class QuestionMCB extends Component {
  constructor(props) {
    super(props);
    this.intialData = {
      question: "",
      question_1: "",
      question_2: "",
      question_3: "",
      question_4: "",
      correct: "",
      marks: "",
    };
    this.state = {
      data: this.intialData,
      errors: {},
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  validate(data) {
    const errors = {};
    if (!data.question) errors.question = "Can't be blank";
    if (!data.question_1) errors.question_1 = "Can't be blank";
    if (!data.question_2) errors.question_2 = "Can't be blank";
    if (!data.question_3) errors.question_3 = "Can't be blank";
    if (!data.question_4) errors.question_4 = "Can't be blank";
    if (!data.correct) errors.correct = "Can't be blank";
    return errors;
  }

  submit() {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      const { question_id } = this.props;
      api.adminteacher.questionbank.question
        .add(data, question_id, 1)
        .then((data) => {
          const { setQuestionPaper } = this.props;
          const { questionpaper } = data;
          setQuestionPaper(questionpaper);
          this.setState({
            data: this.intialData,
          });
          Swal.fire("Success", "Question Added!!", "success");
        });
    }
  }
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <Row>
          <Col md={6} sm={6}>
            <FormGroup>
              <FormLabel>Question</FormLabel>

              <Suspense fallback={<h3>Loading Component</h3>}>
                <CkEditor
                  value={data.question}
                  onChange={(question) => {
                    this.setState({
                      data: { ...this.state.data, ["question"]: question },
                    });
                  }}
                />
              </Suspense>
              {errors.question && <InlineError text={errors.question} />}
            </FormGroup>
          </Col>
          <Table>
            <tbody>
              <tr>
                <td>
                  1.{" "}
                  <Input
                    errors={errors}
                    value={data.question_1}
                    onChange={this.onChange}
                    name="question_1"
                  />
                </td>
                <td>
                  3.{" "}
                  <Input
                    errors={errors}
                    value={data.question_3}
                    onChange={this.onChange}
                    name="question_3"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  2.{" "}
                  <Input
                    errors={errors}
                    value={data.question_2}
                    onChange={this.onChange}
                    name="question_2"
                  />
                </td>
                <td>
                  4.{" "}
                  <Input
                    errors={errors}
                    value={data.question_4}
                    onChange={this.onChange}
                    name="question_4"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col md={6} sm={6}>
            <FormGroup>
              <FormLabel>Correct One</FormLabel>
              <Select
                errors={errors}
                name="correct"
                value={data.correct}
                onChange={this.onChange}
              >
                <SelectOption> -- Select -- </SelectOption>
                <SelectOption value="1">1</SelectOption>
                <SelectOption value="2">2</SelectOption>
                <SelectOption value="3">3</SelectOption>
                <SelectOption value="4">4</SelectOption>
              </Select>
            </FormGroup>
          </Col>
          <Col md={6} sm={6}>
            <FormGroup>
              <FormLabel>Total Marks</FormLabel>
              <FormGroup>
                <Input
                  errors={errors}
                  name="marks"
                  value={data.marks}
                  onChange={this.onChange}
                  placeholder="Marks"
                />
              </FormGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Button primary sm onClick={this.submit}>
            Add MCB
          </Button>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questionpaper: state.questionpaper,
  };
}

export default connect(mapStateToProps, {
  setQuestionPaperDispatch,
  setQuestionPaper,
})(AddQuestionForm);

import React, { Component, Suspense } from "react";
import EmptyHeader from "../../utils/EmptyHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import { connect } from "react-redux";
import GetClassId from "../../utils/GetClassId";
import { getMonthlyTestDispatch, setMonthlyTest } from "../../actions/exam";
import Row from "../../utils/Row";
import {
  Col,
  FormGroup,
  FormLabel,
  Select,
  SelectOption,
  Button,
  Input,
} from "../../utils/Components";
import api from "../../api";

const ViewStudentDetailsMonthlyTest = React.lazy(() => import("../form/ViewStudentDetailsMonthlyTest"))

class AdminMonthlyTestFillMarksheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        class_id: "1",
        monthly_test: "1",
      },
      studentDetails: "",
      button_text: "Fetch Students",
      errors: {},
    };
    
    this.setStateData = this.setStateData.bind(this);
    this.sendClassId = this.sendClassId.bind(this);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    const { getMonthlyTestDispatch, monthlyTest } = this.props;
    if (Object.keys(monthlyTest).length == 0) getMonthlyTestDispatch();
    this.submit();
  }
  validate(data) {
    const errors = {};
    if (!data.class_id) errors.class_id = "Can't be blank";
    if (!data.monthly_test) errors.monthly_test = "Can't be blank";
    return errors;
  }
  async setStateData(name, value) {
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  sendClassId(class_id) {
    this.setStateData("class_id", class_id);
  }
  onChange(e) {
    this.setStateData(e.target.name, e.target.value);
  }

  submit() {
    const errors = this.validate(this.state.data);
    const { data } = this.state;
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      this.setState({
        button_text: "Fetching Students ...",
        studentDetails:""
      });
      api.adminteacher.exam.monthly_test.get_students(data).then(data => {
        const {studentDetails} = data
        this.setState({
          studentDetails,
          button_text: "Fetch Student",
        })
      })
    }
  }
  render() {
    const { data, errors, button_text, studentDetails } = this.state;
    const { monthlyTest } = this.props;
    return (
      <div>
        <EmptyHeader
          mainHeader="Exam"
          header="Monthly Test"
          sub_header="Fill Marksheet"
        />
        <BodyComponent>
          <CardComponent title="Select Class" back_link="/admin/exam">
            <GetClassId
              class_id={data.class_id}
              sendClassId={this.sendClassId}
              errors={errors}
            />
            <Row>
              <Col md={4}>
                <FormGroup>
                  <FormLabel>Monthly Test Type</FormLabel>
                  <Select
                    errors={errors}
                    value={data.monthly_test}
                    onChange={this.onChange}
                    name="monthly_test"
                  >
                    <SelectOption value=""> -- Select -- </SelectOption>
                    {Object.keys(monthlyTest).length > 0 &&
                      monthlyTest.map((item, id) => {
                        return (
                          <SelectOption value={item.id}>
                            {item.monthly_test}
                          </SelectOption>
                        );
                      })}
                  </Select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button onClick={this.submit} primary sm>
                  {button_text}
                </Button>
              </Col>
            </Row>
            <br />
          </CardComponent>
        
          {studentDetails && 
          <Suspense fallback={<h3>Loading ...</h3>}>
            <ViewStudentDetailsMonthlyTest submit={this.getFillAction} exam_type={data.exam_type} studentDetails={studentDetails}/>
          </Suspense>
          }
        </BodyComponent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    monthlyTest: state.monthlyTest,
  };
}

export default connect(mapStateToProps, { getMonthlyTestDispatch })(
  AdminMonthlyTestFillMarksheet
);

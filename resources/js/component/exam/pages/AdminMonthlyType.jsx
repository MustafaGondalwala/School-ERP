import React, { Component } from "react";
import EmptyHeader from "../../utils/EmptyHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import Row from "../../utils/Row";
import {
  Col,
  FormGroup,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
} from "../../utils/Components";
import api from "../../api";
import InlineError from "../../authentication/form/InlineError";
import Swal from "sweetalert2";

import { connect } from "react-redux";
import { getMonthlyTestDispatch, setMonthlyTest } from "../../actions/exam";

class AdminMonthlyType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly_test: "",
      monthlyTest:"",
      error: "",
      button_text: "Add Monthly Type",
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.removeMonthlyTest = this.removeMonthlyTest.bind(this)
  }
  componentWillMount() {
    const {class_id} = this.props.match.params
    api.adminteacher.exam.monthly_test.get_monthly_test(class_id).then(data => {
      const {monthlyTest} = data
      this.setState({
        monthlyTest
      })
    })
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  submit() {
    const { monthly_test } = this.state;
    const {class_id} = this.props.match.params
    if (monthly_test == "")
      this.setState({
        error: "Cannot be Blank",
      });
    else {
      this.setState({
        button_text: "Adding ...",
      });
      api.adminteacher.exam.monthly_test
        .add(monthly_test,class_id)
        .then((data) => {
          const { message,monthlyTest } = data;
          this.setState({
            button_text: "Add Monthly Type",
            monthly_test: "",
            monthlyTest,
            error: "",
          });
          Swal.fire("Success", message, "success");

          
        })
        .catch((error) => {
          if (error.response.status == 422) {
            const message = error.response.data.error.message;
            Swal.fire("Validation Error", message, "warning");
          } else {
            Swal.fire("Error Occured", "Error Occured in Process", "error");
          }
          this.setState({
            button_text: "Add Monthly Type",
          });
        });
    }
  }

  removeMonthlyTest(monthly_test_id){
    const {class_id} = this.props.match.params
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          api.adminteacher.exam.monthly_test.remove(monthly_test_id,class_id).then(data => {
            const {message,monthlyTest} = data
            Swal.fire(
                'Deleted!',
                message,
                'success'
              )
              this.setState({
                monthlyTest
              })
          }).catch(error => {
              console.log(error)
              Swal.fire("Error","Error Occured in Proccess","error");
          });
        }
      })
}
  render() {
    const { monthly_test, error, button_text } = this.state;
    const { monthlyTest } = this.state;
    const {class_id} = this.props.match.params
    return (
      <div>
        <EmptyHeader mainHeader="Exam" header="Monthly Test" />
        <BodyComponent>
          <CardComponent title={"Monthly Test"} back_link={"/teacher/exam/class/"+class_id}>
            <Row>
              <Col md={6} sm={6}>
                <FormGroup>
                  <FormLabel>Add Monthly Test</FormLabel>
                  <Input
                    onChange={this.onChange}
                    name="monthly_test"
                    value={monthly_test}
                    placeholder="Monthly Test"
                  />
                  {error && <InlineError text={error} />}
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
            <Row>
              <Col md={6}>
                <Table>
                  <Thead>
                    <th>Sr.no</th>
                    <th>Monthly Test</th>
                    <th>Remove</th>
                  </Thead>
                  <tbody>
                    {Object.keys(monthlyTest).length > 0 &&
                      monthlyTest.map((item, id) => {
                        return (
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{item.monthly_test}</td>
                            <td>
                              <button
                                onClick={(e) => this.removeMonthlyTest(item.id)}
                                className="btn btn-danger btn-sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardComponent>
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

export default connect(mapStateToProps, {
  getMonthlyTestDispatch,
  setMonthlyTest,
})(AdminMonthlyType);

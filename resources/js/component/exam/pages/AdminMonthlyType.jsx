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
import MultiSelect from "react-multi-select-component";


import { setClasswiseMonthlyTestDispatch, setClasswiseMonthlyTest } from "../../actions/classwiseExam";
import { setClasswiseSubjectsDispatch, setClasswiseSubjects } from "../../actions/classwiseSubject";
import { classwiseSubject } from "../../reducers/classwiseSubject";

class AdminMonthlyType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        monthly_test:"",
        subject_ids:"",
      },
      errors: "",
      button_text: "Add Monthly Type",
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.removeMonthlyTest = this.removeMonthlyTest.bind(this)
    this.setSubjectIds = this.setSubjectIds.bind(this)
  }
  componentWillMount() {
    const {class_id} = this.props.match.params
    const {setClasswiseMonthlyTestDispatch,classwiseMonthlyTest} = this.props
    const {classwiseSubject,setClasswiseSubjectsDispatch} = this.props
    if(classwiseSubject[class_id] == undefined)
      setClasswiseSubjectsDispatch(class_id)
    if(classwiseMonthlyTest[class_id] == undefined)
      setClasswiseMonthlyTestDispatch(class_id)
    
  }
  onChange(e) {
    const {name,value} = e.target
    this.setState({
      data: {...this.state.data,[name]: value}
    })
  }
  validate(data){
      const errors = {};
      if (!data.subject_ids) errors.subject_ids = "Can't be blank";
      if (!data.monthly_test) errors.monthly_test = "Can't be blank";
      return errors;
  }
  submit() {
    const { data } = this.state;
    const errors = this.validate(data)
    const {class_id} = this.props.match.params
    const {setClasswiseMonthlyTest} = this.props
    this.setState({ errors })
    if(Object.keys(errors).length == 0){
      this.setState({
        button_text: "Adding ...",
      });
      var subject_ids = []
      data.subject_ids.map(item => {
        subject_ids.push(item.value)
      })
      data['subject_ids'] = subject_ids
      api.adminteacher.exam.monthly_test
        .add(data,class_id)
        .then((data) => {
          const { message,monthlyTest } = data;
          setClasswiseMonthlyTest(monthlyTest,class_id)
          this.setState({
            button_text: "Add Monthly Type",
            monthly_test: "",
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

  setSubjectIds(subjects){
    this.setState({
      data: {...this.state.data,['subject_ids']: subjects}
    })
  }
  removeMonthlyTest(monthly_test_id){
    const {class_id} = this.props.match.params
    const {setClasswiseMonthlyTest} = this.props
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
            setClasswiseMonthlyTest(monthlyTest,class_id)
            Swal.fire(
                'Deleted!',
                message,
                'success'
              )
              
          }).catch(error => {
              console.log(error)
              Swal.fire("Error","Error Occured in Proccess","error");
          });
        }
      })
}
  render() {
    const { data, errors, button_text } = this.state;
    const {class_id} = this.props.match.params
    const {classwiseMonthlyTest,classwiseSubject} = this.props
    var options = []
    if(classwiseSubject[class_id] !== undefined && Object.keys(classwiseSubject[class_id]).length != 0) {
      classwiseSubject[class_id].map(item => {
          options.push({"label":item.subject.subject_name,"value":item.subject.id})
        }) 
    }

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
                    errors={errors}
                    name="monthly_test"
                    value={data.monthly_test}
                    placeholder="Monthly Test"
                  />
                </FormGroup>
              </Col>
              <Col md={6} sm={6}>
                  <FormGroup>
                    <FormLabel>Subject: </FormLabel>
                    <MultiSelect
                      value={data.subject_ids}
                      options={options}
                      onChange={this.setSubjectIds}
                    />
                    {errors.subject_ids && <InlineError text={errors.subject_ids}/>}
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
                    <th>Subjects</th>
                    <th>Remove</th>
                  </Thead>
                  <tbody>
                    { classwiseMonthlyTest[class_id] != undefined &&
                      classwiseMonthlyTest[class_id].map((item, id) => {
                        return (
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{item.monthly_test}</td>
                            <td>
                              {item.subjects.map(item => {
                                return <span>{item.subject.subject_name},</span>
                              })}

                            </td>
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
    classwiseMonthlyTest: state.classwiseMonthlyTest,
    classwiseSubject:state.classwiseSubject
  };
}

export default connect(mapStateToProps, {
  setClasswiseMonthlyTestDispatch, setClasswiseMonthlyTest,
  setClasswiseSubjectsDispatch
})(AdminMonthlyType);

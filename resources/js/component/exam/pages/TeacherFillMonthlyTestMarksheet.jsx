import React,{Component} from "react"

import EmptyHeader from "../../utils/EmptyHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import { connect } from "react-redux";
import {setGradeTypeDispatch} from "../../actions/grade"
import { setClasswiseMonthlyTestDispatch, setClasswiseMonthlyTest } from "../../actions/classwiseExam";
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
import Swal from "sweetalert2"
import FillMarksheetMonthTest from "../form/FillMarksheetMonthTest"
import api from "../../api";

class TeacherFillMonthlyTestMarksheet extends Component{
    constructor(props){
        super(props)
        this.state = {
            show_monthlytest_id:""
        }
        this.showFillMarksheet = this.showFillMarksheet.bind(this)
    }
    componentWillMount() {
        const {class_id} = this.props.match.params
        const {setClasswiseMonthlyTestDispatch,classwiseMonthlyTest,setGradeTypeDispatch,gradeType} = this.props
        if(classwiseMonthlyTest[class_id] == undefined)
          setClasswiseMonthlyTestDispatch(class_id)
        if(Object.keys(gradeType).length == 0)
            setGradeTypeDispatch()
    }
    showFillMarksheet(show_monthlytest_id){
        this.setState({
            show_monthlytest_id:""
        },() => {
            this.setState({
                show_monthlytest_id
            })
        })
    }
    publish(status,monthlytest_id){
        const {class_id} = this.props.match.params
        api.adminteacher.exam.monthly_test.publish_change(status,monthlytest_id,class_id).then(data => {
            Swal.fire("Data Updated !!","MonthlyTest Updated","success");
            this.props.setClasswiseMonthlyTest(data.monthyTest,class_id)
        })
    }
    render(){
        const {class_id} = this.props.match.params
        const {show_monthlytest_id} = this.state
        const {classwiseMonthlyTest} = this.props
        return(
            <div>
                <EmptyHeader
                    mainHeader="Exam"
                    header="Monthly Test"
                    sub_header="Fill Marksheet"
                />
                <BodyComponent>
                    <CardComponent title="Monthly Test List" back_link={'/teacher/exam/class/'+class_id}>
                    <Row>
                        <Col md={12} lg={12}>
                            <Table>
                            <Thead>
                                <th>Sr.no</th>
                                <th>Monthly Test</th>
                                <th>Subjects</th>
                                <th>Fill Marksheet</th>
                                <th>Publish Marksheet</th>
                                <th>Publish At</th>
                            </Thead>
                            <tbody>
                                { classwiseMonthlyTest[class_id] != undefined &&
                                classwiseMonthlyTest[class_id].map((item, id) => {
                                    return (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{item.monthly_test}</td>
                                        <td>
                                        {item.subjects.map((item,id) => {
                                            return <span key={id}>{item.subject.subject_name},</span>
                                        })}

                                        </td>
                                        <td>
                                            <Button onClick={e => this.showFillMarksheet(item)} primary sm>Fill</Button>
                                        </td>
                                        <td>
                                            {item.publish == 0 ? <Button onClick={e => this.publish(1,item.id)} danger sm>Publish</Button> : <Button warning sm onClick={e => this.publish(0,item.id)}>Unpublish</Button>}
                                        </td>
                                        <td>
                                        {item.publish == 1 && item.publish_at}
                                        </td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                            </Table>
                        </Col>
                        </Row>
                    </CardComponent>
                {show_monthlytest_id && <FillMarksheetMonthTest class_id={class_id}  monthly_test={show_monthlytest_id}/> }
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      classwiseMonthlyTest: state.classwiseMonthlyTest,
      gradeType:state.gradeType
    };
  }
  
  export default connect(mapStateToProps, {
    setGradeTypeDispatch,
    setClasswiseMonthlyTestDispatch, setClasswiseMonthlyTest,
  })(TeacherFillMonthlyTestMarksheet);
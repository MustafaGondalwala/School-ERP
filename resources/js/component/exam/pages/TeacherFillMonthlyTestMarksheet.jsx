import React,{Component} from "react"

import EmptyHeader from "../../utils/EmptyHeader";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import { connect } from "react-redux";
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

import FillMarksheetMonthTest from "../form/FillMarksheetMonthTest"
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
        const {setClasswiseMonthlyTestDispatch,classwiseMonthlyTest} = this.props
        if(classwiseMonthlyTest[class_id] == undefined)
          setClasswiseMonthlyTestDispatch(class_id)
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
                    <CardComponent title="Monthly Test List">
                    <Row>
                        <Col md={6}>
                            <Table>
                            <Thead>
                                <th>Sr.no</th>
                                <th>Monthly Test</th>
                                <th>Subjects</th>
                                <th>Fill Marksheet</th>
                                <th>Publish Marksheet</th>
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
                                            <Button onClick={e => this.showFillMarksheet(item.id)} primary sm>Fill</Button>
                                        </td>
                                        <td>
                                            <Button danger sm>Publish</Button>
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
    };
  }
  
  export default connect(mapStateToProps, {
    setClasswiseMonthlyTestDispatch, setClasswiseMonthlyTest,
  })(TeacherFillMonthlyTestMarksheet);
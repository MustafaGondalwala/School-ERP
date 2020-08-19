import React, { Component, PureComponent } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { connect } from "react-redux";
import {setGradeTypeDispatch} from "../../actions/grade"
import {ReactChartCard} from "../../utils/Chart"
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
    getGrade,
  } from "../../utils/Components";
import api from "../../api";

class TeacherClassMonthlyTestReport extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:""
        }
    }
    async componentWillMount() {
        const {class_id} = this.props.match.params
        const {setClasswiseMonthlyTestDispatch,classwiseMonthlyTest,gradeType,setGradeTypeDispatch} = this.props
        if(Object.keys(gradeType).length == 0)
            setGradeTypeDispatch()
        if(classwiseMonthlyTest[class_id] == undefined)
          setClasswiseMonthlyTestDispatch(class_id)
    }
    getMonthlyTestReport(monthlytest_id){
        const {class_id} = this.props.match.params
        const {gradeType} = this.props
        api.adminteacher.exam.monthly_test.classwiseReport(class_id,monthlytest_id).then(data => {
            this.setState({
                data:data
            })
        
        })
    }
    render(){
        const {classwiseMonthlyTest,gradeType} = this.props
        const {data} = this.state
        const {class_id} = this.props.match.params
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="Monthly Test" sub_header="Classwise Report"/>
                <BodyComponent>
                    <CardComponent title="Select Monthly Test">
                        <Row>
                        { classwiseMonthlyTest[class_id] != undefined ?
                            <Col md={12} lg={12}>
                                <Table>
                                <Thead>
                                    <th>Sr.no</th>
                                    <th>Monthly Test</th>
                                    <th>Subjects</th>
                                    <th>View Report</th>
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
                                            <td><Button primary sm onClick={e => this.getMonthlyTestReport(item.id)}>View Report</Button></td>
                                        </tr>
                                        );
                                    })}
                                </tbody>
                                </Table>
                                </Col>
                        : 
                            <h1>Loading Monthly Test ...</h1>
                        }
                        </Row>
                    </CardComponent>
                    {data && <ViewReportClasswise gradeType={gradeType} data={data}/>}
                </BodyComponent>
            </div>
        )
    }
}

class ViewReportClasswise extends PureComponent{
    componentDidMount(){
        const {data,gradeType} = this.props
        console.log(data)
    }
    render(){
        const {data,gradeType} = this.props
        const {class_marks,class_sum_total_marks,count_monthlyTest,total_marks,max_marks} = data;
        const total_grade = []
        const final_total_grade = [];
        var grade;
        total_marks.map(item => {
            grade = getGrade(gradeType,item,max_marks)
            if(total_grade[grade] == undefined)
                total_grade[grade] = 0;
                total_grade[grade] = total_grade[grade]+item
            })
        Object.keys(total_grade).map(item => {
            final_total_grade.push({y:total_grade[item],'label':item})
        })
        return(
            <CardComponent title="View Report">
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <FormLabel>Monthly Test Max Marks</FormLabel>
                            <Input value={max_marks} readonly={true} />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <FormLabel>Class Total Marks</FormLabel>
                            <Input value={class_marks} readonly={true} />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <FormLabel>Total Students</FormLabel>
                            <Input value={count_monthlyTest} readonly={true} />
                        </FormGroup>
                    </Col>
                </Row>

                <ReactChartCard file_name="ViewClassReport" title="Class Report" dataPoints={final_total_grade}/>
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
      classwiseMonthlyTest: state.classwiseMonthlyTest,
      gradeType:state.gradeType
    };
  }
  
  export default connect(mapStateToProps, {setGradeTypeDispatch,
    setClasswiseMonthlyTestDispatch, setClasswiseMonthlyTest,
  })(TeacherClassMonthlyTestReport);
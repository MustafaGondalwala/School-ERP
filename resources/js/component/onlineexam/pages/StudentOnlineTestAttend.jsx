import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/CardComponent"
import api from "../../api"
import Swal from "sweetalert2"
import { Col, FormLabel, Input } from "../../utils/Components"
import AttendOnline from "../../question/pages/AttendOnline"

class StudentOnlineTestAttend extends Component{
    constructor(props){
        super(props)
        this.state = {
            teacher:"",
            onlinetestDetails:"",
            questionpaper:"",
            isLoading:true,
        }
        this.submitAnswer = this.submitAnswer.bind(this)
    }
    componentDidMount(){
        const {onlinetest_id} = this.props.match.params
        api.parentstudent.exam.monthtest.getOnlineTestDetails(onlinetest_id)
        .then(data => {
            const {onlinetestDetails} = data
            const {teacher,questionpaper} = onlinetestDetails
            this.setState({
                teacher,questionpaper,onlinetestDetails,isLoading:false
            })
        })
        // .catch(error => {
        //     const {data,status} = error.response
        //     if(status == 400){
        //         Swal.fire("Warning",data.error.message,"warning");
        //         this.props.history.push("/dashboard/student")
        //     }
        // })
    }
    submitAnswer(answers){
        const {onlinetestDetails} = this.state
        return api.parentstudent.exam.monthtest.submitAnswers(answers,onlinetestDetails.id).then(data => {
            const {message} = data

            return true
        })
    }
    render(){
        const {isLoading,onlinetestDetails,questionpaper} = this.state
        {onlinetestDetails && console.log(onlinetestDetails.monthy_test_type.monthly_test)}
        return(
            <div>
                <EmptyHeader mainHeader="OnlinExam" header="Attend" sub_header="Test"/>
                <BodyComponent>
                    {isLoading ? <CardComponent title="Loading ...">
                        <h1>Data Verifing ...</h1>
                    </CardComponent>
                    :
                        <span>
                        <CardComponent title="Online Test Details">
                                <Col md={4} sm={12} lg={4}>
                                    <FormLabel>MonthTest</FormLabel>
                                    <Input disabled value={onlinetestDetails.monthy_test_type.monthly_test}/>
                                </Col>
                        </CardComponent>
                        <AttendOnline redirect={this.props.history.push} submitAnswer={this.submitAnswer} questionpaper={questionpaper}/>
                        </span>
                    }

                </BodyComponent>
            </div>
        )
    }
}

export default StudentOnlineTestAttend
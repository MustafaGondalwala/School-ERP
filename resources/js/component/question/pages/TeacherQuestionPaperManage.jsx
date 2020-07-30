import React, { Component,Suspense } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import QuestionPaperHeader from "../../header/teacher/QuestionPaperHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent"
import GetClassId from "../../utils/GetClassId"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"

import {setQuestionPaperDispatch} from "../../actions/questionpaper"

import { connect } from "react-redux";
import { Select, SelectOption, FormGroup, FormLabel, Input, Button, RedLabel, Table, Thead } from "../../utils/Components"
import api from "../../api"
import Swal from "sweetalert2"

const AddQuestionForm = React.lazy(() => import("../form/AddQuestionForm"))
const ViewQuestions = React.lazy(() => import("../form/ViewQuestions"))

class TeacherQuestionPaperAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            addQuestion_id:"",
            viewQuestion_id:""
        }
        this.addQuestionsShow = this.addQuestionsShow.bind(this)
        this.viewQuestionShow = this.viewQuestionShow.bind(this)
    }
    componentDidMount(){
        const {setQuestionPaperDispatch,questionpaper} = this.props
        if(Object.keys(questionpaper).length == 0)
            setQuestionPaperDispatch()
    }
    addQuestionsShow(addQuestion_id){
        this.setState({
            addQuestion_id:"",
            viewQuestion_id:""
        }, () => {
            this.setState({
                addQuestion_id
            })
        })
    }
    viewQuestionShow(viewQuestion_id){
        this.setState({
            viewQuestion_id:"",
            addQuestion_id:"",
        }, () => {
            this.setState({
                viewQuestion_id
            })
        })
    }
    render(){
        const title="Manage Question Paper"
        var back_link = ""
        switch(localStorage.getItem('user_type')){
            case "4":
                back_link = "/teacher/"
                break
            case "1":
                back_link = "/admin/"
                break
        }
        back_link +="questionpaper"
        const {addQuestion_id,viewQuestion_id} = this.state
        const {classwiseSubject,questionpaper} = this.props
        return(
            <div>
                <TopBreadCrumb mainHeader="Question Paper" header="Manage">
                    <QuestionPaperHeader />
                </TopBreadCrumb>
                <BodyComponent>
                <CardComponent title={title} back_link={back_link}>
                    <Table>
                        <Thead>
                            <th>Sr no</th>
                            <th>Title</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Add Question</th>
                            <th>View Questions</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </Thead>
                        <tbody>
                            {Object.keys(questionpaper).length > 0 && questionpaper.map((item,id) => {
                                return <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.subject.subject_name}</td>
                                    <td>{item.class.class_title}</td>
                                    <td>{item.class.section}</td>
                                    <td><Button success onClick={e => this.viewQuestionShow(item.id)} sm>View Questions </Button></td>
                                    <td><Button primary onClick={e => this.addQuestionsShow(item.id)} sm>Add Question</Button></td>
                                    <td><Button primary sm>Edit</Button></td>
                                    <td><Button danger sm>Remove</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </CardComponent>
                {addQuestion_id && 
                    <Suspense fallback={<h1>Loading Component</h1>}>
                        <AddQuestionForm question_id= {addQuestion_id}/>
                    </Suspense>
                }
                {
                    viewQuestion_id &&
                    <Suspense fallback={<h1>Loading Component</h1>}>
                        <ViewQuestions title={"View Question"} question_id={viewQuestion_id}/>
                    </Suspense>
                }
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questionpaper:state.questionpaper
    };
  }
  
  export default connect(mapStateToProps, { setQuestionPaperDispatch })(
    TeacherQuestionPaperAdd
  );
  
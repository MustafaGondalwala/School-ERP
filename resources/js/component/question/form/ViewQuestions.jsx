import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import { connect } from "react-redux";
import { render } from "react-dom";
import { Table, Thead, Col, FormGroup, FormLabel, Button, Input } from "../../utils/Components";

class ViewQuestions extends Component{
    render(){
        const {questionpaper,title,question_id} = this.props
        return(
            <CardComponent title={title}>
                <Table>
                    <Thead>
                        <th>ID</th>
                        <th>Question Type</th>
                        <th width="100px">Question</th>
                        <th>Teacher Prevention</th>
                        <th>Marks</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </Thead>
                    {questionpaper && questionpaper.map(item => {
                        if(item.id == question_id){
                            return <ViewEachQuestions questions={item.question}/>
                        }
                    })}
                </Table>
            </CardComponent>
        )
    }
}

const getQuestType = (question_type) => {
    switch(question_type){
        case 1:
            return "Mutitple Choice Question"
            break;
        case 2:
            return "True or False"
            break;
        case 3:
            return "Fill in Blanks"
            break;
        case 4:
            return "Short Question"
            break;
        case 5:
            return "Long Question"
            break
    }
}
const ViewEachQuestions = ({questions}) => {
    return (
        <tbody>
            {questions && questions.map((item,id) => {
                return <tr key={id}>
                    <td>{id+1}</td>
                    <td>{getQuestType(item.question_type)}</td>
                    <td>
                        {
                            item.question_type == 1 && 
                            ShowQuestionType1(item)
                        }
                        {
                            item.question_type == 2 && 
                            ShowQuestionType2(item)
                        }
                        {
                            item.question_type == 3 && 
                            ShowQuestionType3(item)
                        }
                        {
                            (item.question_type == 4 || item.question_type == 5 ) &&
                            ShowQuestionType4or5(item)
                        }
                    </td>
                    <td>{ (item.question_type == 4 || item.question_type == 5) ? <span>Yes</span> : <span>No</span> }</td>
                    <td>{item.marks}</td>
                    <td><Button warning sm>Edit</Button></td>
                    <td><Button danger sm>Delete</Button></td>
                </tr>
            })}
        </tbody>
    )
}

const ShowQuestionType4or5 = (item) => {
    return(
        <div>
            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
        </div>
    )
}
const ShowQuestionType3 = (item) => {
    return(
        <div>
            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
            <Table>
                <tbody>
                <tr>
                    <th>
                        Correct:
                    </th>
                    <th>
                        <div dangerouslySetInnerHTML={{ __html: item.correct }} />
                    </th>
                </tr>
                </tbody>
            </Table>
        </div>
    )    
}

const ShowQuestionType2 = (item) => {
    return(
        <div>
            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
            <Table>
                <tbody>
                <tr>
                    <th>
                        Correct:
                    </th>
                    <th>
                        {item.correct == 1 ? <b>True</b> : <b>False</b>}
                    </th>
                </tr>
                </tbody>
            </Table>
        </div>
    )    
}
const ShowQuestionType1 = (item) => {
    return(
        <div>
                            <b>Q:</b> <div dangerouslySetInnerHTML={{ __html: item.question }} />
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td><b>1.</b> {item.option_1}</td>
                                        <td><b>2.</b> {item.option_2}</td>
                                    </tr>
                                    <tr>
                                        <td><b>3.</b> {item.option_1}</td>
                                        <td><b>4.</b> {item.option_2}</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Correct:
                                        </th>
                                        <th>
                                            {item.correct}
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        questionpaper:state.questionpaper
    };
  }
  
export default connect(mapStateToProps)(
    ViewQuestions
);
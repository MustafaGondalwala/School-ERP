import React, { Component } from "react"
import { Table, Thead, getQuestionType, Select, SelectOption, Input, Button } from "../../utils/Components"
import CardComponent from "../../utils/CardComponent"
import Swal from "sweetalert2"

class AttendOnline extends Component{
    constructor(props){
        super(props)
        this.state = {
            questionpaper:"",
            answer:{}
        }
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount(){
        const {questionpaper} = this.props
        this.setState({
            questionpaper
        })
    }
    submit(){
        const {answer} = this.state
        if(Object.keys(answer).length == 0){
            Swal.fire('Warning','Please AnswerAtleast One Question','warning')
            return false
        }
        Swal.fire({
            title: 'Submit your Answers to System.',
            showCancelButton: true,
            confirmButtonText: 'Submit Answer',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return this.props.submitAnswer(answer).catch(error => {
                    Swal.fire("Error Occured")
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then(result => {
            if(result.value == true){
                Swal.fire("Success","Answers Submitted to System","success")
                this.props.redirect('/student/online-test/view')
            }
          })
    }
    onChange(e,question_id,question_type){
        const {value} = e.target
        const {answer} = this.state
        answer[question_id] = value
        this.setState({
            answer
        })
    }
    render(){
        const {questionpaper,answer} = this.state
        return(
            <CardComponent title="Attend Questions">
                <Table>
                    <Thead>
                        <th>Sr no.</th>
                        <th>Question Type</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Marks</th>
                    </Thead>
                    <tbody>
                        {
                            questionpaper.question && questionpaper.question.map((item,id) => {
                                return <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{getQuestionType(item.question_type)}</td>
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
                                    <td>    
                                        {
                                            item.question_type == 1 && <span>
                                                <Select onChange={e => this.onChange(e,item.id,item.question_type)} value={ answer[item.id] || ''}>
                                                    <SelectOption value="">-- Select --</SelectOption>
                                                    <SelectOption value="1">1</SelectOption>
                                                    <SelectOption value="2">2</SelectOption>
                                                    <SelectOption value="3">3</SelectOption>
                                                    <SelectOption value="4">4</SelectOption>
                                                </Select>
                                            </span> 
                                        }
                                        {
                                            item.question_type == 2 && <span>
                                                <Select onChange={e => this.onChange(e,item.id,item.question_type)} value={ answer[item.id] || ''}>
                                                    <SelectOption value="">-- Select --</SelectOption>
                                                    <SelectOption value="1">True</SelectOption>
                                                    <SelectOption value="0">False</SelectOption>
                                                </Select>
                                            </span> 
                                        }
                                        {
                                            item.question_type == 3 && <span>
                                                <Input onChange={e => this.onChange(e,item.id,item.question_type)} value={answer[item.id] || ''} />
                                            </span> 
                                        }
                                        {
                                            item.question_type == 4 && <span>
                                                <textarea style={{row:10,col:10}} className="form-control" onChange={e => this.onChange(e,item.id,item.question_type)} value={answer[item.id] || ''} ></textarea>
                                            </span> 
                                        }
                                        {
                                            item.question_type == 5 && <span>
                                                <textarea className="form-control" onChange={e => this.onChange(e,item.id,item.question_type)} value={answer[item.id] || ''} ></textarea>
                                            </span> 
                                        }
                                    </td>
                                    <td>
                                        {item.marks}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <Button onClick={this.submit} warning sm>Submit</Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </CardComponent>
        )
    }
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
                                    </tbody>
                                </Table>
        </div>
    )
}

export default AttendOnline
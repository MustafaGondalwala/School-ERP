import React,{Component} from "react"
import api from "../api"
import Select from "react-select";

export default class SelectStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            student_list:[],
            isLoading:true
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {class_id} = this.props
        if(class_id != undefined){
            api.student.get_student_searchable_by_class(class_id).then(data => {
                this.setState({
                    student_list:data.student,
                    isLoading:false
                })
            })
        }else{
            api.student.get_student_searchable().then(data => {
                this.setState({
                    student_list:data.student,
                    isLoading:false
                })
            })   
        }
    }
    onInputChange(searchText){
        if(searchText != ""){
            this.setState({
                isLoading:true
            })
            const {class_id} = this.props
            if(class_id != undefined){
                return
            }else{
                api.student.get_student_searchable(searchText).then(data => {
                    this.setState({
                        student_list:data.student,
                        isLoading:false
                    })
                })
            }
        }
    }
    onChange(data){
        this.props.sendStudentId(data.value);
    }
    render(){   
        const {student_list,isLoading} = this.state
        return(
            <Select
            options={student_list}
            onChange={this.onChange}
            onInputChange={this.onInputChange}
            isLoading={isLoading}
            />
        )
    }
}
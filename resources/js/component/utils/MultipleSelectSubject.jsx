import React,{Component} from "react"
import api from "../api"
import Select from "react-select";
import { connect } from "react-redux";
import {setSubjects} from "../actions/subjects" 

class MutipleSelectSubject extends Component{
    constructor(props){
        super(props)
        this.state = {
            subjects:""
        }
        this.updateSubjectState  = this.updateSubjectState.bind(this)
    }
    updateSubjectState(subjects){
        var preferend = [];
        subjects.map(item => {
            preferend.push({value:item.id,label:item.subject_name})
        })
        this.setState({subjects : preferend})
        setSubjects(subjects)
    }
    componentDidMount(){
        const {setSubjects,subjects} = this.props
        if(Object.keys(subjects).length == 0){
            api.subjects().then(data => {
                setSubjects(data.subjects)
                this.updateSubjectState(data.subjects);
            })
            
        }else{
            this.updateSubjectState(subjects);
        }
    }
    onInputChange(data,name){
        const senddata = []
        data.map(item => senddata.push(item.value))
        this.props.sendSubjects(senddata)
    }
    render(){
        const {subjects} = this.state
        return(
            <Select 
            isMulti
            options={subjects}
            onChange={e => this.onInputChange(e,"ok")}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
      subjects:state.subjects
    };
}

export default connect(mapStateToProps,{setSubjects})(MutipleSelectSubject);

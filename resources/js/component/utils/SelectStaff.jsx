import React,{Component} from "react"
import api from "../api"
import Select from "react-select";

export default class SelectStudent extends Component{
    constructor(props){
        super(props)
        this.state = {
            staff_list:[],
            isLoading:true
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        api.staff.get_staff_searchable().then(data => {
            this.setState({
                staff_list:data.staff,
                isLoading:false
            })
        })
    }
    onInputChange(searchText){
        if(searchText != ""){
            this.setState({
                isLoading:true
            })
            api.staff.get_staff_searchable(searchText).then(data => {
                this.setState({
                    staff_list:data.staff,
                    isLoading:false
                })
            })
        }
    }
    onChange(data){
        console.log(data)
        this.props.sendStaffId(data.value);
    }
    render(){   
        const {staff_list,isLoading} = this.state
        return(
            <Select
            options={staff_list}
            onChange={this.onChange}
            onInputChange={this.onInputChange}
            isLoading={isLoading}
            />
        )
    }
}
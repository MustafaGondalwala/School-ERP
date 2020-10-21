import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminStudentHeader from "../../header/admin/AdminStudentHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import {getClassSection,setClassSection} from "../../actions/classes"
import { connect } from "react-redux";
import { Table, Thead, Input, Button, Col, FormGroup, FormLabel } from "../../utils/Components"
import Row from "../../utils/Row"
import Swal from "sweetalert2"
import api from "../../api"

class SetRollNo extends Component{
    constructor(props){
        super(props)
        this.state = {
            model_status: "model fade",
            show_id:"",
            register_no:""
        }
        this.updateRollNo = this.updateRollNo.bind(this)
    }
    componentDidMount(){
        api.admin.student.getRegisterNo().then(data => {
            const {register_no} = data
            this.setState({register_no:register_no})
        });
    }
    updateRollNo(){
        const {register_no} = this.state
        console.log(register_no)
        if(register_no == "" || register_no == 0 || register_no == null){
            Swal.fire("Validation Error","Please Enter Register No","error");
            return false
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "Roll No serials will be updated",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
          }).then((result) => {
            if (result.value) {
              return api.admin.student.setRegisterNo(this.state.register_no).then(data => {
                Swal.fire("Data Updated","Roll No Serials Updated !!","success");
            });
            }
          })
    }

    render() {
        const {classes} = this.props
        const {show_id} = this.state
        const userAccount = JSON.parse(localStorage.getItem('userAccount'))
        const {unique_id_code} = userAccount.info.school
        const getProperRollNo = (roll_no) => {
            if(roll_no !=  null){
                return `${unique_id_code}-${roll_no.rollno_string}${roll_no.roll_id}`
            }
            else
                return "None"
        }
        return (
             <div>
                <TopBreadCrumb mainHeader="Student" header="Set Roll No">
                    <AdminStudentHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Set Roll No" back_link="/admin/student">
                            <FormGroup>
                                <FormLabel>Register No</FormLabel>
                                <Input value={this.state.register_no} type="number" onChange={e => this.setState({ register_no:e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                            <Button primary sm onClick={e => this.updateRollNo()}>Update</Button>
                            </FormGroup>
                    </CardComponent>
                    {/* {show_id && <UpdateRollNo updateRollNo={this.updateRollNo} item={show_id} unique_id_code={unique_id_code}/>} */}
                </BodyComponent>
             </div>
        );
    }
}

class UpdateRollNo extends Component{
    constructor(props){
        super(props)
        this.state = {
            rollno_string:"",
            roll_id:"",
            id:"",
            button_text:""
        }
        this.fetchData = this.fetchData.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    fetchData(){
        const {item} = this.props

        var rollno_string = ""
        var roll_id = ""
        var id = item.id
        var button_text = "Update"
        if(item.roll_no != null){
            rollno_string = item.roll_no.rollno_string
            roll_id = item.roll_no.roll_id
        }
        this.setState({
            rollno_string,
            roll_id,
            id,
            button_text
        })
    }
    componentDidMount(){
        this.fetchData()
    }
    submit(){
        const {rollno_string,roll_id,id} = this.state
        this.setState({
            button_text:"Updating ..."
        })
        this.props.updateRollNo(rollno_string,roll_id,id)
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }
    render(){
        const {unique_id_code,item} = this.props
        const {rollno_string,roll_id,button_text} = this.state
        
        return(
            <CardComponent title={`Update Register ID`} >
            smsmssmms
            </CardComponent>
        )
    }
}


function mapStateToProps(state) {
    return {
      classes:state.classes,
    };
  }
  
  export default connect(mapStateToProps,{getClassSection,setClassSection})(SetRollNo);
  
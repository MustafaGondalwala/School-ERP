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
            show_id:""
        }
        this.updateRollNo = this.updateRollNo.bind(this)
    }
    componentDidMount(){
        const {classes,getClassSection} = this.props
        if(Object.keys(classes).length == 0){
            getClassSection()
        } 
    }
    updateRollNo(rollno_string,roll_id,id){
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
              return api.admin.student.setrollno(rollno_string,roll_id,id).then(data => {
                const {classes} = data
                this.props.setClassSection(classes)
                this.setState({
                    show_id:""
                })
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
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Current Roll No</th>
                                <th>Action</th>
                            </Thead>
                            <tbody>
                                {Object.keys(classes).length > 0 && classes.map((item,id) =>{
                                    return <tr>
                                        <td>{id+1}</td>
                                        <td>{item.class_title}</td>
                                        <td>{item.section}</td>
                                        <td><Input disabled value={getProperRollNo(item.roll_no)}/></td>
                                        <td> <Button primary sm onClick={() => this.setState({ show_id : item})}> Update </Button></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardComponent>
                    {show_id && <UpdateRollNo updateRollNo={this.updateRollNo} item={show_id} unique_id_code={unique_id_code}/>}
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
    componentWillReceiveProps(){
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
            <CardComponent title={`Update Roll No: ${item.class_title} ${item.section}`} >
                <Row>
                    <Col md="6">
                        <FormLabel>Roll No</FormLabel>
                        <Input disabled value={`${unique_id_code}-${rollno_string}${roll_id}`}/>
                    </Col>
                </Row>
                <br />
                <Table>
                    <Thead>
                        <th>School Code</th>
                        <th>Roll No String</th>
                        <th>Roll No</th>
                    </Thead>
                    <tbody>
                        <tr>
                            <td><Input disabled value={unique_id_code}/></td>
                            <td><Input name="rollno_string" value={rollno_string || ''} onChange={this.onChange}/></td>
                            <td><Input name="roll_id" value={roll_id || ''} onChange={this.onChange}/></td>
                        </tr>
                        <tr>
                            <td><Button primary sm onClick={this.submit}>{button_text}</Button></td>
                        </tr>
                    </tbody>
                </Table>
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
  
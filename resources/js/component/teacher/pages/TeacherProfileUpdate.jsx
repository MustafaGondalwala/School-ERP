import React, { Component, Suspense } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminTeacherHeader from "../../header/admin/AdminTeacherHeader"
import api from "../../api"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import { Col, FormGroup, FormLabel, Button } from "../../utils/Components"
import BodyComponent from "../../utils/BodyComponent"
import InlineError from "../../utils/InlineError"
const SelectTeacher = React.lazy(() => import("../form/SelectTeacher"))
const AddTeacherForm = React.lazy(() => import("../form/AddTeacherForm"))

export default class TeacherProfileUpdate extends Component{
    constructor(props){
        super(props)
        this.state = {
            teachers_name:"",
            from_edit:false,
            show_select_component:true,
            teacher_id:"",
            errors_teacher_id:""
        }
        this.click = this.click.bind(this)
        this.onChange = this.onChange.bind(this)
        this.updateSubmit = this.updateSubmit.bind(this)
    }
    componentDidMount(){
        this.fetchData(4)
    }
    onChange(e){
        const {value} = e.target
        this.setState({
            ['teacher_id']:value
        })
    }
    click(){
        const {teacher_id} = this.state
        this.setState({ errors_teacher_id: "",teacher_info:""})
        if(teacher_id == ""){
            this.setState({
                errors_teacher_id:"Can't be Blank"
            })
            return false
        }
        this.fetchData(teacher_id)
    }
    fetchData(teacher_id){
        api.admin.teacher.view_particular_teacher(teacher_id)
    }
    updateSubmit(data){
        return api.admin.teacher.update(data).then(data => {
            this.setState({
                teacher_info:""
            })
        })
    }
    render(){
        const {show_select_component,from_edit,teacher_id,errors_teacher_id,teacher_info} = this.state
        return(
            <div>
                <TopBreadCrumb mainHeader="Teacher" header="Update Profile">
                    <AdminTeacherHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    {(show_select_component && !from_edit) && 
                        <CardComponent title="Select Teacher" back_link="/admin/teacher">
                            <Row>
                                <Col md="6" sm="6">
                                    <FormGroup>
                                        <FormLabel>Select Teacher</FormLabel>
                                        <Suspense fallback={<h1>Loading ...</h1>}>
                                            <SelectTeacher value={teacher_id} onChange={this.onChange}/>
                                        </Suspense>
                                        {errors_teacher_id && <InlineError text={errors_teacher_id}/>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Button primary onClick={this.click}>Fetch</Button>
                            </Row>
                        </CardComponent>
                     }
                     
                     {teacher_info && 
                        <Suspense fallback={<h1>Loading ...</h1>}>
                         <AddTeacherForm submit={this.updateSubmit} data={teacher_info} title="Edit Profile"/>
                     </Suspense>
                     
                     }
                </BodyComponent>
                
            </div>
        )
    }
}


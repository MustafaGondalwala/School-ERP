import React,{Component,Suspense} from "react"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import InlineError from "../../utils/InlineError"
import Col from "../../utils/Col"
import Row from "../../utils/Row"
import api from "../../api"
const FillViewFormStudent = React.lazy(() => import("../form/FillViewFormStudent")) 
import { FormGroup, FormLabel, Input,Button } from "../../utils/Components"

export default class StudentAttendanceEditAdmin extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                class_id:"",
                select_date:"",
            },
            view_type:"",
            student_attendance:"",
            errors:{},
            view_button:"View Attendance",
            fill_button:"Fill Attendance",
            show_class_panel:true,
            user_type:""
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.changeState = this.changeState.bind(this)
        this.updateStudentAttendance = this.updateStudentAttendance.bind(this)
    }
    onChange(e){
        this.setState({
            data: {...this.state.data,[e.target.name]:e.target.value}
        });
    }
    changeState(type,value){
        this.setState({
            [type]:value
        })
    }

    componentDidMount(){
        const {class_id,user_type} = this.props
        console.log(class_id,user_type)
        if(user_type != undefined && class_id != undefined){
            this.setState({
                data: {...this.state.data,["class_id"]:class_id},
            });
            this.changeState("user_type",user_type)
        }
    }
    sendClassId(class_id){
        this.setState({
            data: {...this.state.data,["class_id"]:class_id}
        });
    }

    validate(data){
        const errors = {};
        if (!data.select_date) errors.select_date = "Can't be blank";
        if (!data.class_id) errors.class_id = "Can't be blank";
        return errors;
    }
    submit(type){
        const errors = this.validate(this.state.data);
        this.setState({ errors })
        if(Object.keys(errors).length == 0){
            this.setState({
                student_attendance:""
            })
            if(type == "fill"){
                this.changeState("fill_button","Loading ...");
            }else{
                this.changeState("view_button","Loading ...");
            }
            api.adminteacher.student_attendance.get(this.state.data).then(data => {
                this.setState({
                    student_attendance:data.student_attendance,
                    view_type:type,
                    view_button:"View Attendance",
                    fill_button:"Fill Attendance"
                })
            })
        }
    }
    updateStudentAttendance(student_attendance){
        return api.adminteacher.student_attendance.update(student_attendance).then(data => {
            // const {studentAttendances,message} = data
            // Swal.fire("Data Updated!!",message,"success");
            // this.setState({
            //     student_attendance:""
            // },() => {
            //     this.setState({
            //         student_attendance:studentAttendances
            //     })
            // })
            return data
        })
    }
    render(){
        const {errors,data,student_attendance,view_type,view_button,fill_button,user_type} = this.state
        var back_link = "/admin/attendance"
        if(user_type != "")
            back_link = "/teacher/attendance/class/"+data.class_id
        return(
            <div>
                <CardComponent title="Select Class" back_link={back_link}>
                        {!user_type && <GetClassId class_id={data.class_id} errors={errors} sendClassId={this.sendClassId} />}
                        <Row>
                            <Col md="4" sm="6">
                                <FormGroup>
                                    <FormLabel>Select Date</FormLabel>
                                    <Input errors={errors} type="date" onChange={this.onChange} name="select_date" value={data.date}/>
                                </FormGroup>
                            </Col>
                        </Row>
                       <Row>
                            <Col md="12" sm="12">
                                <Button primary onClick={e => this.submit("view")}>{view_button}</Button>
                                <Button primary onClick={e => this.submit("fill")}>{fill_button}</Button>
                            </Col>
                       </Row>
                </CardComponent>
                {(view_type && student_attendance ) && <Suspense fallback={<h1>Loading ...</h1>}><FillViewFormStudent select_date={data.select_date} updateStudentAttendance={this.updateStudentAttendance} view_type={view_type} student_attendance={student_attendance}/></Suspense>}  
            </div>
        )
    }
}
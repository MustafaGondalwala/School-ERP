import React,{Component, Suspense} from "react"
const TeacherHeader = React.lazy(() => import("../../../header/teacher/AttendanceHeader")) 
import TopBreadCrumb from "../../../utils/TopBreadcrumb"
import CardComponent from "../../../utils/CardComponent"
import BodyComponent from "../../../utils/BodyComponent"
const ClassSectionWise  = React.lazy(() => import( "../../utils/ClassSectionWise"))
import InlineError from "../../../authentication/form/InlineError"
import Row from "../../../utils/Row"
import { FormGroup, FormLabel, Input, Button, Col } from "../../../utils/Components"


export default class TeacherAttendanceClassWiseEdit extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            data:{
                class_id:"",
                select_month:""
            },
            fetch_button:"Fetch",
            errors:{},
            open_panel:false
        }
        this.getClassAttendance = this.getClassAttendance.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {class_id} = this.props.match.params
        this.setState({
            data: {...this.state.data,["class_id"]:class_id}
          });
    }
    onChange(e){
        this.setState({
          data: {...this.state.data,[e.target.name]:e.target.value}
        });
      }
    validate(data){
        const errors = {};
        if (!data.class_id) errors.class_id = "Can't be blank";
        if(!data.select_month) errors.select_month = "Can't be blank";
        return errors
    }
    getClassAttendance(){
        const {data} = this.state
        const errors = this.validate(data);
        this.setState({
            errors
        })
        if(Object.keys(errors).length == 0){
            this.setState({
                open_panel:true
            })
        }
    }
    render(){
        const {fetch_button,errors,open_panel,data} = this.state
        const {class_id} = this.props.match.params
        const back_link = "/teacher/attendance/class/"+class_id
        return(
            <div>
             <Suspense fallback={<h1>Loading ...</h1>}>
                <TopBreadCrumb mainHeader="Attendance" header="Student" sub_header="Edit Attendance">
                    <TeacherHeader mainHeader="Attendance" header="Edit/View"/>
                </TopBreadCrumb>
            </Suspense>
                <BodyComponent>
                    <CardComponent title="Select Class/Section" back_link={back_link}>
                        <Row>
                            <Col md="6" sm="6">
                            <FormGroup>
                                <FormLabel>Select Month</FormLabel>
                                <Input errors={errors} value={data.select_month} onChange={this.onChange} type="month" name="select_month" />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Button primary onClick={this.getClassAttendance}>{fetch_button}</Button>
                        </Row>
                    </CardComponent>
                    {
                        open_panel && <Suspense fallback={<h1>Loading ...</h1>}>
                            <ClassSectionWise title="Class/Section Wise" data={data}/></Suspense>
                    }
                    
                </BodyComponent>
            </div>
        )
    }
}
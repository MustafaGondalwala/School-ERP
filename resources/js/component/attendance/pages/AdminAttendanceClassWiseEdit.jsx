import React,{Component, Suspense} from "react"
import AdminHeader from "../header/AdminHeader"
import GetClassId from "../../utils/GetClassId"
import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
const ClassSectionWise  = React.lazy(() => import( "../utils/ClassSectionWise"))
import InlineError from "../../authentication/form/InlineError"
import Row from "../../utils/Row"
import { FormGroup, FormLabel, Input, Button, Col } from "../../utils/Components"


export default class AdminAttendanceClassWiseEdit extends Component{
    
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
        this.sendClassId = this.sendClassId.bind(this)
        this.getClassAttendance = this.getClassAttendance.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    sendClassId(class_id){
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
        return(
            <div>
                <AdminHeader mainHeader="Attendance" header="Class/Sectio Wise" sub_header="View" />
                <BodyComponent>
                    <CardComponent title="Select Class/Section" back_link="/admin/attendance">
                        <GetClassId class_id={data.class_id} errors={errors} sendClassId={this.sendClassId} />
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
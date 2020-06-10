import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import GetClassId from "../../utils/GetClassId"
import CardComponent from "../../utils/CardComponent"
import BodyComponent from "../../utils/BodyComponent"
import ClassSectionWise from "../utils/ClassSectionWise"
import InlineError from "../../authentication/form/InlineError"


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
                        <GetClassId errors={errors} sendClassId={this.sendClassId} />
                        <div className="row">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="example3cols1Input">Select Month</label>
                                <input value={data.select_month} onChange={(e) => this.onChange(e)} className="form-control" type="month" name="select_month" />
                                {errors.select_month && <InlineError text={errors.select_month} />} 
                            </div>	  
                        </div>
                        <div className="row">
                            <button onClick={e => this.getClassAttendance()} className="btn btn-primary">{fetch_button}</button>
                        </div>
                    </CardComponent>
                    {
                        open_panel && 
                            <ClassSectionWise title="Class/Section Wise" data={data}/>
                    }
                    
                </BodyComponent>
            </div>
        )
    }
}
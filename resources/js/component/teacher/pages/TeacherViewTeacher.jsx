import React,{Component,Suspense} from "react"
import AdminHeader from "../header/AdminHeader"
import ViewTeacherTable from "../form/ViewTeacherTable"
import CardComponent from "../../utils/CardComponent";
import api from "../../api";

export default class TeacherViewTeacher extends Component{
    constructor(props) {
        super(props);
        this.state = {
          rows: "",
        };
        this.isMount = true;
      }
    
      componentDidMount() {
        this.isMount && api.admin.teacher.view_all().then((data) => {
            this.setState({
              rows: data.teachers,
            });
          });
        }
        componentWillUnmount(){
            this.isMount = false   
        }
    render(){
        const {rows} = this.state
        return(
            <div>
                <AdminHeader mainHeader="Teacher" header="View"/>
                <div className="container-fluid mt--6">
                <CardComponent title="View All Teachers" back_link="/admin/teacher">
                    {rows ?
                        <Suspense fallback={<h1>Loading ...</h1>}>
                        <ViewTeacherTable history={this.props.history} teachers={rows}/>
                        </Suspense>
                    : <h1>Loading ...</h1>}
                    </CardComponent>
                </div>
            </div>
        )
    }
}
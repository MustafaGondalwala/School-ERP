import React,{Component} from "react"
import { MDBDataTable } from 'mdbreact';


export default class ViewAllTeacher extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rows:""
    };
  };
  componentDidMount(){
    axios({
      url:"/api/v1/teacher/view-all-teacher"
    }).then(response=>{
    this.setState({
      rows:response.data
    })
    })
  }
  render(){
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Emp ID.',
          field: 'id',
          sort: 'asc',
          width: 80
        },
        {
          label: 'Name',
          field: 'teacher_name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Contact No.',
          field: 'contact_no',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Salary',
          field: 'email',
          sort: 'asc',
          width: 100
        },
      ],
      rows: this.state.rows
    };
    return(
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col">
            <div className="card">
              {/* Card header */}
              <div className="card-header">
                <h3 className="mb-0">View Teacher Info</h3>
                <MDBDataTable
                striped
                responsive
                bordered
                small
                data={data}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

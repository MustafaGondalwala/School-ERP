import React,{Component} from "react"
import { MDBDataTable } from 'mdbreact';



export default class ViewStudentLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:""
    };
  };

  componentDidMount(){
    self = this
    axios({
      url:"/api/v1/student/view-all-students-login-info"
    }).then((response) => {
        self.setState({
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
          label: 'name',
          field: 'name',
          sort: 'asc',
          width: 80
        },
        {
          label: 'email',
          field: 'email',
          sort: 'asc',
          width: 150
        },
        {
          label: 'forget_password',
          field: 'forget_password',
          sort: 'asc',
          width: 100
        },
      ],
      rows: this.state.rows
    };

    return (
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col">
            <div className="card">
              {/* Card header */}
              <div className="card-header">
                <h3 className="mb-0">View Students Login Info</h3>
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

    );
  }
}

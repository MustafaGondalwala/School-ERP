import React,{Component} from "react"
import { MDBDataTable } from 'mdbreact';



export default class ViewAllStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:""
    };
  };

  componentDidMount(){
    self = this
    axios({
      url:"/api/v1/student/view-all-students"
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
          label: 'Roll. No',
          field: 'roll_no',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Class',
          field: 'class',
          sort: 'asc',
          width: 80
        },
        {
          label: 'Section',
          field: 'section',
          sort: 'asc',
          width: 80
        },
        {
          label: 'Student Name',
          field: 'student_name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Father Name',
          field: 'father_name',
          sort: 'asc',
          width: 100
        },

        {
          label: 'Father Contact No 1',
          field: 'father_contact_no1',
          sort: 'asc',
          width: 100
        },

        {
          label: 'Father Email',
          field: 'father_email',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Student Email',
          field: 'father_email',
          sort: 'asc',
          width: 100
        },

        {
          label: 'Gender',
          field: 'gender',
          sort: 'asc',
          width: 50
        },
        {
          label: 'Place',
          field: 'place',
          sort: 'asc',
          width: 50
        }
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
                <h3 className="mb-0">View All Students</h3>
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

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AdmissionStudentForm from "../forms/AdmissionStudentForm"
import { MDBDataTable } from 'mdbreact';

export default class AdmissionStudentPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
            register_user_message:"",
            server_error:"",
            rows:[]
          };
    };
    componentDidMount(){
      axios({
        method:"post",
        url:"/api/v1/student/view-all-admission-list"
      }).then(response => {
        this.setState({
            rows:response.data.success.admission_list
          })
        console.log(response.data.success.admission_list)
      });
    }
     render () {
       const data = {
         columns: [
           {
             label: 'Admission Id.',
             field: 'admission_id',
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
             label: 'Father Contact No',
             field: 'father_contact_no',
             sort: 'asc',
             width: 100
           },

           {
             label: 'Dob',
             field: 'dob',
             sort: 'asc',
             width: 100
           },
           {
             label: 'Address',
             field: 'address',
             sort: 'asc',
             width: 100
           },

           {
             label: 'Religion',
             field: 'religion',
             sort: 'asc',
             width: 100
           },
           {
             label: 'caste',
             field: 'caste',
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
                   <h3 className="mb-0">Admission List</h3>
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
};

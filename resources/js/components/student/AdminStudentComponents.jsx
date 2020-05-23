import React,{Component} from "react"
import { Link } from "react-router-dom"
import { RegisterStudentForm, 
          AdmissionStudentForm, 
          SelectIndividualStudent, 
          ChangePassword, 
          StudentClassSectionWise,
          StudentCasteWise} from "./utils/AdminUtils"
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
import AdminStudentHeader from "./utils/AdminStudentHeader"
import DataTable, { createTheme } from 'react-data-table-component';
import Swal from 'sweetalert2'

const ColComponent = ({title,description,link,button_text}) => (
    <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-3">{title}</h3>
              <p className="card-text mb-4">{description}</p>
              <Link to={link} className="btn btn-primary">{button_text}</Link>
            </div>
        </div>
    </div>
)

export const AdminStudentHomePage = () => (
  <div>
    <AdminStudentHeader mainHeader="Student" header="Home"/>
    <div className="container-fluid mt--6">
      <div className="row card-wrapper">

      		<ColComponent title="Registration" description="Add New Student in System" link="/admin/student/add-new-student" button_text="Add"/>
      		<ColComponent title="Student List" description="View Student in System" link="/admin/student/view-student" button_text="View"/>
      		<ColComponent title="Profile Update" description="Update the Profile of Student" link="/admin/student/update-student-info" button_text="Update"/>
      		<ColComponent title="Admission" description="New Student Admission in System" link="/admin/student/add-new-admission-student" button_text="Add"/>
      		<ColComponent title="Admission List" description="View Student Admission in System" link="/admin/student/admission-list" button_text="View"/>
      		<ColComponent title="One Click Info" description="View Particular Student" link="/admin/student/add-new-student" button_text="View"/>
      		<ColComponent title="Manage Student Login" description="Mantain Student Login" link="/admin/student/view-student-login" button_text="Check"/>
      		<ColComponent title="Student Prmotion" description="Promate the Student to Higer Class" link="" button_text="Check"/>
        	
        </div>
        <div className="card-deck flex-column flex-xl-row">
          <div className="card">
            <div className="card-header">
              <h5 className="h3 mb-0">Report</h5>
            </div>
            <div className="card-body">
              <div className="row card-wrapper">
                <ColComponent title="Student Class and Section Wise" link="/admin/student/student-class-section-wise" button_text="View"/>
                <ColComponent title="Student Caste Wise" link="/admin/student/student-caste-wise" button_text="View"/>
                <ColComponent title="Total New Admission of Student" link="/admin/student/add-new-student" button_text="View"/>
                <ColComponent title="Total New Registration of Student" link="/admin/student/view-total-register" button_text="View"/>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
)

export class RegisterStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
          register_user_message:"",
          server_error:"",
          "add_student_button_text":"Register Student",
          "show_success_message":false
        };
    this.submit = this.submit.bind(this)
  };
  submit(data){
    var self  = this
    this.setState({
      add_student_button_text:"Add Student ..."
    })
    const formData = new FormData();
    Object.keys(data).map((item)=>{
      formData.append(item,data[item])
    })
    axios({
      url:"/api/v1/student/add-register-student",
      method:"post",
      data:formData,
    }).then(response => {
          var data = response.data[0]
          self.setState({
            show_success_message:true
          })
          self.setState({
            add_student_button_text:"Register Student"
          })
    }).catch(error=>{
      self.setState({
          'server_error':error.response.data.errors,
      })
      self.setState({
          add_student_button_text:"Register Student"
      })
    })
  }
     render () {
       return (
        <div>
          <AdminStudentHeader mainHeader="Student" header="Register Student"/>
          <RegisterStudentForm errors={this.state.server_error} add_student_button_text={this.state.add_student_button_text} submit={this.submit} server_error={this.state.server_error} show_success_message={this.state.show_success_message} />
        </div>
       )
     }
};

export class ViewAllStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:""
    };
  };

  componentDidMount(){
    self = this
    axios({
      url:"/api/v1/student/get/all"
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
          width: 50,
        }
      ],
      rows: this.state.rows
    };

    return (
      <div>
      <AdminStudentHeader mainHeader="Student" header="View Student"/>
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col">
            <div className="card">
              {/* card-header header */}
              <div className="card-header">
                 <h3 className="mb-0">View Student <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
              </div>
              <div className="card-body">
                <MDBDataTable exportToCSV
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
      </div>
    );
  }
}

export class AdmissionStudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register_user_message:"",
      server_error:"",
      add_button_text:"Add"
    };
    this.submit = this.submit.bind(this)
  };
  submit(data){
        var self  = this
        this.setState({
          add_button_text:"Loading ..."
        })
        axios({
          url:"/api/v1/student/add-admission-student",
          method:"post",
          data:data,
        }).then(response => {
            self.setState({
              register_user_message:response.data.success.message,
              add_button_text:"Add"
            });
        }).catch(error => {
          self.setState({
            server_error:error.response.data.errors,
            add_button_text:"Add"
          })
        })
    }
     render () {
       return (
        <div>
          <AdmissionStudentForm add_button_text = {this.state.add_button_text} submit={this.submit} server_error={this.state.server_error} register_user_message={this.state.register_user_message} />
        </div>
       )
     }
};

export  class AdmissionList extends Component {
    constructor(props) {
      super(props);
      this.state = {
            register_user_message:"",
            server_error:"",
            rows:[]
          };
    };
    componentDidMount(){
      var self = this;
      axios({
        method:"post",
        url:"/api/v1/student/view-all-admission-list"
      }).then(response => {
        this.setState({
            rows:response.data.success.admission_list
          })
        console.log(response.data.success.admission_list)
      });
      axios({
        method: "post",
        url: "/api/v1/class/get-all-classes",
      }).then((response) => {
        const uniqueClasses = [];
        response.data.success.classes.map((item) => {
          if (uniqueClasses.indexOf(item.class_title) === -1) {
            uniqueClasses.push(item.class_title);
          }
        });
        self.setState({
          classes: response.data.success.classes,
          distinct_classes: uniqueClasses,
        },() => {
          console.log(this.state.classes)
        });
      });
    }
    makeAdmission(row){
      var self = this;
        Swal.fire({
          title: 'Are you sure?',
          text: "Give Student Admission",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Register Student'
        }).then((result) => {
          if (result.value) {
            axios({
              url:"/api/v1/student/make_admission",
              method:"post",
              data:row
            }).then(response => {
              self.setState({
                rows:response.data.success.admission_list
              })
              Swal.fire(
                'Added !',
                'New Student Added to System',
                'success'
              )
            })
          }
        })
      console.log(row)
    }
     render () {
       const columns = [
       {
            name: 'Admission Id.',
            selector: 'admission_id',
            sortable: true,
            width: 150
       },
       {
             name: 'Class',
             selector: 'class',
             sortable: true,
             cell: row => <div>
                      {this.state.classes && this.state.classes.map(item => {
                          if(row.class_id == item.id){
                              return <div>
                                  {item.class_title}
                                  </div>
                          }
                      })}  
                    </div>
           },
           {
             name: 'Section',
             selector: 'section',
            sortable: true,
             cell: row => <div>
                      {this.state.classes && this.state.classes.map(item => {
                          if(row.class_id == item.id){
                              return <div>
                                  {item.section}
                                  </div>
                          }
                      })}  
                    </div>
           },
           {
             name: 'Student Name',
             selector: 'student_name',
             sort: 'asc',
            sortable: true,

             width: 150
           },
           {
             name: 'Father Name',
             selector: 'father_name',
             sort: 'asc',
            sortable: true,

             width: 100
           },

           {
             name: 'Father Contact No',
             selector: 'father_contact_no',
             sort: 'asc',
            sortable: true,

             width: 100
           },

           {
             name: 'Dob',
             selector: 'dob',
             sort: 'asc',
            sortable: true,

             width: 100
           },
           {
             name: 'Address',
             selector: 'student_address',
             sort: 'asc',
            sortable: true,
             width: 100
           },

           {
             name: 'Religion',
             selector: 'religion',
             sort: 'asc',
            sortable: true,
             width: 100
           },
           {
             name: 'caste',
             selector: 'caste',
             sort: 'asc',
             sortable: true,
             width: 100
           },
           {
            name:"Make Register",
            width:100,
            cell: row => <div><button onClick={(e)=> this.makeAdmission(row)} className="btn btn-sm btn-primary">View</button></div>,
           }
      ];
       return (
        <div>
           <AdminStudentHeader mainHeader="Student" header="Admission List"/>
            <div className="container-fluid mt--6">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h3 className="mb-0">Admission List
                    <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link>
                    </h3>
                  </div>
                  <div className="card-body">
                     <DataTable
                      title="Admission Student List"
                      columns={columns}
                      data={this.state.rows}
                      />
                </div>
              </div>
            </div>
           </div>
          </div>
      </div>
       )
     }
};


export  class UploadStudentInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      student_info: "",
      add_student_button_text:"Update",
      add_student_button_text_individual:"Fetch"
    }

    this.getStudent = this.getStudent.bind(this)
    this.update_student_info = this.update_student_info.bind(this)
  }

  update_student_info(data){
    var self = this
      this.setState({
        add_student_button_text:"Updating Student ...",
      })
      const formData = new FormData();
      Object.keys(data).map((item)=>{
        formData.append(item,data[item])
      })
    axios({
      url:"/api/v1/student/add-register-student",
      method:"post",
          data:formData,
    }).then(response => {
      this.setState({
        add_student_button_text:"Update",
        student_info:"",
        show_success_message:true
      })
    })
  }
  componentDidMount(){
    var self = this
    axios({
      url:"/api/v1/student/get-indivitual-student/5"
    }).then(response => {
      self.setState({
        student_info:response.data.success,
        show_success_message:false,
        add_student_button_text_individual:"Fetch"
      })
    })
  }
  getStudent(student_id,select_year){
    this.setState({
        student_info:"",
        show_success_message:false,
        add_student_button_text_individual:"Fetching ..."
    })
    var self = this
    axios({
      url:"/api/v1/student/get-indivitual-student/"+student_id
    }).then(response => {
      self.setState({
        student_info:response.data.success,
        show_success_message:false,
        add_student_button_text_individual:"Fetch"
      })
    })
  }
  render(){
    return(
      <div>
           <AdminStudentHeader mainHeader="Student" header="Profile Update"/>
          <div className="container-fluid mt--6">
            {this.state.show_success_message &&
                  <div className="row">
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-icon"><i className="ni ni-like-2" /></span>
                        <span className="alert-text">
                          <div>Student Data Uploaded.</div>
                        </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                  </div>
                }
            <SelectIndividualStudent submit={this.getStudent} title="Select Student" back_link="/admin/student" hide_year={true} add_student_button_text_individual={this.state.add_student_button_text_individual}/>
      </div>
      <br />
      <br />
      <br />
      {this.state.student_info && 
          <RegisterStudentForm submit={this.update_student_info} add_student_button_text={this.state.add_student_button_text} title={"Update Student Info"} hide_button = {true} student_info = {this.state.student_info} />    
      }
      </div>
    )
  }
}


export  class ViewStudentLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:"",
      student_roll_no:"",
      student_id:""
    };
    this.handleChangePasswordClick = this.handleChangePasswordClick.bind(this)
  };
  componentDidMount(){
    self = this
    axios({
      url:"/api/v1/student/get/logininfo"
    }).then((response) => {
        self.setState({
            rows:response.data
        })
    })
  }

  handleChangePasswordClick(e,id,roll_no){
    this.setState({
      student_id:id,
      student_roll_no:roll_no
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
          label: 'Roll No',
          field: 'roll_no',
          sort: 'asc',
          width: 150
        },
      ],
      rows: this.state.rows
    };

    return (
      <div>
          <div className="modal fade" id="new" role="dialog">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header">   
                  <h3 className="card-title mb-3">Change Password</h3>
                  <button type="button" className="close" data-dismiss="modal">×</button>
                </div>
                <div className="modal-body">
                    <ChangePassword student_id={this.state.student_id} student_roll_no={this.state.student_roll_no}/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <AdminStudentHeader mainHeader="Student" header="Manage Login"/>
          <div className="container-fluid mt--6">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                   <h3 className="mb-0">View Students Login Info
                   <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link>
                   </h3>
                  </div>
                  <div className="card-body">
                    {this.state.rows && 
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Student Name</th>
                            <th>Roll No</th>
                            <th>Change Password</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.rows && this.state.rows.map((item,id) => {
                              return <tr>
                                <td>{id+1}</td>
                                <td>{item.name}</td>
                                <td>{item.roll_no}</td>
                                <td>
                                  <button className="btn btn-primary btn-sm" onClick={(e) => this.handleChangePasswordClick(e,item.id,item.roll_no)} data-id={item.id} data-toggle = "modal" data-target="#new">Change Password</button>
                                </td>
                              </tr>
                          })}
                          </tbody>
                        </table>
                      </div>  
                    }
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




export class ReportStudentClassWise extends Component{
  constructor(props){
    super(props)
    this.state = {
      chart_type:"pie"
    }
  }
  render(){
    return(
      <div>
      <AdminStudentHeader
          mainHeader="Student"
          header="Report"
          sub_header="Student Caste Wise"
        />
        <div className="container-fluid mt--6">
          <StudentCasteWise />
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title mb-3">Chart</h3>
                  </div>
                  <div className="card-body">
                    <select
                      name="chart_type"
                      onChange={(e) => this.onChange(e)}
                      className="form-control"
                    >
                      <option value="pie">Pie</option>
                      <option value="line">Line</option>
                      <option value="bar">Bar</option>
                      <option value="area">Area</option>
                    </select>
                    <Chart type={this.state.chart_type} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
export class ReportClassSectionWise extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      chart_type:"pie"
    }  
  }
  addSymbols(e){
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if(order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

   onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render(){
    return(
      <div>
        <AdminStudentHeader
          mainHeader="Student"
          header="Report"
          sub_header="Student Class and Section Wise"
        />
        <div className="container-fluid mt--6">
          <StudentClassSectionWise />
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title mb-3">Chart</h3>
                </div>
                <div className="card-body">
                  <select
                    name="chart_type"
                    onChange={(e) => this.onChange(e)}
                    className="form-control"
                  >
                    <option value="pie">Pie</option>
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                    <option value="area">Area</option>
                  </select>
                  <Chart type={this.state.chart_type} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class ViewTotalRegisterAdmission extends Component{
  constructor(props){
    super(props)
    this.state = {
      type:""
    }
  }
  componentDidMount(){
    var type = this.props.match.params.view_type
    if(type == "register" || type=="admission"){
      this.setState({
        type        
      })
      axios({
        url:"/api/v1/student/get-total/"+type
      }).then(response => {
        console.log(response.data)
      })
    }
  }
  render(){
    return(
     <div>
       <AdminStudentHeader
          mainHeader="Student"
          header="Report"
          sub_header="Student Class and Section Wise"
        />

     </div>
    )
  }
}
export const Chart  = ({file_name,title,type,dataPoints}) => {
  const options = {
      animationEnabled: true,
      exportFileName: file_name,
      theme: "light2",
      title:{
        text: title
      },
      exportEnabled: true,
      data: [{
        type: type,
        dataPoints: dataPoints
    }]
    };
  return(
      <CanvasJSChart options = {options} />
  )
}


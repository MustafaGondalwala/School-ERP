import React,{Component} from "react"
import { Link } from "react-router-dom"
import InlineError from "./messages/InlineError"
import validator from 'validator'
import Select from 'react-select'
import { AddTeacherForm, SelectTeacher } from "./utils"


export const AdminTeacherHeader =  ({mainHeader,header,sub_header}) => (
    <div className="header bg-primary pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
              <h6 className="h2 text-white d-inline-block mb-0">{mainHeader}</h6>
              <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li className="breadcrumb-item"><a href="#"><i className="fas fa-home" /></a></li>
                  <li className="breadcrumb-item"><a href="#">{header}</a></li>
                  {sub_header && 
                      <li className="breadcrumb-item active" aria-current="page">{sub_header}</li>
                    }
                </ol>
              </nav>
            </div>
            <div className="col-lg-6 col-5 text-right">
              <a href="#" className="btn btn-sm btn-neutral">New</a>
              <a href="#" className="btn btn-sm btn-neutral">Filters</a>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Total Teachers</h5>
                      <span className="h2 font-weight-bold mb-0">350</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                        <i className="ni ni-active-40" />
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Total Teacher Assigned</h5>
                      <span className="h2 font-weight-bold mb-0">2,356</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                        <i className="ni ni-chart-pie-35" />
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Total Teacher Present Today</h5>
                      <span className="h2 font-weight-bold mb-0">924</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                        <i className="ni ni-money-coins" />
                      </div>
                    </div>
                  </div>
               
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
)

export const ColComponent = ({title,description,link,button_text}) => (
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

export class AssignTeacher extends Component{
  constructor(props){
    super(props)
    this.state = {
      classes:[],
      teacher:[],
      subjects:[]
    }
   this.AssignTeacher = this.AssignTeacher.bind(this)
  }

  componentDidMount(){
      var check = []
      var self  = this;


      axios({
        method:"post",
        url:"/api/v1/subject/get-all-subjects"
      }).then(response => {
          self.setState({
            subjects:response.data.success.subjects
          })
      })

      axios({
        method:"post",
        url:"/api/v1/teacher/view-preferend-data"
      }).then(response=>{
        self.setState({
          teacher:(response.data.success.teacher)
        })
      })
      axios({
        method:"post",
        url:"/api/v1/class/get-all-classes"
      }).then((response)=>{
        self.setState({
          classes:(response.data.success.classes)
        })

      })
  }


  checkifavaibleforclasses(class_item,item){
    var returnString = ""    
    item.split(",").map(j => {
      if(j == class_item.id){
        returnString = returnString+class_item.class_title
      }
    })
    return returnString
  }
  checkifavaible(subject_item,item){
    var returnString = ""    
    item.split(",").map(j => {
      if(j == subject_item.id){
        returnString = returnString+subject_item.subject_name
      }
    })
    return returnString
  }

  AssignTeacher(e){
    var self = this;
    var teacher_id = e.target.value
    var class_id = e.target.getAttribute('classid')
    axios({
      url:"/api/v1/teacher/assign",
      method:"patch",
      data: {
        class_id,teacher_id
      }
    }).then(response=> {
      self.setState({
        teacher:response.data.success.teacher,
        classes:response.data.success.classes
      });
    })
  }
  render(){
    
    return(
      <div>
      {this.state.assigned_success && <button class="btn btn-success" data-toggle="notify" data-placement="top" data-align="center" data-type="success" data-icon="ni ni-bell-55">{this.state.assigned_success}</button> }
      
      <AdminTeacherHeader mainHeader="Teacher" header="Home"/>
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h3 className="h3">View Teacher Subject and Class Preference</h3>
              </div>
              <div className="card-body">

              <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr><td>ID</td>
                      <td>Name </td>
                      <td>Preferend Classes</td>
                      <td>Preferend Subject</td>
                      </tr>
                      {this.state.teacher.length>1 && this.state.teacher.map(function(item, key) {
                            return  <tr>
                              <td>{item.id}</td>
                              <td>{item.teacher_name}</td>
                              <td>{this.state.classes.map(i => {
                                  return <div>{this.checkifavaibleforclasses(i,item.teach_class)}</div>
                              })}</td>
                              <td>
                              {this.state.subjects.map(i => {
                                  return <div>{this.checkifavaible(i,item.teach_subject)}</div>
                              })}
                              </td>
                            </tr>
                        }.bind(this))}
                    </thead>
                  </table>
              </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h3 className="h3">Assign Teacher to Class <Link  to="/admin/teacher" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
              </div>
              <div className="card-body">
              <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr><td>ID</td>
                      <td>Class</td>
                      <td>Section</td>
                      <td>Assign Teacher</td></tr>


                      {this.state.classes.length>1 && this.state.classes.map(function(char, idx) {
                      return  <tr>
                        <td>{char.id}</td>
                        <td>{char.class_title}</td>
                        <td>{char.section}</td>
                        <td>
                        <select classid={char.id} onChange={(e) => this.AssignTeacher(e)} className="form-control">
                            <option defaultChecked>Select</option>
                            {this.state.teacher.length>1 && this.state.teacher.map(function(item, key) {
                                if(char.assign_teacher_id == item.id)
                                  return <option selected value={item.id}>{item.teacher_name}</option>
                                else
                                  return <option  value={item.id}>{item.teacher_name}</option>
                            }.bind(this))}
                        </select>
                        </td>
                      </tr>
                  }.bind(this))}

                    </thead>
                  </table>
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    )
  }
}


export class ProfileUpdateTeacher extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      "teacher_details":"",
      "teacher_id":""
    }
    this.onSelectTeacher = this.onSelectTeacher.bind(this)
    
  }
  onSelectTeacher(teacher_id){
    var self = this;
    axios({
      url:"/api/v1/teacher/"+teacher_id
    }).then(response => {
      self.setState({
        teacher_details:response.data.success.teacher_details
      })
    })
  }
  render(){
    return(
      <div>
        <AdminTeacherHeader mainHeader="Teacher" header="Profile Update"/>
        <div className="container-fluid mt--6">
          <SelectTeacher submit={this.onSelectTeacher} title="Select Teacher" back_link="/admin/teacher"/>
          <br />
          <br />
          <br />
          {this.state.teacher_details && <AddTeacherForm add_student_button_text={"Update"} title={"Teacher Update Profile"} back_link={"/admin/teacher"} teacher_details={this.state.teacher_details} />}
          

        </div>
      </div>
    )
  }
}



export class ViewAllTeacher extends Component{
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
      <div>
        <AdminTeacherHeader mainHeader="Teacher" header="View List"/>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0">View Teacher Info <Link  to="/admin/teacher" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
                  <div class="table-responsive py-4">
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

        </div>
      </div>
    )
  }
}


export class AddTeacherPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      add_student_button_text: "Register Teacher",
      server_error:{},
      register_user_message:false
    }
    this.submit = this.submit.bind(this)
  }
  submit(data){
    var self  = this
    self.setState({
            add_student_button_text:"Registering Teacher ...",
        })
    self.setState({
            register_user_message:false
    })
    const formData = new FormData();
    Object.keys(data).map((item)=>{
      formData.append(item,data[item])
    })
    axios({
      url:"/api/v1/teacher/add-teacher",
      method:"post",
      data:formData,
    }).then((response)=>{
      self.setState({
        add_student_button_text:"Register Teacher",
        server_error:{},
        register_user_message:true,

      })
    }).catch((error) => {
        self.setState({
            'server_error':error.response.data.errors,
        })
        self.setState({
            register_user_message:false
        })
        self.setState({
            add_student_button_text:"Register Teacher",
        })
    })
  }
  render(){
    return(
      <div>
          <AdminTeacherHeader mainHeader="Teacher" header="Home"/>
          <AddTeacherForm register_user_message={this.state.register_user_message} server_error={this.state.server_error} add_student_button_text={this.state.add_student_button_text} title="Add Teacher Form" back_link={"/admin/teacher"} submit={this.submit} />
      </div>
    )
  }
}





export const TeacherHomePage = () => (
    <div>
        <AdminTeacherHeader mainHeader="Teacher" header="Home"/>
		<div className="container-fluid mt--6">
            <div className="row">
                <ColComponent title="Add Teacher" description="Add Teacher in System" button_text="Add" link="/admin/teacher/add-teacher" />
                <ColComponent title="Assign Teacher" description="Assign Teacher to Class" button_text="Assign" link="/admin/teacher/assign-teacher" />
                <ColComponent title="Teacher List" description="View Total Teacher in System" button_text="View" link="/admin/teacher/view-all-teacher" />
                <ColComponent title="Profile Update" description="Update the Profile of Teacher" button_text="View" link="/admin/teacher/update-profile" />
                <ColComponent title="View Attendence" description="View Attendance" button_text="View" link="/admin/teacher/view-attendance" />
            </div>
        </div>
    </div>
)
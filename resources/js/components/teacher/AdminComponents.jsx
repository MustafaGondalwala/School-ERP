import React,{Component} from "react"
import { Link } from "react-router-dom"
import InlineError from "./messages/InlineError"
import validator from 'validator'
import Select from 'react-select'
import { AddTeacherForm, SelectTeacher } from "./utils"
import Swal from 'sweetalert2'
import DataTable, { createTheme } from 'react-data-table-component';
import AdminTeacherHeader from "./AdminTeacherHeader"


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
    this.removeTeacher = this.removeTeacher.bind(this) 
  }
  onSelectTeacher(teacher_id){
    axios({
      url:"/api/v1/teacher/"+teacher_id
    }).then(response => {
      this.setState({
        teacher_details:response.data.success.teacher_details
      })
    })
  }

  removeTeacher(){
    Swal.fire({
      title: 'Are you sure?',
      text: "All the Details Related Teacher will be Removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove Teacher!'
    }).then((result) => {
      if (result.value) {
        axios({
          url:"/api/v1/teacher",
          method:"delete",
          data: this.state.teacher_details
        }).then(response => {
            Swal.fire(response.data.success.message,"success");
            this.setState({teacher_details:""});
        }).catch(errors => {
          Swal.fire(
            'Validation Error !',
            errors.response.data.errors.message,
            'warning'
          )
        })
      }
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
          {this.state.teacher_details && <AddTeacherForm  removeTeacher={this.removeTeacher} add_student_button_text={"Update"} title={"Teacher Update Profile"} back_link={"/admin/teacher"} teacher_details={this.state.teacher_details} />}
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
    const columns = [
         {
              name: 'Emp Id.',
              selector: 'empid',
              sortable: true,
              width: 150
         },
         {
             name: 'Teacher Name',
             selector: 'teacher_name',
             sortable: true,
           },
           {
             name: 'Contact no.',
             selector: 'contact_no',
            sortable: true,
           },
           {
             name: 'Salary',
             selector: 'salary',
             sort: 'asc',
             sortable: true,
             width: 150
           }
      ];
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
                     <DataTable
                      title="Teacher List"
                      columns={columns}
                      pagination
                      data={this.state.rows}
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
      },() => {
        Swal.fire(
          'Added !',
          'New Teacher Added to System',
          'success'
        )
      })
      self.setState({
        'server_error': "",
      })
      self.setState({
        data:""
      })
    }).catch((error) => {
      self.setState({
        'server_error':error.response.data.errors,
      })
        self.setState({
            register_user_message:false,
            add_student_button_text:"Register Teacher",
        },() => {
          Swal.fire(
            'Validation Error !',
            'Validation Error occured in Form Submit',
            'warning'
          )
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
                <ColComponent title="Profile Update" description="Update the Profile of Teacher" button_text="Update" link="/admin/teacher/update-profile" />
            </div>
        </div>
    </div>
)
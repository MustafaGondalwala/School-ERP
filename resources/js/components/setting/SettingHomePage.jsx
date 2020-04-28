import React,{Component} from "react"
import AddClassForm from "./form/AddClassForm"
import AddSubjectForm from "./form/AddSubjectForm"
import AddSectionForm from "./form/AddSectionForm"

import AddFeesTypeForm from "./form/AddFeesTypeForm"
import AddExamTypeForm from "./form/AddExamTypeForm"
import AddMonthlyTestTypeForm from "./form/AddMonthlyTestTypeForm"
import UpdatePeriodModel from "./form/UpdatePeriodModel"





export default class SettingHomePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      classes:[],
      subjects:[],
      fees_type:[],
      class_period:[],
      errors:{},
      success:{},
    }
    this.submit_add_class = this.submit_add_class.bind(this)
    this.submit_add_subject = this.submit_add_subject.bind(this)
    this.submit_add_section = this.submit_add_section.bind(this)
    this.submit_add_fees_type = this.submit_add_fees_type.bind(this)
    this.submit_addupdate_period = this.submit_addupdate_period.bind(this)
    this.submit_add_exam_type = this.submit_add_exam_type.bind(this)
    this.submit_add_monthly_test = this.submit_add_monthly_test.bind(this)

  }
  componentDidMount(){
    var self = this
    axios({
      url:"/api/user"
    }).then(response=>{
      console.log(response.data)
    });


    axios({
      method:"post",
      url:"/api/v1/subject/get-all-subjects"
    }).then(response => {
      self.setState({
        subjects:response.data.success.subjects
      })
    })
    axios({
      url:"/api/v1/class/get-all-distinct-classes"
    }).then(response=>{
      self.setState({
        classes:response.data.success.classes
      })
    })

    axios({
      url:"/api/v1/time-table/get-class-period"
    }).then(response => {
      self.setState({
        class_period:response.data.success.class_period
      })
    })

    axios({
      url:"/api/v1/fee/get-all-fees-type"
    }).then(response=>{
      self.setState({
        fees_type:response.data.success.fees_type
      })
    })

    axios({
      url:"/api/v1/exam/get-exam-type"
    }).then(response => {
        self.setState({
        exam_type:response.data.success.exam_type
      })
    })

    axios({
      url:"/api/v1/exam/get-monthly-test-type"
    }).then(response => {
        self.setState({
        monthly_test:response.data.success.monthly_test
      })
    })

  }
  submit_add_class(data){
    var self = this
    axios({
      method:"post",
      url:"/api/v1/class/add-class",
      data:data
    }).then(response => {
      self.setState({
        classes:response.data.success.classes
      })
      self.setState({
        success: {"add_class":"Class Added Succesfully."},
        errors:{}
      })
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors
      })
    })
  }

  submit_add_subject(data){
    var self = this
    axios({
      method:"post",
      url:"/api/v1/subject/add-subject",
      data:data
    }).then(response => {
      self.setState({
        subjects:response.data.success.subjects
      })
      self.setState({
        success: {"subject_name":"Subject Added Succesfully."},
        errors:{}
      })
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors
      })
    })
  }

  submit_add_section(data){
    var self = this
    axios({
      method:"post",
      url:"/api/v1/class/add-section",
      data:data
    }).then(response => {
      self.setState({
        classes:response.data.success.classes
      })
      self.setState({
        success: {"section_name":"Section Added Succesfully."},
        errors:{}
      })
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors
      })
    })
  }
  submit_add_fees_type(data){
    var self = this
    axios({
      method:"post",
      url:"/api/v1/fee/add-fees-type",
      data:data
    }).then(response=>{
      self.setState({
        success: {"fees_type":"Fees Type Succesfully."},
        fees_type: response.data.success.fees_type,
        errors:{}
      })
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors
      })
    })
  }



  submit_addupdate_period(data){
    var self = this
    axios({
      method:"post",
      url:"/api/v1/time-table/update-class-period",
      data:data
    }).then(response => {
      self.setState({
        class_period:response.data.success.class_period
      })
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors
      })
    })
  }


  submit_add_exam_type(data){
    var self  = this
    axios({
      method:"post",
      data : data,
      url: "/api/v1/exam/add-exam-type"
    }).then(response => {
        self.setState({
        success: {"exam_type":"Exam Type Successfully."},
        exam_type: response.data.success.exam_type,
        errors:{}
      })
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors
      })
    })

  }


  submit_add_monthly_test(data){
    var self  = this
    axios({
      method:"post",
      data : data,
      url: "/api/v1/exam/add-monthly-test-type"
    }).then(response => {
        self.setState({
        success: {"monthly_test":"Monthly Test Type Successfully."},
        monthly_test: response.data.success.monthly_test,
        errors:{}
      })
    }).catch(error=>{
      self.setState({
        errors:error.response.data.errors
      })
    })
  }
  render(){
    return(
      <div className="container-fluid mt--6">
        <div className="row card-wrapper">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="h3 mb-0">Add Class</h5>
              </div>
              <div className="card-body">

              {this.state.errors.class_title && <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <span className="alert-icon"><i className="ni ni-like-2" /></span>
              <span className="alert-text"><strong>Warning!</strong> {this.state.errors.class_title}</span>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              </div>
              }
              {this.state.success.add_class && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Success!</strong> {this.state.success.add_class}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }

              <AddClassForm submit={this.submit_add_class}/>
              <br />
              <br />
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                        <td>ID</td>
                        <td>Class</td>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.classes && this.state.classes.map( (item,id) => {
                    return <tr>
                            <td>{id+1}</td>
                            <td>{item.class_title}</td>
                          </tr>
                  })
                  }
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="h3 mb-0">Add Subject</h5>
              </div>
              <div className="card-body">

              {this.state.errors.subject_name && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Warning!</strong> {this.state.errors.subject_name}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }
              {this.state.success.subject_name && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Success!</strong> {this.state.success.subject_name}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }

              <AddSubjectForm submit={this.submit_add_subject}/>
              <br />
              <br />
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                        <td>ID</td>
                        <td>Subject</td>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.subjects && this.state.subjects.map( (item,id) => {
                    return <tr>
                            <td>{id+1}</td>
                            <td>{item.subject_name}</td>
                          </tr>
                  })
                  }
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>


          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="h3 mb-0">Add Section</h5>
              </div>
              <div className="card-body">

              {this.state.errors.section_name && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Warning!</strong> {this.state.errors.section_name}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }
              {this.state.success.section_name && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Success!</strong> {this.state.success.section_name}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }

              <AddSectionForm classes={this.state.classes} submit={this.submit_add_section}/>
              <br />
              <br />
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                        <td>ID</td>
                        <td>Subject</td>
                        <td>Section</td>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.classes && this.state.classes.map( (item,id) => {
                    return <tr>
                            <td>{id+1}</td>
                            <td>{item.class_title}</td>
                            <td>{item.section}</td>
                          </tr>
                  })
                  }
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>


          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="h3 mb-0">Add Fees Type</h5>
              </div>
              <div className="card-body">

              {this.state.errors.fees_type && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Warning!</strong> {this.state.errors.fees_type}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }
              {this.state.success.section_name && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Success!</strong> {this.state.success.section_name}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }

              <AddFeesTypeForm classes={this.state.classes} submit={this.submit_add_fees_type}/>
              <br />
              <br />
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                        <td>ID</td>
                        <td>Fee Type</td>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.fees_type && this.state.fees_type.map( (item,id) => {
                    return <tr>
                            <td>{id+1}</td>
                            <td>{item.fees_type}</td>
                          </tr>
                  })
                  }
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>



           <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="h3 mb-0">Add Class Period <button type="button" className="btn btn-neutral float-right"  data-toggle="modal" data-target="#exampleModal">Add/Edit</button></h5>
              </div>
              <div className="card-body">
                <UpdatePeriodModel  submit={this.submit_addupdate_period}/>   
              
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                        <td>ID</td>
                        <td>Period ID</td>
                        <td>Start Time</td>
                        <td>End Time</td>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.class_period && this.state.class_period.map( (item,id) => {
                    return <tr>
                            <td>{id+1}</td>
                            <td>{item.period_id}</td>
                            <td>{item.start_time}</td>
                            <td>{item.end_time}</td>

                          </tr>
                  })
                  }
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>


          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="h3 mb-0">Add Exam Type</h5>
              </div>
              <div className="card-body">

              {this.state.errors.exam_type && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Warning!</strong> {this.state.errors.exam_type}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }
              {this.state.success.exam_type && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Success!</strong> {this.state.success.exam_type}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }

              <AddExamTypeForm classes={this.state.exam_type} submit={this.submit_add_exam_type} />

              <br />
              <br />
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                        <td>ID</td>
                        <td>Exam Type</td>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.exam_type && this.state.exam_type.map( (item,id) => {
                    return <tr>
                            <td>{id+1}</td>
                            <td>{item.exam_type}</td>
                          </tr>
                  })
                  }
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="h3 mb-0">Add Monthly Test Type</h5>
              </div>
              <div className="card-body">

              {this.state.errors.monthly_test && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Warning!</strong> {this.state.errors.monthly_test}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }
              {this.state.success.monthly_test && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <span className="alert-icon"><i className="ni ni-like-2" /></span>
                <span className="alert-text"><strong>Success!</strong> {this.state.success.monthly_test}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              }

              <AddMonthlyTestTypeForm monthly_test={this.state.monthly_test} submit={this.submit_add_monthly_test} />

              <br />
              <br />
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                        <td>ID</td>
                        <td> Monthly Test Type</td>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.monthly_test && this.state.monthly_test.map( (item,id) => {
                    return <tr>
                            <td>{id+1}</td>
                            <td>{item.monthly_test}</td>
                          </tr>
                  })
                  }
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>

          <div>

          </div>

        </div>
      </div>
    )
  }
}

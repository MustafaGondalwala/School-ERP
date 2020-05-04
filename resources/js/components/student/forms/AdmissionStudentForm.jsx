import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import InlineError from "../messages/InlineError"
import validator from 'validator'
import DateTimePicker from 'react-datetime-picker';


export default class AdmissionStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
          data: {
            admission_id:"",
            class:"",
            student_name:"",
            father_name:"",
            father_contact_no:"",
            dob:"",
            gender:"male",
            student_address:"",
            student_photo:"",
            religion:"hindu",
            caste:"general",
            age:"",
            section:""
          },
          errors: {},
          register_user_message:"",
          classes:[],
          section:[]
        };
  };
  onFileChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.files[0]}
    });
  }
  validate(data){
    const errors = {};
    if(!data.admission_id) errors.admission_id = "Can't be blank";
    if (!data.student_name) errors.student_name = "Can't be blank";
    if (!data.father_name) errors.father_name = "Can't be blank";
    if (!data.father_contact_no) errors.father_contact_no = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.student_address) errors.student_address = "Can't be blank";
    if (!data.class) errors.class = "Can't be blank";
    if (!data.age) errors.age = "Can't be blank";


    if (data.student_name.length < 3) errors.student_name = "Min. Length 3 char."
    if (data.father_name.length < 3) errors.father_name = "Min. Length 3 char."
    if (data.student_address.length < 3) errors.student_address = "Min. Length 5 char."
    if (data.father_contact_no.length != 10) errors.father_contact_no = "Invalid Contact No."
    if (!validator.isMobilePhone(data.father_contact_no) ) errors.father_contact_no = "Invalid Contact No."

    return errors;
  };

  onSubmit(e){
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });
    const formData = new FormData();
    Object.keys(this.state.data).map((item)=>{
      formData.append(item,this.state.data[item])
    })
    if (Object.keys(errors).length === 0) {
      console.log(this.state.data)
      this.props.submit(formData)
      this.makeInputNull()
    }
  }

  makeInputNull(){
  this.setState({
      data: {
            admission_id:"",
            class:"",
            student_name:"",
            father_name:"",
            father_contact_no:"",
            dob:"",
            gender:"male",
            student_address:"",
            student_photo:"",
            religion:"hindu",
            caste:"general",
            age:"",
            section:""
          }
    });  
  }
  onChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.value}
    });
  }

  changeClassSection(e){
    var value = e.target.value
    var value_by = []
    this.state.classes.map((item)=>{
      if(item.class_title == value){
        value_by.push(item.section)
      }
    })
    console.log(value_by)
    this.setState({
      section:value_by
    })
    this.setState({
      data: {...this.state.data,["class"]:value}
    })
    if(value_by.length > 1){
      this.setState({
        data: {...this.state.data,["section"]:value_by[0]}
      })
    }

  }


  componentWillReceiveProps(){
    this.setState({
      errors:this.props.server_error
    })  

  }

  componentDidMount(){
    var self = this
    axios({
      url:"/api/v1/class/get-all-distinct-classes"
    }).then(response=>{
        self.setState({
          classes:response.data.success.classes
        })
    })
  }
  render () {
    const { data, errors } = this.state;

    return (
      <div className="container-fluid mt--6">
       <div className="row">
         <div className="col-lg-12 col-md-12">
           <div className="card-wrapper">
             <div className="card">
               <div className="card-header">
                 <h3 className="mb-0">Admission Form <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link>
</h3>

               </div>
               <div className="card-body">

                {this.props.register_user_message &&
                  <div className="row">
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-icon"><i className="ni ni-like-2" /></span>
                        <span className="alert-text">
                        <div dangerouslySetInnerHTML={{__html: this.props.register_user_message}} >
                      </div>
                        </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                  </div>
                }
                 <div className="row">
                   <div className="col-md-2">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example3cols1Input">Admission Id.</label>
                       <input type="integer" className="form-control" name="admission_id"    value={data.admission_id} onChange={(e) =>this.onChange(e)} placeholder="Admission Id." />
                       {errors.admission_id && <InlineError text={errors.admission_id} />}
                     </div>
                   </div>
                   <div className="col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example3cols3Input">Class</label>
                                    <select class="form-control" value={data.class} name="class" onChange={(e) =>this.changeClassSection(e)}>
                                      <option>Select Class</option>
                                      {
                                        this.state.classes.length > 1 &&
                                        this.state.classes.map((item)=>{
                                          return <option  value={item.class_title}>{item.class_title}</option>
                                        })
                                      }
                                      </select>
                                      {errors.class && <InlineError text={errors.class} />}
                     </div>
                   </div>
                   <div className="col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example3cols3Input">Section</label>
                                    <select class="form-control" value={data.section} name="section" onChange={(e) =>this.onChange(e)}>
                                      {
                                        this.state.section &&
                                        this.state.section.map((item)=>{
                                          return <option  value={item}>{item}</option>
                                        })
                                      }
                                      </select>

                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example4cols1Input">Student Name</label>
                       <input type="text" className="form-control" placeholder="Student Name" name="student_name"    value={data.student_name} onChange={(e) =>this.onChange(e)} />
                       {errors.student_name && <InlineError text={errors.student_name} />}

                     </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example4cols2Input">Father's Name</label>
                       <input type="text" className="form-control"  placeholder="Father Name" name="father_name"    value={data.father_name} onChange={(e) =>this.onChange(e)} />
                       {errors.father_name && <InlineError text={errors.father_name} />}

                     </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Father's Contact No.</label>
                       <input type="decimal" className="form-control" name="father_contact_no"  placeholder="Father Contact No."  value={data.father_contact_no} onChange={(e) =>this.onChange(e)} />
                       {errors.father_contact_no && <InlineError text={errors.father_contact_no} />}

                     </div>
                   </div>

                 </div>
                 <div className="row">
                   <div className="col-sm-4 col-md-3">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">DoB</label>
                       <input type="date" className="form-control" name="dob"    value={data.dob} onChange={(e) =>this.onChange(e)} />
                       {errors.dob && <InlineError text={errors.dob} />}

                     </div>
                   </div>
                   <div className="col-sm-4 col-md-3">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Gender</label>
                       <select class="form-control" name="gender" value={data.gender} onChange={(e) =>this.onChange(e)} >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                      </select>
                      {errors.gender && <InlineError text={errors.gender} />}


                     </div>
                   </div>
                   <div className="col-sm-4 col-md-3">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Religoin</label>
                       <select class="form-control" name="religion" value={data.religion} onChange={(e) =>this.onChange(e)} >
                          <option value="hindu">Hindu</option>
                          <option value="muslim">Muslim</option>
                          <option value="sikh">Sikh</option>
                          <option value="jain">Jain</option>
                          <option value="buddhist">Buddhist</option>
                          <option value="other">Other</option>
                      </select>
                      {errors.religion && <InlineError text={errors.religion} />}
                     </div>
                   </div>
                   <div className="col-sm-4 col-md-3">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Caste</label>
                       <select class="form-control" name="caste" value={data.caste} onChange={(e) =>this.onChange(e)} >
                          <option value="general">General</option>
                          <option value="obc">OBC</option>
                          <option value="sc">SC</option>
                          <option value="st">ST</option>
                          <option value="other">Other</option>

                      </select>
                      {errors.caste && <InlineError text={errors.caste} />}


                     </div>
                   </div>
                 </div>

                   <div className="row">
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Student Address</label>
                         <input type="text" className="form-control" name="student_address" value={data.student_address} onChange={(e) =>this.onChange(e)} />
                         {errors.student_address && <InlineError text={errors.student_address} />}

                       </div>
                     </div>
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Age</label>
                         <input type="number" className="form-control" name="age" placeholder="Age" value={data.age} onChange={(e) =>this.onChange(e)} />
                         {errors.age && <InlineError text={errors.age} />}

                       </div>
                     </div>

                   </div>


                   <div className="row">
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Student Photo</label>
                         <input type="file" className="form-control" name="student_photo" onChange={(e) =>this.onFileChange(e)} />
                         {errors.student_photo && <InlineError text={errors.student_photo} />}
                       </div>
                     </div>

                     </div>



                     <div className="row">
                      <button class="btn btn-primary" onClick={e => this.onSubmit(e)} type="button">{this.props.add_button_text}</button>
                      <button class="btn btn-warning" type="button">Reset</button>

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

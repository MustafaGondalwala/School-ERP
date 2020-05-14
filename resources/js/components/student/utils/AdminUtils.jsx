import React, { Component } from "react"
import { Link } from 'react-router-dom'
import InlineError from "../messages/InlineError"
import validator from 'validator'
import DateTimePicker from 'react-datetime-picker';
import DataTable from 'react-data-table-component';
import Select from "react-select"


export  class SelectIndividualStudent extends Component{
  constructor(props){
    super(props)
    this.state = {
      student_list: [],
      student_id:"",
      errors_student_list:""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    var self = this
    axios({
      url:"/api/v1/student/get-all-searable-student"
    }).then(response=>{
      self.setState({
        student_list:response.data.success.student
      })
    })
  }
  handleInputChange(e){
    this.setState({
      student_id:e.value
    })
  };

  onSubmit(){
    if(this.state.student_id){
      this.setState({
          errors_student_list:""
      })
        this.props.submit(this.state.student_id,this.state.select_year)
    }else{
      this.setState({
        errors_student_list:"Please Select Student"
      })
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render(){
    const {errors_student_list} = this.state
    return(
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">{this.props.title} <Link  to={this.props.back_link} class="btn btn-neutral float-right" type="submit">Back</Link></h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Select Student</label>
                <Select options={this.state.student_list}  onChange={(e) =>this.handleInputChange(e)} />
                {errors_student_list && <InlineError  text={errors_student_list}/>}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                  <button className="btn btn-primary" onClick={(e)=>this.onSubmit()}>
                  {this.props.add_student_button_text_individual
                    ? <span>{this.props.add_student_button_text_individual}</span>
                    : <span>Fetch</span>
                  }
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export class RegisterStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
          section:[],
          distinct_classes:[],
          classes:[],
          data: {
            roll_no:"",
            class:"10th",
            student_name:"",
            father_name:"",
            mother_name:"",
            father_contact_no1:"",
            father_contact_no2:"",
            dob:"",
            gender:"male",
            student_address:"",
            place:"",
            block:"",
            district:"",
            state:"",
            pincode:"",
            landmark:"",
            student_photo:"",
            religion:"hindu",
            caste:"caste",
            age:"",
            father_photo:"",
            mother_photo:"",
            create_account:"1",
            send_sms:"0"
          },
          errors: {},
          register_user_message:"",
        };

    this.onChangeClasses = this.onChangeClasses.bind(this)
  };
  onFileChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.files[0]}
    });

  }
  validate(data){
    const errors = {};
    if (!data.roll_no) errors.roll_no = "Can't be blank";
    if (!data.age) errors.age = "Can't be blank";

    if (!data.student_name) errors.student_name = "Can't be blank";
    if (!data.father_name) errors.father_name = "Can't be blank";
    if (!data.father_contact_no1) errors.father_contact_no1 = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.religion) errors.religion = "Can't be blank";
    if (!data.caste) errors.caste = "Can't be blank";

    if (!data.student_address) errors.student_address = "Can't be blank";
    if (!data.place) errors.place = "Can't be blank";
    if (!data.pincode) errors.pincode = "Can't be blank";
    if (!data.class) errors.class = "Can't be blank";

    if (data.student_name.length < 3) errors.student_name = "Min. Length 3 char."
    if (data.father_name.length < 3) errors.father_name = "Min. Length 3 char."
    if (data.student_address.length < 3) errors.student_address = "Min. Length 5 char."
    if (data.father_contact_no1.length != 10) errors.father_contact_no1 = "Invalid Contact No."
    if (!validator.isMobilePhone(data.father_contact_no1) ) errors.father_contact_no1 = "Invalid Contact No."

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
      this.props.submit(this.state.data)
    }
  }


  componentDidMount(){
    var self = this

    if(this.props.student_info){
      self.setState({
        data:this.props.student_info
      })
    }
    axios({
      method:"post",
      url:"/api/v1/class/get-all-classes"
    }).then(response=>{

      const uniqueClasses = [];
      response.data.success.classes.map(item => {
          if (uniqueClasses.indexOf(item.class_title) === -1) {
              uniqueClasses.push(item.class_title)
          }
      });
      self.setState({
        classes:response.data.success.classes,
        distinct_classes:uniqueClasses
      });
    })
  }

  onChangeClasses(e){
    var value = e.target.value
    var value_by = []
    this.state.classes.map((item)=>{
      if(item.class_title == value){
        value_by.push(item.section)
      }
    })
    this.setState({
      section:value_by
    })
    this.setState({
      data: { ...this.state,["class"]:value}
    })
    this.onChange(e)
    if(value_by.length){
      this.setState({
        data: {...this.state.data,["section"]:value_by[0]},
      })
    }else{
      this.setState({
        data: {...this.state.data,["section"]:""},
        section:[]
      })
    }

  }

  makeInputValueNull(){
    this.setState({
      data: {
            roll_no:"",
            class:"",
            student_name:"",
            father_name:"",
            mother_name:"",
            father_contact_no1:"",
            father_contact_no2:"",
            dob:"",
            gender:"male",
            student_address:"",
            place:"",
            block:"",
            district:"",
            state:"",
            pincode:"",
            landmark:"",
            student_photo:"",
            religion:"hindu",
            caste:"caste",
            age:"",
            father_photo:"",
            mother_photo:"",
            create_account:"1",
            send_sms:"0"
          }
    });
  }


  componentWillReceiveProps(){
    this.setState({
      errors:this.props.server_error
    })  

    if(this.props.student_info){
      this.setState({
        data:this.props.student_info,
        errors:{}
      })
    }

    if(this.props.show_success_message){
      this.makeInputValueNull()
    }
  }
  onChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.value}
    });
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
                 <h3 className="mb-0">

                 {this.props.title ? <span>{this.props.title}</span> :
                      <span>Register Form</span> 
                 }

                 {this.props.hide_button ? <span></span> :
                    <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link>
                 }
            </h3>

               </div>
               <div className="card-body">
                {this.props.show_success_message &&
                  <div className="row">
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-icon"><i className="ni ni-like-2" /></span>
                        <span className="alert-text">
                          <div>Student Added Into System.</div>
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
                       <label className="form-control-label" htmlFor="example3cols1Input">Roll No.</label>
                       <input type="integer" disabled={this.props.student_info}  className="form-control" name="roll_no"    value={data.roll_no} onChange={(e) =>this.onChange(e)} placeholder="Roll No." />
                        
                       {errors.roll_no && <InlineError text={errors.roll_no} />}

                     </div>

                   </div>

                   <div className="col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example3cols3Input">Class</label>
                       <select class="form-control" value={data.class} name="class" onChange={(e) =>this.onChangeClasses(e)}>
                                          <option value="">Select Class</option>
                                        {this.state.distinct_classes.map(function(item){
                                          return <option value={item}>{item}</option>
                                        })}
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
                       <input type="text" className="form-control" name="student_name"  placeholder="Student Name" value={data.student_name} onChange={(e) =>this.onChange(e)} />
                       {errors.student_name && <InlineError text={errors.student_name} />}

                     </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example4cols2Input">Father's Name</label>
                       <input type="text" className="form-control"  name="father_name"  placeholder="Father Name"  value={data.father_name} onChange={(e) =>this.onChange(e)} />
                       {errors.father_name && <InlineError text={errors.father_name} />}

                     </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example4cols3Input">Mother's Name</label>
                       <input type="text" className="form-control" name="mother_name"  placeholder="Father Name"  value={data.mother_name} onChange={(e) =>this.onChange(e)} />
                       {errors.mother_name && <InlineError text={errors.mother_name} />}
                     </div>
                   </div>

                 </div>
                 <div className="row">
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Father's Contact No.1</label>
                       <input type="decimal" className="form-control" name="father_contact_no1" placeholder="Father's Contact No"   value={data.father_contact_no1} onChange={(e) =>this.onChange(e)} />
                       {errors.father_contact_no1 && <InlineError text={errors.father_contact_no1} />}

                     </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">Father's Contact No.2</label>
                       <input type="text" className="form-control" name="father_contact_no2"    value={data.father_contact_no2} onChange={(e) =>this.onChange(e)} />
                       {errors.father_contact_no2 && <InlineError text={errors.father_contact_no2} />}

                     </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">DoB</label>
                       <input type="date" className="form-control" name="dob"    value={data.dob} onChange={(e) =>this.onChange(e)} />
                       {errors.dob && <InlineError text={errors.dob} />}

                     </div>
                   </div>
                 </div>

                 <div className="row">
                   <div className="col-sm-6 col-md-4">
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
                   <div className="col-sm-6 col-md-2">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Age</label>
                    <input type="number" name="age" placeholder="Student Age" onChange={(e)=>this.onChange(e)} value={data.age} className="form-control"/>
                      {errors.age && <InlineError text={errors.age} />}
                     </div>
                   </div>
                   <div className="col-sm-6 col-md-2">
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
                   <div className="col-sm-6 col-md-2">
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
                         <input type="text" placeholder="Student Address" className="form-control" name="student_address" value={data.student_address} onChange={(e) =>this.onChange(e)} />
                         {errors.student_address && <InlineError text={errors.student_address} />}

                       </div>
                     </div>
                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Village/City</label>
                         <input type="text" placeholder="Village/City" className="form-control" name="place" value={data.place} onChange={(e) =>this.onChange(e)} />
                         {errors.place && <InlineError text={errors.place} />}

                       </div>
                     </div>

                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Block</label>
                         <input type="text" placeholder="Block" className="form-control" name="block" value={data.block} onChange={(e) =>this.onChange(e)} />
                         {errors.block && <InlineError text={errors.block} />}

                       </div>
                     </div>

                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">District</label>
                         <input type="text" className="form-control" placeholder="District" name="district" value={data.district} onChange={(e) =>this.onChange(e)} />
                         {errors.district && <InlineError text={errors.district} />}

                       </div>
                     </div>


                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">State</label>
                         <input type="text" className="form-control" placeholder="State" name="state" value={data.state} onChange={(e) =>this.onChange(e)} />
                         {errors.state && <InlineError text={errors.state} />}

                       </div>
                     </div>

                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Pincode</label>
                         <input type="text" className="form-control" placeholder="Pincode" name="pincode" value={data.pincode} onChange={(e) =>this.onChange(e)} />
                         {errors.pincode && <InlineError text={errors.pincode} />}

                       </div>
                     </div>

                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Landmark</label>
                         <input type="text" className="form-control" placeholder="Landmark" name="landmark" value={data.landmark} onChange={(e) =>this.onChange(e)} />
                         {errors.landmark && <InlineError text={errors.landmark} />}
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

                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Father Photo</label>
                         <input type="file" className="form-control"  name="father_photo" onChange={(e) =>this.onFileChange(e)} />
                       </div>
                     </div>

                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Mother Photo</label>
                         <input type="file" className="form-control"  name="mother_photo" onChange={(e) =>this.onFileChange(e)} />
                       </div>
                     </div>
                     </div>



                     {!this.props.student_info && 
                      <div className="row">
                       <div className="col-sm-6 col-md-2">
                         <div className="form-group">
                           <label className="form-control-label" htmlFor="example2cols1Input">Check for Sms Message</label>
                           <input type="checkbox" name="send_sms" data={data.send_sms} value="1" />
                         </div>
                       </div>
                       </div>
                     }
                     {!this.props.student_info && 

                       <div className="row">
                         <div className="col-sm-6 col-md-2">
                           <div className="form-group">
                           <input type="radio" value="1"    name="create_account" onChange={(e) =>this.onChange(e)} />
                             <label className="form-control-label" htmlFor="example2cols1Input">Create Account for Student and Parent</label>
                             <input type="radio" defaultChecked name="create_account" value="0" onChange={(e) =>this.onChange(e)} />
                             <label className="form-control-label" htmlFor="example2cols1Input">Do it later</label>
                           </div>
                         </div>
                         </div>
                       }
                     <div className="row">
                      <button class="btn btn-primary" onClick={e => this.onSubmit(e)} type="button">{this.props.add_student_button_text}</button>
                      {!this.props.student_info &&
                        <button class="btn btn-warning" onClick={e => this.makeInputValueNull(e)} type="button">Reset</button>
                      }
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

export class AdmissionStudentForm extends Component {
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
      this.props.submit(formData)
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
            },
            errors:{}
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
    if(this.props.register_user_message == true){
      this.makeInputNull()
    }
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
                 <h3 className="mb-0">Admission Form <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
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


export class ChangePassword extends Component{
  constructor(props){
    super(props)
    this.state = {
      new_password:"",
        change_password:"Change Password",
        setInputType:"password",
        isChecked: true,
        show_success_message:false
    }
    this.toggleChange = this.toggleChange.bind(this)
    this.ChangePassword = this.ChangePassword.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  ChangePassword(){
    var self = this;
    if(this.state.new_password.length <= 3)
      this.setState({
        error_new_password : "Password should be greater than 3 characters.",
        change_password:"Change Password"
      })
    else{
      this.setState({
        error_new_password:"",
        change_password:"Changing Password ..."
      })
      axios({
        url:"/api/v1/student/changepassword",
        method:"put",
        data: {
          new_password:this.state.new_password,
          student_id:this.props.student_id,
        }
      }).then(response => {

        if(response.data.success.password_change == true){
          self.setState({
            show_success_message:true,
            change_password:"Change Password",
            new_password:""
          })
        }
      })
    }
  }
  toggleChange(){
    this.setState({
      isChecked: !this.state.isChecked,
    });
    if(this.state.isChecked)
      this.setState({
        setInputType:"password"
      })
    else
      this.setState({
        setInputType:"text"
      })
  }
  componentWillReceiveProps(){
    this.setState({
      new_password:"",
      change_password:"Change Password",
      setInputType:"password",
      isChecked: true,
    })
  }
  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render(){
    return(
      <div className="col-md-8 center">
        <div className="row">
          <div className="form-group">
            <label>Student Roll No: {this.props.student_roll_no}</label>
          </div>
        </div>
        {this.state.show_success_message &&
                  <div className="row">
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-icon"><i className="ni ni-like-2" /></span>
                        <span className="alert-text">
                          <div>Student Password Changed.</div>
                        </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                  </div>
                }
        <div className="row">
          <div className="form-group">
            <label>New Password</label>
            <input type={this.state.setInputType} value={this.state.new_password} name="new_password" onChange={(e) => this.onChange(e)} className="form-control"/>
                {this.state.error_new_password && <InlineError  text={this.state.error_new_password}/>}
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label>View Password</label>
            <input type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange} name="password_change"/>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-warning"    onClick={(e)=> this.ChangePassword()}>{this.state.change_password}</button>
        </div>
      </div>
    )
  }
}




class GetClassID extends Component{
  constructor(props) {
      super(props);
      this.state = {
          section:[],
          distinct_classes:[],
          classes:[],
          errors:{},
          class_:"",
          section_:"",
      }
      this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount(){
      var self = this
      axios({
        method:"post",
        url:"/api/v1/class/get-all-classes"
      }).then(response=>{
        const uniqueClasses = [];
        response.data.success.classes.map(item => {
            if (uniqueClasses.indexOf(item.class_title) === -1) {
                uniqueClasses.push(item.class_title)
            }
        });
        self.setState({
          classes:response.data.success.classes,
          distinct_classes:uniqueClasses
        });
      })
  }


  onChangeClasses(e){
      var value = e.target.value
      var value_by = []
      this.state.classes.map((item)=>{
        if(item.class_title == value){
          value_by.push(item.section)
        }
      })
      this.setState({
          class_:e.target.value,
          section:value_by
      })
      if(value_by){
        this.setState({
          section_:value_by[0]
        })
      }
      else{
        this.setState({
          section_: "",
          section: [],
        })
      }
  }
  onChange(e){
      this.setState({
        [e.target.name]: e.target.value
      });
  }
  onSubmit(e){
    if(this.state.class_ != ""){
      this.state.classes.map(item => {
        if(item.class_title == this.state.class_ && item.section == this.state.section_){
          this.props.submit(item.id)
        }
      })
    }
    else{
      const errors = {}
      errors["class_"] = "Can't be Blank"
      this.setState({
        errors
      })
    }
  }
  render(){
    const { errors } = this.state
    return(   <div>
                <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                             <label className="form-control-label" htmlFor="example3cols3Input">Class</label>
                             <select class="form-control"  name="class_" onChange={(e) =>this.onChangeClasses(e)}>
                                      <option value="">Select Class</option>
                                              {this.state.distinct_classes.map(function(item){
                                                return <option value={item}>{item}</option>
                                              })}
                             </select>
                              {errors.class_ && <InlineError text={errors.class_} />}

                           </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                                    <label className="form-control-label" htmlFor="example3cols3Input">Section</label>
                                          
                                            {
                                              this.state.section && <select class="form-control" value={this.state.section_} name="section_" onChange={(e) =>this.onChange(e)}>
                                                {this.state.section.map((item)=>{
                                                  if(item != null)
                                                    return <option  value={item}>{item}</option>
                                                })
                                              }
                                              </select>
                                            }
                              {errors.section_ && <InlineError text={errors.section_} />}
                           </div>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <button className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>{this.props.button_text}</button>
                  </div>
                </div>
              </div>
    )
  }
}
export class StudentClassSectionWise extends Component{
  constructor(props){
    super(props)
    this.state = {
      button_text:"Fetch",
      students:[]
    }
    this.getClassStudents = this.getClassStudents.bind(this)
  }

  getClassStudents(class_id){
    this.setState({
      button_text:"Fetching ...",
      students:""
    })
    axios({
      url:"/api/v1/student/"+class_id
    }).then(response => {
      this.setState({
        button_text:"Fetch",
        students:response.data.success.students
      })
    })
  }

  handleChange(state){
    console.log('Selected Rows: ', state.selectedRows);
  };
  render(){
    const { errors } = this.state
    const columns = [
    {
      name: 'Roll No.',
      selector:'roll_no',
      sortable: true,
    },
    {
      name: 'Student Name',
      selector:'student_name',
      sortable: true,
    },{
      name: 'Father Name',
      selector:'father_name',
      sortable: true,
    },{
      name: 'Place',
      selector:'place',
      sortable: true,
    },{
      name: 'Info',
      cell: row => <div><button onClick={(e)=>alert(row.id)} className="btn btn-sm btn-primary">View</button></div>,
    }
  ];

    return(
        <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title mb-3">Student Class and Section Wise</h3>
                </div>
                <div className="card-body">
                  <GetClassID submit={this.getClassStudents} button_text={this.state.button_text}/>  
                  <br />
                  {this.state.students && 
                     <DataTable
                      title="Student Class and Section Wise"
                      selectableRows
                      onSelectedRowsChange={this.handleChange}
                      columns={columns}
                      pagination
                      data={this.state.students}
                    />
                  }
                </div>
              </div>
            </div>

          </div>
    )
  }
}
export class StudentCasteWise extends Component{
  constructor(props){
    super(props)
    this.state = {
      button_text:"Fetch"
    }
    this.getReligionCaste = this.getReligionCaste.bind(this)
  }
  getReligionCaste(data){
    this.setState({
      button_text:"Fetching ..."
    })
    axios({
      url:"/api/v1/student/bycaste",
      method:"post",
      data: data
    }).then(response => {
      this.setState({
        button_text:"Fetch",
        students:response.data.success.students
      })
      console.log(response.data.success.students)
    })
  }
  render(){
    const columns = [
    {
      name: 'Roll No.',
      selector:'roll_no',
      sortable: true,
    },
    {
      name: 'Student Name',
      selector:'student_name',
      sortable: true,
    },{
      name: 'Father Name',
      selector:'father_name',
      sortable: true,
    },
    {
      name: 'Place',
      selector:'place',
      sortable: true,
    },
    {
      name: 'Class',
      selector:'class',
      sortable: true,
    },
    {
      name: 'Section',
      selector:'section',
      sortable: true,
    }
    ,{
      name: 'Info',
      cell: row => <div><Link to="/admin/student/oneclick/" className="btn btn-sm btn-primary">View</Link></div>,
    }
  ];
    return(
      <div className="row">
        <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">Select Caste <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
          </div>
          <div className="card-body">
            <GetReligionCaste button_text={this.state.button_text} submit={this.getReligionCaste}/>
            {this.state.students && 
                     <DataTable
                      title="Student Class and Section Wise"
                      selectableRows
                      onSelectedRowsChange={this.handleChange}
                      columns={columns}
                      pagination
                      data={this.state.students}
                    />
                  }

          </div>
        </div>
        </div>
      </div>
    )
  }
}
class GetReligionCaste extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: {
        religion:"hindu",
        caste:"general"
      },
      errors : {}
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  onChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.value}
    });
  }
  onSubmit(){
    this.props.submit(this.state.data)
  }
  render(){
    const { data,errors } = this.state
    const { submit } = this.props
    return(
      <div>
        <div className="row">
          <div className="col-sm-6 col-md-2">
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
          <div className="col-sm-6 col-md-2">
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
        <div className="col-md-4">
        <button className="btn btn-primary" onClick={(e) => submit(data)}>{this.props.button_text}</button>
        </div>
        <div>
      </div>
      </div>
      </div>
    )
  }
}

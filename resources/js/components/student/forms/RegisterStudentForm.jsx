import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import InlineError from "../messages/InlineError"
import validator from 'validator'


export default class RegisterStudentForm extends Component {
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
    console.log(this.state.data)
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    const formData = new FormData();
    Object.keys(this.state.data).map((item)=>{
      formData.append(item,this.state.data[item])
    })
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data)
      this.makeInputValueNull()
     
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
      console.log(this.props.student_info)
      this.setState({})
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

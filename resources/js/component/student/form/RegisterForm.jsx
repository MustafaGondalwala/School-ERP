import React,{Component} from "react"
import {Link} from "react-router-dom"
import GetClassId from "../../utils/GetClassId"
import validator from 'validator'
import InlineError from "../../utils/InlineError"
import Swal from 'sweetalert2'


class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {
              roll_no:"snsms",
              student_name:"snsms",
              father_name:"snsms",
              mother_name:"snsms",
              father_contact_no1:"9586756273",
              father_contact_no2:"",
              dob:"2020-03-03",
              gender:"male",
              student_address:"9586756273",
              place:"9586756273",
              block:"9586756273",
              district:"9586756273",
              state:"9586756273",
              pincode:"9586756273",
              landmark:"9586756273",
              religion:"hindu", 
              caste:"general",
              age:"20",

              student_photo_preview:"",
              father_photo_preview:"",
              mother_photo_preview:"",
              send_sms:true,
              class_id:""
            },
            student_photo:null,
            father_photo:null,
            mother_photo:null,
            errors: {},
        };
        this.getClassId = this.getClassId.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }  

    
    onFileChange(e){
      var name = e.target.name;
      var preview_name = name+"_preview"
      this.setState({
        [name]:e.target.files[0],
        data: {...this.state.data,[preview_name]:URL.createObjectURL(e.target.files[0])},
        data: {...this.state.data,[name]:e.target.files[0]}
      })
    }
    getClassId(class_id){
      this.setState({
        data: {...this.state.data,"class_id": class_id}
      })
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
      if(this.props.student_info)
        if (!data.class_id) errors.class_id = "Can't be blank";
  
      if (data.student_name.length < 3) errors.student_name = "Min. Length 3 char."
      if (data.father_name.length < 3) errors.father_name = "Min. Length 3 char."
      if (data.student_address.length < 3) errors.student_address = "Min. Length 5 char."
      if (data.father_contact_no1.length != 10) errors.father_contact_no1 = "Invalid Contact No."
      if (!validator.isMobilePhone(data.father_contact_no1) ) errors.father_contact_no1 = "Invalid Contact No."
  
      return errors;
    };
    onSubmit(e){
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      const formData = new FormData();
      var data = this.state.data
      data.student_photo = this.state.student_photo
      data.father_photo = this.state.father_photo
      data.mother_photo = this.state.mother_photo
      Object.keys(this.state.data).map((item)=>{
        formData.append(item,this.state.data[item])
      })
      if (Object.keys(errors).length === 0) {
        this.props.submit(formData).then(() => {
          this.makeInputValueNull()
        }).catch(error => {
                if(error.response.status == 422){
                  this.setState({
                    errors:error.response.data.errors
                 })                  
                  Swal.fire("Validation Errro Occured. Please validated","Validation Error","warning");
                }
            })
      }
    }
    componentDidMount(){
      var self = this
      if(this.props.student_info){
        self.setState({
          data:this.props.student_info
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
              religion:"hindu",
              caste:"caste",
              age:"",
              student_photo:"",
              student_photo_preview:"",
              father_photo:"",
              father_photo_preview:"",
              mother_photo:"",
              mother_photo_preview:"",
              create_account:"1",
              send_sms:"0"
            }
      });
    }
    
    onChange(e){
      this.setState({
        data: {...this.state.data,[e.target.name]:e.target.value}
      });
    }
    
    onChangeCheckbox(e){
      this.setState({
        data: {...this.state.data,"send_sms": e.target.checked}
      })
    }

    render () {
      const { data, errors } = this.state;
      const {title} = this.props
      return (
        <div className="container-fluid mt--6">
         <div className="row">
           <div className="col-lg-12 col-md-12">
             <div className="card-wrapper">
               <div className="card">
                 <div className="card-header">
                   <h3 className="mb-0">
                        <span>{title}</span>
  
                   {this.props.hide_button ? <span></span> :
                      <Link  to="/admin/student" className="btn btn-neutral float-right" type="submit">Back</Link>
                   }
              </h3>
  
                 </div>
                 <div className="card-body">
  
                   <div className="row">
                     <div className="col-md-2">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example3cols1Input">Roll No.</label>
                         <input type="integer" disabled={this.props.student_info}  className="form-control" name="roll_no"    value={data.roll_no} onChange={(e) =>this.onChange(e)} placeholder="Roll No." />
                         {errors.roll_no && <InlineError text={errors.roll_no} />}
                       </div>
                     </div>
                   </div>
                  {data.id ? <div>
                        <div className="row">
                         <div className="col-sm-6 col-md-4">
                           <div className="form-group">
                              <label>Class:</label>
                              <input disabled type="text" value={data.class} className="form-control"/>
                           </div>
                         </div>
                        </div>
                        <div className="row">
                         <div className="col-sm-6 col-md-4">
                           <div className="form-group">
                              <label>Section:</label>
                              <input disabled type="text" value={data.section} className="form-control"/>
                           </div>
                         </div>
                        </div>
                        
                        </div>
                  : <div><GetClassId 
                      errors={errors}
                      sendClassId={this.getClassId}
                    /></div>
                     }
                   
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
                           {data.student_photo_preview && <img className="img-fluid" src={data.student_photo_preview}/>}
                         </div>
                       </div>
                  
                       <div className="col-sm-6 col-md-4">
                         <div className="form-group">
                           <label className="form-control-label" htmlFor="example2cols1Input">Father Photo</label>
                           <input type="file" className="form-control"  name="father_photo" onChange={(e) =>this.onFileChange(e)} />
                           {data.father_photo_preview && <img className="img-fluid" src={data.father_photo_preview}/>}
                          
                         </div>
                       </div>
  
                       <div className="col-sm-6 col-md-4">
                         <div className="form-group">
                           <label className="form-control-label" htmlFor="example2cols1Input">Mother Photo</label>
                           <input type="file" className="form-control"  name="mother_photo" onChange={(e) =>this.onFileChange(e)} />
                           {data.mother_photo_preview && <img className="img-fluid" src={data.mother_photo_preview}/>}
                          
                         </div>
                       </div>
                       </div>
  
  
  
                       {!this.props.student_info && 
                        <div className="row">
                         <div className="col-sm-6 col-md-2">
                           <div className="form-group">
                             <label className="form-control-label" htmlFor="example2cols1Input">Check for Sms Message</label>
                             <input type="checkbox" name="send_sms" onChange={e => this.onChangeCheckbox(e)} data={data.send_sms} value="1" />
                           </div>
                         </div>
                         </div>
                       }
                       <div className="row">
                        <button class="btn btn-primary" onClick={e => this.onSubmit(e)} type="button">{this.props.button_text}</button>
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


export default RegisterForm
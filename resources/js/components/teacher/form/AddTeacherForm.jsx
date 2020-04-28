import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import InlineError from "../messages/InlineError"
import validator from 'validator'
import Select from 'react-select';

export default class AddTeacherForm extends Component {
  constructor(props) {
    super(props);
        var date = new Date();
        var today_date = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
    this.state = {
          data: {
            empid: "19",
            teacher_name: "19mmm",
            gender: "male",
            relative_name: "19mmm",
            email: "19",
            contact_no: "9586756273",
            qualification: "19",
            address: "19msmsmsmm",
            dob: "29039",
            blood_group: "",
            teach_subject: "19",
            teach_class: "19",
            date_of_join: "1111-11-11",
            pan_card_no: "",
            aadhar_no: "",
            bank_name: "",
            bank_account_no: "",
            bank_ifc_no: "",
            pf_no: "",
            pf_amount: "",
            da_amount: "",
            hra_amount: "",
            remark: "",
            casual_leave: "",
            sick_leave: "",
            pay_earn_leave: "",
            other_leave: "",
            create_account: "1",
            teacher_photo: "",
            id_proof: "",
            experience_letter: "",
            other_document1: "",
            other_document2: "",
            salary: "19",

          },
          subjects:[],
          classes:[],
          errors: {},
          register_user_message:"",
          today_date:today_date
        };
  };
  onFileChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.files[0]}
    });

  }
  validate(data){
    const errors = {};
    if (!data.empid) errors.empid = "Can't be blank";
    if (!data.teacher_name) errors.teacher_name = "Can't be blank";
    if (!data.gender) errors.gender = "Can't be blank";
    if (!data.relative_name) errors.relative_name = "Can't be blank";
    if (!data.email) errors.email = "Can't be blank";
    if (!data.contact_no) errors.contact_no = "Can't be blank";
    if (!data.qualification) errors.qualification = "Can't be blank";
    if (!data.address) errors.address = "Can't be blank";
    if (!data.salary) errors.salary = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.teach_class) errors.teach_class = "Can't be blank";
    if (!data.teach_subject) errors.teach_subject = "Can't be blank";
    if (!data.date_of_join) errors.date_of_join = "Can't be blank";

    if (data.teacher_name.length < 3) errors.teacher_name = "Min. Length 3 char."
    if (data.relative_name.length < 3) errors.relative_name = "Min. Length 3 char."
    if (data.address.length < 3) errors.address = "Min. Length 5 char."
    if (data.contact_no.length != 10) errors.contact_no = "Invalid Contact No."
    if (!validator.isMobilePhone(data.contact_no) ) errors.contact_no = "Invalid Contact No."



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
  ResetForm(e){
    const data = {
      empid:"",
      teacher_name:"",
      gender:"male",
      relative_name:"",
      email:"",
      contact_no:"",
      qualification:"",
      address:"",
      dob:"",
      blood_group:"",
      teach_subject:"",
      teach_class:"",
      date_of_join:"",
      pan_card_no:"",
      aadhar_no:"",
      bank_name:"",
      bank_account_no:"",
      bank_ifc_no:"",
      pf_no:"",
      pf_amount:"",
      da_amount:"",
      hra_amount:"",
      remark:"",
      casual_leave:"",
      sick_leave:"",
      pay_earn_leave:"",
      other_leave:"",
      create_account:"1",
      teacher_photo:"",
      id_proof:"",
      experience_letter:"",
      id_proof:"",
      other_document1:"",
      other_document2:"",
      salary:""
      };
    this.setState({data:data})
  }


  componentDidMount(){
    var self = this
    axios({
      method:"post",
      url:"/api/v1/subject/get-all-subjects"
    }).then(response => {

      var preferend = [];
      response.data.success.subjects.map(item => {
        preferend.push({value:item.id,label:item.subject_name})
      })
      self.setState({subjects : preferend})
    })



    axios({
      url:"/api/v1/class/get-all-distinct-classes"
    }).then(response => {

      var preferend = [];
      response.data.success.classes.map(item => {
        if(item.section == null)
         preferend.push({value:item.id,label:item.class_title})
        else
         preferend.push({value:item.id,label:item.class_title+" ["+item.section+"]"})
      })
      self.setState({classes : preferend})
    })
  }


  handleInputChange(data,name){
    var new_value = ""
    data.map(i => {
      if(new_value == "")
        new_value = i.value
      else
        new_value = new_value + "," + i.value
    })
    this.setState({
      data: {...this.state.data,[name]:new_value}
    })
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
                 <h3 className="mb-0">Teacher Form <Link  to="/admin/student" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
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
                <h3 style={{color:"#ae5856"}}>Personal Detail:</h3>
                <br />
                <div className="row">
                   <div className="col-md-2">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example3cols1Input">Emp Id</label>
                       <input type="integer" className="form-control" name="empid"    value={data.empid} onChange={(e) =>this.onChange(e)} placeholder="Emp id." />
                       {errors.empid && <InlineError text={errors.empid} />}
                     </div>

                   </div>

                   <div className="col-md-3">
                      <div className="form-group">
                   <label className="form-control-label" htmlFor="example3cols1Input">Teacher Name</label>
                      <div className="input-group input-group-merge">

                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user" />
                          </span>
                        </div>
                        <input className="form-control" placeholder="Teacher Name"  name="teacher_name" value={data.teacher_name} onChange={(e) =>this.onChange(e)}   type="text" />
                        {errors.teacher_name && <InlineError text={errors.teacher_name} />}

                      </div>
                      </div>
                   </div>

                   <div className="col-sm-3 col-md-2">
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

                   <div className="col-md-3">
                      <div className="form-group">
                      <label className="form-control-label" htmlFor="example3cols1Input">Husband/Father Name</label>
                      <div className="input-group input-group-merge">

                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user" />
                          </span>
                        </div>
                        <input className="form-control" placeholder="Husband/Father Name"  name="relative_name" value={data.relative_name} onChange={(e) =>this.onChange(e)}   type="text" />
                        {errors.relative_name && <InlineError text={errors.relative_name} />}

                      </div>
                      </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-sm-6 col-md-4">
                      <div className="form-group">
                      <label className="form-control-label" htmlFor="example3cols1Input">Email</label>
                      <div className="input-group input-group-merge">

                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-envelope" />
                          </span>
                        </div>
                        <input className="form-control" placeholder="Email"  name="email" value={data.email} onChange={(e) =>this.onChange(e)}   type="text" />
                        {errors.email && <InlineError text={errors.email} />}
                      </div>
                   </div>
                   </div>

                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Contact No.</label>
                       <input type="decimal" className="form-control" name="contact_no" placeholder="Contact No."  value={data.contact_no} onChange={(e) =>this.onChange(e)} />
                       {errors.contact_no && <InlineError text={errors.contact_no} />}

                     </div>
                   </div>

                 </div>
                 <div className="row">
                 <div className="col-sm-6 col-md-4">
                   <div className="form-group">
                     <label className="form-control-label" htmlFor="example2cols2Input">Address</label>
                     <input type="text" className="form-control" name="address"  placeholder="Address"  value={data.address} onChange={(e) =>this.onChange(e)} />
                     {errors.address && <InlineError text={errors.address} />}

                   </div>
                 </div>

                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols1Input">Qualification</label>
                       <input type="decimal" className="form-control" name="qualification"  placeholder="Qualification"  value={data.qualification} onChange={(e) =>this.onChange(e)} />
                       {errors.qualification && <InlineError text={errors.qualification} />}
                     </div>
                   </div>

                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">Dob</label>
                       <input
  className="form-control datepicker"
  placeholder="Select date"
  type="text" name="dob"  value={data.dob} onChange={(e) =>this.onChange(e)}
/>
                       {errors.dob && <InlineError text={errors.dob} />}
                     </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                     <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">Blood Group</label>
                       <input type="text" className="form-control" name="blood_group" placeholder="Blood Group" value={data.blood_group} onChange={(e) =>this.onChange(e)} />
                       {errors.blood_group && <InlineError text={errors.blood_group} />}
                     </div>
                   </div>
                 </div>
                 <h3 style={{color:"#ae5856"}}>Documents:</h3>

                 <div className="row">



                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                        <label className="form-control-label" htmlFor="example2cols2Input">
                         Teacher Photo
                         </label>
                         <input type="file" className="form-control"  name="teacher_photo" onChange={(e) =>this.onFileChange(e)} />
                         </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">
                        Experience letter
                         </label>
                         <input type="file" className="form-control"  name="experience_letter" onChange={(e) =>this.onFileChange(e)} />
                         </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">
                        ID Proof
                         </label>
                         <input type="file" className="form-control"  name="id_proof" onChange={(e) =>this.onFileChange(e)} />
                         </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">
                        Other Document 1
                         </label>
                         <input type="file" className="form-control"  name="other_document1" onChange={(e) =>this.onFileChange(e)} />
                         </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                       <label className="form-control-label" htmlFor="example2cols2Input">
                        Other Document 2
                         </label>
                         <input type="file" className="form-control"  name="other_document2" onChange={(e) =>this.onFileChange(e)} />
                         </div>
                      </div>
                   </div>
                   <h3 style={{color:"#ae5856"}}>Documents Details:</h3>

                   <div className="row">
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Date of Joining</label>
                         <input type="date" className="form-control" name="date_of_join" value={data.date_of_join} defaultValue={this.today_date} placeholder="Date of Joining" onChange={(e) =>this.onChange(e)} />
                         {errors.date_of_join && <InlineError text={errors.date_of_join} />}
                       </div>
                     </div>
                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Teaching Class</label>
                          <Select
                          isMulti
                          name="teach_class"
                          onChange={(e) =>this.handleInputChange(e,"teach_class")}
                          options={this.state.classes}
                          className="basic-multi-select"
                          classNamePrefix="select"
                         />

                         {errors.teach_class && <InlineError text={errors.teach_class} />}

                       </div>
                     </div>

                     <div className="col-sm-6 col-md-3">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Teaching Subject</label>
                         
                         <Select
                          isMulti
                          name="teach_subject"
                          onChange={(e) =>this.handleInputChange(e,"teach_subject")}
                          options={this.state.subjects}
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                         {errors.teach_subject && <InlineError text={errors.teach_subject} />}

                       </div>
                     </div>

                   </div>

                   <h3 style={{color:"#ae5856"}}>Salary Details:</h3>

                     <div className="row">
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Pan Card No.</label>
                         <input type="text" className="form-control" name="pan_card_no" value={data.pan_card_no} placeholder="Pan Card No." onChange={(e) =>this.onChange(e)} />
                         {errors.pan_card_no && <InlineError text={errors.pan_card_no} />}
                       </div>
                     </div>
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols2Input">Salary</label>
                         <input type="text" className="form-control" name="salary" value={data.salary} placeholder="Salary" onChange={(e) =>this.onChange(e)} />
                         {errors.salary && <InlineError text={errors.salary} />}
                       </div>
                     </div>

                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Aadhar No</label>
                         <input type="text" className="form-control"  name="aadhar_no" placeholder="Aadhar No" onChange={(e) =>this.onChange(e)}/>
                         {errors.aadhar_no && <InlineError text={errors.aadhar_no} />}

                       </div>
                     </div>


                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Bank Name</label>
                         <input type="text" className="form-control" placeholder="Bank Name"  name="bank_name" onChange={(e) =>this.onChange(e)}/>
                         {errors.bank_name && <InlineError text={errors.bank_name} />}

                       </div>
                     </div>
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Bank Account No.</label>
                         <input type="text" className="form-control"  name="bank_account_no" placeholder="Bank Account No." onChange={(e) =>this.onChange(e)}/>
                         {errors.bank_account_no && <InlineError text={errors.bank_account_no} />}
                       </div>
                     </div>
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Bank IFC No.</label>
                         <input type="text" className="form-control"  name="bank_ifc_no" placeholder="Bank IFC No." onChange={(e) =>this.onChange(e)}/>
                         {errors.bank_ifc_no && <InlineError text={errors.bank_ifc_no} />}
                       </div>
                     </div>

                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">PF No.</label>
                         <input type="text" className="form-control"  name="pf_no" placeholder="PF No." onChange={(e) =>this.onChange(e)}/>
                         {errors.pf_no && <InlineError text={errors.pf_no} />}
                       </div>
                     </div>
                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">PF Amount</label>
                         <input type="number" className="form-control"  name="pf_amount" placeholder="PF Amount" onChange={(e) =>this.onChange(e)}/>
                         {errors.pf_amount && <InlineError text={errors.pf_amount} />}
                       </div>
                     </div>


                     <div className="col-sm-6 col-md-4">
                       <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">TDS Amount</label>
                         <input type="number" className="form-control"  name="tds_amount" placeholder="TDS Amount" onChange={(e) =>this.onChange(e)}/>
                         {errors.tds_amount && <InlineError text={errors.tds_amount} />}
                         </div>
                       </div>

                     <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Professional TAX Amount Monthly</label>
                         <input type="number" className="form-control"  name="protax_amount" placeholder="TProfessional TAX Amount Monthly" onChange={(e) =>this.onChange(e)}/>
                         {errors.protax_amount && <InlineError text={errors.protax_amount} />}
                         </div>
                     </div>
                     <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">DA Amount Monthly</label>
                         <input type="number" className="form-control"  name="da_amount" placeholder="DA Amount Monthly" onChange={(e) =>this.onChange(e)}/>
                         {errors.datax_amount && <InlineError text={errors.datax_amount} />}
                         </div>
                     </div>
                     <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">HRA Amount Monthly</label>
                         <input type="number" className="form-control"  name="hra_amount" placeholder="HRA Amount Monthly" onChange={(e) =>this.onChange(e)}/>
                         {errors.hra_amount && <InlineError text={errors.hra_amount} />}
                         </div>
                     </div>

                     <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                         <label className="form-control-label" htmlFor="example2cols1Input">Remark</label>
                         <input type="text" className="form-control"  name="remark" placeholder="Remark" onChange={(e) =>this.onChange(e)}/>
                         {errors.remark && <InlineError text={errors.remark} />}
                         </div>
                     </div>

                     </div>
                     <h3 style={{color:"#ae5856"}}>Leave Details:</h3>
                     <div className="row">
                         <div className="col-sm-6 col-md-4">
                           <div className="form-group">
                          <label className="form-control-label" htmlFor="example2cols2Input">Casual Leave</label>
                            <input type="number" className="form-control" placeholder="Casual Leave"  name="casual_leave" onChange={(e) =>this.onChange(e)} />
                            {errors.casual_leave && <InlineError text={errors.casual_leave} />}
                            </div>
                         </div>

                         <div className="col-sm-6 col-md-4">
                           <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">Pay/Earn Leave</label>
                            <input type="number" className="form-control" placeholder="Pay/Earn Leave"  name="pay_earn_leave" onChange={(e) =>this.onChange(e)} />
                            {errors.pay_earn_leave && <InlineError text={errors.pay_earn_leave} />}
                            </div>
                         </div>

                         <div className="col-sm-6 col-md-4">
                           <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">Sick Leave</label>
                            <input type="number" className="form-control" placeholder="Sick Leave"  name="sick_leave" onChange={(e) =>this.onChange(e)} />
                            {errors.sick_leave && <InlineError text={errors.sick_leave} />}
                            </div>
                         </div>

                         <div className="col-sm-6 col-md-4">
                           <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">Other Leave</label>
                            <input type="number" className="form-control" placeholder="Other Leave"  name="other_leave" onChange={(e) =>this.onChange(e)} />
                            {errors.other_leave && <InlineError text={errors.other_leave} />}
                            </div>
                         </div>
                     </div>



                     <div className="row">
                       <div className="col-sm-6 col-md-2">
                         <div className="form-group">
                           <label className="form-control-label" htmlFor="example2cols1Input">Check for Sms Message</label>
                           <input type="checkbox" />
                         </div>
                       </div>
                       </div>

                       <div className="row">
                         <div className="col-sm-6 col-md-2">
                           <div className="form-group">
                           <input type="radio" value="0"    name="create_account" onChange={(e) =>this.onChange(e)} />

                             <label className="form-control-label" htmlFor="example2cols1Input">Create Account for Teacher</label>
                             <input type="radio" defaultChecked name="create_account" value="1" onChange={(e) =>this.onChange(e)} />

                             <label className="form-control-label" htmlFor="example2cols1Input">Create Account Link for Teacher</label>
                             <input type="radio" value="2" name="create_account" onChange={(e) =>this.onChange(e)} />

                             <label className="form-control-label" htmlFor="example2cols1Input">Do it later</label>
                           </div>
                         </div>
                         </div>
                     <div className="row">
                      <button class="btn btn-primary" onClick={e => this.onSubmit(e)} type="button">Add</button>
                      <button class="btn btn-warning" onClick={e => this.ResetForm(e)} type="button">Reset</button>

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

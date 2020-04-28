import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import InlineError from "./message/InlineError"
import validator from 'validator'

export default class addPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
          data: {
            registration_no:"1003",
            student_type: "old",
            class:"UKG",
            student_name:"mustafa Gondalwala",
            father_name:"khuzema Gondalwala",
            mother_name:"khuzema Gondalwala",
            father_contact_no1:"9586756273",
            father_contact_no2:"958675263",
            student_email:"student@gmail.com",
            father_email:"father@gmail.com",
            dob:"2020-03-03",
            date_of_admission:"",
            gender:"male",
            registration_fees:"3000",
            student_address:"sidhpur",
            place:"sidhpur",
            block:"sidhpur",
            district:"sidhpur",
            state:"sidhpur",
            pincode:"384151",
            landmark:"sidhpur",
            student_photo:"",
            father_photo:"",
            mother_photo:"",
            create_account:"1"
          },
          errors: {},
          register_user_message:""
        };
  };


  onFileChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.files[0]}
    });

  }
  validate(data){
    const errors = {};
    if (!data.registration_no) errors.registration_no = "Can't be blank";
    if (!data.student_name) errors.student_name = "Can't be blank";
    if (!data.father_name) errors.father_name = "Can't be blank";
    if (!data.father_contact_no1) errors.father_contact_no1 = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.student_address) errors.student_address = "Can't be blank";
    if (!data.place) errors.place = "Can't be blank";
    if (!data.pincode) errors.pincode = "Can't be blank";
    if (!data.student_photo) errors.student_photo = "Can't be blank";
    if (!data.class) errors.class = "Can't be blank";
    if (!data.father_email) errors.father_email = "Can't be blank";
    if (!data.student_email) errors.student_email = "Can't be blank";


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
      self  = this
      axios({
        url:"/api/student/add-student",
        method:"post",
        data:formData,
      }).then(response => {
          var data = response.data[0]

          if(data.success.another_type == 1){
            var student_link = data.success.student_link;
            var father_link = data.success.father_link;
            var message = "<strong>Student Created</strong>    "+"<a href="+student_link+">Student Link</a>   <a href="+father_link+">Father Link</a>";
            this.setState({
              register_user_message:message
            })
          }
          if( data.success.another_type == 0){
            var message = "<strong>Student Created</strong> ";
            this.setState({
              register_user_message:message
            })
          }
          if(data.success.another_type == 2 ){
            var message = "<strong>Student Created</strong> ";
            this.setState({
              register_user_message:message
            })
          }
          self.makeInputValueNull();
      })
    }
  }
  makeInputValueNull(){
    this.setState({
      data: {...this.state.data,['registration_no']:""},
      data: {...this.state.data,['student_name']:""},
      data: {...this.state.data,['father_name']:""},
      data: {...this.state.data,['mother_name']:""},
      data: {...this.state.data,['father_contact_no1']:""},
      data: {...this.state.data,['father_contact_no2']:""},
      data: {...this.state.data,['student_email']:""},
      data: {...this.state.data,['father_email']:""},
      data: {...this.state.data,['dob']:""},
      data: {...this.state.data,['date_of_admission']:""},
      data: {...this.state.data,['registration_fees']:""},
      data: {...this.state.data,['student_address']:""},
      data: {...this.state.data,['place']:""},
      data: {...this.state.data,['district']:""},
      data: {...this.state.data,['state']:""},
      data: {...this.state.data,['pincode']:""},
      data: {...this.state.data,['landmark']:""},
      data: {...this.state.data,['student_photo']:""},
      data: {...this.state.data,['father_photo']:""},
      data: {...this.state.data,['mother_photo']:""},
    });
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
                  {/* Card header */}
                  <div className="card-header">
                    <h3 className="mb-0">Register Form</h3>
                  </div>
                  <div className="card-body">
                   {this.state.register_user_message &&
                     <div className="row">
                         <div className="alert alert-success alert-dismissible fade show" role="alert">
                           <span className="alert-icon"><i className="ni ni-like-2" /></span>
                           <span className="alert-text">
                           <div dangerouslySetInnerHTML={{__html: this.state.register_user_message}} >
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
                          <label className="form-control-label" htmlFor="example3cols1Input">Registration No.</label>
                          <input type="integer" className="form-control" name="registration_no"    value={data.registration_no} onChange={(e) =>this.onChange(e)} placeholder="Registration No." />
                          {errors.registration_no && <InlineError text={errors.registration_no} />}

                        </div>

                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example3cols2Input">Student New Old</label>
                          <select className="form-control" value={data.student_type}  onChange={(e) =>this.onChange(e)} name="student_type">
                           <option value="new">New</option>
                           <option value="old">Old</option>
                          </select>
                          {errors.student_type && <InlineError text={errors.student_type} />}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example3cols3Input">Class</label>
                          <select class="form-control" value={data.class} name="class" onChange={(e) =>this.onChange(e)}>
                            <option value="">Select Class</option>
                                            <option value="NURSERY">NURSERY</option>
                                              <option value="LKG">LKG</option>
                                              <option value="UKG">UKG</option>
                                              <option value="1ST">1ST</option>
                                              <option value="2ND">2ND</option>
                                              <option value="3RD">3RD</option>
                                              <option value="4TH">4TH</option>
                                              <option value="5TH">5TH</option>
                                              <option value="6TH">6TH</option>
                                              <option value="7TH">7TH</option>
                                              <option value="8TH">8TH</option>
                                              <option value="9TH">9TH</option>
                                              <option value="10TH">10TH</option>
                                              <option value="11TH">11TH</option>
                                              <option value="12TH">12TH</option>
                                         </select>
                                         {errors.class && <InlineError text={errors.class} />}

                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example4cols1Input">Student Name</label>
                          <input type="text" className="form-control" name="student_name"    value={data.student_name} onChange={(e) =>this.onChange(e)} />
                          {errors.student_name && <InlineError text={errors.student_name} />}

                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example4cols2Input">Father's Name</label>
                          <input type="text" className="form-control"  name="father_name"    value={data.father_name} onChange={(e) =>this.onChange(e)} />
                          {errors.father_name && <InlineError text={errors.father_name} />}

                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example4cols3Input">Mother's Name</label>
                          <input type="text" className="form-control" name="mother_name"    value={data.mother_name} onChange={(e) =>this.onChange(e)} />
                          {errors.mother_name && <InlineError text={errors.mother_name} />}

                        </div>
                      </div>

                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example2cols1Input">Father's Contact No.1</label>
                          <input type="decimal" className="form-control" name="father_contact_no1"    value={data.father_contact_no1} onChange={(e) =>this.onChange(e)} />
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
                          <label className="form-control-label" htmlFor="example2cols2Input">Father's Email</label>
                          <input type="email" className="form-control" name="father_email"    value={data.father_email} onChange={(e) =>this.onChange(e)} />
                          {errors.father_email && <InlineError text={errors.father_email} />}

                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example2cols2Input">Student's Email</label>
                          <input type="email" className="form-control" name="student_email"    value={data.student_email} onChange={(e) =>this.onChange(e)} />
                          {errors.student_email && <InlineError text={errors.student_email} />}

                        </div>
                      </div>



                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example2cols2Input">DoB</label>
                          <input type="date" className="form-control" name="dob"    value={data.dob} onChange={(e) =>this.onChange(e)} />
                          {errors.dob && <InlineError text={errors.dob} />}

                        </div>
                      </div>

                      <div className="col-sm-6 col-md-3">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example2cols2Input">Date of Admission</label>
                          <input type="date" disabled className="form-control" />
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
                      <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="example2cols2Input">
                Registration Fees
                </label>
                          <input type="text" className="form-control" name="registration_fees" value={data.registration_fees} onChange={(e) =>this.onChange(e)} />
                          {errors.registration_fees && <InlineError text={errors.registration_fees} />}

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
                        <div className="col-sm-6 col-md-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">Village/City</label>
                            <input type="text" className="form-control" name="place" value={data.place} onChange={(e) =>this.onChange(e)} />
                            {errors.place && <InlineError text={errors.place} />}

                          </div>
                        </div>

                        <div className="col-sm-6 col-md-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">Block</label>
                            <input type="text" className="form-control" name="block" value={data.block} onChange={(e) =>this.onChange(e)} />
                            {errors.block && <InlineError text={errors.block} />}

                          </div>
                        </div>

                        <div className="col-sm-6 col-md-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">District</label>
                            <input type="text" className="form-control" name="district" value={data.district} onChange={(e) =>this.onChange(e)} />
                            {errors.district && <InlineError text={errors.district} />}

                          </div>
                        </div>


                        <div className="col-sm-6 col-md-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">State</label>
                            <input type="text" className="form-control" name="state" value={data.state} onChange={(e) =>this.onChange(e)} />
                            {errors.state && <InlineError text={errors.state} />}

                          </div>
                        </div>

                        <div className="col-sm-6 col-md-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">Pincode</label>
                            <input type="text" className="form-control" name="pincode" value={data.pincode} onChange={(e) =>this.onChange(e)} />
                            {errors.pincode && <InlineError text={errors.pincode} />}

                          </div>
                        </div>

                        <div className="col-sm-6 col-md-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="example2cols2Input">Landmark</label>
                            <input type="text" className="form-control" name="landmark" value={data.landmark} onChange={(e) =>this.onChange(e)} />
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

                                <label className="form-control-label" htmlFor="example2cols1Input">Create Account for Student and Parent</label>
                                <input type="radio" defaultChecked name="create_account" value="1" onChange={(e) =>this.onChange(e)} />

                                <label className="form-control-label" htmlFor="example2cols1Input">Create Account Link for Student and Parent</label>
                                <input type="radio" value="2" name="create_account" onChange={(e) =>this.onChange(e)} />

                                <label className="form-control-label" htmlFor="example2cols1Input">Do it later</label>
                              </div>
                            </div>
                            </div>
                        <div className="row">
                         <button class="btn btn-primary" onClick={e => this.onSubmit(e)} type="button">Button</button>
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
};

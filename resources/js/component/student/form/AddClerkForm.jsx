import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row";
import {
  RedLabel,
  Col,
  FormGroup,
  FormLabel,
  Input,
  Select,
  SelectOption,
  PreviewSingleImage,
  UploadImage,
  Button,
  Table
} from "../../utils/Components";
import validator from "validator";
import Swal from "sweetalert2"
export default class AddClerkForm extends Component{
    constructor(props) {
        super(props);
        this.data = {
          empid: "",
          clerk_name: "",
          gender: "male",
          relative_name: "",
          email: "",
          contact_no: "",
          qualification: "",
          address: "",
          dob: "",
          blood_group: "",
          aadhar_card: "",
          bank_name: "",
          bank_number: "",
          pf_no: "",
          pf_amount: "",
          da_amount: "",
          hra_amount: "",
          salary_remark: "",
          casual_leave: "",
          sick_leave: "",
          pay_earn_leave: "",
          other_leave: "",
          emp_photo: "",
          id_proof: "",
          experience_letter: "",
          other_documents1: "",
          other_documents2: "",
          salary: "",
          send_sms: true,
      }
        this.state = {
          data : this.data,
          errors: {},
          button_text:"Add",
          type:"add"
        };
        this.toggleSmsChange = this.toggleSmsChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    
    toggleSmsChange() {
        this.setState({
          data: { ...this.state.data, ["send_sms"]: !this.state.data.send_sms },
        });
    }

    onFileChange(e) {
        const { name, files } = e.target;
        var value = files[0];
        this.setState({
          data: { ...this.state.data, [name]: value },
        });
    }

    validate(data) {
        const errors = {};
        if (!data.empid) errors.empid = "Can't be blank";
        if (!data.clerk_name) errors.clerk_name = "Can't be blank";
        if (!data.gender) errors.gender = "Can't be blank";
        if (!data.relative_name) errors.relative_name = "Can't be blank";
        if (!data.email) errors.email = "Can't be blank";
        if (!data.contact_no) errors.contact_no = "Can't be blank";
        if (!data.qualification) errors.qualification = "Can't be blank";
        if (!data.address) errors.address = "Can't be blank";
        if (!data.salary) errors.salary = "Can't be blank";
        if (!data.dob) errors.dob = "Can't be blank";
        if (!data.date_of_joining) errors.date_of_joining = "Can't be blank";

    
        if (data.clerk_name.length < 3)
          errors.clerk_name = "Min. Length 3 char.";
        if (data.relative_name.length < 3)
          errors.relative_name = "Min. Length 3 char.";
        if (data.address.length < 3) errors.address = "Min. Length 5 char.";
        if (data.contact_no.length != 10) errors.contact_no = "Invalid Contact No.";
        if (!validator.isMobilePhone(data.contact_no))
          errors.contact_no = "Invalid Contact No.";
        return errors;
    }

    onSubmit(){
        const {data,type} = this.state
        const errors = this.validate(this.state.data);
        
        this.setState({ errors });

        if(Object.keys(errors).length == 0){
            if(type == "edit"){
              this.setState({
                button_text:"Updating ..."
              })
            }else if(type == "add"){
              this.setState({
                button_text:"Adding ..."
              })
            }
            this.props.submit(data).then(data => {
              const {message} = data
              Swal.fire("Success",message,"success")
              this.setState({
                data:this.data
              })

              if(type == "edit")
                this.setState({
                  button_text:"Update"
                })
              else
                this.setState({
                  button_text:"Add"
                })
                
            }).catch(error => {
              if(error.response){
                const {data,status} = error.response
                if(status == 422){
                  this.setState({
                    errors:data.errors
                  })
                  Swal.fire("Invalid Data",data.message,"warning");
                }else if(status == 400){
                  Swal.fire("Error Occured","Error Occured in Process. Please try again Later","error");
                }
                if(type == "edit")
                  this.setState({
                    button_text:"Update"
                  })
                else
                  this.setState({
                    button_text:"Add"
                  })
              }
            })
        }
    }
    fetchData(){
      const {data,type} = this.props
      if(type){
        this.setState({
          type
        })
      }
      if(data){
        const temp_id = data.id
        Object.keys(data.user).map(item => {
          data[item] = data.user[item]
        })
        data.id = temp_id
        this.setState({
          data
        })
      }
      if(type == "edit"){
        this.setState({
          button_text:"Update"
        })
      }
    }
    componentDidMount(){
      this.fetchData()
    }
    onChange(e) {
        this.setState({
          data: { ...this.state.data, [e.target.name]: e.target.value },
        });
    }
    render(){
        const {title,type} = this.props
        const {data,errors,button_text} = this.state
        var disabled = ""
        console.log(type)
        if(type == "view")
          disabled = true
        return(
            <CardComponent title={title}>
          <RedLabel>Personal Information:</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Empid: </FormLabel>
                <Input
                  errors={errors}
                  name="empid"
                  disabled={disabled}
                  onChange={this.onChange}
                  value={data.empid || ''} 
                />
              </FormGroup>
            </Col>
            {/* clerk_name */}
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Clerk Name*</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  name="clerk_name"
                  value={data.clerk_name || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Husband/Father Name*</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  name="relative_name"
                  value={data.relative_name || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Email*</FormLabel>
                <Input
                  errors={errors}
                  name="email"
                  disabled={disabled}
                  value={data.email || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Gender*</FormLabel>
                <Select
                  errors={errors}
                  name="gender"
                  disabled={disabled}
                  value={data.gender}
                  onChange={this.onChange}
                >
                  <SelectOption>-- Select --</SelectOption>
                  <SelectOption value="male">Male</SelectOption>
                  <SelectOption value="female">Female</SelectOption>
                  <SelectOption value="other">Other</SelectOption>
                </Select>
              </FormGroup>
            </Col>
            {/* contact_no */}
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Contact No*</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  name="contact_no"
                  value={data.contact_no || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Address*</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  name="address"
                  value={data.address || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Qualification</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  name="qualification"
                  value={data.qualification || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Dob*</FormLabel>
                <Input
                  type="date"
                  disabled={disabled}
                  errors={errors}
                  name="dob"
                  value={data.dob  || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            {/* blood_group */}
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Blood Group</FormLabel>
                <Input
                  errors={errors}
                  name="blood_group"
                  disabled={disabled}
                  value={data.blood_group  || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Date of Joining*</FormLabel>
                <Input
                  errors={errors}
                  type="date"
                  disabled={disabled}
                  name="date_of_joining"
                  value={data.date_of_joining ||''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <RedLabel>Documents</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Aadhar Card</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}

                  name="aadhar_card"
                  value={data.aadhar_card || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Bank Name</FormLabel>
                <Input
                  errors={errors}
                  name="bank_name"
                  disabled={disabled}

                  value={data.bank_name || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Bank Number</FormLabel>
                <Input
                  errors={errors}
                  name="bank_number"
                  disabled={disabled}
                  value={data.bank_number || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Pan Card Number</FormLabel>
                <Input
                  errors={errors}
                  name="pan_card_number"
                  disabled={disabled}
                  value={data.pan_card_number || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Clerk Photo</FormLabel>
                {type != "view" &&
                <UploadImage
                  name="emp_photo"
                  disabled={disabled}
                  value={data.emp_photo}
                  onChange={this.onFileChange}
                />
                }
                <PreviewSingleImage url={data.emp_photo} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Experience Letter</FormLabel>
                {type != "view" &&

                <UploadImage
                  name="experience_letter"
                  disabled={disabled}
                  value={data.experience_letter}
                  onChange={this.onFileChange}
                />
                }
                <PreviewSingleImage url={data.experience_letter} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>ID Proof</FormLabel>
                {type != "view" &&

                <UploadImage
                  name="id_proof"
                  disabled={disabled}
                  value={data.id_proof}
                  onChange={this.onFileChange}
                />
                }
                <PreviewSingleImage url={data.id_proof} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Other Documents 1</FormLabel>
                {type != "view" &&

                <UploadImage
                  name="other_documents1"
                  disabled={disabled}

                  value={data.other_documents1}
                  onChange={this.onFileChange}
                />
                }
                <PreviewSingleImage url={data.other_documents1} />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Other Documents 2</FormLabel>
                {type != "view" &&

                <UploadImage
                  disabled={disabled}
                  name="other_documents2"
                  value={data.other_documents2}
                  onChange={this.onFileChange}
                />
                }
                <PreviewSingleImage url={data.other_documents2} />
              </FormGroup>
            </Col>
          </Row>
          <RedLabel>Salary Details:</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Salary*</FormLabel>
                <Input
                  errors={errors}
                  name="salary"
                  disabled={disabled}

                  value={data.salary || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>PF No.</FormLabel>
                <Input
                  errors={errors}
                  name="pf_no"
                  disabled={disabled}

                  value={data.pf_no || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>PF Amount</FormLabel>
                <Input
                  errors={errors}
                  name="pf_amount"
                  disabled={disabled}

                  value={data.pf_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>TDS Amount</FormLabel>
                <Input
                  errors={errors}
                  name="tds_amount"
                  disabled={disabled}

                  value={data.tds_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Professional TAX Amount</FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}

                  name="professional_tax"
                  value={data.professional_tax || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>DA Amount</FormLabel>
                <Input
                  errors={errors}
                  name="da_amount"
                  disabled={disabled}

                  value={data.da_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>HRA Amount </FormLabel>
                <Input
                  errors={errors}
                  disabled={disabled}
                  name="hra_amount"
                  value={data.hra_amount || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Salary Remark </FormLabel>
                <Input
                  errors={errors}
                  name="salary_remark"
                  disabled={disabled}

                  value={data.salary_remark || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <RedLabel>Leave Details</RedLabel>
          <Row>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Casual Leave </FormLabel>
                <Input
                  errors={errors}
                  name="casual_leave"
                  disabled={disabled}
                  value={data.casual_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Pay/Earn Leave </FormLabel>
                <Input
                  errors={errors}
                  name="pay_earn_leave"
                  disabled={disabled}
                  value={data.pay_earn_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Sick Leave </FormLabel>
                <Input
                  errors={errors}
                  name="sick_leave"
                  disabled={disabled}

                  value={data.sick_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="6">
              <FormGroup>
                <FormLabel>Other Leave </FormLabel>
                <Input
                  errors={errors}
                  name="other_leave"
                  disabled={disabled}
                  value={data.other_leave || ''}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {!data.id && (
              <Row>
                <Table>
                <tbody>
                <tr>
                <td>
                  <FormLabel>Check for Sms Message</FormLabel>
                </td>
                <td>
                        <input
                          type="checkbox"
                          checked={data.send_sms}
                          onChange={(e) => this.toggleSmsChange()}
                        />
                </td>
                </tr>
                </tbody>
                </Table>
              </Row>
            )}
          </Row>
          {type != "view" && 
            <Row>
              <Button primary onClick={this.onSubmit}>{button_text}</Button>
            </Row>
          }
        </CardComponent>
        )
    }
}
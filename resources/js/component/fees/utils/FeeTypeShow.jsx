import React, { Component } from "react";
import api from "../../api";
import CardComponent from "../../utils/CardComponent";
import { Table, Thead, Col, FormGroup, Input, FormLabel, Button } from "../../utils/Components";
import shortid from "shortid";
import Row from "../../utils/Row";
import InlineError from "../../utils/InlineError";
import Swal from "sweetalert2"

export default class FeeTypeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add:false,
      new_fee_type_loading:false,
      edit:""
    }
    this.newFeeType = this.newFeeType.bind(this)
    this.updateFeeType = this.updateFeeType.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.eventType = this.eventType.bind(this)
  }
  newFeeType(fee_type){
    Swal.fire({
      title: 'Are you sure?',
      text: "You able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add Fee Type it!'
    }).then((result) => {
      if (result.value) {
        const {class_id} = this.props
        this.setState({
          new_fee_type_loading:true
        })
        this.props.submitNewFeeType(class_id,fee_type).catch(error => {
          if(error.response){
            const {data,status} = error.response
            if(status == 422){
                const {message} = data.error
                Swal.fire("Invalid Fee Type",message,"warning");
            }
          }
          this.setState({
            new_fee_type_loading:false
          })
        })
      }
    })
    
  }
  updateFeeType(fee_type,id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update Fee Type it!'
    }).then((result) => {
      if (result.value) {
        const {class_id} = this.props
        this.setState({
          new_fee_type_loading:true
        })
        this.props.submitUpdateFeeType(class_id,fee_type,id).catch(error => {
          if(error.response){
            const {data,status} = error.response
            if(status == 422){
                const {message} = data.error
                Swal.fire("Invalid Fee Type",message,"warning");
            }
          }
          this.setState({
            new_fee_type_loading:false
          })
        })
      }
    })
  }
  changeStatus(name,value){
    this.setState({
      [name]:value
    })
  }
  eventType(type,data){
    switch(type){
        case "edit":
          this.changeStatus("add",false)
          this.setState({
            edit:""
          },() => {
            this.setState({
              edit:data
            })
          })
        break
        case "add":
          this.changeStatus("add",true)
          this.changeStatus("edit","")
        break
    }
  }
  removeFeeType(row_id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You wont able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Fee Type it!'
    }).then((result) => {
      if (result.value) {
        const {class_id} = this.props
        this.setState({
          new_fee_type_loading:true
        })
        this.props.submitDeleteFeeType(class_id,row_id).catch(error => {
          if(error.response){
            const {data,status} = error.response
            if(status == 422){
                const {message} = data.error
                Swal.fire("Invalid Fee Type",message,"warning");
            }
          }
          this.setState({
            new_fee_type_loading:false
          })
        })
      }
    })
  }
  
  render() {
    const {add,new_fee_type_loading,edit,type} = this.state
    const { class_id, fee_type } = this.props;
    return (
      <span>
      {add && <NewFeeType title="Add Fee Type" loading={new_fee_type_loading} type={"add"} submit={this.newFeeType}/>}
      {edit && <NewFeeType data={edit} title="Edit Fee Type" loading={new_fee_type_loading} type={"edit"} submit={this.updateFeeType}/>}

      <CardComponent
        title="Class Fee Type"
        add_object={{ text: "Add", clickFunction: () => this.eventType("add",true) }}
      >
        <Table>
          <Thead>
            <th>Sr no.</th>
            <th>Fee Type</th>
            <th>Actions</th>
          </Thead>
          <tbody>
          {fee_type &&
            fee_type.map((item, id) => {
              return (
                <tr key={shortid.generate()}>
                  <td>{id + 1}</td>
                  <td>{item.fee_type}</td>
                  <td className="table-actions">
                    <a
                      href="#!"
                      onClick={(e) => this.eventType("edit",item)}
                      className="table-action"
                      data-toggle="tooltip"
                      data-original-title="Edit Fee Type"
                    >
                      <i className="fas fa-user-edit" />
                    </a>
                    <a
                      href="#!"
                      onClick={(e) => this.removeFeeType(item.id)}
                      className="table-action table-action-delete"
                      data-toggle="tooltip"
                      data-original-title="Delete Fee Type"
                    >
                      <i className="fas fa-trash" />
                    </a>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </Table>
      </CardComponent>
      </span>
    );
  }
}


class NewFeeType extends Component{
  constructor(props){
    super(props)
    this.state = {
      fee_type:"",
      id:"",
      type:"",
      error:""
    }
    this.submit = this.submit.bind(this)
  }
  componentDidMount(){
    const {data,type} = this.props
    if(data){
      this.setState({
        id:data.id,
        fee_type:data.fee_type,
        type
      })
    }else{
      this.setState({
        type
      })
    }
  }
  submit(){
    const {fee_type,id} = this.state
    if(fee_type == "")
      this.setState({
        error:"Can't be Blank"
      })
    else{
      this.setState({
        error:""
      })
      if(id == "")
        this.props.submit(fee_type)
      else
        this.props.submit(fee_type,id)
    }
  }
  render(){
    const {fee_type,error} = this.state
    const {loading,title,type} = this.props
    return(
      <CardComponent title={title}>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>Fee Type</FormLabel>
              <Input value={fee_type} onChange={e => {
                this.setState({
                  fee_type:e.target.value
                })
              }} placeholder="Fee Type"/>
              {error && <InlineError text={error}/>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
            {type == "add" ?
              <span>{loading == false ? <Button onClick={this.submit} primary sm>Add</Button> : <Button primary sm>Adding ..</Button> }</span>
              :
              <span>{loading == false ? <Button onClick={this.submit} primary sm>Edit</Button> : <Button primary sm>Editing ..</Button> }</span>
            }
            </FormGroup>
          </Col>
        </Row>
      </CardComponent>
    )
  }
}
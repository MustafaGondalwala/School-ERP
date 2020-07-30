import React, { Component } from "react";
import CardComponent from "../../utils/CardComponent";
import InlineError from "../../authentication/form/InlineError";
import api from "../../api"
import Swal from 'sweetalert2'

import { connect } from "react-redux";
import {getClassPeriodDispatch,getClassPeriod} from "../../actions/classes"

class AddClassPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        period_id: "",
        start_time:"",
        end_time:""
      },
      errors:{},
      add_update_button:"Add/Update Class Period"
    };
  }
  componentDidMount(){
    const {class_periods,getClassPeriodDispatch} = this.props
    if(Object.keys(class_periods).length == 0){
        getClassPeriodDispatch()
    }
  }
  onChange(e){
    this.setState({
      data: {...this.state.data,[e.target.name]:e.target.value}
    });
  }
  validate(data){
        const errors = {};
        if (!data.period_id) errors.period_id = "Can't be blank";
        if (!data.start_time) errors.start_time = "Can't be blank";
        if (!data.end_time) errors.end_time = "Can't be blank";
        return errors
    }     
  submit(){
      const errors = this.validate(this.state.data)
      const {getClassPeriod} = this.props
      this.setState({ errors })
      if(Object.keys(errors).length == 0){
          this.setState({
            add_update_button:"Fetching Data ..."
          })
          api.admin.class_period.add_update(this.state.data).then(data => {
            const emptyData = {
                period_id: "",
                start_time:"",
                end_time:""
            }
            getClassPeriod(data.class_periods);
            this.setState({
                data:emptyData,
                add_update_button:"Add/Update Class Period"
            })
            var message = data.message
            Swal.fire("Success",message,"success");
          }).catch(error => {
              if(error.response){
                if(error.response.status == 422){
                    Swal.fire("Validation Error","Validation Error Occurred, Please Check the Data","warning");
                }else{
                    Swal.fire("Error Occured","Error Occurred, Please try again later","error");
                }
                this.setState({
                    add_update_button:"Add/Update"
                })
              }
          })
      }
  }

  tConvert(time){
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
  
    return (`${hour}:${min} ${part}`)
  }
  removeClassPeriod(period_id){
    const {getClassPeriod} = this.props
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be get Class Period Back!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            this.setState({
              add_update_button:"Removing Class Period ..."
            })
            api.admin.class_period.delete(period_id).then(data => {
                getClassPeriod(data.class_periods);
                var message = data.message
                Swal.fire("Success",message,"success");
                this.setState({
                  add_update_button:"Add/Update Class Period"
                })

            }).catch(error => {
                Swal.fire("Error Occured","Error Occured in Process. Please Try Later.","error")
                this.setState({
                  add_update_button:"Add/Update Class Period"
                })
            })
        }
      })

  }
  render() {
    const period_id = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      "Lunch",
      "Break-1",
      "Break-2",
      "Break-3",
      "Prayer-1",
      "Prayer-2",
    ];
    
    const {errors,data,add_update_button} = this.state
    const {class_periods,back_link} = this.props
    return (
      <div className="col-md-12">
        <CardComponent title="Add Class Period" back_link={back_link}>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="form-control-label">Select Period ID</label>
                <select name="period_id" value={data.period_id} onChange={e => this.onChange(e)} className="form-control">
                  <option value="">-- Select Period Id --</option>
                  {period_id.map((item,key) => {
                    return <option key={key} value={item}>{item}</option>;
                  })}
                </select>
                {errors.period_id && <InlineError text={errors.period_id}/>}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label className="form-control-label">Select Start Time</label>
              <input type="time" name="start_time" value={data.start_time} onChange={e => this.onChange(e)} className="form-control" />
              {errors.start_time && <InlineError text={errors.start_time}/>}
            
            </div>
            <div className="form-group col">
              <label className="form-control-label">Select End Time</label>
              <input type="time" name="end_time" value={data.end_time} onChange={e => this.onChange(e)} className="form-control" />
              {errors.end_time && <InlineError text={errors.end_time}/>}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary" onClick={e => this.submit()}>{add_update_button}</button>
            </div>
          </div>
          <br />
          <div className="row">
              <div className="table-responsive">
                  <table className="table">
                    <thead>
                        <tr>
                            <td>Sr no.</td>
                            <td>Period Id</td>
                            <td>Start Time</td>
                            <td>End Time</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(class_periods).length > 0 && class_periods.map((item,id) => {
                            return <tr key={id}>
                                <td>{id+1}</td>
                                <td>{item.period_id}</td>
                                <td>{this.tConvert(item.start_time)}</td>
                                <td>{this.tConvert(item.end_time)}</td>
                                <td  className="table-actions">
                                    <a href="#!" onClick={e => this.removeClassPeriod(item.period_id)} className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete Class Period">
                                        <i className="fas fa-trash" />
                                    </a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                  </table>
              </div>
          </div>
        </CardComponent>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        class_periods:state.class_periods
    };
}

export default connect(mapStateToProps,{getClassPeriodDispatch,getClassPeriod})(AddClassPeriod);
import React,{Component} from "react"
import EveryPeriod from "../form/EveryPeriod"
import {Link} from "react-router-dom"
import {AdminTableTableHeader} from "../TimeTableHomePage"




class SelectClass extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	          section:[],
	          distinct_classes:[],
	          classes:[],
	    	  errors:[],
	    	  class_:"",
	    	  section_:"",
	    }
	    this.onChangeClasses = this.onChangeClasses.bind(this)
	}

	onChange(e){
	    this.setState({
	      [e.target.name]: e.target.value
	    });
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
	        section_: value_by[0]
	      })
	    }else{
	      this.setState({
	        section_: "",
	        section:[]
	      })
	    }

	  }
	
	validate(data){
		    const errors = {};
		    if (!data.class_) errors.class_ = "Can't be blank";
	    return errors;
	  };

	onSubmit(e){
		 e.preventDefault();
	    const errors = this.validate(this.state);
	    this.setState({ errors });
	    if (Object.keys(errors).length === 0) {
	      this.props.submit(this.state.class_,this.state.section_)
	    }
	}
	render(){
		const {errors} = this.state
		return(
			<div className="card mb-4">
			    <div className="card-header">
			      <h3 className="mb-0">{this.props.title}
	          	<Link  to={this.props.back_link} class="btn btn-neutral float-right" type="submit">Back</Link></h3>
			    </div>
			    <div className="card-body">
			    	<div className="col-md-6">
		              <div className="form-group">
	                       <label className="form-control-label" htmlFor="example3cols3Input">Class</label>
	                       <select class="form-control"  name="class" onChange={(e) =>this.onChangeClasses(e)}>
	                       					<option value="">Select Class</option>
	                                        {this.state.distinct_classes.map(function(item){
	                                          return <option value={item}>{item}</option>
	                                        })}
	                       </select>
	                     </div>
		            </div>

		            <div className="col-md-4">
		             <div className="form-group">
	                       <label className="form-control-label" htmlFor="example3cols3Input">Section</label>
	                                    <select class="form-control" value={this.section_} name="section_" onChange={(e) =>this.onChange(e)}>
	                                      {
	                                        this.state.section &&
	                                        this.state.section.map((item)=>{
	                                        	if(item != null)
	                                          return <option  value={item}>{item}</option>
	                                        })
	                                      }
	                                      </select>
	                     </div>
		            </div>
			    	<div className="row">
			    		<div className="col-md-4">
			             	<button onClick={(e) => this.onSubmit(e)} className="btn btn-primary">{this.props.button_text}</button>
			            </div>
			    	</div>
			    </div>
			</div>
		)
	}
}

export default class ViewTimeTable extends Component{
	constructor(props){
		super(props)
		this.state = {
			classes:"",
			section:"",
			time_table: null,
			subjects:[],
			teachers:[],
			button_text:"Fetch",
			update_button_text:"Update"
		}

		this.getClass = this.getClass.bind(this)
	}
	getClass(classes,section,select_year){
		var self = this
		self.setState({
			classes:classes,
			section:section,
			button_text:"Fetching ..."

		})
		axios({
			url:"/api/v1/time-table/get-time-table-class-wise",
			method:"post",
			data:{
				"classes":classes,
				"section":section
			}
		}).then(response => {
			self.setState({
				time_table:response.data.success.time_table,
				button_text:"Fetch",
			})
		})

	}

	render(){
		return(
			<div>
				<AdminTableTableHeader  mainHeader="Time Table" header="View Time Table" sub_header="Student" />
				<div className="container-fluid mt--6">
					<SelectClass title="Select Class" back_link="/admin/time-table" button_text={this.state.button_text} submit={this.getClass} hide_year="true" />
					{ this.state.time_table  && 

								  <div className="card mb-12">
								    <div className="card-header">

								      <h3 className="mb-0"> Time Table <a target="_blank"  href={`/admin/time-table/print-time-table/${this.state.classes}/${this.state.section}`} class="btn btn-neutral float-right" type="submit">Print</a></h3>
								    </div>
								   <div className="card-body">

									   <div className="table-responsive">
									   	<table className="table table-hover table-bordered">
									   		<thead >
									   			<tr>
												  <th></th>
								                  <th></th>
												  <th></th>
												  <th scope="row" colspan="2"><center>Monday</center></th>
												  <th  scope="row" colspan="2"><center>Tuesday</center></th>
												  <th colspan="2"  scope="row" ><center>Wednesday</center></th>
												  <th colspan="2"  scope="row" ><center>Thursday</center></th>
												  <th colspan="2"  scope="row" ><center>Friday</center></th>
												  <th colspan="2"  scope="row" ><center>Saturday</center></th>
								                  </tr>
									   			<tr>
									   				<th scope="row">Period Name</th>
									   				<th scope="row">Time From</th>
									   				<th scope="row">Time To</th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   				<th scope="row">Teacher Name </th>
									   				<th scope="row">Subject Name </th>
									   			</tr>

									   		</thead>
									   		<tbody>
									   		{
									   			this.state.time_table && Object.keys(this.state.time_table).map(item => {
									   				return <EveryPeriod view_mode={true} teachers={this.state.teachers} subjects={this.state.subjects} period={this.state.time_table[item]} period_name={item}/>
									   			})
									   		}
									   		</tbody>
									   	</table>
									   </div>
								   <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Update</button>
								   </div>
								  </div>
						}
				</div>
			</div>
		)
	}
}
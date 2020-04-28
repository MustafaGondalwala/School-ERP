import React,{Component} from "react"
import {Link} from "react-router-dom"

export default class SelectClass extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	          section:[],
	          distinct_classes:[],
	          classes:[],
	    	  errors:[],
	    	  date:"",
	    	  class_:"10th",
	    	  section_:"A",
	    	  select_year:"20-21"
	    }
	}


		onChangeSelectYear(e){
			this.setState({
				select_year:e.target.value
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
	    console.log(value_by,e.target.value)
	    this.setState({
	      section:value_by
	    })
	    this.setState({
	    	class_:e.target.value
	    })
	    if(value_by.length > 1){
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
	  onChange(e){
	    this.setState({
	      [e.target.name]: e.target.value
	    });
	  }

	  onSubmit(e){
	  	if(this.props.attendance_edit)
	  	   this.props.submit(this.state.class_,this.state.section_,this.state.date)
	  	else
	  	   this.props.submit(this.state.class_,this.state.section_,this.state.select_year)
	  }

	  get_attendance_response(attendance_type){
	  	   this.props.submit(this.state.class_,this.state.section_,this.state.date,attendance_type)
	  }

	  componentDidMount(){
	    var self = this

		var curr = new Date();
		curr.setDate(curr.getDate() + 3);
		var date = curr.toISOString().substr(0,10);

		self.setState({
			date:date
		})

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
	render(){
		const {errors} = this
		return(
		<div className="card mb-4">
	        <div className="card-header">
	          <h3 className="mb-0">
	          		{!this.props.title ?
	          		<p>Select Class Wise Fees</p>
	          		 : <span>{this.props.title}</span>
	          		}
	          	<Link  to="/admin/fees" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
	        </div>
	        <div className="card-body">
	          <div className="row">
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
                                          return <option  value={item}>{item}</option>
                                        })
                                      }
                                      </select>
                     </div>
	            </div>
	            {!this.props.hide_year &&
		            <div className="col-md-4">
		              <div className="form-group">
		                <label className="form-control-label" htmlFor="example3cols1Input">Select Year</label>
		              <select name="select_year" value={this.state.select_year} onChange={(e)=>this.onChangeSelectYear(e)} class="form-control"><option value="17-18">2017-18</option><option value="18-19">2018-19</option><option value="19-20">2019-20</option><option value="20-21">2020-21</option><option value="21-22">2021-22</option><option value="22-23">2022-23</option><option value="23-24">2023-24</option></select>
		              </div>
		            </div>
	        	}

	        	{!this.attendance_edit &&
	        		<div className="col-md-4">
		              <div className="form-group">
		                <label className="form-control-label" htmlFor="example3cols1Input">Select Date</label>
    		            <input value={this.state.date} type="date" name="date" onChange={(e)=>this.onChange(e)} class="form-control" />
		              </div>
		            </div>
	        	}

	          </div>

	          	{!this.props.attendance_edit ? 
	            <button className="btn btn-primary" onClick={(e)=>this.onSubmit()}>Fetch</button>
	        	: <span><button className="btn btn-primary" onClick={(e) => this.get_attendance_response("view")}>View Attendance</button>
	        			<button className="btn btn-primary" onClick={(e) => this.get_attendance_response("fill")}>Fill Attendance</button>
	        	  </span>}
	        </div>
      	</div>
		)
	}
}
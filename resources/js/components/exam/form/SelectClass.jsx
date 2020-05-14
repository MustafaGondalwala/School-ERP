import React, { Component } from "react"
import {Link} from "react-router-dom"
import InlineError from "../messages/InlineError"
import Select from 'react-select'


export default class SelectClass extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	          section:[],
	          distinct_classes:[],
	          classes:[],
	    	  errors:[],
	    	  date:"",
	    	  class_:"",
	    	  section_:"",
	    	  select_year:"20-21",
	    	  exam_type:[],
	    	  exam_type_:"",
	    	  subject:[],
	    	  subject_:[]
	    }
	    this.onChangeClasses = this.onChangeClasses.bind(this)
	    this.handleInputChange = this.handleInputChange.bind(this)
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


	    axios({
	    	url:"/api/v1/subject/get-all-subjects",
	    	method:"post"
	    }).then(response => {
	    	const temp_subjects = []
	    	response.data.success.subjects.map(item => {
	    		temp_subjects.push({"value":item.id,"label":item.subject_name})
	    	})

	    	self.setState({
	    		subject:temp_subjects
	    	})
	    })

	   axios({
	      url:"/api/v1/exam/get-exam-type"
	    }).then(response => {
	        self.setState({
	        exam_type:response.data.success.exam_type
	      })
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
		    if (!data.select_year) errors.select_year = "Can't be blank";
		    if (!data.exam_type_) errors.exam_type_ = "Can't be blank";
		    if (data.subject_.length == 0) errors.subject_ = "Can't be blank";
	    return errors;
	  };



	handleInputChange(e){
		var temp = []
		e.map(item => {
			temp.push(item.value)
		})
	    this.setState({
	      subject_:temp
	    })
	  };

	onSubmit(e){
		 e.preventDefault();
	    const errors = this.validate(this.state);
	    this.setState({ errors });
	    if (Object.keys(errors).length === 0) {
	      this.props.submit(this.state.class_,this.state.section_,this.state.select_year,this.state.exam_type_,this.state.subject_)
	    }
	}
	render(){
		const {errors} = this.state
		return(
			<div className="card mb-4">
			    <div className="card-header">
			      <h3 className="mb-0">Select Class
	          	<Link  to="/admin/exam" class="btn btn-neutral float-right" type="submit">Back</Link></h3>
			    </div>
			    <div className="card-body">
			    		<div className="row">
			    		
			             <GetClassID />
			            </div>

			             <div className="col-md-4">
			              <div className="form-group">
			                  <label className="form-control-label" htmlFor="example3cols1Input">Select Subject</label>
                				<Select isMulti options={this.state.subject}  onChange={(e) =>this.handleInputChange(e)} />
                       			{errors.subject_ && <InlineError text={errors.subject_} />}
				              
			              </div>
			            </div>
			    	</div>
			    	<div className="row">
			    		<div className="col-md-4">
			             	<button onClick={(e) => this.onSubmit(e)} className="btn btn-primary">Fetch</button>
			            </div>
			    	</div>
			    </div>
		)
	}
}
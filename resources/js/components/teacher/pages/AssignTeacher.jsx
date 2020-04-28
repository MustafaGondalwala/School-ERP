import React,{Component} from "react";
import {Link} from "react-router-dom";

export default class AssignTeacher extends Component{
  constructor(props){
    super(props)
    this.state = {
      classes:[],
      teacher:[]
    }
  }
  componentDidMount(){
      var check = []
      var self  = this;

      axios({
        method:"post",
        url:"/api/v1/teacher/view-preferend-data"
      }).then(response=>{
        console.log(response.data.success.teacher)
        self.setState({
          teacher:(response.data.success.teacher)
        })
      })
      axios({
        method:"post",
        url:"/api/v1/class/get-all-classes"
      }).then((response)=>{
        self.setState({
          classes:(response.data.success.classes)
        })

      })
  }

  onChange(e){
    var class_id = e.target.getAttribute('classid')
    var teacher_id = e.target.value
    var self = this
    axios({
      method:"post",
      url:"/api/v1/class/assign-teacher-to-class",
      data:{class_id,teacher_id}
    }).then(response=>{
      console.log(response.data.success.teacher,response.data.success.classes)
      self.seState({
        teacher:response.data.success.teacher,
        classes:response.data.success.classes
      });

    })
  }
  render(){
    return(
      <div className="container-fluid mt--6">
        <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h3 className="h3">View Teacher Subject and Class Preference</h3>
              </div>
              <div className="card-body">
              <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr><td>ID</td>
                      <td>Name</td>
                      <td>Preferend Classes</td>
                      <td>Preferend Subject</td>
                      <td>Assigned To</td>
                      </tr>

                      {this.state.teacher.length>1 && this.state.teacher.map(function(item, key) {
                            return  <tr>
                              <td>{item.id}</td>
                              <td>{item.teacher_name}</td>
                              <td>{item.teach_class}</td>
                              <td>{item.teach_subject}</td>
                              <td>{item.assign_teacher_id}</td>
                            </tr>
                        }.bind(this))}
                    </thead>
                  </table>
              </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h3 className="h3">Assign Teacher to Class</h3>
              </div>
              <div className="card-body">
              <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr><td>ID</td>
                      <td>Class</td>
                      <td>Section</td>
                      <td>Mustafa</td>
                      <td>Assign Teacher</td></tr>


                      {this.state.classes.length>1 && this.state.classes.map(function(char, idx) {
                      return  <tr>
                        <td>{char.id}</td>
                        <td>{char.class_title}</td>
                        <td>{char.section}</td>
                        <td>{char.assign_teacher_id}</td>
                        <td>
                        <select classid={char.id} onChange={(e) => this.onChange(e)} className="form-control">
                            <option defaultChecked>Select</option>
                            {this.state.teacher.length>1 && this.state.teacher.map(function(item, key) {
                                return <option value={item.id}>{item.teacher_name}</option>
                            }.bind(this))}
                        </select>
                        </td>
                      </tr>
                  }.bind(this))}

                    </thead>
                  </table>
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

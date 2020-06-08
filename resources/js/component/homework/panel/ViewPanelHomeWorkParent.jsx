import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import {setParentHomeWorkDispatch} from "../../actions/homework"
import { connect } from "react-redux";
import DataTable, { createTheme } from 'react-data-table-component';
import api from "../../api";


class ViewPanelHomeWorkParent extends Component{
    constructor(props){
      super(props)
      this.state = {
        rows:""
      }
    }
    async componentDidMount(){
        const {student_id,parent_childs,parent_homework} = this.props
        const student_data = this.findArrayElementByTitle(this.props.parent_childs,student_id)
        if(parent_homework[student_id]){
          this.setState({
            rows:parent_homework[student_id]
          })
        }else{
          const student_homework =  await this.props.setParentHomeWorkDispatch(this.getStudentIds(parent_childs));
          this.setState({
            rows:student_homework[student_id]
          })
        }
    }
    getStudentIds(parent_childs){
      const new_array = [];
      parent_childs.map(item => {
        new_array.push(item.id)
      })
      return new_array;
    }
    findArrayElementByTitle(array, student_id) {
        return array.find((element) => {
          return element.id == student_id;
        })
    }
    render(){
      const columns = [
        {
            name:"id",
            selector:"id",
            sortable:true
        },
        {
            name: 'title',
            selector: 'title',
            sortable: true,
            cell:row => <div>{row.homework.title}</div>
          },
        {
          name: 'Teacher',
          sortable: true,
          right: true,
          cell:row => <div>{row.homework.teacher.teacher_name}</div>
        },
        {
            name: 'Subject',
            sortable: true,
            cell: row => <div>{row.homework.subject.subject_name}</div>,
          },
          {
            name:"Status",
            sortable:true,
            cell: row => <div>{row.status == 1 ? <div>Ongoing</div>:<div>Closed</div> }</div>
          },
          {
            name: 'View',
            sortable: true,
            cell: row => <div><button onClick={e => this.props.sendEventType("view",row.id)} className="btn btn-sm btn-primary">View</button></div>,
          },
      ];
        return(
            <CardComponent title="View HomeWork" >
              <DataTable
                title={"Class HomeWorks"}
                    columns={columns}
                    data={this.state.rows}
                />
            </CardComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        parent_childs:state.parent_childs,
        parent_homework:state.parent_homework
    };
}

export default connect(mapStateToProps,{setParentHomeWorkDispatch})(ViewPanelHomeWorkParent);
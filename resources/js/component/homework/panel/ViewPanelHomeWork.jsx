import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import {setHomeWorksDispatch} from "../../actions/homework"
import { connect } from "react-redux";
import DataTable, { createTheme } from 'react-data-table-component';


class ViewPanelHomeWork extends Component{
    constructor(props){
        super(props)
      this.addClickFunction = this.addClickFunction.bind(this)
    }
    componentDidMount(){
        const {class_homeworks,setHomeWorksDispatch} = this.props
        if(Object.keys(class_homeworks).length == 0){
            setHomeWorksDispatch(this.props.class_id);
        }
    }
    addClickFunction(){
        this.props.sendEventType("add",null)
    }
    fetchStatus(status){
      switch(status){
        case 1:
          return "OnGoing";
        case 2:
          return "Closed";
      }
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
              },
            {
              name: 'Teacher',
              sortable: true,
              right: true,
              cell:row => <div>{row.teacher.teacher_name}</div>
            },
            {
                name: 'Subject',
                sortable: true,
                cell: row => <div>{row.subject.subject_name}</div>,
              },
              {
                name:"Status",
                sortable:true,
                cell: row => <div>
                {this.fetchStatus(row.status)}</div>
              },
              {
                name: 'View',
                sortable: true,
                cell: row => <div><button onClick={e => this.props.sendEventType("view",row.id)} className="btn btn-sm btn-primary">View</button></div>,
              },
              {
                name: 'Submittion',
                sortable: true,
                cell: row => <div><button onClick={e => this.props.sendEventType("homework_check",row.id)} className="btn btn-sm btn-primary">Check</button></div>,
              },
              {
                name: 'Student Status',
                sortable: true,
                cell: row => <div><button onClick={e => this.props.sendEventType("student_status",row.id)} className="btn btn-sm btn-primary">View</button></div>,
              },
              {
                name: 'Actions',
                sortable: true,
                cell: row => <div>
                                <td  className="table-actions">
                                            <a href="#!" onClick={e => this.props.sendEventType("edit_homework",row)}  className="table-action" data-toggle="tooltip" data-original-title="Edit product">
                                                <i className="fas fa-user-edit" />
                                            </a>
                                            <a href="#!"  className="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete product">
                                                <i className="fas fa-trash" />
                                            </a>
                                        </td>
                </div>
              }
          ];
          const back_link = "/teacher/homework/class/"+this.props.class_id
        return(
            <CardComponent title="View HomeWork" back_link={back_link} add_object={{'text':"Add",'clickFunction':this.addClickFunction}}>
                <DataTable
                  title={"Class HomeWorks"}
                    columns={columns}
                    data={this.props.class_homeworks}
                />
            </CardComponent>
        ) 
    }
}

function mapStateToProps(state) {
    return {
        class_homeworks:state.class_homeworks
    };
}

export default connect(mapStateToProps,{setHomeWorksDispatch})(ViewPanelHomeWork);

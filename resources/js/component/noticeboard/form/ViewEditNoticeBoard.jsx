import React, { Component } from "react"
import DataTable, { createTheme } from 'react-data-table-component';
import { Button } from "../../utils/Components";
import api from "../../api";


export default class ViewEditNoticeBoard extends Component{
    constructor(props){
        super(props)
        this.state = {
            notices:""
        }
    }
    componentDidMount(){
        const {notices} = this.props
        this.setState({
            notices
        })
    }
    
    render(){
        const {eventType} = this.props
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
            name: 'Student',
            right: true,
            cell:row => <div><input readOnly type="checkbox" checked={row.student} /></div>
          },
          {
            name: 'Staff',
            right: true,
            cell:row => <div><input readOnly type="checkbox" checked={row.staff} /></div>
          },
          {
            name: 'Parent',
            right: true,
            cell:row => <div><input readOnly type="checkbox" checked={row.parent} /></div>
          },
          {
            name: 'Publish',
            right: true,
            cell:row => <div><input readOnly type="checkbox" checked={row.publish} /></div>
          },
          {
            name: 'View',
            right: true,
            cell:row => <div><Button primary sm onClick={() => eventType("view",row.id)}>View</Button></div>
          },
          {
            name: 'Edit',
            right: true,
            cell:row => <div><Button warning sm onClick={() => eventType("edit",row.id)}>Edit</Button></div>
          },
          {
            name: 'Remove',
            right: true,
            cell:row => <div><Button danger sm onClick={() => eventType("remove",row.id)}>Remove</Button></div>
          },
          
        ]
        const {notices} = this.state
        return(
            <div>
             <DataTable
                title={"All Notice's"}
                    columns={columns}
                    data={notices}
                />
            </div>
        )
    }
}
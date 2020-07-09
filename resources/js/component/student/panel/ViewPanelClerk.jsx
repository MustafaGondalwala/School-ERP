import React, { Component } from "react"
import { render } from "react-dom"
import api from "../../api"
import { connect } from "react-redux";
import {getClerksDispatch} from "../../actions/clerk"
import DataTable, { createTheme } from 'react-data-table-component';
import { Button } from "../../utils/Components";


class ViewPanelClerk extends Component{
    componentDidMount(){
        const {clerks} = this.props
        if(Object.keys(clerks).length == 0)
            this.props.getClerksDispatch()
    }
    render(){
        const {clerks} = this.props
        const columns = [
            {
                name:"Emp Id",
                selector:"empid",
                sortable:true,
                width:"200px"
            },
            {
                name:"Clerk Name",
                selector:"clerk_name",
                sortable:true
            },
            {
                name: 'View',
                width:"100px",
                cell: row => <div><Button primary sm onClick={() => this.props.eventType("view",row)}>View</Button></div>
            },
            {
                name: 'Edit',
                width:"100px",
                cell: row => <div><Button warning sm onClick={() => this.props.eventType("edit",row)}>Edit</Button></div>
            },
            {
                name: 'Drop',
                width:"100px",
                cell: row => <div><Button danger sm>Drop</Button></div>
            },
        ]
        return(
                <DataTable
                  title={"Clerks"}
                    columns={columns}
                    data={clerks}
                />
        )
    }
}

function mapStateToProps(state) {
    return {
        clerks:state.schoolClerks
    };
}

export default connect(mapStateToProps,{getClerksDispatch})(ViewPanelClerk);

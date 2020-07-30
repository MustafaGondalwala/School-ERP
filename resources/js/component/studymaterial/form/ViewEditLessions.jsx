import React, { Component, Suspense } from "react"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead,Button } from "../../utils/Components"

const AddEditMaterial = React.lazy(() => import("./AddEditMaterial")) 
import api from "../../api";
import { setTeacherGroup } from "../../actions/study_material";
import { connect } from "react-redux";
import Swal from "sweetalert2";


class ViewEditLession extends Component{
    constructor(props){
        super(props)
        this.state = {
            lessions:"",
            edit_lession:"",
            view_lession:""
        }
        this.editLession = this.editLession.bind(this)
        this.deleteLession = this.deleteLession.bind(this)
    }
    componentDidMount(){
        const {show_lessions} = this.props
        this.setState({
            lessions:show_lessions
        })
    }
    viewLession(view_lession){
        this.setState({
            view_lession:"",
            edit_lession:"",
        }, () => {
            this.setState({
                view_lession
            })
        })
    }
    deleteLession(lession_id){
        const {setTeacherGroup} = this.props
        api.adminteacher.study_material.teacher.material.delete(lession_id).then(data => {
            const {message,groups} = data
            setTeacherGroup(groups)
            Swal.fire("Success",message,"success")
        })
        
    }
    editLession(edit_lession){
        this.setState({
            view_lession:"",
            edit_lession:"",
        }, () => {
            this.setState({
                edit_lession
            })
        })
    }
    render(){
        const {lessions,view_lession,edit_lession} = this.state
        const {type} = this.props
        return(
            <div>
                <CardComponent title={"Lessions List"}>
                    <Table>
                        <Thead>
                            <td>Sr no.</td>
                            <td>Title</td>
                            <td>Sub-Title</td>
                            <td>View Details</td>
                            {type != 2 &&
                                <td>Edit</td>
                            }
                            {type != 2 &&
                                <td>Delete</td>
                            }
                        </Thead>
                        <tbody>
                        {
                            lessions && lessions.map((item,id) => {
                                return <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.subtitle}</td>
                                    <td><Button primary sm onClick={e => this.viewLession(item)}>View</Button></td>
                                    {type != 2 &&
                                        <td><Button warning sm onClick={e => this.editLession(item)}>Edit</Button></td>
                                    }
                                    {type != 2 &&
                                        <td><Button danger sm onClick={e => this.deleteLession(item.id)}>Delete</Button></td>
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </CardComponent>
                {view_lession && 
                    <Suspense>
                        <AddEditMaterial type={2} data={view_lession} title="View Lession"/>
                    </Suspense>
                }
                {edit_lession && 
                    <Suspense>
                        <AddEditMaterial type={3} data={edit_lession} title="Edit Lession"/>
                    </Suspense>
                }
            </div>
        )
    }
}

export default connect(null,{setTeacherGroup})(ViewEditLession);
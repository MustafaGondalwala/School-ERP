import React, { Component, Suspense } from "react"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead,Button } from "../../utils/Components"

const AddEditMaterial = React.lazy(() => import("./AddEditMaterial")) 
import api from "../../api";
import { setTeacherGroup,setTeacherGroupDispatch } from "../../actions/study_material";
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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                api.adminteacher.study_material.teacher.material.delete(lession_id).then(data => {
                    const {message,groups} = data
                    setTeacherGroup(groups)
                    Swal.fire("Success",message,"success")
                })
            }
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
        const {type,teacher_groups,show_type,show_lession_id,groups} = this.props
        var our_material = [];
        if(show_type == 2){
            const {class_id} = this.props
            var classwise_groups = groups[class_id]
            our_material = classwise_groups.filter(item => item.id == show_lession_id)[0].material;
        }else{
            our_material = teacher_groups.filter(item => item.id == show_lession_id)[0].material;
        }
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
                            our_material && our_material.map((item,id) => {
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

function mapStateToProps(state) {
    return {
        teacher_groups:state.teacher_groups,
        groups:state.studyMaterialGroup
    };
}

export default connect(mapStateToProps,{setTeacherGroupDispatch,setTeacherGroup})(ViewEditLession);
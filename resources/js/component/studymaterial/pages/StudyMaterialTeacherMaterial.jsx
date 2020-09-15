import React,{Component, Suspense} from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import {setTeacherGroupDispatch,setTeacherGroup} from "../../actions/study_material"
import { connect } from "react-redux";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent"
import { Input, FormGroup, FormLabel, Button,Table, Thead } from "../../utils/Components"


const AddEditMaterial = React.lazy(() => import("../form/AddEditMaterial"))
const ViewEditLessions = React.lazy(() => import("../form/ViewEditLessions")) 


class StudyMaterialTeacherMaterial extends Component{
    constructor(props){
        super(props)
        this.state = {
            add_group_id:"",
            show_lession_id:""
        }
    }
    componentDidMount(){
        const {setTeacherGroupDispatch,teacher_groups} = this.props
        if(Object.keys(teacher_groups).length == 0)
            setTeacherGroupDispatch()
    }
    showLessions(show_lession_id){
        this.setState({
            show_lession_id:"",
            add_group_id:"",
        }, () => {
            this.setState({
                show_lession_id
            })
        })
    }
    addLession(add_group_id){
        this.setState({
            add_group_id:"",
            show_lessions:""
        }, () => {
            this.setState({
                add_group_id
            })
        })
    }

    render(){
        const {teacher_groups} = this.props
        const {add_group_id,show_lession_id} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="Study Material" header="Teacher" sub_header="Add Material"/>
                <BodyComponent>
                    <CardComponent title="Chapter List" back_link="/teacher/study-material/teacher">
                        <Table>
                            <Thead>
                                    <td>Sr no.</td>
                                    <td>Class</td>
                                    <td>Section</td>
                                    <td>Subject</td>
                                    <td>Chapter Name</td>
                                    <td>View Lession</td>
                                    <td>Add Lession</td>
                            </Thead>
                            <tbody>
                                {Object.keys(teacher_groups).length > 0 && teacher_groups.map((item,id) => {
                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item.class.class_title}</td>
                                        <td>{item.class.section}</td>
                                        <td>{item.subject.subject_name}</td>
                                        <td>{item.group_name}</td>
                                        <td><Button primary onClick={e => this.showLessions(item.id)} sm>View Lession</Button></td>
                                        <td><Button primary sm onClick={e => this.addLession(item.id)}>Add Lession</Button></td>
                                    </tr>
                                }) }
                            </tbody>
                        </Table>
                    </CardComponent>
                    {show_lession_id && 
                        <Suspense fallback={<h1>Loading Component ... </h1>}>
                            <ViewEditLessions type={1} show_lession_id={show_lession_id}/>
                        </Suspense>
                    }
                    {add_group_id &&
                     <Suspense fallback={<h1>Loading Component ... </h1>}>
                         <AddEditMaterial group_id={add_group_id} type={1} title="Add Lession"/>
                     </Suspense>
                    }
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        teacher_groups:state.teacher_groups,
    };
}

export default connect(mapStateToProps,{setTeacherGroupDispatch,setTeacherGroup})(StudyMaterialTeacherMaterial);
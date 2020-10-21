import React,{Component} from "react"
import api from "../../api"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead } from "../../utils/Components"
import EmptyHeader from "../../utils/EmptyHeader"
class TeacherDashboardHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            classes:null,
            homework:null,
            classes:null
        }
    }
    componentDidMount(){
        api.adminteacher.dashboard().then(data => {
            const {classes,homework,question,studyMaterialGroups,teacher} = data
            this.setState({
                classes,homework,question,studyMaterialGroups,teacher
            })
        })
    }
    render(){
        const {classes} = this.state
        return(
            <div>
            <EmptyHeader mainHeader="Dashboard"/>
            <BodyComponent>
                <div className="col-md-6">
                    <CardComponent title="Assigned Classes">
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Class</th>
                                <th>Section</th>
                            </Thead>
                            <tbody>
                                {
                                    classes != null && classes.map((item,id) => {
                                        console.log(classes)
                                        return <tr>
                                            <td>{id+1}</td>
                                            <td>{item.class_title}</td>
                                            <td>{item.section}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </CardComponent>
                </div>
            </BodyComponent>
            </div>
        )
    }
}


export default TeacherDashboardHome
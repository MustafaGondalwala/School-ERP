import React,{Component} from "react"
import api from "../../api"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, userTypeString } from "../../utils/Components"
import EmptyHeader from "../../utils/EmptyHeader"
class ParentCurrentMonthlyTest extends Component{
    constructor(props){
        super(props)
        this.state = {
            monthlyTest: [],
            loading: true,
            user_type: null
        }

    }
    
    async componentWillMount(){
        var {student_id} = this.props.match.params
        var data = JSON.parse(localStorage.getItem('userAccount'))
        var class_id = data.info.filter(item => item.id == student_id)[0].class_id
        
        var user_type = userTypeString(localStorage.getItem('user_type'))
        this.setState({
            user_type:user_type
        })


        await api.monthlytest_classwise(class_id).then(data => {
            const {monthlyTest} = data
            this.setState({
                monthlyTest,
                loading:false
            })
        })
    }
    render(){
        const {loading,monthlyTest,user_type} = this.state
        var {student_id} = this.props.match.params
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="Monthly Test" sub_header="Upcoming Monthly Test"  />
                <BodyComponent>
                    
                    {
                        loading ? <CardComponent><h3>Loading Data ...</h3></CardComponent>
                        : 
                        <CardComponent title="Monthly Test" back_link={"/"+user_type+"/exam/"+student_id}>
                            <Table>
                                <Thead>
                                    <th>Sr no.</th>
                                    <th>Monthly Test</th>
                                    <th>Min Marks</th>
                                    <th>Max Marks</th>
                                    <th>Monthly Test Date</th>
                                    <th>Publish</th>
                                </Thead>
                                <tbody>
                                    {
                                        monthlyTest.length > 0 && monthlyTest.map((item,id) => {
                                            return <tr>
                                            <td>{id+1}</td>
                                            <td>{item.monthly_test}</td>
                                            <td>{item.min_marks}</td>
                                            <td>{item.max_marks}</td>
                                            <td>{new Date(item.monthly_test_date).toLocaleDateString()}  {new Date(item.monthly_test_date).toLocaleTimeString()}</td>
                                            <td>{new Date(item.monthly_test_date).toLocaleDateString()}  {new Date(item.publish_at).toLocaleTimeString()}</td>
                                            <td></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardComponent>
                    }
                </BodyComponent>
            </div>
        )
    }
}


export default ParentCurrentMonthlyTest
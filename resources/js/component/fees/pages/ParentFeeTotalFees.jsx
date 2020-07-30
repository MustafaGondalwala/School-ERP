import React,{Suspense,Component} from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import ColComponent from "../../utils/ColComponent";
import api from "../../api";
import CardComponent from "../../utils/CardComponent";
import { Table, Thead } from "../../utils/Components";
const FeeSetIndividualForm = React.lazy(() => import("../form/FeeSetIndividualForm"))



class ParentFeeTotalFees extends Component{
    constructor(props){
        super(props)
        this.state = {
            fee_individual:""
        }
    }
    componentDidMount(){
        const {student_id} = this.props.match.params
        api.parent.fee.get_individual_feesRead({student_id}).then(data => {
            const {fee_individual} = data 
            this.setState({
                fee_individual
            })
        })
    }
    render(){
        const {fee_individual} = this.state
        const {student_id} = this.props.match.params
        var main_amount = 0;
        var main_total_waiver = 0;
        var main_total_amount = 0;

        return(
            <div>
                <EmptyHeader mainHeader="Fee" header="Total Fees"/>
                <BodyComponent>
                    <CardComponent title="Student Fees" back_link={"/parent/fees/"+student_id}>
                        <Table>
                            <Thead>
                                <th>Sr No.</th>
                                <th>Installments</th>
                                <th>Amount</th>
                                <th>Total Waiver</th>
                                <th>Total Amount</th>
                            </Thead>
                            <tbody>
                                
                                {fee_individual && Object.keys(fee_individual).map((item,id) => {
                                    var amount =  0;
                                    var total_waiver =  0;
                                    var total_amount =  0;
                                    
                                    fee_individual[item].map(item => {
                                        amount += parseInt(item.total_amount)
                                        total_waiver += parseInt(item.waiver_amount)
                                        total_amount += parseInt(item.amount)
                                        }
                                    )
                                    main_amount += amount
                                    main_total_waiver += total_waiver
                                    main_total_amount += total_amount

                                    return <tr key={id}>
                                        <td>{id+1}</td>
                                        <td>{item}</td>
                                        <td>{amount}</td>
                                        <td>{total_waiver}</td>
                                        <td>{total_amount}</td>
                                    </tr>
                                })}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>{main_amount}</td>
                                    <td>{main_total_waiver}</td>
                                    <td>{main_total_amount}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardComponent>
                    {
                        fee_individual && 
                        <Suspense fallback={<h1>Loading ...</h1>}>
                            <FeeSetIndividualForm type="2" update_button={this.state.update_button} updateFees={this.updateFees} fee_individual={fee_individual}/>
                        </Suspense>
                    }
                </BodyComponent>
            </div>
        )
    }
}

export default ParentFeeTotalFees
import React, { Component } from "react"
import TopBreadCrumb from "../../utils/TopBreadcrumb"
import AdminFeeHeader from "../../header/admin/AdminFeeHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import PendingFeeClassWiseForm from "../form/PendingFeeClassWiseForm"
import {setFeeInstallmentsDispatch} from "../../actions/fee"
import { connect } from "react-redux";
import Row from "../../utils/Row"
import { Select, Col, SelectOption, FormGroup, FormLabel, Button } from "../../utils/Components"
import api from "../../api"

class FeeViewPendingFees extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                class_id:"1",
                installment:"1",
            },
            installment:"",
            button_text: "View",
            errors:{}
        }
        this.sendClassId = this.sendClassId.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentWillMount(){
        const {total_installment,setFeeInstallmentsDispatch} = this.props
        if(Object.keys(total_installment).length == 0)
            setFeeInstallmentsDispatch();
        this.submit()
    }
    sendClassId(class_id){
        this.setState({
            data: {...this.state.data,["class_id"]: class_id}
        })
    }
    validate(data){
        const errors = {};
        if (!data.class_id) errors.class_id = "Can't be blank";
        if (!data.installment) errors.installment = "Can't be blank";
        return errors;
    }
    submit(){
        const {data} = this.state
        const errors = this.validate(data)
        this.setState({ errors })
        if(Object.keys(errors).length == 0 ){
            api.adminclerk.fee.pending_fees.get_classwise(data).then(data => {
                this.setState({
                    installment:data.installment
                })
            })
        }
    }
    render(){
        const {class_id,installment,button_text,errors,data} = this.state
        const {total_installment} = this.props
        return(
            <div>
                <TopBreadCrumb mainHeader="Fee" header="View Pending Fees">
                    <AdminFeeHeader />
                </TopBreadCrumb>
                <BodyComponent>
                    <CardComponent title="Select Class" back_link={'/admin/fees'}>
                        <GetClassId errors={errors} sendClassId={this.sendClassId} class_id={data.class_id}/>
                        <br />
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <FormLabel>Installment</FormLabel>
                                    <Select name="installment" errors={errors} value={data.installment} onChange={e => {
                                        this.setState({
                                            data: {...this.state.data,["installment"]: e.target.value}
                                        })
                                    }}>
                                        <SelectOption> -- Select -- </SelectOption>
                                        {Object.keys(total_installment).length > 0 && total_installment.map(item => {
                                            return <SelectOption value={item.id}>{item.installment}</SelectOption>
                                        })}
                                    </Select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Button primary sm onClick={this.submit}>{button_text}</Button>
                            </Col>
                        </Row>
                    </CardComponent>
                    {installment && <PendingFeeClassWiseForm installment_id={data.installment} installment={installment}/>}
                </BodyComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        total_installment:state.installments
    };
}

export default connect(mapStateToProps,{setFeeInstallmentsDispatch})(FeeViewPendingFees);


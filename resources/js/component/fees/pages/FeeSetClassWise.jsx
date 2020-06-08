import React,{Component} from "react"
import AdminHeader from "../header/AdminHeader"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import YearSelectComponent from "../../utils/YearSelectComponent"
import api from "../../api"
import {setFeeType} from "../../actions/fee"
import { connect } from "react-redux";
import FeeClassWiseForm from "../form/FeeClassWiseForm"

class FeeSetClassWise extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_id:"",
            year_id:"",
            fetch_button:"Fetch",
            errors:{},
            fee_class_wise:""
        }
        this.changeClassId = this.changeClassId.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {feeType} = this.props
        if(Object.keys(feeType).length == 0)
            this.props.setFeeType();
        this.setState({
            class_id:"1"
        },() => {
            this.fetchClass();
        })
    }
    changeClassId(class_id){
        this.setState({
            class_id
        })
    }
    fetchClass(){
        this.setState({
            fetch_button:"Fetching ..."
        })   
        var class_id = this.state.class_id
        var year_id = this.state.year_id
        api.admin.fee.get_classwise_fees(class_id,year_id).then(data => {
            this.setState({
                fee_class_wise:data.fee_class_wise,
                fetch_button:"Fetch",
            })

        })
    }
    onChange(e){
        var year_id = e.target.value
        this.setState({
            year_id
        })
    }
    render(){
        const {fetch_button,fee_class_wise,class_id,year_id} = this.state
        return(
            <div>
                <AdminHeader mainHeader="Fee" header="Set Class Wise"/>
                <div className="container-fluid mt--6">
                    <CardComponent title="Select Class and Section" back_link="/admin/fees">
                            <div className="row">
                                <div className="col-md-9">
                                    <GetClassId  errors="" sendClassId={this.changeClassId}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <YearSelectComponent errors="" colType="col-md-4" label="Select Year" onChange={this.onChange}/>
                                </div>
                            </div>
                            <div class="row">
                                <button className="btn btn-primary" onClick={e => this.fetchClass()}>{fetch_button}</button>
                            </div>
                    </CardComponent>
                    {fee_class_wise &&
                        <FeeClassWiseForm class_id={class_id} year_id={year_id} fee_class_wise={fee_class_wise}/>
                    }


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      feeType:state.feeType
    };
}

export default connect(mapStateToProps,{setFeeType})(FeeSetClassWise);

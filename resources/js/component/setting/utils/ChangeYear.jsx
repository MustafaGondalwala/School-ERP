import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import {setYearDispatch,setYear} from "../../actions/setYear"
import { connect } from "react-redux";
import Row from "../../utils/Row";
import { Col, FormGroup, FormLabel, Select } from "../../utils/Components";
import Swal from "sweetalert2"
import axios from "axios"
class ChangeYear extends Component{
    componentDidMount(){
        const {years,setYearDispatch} = this.props
        if(Object.keys(years).length == 0){
            setYearDispatch()
        }
    }
    changeYear(year_id){
        Swal.fire({
            title: 'Are you sure?',
            text: "Change the Year",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change Year it!'
          }).then((result) => {
            if (result.value) {
                window.axios.defaults.headers.common['Auth-School-Year'] =  year_id;
                location.reload();
                localStorage.year_id = year_id
            }
          })
    }
    render(){
        var current_year_id = axios.defaults.headers.common['Auth-School-Year'];
        const {years} = this.props
        return(
            <div className="col-md-6">
                <CardComponent title="Change Year">
                    <div className="col-md-12">
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel>
                                        Change Years
                                    </FormLabel>
                                    <Select onChange={e => this.changeYear(e.target.value)}>
                                    <option value="" selected>-- Select --</option>
                                        {
                                            Object.keys(years).length > 0 &&
                                            years.map(item => {
                                                return <option disabled={current_year_id == item.id ? true : false} value={item.id}>{item.year}</option>
                                            })
                                        }
                                    </Select>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </CardComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        years:state.years
    };
}

export default connect(mapStateToProps,{setYearDispatch,setYear})(ChangeYear);
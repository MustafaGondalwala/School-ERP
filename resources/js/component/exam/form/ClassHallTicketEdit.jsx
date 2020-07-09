import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import api from "../../api"
import Swal from "sweetalert2";
import { connect } from "react-redux";



class ClassHallTicketEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_hallticket:"",
            button_text:"Update Hall Ticket",
            display_data:""
        }
        this.onChange = this.onChange.bind(this)
    }
    setStateData(name,value){
        this.setState({
            [name]:value
        })
    }
    async componentDidMount(){
        const {class_hallticket,classes,class_id} = this.props
        this.setStateData("class_hallticket",class_hallticket);
        const class_to_display = classes.filter(function(item) {
            return item.id == class_id;
        })[0];
        var display_data = class_to_display.class_title
        if(class_to_display.section)
            display_data += " "+class_to_display.section
        this.setStateData("display_data",display_data)
    }
    async onChange(e,index){
        const {name,value} = e.target
        const {class_hallticket} = this.state
        class_hallticket[index][name] = value
        this.setStateData("class_hallticket",class_hallticket)
    }
    async updateHallTicket(){
        const {class_hallticket} = this.state
        const {submit} = this.props
        this.setStateData("button_text","Updating Hall Ticket ...")
        submit(class_hallticket).then(data => {
            const {message} = data
            Swal.fire(
                "Success",
                message,
                "success"
            )
            this.setStateData("button_text","Update Hall Ticket")
        }).catch(error => {
            Swal.fire(
                "Error Occured",
                "Errror Occured in Process",
                "error"
            )
        })
    }
    render(){
        const {title,class_id,type} = this.props
        const {class_hallticket,button_text,display_data} = this.state
        return(
            <CardComponent title={title}>
                {display_data && <Row>
                    <Col md="4">
                        <label className="form-control-label">Class</label>
                        <input type="text" className="form-control" disabled={true} value={display_data}/>
                    </Col>
                </Row>
                }
                <br />
                <Row>
                    {class_hallticket && <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Subject</th>
                                    <th>Exam Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {class_hallticket.map((item,id) => {
                                    return <EveryRow type={type} key={id} index={id} onChange={this.onChange} row={item} />
                                })}
                            </tbody>
                        </table>
                        <button onClick={e => this.updateHallTicket()} className="btn btn-primary">{button_text}</button>
                    </div>
                    }
                </Row>
            </CardComponent>
        )
    }
}

const EveryRow = ({index,row,onChange,type, ...props}) => {
    var disabled = ""
    if(type == "view")
        disabled = true
    return(
        <tr {... props}>
            <td>
                {index+1}
            </td>
            <td>
                {row.subject.subject_name}
            </td>
            <td>
                <input disabled={disabled} type="date" name="exam_date" onChange={e => onChange(e,index)} className="form-control" value={row.exam_date || ''}/>
            </td>
            <td>
                <input disabled={disabled}  type="time" name="start_time" onChange={e => onChange(e,index)} className="form-control" value={row.start_time || ''}/>
            </td>
            <td>
                <input disabled={disabled}  type="time" name="end_time" onChange={e => onChange(e,index)} className="form-control" value={row.end_time || ''}/>
            </td>
        </tr>
    )
}

function mapStateToProps(state) {
    return {
      classes:state.classes,
    };
  }
  
  export default connect(mapStateToProps)(ClassHallTicketEdit);

  
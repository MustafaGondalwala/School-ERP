import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import Col from "../../utils/Col"
import api from "../../api"
import Swal from "sweetalert2";


class ClassHallTicketEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_hallticket:"",
            button_text:"Update Hall Ticket"
        }
        this.onChange = this.onChange.bind(this)
    }
    setStateData(name,value){
        this.setState({
            [name]:value
        })
    }
    componentDidMount(){
        const {class_hallticket} = this.props
        this.setStateData("class_hallticket",class_hallticket);
    }
    componentWillReceiveProps(){
        const {class_hallticket} = this.props
        this.setStateData("class_hallticket",class_hallticket);
    }
    onChange(e,index){
        const {name,value} = e.target
        const {class_hallticket} = this.state
        class_hallticket[index][name] = value
        this.setStateData("class_hallticket",class_hallticket)
    }
    updateHallTicket(){
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
        const {title,class_id} = this.props
        const {class_hallticket,button_text} = this.state
        return(
            <CardComponent title={title}>
                {class_id && <Row>
                    <Col md="4">
                        <label className="form-control-label">Class</label>
                        <input type="text" className="form-control" disabled={true} value={class_id}/>
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
                                    return <EveryRow key={id} index={id} onChange={this.onChange} row={item} />
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

const EveryRow = ({key,index,row,onChange}) => (
        <tr key={key}>
            <td>
                {index+1}
            </td>
            <td>
                {row.subject.subject_name}
            </td>
            <td>
                <input type="date" name="exam_date" onChange={e => onChange(e,index)} className="form-control" value={row.exam_date}/>
            </td>
            <td>
                <input type="time" name="start_time" onChange={e => onChange(e,index)} className="form-control" value={row.start_time}/>
            </td>
            <td>
                <input type="time" name="end_time" onChange={e => onChange(e,index)} className="form-control" value={row.end_time}/>
            </td>
        </tr>
)

export default ClassHallTicketEdit
import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import Swal from 'sweetalert2'
import Row from "../../utils/Row"

export default class FillExamMarksheet extends Component{
    constructor(props){
        super(props)
        this.state = {
            exam_marksheet:""
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        const {exam_marksheet} = this.props
        this.setState({
            exam_marksheet
        })
    }
    componentWillReceiveProps(){
        const {exam_marksheet} = this.props
        this.setState({
            exam_marksheet
        })
    }
    onChange(e,index){
        const {name,value} = e.target
        const {exam_marksheet} = this.state
        exam_marksheet[index][name] = value

        this.setState({
            exam_marksheet
        })
    }
    submit(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You can be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update Student Marksheet'
          }).then((result) => {
            if (result.value) {
               const {exam_marksheet} = this.state
               this.props.updateStudentMarksheet(exam_marksheet)
            }
          })
    }
    render(){
        const {student_info,class_info,type} = this.props
        const {exam_marksheet} = this.state
        return(
            <CardComponent title="Fill Marksheet">
            <div className="table_responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Subject</th>
                            <th>Min Marks</th>
                            <th>Max Marks</th>
                            <th>Total Marks</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exam_marksheet && exam_marksheet.map((item,id) => {
                            return <EveryRow key={id} onChange={this.onChange} index={id} type={type} row={item} />
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><input type="number" className="form-control"/></td>
                            <td><input type="number" className="form-control"/></td>
                            <td><input type="number" className="form-control"/></td>
                        </tr>
                    </tfoot>
                </table>
                <Row>
                    <button className="btn btn-primary" onClick={e => this.submit()}>Update</button>
                    <button className="btn btn-warning">Publish</button>

                </Row>
            </div>
            </CardComponent>
        )
    }
}

const EveryRow = ({index,type,row,onChange}) => {
    return(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{row.subject.subject_name}</td>
            <td><input type="number" name="min_marks" onChange={e => onChange(e,index)} value={row.min_marks ||''} className="form-control" /></td>
            <td><input type="number" name="max_marks" onChange={e => onChange(e,index)} value={row.max_marks ||''} className="form-control" /></td>
            <td><input type="number" name="total_marks" onChange={e => onChange(e,index)} value={row.total_marks ||''} className="form-control" /></td>
            <td><input type="text" name="grade" onChange={e => onChange(e,index)} value={row.grade ||''} className="form-control" /></td>
        </tr>
    )
}
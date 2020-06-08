import React,{Component} from "react"
import CardComponent from "../../utils/CardComponent"
import api from "../../api"
import Swal from "sweetalert2";


export default class SetInstallmentsForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            total: [
                "Installment1",
                "Installment2",
                "Installment3",
                "Installment4",
                "Installment5",
                "Installment6",
                "Installment7",
                "Installment8",
                "Installment9",
                "Installment10",
                "Installment11",
                "Installment12",
              ],
              total_installment: [],
              errors: {},
        }
    }
    componentDidMount(){
        api.admin.fee.get_installments().then(data => {
            this.setState({
                total_installment:data.installments
            })
        })
    }
    onChange(e) {
        var getCurrent = this.state.total_installment;
        if (e.target.checked) {
          getCurrent.push(e.target.name);
        } else {
          var new_current = [];
          getCurrent.map((item) => {
            if (item !== e.target.name) new_current.push(item);
          });
          getCurrent = new_current;
        }
        this.setState({
          total_installment: getCurrent,
          errors: {},
        });
      }

      onSubmit(){
          const {total_installment} = this.state;
          if(total_installment.length == 0){
            Swal.fire("Validation Error","Please select atleast One Installment","warning")
          }else{
              this.props.submit(total_installment).catch(error => {
                  Swal.fire("Error Occurred","Please try again later..","error");
              })
          }
      }
    render(){
        const {total,total_installment} = this.state
        const {button_text} = this.props
        return(
             <CardComponent title="Set Installments" back_link="/admin/fees">
                <div className="row col-md-4">
                <table className="table">
                    <tr>
                        <th>Installment</th>
                        <th>Enabled/Disabled</th>
                    </tr>
                    {total_installment && total.map(item => {
                            if(total_installment.indexOf(item) > -1)
                            {
                                return <tr>
                                <td>{item}</td>
                                <td><input name={item} value={item} checked={true} onChange={(e) => this.onChange(e)} type="checkbox" /></td>
                                </tr>  
                            }else{
                                return <tr>
                                <td>{item}</td>
                                <td><input name={item} value={item}  onChange={(e) => this.onChange(e)} type="checkbox" /></td>
                                </tr>  
                            }
                        })
                    }
                </table>
                <div className="col-md-4">
                    <button className="btn btn-primary" onClick={e => this.onSubmit()}>{button_text}</button>
                </div>
                </div>
             </CardComponent>
        )
    }
}
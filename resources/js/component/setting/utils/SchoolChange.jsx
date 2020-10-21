import { SwipeableDrawer } from "@material-ui/core"
import React,{Component} from "react"
import api from "../../api"
import CardComponent from "../../utils/CardComponent"
import { Button, FormGroup, FormLabel, Input, RedLabel } from "../../utils/Components"
import InlineError from "../../utils/InlineError"
import Swal from "sweetalert2"
export default class SchoolChange extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                name:"",
                email:"",
                location:"",
                front_pic:"",
                unique_id_code:"",
                location:""
            },
            errors:{}
        }
        this.fileChange = this.fileChange.bind(this)
    }
    componentDidMount(){
        api.admin.school_info().then(data => {
            const {schoolInfo} = data
            this.setState({
               data:schoolInfo
            })
        })
    }
    validate(data){
        const errors = {};
        if (!data.name) errors.name = "Can't be blank";
        if (!data.email) errors.email = "Can't be blank";
        if (!data.front_pic) errors.front_pic = "Can't be blank";
        if (!data.unique_id_code) errors.unique_id_code = "Can't be blank";
        if (!data.location) errors.location = "Can't be blank";
        return errors;
    }
    update_Info(){
        const errors = this.validate(this.state.data)
        this.setState({errors})
        if(Object.keys(errors).length == 0){
            const formData = new FormData;
            Object.keys(this.state.data).map(item => {
                formData.append(item,this.state.data[item])
            })
            console.log(formData)

            api.admin.update_schoolInfo(formData).then(data => {
                const {message} = data
                Swal.fire("Success",message,"success")
            })
        }
    }
    onChange(e){
        const {name,value} = e.target
        this.setState({
            data: {...this.state.data,[name]: value}
        })
    }
    fileChange(e){
        const {name,files} = e.target
        this.setState({
            data: {...this.state.data,[name]: files[0]}
        })
    }
    render(){
        const {data,errors} = this.state
        return(
            <div className="col-md-6">
                <CardComponent title="School Setting">
                    <FormGroup>
                        <FormLabel>Logo</FormLabel>
                        <Input errors={errors} name="front_pic" type="file" onChange={e => this.fileChange(e)} className="form-control" />
                        {
                            typeof(data.front_pic) == "string" ? <img className="img img-thumbnail" src={data.front_pic}/> : <img className="img img-thumbnail" src={URL.createObjectURL(data.front_pic)}/>
                        }
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>School Name</FormLabel>
                        <Input errors={errors} onChange={e => this.onChange(e)} name="name" value={data.name} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>School Email</FormLabel>
                        <Input errors={errors} onChange={e => this.onChange(e)} type="email" name="email" value={data.email}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>School Unique ID</FormLabel>
                        <Input errors={errors} onChange={e => this.onChange(e)} name="unique_id_code" value={data.unique_id_code}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Address</FormLabel>
                        <textarea className="form-control" onChange={e => this.onChange(e)} name="location" value={data.location} />
                        {
                            errors.location && <InlineError text={errors.location}/>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={e => this.update_Info()} primary>Update</Button>
                    </FormGroup>
                </CardComponent>
            </div>
        )
    }
}
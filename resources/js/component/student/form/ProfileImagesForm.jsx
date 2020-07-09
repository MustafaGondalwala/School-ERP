import React, { Component } from "react"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, PreviewSingleImage, UploadImage } from "../../utils/Components"
import api from "../../api"


export default class ProfileImagesForm extends Component{
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        const {name,files} = e.target
        const file = files[0]
        const id = e.target.getAttribute('data-id')
        this.props.submit(name, file, id)
    }
    render(){
        const {data} = this.props
        return(
            <CardComponent title="Student List">
                <Table>
                    <Thead>
                        <th>Sr no.</th>
                        <th>Student Name</th> 
                        <th>Roll No</th>  
                        <th>Student Photo</th>
                        <th>Father Photo</th>
                        <th>Mother Photo</th>
                        <th>Last Marksheet</th>
                        <th>Transfer Certificate</th>
                        <th>Income Certificate</th>
                        <th>Cast Certificate</th>
                        <th>DOB Certificate</th>
                        <th>Student Aadhar Card</th>
                        <th>Father Aadhar Card</th>
                        <th>Updated At</th>
                    </Thead>
                    <tbody>
                        {data && data.map((item,id) => {
                            const {photos} = item
                            return [
                                <tr>
                                    <td>{id+1}</td>
                                    <td>{item.student_name}</td>
                                    <td>{item.roll_no}</td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange}  name="student_photo" /> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="father_photo"/> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="mother_photo"/> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="last_marksheet"/> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="transfer_certificate"/> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="income_certificate" /></td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="caste_certificate"/> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="dob_certificate"/> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="student_aadhar_card_photo"/> </td>
                                    <td><UploadImage data-id={photos.id} onChange={this.onChange} name="father_aadhar_card_photo"/> </td>
                                    <td>{new Date(photos.updated_at).toLocaleString()}</td>
                                </tr>,
                                    <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><PreviewSingleImage url={photos.student_photo}/></td>
                                    <td><PreviewSingleImage url={photos.father_photo}/></td>
                                    <td><PreviewSingleImage url={photos.mother_photo}/></td>
                                    <td><PreviewSingleImage url={photos.last_marksheet}/></td>
                                    <td><PreviewSingleImage url={photos.transfer_certificate}/></td>
                                    <td><PreviewSingleImage url={photos.income_certificate}/></td>

                                    <td><PreviewSingleImage url={photos.caste_certificate}/></td>
                                    <td><PreviewSingleImage url={photos.dob_certificate}/></td>
                                    <td><PreviewSingleImage url={photos.student_aadhar_card_photo}/></td>
                                    <td><PreviewSingleImage url={photos.father_aadhar_card_photo}/></td>
                                </tr>
                                ];
                        })}
                    </tbody>
                </Table>
            </CardComponent>
        )
    }
}

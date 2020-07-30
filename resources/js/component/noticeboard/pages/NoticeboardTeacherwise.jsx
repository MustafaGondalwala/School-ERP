import React, { Component } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import { Table, Thead, Button } from "../../utils/Components"
import api from "../../api"

class NoticeboardTeacherwise extends Component{
    constructor(props){
        super(props)
        this.state = {
            notices:""
        }
    }
    componentDidMount(){
        api.staff.notices.view().then(data => {
            const {notices} = data
            this.setState({
                notices
            })
        })
    }
    render(){
        const { notices } = this.state
        return(
            <div>
                <EmptyHeader mainHeader="Noticeboard"/>
                <BodyComponent>
                    <CardComponent title="Notices">
                        <Table>
                            <Thead>
                                <th>Sr no.</th>
                                <th>Title</th>
                                <th>Notice</th>
                                <th>Attachment</th>
                                <th>Publish At</th>
                            </Thead>
                            <tbody>
                                {notices && notices.map((item,id) => {
                                    return <tr>
                                        <td>{id+1}</td>
                                        <td>{item.title}</td>
                                        <td><div dangerouslySetInnerHTML={{__html: item.body}} /></td>
                                        <td><a download className="btn btn-primary btn-sm" href={item.image_url}>Attachment</a></td>
                                        <td>{new Date(item.created_at).toISOString()}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardComponent>
                </BodyComponent>
            </div>
        )
    }
}

export default NoticeboardTeacherwise
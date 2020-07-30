import React from "react"
import CardComponent from "../../utils/CardComponent"
import Row from "../../utils/Row"
import {Col,Button, getKey, Thead, Table} from "../../utils/Components"


export default class ViewTeacherTable extends React.Component {
    render() {
      const { teachers } = this.props;
      return (
          <div>
            <Table>
              <Thead>
                <th>Sr No.</th>
                <th>EmpID</th>
                <th>Teacher Name</th>
                <th>Contact No</th>
                <th>Date of Joining</th>
                <th>DOB</th>
                <th>Blood Group</th>
                <th>View</th>
                <th>Edit</th>
                <th>Drop</th>
              </Thead>
              <tbody>
                {teachers && teachers.map((item,id) => {
                    return <tr key={getKey()}>
                      <td>{id+1}</td>
                      <td>{item.empid}</td>
                      <td>{item.user.staff_name}</td>
                      <td>{item.user.contact_no}</td>
                      <td>{item.user.date_of_joining}</td>
                      <td>{item.user.dob}</td>
                      <td>{item.user.blood_group}</td>
                      <td><Button sm primary onClick={e => this.props.history.push("/admin/teacher/view/"+item.id)}>View</Button></td>
                      <td><Button sm warning onClick={e => this.props.history.push("/admin/teacher/edit/"+item.id)}>Edit</Button></td>
                      <td><Button sm danger onClick={e => this.props.history.push("/admin/teacher/drop/"+item.id)}>Drop</Button></td>
                    
                    </tr>
                })} 
              </tbody>
            </Table>
         </div>
      );
    }
  }
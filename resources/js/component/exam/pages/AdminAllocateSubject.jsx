import React, { Component, Suspense } from "react"
import EmptyHeader from "../../utils/EmptyHeader"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import GetClassId from "../../utils/GetClassId"
import api from "../../api"
const AllocateSubjectForm = React.lazy(() => import("../form/AllocateSubjectForm")) 

class AdminAllocateSubject extends Component{
    constructor(props){
        super(props)
        this.state = {
            class_id : "",
            subjectclasswise:""
        }
        this.sendClassId = this.sendClassId.bind(this)
    }
    getClassWithSubject(class_id){
        this.setState({
            subjectclasswise:""
        })
        api.admin.class.subject_class_wise(class_id).then(data =>{
            const {subjectclasswise} = data
            this.setState({
                subjectclasswise
            })
        })
    }
    
    sendClassId(class_id){ 
        this.setState({
            class_id
        })
        this.getClassWithSubject(class_id)
    }
    render(){
        const {class_id,subjectclasswise} = this.state
        return(
            <div>
                <EmptyHeader mainHeader="Exam" header="Allocated Subject to Class"/>
                <BodyComponent>
                    <CardComponent title="Allocate Subjects to Class" back_link={"/admin/exam"}>
                        <GetClassId class_id={class_id} sendClassId={this.sendClassId}/>
                    </CardComponent>
                    {subjectclasswise && 
                        <Suspense fallback={<h1>Loading Component ...</h1>}>
                        <AllocateSubjectForm subjectclasswise={subjectclasswise} class_id={class_id}/>}
                        </Suspense>
                    }
                </BodyComponent>
            </div>
        )
    }
}

export default AdminAllocateSubject
import React,{Component} from "react"
import BodyComponent from "../../utils/BodyComponent"
import CardComponent from "../../utils/CardComponent"
import EmptyHeader from "../../utils/EmptyHeader"
import ChangeYearTeacher from "../utils/ChangeYearTeacher"


export default class AdminHomePage extends Component{
    render(){
        return(
            <div>
             <EmptyHeader mainHeader="Setting"/>
                <div className="container-fluid mt--6">
                <div className="row">
                    <ChangeYearTeacher />
                </div>
                </div>
            </div>
        )
    }
}

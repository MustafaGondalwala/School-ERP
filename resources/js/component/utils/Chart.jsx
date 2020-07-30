import React, { Component } from "react"
import CanvasJSReact from '../../assets/canvasjs.react';
import CardComponent from "./CardComponent";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
import { Select, SelectOption } from "../utils/Components"


const generateKey = (pre) => {
  return `${ pre }_${ new Date().getTime() }`;
}

const Chart  = ({file_name,title,type,dataPoints,id}) => {
	const options = {
      animationEnabled: true,
      exportFileName: file_name,
      theme: "light2",
      title:{
        text: title
      },
      exportEnabled: true,
      data: [{
        type: type,
        dataPoints: dataPoints
    }]
    };
	return(
    	<CanvasJSChart id={id} options = {options} />
	)
}


export class ReactChartCard extends Component{
  constructor(props){
    super(props)
    this.state = {
      type:"pie"
    }
  }
  componentDidMount(){
    const {type} = this.props
    if(type){
      this.setState({
        type
      })
    }
  }
  render(){
    const {title,options,file_name,dataPoints} = this.props
    const {type} = this.state
    return(
      <CardComponent title={title}>
          <Select name="type" value={type} onChange={e => {
            this.setState({
              type:e.target.value
            })
          }}>
              <SelectOption value="pie">Pie</SelectOption>
              <SelectOption value="line">Line</SelectOption>
              <SelectOption value="doughnut">Doughnut</SelectOption>
              <SelectOption value="bar">Bar</SelectOption>
              <SelectOption value="scatter">Scatter</SelectOption>
              <SelectOption value="area">Area</SelectOption>
              <SelectOption value="funnel">Funnel</SelectOption>
              <SelectOption value="column">Column</SelectOption>
              <SelectOption value="pyramid">Pyramid</SelectOption>
              <SelectOption value="stackedBar100">Stacked</SelectOption>
              <SelectOption value="stepLine">StepLine</SelectOption>
            </Select>
            <br />
          <Chart filename={file_name} dataPoints={dataPoints} id={generateKey()} type={type}/>
      </CardComponent>
    )
  }
}

export default Chart
import React from "react"
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const Chart  = ({file_name,title,type,dataPoints}) => {
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
    	<CanvasJSChart options = {options} />
	)
}

export default Chart
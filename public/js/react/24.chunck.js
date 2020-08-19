(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./resources/js/component/homework/form/SubmitHomeWork.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/component/homework/form/SubmitHomeWork.jsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import React, { Component } from "React"
// // import Row from "../../utils/Row";
// // import CardComponent from "../../utils/CardComponent"
// // import { Col, FormGroup, FormLabel,UploadMutitpleMutiples,PreviewFiles, Button } from "../../utils/Components";
// // import CKEditor from "@ckeditor/ckeditor5-react";
// // import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// // import InlineError from "../../utils/InlineError";
// // import api from "../../api";
// // import Swal from "sweetalert2"
// class SubmitHomeWork extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             description:"",
//             files:"",
//             image_url:"",
//             errors:{}
//         }
//         this.onFileChange = this.onFileChange.bind(this)
//         this.submit = this.submit.bind(this)
//     }
//     onFileChange(e){
//         const {name,files} = e.target
//         var files_array = []
//         Object.keys(files).map(item => {
//           files_array.push(files[item])
//         })
//         this.setState({
//           files:files_array
//         })
//         const image_url = []
//         if(Object.keys(files).length > 0){
//           Object.keys(files).map(item => {
//             image_url.push(URL.createObjectURL(files[item]))
//           })
//         }
//         this.setState({
//          "image_url": image_url,
//         });
//     }
//     validate(data){
//         const errors = {};
//         if (!data.description) errors.description = "Can't be blank";
//         return errors;
//     }
//     submit(){
//         const errors = this.validate(this.state)
//         this.setState({errors})
//         if(Object.keys(errors).length == 0){
//             let formData = new FormData();
//             const data = this.state
//             const {files} = data
//             const {homework_id,student_id} = this.props
//             formData.append("description",data.description)
//             formData.append("homework_id",homework_id);
//             formData.append("student_id",student_id);
//             for (let i = 0; i < files.length; i++) {
//             formData.append(`files[${i}]`, files[i])
//             }
//             Swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, delete it!'
//               }).then((result) => {
//                 if (result.value) {
//                     api.parentstudent.homework.submit(formData).then(data => {
//                         this.props.sendEventType("hide")
//                         Swal.fire("Success",data.message,"success");
//                     })
//                 }
//               })
//         }
//     }
//     render(){
//         const {description,image_url,errors} = this.state;
//         return(
//             <CardComponent title="Submit HomeWork">
//                 <Row>
//                     <Col>
//                         <FormGroup>
//                             <FormLabel>
//                                 Description
//                             </FormLabel>
//                             <CKEditor
//                                 editor={ClassicEditor}
//                                 data={description}
//                                 onChange={(event, editor) => {
//                                 const data = editor.getData();
//                                 this.setState({
//                                     description: data,
//                                 });
//                                 }}
//                                 onInit={(editor) => {
//                                     editor.setData(description);
//                                 }}
//                             />
//                             {errors.description && <InlineError text={errors.description}/>}
//                         </FormGroup>
//                         <FormGroup>
//                             <FormLabel>
//                                 Upload Files
//                             </FormLabel>
//                             <UploadMutitpleMutiples onChange={this.onFileChange} name="files"/>
//                             <PreviewFiles files={image_url}/>
//                         </FormGroup>
//                         <FormGroup>
//                             <Button warning onClick={this.submit}>Submit</Button>
//                         </FormGroup>
//                     </Col>
//                 </Row>
//             </CardComponent>
//         )
//     }
// }
// export default SubmitHomeWork

/***/ })

}]);
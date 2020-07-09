import React, { Component } from "react";
import StudyMatrialTeacherHeader from "../header/StudyMatrialTeacherHeader";
import TopBreadCrumb from "../../utils/TopBreadcrumb";
import BodyComponent from "../../utils/BodyComponent";
import CardComponent from "../../utils/CardComponent";
import GetClassId from "../../utils/GetClassId";

import Row from "../../utils/Row";
import Col from "../../utils/Col";
import {
  Input,
  FormGroup,
  FormLabel,
  SelectOption,
  Button,
  Table,
  Thead,
  Select,
  PreviewAttachment,
} from "../../utils/Components";
import InlineError from "../../utils/InlineError";
import api from "../../api";
import Swal from "sweetalert2";

import { setGroupDispatch, setGroup } from "../../actions/study_material";
import { connect } from "react-redux";
import { data } from "jquery";
import DataTable, { createTheme } from "react-data-table-component";
import AddEditMaterial from "../form/AddEditMaterial";

class SelectGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_group: "",
      addshow:false
    };
    this.onChange = this.onChange.bind(this);
    this.addShow = this.addShow.bind(this);
  }
  async componentDidMount() {
    const { class_id } = this.props.match.params;
    const { groups, setGroupDispatch } = this.props;
    if (Object.keys(groups).length == 0 || groups[class_id] == undefined) {
      setGroupDispatch(class_id);
    }
  }
  onStateChange(name,value){
    this.setState({
        [name]:value
    })
  }
  onChange(e) {
    const { class_id } = this.props.match.params;
    const { value } = e.target;
    const { groups } = this.props;
    const selected_group = groups[class_id].filter(
      (item) => item.id == value
    )[0];
    this.setState({
      selected_group,
      addshow:false,
    });
  }
  addShow(){
      const {addshow} = this.state
      if(addshow == true)
        this.onStateChange("addshow",false)
    else
        this.onStateChange("addshow",true)
  }
  render() {
    const { class_id } = this.props.match.params;
    const { groups } = this.props;
    const { selected_group,addshow } = this.state;
    return (
      <div>
        <TopBreadCrumb mainHeader="Study Material" header="Group">
          <StudyMatrialTeacherHeader />
        </TopBreadCrumb>
        <BodyComponent>
          <CardComponent title="Select Group" add_object={{"text":"Add","clickFunction":e => this.addShow()}}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <FormLabel>Select Group</FormLabel>
                  <Select
                    value={data.group}
                    onChange={this.onChange}
                    name="group"
                  >
                    <SelectOption>-- Select --</SelectOption>
                    {groups[class_id] !== undefined &&
                      groups[class_id].map((item, id) => {
                        return (
                          <SelectOption key={id} value={item.id}>
                            {item.group_name}
                          </SelectOption>
                        );
                      })}
                  </Select>
                </FormGroup>
              </Col>
            </Row>
          </CardComponent>
          {addshow && <AddEditMaterial type={1} title={"Add Study Material"} class_id={class_id} />}
          {selected_group && (
            <StudyMaterialPanel selected_group={selected_group} />
          )}
        </BodyComponent>
      </div>
    );
  }
}

class StudyMaterialPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            view:"",
            edit:""
        }
        this.stateChange = this.stateChange.bind(this)
    }
    stateChange(name,value){
        this.setState({
            [name]:value
        })
    }
    eventType(type,row){
        switch(type){
            case "view":
                this.setState({
                    view:""
                },() => {
                    this.setState({
                        view:row
                    })
                })
                break
        }
    }
    render() {
    const { selected_group } = this.props;
    const title = "Group Name: " + selected_group.group_name;
    const { materials } = selected_group;
    const columns = [
      {
        name: "Title",
        sortable: true,
        selector: "title",
      },
      {
        name: "Sub-Title",
        sortable: true,
        selector: "subtitle",
      },
      {
        name: "View",
        cell: (row) => (
          <div>
            <Button primary sm onClick={e =>this.eventType("view",row)}>
              View
            </Button>
          </div>
        ),
      },
      {
        name: "Actions",
        cell: (row) => (
            <div>
              <a
                href="#!"
                onClick={(e) => this.eventType("edit",row)}
                className="table-action"
                data-toggle="tooltip"
                data-original-title="Edit product"
              >
                <i className="fas fa-user-edit" />
              </a>
              <a
                href="#!"
                onClick={(e) => this.removeClass(row)}
                className="table-action table-action-delete"
                data-toggle="tooltip"
                data-original-title="Delete product"
              >
                <i className="fas fa-trash" />
              </a>
              </div>
        ),
      },
    ];
    const {view} = this.state
    return [
        <span>
            <DataTable
            title={title}
            columns={columns}
            data={materials}
            theme="solarized"
            />
            <br />
            <br />
        </span>,
        <span>
            {view && <AddEditMaterial title="View Study Material" type={2} data={view}/>}
        </span>
    ];
  }
}



function mapStateToProps(state) {
  return {
    groups: state.studyMaterialGroup,
  };
}

export default connect(mapStateToProps, { setGroupDispatch, setGroup })(
  SelectGroup
);

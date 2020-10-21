import React,{Component} from "react"
import InlineError from "./InlineError"
import api from "../api"
import { connect } from "react-redux";
import {setDistinctClasses,setClasses} from "../actions/classes"
import { Col, FormLabel } from "./Components";
import Row from "./Row";
class GetClassId extends Component {
    constructor(props) {
      super(props);
      this.state = {
        section: [],
        distinct_classes: [],
        classes: [],
        class_: "",
        default_value:"",
        section_: "",
      };
      this.onChange = this.onChange.bind(this);
      this.getClassSection = this.getClassSection.bind(this);
    }
    componentDidMount() {
      var self = this;
      const {classes,class_id} = this.props
      if(Object.keys(classes).length == 0){
        api.class().then(data => {
          const uniqueClasses = [];
          data.classes.map((item) => {
            if (uniqueClasses.indexOf(item.class_title) === -1) {
              uniqueClasses.push(item.class_title);
            }
          });
          self.props.setDistinctClasses(uniqueClasses);
          self.props.setClasses(data.classes);
          self.setState({
            classes: data.classes,
            distinct_classes: uniqueClasses,
          });
        })
      }else{
        self.setState({
          classes: this.props.classes,
          distinct_classes: this.props.distinct_classes,
        });
      }
    }
  
    getClassSection(class_name, section) {
      this.state.classes.map((item) => {
        if ((item.class_title == class_name) & (item.section == section)) {
          this.props.sendClassId(item.id);
        }
      });
    }
    onChangeClasses(e) {
      var value = e.target.value;
      var value_by = [];
      this.state.classes.map((item) => {
        if (item.class_title == value) {
          value_by.push(item.section);
        }
      });
      this.setState({
        section: value_by,
      });
      this.setState({
        class_: e.target.value,
      });
      if (value_by.length > 0) {
        this.setState(
          {
            section_: value_by[0],
          },
          () => {
            this.getClassSection(this.state.class_, this.state.section_);
          }
        );
      } else {
        this.setState({
          section_: "",
          section: [],
        });
      }
    }
  
    onChange(e) {
      this.setState(
        {
          [e.target.name]: e.target.value,
        },
        () => {
          this.getClassSection(this.state.class_, this.state.section_);
        }
      );
    }
    render() {
      const { errors,class_id,classes,disabled,md,sm } = this.props;
      var default_value = "";
      
      if(classes.length > 0){
        classes.map(item => {
         if(item.id == class_id){
          default_value = item.class_title
         }
        })
      }
      
      return (
        <div>
          {this.state.distinct_classes.length > 0 ?
            <Row>
              <Col md={md || 6} sm={sm || 6}>
                <FormLabel>
                  Class
                </FormLabel>
                <select
                    className="form-control"
                    name="class"
                    disabled={disabled}
                    onChange={(e) => this.onChangeClasses(e)}
                    value={default_value}
                  >
                    <option value="">Select Class</option>
                    {this.state.distinct_classes.map(function (item,key) {
                      if(item == class_id){
                        return <option selected={true} key={key} value={item}>{item}</option>;
                      }else{
                        return <option key={key} value={item}>{item}</option>;
                      }
                    })}
                  </select>
                  {errors != undefined && 
                    <span>{errors.class_id && <InlineError text={errors.class_id} />}</span>
                  }
              </Col>
              <Col md={md || 6} sm={sm || 6}>
                  <FormLabel>Section</FormLabel>
                  <select
                    className="form-control"
                    value={this.section_}
                    disabled={disabled}
                    name="section_"
                    onChange={(e) => this.onChange(e)}
                  >
                    {this.state.section &&
                      this.state.section.map((item,key) => {
                        if (item != null) return <option key={key} value={item}>{item}</option>;
                      })}
                  </select>
              </Col>
            </Row>
          : <h5>Loading Classes ...</h5>}
          </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    classes:state.classes,
    distinct_classes:state.distinct_classes
  };
}

export default connect(mapStateToProps,{setDistinctClasses,setClasses})(GetClassId);

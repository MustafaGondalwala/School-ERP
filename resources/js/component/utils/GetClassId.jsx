import React,{Component} from "react"
import InlineError from "./InlineError"
import api from "../api"
import { connect } from "react-redux";
import {setDistinctClasses,setClasses} from "../actions/classes"
class GetClassId extends Component {
    constructor(props) {
      super(props);
      this.state = {
        section: [],
        distinct_classes: [],
        classes: [],
        class_: "",
        section_: "",
      };
      this.onChange = this.onChange.bind(this);
      this.getClassSection = this.getClassSection.bind(this);
    }
    componentDidMount() {
      var self = this;
      if(Object.keys(this.props.classes).length == 0){
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
      const { errors,class_id } = this.props;
      return (
        <div>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols3Input">
                Class
              </label>
              <select
                className="form-control"
                name="class"
                onChange={(e) => this.onChangeClasses(e)}
                value={class_id}
              >
                <option value="">Select Class</option>
                {this.state.distinct_classes.map(function (item,key) {
                  return <option key={key} value={item}>{item}</option>;
                })}
              </select>
              {errors.class_id && <InlineError text={errors.class_id} />}
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols3Input">
                Section
              </label>
              <select
                className="form-control"
                value={this.section_}
                name="section_"
                onChange={(e) => this.onChange(e)}
              >
                {this.state.section &&
                  this.state.section.map((item,key) => {
                    if (item != null) return <option key={key} value={item}>{item}</option>;
                  })}
              </select>
            </div>
          </div>
        </div>
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

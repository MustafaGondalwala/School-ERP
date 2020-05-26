import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856" }}>{text}</span>
);

export class SetDueDateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_installment_input: "",
      errors: "",
    };
    this.onChange = this.onChange.bind(this);
    this.fetchYearandInstallments = this.fetchYearandInstallments.bind(this);
  }

  fetchYearandInstallments() {
    var self = this;
    axios({
      method: "post",
      url: "/api/v1/fee/get-total-installments",
      data: self.props,
    }).then((response) => {
      var main = [];
      response.data.success.total_installment.map(function (item) {
        if (item.due_date == null) {
          item.due_date = "";
        }
        var data = {
          installments: item.installments,
          input_data: item.due_date,
        };
        main.push(data);
      });
      self.setState({
        total_installment_input: main,
      });
    });
  }
  componentDidMount() {
    this.setState({
      total_installment_input: "",
    });
    this.fetchYearandInstallments();
  }
  componentWillReceiveProps() {
    this.setState({
      total_installment_input: "",
    });
    this.fetchYearandInstallments();
  }
  onChange(e) {
    var total_installment_input = this.state.total_installment_input;
    total_installment_input.map((item) => {
      if (e.target.name == item.installments) {
        item.input_data = e.target.value;
      }
    });
    this.setState({
      total_installment_input: total_installment_input,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state.total_installment_input);
  }
  render() {
    const { installments, data } = this.state;
    const self = this;
    return (
      <form>
        {this.state.errors && <InlineError text={this.state.error} />}
        {this.state.total_installment_input ? (
          this.state.total_installment_input.map(function (item) {
            return (
              <div className="form-group">
                <label>{item.installments} Due Date</label>
                <input
                  type="date"
                  defaultValue={item.input_data}
                  data={item.input_data}
                  onChange={(e) => self.onChange(e)}
                  name={item.installments}
                  className="form-control"
                />
              </div>
            );
          })
        ) : (
          <h2>Loading ...</h2>
        )}
        <button onClick={(e) => self.onSubmit(e)} className="btn btn-primary">
          {this.props.add_text_button}
        </button>
      </form>
    );
  }
}

export class SetInstallmentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: [
        "Installment1",
        "Installment2",
        "Installment3",
        "Installment4",
        "Installment5",
        "Installment6",
        "Installment7",
        "Installment8",
        "Installment9",
        "Installment10",
        "Installment11",
        "Installment12",
      ],
      total_installment: [],
      errors: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    var self = this;
    axios({
      url: "/api/v1/fee/get-total-installments-only-installments",
    }).then((response) => {
      self.setState({
        total_installment: response.data.success.total_installment,
      });
    });
  }
  onChange(e) {
    var getCurrent = this.state.total_installment;
    if (e.target.checked) {
      getCurrent.push(e.target.name);
    } else {
      var new_current = [];
      getCurrent.map((item) => {
        if (item !== e.target.name) new_current.push(item);
      });
      getCurrent = new_current;
    }
    this.setState({
      total_installment: getCurrent,
      errors: {},
    });
    console.log(this.state.total_installment);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.total_installment);
    if (this.state.total_installment.length != 0) {
      this.props.submit(this.state.total_installment);
    } else {
      var errors = {};
      errors.total_installment = "Please Enter aleast 1 Fees Installments";
      this.setState({ errors });
    }
  }
  render() {
    return (
      <form>
        {this.state.errors.total_installment && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <span className="alert-icon">
              <i className="ni ni-like-2" />
            </span>
            <span className="alert-text">
              <strong>Warning!</strong> {this.state.errors.total_installment}
            </span>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}
        {this.state.total_installment &&
          this.state.total.map((item) => {
            if (this.state.total_installment.indexOf(item) > -1)
              return (
                <div class="form-group col-md-1">
                  <label className="form-control-label">{item}</label>
                  <input
                    type="checkbox"
                    value={item}
                    checked={true}
                    onChange={(e) => this.onChange(e)}
                    name={item}
                  />
                </div>
              );
            else
              return (
                <div class="form-group col-md-1">
                  <label className="form-control-label">{item}</label>
                  <input
                    type="checkbox"
                    value={item}
                    onChange={(e) => this.onChange(e)}
                    name={item}
                  />
                </div>
              );
          })}
        <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>
          {this.props.add_text_message}
        </button>
      </form>
    );
  }
}

export const GetYear = ({ title, back_link, onChange }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3 className="mb-0">
          {title}{" "}
          <Link
            to={back_link}
            class="btn btn-neutral float-right"
            type="submit"
          >
            Back
          </Link>
        </h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="form-group">
            <label>Select Year: </label>
            <select
              name="select_year"
              name="select_year"
              onChange={(e) => onChange(e)}
              className="form-control"
            >
              <option value="17-18">2017-18</option>
              <option value="18-19">2018-19</option>
              <option value="19-20">2019-20</option>
              <option selected value="20-21">
                2020-21
              </option>
              <option value="21-22">2021-22</option>
              <option value="22-23">2022-23</option>
              <option value="23-24">2023-24</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export class SelectIndividualStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_list: [],
      installments: [],
      student_id: "",
      select_year: "20-21",
      select_installments: "",
      errors_student_list: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios({
      url: "/api/v1/student/get-all-searable-student",
    }).then((response) => {
      self.setState({
        student_list: response.data.success.student,
      });
    });

    axios({
      url: "/api/v1/fee/get-total-installments-only-installments",
    }).then((response) => {
      self.setState({
        installments: response.data.success.total_installment,
      });
    });
  }
  handleInputChange(e) {
    this.setState({
      student_id: e.value,
    });
  }

  onSubmit() {
    if (this.state.student_id) {
      this.setState({
        errors_student_list: "",
      });

      if (this.props.get_installment) {
        this.props.submit(
          this.state.student_id,
          this.state.select_year,
          this.state.select_installments
        );
      } else {
        this.props.submit(this.state.student_id, this.state.select_year);
      }
    } else {
      this.setState({
        errors_student_list: "Please Select Student",
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { errors_student_list } = this.state;
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">
            {this.props.title}{" "}
            <Link
              to="/admin/fees"
              class="btn btn-neutral float-right"
              type="submit"
            >
              Back
            </Link>
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Select Student
                </label>
                <Select
                  options={this.state.student_list}
                  onChange={(e) => this.handleInputChange(e)}
                />
                {errors_student_list && (
                  <InlineError text={errors_student_list} />
                )}
              </div>
            </div>

            {this.props.hide_year ? (
              <div className="col-md-4"></div>
            ) : (
              <div className="col-md-4">
                <div className="form-group">
                  <label
                    className="form-control-label"
                    name="select_year"
                    htmlFor="example3cols1Input"
                  >
                    Select Year
                  </label>
                  <select
                    name="select_year"
                    value={this.state.select_year}
                    onChange={(e) => this.onChange(e)}
                    class="form-control"
                  >
                    <option value="17-18">2017-18</option>
                    <option value="18-19">2018-19</option>
                    <option value="19-20">2019-20</option>
                    <option value="20-21">2020-21</option>
                    <option value="21-22">2021-22</option>
                    <option value="22-23">2022-23</option>
                    <option value="23-24">2023-24</option>
                  </select>
                </div>
              </div>
            )}

            {this.props.get_installment && (
              <div className="col-md-4">
                <div className="form-group">
                  <label
                    className="form-control-label"
                    htmlFor="example3cols1Input"
                  >
                    Select Installment
                  </label>
                  <select
                    name="select_installments"
                    value={this.state.select_installments}
                    onChange={(e) => this.onChange(e)}
                    class="form-control"
                  >
                    <option value="">-- Select Installment --</option>
                    {this.state.installments &&
                      this.state.installments.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.onSubmit()}
                >
                  {this.props.add_student_button_text_individual ? (
                    <span>{this.props.add_student_button_text_individual}</span>
                  ) : (
                    <span>Fetch</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class InstallmentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_amount: 0,
      total_discount: 0,
      total_afterdiscount: 0,
      total_total_pending: 0,
    };
    this.changeInputs = this.changeInputs.bind(this);
  }
  changeInputs() {
    var total_amount = 0;
    var total_discount = 0;
    var total_afterdiscount = 0;
    var total_total_pending = 0;
    this.props.total_fees_type.map((item) => {
      total_amount += parseInt(item.amount);
      total_discount += parseInt(item.discount_amount);
      total_afterdiscount += parseInt(item.after_discount);
      total_total_pending += parseInt(item.total_pending);
    });
    this.setState({
      total_amount,
      total_discount,
      total_afterdiscount,
      total_total_pending,
    });
  }
  componentWillReceiveProps() {
    this.changeInputs();
  }
  componentDidMount() {
    this.changeInputs();
  }

  render() {
    return (
      <div>
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="mb-0">{this.props.installment} Fee Set</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <td> Fee Type </td>
                    <td width="50%"> Amount </td>
                    <td> Discount </td>
                    <td> Total Amount After Discount</td>
                    <td> Total Pending</td>
                    {this.props.type == "pay_fees" && <td>Current Paid</td>}
                  </tr>
                </thead>
                <tbody>
                  {this.props.total_fees_type &&
                    this.props.total_fees_type.map((type) => {
                      if (this.props.type == "pay_fees") {
                        return (
                          <tr>
                            <td> {type.fees_type} </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.amount}
                                data-fee_type={type.fees_type}
                                name="amount"
                                className="form-control disabled"
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.discount_amount}
                                className="form-control disabled"
                                data-fee_type={type.fees_type}
                                name="discount_amount"
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.after_discount}
                                className="form-control disabled"
                                data-fee_type={type.fees_type}
                                name="after_discount"
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.total_pending}
                                className="form-control disabled"
                                data-fee_type={type.fees_type}
                                name="total_paid"
                                max={type.after_discount}
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                value={type.current_paid}
                                className="form-control"
                                data-fee_type={type.fees_type}
                                name="current_paid"
                                max={type.after_discount}
                                onChange={(e) =>
                                  this.props.onChange(e, this.props.installment)
                                }
                              />{" "}
                            </td>
                          </tr>
                        );
                      } else if (this.props.type == "view_fees") {
                        return (
                          <tr>
                            <td> {type.fees_type} </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.amount}
                                data-fee_type={type.fees_type}
                                name="amount"
                                className="form-control disabled"
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.discount_amount}
                                className="form-control disabled"
                                data-fee_type={type.fees_type}
                                name="discount_amount"
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.after_discount}
                                className="form-control disabled"
                                data-fee_type={type.fees_type}
                                name="after_discount"
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.total_pending}
                                className="form-control disabled"
                                data-fee_type={type.fees_type}
                                name="total_paid"
                                max={type.after_discount}
                              />{" "}
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr>
                            <td> {type.fees_type} </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                value={type.amount}
                                data-fee_type={type.fees_type}
                                name="amount"
                                className="form-control"
                                onChange={(e) =>
                                  this.props.onChange(e, this.props.installment)
                                }
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                value={type.discount_amount}
                                className="form-control"
                                data-fee_type={type.fees_type}
                                name="discount_amount"
                                onChange={(e) =>
                                  this.props.onChange(e, this.props.installment)
                                }
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                disabled
                                value={type.after_discount}
                                className="form-control"
                                data-fee_type={type.fees_type}
                                name="after_discount"
                                onChange={(e) =>
                                  this.props.onChange(e, this.props.installment)
                                }
                              />{" "}
                            </td>
                            <td>
                              {" "}
                              <input
                                min="0"
                                type="number"
                                value={type.total_pending}
                                className="form-control"
                                data-fee_type={type.fees_type}
                                name="total_pending"
                                onChange={(e) =>
                                  this.props.onChange(e, this.props.installment)
                                }
                              />{" "}
                            </td>
                          </tr>
                        );
                      }
                    })}

                  <tr>
                    <td> Total </td>
                    <td>
                      <input
                        type="number"
                        value={this.state.total_amount}
                        disabled
                        className="form-control"
                      />{" "}
                    </td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        value={this.state.total_discount}
                        disabled
                        className="form-control"
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={this.state.total_afterdiscount}
                        disabled
                        className="form-control"
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={this.state.total_total_pending}
                        disabled
                        className="form-control"
                      />{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class PayFeesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_type: "cash",
    };
    this.changePaymentType = this.changePaymentType.bind(this);
    this.payDetailsSend = this.payDetailsSend.bind(this);
  }

  changePaymentType(e) {
    this.setState({
      payment_type: e.target.value,
    });
  }

  payDetailsSend(e) {
    this.props.onSubmit(this.state);
  }
  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">Pay Fee Details</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-2">
              <label>
                Account Name:{" "}
                <input
                  value={this.props.user.name}
                  type="text"
                  disabled
                  className="form-control"
                />
              </label>
            </div>
            <div className="col-md-2">
              <label>
                Payment Type:{" "}
                <select
                  value={this.state.payment_type}
                  onChange={this.changePaymentType}
                  class="form-control"
                >
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </label>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={this.payDetailsSend}>
              {this.props.button_text}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class ManageLoginForm extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    var today_date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    this.state = {
      data: {
        empid: "E120",
        clerk_name: "Laptopman",
        gender: "male",
        relative_name: "mobile_man",
        email: "Laptopman@gmail.com",
        contact_no: "9587231291",
        qualification: "b.com",
        address: "nothing",
        dob: "1998-03-03",
        blood_group: "",
        date_of_join: today_date,
        pan_card_no: "",
        aadhar_no: "",
        bank_name: "",
        bank_account_no: "",
        bank_ifc_no: "",
        pf_no: 0,
        pf_amount: 0,
        da_amount: 0,
        hra_amount: 0,
        remark: "",
        casual_leave: 0,
        sick_leave: 0,
        pay_earn_leave: 0,
        other_leave: 0,
        clerk_photo: "",
        id_proof: "",
        experience_letter: "",
        other_document1: "",
        other_document2: "",
        salary: "20000",
        send_sms: true,
        set_fee_installments: false,
        set_fee_due_date: false,
        set_fee: false,
        set_fee_class_wise: false,
        pay_fees: false,
      },
      errors: {},
      today_date: today_date,
      add_button_text: "Add",
    };
    this.ChangeFunc = this.ChangeFunc.bind(this);
    this.ResetStateData = this.ResetStateData.bind(this);
    this.ChangeError = this.ChangeError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.props.ChangeFunc(e.target.name, e.target.value);
  }
  toggleCheckbox(e) {
    const { permission } = this.state.data;
    var name = e.target.name;
    if (permission[name] == true) {
      permission[name] = false
      console.log(permission,this.state.data)
      this.setState({
        data: { ...this.state.data, 'permission': permission },
      });
    } else {
      permission[name] = true
      console.log(permission,this.state.data)
      this.setState({
        data: { ...this.state.data, 'permission': permission },
      });
    }
  }
  onFileChange(e) {
    this.ChangeFunc(e.target.name, e.target.files[0], true);
  }
  validate(data) {
    const errors = {};
    if (!data.empid) errors.empid = "Can't be blank";
    if (!data.clerk_name) errors.clerk_name = "Can't be blank";
    if (!data.gender) errors.gender = "Can't be blank";
    if (!data.relative_name) errors.relative_name = "Can't be blank";
    if (!data.email) errors.email = "Can't be blank";
    if (!data.contact_no) errors.contact_no = "Can't be blank";
    if (!data.qualification) errors.qualification = "Can't be blank";
    if (!data.address) errors.address = "Can't be blank";
    if (!data.salary) errors.salary = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";
    if (!data.date_of_join) errors.date_of_join = "Can't be blank";

    if (data.clerk_name.length < 3) errors.clerk_name = "Min. Length 3 char.";
    if (data.relative_name.length < 3)
      errors.relative_name = "Min. Length 3 char.";
    if (data.address.length < 3) errors.address = "Min. Length 5 char.";
    if (data.contact_no.length != 10) errors.contact_no = "Invalid Contact No.";

    return errors;
  }
  onSubmit(e) {
    e.preventDefault();
    const { data } = this.state;
    console.log(data)
    const errors = this.validate(data);
    this.ChangeError(errors);
    const formData = new FormData();
    Object.keys(data).map((item) => {
      formData.append(item, data[item]);
    });
    if (Object.keys(errors).length === 0) {
      this.props.submit(formData);
    }
  }
  toggleCheckbox(e) {
    const { data } = this.props;
    if (data[e.target.name] == true) {
      this.ChangeFunc(e.target.name, false);
    } else {
      this.ChangeFunc(e.target.name, true);
    }
  }
  ChangeFunc(name, value, is_file = false) {
    this.setState({
      [name]: value,
    });
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  ChangeError(errors) {
    this.setState({
      errors,
    });
  }
  ResetStateData() {
    var date = new Date();
    var today_date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    var data = {
      empid: "",
      clerk_name: "",
      gender: "male",
      relative_name: "",
      email: "",
      contact_no: "",
      qualification: "",
      address: "",
      dob: "",
      blood_group: "",
      aadhar_no: "",
      bank_name: "",
      bank_account_no: "",
      bank_ifc_no: "",
      pf_no: 0,
      pf_amount: 0,
      da_amount: 0,
      hra_amount: 0,
      remark: "",
      casual_leave: 0,
      sick_leave: 0,
      pay_earn_leave: 0,
      other_leave: 0,
      clerk_photo: "",
      id_proof: "",
      experience_letter: "",
      other_document1: "",
      other_document2: "",
      salary: "",
      send_sms: true,
      permission:{
         set_fee_installments: false,
       set_fee_due_date: false,
       set_fee: false,
       set_fee_class_wise: false,
       pay_fees: false
      }
    };
    this.setState({
      data: data,
      errors: {},
    });
  }

  render() {
    const { data, errors } = this.state;
    const {title} = this.props
    return (
      <div className="card">
        <div className="card-header border-0">
          <h3 className="mb-0">{title}</h3>
        </div>
        <div className="card-body">
          <h3 style={{ color: "#ae5856" }}>Personal Detail:</h3>
          <br />
          <div className="row">
            <div className="col-md-2">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Emp Id*
                </label>
                <input
                  type="integer"
                  className="form-control"
                  name="empid"
                  value={data.empid}
                  onChange={(e) => this.onChange(e)}
                  placeholder="Emp id."
                />
                {errors.empid && <InlineError text={errors.empid} />}
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Clerk Name*
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Clerk Name"
                    name="clerk_name"
                    value={data.clerk_name}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
                {errors.clerk_name && <InlineError text={errors.clerk_name} />}
              </div>
            </div>

            <div className="col-sm-3 col-md-2">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Gender*
                </label>
                <select
                  class="form-control"
                  name="gender"
                  value={data.gender}
                  onChange={(e) => this.onChange(e)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <InlineError text={errors.gender} />}
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Husband/Father Name*
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Husband/Father Name"
                    name="relative_name"
                    value={data.relative_name}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
                {errors.relative_name && (
                  <InlineError text={errors.relative_name} />
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Email
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
                {errors.email && <InlineError text={errors.email} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Contact No.
                </label>
                <input
                  type="decimal"
                  className="form-control"
                  name="contact_no"
                  placeholder="Contact No."
                  value={data.contact_no}
                  onChange={(e) => this.onChange(e)}
                />
                {errors.contact_no && <InlineError text={errors.contact_no} />}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={data.address}
                  onChange={(e) => this.onChange(e)}
                />
                {errors.address && <InlineError text={errors.address} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Qualification
                </label>
                <input
                  type="decimal"
                  className="form-control"
                  name="qualification"
                  placeholder="Qualification"
                  value={data.qualification}
                  onChange={(e) => this.onChange(e)}
                />
                {errors.qualification && (
                  <InlineError text={errors.qualification} />
                )}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Dob
                </label>
                <input
                  className="form-control"
                  placeholder="Select date"
                  type="date"
                  name="dob"
                  value={data.dob}
                  onChange={(e) => this.onChange(e)}
                />
                {errors.dob && <InlineError text={errors.dob} />}
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Blood Group
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="blood_group"
                  placeholder="Blood Group"
                  value={data.blood_group}
                  onChange={(e) => this.onChange(e)}
                />
                {errors.blood_group && (
                  <InlineError text={errors.blood_group} />
                )}
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Documents:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Clerk Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="clerk_photo"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Experience letter
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="experience_letter"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  ID Proof
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="id_proof"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Document 1
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="other_document1"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Document 2
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="other_document2"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Documents Details:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Date of Joining
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date_of_join"
                  value={data.date_of_join}
                  defaultValue={this.today_date}
                  placeholder="Date of Joining"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.date_of_join && (
                  <InlineError text={errors.date_of_join} />
                )}
              </div>
            </div>
          </div>

          <h3 style={{ color: "#ae5856" }}>Salary Details:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Pan Card No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pan_card_no"
                  value={data.pan_card_no}
                  placeholder="Pan Card No."
                  onChange={(e) => this.onChange(e)}
                />
                {errors.pan_card_no && (
                  <InlineError text={errors.pan_card_no} />
                )}
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={data.salary}
                  placeholder="Salary"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.salary && <InlineError text={errors.salary} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Aadhar No
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="aadhar_no"
                  placeholder="Aadhar No"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.aadhar_no && <InlineError text={errors.aadhar_no} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  name="bank_name"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.bank_name && <InlineError text={errors.bank_name} />}
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank Account No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="bank_account_no"
                  placeholder="Bank Account No."
                  onChange={(e) => this.onChange(e)}
                />
                {errors.bank_account_no && (
                  <InlineError text={errors.bank_account_no} />
                )}
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank IFC No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="bank_ifc_no"
                  placeholder="Bank IFC No."
                  onChange={(e) => this.onChange(e)}
                />
                {errors.bank_ifc_no && (
                  <InlineError text={errors.bank_ifc_no} />
                )}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  PF No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pf_no"
                  placeholder="PF No."
                  onChange={(e) => this.onChange(e)}
                />
                {errors.pf_no && <InlineError text={errors.pf_no} />}
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  PF Amount
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  name="pf_amount"
                  placeholder="PF Amount"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.pf_amount && <InlineError text={errors.pf_amount} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  TDS Amount
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  name="tds_amount"
                  placeholder="TDS Amount"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.tds_amount && <InlineError text={errors.tds_amount} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Professional TAX Amount Monthly
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  name="protax_amount"
                  placeholder="TProfessional TAX Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.protax_amount && (
                  <InlineError text={errors.protax_amount} />
                )}
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  DA Amount Monthly
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  name="da_amount"
                  placeholder="DA Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.datax_amount && (
                  <InlineError text={errors.datax_amount} />
                )}
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  HRA Amount Monthly
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  name="hra_amount"
                  placeholder="HRA Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.hra_amount && <InlineError text={errors.hra_amount} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="remark"
                  placeholder="Remark"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.remark && <InlineError text={errors.remark} />}
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Leave Details:</h3>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Casual Leave
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Casual Leave"
                  name="casual_leave"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.casual_leave && (
                  <InlineError text={errors.casual_leave} />
                )}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Pay/Earn Leave
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Pay/Earn Leave"
                  name="pay_earn_leave"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.pay_earn_leave && (
                  <InlineError text={errors.pay_earn_leave} />
                )}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Sick Leave
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Sick Leave"
                  name="sick_leave"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.sick_leave && <InlineError text={errors.sick_leave} />}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Leave
                </label>
                <input
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Other Leave"
                  name="other_leave"
                  onChange={(e) => this.onChange(e)}
                />
                {errors.other_leave && (
                  <InlineError text={errors.other_leave} />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 col-md-2">
              <table className="table table-padding">
                <tr>
                  <td>
                    <label
                      className="form-control-label"
                      htmlFor="example2cols1Input"
                    >
                      Check for Sms Message
                    </label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={data.send_sms}
                      name="send_sms"
                      onChange={(e) => this.toggleCheckbox(e)}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="table-responsive">
                <table className="table table-padding">
                  <thead>
                    <tr>
                      <th>Sr no.</th>
                      <th>Permission Type</th>
                      <th>Allow</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Installment
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={data.set_fee_installments}
                          name="set_fee_installments"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Due Date
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={data.set_fee_due_date}
                          name="set_fee_due_date"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <label className="form-control-label">Set Fee</label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={data.set_fee}
                          name="set_fee"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Class wise
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={data.set_fee_class_wise}
                          name="set_fee_class_wise"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        <label className="form-control-label">Pay Fees</label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={data.pay_fees}
                          name="pay_fees"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              class="btn btn-primary"
              onClick={(e) => this.onSubmit(e)}
              type="button"
            >
              {this.props.button_text}
            </button>
            <button
              class="btn btn-warning"
              onClick={(e) => this.props.ResetStateData(e)}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class ViewIndividualClerk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    }
  }
  getClerkAllInfo(clerk_id) {
    var self = this;
    self.setState({
      data:""
    })
    axios({
      url: "/api/v1/fee/manage_login/info/" + clerk_id,
    }).then((response) => {
      self.setState(
        {
          data: response.data.success.clerk_info,
        }
      );
    });
  }
  componentDidMount() {
    this.getClerkAllInfo(this.props.clerk_id);
  }
  componentWillReceiveProps(){
    this.getClerkAllInfo(this.props.clerk_id);
  }
  render() {
    const { data } = this.state;
    return (
      <div className="card">
        <div className="card-header border-0">
          <h3 className="mb-0">View Clerk Info</h3>
        </div>
        {data ? <div className="card-body">
          <h3 style={{ color: "#ae5856" }}>Personal Detail:</h3>
          <br />
          <div className="row">
            <div className="col-md-2">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Emp Id
                </label>
                <input
                  disabled
                  type="integer"
                  className="form-control"
                  name="empid"
                  value={data.empid}
                  onChange={(e) => this.onChange(e)}
                  placeholder="Emp id."
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Clerk Name*
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    disabled
                    className="form-control"
                    placeholder="Clerk Name"
                    name="name"
                    value={data.name}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-3 col-md-2">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Gender*
                </label>
                <select
                  disabled
                  class="form-control"
                  name="gender"
                  value={data.gender}
                  onChange={(e) => this.onChange(e)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Husband/Father Name*
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    disabled
                    className="form-control"
                    placeholder="Husband/Father Name"
                    name="relative_name"
                    value={data.relative_name}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Email
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                  <input
                    disabled
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Contact No.
                </label>
                <input
                  disabled
                  type="decimal"
                  className="form-control"
                  name="contact_no"
                  placeholder="Contact No."
                  value={data.contact_no}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Address
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={data.address}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Qualification
                </label>
                <input
                  disabled
                  type="decimal"
                  className="form-control"
                  name="qualification"
                  placeholder="Qualification"
                  value={data.qualification}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Dob
                </label>
                <input
                  disabled
                  className="form-control"
                  placeholder="Select date"
                  type="date"
                  name="dob"
                  value={data.dob}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Blood Group
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="blood_group"
                  placeholder="Blood Group"
                  value={data.blood_group}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Documents:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Clerk Photo
                </label>
                <input
                  disabled
                  type="file"
                  className="form-control"
                  name="clerk_photo"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Experience letter
                </label>
                <input
                  disabled
                  type="file"
                  className="form-control"
                  name="experience_letter"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  ID Proof
                </label>
                <input
                  disabled
                  type="file"
                  className="form-control"
                  name="id_proof"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Document 1
                </label>
                <input
                  disabled
                  type="file"
                  className="form-control"
                  name="other_document1"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Document 2
                </label>
                <input
                  disabled
                  type="file"
                  className="form-control"
                  name="other_document2"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Documents Details:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Date of Joining
                </label>
                <input
                  disabled
                  type="date"
                  className="form-control"
                  name="date_of_join"
                  value={data.date_of_join}
                  defaultValue={this.today_date}
                  placeholder="Date of Joining"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>

          <h3 style={{ color: "#ae5856" }}>Salary Details:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Pan Card No.
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="pan_card_no"
                  value={data.pan_card_no}
                  placeholder="Pan Card No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Salary
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="salary"
                  value={data.salary}
                  placeholder="Salary"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Aadhar No
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="aadhar_no"
                  placeholder="Aadhar No"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank Name
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  name="bank_name"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank Account No.
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="bank_account_no"
                  placeholder="Bank Account No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank IFC No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="bank_ifc_no"
                  placeholder="Bank IFC No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  PF No.
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="pf_no"
                  placeholder="PF No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  PF Amount
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  name="pf_amount"
                  placeholder="PF Amount"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  TDS Amount
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  name="tds_amount"
                  placeholder="TDS Amount"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Professional TAX Amount Monthly
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  name="protax_amount"
                  placeholder="TProfessional TAX Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  DA Amount Monthly
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  name="da_amount"
                  placeholder="DA Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  HRA Amount Monthly
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  name="hra_amount"
                  placeholder="HRA Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Remark
                </label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  name="remark"
                  placeholder="Remark"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Leave Details:</h3>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Casual Leave
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Casual Leave"
                  name="casual_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Pay/Earn Leave
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Pay/Earn Leave"
                  name="pay_earn_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Sick Leave
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Sick Leave"
                  name="sick_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Leave
                </label>
                <input
                  disabled
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Other Leave"
                  name="other_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="table-responsive">
                <table className="table table-padding">
                  <thead>
                    <tr>
                      <th>Sr no.</th>
                      <th>Permission Type</th>
                      <th>Allow</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Installment
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled
                          checked={data.permission.set_fee_installments}
                          name="set_fee_installments"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Due Date
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled
                          checked={data.permission.set_fee_due_date}
                          name="set_fee_due_date"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <label className="form-control-label">Set Fee</label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled
                          checked={data.permission.set_fee}
                          name="set_fee"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Class wise
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled
                          checked={data.permission.set_fee_class_wise}
                          name="set_fee_class_wise"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        <label className="form-control-label">Pay Fees</label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          disabled
                          checked={data.permission.pay_fees}
                          name="pay_fees"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        : <div className="card-body"><h1>Loading ...</h1></div>}
      </div>
    )
  }
}

export class UpdateIndividualClerk extends Component{
  constructor(props){
    super(props)
      this.state = {
        data:{
        empid: "",
        name: "",
        gender: "male",
        relative_name: "",
        email: "",
        contact_no: "",
        qualification: "",
        address: "",
        dob: "",
        blood_group: "",
        aadhar_no: "",
        bank_name: "",
        bank_account_no: "",
        bank_ifc_no: "",
        pf_no: 0,
        pf_amount: 0,
        da_amount: 0,
        hra_amount: 0,
        remark: "",
        casual_leave: 0,
        sick_leave: 0,
        pay_earn_leave: 0,
        other_leave: 0,
        clerk_photo: "",
        id_proof: "",
        experience_letter: "",
        other_document1: "",
        other_document2: "",
        salary: "",
        send_sms: true,
        permission:{
           set_fee_installments: false,
         set_fee_due_date: false,
         set_fee: false,
         set_fee_class_wise: false,
         pay_fees: false
        }
      }
    }
    this.onChange = this.onChange.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }
  onChange(e) {
    this.ChangeFunc(e.target.name, e.target.value);
  }
  toggleCheckbox(e) {
    const { permission } = this.state.data;
    var name = e.target.name;
    if (permission[name] == true) {
      permission[name] = false
      this.setState({
        data: { ...this.state.data, 'permission': permission },
      });
    } else {
      permission[name] = true
      this.setState({
        data: { ...this.state.data, 'permission': permission },
      });
    }
  }
  onFileChange(e) {
    this.props.ChangeFunc(e.target.name, e.target.files[0], true);
  }
  validate(data) {
    const errors = {};
    if (!data.empid) errors.empid = "Can't be blank";
    if (!data.name) errors.name = "Can't be blank";
    if (!data.gender) errors.gender = "Can't be blank";
    if (!data.relative_name) errors.relative_name = "Can't be blank";
    if (!data.email) errors.email = "Can't be blank";
    if (!data.contact_no) errors.contact_no = "Can't be blank";
    if (!data.address) errors.address = "Can't be blank";
    if (!data.salary) errors.salary = "Can't be blank";
    if (!data.dob) errors.dob = "Can't be blank";

    if (data.name.length < 3) errors.name = "Min. Length 3 char.";
    if (data.relative_name.length < 3)
      errors.relative_name = "Min. Length 3 char.";
    if (data.address.length < 3) errors.address = "Min. Length 5 char.";
    if (data.contact_no.length != 10) errors.contact_no = "Invalid Contact No.";

    return errors;
  }
  onSubmit(e) {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate(data);
    this.ChangeError(errors);
    const formData = new FormData();
    Object.keys(data).map((item) => {
      formData.append(item, data[item]);
    });
    if (Object.keys(errors).length === 0) {
      this.props.submit(formData);
    }
  }
  ChangeFunc(name, value, is_file = false) {
    this.setState({
      [name]: value,
    });
    this.setState({
      data: { ...this.state.data, [name]: value },
    });
  }
  ChangeError(errors) {
    this.setState({
      errors,
    });
  }
  componentDidMount(){
    const {clerk_id} = this.props
    var self = this
    axios({
      url: "/api/v1/fee/manage_login/info/" + clerk_id,
    }).then(response => {
     self.setState({
          data: response.data.success.clerk_info,
      })
    })
  }
  render() {
    const { data } = this.state;
    return (
      <div className="card">
        <div className="card-header border-0">
          <h3 className="mb-0">Update Clerk Info</h3>
        </div>
        {data ? <div className="card-body">
          <h3 style={{ color: "#ae5856" }}>Personal Detail:</h3>
          <br />
          <div className="row">
            <div className="col-md-2">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Emp Id
                </label>
                <input
                  disabled
                  type="integer"
                  className="form-control"
                  name="empid"
                  value={data.empid}
                  onChange={(e) => this.onChange(e)}
                  placeholder="Emp id."
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Clerk Name*
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Clerk Name"
                    name="name"
                    value={data.name}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-3 col-md-2">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Gender*
                </label>
                <select
                  class="form-control"
                  name="gender"
                  value={data.gender}
                  onChange={(e) => this.onChange(e)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Husband/Father Name*
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Husband/Father Name"
                    name="relative_name"
                    value={data.relative_name}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example3cols1Input"
                >
                  Email
                </label>
                <div className="input-group input-group-merge">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={(e) => this.onChange(e)}
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Contact No.
                </label>
                <input
                  type="decimal"
                  className="form-control"
                  name="contact_no"
                  placeholder="Contact No."
                  value={data.contact_no}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={data.address}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Qualification
                </label>
                <input
                  type="decimal"
                  className="form-control"
                  name="qualification"
                  placeholder="Qualification"
                  value={data.qualification}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Dob
                </label>
                <input
                  className="form-control"
                  placeholder="Select date"
                  type="date"
                  name="dob"
                  value={data.dob}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Blood Group
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="blood_group"
                  placeholder="Blood Group"
                  value={data.blood_group}
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Documents:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Clerk Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="clerk_photo"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Experience letter
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="experience_letter"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  ID Proof
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="id_proof"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Document 1
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="other_document1"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Document 2
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="other_document2"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Documents Details:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Date of Joining
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date_of_join"
                  value={data.date_of_join}
                  placeholder="Date of Joining"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>

          <h3 style={{ color: "#ae5856" }}>Salary Details:</h3>

          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Pan Card No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pan_card_no"
                  value={data.pan_card_no}
                  placeholder="Pan Card No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={data.salary}
                  placeholder="Salary"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Aadhar No
                </label>
                <input
                  
                  type="text"
                  className="form-control"
                  name="aadhar_no"
                  placeholder="Aadhar No"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank Name
                </label>
                <input
                  
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  name="bank_name"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank Account No.
                </label>
                <input
                  
                  type="text"
                  className="form-control"
                  name="bank_account_no"
                  placeholder="Bank Account No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Bank IFC No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="bank_ifc_no"
                  placeholder="Bank IFC No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  PF No.
                </label>
                <input
                  
                  type="text"
                  className="form-control"
                  name="pf_no"
                  placeholder="PF No."
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  PF Amount
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  name="pf_amount"
                  placeholder="PF Amount"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  TDS Amount
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  name="tds_amount"
                  placeholder="TDS Amount"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Professional TAX Amount Monthly
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  name="protax_amount"
                  placeholder="TProfessional TAX Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  DA Amount Monthly
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  name="da_amount"
                  placeholder="DA Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  HRA Amount Monthly
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  name="hra_amount"
                  placeholder="HRA Amount Monthly"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols1Input"
                >
                  Remark
                </label>
                <input
                  
                  type="text"
                  className="form-control"
                  name="remark"
                  placeholder="Remark"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>
          <h3 style={{ color: "#ae5856" }}>Leave Details:</h3>
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Casual Leave
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Casual Leave"
                  name="casual_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Pay/Earn Leave
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Pay/Earn Leave"
                  name="pay_earn_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Sick Leave
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Sick Leave"
                  name="sick_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="form-group">
                <label
                  className="form-control-label"
                  htmlFor="example2cols2Input"
                >
                  Other Leave
                </label>
                <input
                  
                  min="0"
                  type="number"
                  className="form-control"
                  placeholder="Other Leave"
                  name="other_leave"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="table-responsive">
                <table className="table table-padding">
                  <thead>
                    <tr>
                      <th>Sr no.</th>
                      <th>Permission Type</th>
                      <th>Allow</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Installment
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          
                          checked={data.permission.set_fee_installments}
                          name="set_fee_installments"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td> 
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Due Date
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          
                          checked={data.permission.set_fee_due_date}
                          name="set_fee_due_date"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <label className="form-control-label">Set Fee</label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          
                          checked={data.permission.set_fee}
                          name="set_fee"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        <label className="form-control-label">
                          Set Fee Class wise
                        </label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          
                          checked={data.permission.set_fee_class_wise}
                          name="set_fee_class_wise"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        <label className="form-control-label">Pay Fees</label>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          
                          checked={data.permission.pay_fees}
                          name="pay_fees"
                          onChange={(e) => this.toggleCheckbox(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>{this.props.update_button_text}</button>
          </div>
        </div>
        : <div className="card-body"><h1>Loading ...</h1></div>}
      </div>
    )
  }
}
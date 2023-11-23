import React, { Component } from "react";
import "../styles/Identify.css";

export class Identify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailErr: "",
      message: "",
    };
  }

  identify = (e) => {
    if (this.state.email.includes("@")) {
      this.setState({
        message: "Check your email to reset your password.",
        emailErr: ''
      });
    } else {
      this.showErr();
    }
  };

  showErr = () => {
    this.setState({
      emailErr: "Enter a valid email",
      message: "",
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  changeEmailHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form id="identify" onSubmit={this.submitHandler}>
          <h2 className="form-title">Reset Password</h2>
          <div className="form-input">
            <h5>{this.state.message}</h5>
            <label>Your Email Address:</label>
            <input
              type="text"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.changeEmailHandler}
            />
              <h5 style={{ color: "red" }}>{this.state.emailErr}</h5>
          </div>
          <button
            className="form-button"
            type="submit"
            onClick={() => this.identify()}
          >
            Continue
          </button>
        </form>
      </div>
    );
  }
}

export default Identify;
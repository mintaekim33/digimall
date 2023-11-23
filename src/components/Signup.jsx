import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [display, setDisplay] = useState(true);

  const welcomeNewUser = () => {
    if (
      details.username !== "" &&
      details.email !== "" &&
      details.password !== "" &&
      details.passwordConfirm !== ""
    ) {
      setDisplay(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const patterns = {
    username: /^[a-z\d]{5,12}$/i,
    email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/,
    password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z\d]{8,}/,
  };

  const validate = (field, regex) => {
    if (regex.test(field.value)) {
      field.className = "valid";
    } else {
      field.className = "invalid";
    }
  };

  const checkPassword = (e) => {
    if (details.passwordConfirm === details.password) {
      e.target.className = "valid";
    } else {
      e.target.className = "invalid";
    }
  };

  return (
    <div>
      {display ? (
        <form id="signup" onSubmit={submitHandler}>
          <h2 className="form-title">Sign Up</h2>
          <div className="form-input">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={details.username}
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              onKeyUp={(e) => validate(e.target, patterns[e.target.name])}
            />
            <p>Username must be alphanumeric and contain 5 - 12 characters</p>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              onKeyUp={(e) => validate(e.target, patterns[e.target.name])}
            />
            <p>Please enter a valid email address</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              onKeyUp={(e) => validate(e.target, patterns[e.target.name])}
            />
            <p>
              Password must contain at least 8 characters, including uppercase,
              lowercase letters and numbers.
            </p>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={details.passwordConfirm}
              onChange={(e) =>
                setDetails({ ...details, passwordConfirm: e.target.value })
              }
              onKeyUp={checkPassword}
            />{" "}
            <p>Password does not match</p>
          </div>
          <button
            className="form-button"
            type="submit"
            onClick={welcomeNewUser}
          >
            Continue
          </button>
          <div className="form-text">
            <Link to="/login" id="linkLogin" className="form-link">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      ) : (
        <h1 style={{textAlign: 'center', color: 'whitesmoke'}}>Thanks for registering, {details.username}!</h1>
      )}
    </div>
  );
}

export default Signup;
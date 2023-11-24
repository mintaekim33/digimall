import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [display, setDisplay] = useState(true);

  const welcomeUser = () => {
    if (details.username !== "" && details.password !== "") {
      setDisplay(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(details)
  };

  return (
    <div className="loginBody">
      {display ? (
        <form id="login" onSubmit={submitHandler}>
          <h2 className="form-title">Log In</h2>
          <div className="form-input">
            <input
              autoFocus
              type="text"
              name="username"
              placeholder="Username"
              value={details.username}
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
          </div>
          <button className="form-button" type="submit" onClick={welcomeUser}>
            Continue
          </button>
          <div className="form-text">
            <Link to="/identify" className="form-link">
              Forgot password?
            </Link>
          </div>
          <div className="form-text">
            <Link to="/signup" className="form-link">
              Sign up here
            </Link>
          </div>
        </form>
      ) : (
        <h1 className="welcome-message">Welcome {details.username}</h1>
      )}
    </div>
  );
}

export default Login;

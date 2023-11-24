import React, { useState } from "react";
import "../styles/Identify.css";

const Identify = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [message, setMessage] = useState("");

  const identify = () => {
    if (email.includes("@")) {
      setMessage("Check your email to reset your password.");
      setEmailErr('');
    } else {
      showErr();
    }
  };

  const showErr = () => {
    setEmailErr("Enter a valid email");
    setMessage("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <form id="identify" onSubmit={submitHandler}>
        <h2 className="form-title">Reset Password</h2>
        <div className="form-input">
          <h5>{message}</h5>
          <label>Your Email Address:</label>
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={changeEmailHandler}
          />
          <h5 style={{ color: "red" }}>{emailErr}</h5>
        </div>
        <button
          className="form-button"
          type="submit"
          onClick={identify}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Identify;

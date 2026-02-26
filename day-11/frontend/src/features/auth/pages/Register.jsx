import React from "react";
import { Link } from "react-router";

const Register = () => {
  const handling = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={handling}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Name"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Address"
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
            <button className="button primary-button">Register</button>
          </form>
          <p>
            Already have an account <Link to={"/login"}> login here</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;

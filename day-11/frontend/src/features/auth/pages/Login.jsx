import React from "react";
import "../style/form.scss";
import { Link } from "react-router";
const Login = () => {


  const handling = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handling}>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Name"
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
            <button className="button primary-button">Login</button>
          </form>
          <p>
            Don't have an account <Link to={"/register"}> register here</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;

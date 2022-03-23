import React, { useState } from "react";
import axios from "axios";
import BasicGrid from "../Grid/BasicGrid";


export default function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    //Create JSON object
    const user = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    setUser(user);
    axios
      .post("http://localhost:8080/validate", user)
      .then(function (response) {
        setLoggedIn(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {loggedIn ? (
          <div>
            <BasicGrid />
            
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

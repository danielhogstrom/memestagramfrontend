import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import BasicGrid from "../Grid/BasicGrid";
import Button from "@mui/material/Button";

export default function App() {
  // React States
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState();

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    console.log(event);
    //Prevent page reload
    event.preventDefault();
    //Create JSON object
    const user = {
      username: event.target[0].value,
      password: event.target[2].value,
    };
    setUser(user);
    axios
      .post("http://localhost:8080/api/user/validate", user)
      .then(function (response) {
        setLoggedIn(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div
          className="input-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            id="outlined-basic-username"
            label="Username"
            variant="outlined"
            name="username"
            style={{ marginTop: "10px" }}
          />
        </div>
        <div className="input-container">
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            style={{ marginTop: "10px" }}
          />
        </div>
        <Button variant="outlined" type="submit" style={{ marginTop: "10px" }}>
          Login
        </Button>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {loggedIn ? (
          <div>
            <BasicGrid user={user.username} />
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

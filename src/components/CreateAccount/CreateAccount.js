import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import BasicGrid from "../Grid/BasicGrid";
import Button from "@mui/material/Button";

export default function App() {
  // React States
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [createAccount, setCreateAccount] = useState();

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
      email: event.target[3].value
    };
    setUser(user);
    const instanceOfAxios = axios.create({
      withCredentials: true,
    }); 
    instanceOfAxios
      .post("http://localhost:8080/api/user/add", user)
      .then(function (response) {
        setLoggedIn(response.data); 
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



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
            label="Choose username"
            variant="outlined"
            name="username"
            style={{ marginTop: "10px" }}
          />
        </div>
        <div className="input-container">
          <TextField
            id="outlined-basic-password"
            label="Choose password"
            variant="outlined"
            type="password"
            name="password"
            style={{ marginTop: "10px" }}
          />
        </div>
        <div className="input-container">
          <TextField
            id="outlined-basic-password"
            label="Enter Email"
            variant="outlined"
            type="email"
            name="email"
            style={{ marginTop: "10px" }}
          />
        </div>
        <Button variant="outlined" type="submit" style={{ marginTop: "10px" }}>
          Create Account
        </Button>
        <br></br>
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
             ):(                                        
          renderForm         
        )}
      </div>
    </div>
  );
}

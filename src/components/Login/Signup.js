import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import BasicGrid from "../Grid/BasicGrid";
import Button from "@mui/material/Button";
import "./Signup.css"


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
    const instanceOfAxios = axios.create({
      withCredentials: true,
    });
    instanceOfAxios
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
            <h1>Memestagram</h1>
 <h3>Sign up to share your favorite memes with your friends.</h3>
          <TextField
            id="outlined-basic-input"
            label="Username"
            variant="outlined"
            name="username"
            style={{ marginTop: "10px" }}
          />
        </div>
        <div className="input-container">
          <TextField
            id="outlined-basic-input"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            style={{ marginTop: "10px"}}
          /> </div>
          <div>
           <TextField
            id="outlined-basic-input"
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            style={{ marginTop: "10px" }}
          />
        
        </div>
          
        <Button
        className="button"
          variant="contained"
          type="submit"
          style={{ marginTop: "10px" }}

        ><span>
          Sign up
          </span>
        </Button>
        <p className="forgot-password text-right">
                    Already registered? <a href="#">Sign in</a>
                </p>
      
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

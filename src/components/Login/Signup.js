import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import BasicGrid from "../Grid/BasicGrid";
import Button from "@mui/material/Button";
import "./Signup.css";

export default function App() {
  // React States
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [signUp, setSignUp] = useState(true);

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
        localStorage.setItem("isLoggedIn", response.data);
        console.log("local storage: " + localStorage.getItem("isLoggedIn"));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setLoggedIn(loggedInUser);
      console.log("useeffect: " + loggedIn);
    }
  }, []);
  // JSX code for login form
  const renderSignUpForm = (
    
      <form onSubmit={handleSubmit}
      style ={{
        width: "400px",
        height: "500px",
        backgroundColor:"#EAE7DC",
        marginTop:"40px",
        borderRadius: "5px",
        padding: "0px 20px"
      }}>
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
          <h4
          style={{
            textAlign: "center", 
          }}
          >Sign up to share your favorite memes with your friends.</h4>
          <TextField
            id="outlined-basic-input"
            label="Username"
            variant="outlined"
            name="username"
            style={{ marginTop: "10px" }}
          />
        
        <div className="input-container">
          <TextField
            id="outlined-basic-input"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            style={{ marginTop: "10px" }}
          />{" "}
        </div>
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
          style={{ marginTop: "10px",
          backgroundColor: "#8E8D8A",
          color:"#EAE7DC"
         }}
        >
          <span>Sign up</span>
        </Button>
        
        <p className="forgot-password text-right">
          Already registered? <Button onClick={()=>{setSignUp(false); console.log(signUp)}}>Sign in</Button>
        </p>
        </div>
      </form>
    
  );
  const renderLoginForm = (
    
    <form onSubmit={handleSubmit}
    style ={{
      width: "400px",
      height: "500px",
      backgroundColor:"#EAE7DC",
      marginTop:"40px",
      borderRadius: "5px",
      padding: "0px 20px"
    }}>
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
        <TextField
          id="outlined-basic-input"
          label="Username"
          variant="outlined"
          name="username"
          style={{ marginTop: "10px" }}
        />
      
      <div className="input-container">
        <TextField
          id="outlined-basic-input"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          style={{ marginTop: "10px" }}
        />{" "}
      </div>

      <Button
        className="button"
        variant="contained"
        type="submit"
        style={{ marginTop: "10px",
        backgroundColor: "#8E8D8A",
        color:"#EAE7DC"
       }}
      >
        <span>Log In</span>
      </Button>
      </div>
    </form>
  
);

  return (
    <div className="app">
      <div className="login-form">
        {loggedIn ? (
          <div>
            <BasicGrid user={user.username} />
          </div>
        ) : signUp ? renderSignUpForm : renderLoginForm
        
        }
      </div>
    </div>
  );
}

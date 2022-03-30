import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import BasicGrid from "../Grid/BasicGrid";
import Button from "@mui/material/Button";
import "./Signup.css";
import Logo from "../Header/logo/memestagramlogotransparent.png";

export default function App() {
  // React States
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const [newUser, setNewUser] = useState({});

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSignUp = (event) => {
    //Prevent page reload
    event.preventDefault();
    //Create JSON object
    const newUser = {
      username: event.target[0].value,
      password: event.target[2].value,
      email: event.target[4].value,
    };
    console.log(newUser);
    setNewUser(newUser);

    axios
      .post("http://localhost:8080/api/user/add", newUser)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
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
        localStorage.setItem("username", user.username);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    setLoggedIn(loggedInUser);
  }, []);
  // JSX code for login form
  const renderSignUpForm = (
    <form
      onSubmit={handleSignUp}
      style={{
        width: "400px",
        height: "100%",
        backgroundColor: "#EAE7DC",
        marginTop: "40px",
        borderRadius: "5px",
        padding: "20px 20px",
      }}
    >
      <div
        className="input-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={Logo} width="300px" style={{ marginTop: "20px" }} />
        <h4
          style={{
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          Sign up to share your favorite memes with your friends.
        </h4>
        <TextField
          color="warning"
          id="outlined-basic-input"
          label="Username"
          variant="outlined"
          name="username"
          style={{ marginTop: "10px" }}
        />

        <div className="input-container">
          <TextField
            color="warning"
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
            color="warning"
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
          style={{
            marginTop: "10px",
            backgroundColor: "#8E8D8A",
            color: "#EAE7DC",
          }}
        >
          <span>Sign up</span>
        </Button>

        <p className="forgot-password text-right">
          Already registered?
          <Button
            onClick={() => {
              setSignUp(false);
            }}
          >
            Sign in
          </Button>
        </p>
      </div>
    </form>
  );
  const renderLoginForm = (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "400px",
        height: "100%",
        backgroundColor: "#EAE7DC",
        marginTop: "40px",
        borderRadius: "5px",
        padding: "20px 20px",
      }}
    >
      <div
        className="input-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={Logo}
          width="300px"
          style={{ marginTop: "20px", marginBottom: "31px" }}
        />
        <TextField
          color="warning"
          id="outlined-basic-input"
          label="Username"
          variant="outlined"
          name="username"
          style={{ marginTop: "10px" }}
        />

        <div className="input-container">
          <TextField
            color="warning"
            id="outlined-basic-input"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            style={{ marginTop: "10px" }}
          />
        </div>

        <Button
          className="button"
          variant="contained"
          type="submit"
          style={{
            marginTop: "10px",
            backgroundColor: "#8E8D8A",
            color: "#EAE7DC",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          <span>Log In</span>
        </Button>
        <p className="">
          Do you want to create account?
          <Button
            onClick={() => {
              setSignUp(true);
            }}
          >
            Sign up
          </Button>
        </p>
      </div>
    </form>
  );

  return (
    <div className="app">
      {loggedIn ? (
        <div>
          <BasicGrid user={user.username} setLoggedIn={setLoggedIn} />
        </div>
      ) : signUp ? (
        renderSignUpForm
      ) : (
        renderLoginForm
      )}
    </div>
  );
}

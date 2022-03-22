import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      {/*  <Header />
      <Content isLoggedIn={true} />
      <Footer /> */}
      <Login />
    </div>
  );
}

export default App;

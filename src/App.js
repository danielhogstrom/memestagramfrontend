import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import axios from "axios";

const fetchData = () => {
  axios
    .get("http://localhost:8080/")
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

function App() {
  useEffect(() => {
    fetchData();
  });

  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;

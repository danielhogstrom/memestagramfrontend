import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MyPage from "./components/MyPage/MyPage";
import UserPage from "./components/UserPage/UserPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="userpage" element={<UserPage />} />      
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById("root")
);

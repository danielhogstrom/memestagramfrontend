import "./header.css";
import { Link } from "react-router-dom";
import homebutton from "./icons/home-button.png";
import uploadbutton from "./icons/upload-button.png";
import profile from "./icons/round-account-button-with-user-inside.png";

export default function Header() {
  return (
    <div className="header">
      <h1 className="logo">MEMESTAGRAM</h1>
      <div className="home">
        <img src={homebutton} />
      </div>
      <div className="upload">
        <img src={uploadbutton} />
      </div>
      <div className="profile">
        {/*    <Link to="/Login">
          <img src={profile} />
        </Link> */}
      </div>
    </div>
  );
}

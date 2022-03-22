import "./header.css";
import homebutton from "./icons/home-button.png";
import uploadbutton from "./icons/upload-button.png";
import profile from "./icons/round-account-button-with-user-inside.png";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">MEMESTAGRAM</div>
      <div className="home">
        <img src={homebutton} />
      </div>
      <div className="upload">
        <img src={uploadbutton} />
      </div>
      <div className="profile">
        <img src={profile} />
      </div>
    </div>
  );
}

import "./header.css";
import homebutton from "./icons/home-button.png";
import uploadbutton from "./icons/upload-button.png";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">MEMESTAGRAM</div>
      <div>
        <img src={homebutton} />
      </div>
      <div>
        <img src={uploadbutton} />
      </div>
      <div>MEME4</div>
    </div>
  );
}

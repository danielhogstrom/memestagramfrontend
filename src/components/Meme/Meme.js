import React from "react";
import "./meme.css";
//Meme component, takes in the imageUrl
export default function Meme(props) {
  return (
    <div className="meme">
      <img className="image" src={props.imageUrl} />
    </div>
  );
}

import React from "react";
import "./meme.css";
//Meme component, takes in the imageUrl
export default function Meme(props) {
  return (
    <div>
      <p>{props.name}</p>
      <img src={props.imageUrl} />
    </div>
  );
}

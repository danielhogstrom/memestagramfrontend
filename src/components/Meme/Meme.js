import React from "react";
import "./meme.css";
//Meme component, takes in the imageUrl
export default function Meme(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>{props.name}</p>
      <img src={props.imageUrl} />
    </div>
  );
}

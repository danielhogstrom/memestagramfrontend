import React from "react";
import "./meme.css";
//Meme component, takes in the imageUrl
export default function Meme(props) {
  return (
    <div
      style={{
        display: "flex",        
        flexDirection: "column",
        /* justifyContent: "center",
        alignItems: "center",  */
                               
      }}
    >
      <div className="gridcontainer">
      <sub className="sub">{props.submitter}</sub>      
      <img src={props.profilepic} className="profilepic"/>      
      <score className="score">9000</score>
      </div>
      <img src={props.imageUrl} alt={props.name} />
      <p>{props.name}</p>
    </div>
  );
}

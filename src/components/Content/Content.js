import { useEffect, useState } from "react";
import Meme from "../Meme/Meme";
import "./content.css";
import axios from "axios";

export default function Content(props) {
  const [meme, setMeme] = useState([]);

  //Uses axios to fetch data from backend and then setMeme to received array
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/addmeme")
      .then((result) => {
        setMeme(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //When component is mounted the fetchdata function is run once
  useEffect(() => {
    fetchData();
  }, []);

  if (props.isLoggedIn) {
    return (
      <div style={{ display: "inline-grid", justifyContent: "center" }}>
        {/*maps the array of objects fetched from the backend
        and creates a Meme component for each object*/}
        {meme.map(({ id, picurl, description, submitter, profilepic }) => {
          return (
            <div key={id} className="meme">
              <Meme imageUrl={picurl} name={description} submitter={submitter} profilepic={profilepic} />
            </div>
          );
        })}
      </div>
    );
  }
  return <h1>You must log in to see content</h1>;
}

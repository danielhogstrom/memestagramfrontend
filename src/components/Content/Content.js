import { useEffect, useState } from "react";
import Meme from "../Meme/Meme";
import "./content.css";
import axios from "axios";

export default function Content() {
  const [meme, setMeme] = useState([]);
  //For testing purpose
  /*   const test = [
    {
      id: 1,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-1.png",
      name: "Amanda",
    },
    {
      id: 2,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-12.jpg",
      name: "Christopher",
    },
    {
      id: 3,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-68.jpg",
      name: "Ante",
    },
    {
      id: 4,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-12.jpg",
      name: "Samuel",
    },
    {
      id: 5,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-12.jpg",
      name: "Andreas",
    },
  ]; */
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/*maps the array of objects fetched from the backend
      and creates a Meme component for each object*/}
      {meme.map(({ id, picurl, description }) => {
        return (
          <div key={id} className="meme">
            <Meme imageUrl={picurl} name={description} />
          </div>
        );
      })}
    </div>
  );
}

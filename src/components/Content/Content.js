import { useEffect, useState } from "react";
import Meme from "../Meme/Meme";
import "./content.css";

export default function Content() {
  const [meme, setMeme] = useState([]);
  //For testing purpose
  const test = [
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
  ];
  useEffect(() => {
    setMeme(test);
  }, []);

  return (
    <div>
      {/*maps the array of objects fetched from the backend
      and creates a Meme component for each object*/}
      {meme.map(({ id, meme, name }) => {
        return (
          <div key={id} className="meme">
            <Meme imageUrl={meme} name={name} />
          </div>
        );
      })}
    </div>
  );
}

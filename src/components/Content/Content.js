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
    },
    {
      id: 2,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-12.jpg",
    },
    {
      id: 3,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-68.jpg",
    },
    {
      id: 4,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-12.jpg",
    },
    {
      id: 5,
      meme: "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-12.jpg",
    },
  ];
  useEffect(() => {
    setMeme(test);
  }, []);

  return (
    <div className="content">
      {/*maps the array of objects fetched from the backend
      and creates a Meme component for each object*/}
      {meme.map(({ id, meme }) => {
        return (
          <div className="memeframe" key={id}>
            <div className="memeimage">
              <Meme imageUrl={meme} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

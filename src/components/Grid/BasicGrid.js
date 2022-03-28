import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MemeCard from "../Card/MemeCard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axios from "axios";
import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {
  const [memes, setMemes] = useState([]);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState({});
  const [sort, setSort] = useState(false);

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:8080/api/user/${props.user}`, {
        withCredentials: true,
      })
      .then((result) => {
        setUser(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Uses axios to fetch data from backend and then setMeme to received array
  const fetchMeme = async () => {
    await axios
      .get("http://localhost:8080/api/meme/all", {
        withCredentials: true,
      })
      .then((result) => {
        setMemes(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //When component is mounted the fetchdata function is run once
  useEffect(async () => {
    await fetchUser();
    await fetchMeme();
  }, [update]);

  const sortByLikes = () => {
    const sortedMemes = memes.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    setMemes(sortedMemes);
    setSort(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item sm={12}>
          <Header user={user} setUpdate={setUpdate} update={update} />
        </Grid>
        {memes
          .slice(0)
          .reverse()
          .map((meme) => {
            return (
              <>
                <Grid
                  key={meme.id}
                  item
                  sm={6}
                  md={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",

                  }}
                >
                  <MemeCard meme={meme} user={user} />
                </Grid>
              </>
            );
          })}
        <Grid
          item
          sm={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Footer />
          <div>
            <button onClick={sortByLikes}>sort by likes</button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

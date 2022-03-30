import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MemeCard from "../Card/MemeCard";
import Header from "../Header/Header";
import MyPage from "../MyPage/MyPage";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Switch } from "@mui/material";
import { getMenuItemUnstyledUtilityClass } from "@mui/base";

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

  const myData = {
    user,
    memes,
  };

  const fetchUser = () => {
    axios
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
  const fetchMeme = () => {
    axios
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
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchMeme();
  }, [update]);

  const sortByLikes = () => {
    let sortedMemes = memes.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    setMemes(sortedMemes.reverse());
    setSort(true);
  };
  const logOut = () => {
    props.setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    /* localStorage.setItem("isLoggedIn", false); */
  };
  const sortByNewest = () => {
    let sortedMemes = memes.sort((a, b) => (a.id > b.id ? -1 : 1));
    setMemes(sortedMemes.reverse());
    setSort(false);
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
        <Grid
          item
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "70px",
          }}
        >
          <Button variant="text" onClick={sortByLikes}>
            sort by likes
          </Button>
          <Button variant="text" onClick={sortByNewest}>
            sort by newest
          </Button>
          <Button variant="text" onClick={() => logOut()}>
            log out
          </Button>
          <Button variant="text">
            <Link to="/MyPage" state={myData}>
              My Page
            </Link>
          </Button>
        </Grid>
        {memes
          .slice(0)
          .reverse()
          .map((meme, index) => {
            return (
              <Grid
                key={index}
                item
                sm={6}
                md={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <MemeCard
                  meme={meme}
                  user={user}
                  update={update}
                  setUpdate={setUpdate}
                />
              </Grid>
            );
          })}
        <Grid
          item
          sm={12}
          style={{ display: "flex", justifyContent: "center" }}
        ></Grid>
      </Grid>
    </Box>
  );
}

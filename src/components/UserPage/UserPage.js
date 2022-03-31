import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MemeCard from "../Card/MemeCard";
import Header from "../Header/Header";
import { useState } from "react";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IconButton, Switch } from "@mui/material";
import "./userpage.css";

export default function MyPage(props) {
  const [user, setUser] = useState({});
  const location = useLocation();
  const data = location.state;
  

  function handleClick() {
    window.history.go(-1);
  }
  React.useEffect(() => {
    setUser(data.user);
    console.log(user);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={1}
        style={{
          backgroundColor: "#dae0e6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item sm={12}>          
        </Grid>
        <Grid
          item
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",            
          }}
        >          
        </Grid>
        <Grid item sm={12}>
          <Header />

          <div
            className="avatarwindow"
            style={{
              display: "flex",
              backgroundColor: "#ffffff",
              paddingTop: "20px"
            }}
          >
            <div>
              <Avatar className="avatarpic">
                <img
                  src={data.guestUser.avatar}
                  className="actualpic"
                ></img>
              </Avatar>
            </div>

            <span className="username">{data.guestUser.username}</span>

            <span className="bio">              
              {data.guestUser.bio}
            </span>
            
          </div>
          <div className="following">Following: 9</div>
        </Grid>
        <Button onClick={handleClick} className="goback">Go back</Button>
        <Grid
          item
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        ></Grid>
        {data.memes
          .slice(0)
          .filter((meme) => meme.creator.id == data.memeCreator)
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
                <MemeCard meme={meme} user={user} />
              </Grid>
            );
          })}
        <Grid
          item
          sm={12}
          style={{ display: "flex", justifyContent: "center" }}
        ></Grid>
      </Grid>

      <Grid
        item
        sm={12}
        style={{ display: "flex", justifyContent: "center" }}
      ></Grid>
    </Box>
  );
}

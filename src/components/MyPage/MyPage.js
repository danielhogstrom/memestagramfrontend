import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MemeCard from "../Card/MemeCard";
import Header from "../Header/Header";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item sm={12}>
          <Header />
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
          <Button onClick={handleClick}>Go back</Button>
        </Grid>
        {data.memes
          .slice(0)
          .filter((meme) => meme.creator.id == data.user.id)
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
    </Box>
  );
}

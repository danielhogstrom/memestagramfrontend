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
import UploadButton from "../UploadButton/UploadButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  const [memes, setMemes] = useState([]);

  //Uses axios to fetch data from backend and then setMeme to received array
  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/meme/all")
      .then((result) => {
        setMemes(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //When component is mounted the fetchdata function is run once
  useEffect(() => {
    fetchData();
    console.log(memes);
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
        {memes.map((meme) => {
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
                <MemeCard meme={meme} />
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
        </Grid>
      </Grid>
    </Box>
  );
}

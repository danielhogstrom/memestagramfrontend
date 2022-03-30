import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MemeCard from "../Card/MemeCard";
import Header from "../Header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Switch } from "@mui/material";

export default function MyPage(props) {

const [memes, setMemes] = useState([]);
/* const [update, setUpdate] = useState(false); */
const [user, setUser] = useState({});
const [sort, setSort] = useState(false);

const location = useLocation();
const data = location.state;





  //Uses axios to fetch data from backend and then setMeme to received array
  useEffect(() => {    
    console.log("useEffect router");
    console.log(data);
     
    /* console.log(memes); */   
  }, /* [update]) */    []);



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
                 </Grid>
                {data.memes
                  .slice(0)
                  .filter(meme => meme.creator.id==data.user.id)
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
  


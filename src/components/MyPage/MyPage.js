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
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { IconButton, Switch } from "@mui/material";
import "./mypage.css";



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



                  <div className="avatarwindow"
                  style={{
                  display: "flex",
                  }}>

                    <div>
                    <Avatar className="avatarpic">
                      <img src="https://images.freeimages.com/images/large-previews/7f0/old-man-1561812.jpg" className="actualpic"></img>
                    </Avatar>
                    </div>

                    <span className="username">
                      {data.user.username}
                    </span>

                    <span className="bio">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
                    accusantium doloremque laudantium, totam rem aperiam.
                      {data.user.bio}
                    </span>    
                  </div>
                  <div className="following">
                      Following: 9
                  </div>


                </Grid>
                <Grid
                  item
                  sm={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
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
  


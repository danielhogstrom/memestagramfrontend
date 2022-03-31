import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import { ThemeContext } from "@emotion/react";
import "./memecard.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function MemeCard(props) {
  const [isLiked, setIsLiked] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState();
  const [likedIcon, setIsLikedIcon] = useState();
  const [isFollowed, setIsFollowed] = useState();
  const [followedIcon, setFollowedIcon] = useState();
  const [memeCreator, setMemeCreator] = useState();
  const [guestUser, setGuestUser] = useState({});

  const [user, setUser] = useState(props.user);
  const [memes, setMemes] = useState([]);

  const myData = {
    user,
    memes,
    memeCreator,
    guestUser,
  };

  const addLike = () => {
    setIsLikedIcon({ color: "#ff6c4f" });
    setIsLiked(true);

    console.log("props");
    console.log(props.user);

    axios
      .get(`http://localhost:8080/api/meme/addLike/${props.meme.id}`)
      .then((response) => setNumberOfLikes(response.data));
  };
  const removeLike = () => {
    setIsLikedIcon({ color: "" });
    setIsLiked(false);
    axios
      .get(`http://localhost:8080/api/meme/removeLike/${props.meme.id}`)
      .then((response) => setNumberOfLikes(response.data));
  };

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

  useEffect(() => {
    fetchMeme();
    setFollowedIcon(
      props.meme.creator.id == user.id || props.hide
        ? { display: "none" }
        : { color: "" }
    );
  }, []);

  const mouseEnterEvent = () => {
    setMemeCreator(props.meme.creator.id);
    setGuestUser(props.meme.creator);
  };

  const followButton = () => {
    if (isFollowed) {
      setIsFollowed(false);
      setFollowedIcon({ color: "" });
    } else {
      setIsFollowed(true);
      setFollowedIcon({ color: "#ff6c4f" });
    }
  };
  React.useEffect(() => {
    setNumberOfLikes(props.meme.likes);
  }, []);

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/meme/getNumberOfLikes/${props.meme.id}`)
      .then((response) => setNumberOfLikes(response.data));
  });
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        className="cardheader"
        avatar={
          <Avatar onMouseEnter={() => mouseEnterEvent()}>
            <Link to="/UserPage" state={myData}>
              <img
                src={props.meme.creator.avatar}
                className="smallavatar"
              ></img>
            </Link>
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={followButton}
            style={followedIcon}
          >
            <PersonAddIcon />
          </IconButton>
        }
        titleTypographyProps={{ variant: "h6" }}
        title={
          props.meme.creator === null
            ? "no creator"
            : props.meme.creator.username
        }
      />
      <CardMedia
        component="img"
        height="auto"
        image={props.meme.picurl}
        alt={props.meme.description}
      />

      <CardContent>
        <span>
          <span
            style={{
              float: "left",
              marginTop: "8px",
            }}
          >
            <Typography variant="body2" color="text.secondary"></Typography>
          </span>
          <span className="description">{props.meme.description}</span>
          <span style={{ float: "right" }}>
            <IconButton
              aria-label="favorite"
              onClick={isLiked ? removeLike : addLike}
              style={likedIcon}
            >
              <FavoriteIcon />
            </IconButton>
            {numberOfLikes}
          </span>
        </span>
      </CardContent>
    </Card>
  );
}

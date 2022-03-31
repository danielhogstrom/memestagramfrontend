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

export default function MemeCard(props) {
  const [isLiked, setIsLiked] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState();
  const [likedIcon, setIsLikedIcon] = useState();
  const [isFollowed, setIsFollowed] = useState();
  const [followedIcon, setFollowedIcon] = useState();

  const addLike = () => {
    setIsLikedIcon({ color: "#ff6c4f" });
    setIsLiked(true);
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
        avatar={<Avatar>
        <img
          src={props.meme.creator.avatar}
          className="smallavatar"          
        ></img>
      </Avatar>}
        action={
          <IconButton
            aria-label="settings"
            onClick={followButton}
            style={followedIcon}
          >
            <PersonAddIcon />
          </IconButton>
        
        }        
        titleTypographyProps={{variant:'h6'}}
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
          <span className="description">
          {props.meme.description}
          </span>
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

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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MemeCard(props) {
  const [likes, setLikes] = useState(props.meme.likes);
  const [isLiked, setIsLiked] = useState();
  const [likedIcon, setIsLikedIcon] = useState();
  const [isFollowed, setIsFollowed] = useState();
  const [followedIcon, setFollowedIcon] = useState();

  const addLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setIsLikedIcon({ color: "" }); 
      setLikes(props.meme.likes)     
      axios
      .put(`http://localhost:8080/api/meme/${props.meme.id}/${props.meme.likes}`, {
        withCredentials: true,
      })      
      .catch((error) => {
        console.log(error);
      });
      
    } else {       
      setIsLiked(true);
      setIsLikedIcon({ color: "#ff6c4f" });
      setLikes(props.meme.likes+1)
      axios
      .put(`http://localhost:8080/api/meme/${props.meme.id}/${props.meme.likes+1}`, {
        withCredentials: true,
      })      
      .catch((error) => {
        console.log(error);
      });
      
  };
    }
 

  const followButton = () => {
    if (isFollowed) {
      setIsFollowed(false);
      setFollowedIcon({ color: "" });
    } else {
      setIsFollowed(true);
      setFollowedIcon({ color: "#ff6c4f" });
    }
    console.log(props.meme.creator);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="meme"></Avatar>}
        action={
          <IconButton
            aria-label="settings"
            onClick={followButton}
            style={followedIcon}
          >
            <PersonAddIcon />
          </IconButton>
        }
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
          {props.meme.description}
          <span style={{ float: "right" }}>
            <IconButton
              aria-label="favorite"
              onClick={addLike}
              style={likedIcon}
            >
              <FavoriteIcon />
            </IconButton>
            {likes}
          </span>
        </span>
      </CardContent>
    </Card>
  );
}

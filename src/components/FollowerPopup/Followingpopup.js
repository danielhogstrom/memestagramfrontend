import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import axios from "axios";

function SimpleDialog(props) {
  const [names, setNames] = React.useState([]);
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/followers/namesfollowing/${props.userid}`)
      .then((response) => {
        setNames(response.data);
      });
  }, []);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Following </DialogTitle>
      <List sx={{ pt: 0 }}>
        {names.map((user) => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar>
                <img src={user.avatar} className="smallavatar"></img>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        padding: "0px",
      }}
    >
      <br />
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ minWidth: "140px", marginLeft: "10px", padding: "5px" }}
      >
        Following: {props.count}
      </Button>
      <SimpleDialog open={open} onClose={handleClose} userid={props.userid} />
    </div>
  );
}

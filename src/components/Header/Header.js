import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import UploadButton from "../UploadButton/UploadButton";
import memestagramlogo from "../Header/logo/memestagramlogo.png";
import memestagrammini from "../Header/logo/memestagrammini.png";



function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar style={{ background: "white", color: "black" }}>
          <Toolbar
            style={{
              justifyContent: "space-between",
              backgroundColor: "white",
              color: "#ff4411",
              fontSize: "48px",
              fontFamily: "'Signika', sans-serif",
            }}
          >
            <Typography variant="h6" component="div">
            <picture>
              <source srcSet={`${memestagrammini} 1x`} media="(max-width: 500px)" width="50px"/>
              <img style={{marginTop: "15px"}}
              className="logotype"
              srcSet={`${memestagramlogo} 2x`} width="200px"
              alt="memestagram" />
              </picture>
              {/* Memestagram */}
            </Typography>
            <Typography component="div">
              <UploadButton
                user={props.user}
                setUpdate={props.setUpdate}
                update={props.update}
              />
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}></Box>
      </Container>
    </React.Fragment>
  );
}

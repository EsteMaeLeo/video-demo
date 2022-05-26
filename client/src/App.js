import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

const useStyles = makeStyles(theme => ({
  appBar: {
    borderRadius: 35,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "4px solid #c8e6c9",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const classStyles = useStyles();
  return (
    <div className={classStyles.wrapper}>
      <AppBar
        className={classStyles.appBar}
        position="static"
        style={{ background: "#a5d6a7" }}
      >
        <Typography variant="h2" align="center">
          Video DEVS
        </Typography>
      </AppBar>
      {/* VideoPlayer two camara */}
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
      {/* Options inside Notification */}
    </div>
  );
};

export default App;

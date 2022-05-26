import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "../Context";

//create styles
const useStyles = makeStyles(theme => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

//vide create frame
const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const classStyles = useStyles();

  return (
    <Grid container className={classStyles.gridContainer}>
      {stream && (
        <Paper className={classStyles.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {"Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classStyles.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classStyles.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classStyles.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;

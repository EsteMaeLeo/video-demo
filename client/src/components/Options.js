import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { SocketContext } from "../Context";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));
const Options = ({ children }) => {
  const context = useContext(SocketContext);

  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");
  const classStyles = useStyles();

  return (
    <Container className={classStyles.container}>
      <Paper elevation={10} className={classStyles.paper}>
        <form className={classStyles.root} noValidate autoComplete="off">
          <Grid container className={classStyles.gridContainer}>
            <Grid item xs={12} md={6} className={classStyles.padding}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me} className={classStyles.margin}>
                <Button
                  variant="contained"
                  color="white"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            {/* Make call */}
            <Grid item xs={12} md={6} className={classStyles.padding}>
              <Typography gutterBottom variant="h6">
                Make Call
              </Typography>
              <TextField
                label="ID to call"
                value={idToCall}
                onChange={e => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  className={classStyles.margin}
                >
                  Stop the call
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="white"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  className={classStyles.margin}
                >
                  Devs Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;

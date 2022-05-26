import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { SocketContext } from "../Context";

const Notification = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} is calling:</h1>
          <Button
            variant="contained"
            style={{ background: "#a5d6a7" }}
            onClick={answerCall}
          >
            Answer Devs Jobs
          </Button>
        </div>
      )}
    </>
  );
};
export default Notification;

import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:3010");
//const socket = io("https:// WHEN CREATE APP in .herokuapp.com");

const ContextProvider = ({ children }) => {
  //set call is accepted
  const [callAccepted, setCallAccepted] = useState(false);
  //set call is Ended
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    //ideo frame
    //devices get the stream and set to the state
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(currentStream => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });
    //get id
    socket.on("me", id => setMe(id));
    //state call user
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    //create new peer behaivor similar to socket
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", data => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    //other person stream
    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = id => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    //pass user who call and signal, who is the call
    peer.on("signal", data => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });
    //call accepted

    socket.on("callAccepted", signal => {
      setCallAccepted(true);

      peer.signal(signal);
    });
    //connection
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

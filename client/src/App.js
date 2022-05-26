import React from "react";
import { Typography, AppBar } from "@material-ui/core";

import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

const App = () => {
  return (
    <div>
      <AppBar position="static" style={{ background: "#a5d6a7" }}>
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

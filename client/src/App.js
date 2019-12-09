import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Editor from "./Editor";

let socket = undefined;
const endpoint = "http://127.0.0.1:3030";
const roomName = "basiltoast";

function App() {
  const [code, setCode] = useState("");
  const [eventMask, setEventMask] = useState(true);

  const initSocketSetting = () => {
    socket = io(endpoint);
    socket.on("connectted", () => socket.emit("joinRoom", roomName));
    socket.on("change", (id, value) => {
      setEventMask(false);
      setCode(value);
    });
  };

  const maskingEvent = () => {
    if (eventMask) {
      socket.emit("change", socket.id, code);
      setEventMask(false);
    }
  };

  const handleOnChange = (event, value) => {
    setEventMask(true);
    setCode(value);
  };

  useEffect(initSocketSetting, []);
  useEffect(maskingEvent, [code]);

  return (
    <Editor
      handleOnChange={handleOnChange}
      code={code}
    />
  );
}

export default App;

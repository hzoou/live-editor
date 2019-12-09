import React, { useState, useEffect, useRef } from "react";
import { ControlledEditor, ControlledEditorProps } from "@monaco-editor/react";
import io from "socket.io-client";

let socket = undefined;
const endpoint = "http://127.0.0.1:3030";
const roomName = "basiltoast";

function App() {
  const [code, setCode] = useState("");
  const [eventMask, setEventMask] = useState(true);
  const [cursor, setCursor] = useState(undefined);
  const ref = useRef(null);
  useEffect(() => {
    console.log(ControlledEditorProps);
    socket = io(endpoint);
    socket.on("connectted", () => {
      socket.emit("joinRoom", roomName);
    });
    socket.on("change", (id, value) => {
      setEventMask(false);
      setCode(value);
    });
  }, []);

  useEffect(() => {
    if (eventMask) {
      socket.emit("change", socket.id, code);
      setEventMask(false);
    }
  }, [code]);

  const handleOnChange = (event, value) => {
    console.log(event);
    console.log(value);
    setEventMask(true);
    setCode(value);
  };

  const handleDidMount = (editor, monaco) => {
    editor("onDidChangeContents", handleOnChange);
  };

  return (
    <ControlledEditor
      onChange={handleOnChange}
      theme="vs-dark"
      editorDidMount={handleDidMount}
      value={code}
      language="javascript"
    />
  );
}

export default App;

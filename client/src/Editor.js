import React from "react";
import { ControlledEditor } from "@monaco-editor/react";

function Editor({ code, handleOnChange }) {
  return (
    <ControlledEditor
      value={code}
      language="javascript"
      theme="vs-dark"
      options={{ fontSize: "16px" }}
      onChange={handleOnChange}
    />
  );
}

export default Editor;

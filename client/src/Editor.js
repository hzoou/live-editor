import React from "react";
import { ControlledEditor } from "@monaco-editor/react";

function Editor({ onChange, code }) {
  return (
    <ControlledEditor
      value={code}
      language="javascript"
      theme="vs-dark"
      options={{ fontSize: "16px" }}
      onChange={onChange}
    />
  );
}

export default Editor;

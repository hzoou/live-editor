import React from 'react';
import Editor from "./Editor";
import io from "socket.io-client";

function App() {
    const endpoint = "http://127.0.0.1:3030";
    const socket = io(endpoint);

    return (
        <Editor />
    );
}

export default App;

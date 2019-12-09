import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import * as Diff from 'diff';

import Editor from "./Editor";

let socket = undefined;
const endpoint = "http://127.0.0.1:3030";
const roomName = "basiltoast";

function App() {
    const [code, setCode] = useState("hello");
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
        const diff = Diff.diffChars(code, value);
        const history = [];
        diff.forEach(({ count, added, removed, value }) => {
            if (!added && !removed) { //retain
                history.push(`retain(${count})`);
            } else if (added) { //insert
                history.push(`insert('${value}')`);
            } else if (removed) { //delete
                history.push(`delete(${count})`);
            }
            console.log(count, added, removed, value);
        });
        console.log('history :', history);
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

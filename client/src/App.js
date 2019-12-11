import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import Editor from './Editor';

import opParser from './ot/operationParser';

let socket = undefined;
const endpoint = 'http://172.16.180.126:3030';
const roomName = 'basiltoast';

const initailValue = '';

function App() {
    const [code, setCode] = useState(initailValue);
    const [eventMask, setEventMask] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [value, setValue] = useState('');
    const editorRef = useRef();

    const initSocketSetting = () => {
        socket = io(endpoint);
        socket.on('connectted', () =>
            socket.emit('joinRoom', roomName, initailValue)
        );
        socket.on('change', (id, value) => {
            if (socket.id === id) return setIsPending(false);
            setEventMask(true);
            setCode(value);
            // handleSelection();
        });
    };

    useEffect(() => {
        if (code === value) setEventMask(false);
        if (!socket) return;
        if (isPending) return;
        if (eventMask) return;

        const op = opParser(code, value);
        op.unshift({ operator: 'timestamp', value: Date() });

        setIsPending(true);
        setCode(value);
        // handleSelection();
        socket.emit('change', op);
    }, [code, value]);

    const handleOnChange = (event, value) => {
        setValue(value);
    };

    const handleDidMount = (_, editor) => {
        editorRef.current = editor;
    };

    const handleSelection = () => {
        // const prev = editorRef.current.getSelection();
        // const next = {
        //     ...prev,
        //     positionLineNumber: prev.startLineNumber,
        //     positionColumn: prev.startColumn,
        //     endLineNumber: prev.startLineNumber,
        //     endColumn: prev.startColumn
        // };
        // editorRef.current.setSelection({
        //     ...prev,
        //     positionLineNumber: prev.startLineNumber,
        //     positionColumn: prev.startColumn,
        //     endLineNumber: prev.startLineNumber,
        //     endColumn: prev.startColumn
        // });
        // editorRef.current.setEndPosition(editorRef.current.getStartPosition());
        // editorRef.current.setSelection(next);
    };

    useEffect(initSocketSetting, []);

    return (
        <Editor
            handleOnChange={handleOnChange}
            code={code}
            handleDidMount={handleDidMount}
        />
    );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import Editor from './Editor';

import opParser from './ot/operationParser';

let socket = undefined;
const endpoint = 'http://localhost:3030';
const roomName = 'basiltoast';

const initialValue = '';

function App() {
    const [code, setCode] = useState(initialValue);
    const [eventMask, setEventMask] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [value, setValue] = useState('');
    const editorRef = useRef();

    const initSocketSetting = () => {
        socket = io(endpoint);
        socket.on('connected', () =>
            socket.emit('joinRoom', roomName, initialValue)
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
            handleDidMount={handleDidMount}
            code={code}
        />
    );
}

export default App;

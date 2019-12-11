import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';

function Editor({ code, handleOnChange, handleDidMount }) {
    return (
        <ControlledEditor
            value={code}
            editorDidMount={handleDidMount}
            language="javascript"
            theme="vs-dark"
            options={{ fontSize: '16px' }}
            onChange={handleOnChange}
        />
    );
}

export default Editor;

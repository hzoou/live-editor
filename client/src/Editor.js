import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';

function Editor() {
    return (
        <ControlledEditor
            value="test"
            language="javascript"
            theme="vs-dark"
            options={{ fontSize: '16px'}}
        />
    );
}

export default Editor;

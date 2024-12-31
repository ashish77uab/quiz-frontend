import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

const EditorCustom = ({ onEditorChange, value, initialValue = '' }) => {
    return (
        <div>
            <Editor
                apiKey={process.env.REACT_APP_TINY_API}
                onEditorChange={onEditorChange}
                value={value}
                initialValue={''}
            />
        </div>
    )
}

export default EditorCustom
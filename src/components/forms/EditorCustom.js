import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

const EditorCustom = ({ onEditorChange, label, labelClassName, labelAddon, value, initialValue }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <div className="flex items-center w-full justify-between gap-4">
                {<label className={`${labelClassName} text-sm font-medium`} htmlFor="">{label}</label>}
                {labelAddon && labelAddon}
            </div>
            }
            <Editor
                apiKey={process.env.REACT_APP_TINY_API}
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                }}
                onEditorChange={onEditorChange}
                value={value}
            />
        </div>
    )
}

export default EditorCustom
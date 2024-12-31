import React from 'react'

const DangerouslySetHtml = ({ html, customClassName }) => {
    return (
        <div>
            <div className={`[&_p]:text-sm [&_p]:mb-2  ${customClassName}`} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}

export default DangerouslySetHtml
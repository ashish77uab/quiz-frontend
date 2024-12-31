import React from 'react'

const DangerouslySetHtml = ({ html }) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}

export default DangerouslySetHtml
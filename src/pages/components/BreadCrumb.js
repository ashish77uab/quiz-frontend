import React from 'react'
import { Link } from 'react-router-dom'
import { reactIcons } from '../../utils/icons'

const BreadCrumb = ({path,title}) => {
  return (
    <div className='px-4 py-2 rounded-md flex items-center gap-1 '>
        <Link className='text-white opacity-90 font-medium hover:underline' to='/' >Home</Link>
        <span className='text-white '>{reactIcons.arrowright}</span>
        <Link className='text-white font-medium hover:underline' to={path} >{title}</Link>

    </div>
  )
}

export default BreadCrumb
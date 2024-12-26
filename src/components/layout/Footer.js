import React from 'react'
import { reactIcons } from '../../utils/icons'
import { Link } from 'react-router-dom'

const footerLinks = [
    {
        title: 'About',
        link: '/'
    },
    {
        title: 'Privacy Policy',
        link: '/'
    },
    {
        title: 'Terms and Conditions',
        link: '/'
    },

]
const Footer = () => {
    return (
        <footer >
            <div className="px-4 bg-gray-50 py-4">
                <p className='text-muted text-center'>
                    &copy; 2025. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
import React from 'react'
import { reactIcons } from '../../utils/icons'
import { Link } from 'react-router-dom'
import moment from 'moment'

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
            <div className='md:py-16 py-10 bg-primary-pink text-white'>
                <div className="container">
                    <div className="flex lg:flex-row flex-col justify-between gap-4">
                        <div className='max-w-lg'>
                            <img className=' w-[210px]' src="/images/logo.png" alt="logo" />
                            <p className='max-w-[600px]  text-muted text-white mt-4'>We Provide an affordable trading platform to help everyone to switch into an effortless trading system which offers Autologin features with Best & Pre-tested Profitable Strategies with Real Time Execution and Zero Latency.</p>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div>
                                <h4 className='heading-4 mb-4'>Other Links</h4>
                                <ul>
                                    {
                                        footerLinks?.map((link) => {
                                            return <li className='py-2' key={link.title}><Link to={link.link} className='text-white font-medium hover:text-primary-blue hover:underline'>{link.title}</Link></li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h4 className='heading-4 mb-4'>Reach us</h4>
                                <ul className='space-y-6'>
                                    <li className='flex items-center gap-4 '>
                                        <span className='text-2xl'>{reactIcons.mobile}</span>
                                        <span>044 2450 0009</span>
                                    </li>
                                    {/* <li className='flex items-center gap-4 '>
                                        <span className='text-2xl'>{reactIcons.whatsapp}</span>
                                        <span>9193868729</span>
                                    </li> */}
                                    <li className='flex items-center gap-4'>
                                        <span className='text-2xl' >{reactIcons.email}</span>
                                        <span>algotronssupport@algotorns.com</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <p className='text-muted text-center'>
                    &copy; 2014 algotronssupport@algotorns.com. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
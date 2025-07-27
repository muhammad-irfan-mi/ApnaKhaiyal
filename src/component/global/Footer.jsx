import React, { useContext } from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoLogoYoutube } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { Context } from '../../Context/ContextProvider';

export default function Footer() {

    const { theme } = useContext(Context)
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className={`${isHomePage ? 'relative top-60' : 'relative bottom-[-24px]'}`}>
            <div className='bg-[#1A1A1A] flex flex-col md:flex-row  justify-between items-start md:items-center px-5 sm:px-10 lg:px-20 py-10 md:py-0 md:h-[350px]'>
                {/* First Column - Brand Info */}
                <div className='w-full md:w-[33%] mb-8 font-normal md:mb-0'>
                    <h1 className={`${theme.primaryColor2} text-5xl mb-8`}>Khaiyal</h1>
                    <p className='text-justify w-[90%] text-[#A5A5A5]'>We connects you with expert agents and seamless services to make buying, selling, or renting your property effortless.</p>

                    <div className="flex justify-start items-center gap-4 mt-6">
                        <span className="bg-[#454545] flex items-center justify-center text-[#A5A5A5] rounded-full p-2 w-8 h-8 hover:bg-[#002456] transition duration-300 cursor-pointer">
                            <FaFacebookF />
                        </span>
                        <span className="bg-[#454545] flex items-center justify-center text-[#A5A5A5] rounded-full p-2 w-8 h-8 hover:bg-[#002456] transition duration-300 cursor-pointer">
                            <FaTwitter />
                        </span>
                        <span className="bg-[#454545] flex items-center justify-center text-[#A5A5A5] rounded-full p-2 w-8 h-8 hover:bg-[#002456] transition duration-300 cursor-pointer">
                            <FaInstagram />
                        </span>
                        <span className="bg-[#454545] flex items-center justify-center text-[#A5A5A5] rounded-full p-2 w-8 h-8 hover:bg-[#002456] transition duration-300 cursor-pointer">
                            <FaLinkedin />
                        </span>
                        <span className="bg-[#454545] flex items-center justify-center text-[#A5A5A5] rounded-full p-2 w-8 h-8 hover:bg-[#002456] transition duration-300 cursor-pointer">
                            <IoLogoYoutube />
                        </span>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className='w-1/2 md:w-auto font-normal mb-8 md:mb-0'>
                    <h2 className={`font-[700] text-[24px] ${theme.primaryColor2} mb-8`}>Quick Links</h2>
                    <ul>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">All Properties</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Agencies</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Buy Membership</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Banner Advertising</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Services Column */}
                <div className='w-1/2 md:w-auto font-normal mb-8 md:mb-0'>
                    <h2 className={`font-[700] text-[24px] ${theme.primaryColor2} mb-8`}>Khaiyal Services</h2>
                    <ul>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Home Inspection</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Home Construction</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Map Making</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">About Khaiyal</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Khaiyal Projects</a></li>
                    </ul>
                </div>

                {/* Help Column */}
                <div className='w-full font-normal md:w-auto '>
                    <h2 className={`font-[700] text-[24px] ${theme.primaryColor2} mb-8`}>Help & Support</h2>
                    <ul>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">About Us</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Our Investors</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Our Team</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Terms of Use</a></li>
                        <li className='my-2 text-sm text-[#A5A5A5] hover:underline hover:text-white'><a href="">Contact Us</a></li>
                    </ul>
                </div>
            </div>

            <div className='h-16 w-full flex justify-center items-center text-[13px] text-[#A5A5A5] bg-[#111212]'>
                <p>© Copyright Khaiyal 2024 | All Rights Reserved</p>
            </div>
        </div>
    )
}
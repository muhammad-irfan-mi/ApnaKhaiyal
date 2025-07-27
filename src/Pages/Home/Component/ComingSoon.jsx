import React from 'react';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import { FaApple } from "react-icons/fa";

export default function ComingSoon() {
    return (
        <div className="relative mt-32 md:top-60 md:mt-5">
            {/* Top Section - Subscribe */}
            <div className='h-auto md:h-[230px] flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 md:px-20 py-6 md:py-0 bg-[#EEF0F3]'>
                {/* Icon + Text - now stacks on mobile */}
                <div className="flex flex-col md:flex-row md:space-x-20 mb-4 md:mb-0">
                    <span className="text-[#F3B53F] md:ml-15 text-[40px] mb-2 md:mb-0 flex justify-center md:block">
                        <DraftsOutlinedIcon sx={{ fontSize: "50px" }} />
                    </span>
                    <div className="text-center md:text-left">
                        <h2 className="text-lg sm:text-xl md:text-[22px] font-[500] w-full md:w-[370px] text-[#1A1A1A]">
                            Subscribe For Latest Property Updates
                        </h2>
                        <p className="text-[14px] w-full md:w-[370px] text-gray-600 max-w-md">
                            Stay updated with the latest insights, exclusive offers, and expert tips tailored just for you!
                        </p>
                    </div>
                </div>

                {/* Form - stacks vertically on mobile */}
                <form className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Your Email Address"
                        className="px-4 py-2 rounded-md border border-gray-300 w-full sm:w-[202px] focus:outline-none"
                    />
                    <button
                        type="button"
                        className="bg-[#002456] text-white px-6 py-2 w-full sm:w-[202px] rounded-md font-semibold hover:bg-[#C89732] transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Bottom Section - App Coming Soon */}
            <div className="flex flex-col md:flex-row items-center justify-end h-auto md:h-[310px] bg-gradient-to-b from-[#c89732] to-[#284365] text-white">
                <div className="flex flex-col justify-start w-full p-4 md:p-2 md:w-[93%]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
                        Our App Coming Soon
                    </h1>

                    <p className="w-full md:w-[50%] text-justify text-base my-3 leading-relaxed">
                        Our app is currently under development, designed to provide you with a seamless and innovative experience. Stay tuned for updates and be the first to explore its exciting features!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full md:w-[50%]">
                        <button className="bg-white/10 backdrop-blur-md text-white w-full sm:w-[50%] px-4 rounded flex justify-between cursor-pointer hover:underline items-center gap-2 py-1 hover:bg-white/20 transition">
                            <div className="text-left">
                                Get it on <br /> Google Play Store
                            </div>
                            <AndroidOutlinedIcon sx={{ fontSize: 40 }} />
                        </button>

                        <button className="bg-white/10 backdrop-blur-md text-white w-full sm:w-[50%] px-4 py-1 rounded flex justify-between cursor-pointer hover:underline items-center gap-2 hover:bg-white/20 transition">
                            <div className="text-left">
                                Get it on <br /> Apple Apps Store
                            </div>
                            <FaApple className='text-4xl' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
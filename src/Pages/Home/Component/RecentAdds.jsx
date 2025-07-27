import React from 'react'
import presentedtBy from '../../../assets/images/recentadds/presentedBy.jpeg'
import towstoryhouse from '../../../assets/images/recentadds/doubleStory.jpeg'
import plot from '../../../assets/images/recentadds/plot.jpeg'
import bookNow from '../../../assets/images/recentadds/bookNow.jpeg'
import tableInCard from '../../../assets/images/tableInCard.jpeg'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

export default function RecenterAdds() {

    const products = [
        { id: 0, img: presentedtBy, textItem: '10 marla', timeperiod: "4 month ago", price: "Rs 500,000" },
        { id: 1, img: towstoryhouse, textItem: '10 Marla Double-Story Corner House for Sale', timeperiod: "5 month ago" },
        { id: 2, img: bookNow, textItem: '10 Marla Residential Plot in Orion Town Lodhran', timeperiod: "5 month ago" },
        { id: 3, img: bookNow, textItem: '15 Marla Residential Plot in Orion Town Lodhran', timeperiod: "4 month ago" },
        { id: 4, img: presentedtBy, textItem: '2 marla', timeperiod: "4 month ago", price: "Rs 500,000" },
        { id: 5, img: towstoryhouse, textItem: '2 story house', timeperiod: "1 month ago", price: "Rs 1300,000 - Rs 1400,000" },
        { id: 6, img: presentedtBy, textItem: '2 Marla', timeperiod: "4 month ago", price: "Rs 500,000 - Rs 700,000" },
        { id: 7, img: plot, textItem: '5 Marla residential plot In Arena City', timeperiod: "5 month ago" },
        { id: 8, img: plot, textItem: '5 Marla Residential Plot in Orion Town Lodhran', timeperiod: "5 month ago" },
        { id: 9, img: plot, textItem: '6 Marla Double Story luxury House for sale', timeperiod: "1 month ago", price: "2200,0000" },
        { id: 10, img: tableInCard, textItem: '6 Marla Residential Plot in Orion Town Lodhran', timeperiod: "5 month ago" },
        { id: 11, img: towstoryhouse, textItem: '6 Marla Residential Plot in Orion Town Lodhran', timeperiod: "5 month ago" },
    ];

    return (
        <div className='bg-[#EEF2F4] relative top-60 px-10 py-8'>
            <div className='flex justify-between capitalize px-5 py-3 flex-wrap'>
                <h2 className='text-2xl font-bold' type="button">recent ads</h2>
                <button className='bg-[#EEF7F0] border border-slate-300 font-semibold capitalize p-1 mt-2 sm:mt-0' type="button">
                    <span className='hover:border-b text-sm px-2 hover:border-amber-300'>see all adds</span>
                    <ArrowForwardOutlinedIcon fontSize='small' />
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-5 pb-5">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group relative shadow-xl rounded-[8px] bg-[#FFFFFF] overflow-hidden w-full sm:w-[48%] lg:w-[22%] transition-all duration-300"
                    >
                        {/* Image Wrapper */}
                        <div className="relative overflow-hidden rounded-t-[8px] shadow-[inset_0_-50px_50px_-10px_rgba(0,0,0,0.4)]">
                            <img
                                src={product.img}
                                alt=""
                                className="w-full h-[170px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />

                            <div className="absolute top-0 inline-block bg-[#0b2a53] text-white px-4 py-2 font-bold font-sans after:content-[''] after:absolute after:top-0 after:right-[-14px] after:border-y-[20px] after:border-l-[15px] after:border-y-transparent after:border-l-[#0b2a53]">
                                For Sell
                            </div>

                            <span className="absolute bottom-2 left-2 flex gap-2 text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
                                <FavoriteBorderOutlinedIcon className='bg-white text-black p-1 rounded' />
                                <ZoomInOutlinedIcon className='bg-white text-black p-1 rounded' />
                                <CompareArrowsOutlinedIcon className='bg-white text-black p-1 rounded' />
                            </span>

                            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-0"></div>
                        </div>

                        {/* Text Info */}
                        <div className='p-4'>
                            <a href="#" className={`block font-semibold my-1 text-xl`}>{product.textItem}</a>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                                <AccessTimeOutlinedIcon /> {product.timeperiod}
                            </span>
                            {product.price && <div className="font-bold mt-1 text-blue-950">{product.price}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

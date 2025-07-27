import React, { useContext, useState } from 'react'
import YourShop from '../../../assets/images/YourShop.jpeg'
import tableInCard from '../../../assets/images/tableInCard.jpeg'
import houseForSales from '../../../assets/images/houseForSales.jpeg'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Context } from '../../../Context/ContextProvider'

export default function BuySellNav() {
    const { theme } = useContext(Context)
    const [toggle, setToggle] = useState(false)
    const handleToggle = () => setToggle(!toggle)

    const CardArr = [
        { id: 0, img: YourShop, Cardbtn: "Shop", heading1: "Commercial Shop", timeicon: <AccessTimeIcon />, timePeriod: "1 Month ago", profileIcon: <AccountCircleOutlinedIcon />, profileName: "Muhammad Owais Ishaq", locationIcon: <LocationOnOutlinedIcon />, address: "Vehari, Punjab", profileViewIcon: <RemoveRedEyeOutlinedIcon />, profileViews: "13 views" },
        { id: 1, img: tableInCard, Cardbtn: "Houses", heading1: "6 Marla Double Story Luxury House", timeicon: <AccessTimeIcon />, timePeriod: "1 Month ago", profileIcon: <AccountCircleOutlinedIcon />, profileName: "Munawar", locationIcon: <LocationOnOutlinedIcon />, address: "Bahawalpur, Punjab", profileViewIcon: <RemoveRedEyeOutlinedIcon />, profileViews: "14 views" },
        { id: 2, img: houseForSales, Cardbtn: "Houses", heading1: "House for Sale", timeicon: <AccessTimeIcon />, timePeriod: "1 Month ago", profileIcon: <AccountCircleOutlinedIcon />, profileName: "M. Usama", locationIcon: <LocationOnOutlinedIcon />, address: "Rahim Yar Khan, Punjab", profileViewIcon: <RemoveRedEyeOutlinedIcon />, profileViews: "12 views" }
    ]

    const Navbuttons = [
        { id: 0, btnText: "buy" },
        { id: 1, btnText: "sell" },
        { id: 2, btnText: "rent" },
        { id: 3, btnText: "hostels" },
        { id: 4, btnText: "hotels" },
    ]

    return (
        <div className='bg-slate-100 relative top-60'>
            {/* Title */}
            <section className='text-2xl sm:text-3xl md:text-4xl pt-10 text-center font-bold text-slate-800'>
                <h1>Buy & Sell Properties at Khaiyal</h1>
            </section>

            {/* Nav Buttons */}
            <div className='flex flex-wrap w-[38%] mx-auto justify-between bg-white items-center rounded-sm  shadow-md mt-5 '>
                {Navbuttons.map((NavButton) => (
                    <button
                        key={NavButton.id}
                        onClick={handleToggle}
                        className='p-2 border border-slate-100  focus:bg-blue-950 focus:text-white capitalize px-6'
                    >
                        {NavButton.btnText}
                    </button>
                ))}
            </div>

            {/* Cards */}
            {toggle && (
                <div className='flex flex-wrap justify- gap-6 px-4 py-6'>
                    {CardArr.map((CardArray) => (
                        <div key={CardArray.id} className={`flex flex-col cursor-pointer w-full sm:w-[48%] md:w-[32%] lg:w-[250px] capitalize text-slate-500 ${theme.cardBorder} ${theme.cardRounded} ${theme.cardBg}`}>
                            <div className={`w-full ${theme.cardImgHeight}`}>
                                <img src={CardArray.img} className={`w-full h-full rounded ${theme.cardImgCover}`} alt="" /></div>
                            <a href="" className={`hover:underline decoration-[#7d5a02] ml-2 w-fit hover:text-slate-800 transition-all duration-300 ease-in-out ${theme.cardButtonText}`}>{CardArray.Cardbtn}</a>
                            <div className='w-fit'>
                                <h1 className={`inline-block hover:underline decoration-[#D29C2F] ml-1 hover:text-slate-800 transition-all duration-300 ease-in-out ${theme.cardFontBold} text-xl text-black ${theme.cardMarginY}`}>
                                    {CardArray.heading1}
                                </h1>
                            </div>
                            <div className={`flex items-center gap-2 hover:text-slate-600 ${theme.cardTextSize} ${theme.cardPadding}`}>
                                {CardArray.profileIcon}
                                <span>{CardArray.profileName}</span>
                            </div>
                            <div className={`flex items-center gap-2 hover:text-slate-600 ${theme.cardTextSize} ${theme.cardPadding}`}>
                                {CardArray.timeicon}
                                <span>{CardArray.timePeriod}</span>
                            </div>
                            <div className={`flex items-center gap-2 hover:text-slate-600 ${theme.cardTextSize} ${theme.cardPadding}`}>
                                {CardArray.locationIcon}
                                <span>{CardArray.address}</span>
                            </div>
                            <div className={`flex items-center gap-2 hover:text-slate-600 ${theme.cardTextSize} ${theme.cardPadding}`}>
                                {CardArray.profileViewIcon}
                                <span>{CardArray.profileViews}</span>
                            </div>
                            <div className='flex justify-between px-4 py-3 gap-2'>
                                <span className='flex-1 bg-slate-200 flex items-center justify-center gap-1 hover:bg-blue-950 hover:text-white py-2 rounded'>
                                    <PhoneEnabledOutlinedIcon /> Show Phone No
                                </span>
                                <span className='bg-slate-200 px-3 py-2 hover:bg-blue-950 hover:text-white rounded'>
                                    <FavoriteBorderOutlinedIcon />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Featured Section */}
            <div className='flex flex-col sm:flex-row bg-[#FFFFFF] mt-2 h-[200px] justify-between items-start sm:items-center px-4 sm:px-6 py-10 gap-6'>
                <div>
                    <h1 className='text-2xl sm:text-3xl mb-3 font-bold'>Featured Properties</h1>
                    <div className='h-1 w-[50px] bg-blue-950'></div>
                </div>
                <div className='flex justify-center'>
                    <span className='flex justify-center items-center bg-blue-950 hover:bg-blue-900 hover:cursor-pointer text-white mx-1 transition-all duration-300 ease-in-out'><KeyboardArrowLeftOutlinedIcon /></span>
                    <span className=' bg-blue-950 text-white hover:bg-blue-900 transition-all duration-300  ease-in-out ml-1 hover:cursor-pointer'><KeyboardArrowRightOutlinedIcon /></span>
                </div>
            </div>
        </div>
    )
}

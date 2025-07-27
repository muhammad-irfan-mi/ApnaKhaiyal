import { useState, useEffect, useContext } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/ContextProvider';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [activeNestedMenu, setActiveNestedMenu] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme } = useContext(Context);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveSubmenu(null);
        setActiveNestedMenu(null);
    };

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
        setActiveNestedMenu(null);
    };

    const toggleNestedMenu = (index) => {
        setActiveNestedMenu(activeNestedMenu === index ? null : index);
    };

    const navItems = [
        {
            title: "home",
            path: '/',
            subItems: [
                "About Khaiyal",
                "Khaiyal Project",
                "Our Team",
                "Our Investors",
                "Joba and Career"
            ]
        },
        {
            title: "our services",
            subItems: [
                "Home Inspection",
                "Home Developers",
                "Map officer",
                "Architecture Engineers",
                "Property Photographers"
            ]
        },
        {
            title: "properties",
            path: '/all-properties/',
            subItems: null,
            // subItems: [
            //     {
            //         title: "Apartments",
            //         nestedItems: [
            //             "Apartments for buy",
            //             "Apartments for rent",
            //             "Apartments for sell"
            //         ]
            //     },
            //     {
            //         title: "Houses",
            //         nestedItems: [
            //             "Houses for buy",
            //             "Houses for rent",
            //             "Houses for sell"
            //         ]
            //     },
            //     {
            //         title: "Hotels",
            //         nestedItems: [
            //             "Hotels for buy",
            //             "Hotels for rent",
            //             "Hotels for sell"
            //         ]
            //     },
            //     {
            //         title: "Shop",
            //         nestedItems: [
            //             "Shops for buy",
            //             "Shop for rent",
            //             "Shop for sell"
            //         ]
            //     },
            //     "Land",
            //     "Girls Hotels",
            //     "Boys Hotels"
            // ]
        },
        {
            title: "Verified Town",
            path: '/profile-category/town-owner/',
            subItems: null,
        },
        {
            title: "agencies",
            subItems: [
                "Marketing Agencies",
                "Property Agents"
            ]
        },
        {
            title: "news",
            subItems: [
                "Khaiyal News",
                "Khaiyal Gallery",
                // "Top Tips For Buy",
                // "Top Tips For Sell",
                // "Top Tips For Rent"
            ]
        },
        {
            title: "contact us",
            path: '/contact/',
            subItems: null,
        }
    ];

    return (
        <div className={`fixed w-full z-[99] flex capitalize justify-between items-center ${isScrolled
            ? 'bg-white text-black shadow-md'
            : 'bg-transparent text-white'
            } h-20 px-4 md:px-10 py-5 transition-all duration-300`}>

            <h1 className={`text-2xl md:text-3xl font-bold ${theme.primaryColor2}`}>Khaiyal</h1>

            <ul className="hidden lg:flex justify-between items-center w-[720px] font-semibold h-full">
                {navItems.map((item, index) => (
                    <li key={index} className="relative group">
                        <Link
                            className={`px-2 py-3 cursor-pointer flex justify-center items-center text-md ${isScrolled ? 'hover:text-gray-700' : 'hover:text-gray-300'
                                }`}
                            to={item.path || '#'}
                        >
                            {item.title}
                            {item.subItems && (
                                <KeyboardArrowDownIcon sx={{
                                    fontSize: "20px",
                                    color: isScrolled ? 'black' : 'white'
                                }} />
                            )}
                        </Link>

                        {item.subItems && (
                            <div className={`absolute ${index === 0 ? '-left-[50%]' : '-left-[40%]'
                                } top-15 bg-white text-black rounded shadow-lg transform scale-y-0 group-hover:scale-y-100 opacity-0 group-hover:opacity-100 origin-top transition-all duration-500 ease-in-out invisible group-hover:visible z-50 w-52`}>
                                <ul className="p-2 border-t-4 border-blue-950 transition-all duration-500 ease-in-out">
                                    {item.subItems.map((subItem, subIndex) => (
                                        typeof subItem === 'string' ? (
                                            <li
                                                key={subIndex}
                                                className="transition-all duration-500 ease-in-out px-4 py-3 text-[14px] font-[400] hover:bg-blue-950 hover:text-white"
                                            >
                                                <Link
                                                    to={
                                                        subItem === 'Khaiyal News'
                                                            ? '/blog'
                                                            : 
                                                        '#'
                                                    }
                                                >
                                                    {subItem}
                                                </Link>
                                            </li>
                                        ) : (
                                            <li
                                                key={subIndex}
                                                className="relative group/item px-4 py-2 text-[14px] font-[400] hover:bg-blue-950 hover:text-white transition-all duration-500 ease-in-out"
                                            >
                                                <div className="flex justify-between items-center cursor-pointer">
                                                    {subItem.title}
                                                    <ChevronRightIcon sx={{ fontSize: 16 }} />
                                                </div>
                                                <ul className="absolute top-0 -right-51 bg-white text-black shadow-lg transform scale-y-0 opacity-0 invisible group-hover/item:scale-y-100 group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 ease-in-out w-48 z-50">
                                                    {subItem.nestedItems.map((nestedItem, nestedIndex) => (
                                                        <li
                                                            key={nestedIndex}
                                                            className="px-4 py-3 hover:bg-blue-950 hover:text-white capitalize"
                                                        >
                                                            <Link to="#">{nestedItem}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Right Side Icons and Mobile Menu Button */}
            <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center space-x-2">
                    <IoChatbubblesOutline className={`text-xl md:text-2xl ${theme.primaryColor2} hover:text-[#FDBE49]`} />
                    <Link to="/my-account/">
                        <PersonOutlineOutlinedIcon className={`text-xl md:text-2xl ${theme.primaryColor2} hover:text-[#FDBE49]`} />
                    </Link>
                </div>
                <button className={`hidden md:flex ${isScrolled ? `${theme.primaryColor}` : `${theme.primaryColor}`
                    } text-white px-4 md:px-6 justify-center items-center py-2 rounded-full ${theme.btnHover}  text-sm md:text-base`}
                    type="button">
                    <span className="text-xl md:text-2xl font-extrabold mr-1">+</span> Post your add
                </button>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-2xl focus:outline-none"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <IoMdClose className={isScrolled ? 'text-black' : 'text-white'} />
                    ) : (
                        <IoMdMenu className={isScrolled ? 'text-black' : 'text-white'} />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 right-0 bg-blue-900 z-50 shadow-lg transition-all duration-300 ease-in-out">
                    <ul className="py-4 px-6">
                        {navItems.map((item, index) => (
                            <li key={index} className="mb-2">
                                <div
                                    className="flex justify-between items-center py-2 cursor-pointer transition-colors duration-200 hover:bg-blue-800 px-2 rounded"
                                    onClick={() => item.subItems && toggleSubmenu(index)}
                                >
                                    <span className="text-white">{item.title}</span>
                                    {item.subItems && (
                                        <span className="text-white">
                                            {activeSubmenu === index ? '-' : '+'}
                                        </span>
                                    )}
                                </div>

                                {activeSubmenu === index && item.subItems && (
                                    <ul className="ml-4 mt-2 bg-blue-800 rounded-lg p-2 transition-all duration-300 ease-in-out">
                                        {item.subItems.map((subItem, subIndex) => (
                                            typeof subItem === 'string' ? (
                                                <li
                                                    key={subIndex}
                                                    className="py-2 px-3 text-white transition-colors duration-200 hover:bg-blue-700 rounded"
                                                >
                                                    <Link to="#" className="block w-full">{subItem}</Link>
                                                </li>
                                            ) : (
                                                <li
                                                    key={subIndex}
                                                    className="py-2 transition-all duration-200"
                                                >
                                                    <div
                                                        className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-blue-700 rounded transition-colors duration-200"
                                                        onClick={() => toggleNestedMenu(subIndex)}
                                                    >
                                                        <span className="text-white">{subItem.title}</span>
                                                        <span className="text-white">
                                                            {activeNestedMenu === subIndex ? '-' : '+'}
                                                        </span>
                                                    </div>
                                                    {activeNestedMenu === subIndex && (
                                                        <ul className="ml-4 mt-2 bg-blue-700 rounded-lg p-2 transition-all duration-300 ease-in-out">
                                                            {subItem.nestedItems.map((nestedItem, nestedIndex) => (
                                                                <li
                                                                    key={nestedIndex}
                                                                    className="py-2 px-3 text-white transition-colors duration-200 hover:bg-blue-600 rounded"
                                                                >
                                                                    <Link to="#" className="block w-full">{nestedItem}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile-only buttons */}
                    <div className="flex justify-around items-center p-4 border-t border-blue-800">
                        <IoChatbubblesOutline className={`text-2xl ${theme.primaryColor2}`} />
                        <PersonOutlineOutlinedIcon className={`text-2xl ${theme.primaryColor2}`} />
                        <button
                            className="bg-[#003f73] text-white px-6 flex justify-center items-center py-2 rounded-full hover:text-slate-400 hover:bg-blue-800"
                            type="button"
                        >
                            <span className="text-2xl font-extrabold mr-1">+</span> Post your add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
import React, { useContext, useState } from 'react'
import { Context } from '../../../Context/ContextProvider'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormatTextdirectionRToLIcon from '@mui/icons-material/FormatTextdirectionRToL';
import LocationModal from './LocationModel';
import CategoryModel from './CategoryModel';

export default function SearchFilter({isHome}) {
    const { theme } = useContext(Context)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("Select Location");
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Select Category");

    const handleLocationClick = () => {
        setIsModalOpen(true);
    };
    const handleCategoryClick = () => {
        setIsCategoryModalOpen(true);
    };


    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
    };
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsCategoryModalOpen(false);
    };

    return (
        <>
            <div className={`w-[97%] md:w-[95%] ${isHome?"shadow-sm":"shadow-none"}  flex ${isHome? `${theme.formBg}`:"bg-white/10 "} backdrop-blur-x justify-center items-center rounded h-auto md:h-[110px] ${theme.iconGrayColor}`}>
                <form action="" method="get" className={`h-full md:h-[50%] flex ${isHome?"border border-slate-200":"border-0"}  justify-between md:flex-row items-center ${theme.formBg} rounded w-full md:w-[95%] overflow-hidden`}>
                    <div className='flex w-[100%] justify-between px-1'>
                        <div
                            onClick={handleLocationClick}
                            className={`w-[25%] flex items-center border-b md:border-b-0 md:border-r ${theme.formBorder} px-3 h-12 md:h-[100%]`}
                        >
                            <LocationOnIcon fontSize="16px" className={`mr-2`} />
                            <h3 className='w-full outline-none bg-transparent text-sm truncate'>
                                {selectedDistrict}
                            </h3>
                        </div>

                        <div onClick={handleCategoryClick} className={`w-[25%] flex items-center gap-2 border-b md:border-b-0 md:border-r ${theme.formBorder} px-3 h-12 md:h-[100%]`}>
                            <LocalOfferIcon fontSize="16px" />
                            <h3 className='w-full outline-none bg-transparent text-sm'>{selectedCategory}</h3>
                        </div>

                        <div className={`w-[25%] flex items-center gap-2 border-b md:border-b-0 md:border-r ${theme.formBorder} px-3 h-12 md:h-[100%]`}>
                            <ListOutlinedIcon fontSize="small" />
                            <select className='w-full outline-none bg-transparent text-sm'>
                                <option value="">Select Type</option>
                                <option value="">Buy</option>
                                <option value="">Sell</option>
                                <option value="">Rent</option>
                                <option value="">To-Let</option>
                                <option value="">Houses</option>
                                <option value="">Hotels</option>
                                <option value="">local-services</option>
                            </select>
                        </div>

                        <div className={`w-[25%] flex items-center gap-2 border-b md:border-b-0 ${theme.formBorder} px-3 h-12 md:h-[100%]`}>
                            <FormatTextdirectionRToLIcon fontSize="16px" />
                            <input
                                type="text"
                                placeholder="Enter Keyword here ..."
                                className='w-full outline-none bg-transparent text-sm'
                            />
                        </div>
                    </div>

                    <div className={`${theme.primaryColor} ${theme.btnHover} text-white`}>
                        <div className='flex justify-center h-12 md:h-[100%] font-semibold'>
                            <button
                                type="submit"
                                className={`md:w-auto px-2 md:px-10 py-2 md:py-5 flex items-center justify-center gap-2 lg:text-2xl h-full text-sm`}
                            >
                                <span className='text-[17px]'><SearchOutlinedIcon /></span>
                                <span className='text-[17px]'>Search</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <LocationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleDistrictSelect}
            />
            {isCategoryModalOpen && (
                <div className="fixed inset-0 w-full pt-9 bg-blue-50/70  dark:bg-slate-900/80 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md mx-4 max-h-[80vh] border border-gray-200 dark:border-slate-300 overflow-y-auto shadow-xl">
                        <CategoryModel
                            onSelect={handleCategorySelect} onClose={() => setIsCategoryModalOpen(false)}/>
                    </div>
                </div>
            )}
        </>
    )
}
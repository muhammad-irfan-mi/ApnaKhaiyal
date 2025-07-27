import React, { useContext, useEffect, useState } from 'react';
import presentedtBy from '../../../assets/images/recentadds/presentedBy.jpeg';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import axios from 'axios';
import { formatTimeAgo } from '../../../utils/formatTimeAgo';
import PropertyModal from '../../../component/modal/property/PropertyModal';
import { Context } from '../../../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

function AllPropertiesCard({ filters }) {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { userInfo } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [property, setProperty] = useState([]);
    const navigate = useNavigate();

    const handleZoomClick = async (property) => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/property/${property._id}/view`, {
                userId: userInfo?._id || null,
            });
            setSelectedProperty(property);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Failed to increment view:', error);
        }
    };

    const handleViewProperty = (id) => {
        if (!id) return;
        navigate('/listing/singleProperty', { state: { propertyId: id } });
    };

    const matchesFilters = (prop) => {
        const typeMatch = !filters.type || prop.adType?.toLowerCase() === filters.type;
        const categoryMatch = !filters.category || prop.category?.toLowerCase() === filters.category;
        const provinceMatch = !filters.province || prop.contact?.state?.toLowerCase() === filters.province.toLowerCase();
        const cityMatch = !filters.city || prop.contact?.city?.toLowerCase() === filters.city.toLowerCase();
        const locationMatch = !filters.location || prop.contact?.address?.toLowerCase() === filters.location.toLowerCase();

        const price = Array.isArray(prop.price) ? prop.price[0] : prop.price;
        const minPriceMatch = !filters.minPrice || price >= filters.minPrice;
        const maxPriceMatch = !filters.maxPrice || price <= filters.maxPrice;

        const ratingMatch = !filters.rating || prop.rating >= filters.rating;

        return typeMatch && categoryMatch && provinceMatch && cityMatch && locationMatch && minPriceMatch && maxPriceMatch && ratingMatch;
    };

    const filteredProperties = property.filter(matchesFilters);

    useEffect(() => {
        const getPropertyData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/property/`);
                if (response.status === 200) {
                    setProperty(response.data);
                } else {
                    alert("No data found");
                }
            } catch (error) {
                console.error("Error fetching property data:", error);
            }
        };
        getPropertyData();
    }, []);

    console.log('property:', property);
    console.log('filters', filters);
    return (
        <div className=''>
            <div className='flex justify-between items-center bg-white shadow-lg rounded-lg capitalize px-7 py-2 mb-6'>
                <h2 className='text-md font-bold text-gray-800'>
                    Showing {filteredProperties.length} result{filteredProperties.length !== 1 && 's'}
                </h2>
                <div className='w-[35%] h-[45px] flex items-center'>
                    <select className='h-[60%] border border-slate-600 rounded-[2px] focus:border-slate-300 cursor-pointer'>
                        <option value="">Select option</option>
                        <option value="">A to Z title</option>
                        <option value="">Z to A title</option>
                        <option value="">Recently Added (latest)</option>
                        <option value="">Data Added (oldest)</option>
                        <option value="">Most Views</option>
                        <option value="">Less Views</option>
                        <option value="">Price (Low to high)</option>
                        <option value="">Price (high to low)</option>
                    </select>
                    <FormatListBulletedIcon className='text-slate-500 mx-2' />
                    <GridViewIcon className='text-slate-500' />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => {
                    const isNew = (new Date() - new Date(property.createdAt)) / (1000 * 60 * 60 * 24) <= 7;
                    const locationDisplay = `${property.contact?.state || ''}, ${property.contact?.address || ''}`;
                    const priceDisplay = Array.isArray(property.price) ? `Rs ${property.price.join(' - Rs ')}` : `Rs ${property.price}`;

                    return (
                        <div key={property._id} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={Array.isArray(property.images) && property.images[0] ? property.images[0] : presentedtBy}
                                    alt={property.title || 'Property'}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onClick={() => handleViewProperty(property._id)}
                                />
                                {property.adType === 'sell' && (
                                    <div className="absolute top-3 left-0 bg-[#0b2a53] text-white px-3 py-1 font-bold text-sm after:content-[''] after:absolute after:top-0 after:right-[-12px] after:border-y-[16px] after:border-l-[12px] after:border-y-transparent after:border-l-[#0b2a53]">
                                        For Sale
                                    </div>
                                )}
                                <div
                                    className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-0"
                                    onClick={() => handleViewProperty(property._id)}
                                ></div>

                                <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {/* <button className="bg-white px-2 rounded-md shadow hover:text-white hover:bg-blue-950">
                                        <FavoriteBorderOutlinedIcon fontSize="small" />
                                    </button> */}
                                    <button
                                        className="bg-white p-2 rounded-md shadow hover:bg-blue-950 hover:text-white"
                                        onClick={() => handleZoomClick(property)}
                                    >
                                        <ZoomInOutlinedIcon fontSize="small" />
                                    </button>
                                    <button className="bg-white p-2 rounded-md shadow hover:text-white hover:bg-blue-950">
                                        <CompareArrowsOutlinedIcon fontSize="small" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                {isNew && (
                                    <div className="bg-red-600 w-fit text-sm p-1 rounded capitalize text-white">
                                        new
                                    </div>
                                )}
                                <h3
                                    className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2 hover:text-blue-950 my-2 hover:underline cursor-pointer"
                                    onClick={() => handleViewProperty(property._id)}
                                >
                                    {property.title || 'Untitled Property'}
                                </h3>

                                <div className="flex items-center text-gray-500 text-sm mt-2">
                                    <AccessTimeOutlinedIcon fontSize="small" className="mr-1" />
                                    <span>{formatTimeAgo(property.createdAt)}</span>
                                </div>

                                <div className="flex my-2 items-center text-gray-500 text-sm">
                                    <LocationOnOutlinedIcon fontSize="small" className="mr-1" />
                                    <span>{locationDisplay}</span>
                                </div>

                                <div className="flex items-center text-gray-500 text-sm mt-1">
                                    <VisibilityOutlinedIcon style={{ fontSize: '19px' }} className="mr-1" />
                                    <span>{property.views} Views</span>
                                </div>

                                <div className="font-bold text-blue-900 mt-2">
                                    {priceDisplay}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <PropertyModal
                property={selectedProperty}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default AllPropertiesCard;

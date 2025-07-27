import React, { useContext, useEffect, useState } from 'react';
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    Chat as ChatIcon,
    LocationOn as LocationOnIcon,
    ChevronLeft,
    ChevronRight
} from '@mui/icons-material';
import Banner from '../../../component/Banner/Banner';
import { Context } from '../../../Context/ContextProvider';
import PropertyMap from '../../../component/map/PropertyMap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../component/global/Loader';

const SingleProperty = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { theme } = useContext(Context);
    const [property, setProperty] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const propertyId = location?.state?.propertyId;

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    const showSliderControls = mediaItems.length > 1;

    useEffect(() => {
        const getPropertyData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/property/${propertyId}`);
                const data = response.data;

                if (!data) {
                    throw new Error('Property not found');
                }

                setProperty(data);

                const images = Array.isArray(data.images) ? data.images : [];
                const video = data.videoURL
                    ? [{ type: 'video', src: data.videoURL.replace("watch?v=", "embed/") }]
                    : [];
                const formattedImages = images.map((src) => ({ type: 'image', src }));
                setMediaItems([...video, ...formattedImages]);
            } catch (err) {
                console.error('Error fetching property:', err);
                setError('Failed to load property');
            } finally {
                setLoading(false);
            }
        };

        if (!propertyId) {
            navigate('/listing');
        } else {
            getPropertyData();
        }
    }, [propertyId, navigate]);

    if (loading) return <Loader />;
    // if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;
    // if (!property) return null;

    return (
        <div className="bg-[#f5f7fa]">
            <Banner title="Property Details" />
            <div className="w-[80%] mx-auto p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
                    {/* Left Side - Media & Description */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <div className="bg-white rounded shadow p-4 relative">
                            <div className="w-full aspect-video mb-4 relative overflow-hidden group">
                                {mediaItems.length > 0 && mediaItems[activeIndex]?.type === 'video' ? (
                                    <iframe
                                        className="w-full h-full rounded"
                                        src={mediaItems[activeIndex].src}
                                        title="Property Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : mediaItems.length > 0 ? (
                                    <img
                                        src={mediaItems[activeIndex].src}
                                        alt={`Slide ${activeIndex}`}
                                        className="w-full h-full object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-full h-full flex justify-center items-center bg-gray-200 text-gray-500">
                                        No media available
                                    </div>
                                )}

                                {showSliderControls && (
                                    <div className="absolute px-2 w-full top-1/2 flex justify-between items-center">
                                        <button
                                            onClick={prev}
                                            className={`${theme.primaryColor} h-8 w-8 hidden group-hover:flex justify-center items-center bg-opacity-40 text-white p-2 hover:bg-opacity-70`}
                                        >
                                            <ChevronLeft />
                                        </button>
                                        <button
                                            onClick={next}
                                            className={`${theme.primaryColor} h-8 w-8 hidden group-hover:flex justify-center items-center bg-opacity-40 text-white p-2 hover:bg-opacity-70`}
                                        >
                                            <ChevronRight />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            <div className="flex overflow-x-auto gap-2 hide-scrollbar">
                                {mediaItems.length > 0 &&
                                    mediaItems.map((item, index) => (
                                        <img
                                            key={index}
                                            src={
                                                item.type === 'video'
                                                    ? `https://img.youtube.com/vi/${property.videoURL?.split("v=")[1]}/0.jpg`
                                                    : item.src
                                            }
                                            onClick={() => setActiveIndex(index)}
                                            className={`h-20 w-28 object-cover rounded cursor-pointer transition border-2 ${index === activeIndex ? 'border-blue-500' : 'border-transparent'
                                                }`}
                                            alt={`Thumbnail ${index + 1}`}
                                        />
                                    ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">{property.title}</h2>
                            <p className="text-gray-700">{property.description}</p>
                            {property.features?.length > 0 && (
                                <ul className="list-disc mt-4 ml-6 text-gray-700">
                                    {property?.features?.length > 0 ? (
                                        property.features
                                            .flatMap(f => f.replace(/\\n/g, '\n').split('\n'))
                                            .map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))
                                    ) : (
                                        <li>No features listed</li>
                                    )}
                                </ul>
                            )}
                            <div className="mt-4 text-blue-900 font-bold text-lg">
                                {Array.isArray(property.price)
                                    ? `PKR ${property.price[0]} - ${property.price[1]}`
                                    : `PKR ${property.price}`}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Owner Info */}
                    <div className="bg-white rounded shadow h-fit pb-5">
                        <h1 className={`font-semibold text-2xl ${theme.primaryColor2} mb-2 border-b p-3`}>
                            Contact Information
                        </h1>

                        {property.contact && (
                            <div className="space-y-4 px-4 py-2 text-sm font-normal text-gray-700">
                                <div className="flex items-start space-x-2">
                                    <LocationOnIcon fontSize="small" />
                                    <span>{property.contact.address}, {property.contact.state} - {property.contact.zip}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <PhoneIcon fontSize="small" />
                                    <span>{property.contact.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <EmailIcon fontSize="small" />
                                    <span>{property.contact.email.slice(0, 20) + '...'}</span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 px-4 mt-5">
                            <button className={`${theme.primaryColor} ${theme.btnHover} w-full text-white px-4 py-2 rounded`}>
                                <ChatIcon fontSize="small" className="mr-1" /> Chat
                            </button>
                            <button className={`${theme.primaryColor} ${theme.btnHover} w-full text-white px-4 py-2 rounded`}>
                                Email Owner
                            </button>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                {property.lat && property.lng && (
                    <div className="mt-6 bg-white rounded shadow-full w-[75%]">
                        <h1 className={`font-semibold text-2xl ${theme.primaryColor2} mb-2 border-b p-3 px-6`}>
                            Location
                        </h1>
                        <div className='p-6'>
                            <PropertyMap lat={property.lat} lng={property.lng} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleProperty;

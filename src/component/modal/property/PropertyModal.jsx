import React, { useState, useMemo, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import Loader from '../../global/Loader';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { formatTimeAgo } from '../../../utils/formatTimeAgo';
import { Context } from '../../../Context/ContextProvider';


Modal.setAppElement('#root');

const PropertyModal = ({ property, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mediaLoading, setMediaLoading] = useState(true);
    const { theme } = useContext(Context)

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    const locationDisplay = useMemo(() => {
        const { contact } = property || {};
        const parts = [];
        if (contact?.address) parts.push(contact.address);
        if (contact?.state) parts.push(contact.state);
        return parts.join(', ');
    }, [property]);

    // const priceDisplay = useMemo(() => {
    //     if (!property?.price) return 'N/A';
    //     if (Array.isArray(property.price)) {
    //         return `Rs ${property.price.join(' - Rs ')}`;
    //     }
    //     return `Rs ${property.price}`;
    // }, [property?.price]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: { autoplay: 0 },
    };

    const extractVideoId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = useMemo(() => extractVideoId(property?.videoURL), [property?.videoURL]);

    const totalItems = useMemo(() => {
        return (property?.images?.length || 0) + (videoId ? 1 : 0);
    }, [property?.images, videoId]);

    const getYouTubeThumbnail = (id, quality = 'mqdefault') => {
        return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
        setMediaLoading(true);
    };

    const getCurrentMedia = () => {
        if (currentImageIndex === 0 && videoId) {
            return (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                    {mediaLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-60">
                            <Loader />
                        </div>
                    )}
                    <YouTube
                        videoId={videoId}
                        opts={opts}
                        className="w-full h-full z-0"
                        onReady={() => setMediaLoading(false)}
                        onError={() => setMediaLoading(false)}
                    />
                </div>
            );
        }

        const imageIndex = currentImageIndex - (videoId ? 1 : 0);
        const imageUrl = property?.images?.[imageIndex] || 'https://via.placeholder.com/800x500?text=Image+Not+Available';

        return (
            <div className="relative w-full h-full">
                {mediaLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
                        <Loader />
                    </div>
                )}
                <img
                    src={imageUrl}
                    alt={`Property ${currentImageIndex}`}
                    className="w-full h-full object-cover"
                    onLoad={() => setMediaLoading(false)}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
                        setMediaLoading(false);
                    }}
                />
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            className="relative w-full max-w-4xl max-h-[90vh] border-gray-200 border-t-4 bg-white rounded-lg shadow-2xl overflow-y-auto flex flex-col outline-none"
            overlayClassName="fixed inset-0 bg-opacity-70 backdrop-blur-[2px] flex items-center justify-center z-[99]"
        >
            <div className="absolute right-0 flex justify-between items-center h-7 w-7 border rounded-full text-gray-600  hover:text-gray-700"
                onClick={onClose}
            >
                <CloseOutlinedIcon />
            </div>

            <div className="flex flex-col md:flex-row mt-10 gap-8 p-4 overflow-y-auto">
                <div className="w-full md:w-1/2">
                    <div className="relative h-64 bg-gray-200 mb-4 rounded-lg overflow-hidden">
                        {getCurrentMedia()}
                    </div>

                    {totalItems > 1 && (
                        <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
                            {videoId && (
                                <button
                                    onClick={() => handleThumbnailClick(0)}
                                    className={`flex-shrink-0 w-20 h-16 rounded transition-opacity ${currentImageIndex === 0 ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
                                    aria-label="View video"
                                >
                                    <div className="relative w-full h-full flex items-center justify-center rounded overflow-hidden">
                                        <img
                                            src={getYouTubeThumbnail(videoId)}
                                            alt="Video thumbnail"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/200?text=Video+Thumbnail';
                                            }}
                                        />
                                        <svg className="relative z-10 w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </button>
                            )}

                            {property?.images?.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleThumbnailClick(index + (videoId ? 1 : 0))}
                                    className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden transition-opacity ${currentImageIndex === index + (videoId ? 1 : 0) ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
                                    aria-label={`View image ${index + 1}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/200?text=Image+Error';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold">{property?.title || 'Property Details'}</h2>

                    <div>
                        <ul className="mt-2 flex flex-wrap gap-3 text-gray-600 font-normal text-md">
                            <li className='flex items-center'><AccessTimeOutlinedIcon fontSize="15px" className="mr-1" />{formatTimeAgo(property?.createdAt) || 'N/A'}</li>
                            <li className='flex items-center'><LocalOfferOutlinedIcon fontSize="small" className="mr-1" />{property?.adType || 'N/A'}</li>
                            <li className='flex items-center'><LocationOnOutlinedIcon fontSize="small" className="mr-1" />{locationDisplay || 'N/A'}</li>
                            <li className='flex items-center'><RemoveRedEyeOutlinedIcon fontSize="15px" className="mr-1" />{property?.views || 0} Views</li>
                            {property?.contact?.phone && (
                                <li className='flex items-center'><WifiCalling3OutlinedIcon fontSize="15px" className="mr-1" /> {property.contact.phone}</li>
                            )}
                        </ul>
                    </div>
                    <div className='mt-3 font-normal'>
                        <h4 className="font-medium text-lg">Features</h4>
                        <ul className="mt-2 space-y-1 text-gray-600">
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
                    </div>
                    <p className="text-gray-600 font-normal mt-3">{property?.description || 'No description available.'}</p>
                </div>
            </div>

            <div className="p-4 border-t flex justify-end">
                <button
                    onClick={onClose}
                    className={`px-4 py-2 ${theme.primaryColor} ${theme.btnHover} text-white rounded transition focus:outline-none`}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default PropertyModal;

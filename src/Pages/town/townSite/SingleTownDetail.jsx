import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../../component/Banner/Banner';
import { Context } from '../../../Context/ContextProvider';
import PLotStatusforAdmin from '../../../component/modal/townplot/PLotStatusforAdmin';
import PLotStatusforUser from '../../../component/modal/townplot/PlotStatusforUser';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import townmap from '../../../assets/images/townmap.jfif';

const SingleTownDetail = () => {
    const [town, setTown] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [plotInfo, setPlotInfo] = useState([]);
    const [plotNumberId, setPlotNumberId] = useState('');
    const [plotStatusModal, setPlotStatusModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const location = useLocation();
    const { townId } = location.state || {};
    const { theme, userInfo } = useContext(Context)

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const userId = town?.userId

    useEffect(() => {
        if (!townId) return;

        const getTown = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/town/${townId}`);
                console.log('Fetched town:', response.data.town);
                setTown(response.data.town);
            } catch (error) {
                console.error('Error fetching town data:', error);
            }
        };

        getTown();
    }, [townId]);

    const handlePlotStatus = (plotId, plotInfo) => {
        if (userInfo._id == userId) {
            setIsAdmin(true)
        }
        setPlotNumberId(plotId)
        setPlotStatusModal(true);
        setPlotInfo(plotInfo)
    }

    console.log(town, 'town data');
    if (!town) return <p className="text-center text-gray-500">Loading town details...</p>;

    return (
        <>
            <Banner title={'Town Detail'} />
            <div className={`p-6 ${theme.mainbg} rounded-xl shadow-lg space-y-6 relative`}>
                <div className='w-[90%] mx-auto flex flex-col lg:flex-row justify-between gap-8'>
                    <div className='lg:w-[70%] w-full'>
                        <img src={townmap} alt="Town Main" className="w-full max-h-[420px] object-cover rounded-lg shadow-md" />
                        {/* <img src={town?.location} alt="Town Main" className="w-full max-h-[420px] object-cover rounded-lg shadow-md" /> */}
                    </div>
                    <div className='lg:w-[30%] w-full space-y-4'>
                        <h2 className={`text-3xl font-bold ${theme.primaryColor2}`}>{town?.name}</h2>
                        <div className="flex items-start text-gray-600 gap-2">
                            <LocationOnIcon sx={{ color: "#FDBE49" }} />
                            <span className="text-sm">{town?.address}, {town?.city}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-6">{town?.desc}</p>
                        <p className="text-sm text-gray-500 font-medium">Total Area: {town?.area}</p>
                    </div>
                </div>




                {/* Phases */}
                {Array.isArray(town?.phases) && town.phases.length > 0 && (
                    <div className="w-[90%] mx-auto space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Phases</h3>
                        {town.phases.map((phase, i) => {
                            const totalPlots = phase.plots.reduce((sum, p) => sum + p.quantity, 0);
                            const totalShops = phase.shops.reduce((sum, p) => sum + p.quantity, 0);
                            return (
                                <div key={i} className="bg-gray-100 rounded-xl p-4 shadow">
                                    {/* <h4 className="text-md font-bold text-3xl mb-2"> {phase.name} </h4> */}

                                    <div className='flex flex-col md:flex-row justify-between gap-6'>
                                        {/* Video */}
                                        {phase.video && (
                                            <div className="md:w-1/2 w-full">
                                                <video controls className="rounded-md w-full h-[300px] object-cover shadow-lg">
                                                    <source src={phase.video} type="video/webm" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        )}

                                        {/* Image Gallery */}
                                        {phase.images?.length > 0 && (
                                            <div className="md:w-1/2 w-full flex flex-col gap-4">
                                                <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
                                                    <img
                                                        src={selectedImage?.path || phase.images[0].path}
                                                        alt="Main Display"
                                                        className="w-full h-full object-cover transition-all duration-300"
                                                    />
                                                </div>
                                                <Slider
                                                    dots={false}
                                                    infinite
                                                    speed={500}
                                                    slidesToShow={phase.images.length > 4 ? 4 : phase.images.length}
                                                    slidesToScroll={1}
                                                    arrows
                                                    className="w-full"
                                                >
                                                    {phase.images.map((img) => (
                                                        <div key={img._id} className="px-1">
                                                            <img
                                                                src={img.path}
                                                                alt="Thumbnail"
                                                                onClick={() => setSelectedImage(img)}
                                                                className={`w-32 h-16 object-cover rounded-md border-2 cursor-pointer mx-auto ${selectedImage?.path === img.path ? 'border-blue-500' : 'border-gray-300'}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </Slider>
                                            </div>
                                        )}
                                    </div>


                                    <div className='flex justify-between items-center mt-4 gap-5'>
                                        <div className="mt-3 flex flex-wrap gap-4">
                                            <h4 className="text-md font-bold mt-5"> Residential Plots: {totalPlots || 0}</h4>
                                            {phase.plots.map((plot, j) => (
                                                <div
                                                    key={j}
                                                    className="border border-gray-300 p-4 rounded-lg shadow-md bg-white w-full"
                                                >
                                                    <p className="font-semibold mb-2">Marla: {plot.marla}</p>

                                                    <div className="flex flex-wrap gap-4">
                                                        {plot.plotNumbers.map((plotNumObj, idx) => {
                                                            const isPending = plotNumObj.status?.toLowerCase() === 'pending';
                                                            return (
                                                                <div
                                                                    className={`rounded-md px-4 py-3 text-white text-sm shadow-md cursor-pointer border border-transparent hover:scale-105 transition-transform duration-300 ease-in-out ${isPending ? 'bg-green-600' : 'bg-red-600'}`}
                                                                    onClick={() => handlePlotStatus(plotNumObj._id, plotNumObj)}
                                                                >
                                                                    <p className="font-semibold">Plot No: {plotNumObj.number}</p>
                                                                    <p className="text-xs">{plotNumObj.status === 'pending' ? 'Available' : 'Sold'}</p>
                                                                </div>

                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-4">
                                            <h4 className="text-md font-bold m-2"> Commercial Shops: {totalShops || 0}</h4>
                                            {phase.shops.map((shop, j) => (
                                                <div
                                                    key={j}
                                                    className="border border-gray-300 p-4 rounded-lg shadow-md bg-white w-full"
                                                >
                                                    <p className="font-semibold mb-2">Marla: {shop.marla}</p>

                                                    <div className="flex flex-wrap gap-4">
                                                        {shop.shopNumbers.map((shopNumObj, idx) => {
                                                            const isPending = shopNumObj.status?.toLowerCase() === 'pending';
                                                            return (
                                                                <div
                                                                    className={`rounded-md px-4 py-3 text-white text-sm shadow-md cursor-pointer border border-transparent hover:scale-105 transition-transform duration-300 ease-in-out ${isPending ? 'bg-green-600' : 'bg-red-600'}`}
                                                                    onClick={() => handlePlotStatus(shopNumObj._id, shopNumObj)}
                                                                >
                                                                    <p className="font-semibold">Shop No: {shopNumObj.number}</p>
                                                                    <p className="text-xs">{shopNumObj.status === 'pending' ? 'Available' : 'Sold'}</p>
                                                                </div>

                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

                <div className='w-[90%] mx-auto mt-10'>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Town Documents</h3>
                    <div className='flex gap-4 flex-wrap'>
                        {town?.noc && (
                            <a href={town.noc} target="_blank" rel="noreferrer" className="bg-white px-4 py-2 border rounded shadow hover:bg-blue-50 text-blue-600">
                                NOC Document
                            </a>
                        )}
                        {town?.documents?.map((doc, idx) => (
                            <a key={idx} href={doc} target="_blank" rel="noreferrer" className="bg-white px-4 py-2 border rounded shadow hover:bg-blue-50 text-blue-500">
                                Other Document {idx + 1}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
            {isAdmin ?
                <PLotStatusforAdmin
                    open={plotStatusModal}
                    onClose={() => setPlotStatusModal(false)}
                    plotNumberId={plotNumberId}
                    plotInfo={plotInfo}
                /> :
                <PLotStatusforUser
                    open={plotStatusModal}
                    onClose={() => setPlotStatusModal(false)}
                    plotInfo={plotInfo}
                />
            }

        </>
    );
};

export default SingleTownDetail;

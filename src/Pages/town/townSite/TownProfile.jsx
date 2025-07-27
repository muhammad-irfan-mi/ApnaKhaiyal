import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../../component/Banner/Banner';
import img from '../../../assets/images/Premium/bukhari.jpeg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../Context/ContextProvider';


function TownProfile() {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('Town Owner');
    const [townOwners, setTownOwners] = useState([]);
    const navigate = useNavigate();
    const { theme } = useContext(Context);

    const BASE_URL = import.meta.env.VITE_BASE_URL;


    const handleSearch = () => {
        console.log('Searching for:', keyword, category);
    };
    useEffect(() => {
        const getTownOwners = async () => {
            const response = await axios.get(`${BASE_URL}/api/user/get-all-town-owner/`);
            console.log('Fetched town owners:', response);
            setTownOwners(response.data);
        }
        getTownOwners();
    }, []);

    return (
        <>
            <Banner title='Town Owner' />
            <div className={`${theme.mainbg} min-h-screen p-6`}>

                <div className='flex justify-between gap-3 mt-5'>
                    {/* Profile Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" onClick={() => navigate('/profile/town-owner')}>
                        {townOwners.map((town, index) => (
                            <div
                                key={index}
                                className={`rounded-md shadow-md overflow-hidden`}
                            >
                                <img
                                    src={town.img}
                                    alt={town.name}
                                    className="w-full h-32 object-contain bg-white p-2"
                                />
                                <div className="p-3">
                                    <h2 className="font-semibold text-lg">{town.name}</h2>
                                    {/* <p className="text-sm mt-1">{profile.ad ? 'Ad Sponsored' : 'No ad'}</p> */}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='w-[20%] bg-white p-5 h-[1%]'>
                        <h2 className="text-xl font-semibold mb-4">Search Profiles</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter your keyword here ..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select a category</option>
                                <option value="town-owner">Town Owner</option>
                            </select>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                            Search Profile
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}


export default TownProfile;
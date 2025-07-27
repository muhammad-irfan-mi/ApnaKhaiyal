import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Loader } from 'lucide-react';
import TownCard from '../TownList/TownCard';
import Banner from '../../../component/Banner/Banner';
import { Context } from '../../../Context/ContextProvider';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const TownListMain = () => {
    const [towns, setTowns] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('Town Owner');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme, userInfo } = useContext(Context)

    const id = userInfo?._id
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [topCities, setTopCities] = useState([]);
    const [fetched, setFetched] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/city/`);
                setTopCities(response.data);
                setFetched(true);
            } catch (error) {
                console.error('Error fetching top cities:', error);
            }
        };

        if (inView && !fetched) {
            getCities();
        }
    }, [inView, fetched, BASE_URL]);

    useEffect(() => {
        const getTowns = async () => {
            try {
                setLoading(true);
                // const response = await axios.get(`${BASE_URL}/api/town/by-user/${id}`);
                const response = await axios.get(`${BASE_URL}/api/town/all`);
                setTowns(response.data.towns);
            } catch (err) {
                console.error('Error fetching towns:', err);
                setError('Failed to load towns. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        getTowns();
    }, [id]);

    const handleSearch = () => {
        console.log('Searching for:', keyword, category);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <Loader className="w-10 h-10 text-blue-800 animate-spin" />
                    <p className="mt-4 text-gray-600">Loading towns...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (towns.length === 0) {
        return (
            <div>
                <Banner title='Town Directory' />
                <div className={`text-center ${theme.mainbg} py-16 rounded-lg border border-gray-200`}>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Towns Found</h2>
                    <p className="text-gray-600 mb-6">There are no towns in the system yet.</p>
                    <a
                        href="/add-town"
                        className="inline-block px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
                    >
                        Add Your First Town
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <Banner title='Town Directory' />
            <div ref={ref} className={`${theme.mainbg} space-y-8 p-10`}>
                {/* Top Search Bar */}
                <div className="flex flex-col md:flex-row items-center gap-4 my-10">
                    <input
                        type="text"
                        placeholder="Enter Town Name"
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option >City</option>
                        {topCities.map(city => (
                            <option key={city._id} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {towns.map(town => (
                        <TownCard key={town.id} town={town} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TownListMain;
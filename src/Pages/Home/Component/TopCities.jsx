import React, { useEffect, useState } from 'react';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

function TopCities() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [topCities, setTopCities] = useState([]);
    const [fetched, setFetched] = useState(false);
    const navigate = useNavigate();

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

    const handleAllCities = () => {
        navigate('/all-cities');
    }

    return (
        <div ref={ref} className=" relative top-68 bg-[#FFFFFF] w-[90%] mx-auto">
            <div>
                <div className="flex justify-between px-3">
                    <div>
                        <h2 className="text-[#2D2D2D] font-[700] text-3xl">Browse Top Cities</h2>
                        <div className="h-1 w-[50px] mt-3 bg-blue-950"></div>
                    </div>
                    <div>
                        <button className="border border-slate-400 p-1 rounded capitalize" onClick={handleAllCities}>
                            view all cities <EastOutlinedIcon className="text-[#002456]" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-5 justify-center my-10">
                {topCities.slice(0, 9).map((city, index) => (
                <div
                    key={index}
                    className="w-full sm:w-1/2 md:w-[32%] capitalize relative overflow-hidden rounded-2xl shadow group"
                >
                    <img
                        src={city.images[0]}
                        alt={city.name}
                        className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute bottom-0 left-0 w-full h-[50%] group-hover:h-[80%] bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-blue-950/100 group-hover:via-blue-950/60 group-hover:to-transparent transition-all duration-500 ease-in-out pointer-events-none"></div>

                    <div className="absolute bottom-4 left-4 text-white z-10">
                        <span className="block font-semibold">{city.name}</span>
                        <span className="block">0</span>
                    </div>
                </div>
        ))}
            </div>
        </div>
    );
}

export default TopCities;

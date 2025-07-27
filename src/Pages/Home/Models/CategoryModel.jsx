import React from 'react';

// Icons
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const categories = [
    "Agricultural Land",
    "Apartment",
    "Architecture Engineer",
    "Boys Hostel",
    "Girls Hostel",
    "Home Developer",
    "Home Inspector",
    "Hotels",
    "Houses",
    "Map officer",
    "Plot",
    "Real Estate Photographers",
    "Shops",
    "Town"
];

// Map each category to a specific icon component
const iconMap = {
    "Agricultural Land": <AgricultureIcon fontSize="small" className="text-green-600" />,
    "Apartment": <ApartmentIcon fontSize="small" className="text-blue-600" />,
    "Architecture Engineer": <DesignServicesIcon fontSize="small" className="text-purple-600" />,
    "Boys Hostel": <MaleIcon fontSize="small" className="text-blue-500" />,
    "Girls Hostel": <FemaleIcon fontSize="small" className="text-pink-500" />,
    "Home Developer": <HomeWorkIcon fontSize="small" className="text-orange-600" />,
    "Home Inspector": <FactCheckIcon fontSize="small" className="text-gray-700" />,
    "Hotels": <HotelIcon fontSize="small" className="text-red-500" />,
    "Houses": <HouseIcon fontSize="small" className="text-yellow-600" />,
    "Map officer": <MapIcon fontSize="small" className="text-teal-600" />,
    "Plot": <CropLandscapeIcon fontSize="small" className="text-indigo-600" />,
    "Real Estate Photographers": <CameraAltIcon fontSize="small" className="text-gray-600" />,
    "Shops": <StorefrontIcon fontSize="small" className="text-rose-600" />,
    "Town": <LocationCityIcon fontSize="small" className="text-cyan-700" />
};
export default function CategoryModel({ onSelect, onClose }) {
    return (
        <>
            <div className="p-5 relative rounded bg-white">
                <button className='absolute top-3 right-0  cursor-pointer  bg-slate-100 z-50 rounded-full px-2' onClick={onClose}>X</button>
                <h2 className="font-bold text-lg mb-3 ">Category</h2>

                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li key={index} style={{ overflowY: "none" }} className="flex items-center gap-2 py-2 text-sm border-t border-slate-200 hover:text-[#003F73] cursor-pointer transition">
                            {iconMap[category] || null}
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

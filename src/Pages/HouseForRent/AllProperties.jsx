import { useState, useMemo, useCallback, useContext } from 'react';
import SearchFilter from '../Home/Models/SearchFilter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GirlIcon from '@mui/icons-material/Girl';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import SearchIcon from '@mui/icons-material/Search';
import HotelIcon from '@mui/icons-material/Hotel';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';
import StoreIcon from '@mui/icons-material/Store';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AllPropertiesCard from './component/AllPropertiesCard';
import Banner from '../../component/Banner/Banner';
import { pakistanLocations } from '../../../pakistanLocations';
import OfferDisplay from '../../component/Banner/OfferDisplay';
import Bahawalpur from '../../assets/images/Bahawalpur.jpeg';
import DGKhan from '../../assets/images/DGKhan.jpeg';
import Faisalabad from '../../assets/images/Faisalabad.jpeg';
import { Context } from '../../Context/ContextProvider';

const FilterSection = ({ title, children, isOpen, onToggle }) => (
    <div className='border border-slate-100 rounded-lg p-4 bg-white shadow-md mb-4'>
        <div
            className='flex justify-between font-[700] cursor-pointer'
            onClick={onToggle}
        >
            <div className='flex flex-col'>
                {title}
                <span className='bg-[#002456] h-1 w-[40px]'></span>
            </div>
            <KeyboardArrowUpIcon
                className={`transform transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
            />
        </div>
        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
        >
            {children}
        </div>
    </div>
);

function AllProperties() {
    const [filterStates, setFilterStates] = useState({
        typeForm: true,
        category: true,
        location: true,
        sindhCities: true,
        punjabCities: true,
        priceRange: true,
        rating: true
    });

    const { theme } = useContext(Context)
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [filters, setFilters] = useState({
        type: '',
        category: '',
        province: '',
        city: '',
        location: '',
        minPrice: '',
        maxPrice: '',
        rating: null
    });
    const [appliedFilters, setAppliedFilters] = useState({});

    const images = useMemo(() => [Bahawalpur, Faisalabad, DGKhan], []);

    const cities = useMemo(() =>
        filters.province ? Object.keys(pakistanLocations[filters.province]) : [],
        [filters.province]
    );

    const locations = useMemo(() =>
        filters.city ? pakistanLocations[filters.province][filters.city] : [],
        [filters.province, filters.city]
    );


    const filterData = useMemo(() => ({
        types: ['Buy', 'Sell', 'Rent'],
        ratings: [
            { stars: 5, label: "5 Stars", count: 24 },
            { stars: 4, label: "4 & Up", count: 18 },
            { stars: 3, label: "3 & Up", count: 12 },
            { stars: 2, label: "2 & Up", count: 6 },
            { stars: 1, label: "1 & Up", count: 3 }
        ],
        categories: [
            { name: "Plot", count: 0, icon: <LocationOnIcon style={{ color: '#009688' }} /> },
            { name: "Shop", count: 5, icon: <StoreIcon style={{ color: '#FF5722' }} /> },
            { name: "Houses", count: 17, icon: <HouseIcon style={{ color: '#2196F3' }} /> },
            { name: "Apartment", count: 0, icon: <ApartmentIcon style={{ color: '#3F51B5' }} /> },
            { name: "Agricultural Land", count: 2, icon: <LocationOnIcon style={{ color: '#4CAF50' }} /> },
            { name: "Boys Hostel", count: 0, icon: <PeopleAltIcon style={{ color: '#9C27B0' }} /> },
            { name: "Girls Hostel", count: 0, icon: <GirlIcon style={{ color: '#E91E63' }} /> },
            { name: "Hotels", count: 0, icon: <HotelIcon style={{ color: '#00BCD4' }} /> },
            { name: "Architecture Engineer", count: 0, icon: <ArchitectureIcon style={{ color: '#FF9800' }} /> },
            { name: "Home Developer", count: 0, icon: <EngineeringIcon style={{ color: '#795548' }} /> },
            { name: "Home Inspector", count: 0, icon: <SearchIcon style={{ color: '#607D8B' }} /> },
            { name: "Map Officer", count: 0, icon: <MapIcon style={{ color: '#8BC34A' }} /> },
            { name: "Real Estate Photographers", count: 0, icon: <CameraAltIcon style={{ color: '#F44336' }} /> },
        ],
        locations: {
            Sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Mirpur Khas'],
            Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala']
        }
    }), []);

    const toggleFilter = useCallback((filterName) => {
        setFilterStates(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    }, []);

    const handleTypeChange = useCallback((type) => {
        setFilters(prev => ({
            ...prev,
            type: type.toLowerCase()
        }));
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setFilters(prev => ({
            ...prev,
            category: category.toLowerCase().replace(/\s+/g, '')
        }));
    }, []);

    const handleProvinceChange = useCallback((e) => {
        const province = e.target.value;
        setFilters(prev => ({
            ...prev,
            province,
            city: '',
            location: ''
        }));
    }, []);

    const handleCityChange = useCallback((e) => {
        const city = e.target.value;
        setFilters(prev => ({
            ...prev,
            city,
            location: ''
        }));
    }, []);

    const handleLocationChange = useCallback((e) => {
        setFilters(prev => ({
            ...prev,
            location: e.target.value
        }));
    }, []);

    const handleMinPriceChange = useCallback((e) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
        setFilters(prev => {
            const newMin = (!isNaN(value) && value >= 0) ? value : '';
            return {
                ...prev,
                minPrice: newMin,
                maxPrice: (prev.maxPrice && newMin > prev.maxPrice) ? newMin : prev.maxPrice
            };
        });
    }, []);

    const handleMaxPriceChange = useCallback((e) => {
        const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
        setFilters(prev => ({
            ...prev,
            maxPrice: (!isNaN(value) && value >= (prev.minPrice || 0)) ? value : ''
        }));
    }, []);

    const handleRatingChange = useCallback((rating) => {
        setFilters(prev => ({
            ...prev,
            rating
        }));
    }, []);

    const applyFilters = useCallback(() => {
        setAppliedFilters(filters);
    }, [filters]);

    const clearFilters = useCallback(() => {
        setFilters({
            type: '',
            category: '',
            province: '',
            city: '',
            location: '',
            minPrice: '',
            maxPrice: '',
            rating: null
        });
        setAppliedFilters({});
    }, []);

    return (
        <>
            <OfferDisplay images={images} />

            <div className='absolute top-[40%] w-full'>
                <SearchFilter isHome={true} />
            </div>

            <div className='bg-[#F8F7FA] p-8 pt-20'>
                {/* Filters Column */}
                <div className='w-[95%] mx-auto flex gap-8'>
                    <div className='w-[24%] space-y-3 mt-9'>
                        {/* Type Filter */}
                        <FilterSection
                            title="Type"
                            isOpen={filterStates.typeForm}
                            onToggle={() => toggleFilter('typeForm')}
                        >
                            <form className='flex flex-col mt-4 space-y-3'>
                                {filterData.types.map((label, idx) => (
                                    <div key={idx} className='flex items-center'>
                                        <input
                                            type="radio"
                                            name="type"
                                            id={label}
                                            className='mr-3'
                                            checked={filters.type === label.toLowerCase()}
                                            onChange={() => handleTypeChange(label)}
                                        />
                                        <label htmlFor={label} className="text-sm text-slate-700">{label}</label>
                                    </div>
                                ))}
                            </form>
                        </FilterSection>

                        {/* Category Filter */}
                        <FilterSection
                            title="Category"
                            isOpen={filterStates.category}
                            onToggle={() => toggleFilter('category')}
                        >
                            <div className="overflow-y-auto max-h-[400px] scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
                                <ul className="space-y-3 text-sm text-slate-800 pe-2">
                                    {filterData.categories.map((cat, index) => (
                                        <li
                                            key={index}
                                            className={`flex items-center gap-3 cursor-pointer ${filters.category === cat.name.toLowerCase().replace(/\s+/g, '') ? 'font-bold' : ''
                                                }`}
                                            onClick={() => handleCategoryChange(cat.name)}
                                        >
                                            <span className="text-lg">{cat.icon}</span>
                                            <span className="flex-1">{cat.name}</span>
                                            <span className="text-gray-500 text-xs">({cat.count})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FilterSection>

                        {/* Location Filter */}
                        <FilterSection
                            title="Location"
                            isOpen={filterStates.location}
                            onToggle={() => toggleFilter('location')}
                        >
                            <div className="space-y-4">
                                {/* Province Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                    <select
                                        value={filters.province}
                                        onChange={handleProvinceChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                    >
                                        <option value="">Select Province</option>
                                        {Object.keys(pakistanLocations).map((province) => (
                                            <option key={province} value={province}>{province}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* City Selector */}
                                {filters.province && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <select
                                            value={filters.city}
                                            onChange={handleCityChange}
                                            className="w-full p-2 border border-gray-300 rounded text-sm"
                                        >
                                            <option value="">Select City</option>
                                            {cities.map((city) => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Location Selector */}
                                {filters.city && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <select
                                            value={filters.location}
                                            onChange={handleLocationChange}
                                            className="w-full p-2 border border-gray-300 rounded text-sm"
                                        >
                                            <option value="">Select Location</option>
                                            {locations.map((location, index) => (
                                                <option key={index} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </FilterSection>

                        {/* Rating Filter */}
                        {/* <FilterSection
                        title="Rating"
                        isOpen={filterStates.rating}
                        onToggle={() => toggleFilter('rating')}
                    >
                        <div className="mt-3">
                            <ul className="space-y-1">
                                {filterData.ratings.map((rating) => (
                                    <li
                                        key={rating.stars}
                                        className={`flex items-center rounded hover:bg-gray-50 cursor-pointer ${filters.rating === rating.stars ? 'bg-gray-100' : ''}`}
                                        onClick={() => handleRatingChange(rating.stars)}
                                    >
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                star <= rating.stars ?
                                                    <StarIcon key={star} className="text-yellow-400 text-sm" /> :
                                                    <StarBorderIcon key={star} className="text-gray-300 text-sm" />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-700">{rating.label}</span>
                                        <span className="text-xs text-gray-500 ml-auto">({rating.count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FilterSection> */}

                        {/* Price Range Filter */}
                        <FilterSection
                            title="Price Range"
                            isOpen={filterStates.priceRange}
                            onToggle={() => toggleFilter('priceRange')}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        id="minPrice"
                                        placeholder="Min"
                                        min={0}
                                        value={filters.minPrice}
                                        onChange={handleMinPriceChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        placeholder="Max"
                                        min={filters.minPrice || 0}
                                        value={filters.maxPrice}
                                        onChange={handleMaxPriceChange}
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </FilterSection>

                        <div>
                            <button
                                onClick={applyFilters}
                                className={`mt-4 w-full py-3 text-white text-sm font-medium rounded transition-colors ${theme.primaryColor} ${theme.btnHover}`}
                            >
                                Apply Filter
                            </button>
                            <button
                                onClick={clearFilters}
                                className={`mt-4 w-full py-3 ${theme.primaryColor} text-white text-sm font-medium rounded ${theme.btnHover} transition-colors`}
                            >
                                Clear Filter
                            </button>
                        </div>
                    </div>

                    {/* Properties List */}
                    <div className='w-[76%] rounded-lg'>
                        <div className="py-5">
                            <div className="mt-4 text-gray-500">
                                <AllPropertiesCard filters={appliedFilters} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllProperties;
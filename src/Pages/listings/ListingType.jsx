import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← import this
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Banner from '../../component/Banner/Banner'
import { Context } from '../../Context/ContextProvider';

const ListingType = () => {
  const [adType, setAdType] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();




  const { userInfo, theme } = useContext(Context)
  const role = userInfo?.roles

  console.log('userInfo', userInfo)
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    if (selected) {
      navigate(`/post-an-ad/?category=${selected}&type=${adType}`, {
        state: { adType, category: selected }
      });
    }
  };

  return (
    <div className={`${theme.mainbg} shadow-sm `}>
      <Banner title='Post an Ad' />

      <div className='py-14'>
        <div className={`${theme.boxbg} w-[90%] mx-auto p-10 shadow-md`}>
          <div className="bg-blue-50 text-green-600 p-4 rounded font-medium">
            You have 700 regular ads.
          </div>

          <div className="">
            <div className="flex items-center gap-2 my-6">
              <LocalOfferIcon className="text-black" />
              <h2 className="text-lg font-semibold text-gray-800">Select Type</h2>
            </div>
            <hr className="mb-7 border-gray-200" />

            <div className='flex items-center justify-end gap-4 '>
              <label className="text-sm font-medium mb-1 text-gray-700">
                Ad Type
              </label>
              <select
                value={adType}
                onChange={(e) => setAdType(e.target.value)}
                className="w-[70%] border border-gray-300 text-gray-600 font-medium rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
          </div>

          {adType && (
            <div className="my-5">
              <div className="flex items-center gap-2 mb-5">
                <LocalOfferIcon />
                <h2 className="text-lg font-semibold text-gray-800">Select Category</h2>
              </div>
              <hr className="mb-7 border-gray-200" />

              <div className='flex items-center justify-end gap-4'>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Category
                </label>

                {role == 'LOCAL SERVICES' ?
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-[70%] border border-gray-300 text-gray-600 font-medium rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="homeinspection">Home Inspection</option>
                    <option value="homedeveloper">Home Developers</option>
                    <option value="mapofficer">Map Officers</option>
                    <option value="achitectureengineer">Architecture Engineers</option>
                    <option value="propertyphotographer">Property Photographers</option>
                  </select>
                  :
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-[70%] border border-gray-300 text-gray-600 font-medium rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="plot">Plots</option>
                    <option value="shop">Shops</option>
                    <option value="houses">Houses</option>
                    <option value="apartment">Apartment</option>
                    <option value="agricultureland">Agriculture Land</option>
                    <option value="boyshostel">Boys Hostels</option>
                    <option value="girlshostel">Girls Hostels</option>
                    <option value="hotels">Hotels</option>
                  </select>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingType;

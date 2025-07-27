import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../Context/ContextProvider';

const ProfileForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bannerPreview, setBannerPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const { userInfo } = useContext(Context)

  const BASE_URL = import.meta.env.VITE_BASE_URL;


  const [formData, setFormData] = useState({
    icon: null,
    banner: null,
    logo: null,
    alwaysOpen: false,
    openingHours: {
      monday: { open: '08:30', close: '20:30' },
      tuesday: { open: '08:30', close: '20:30' },
      wednesday: { open: '08:30', close: '20:30' },
      thursday: { open: '08:30', close: '20:30' },
      friday: { open: '08:30', close: '20:30' },
      saturday: { open: '08:30', close: '20:30' },
      sunday: { open: '08:30', close: '20:30' }
    },
    agencyNotes: '',
    healthStrategy: '',
    localAddress: '',
    status: '',
    values: '',
    address: '',
    profiledesc: '',
    publicNavigation: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedIn: '',
      pinterest: '',
      reddit: '',
      tiktok: ''
    },
    agencyName: '',
    profileurlslug: '',
    slogan: '',
    agencyEmail: '',
    agencyPhone: '',
    agencyWebsite: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }));
  };

  const handleOpeningHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({
      ...prev,
      [field]: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      if (field === 'banner') {
        setBannerPreview(reader.result);
      } else if (field === 'logo') {
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (field) => {
    if (field === 'banner') {
      setFormData(prev => ({ ...prev, banner: null }));
      setBannerPreview(null);
    } else if (field === 'logo') {
      setFormData(prev => ({ ...prev, logo: null }));
      setLogoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append files correctly
      if (formData.banner) formDataToSend.append('banner', formData.banner);
      if (formData.logo) formDataToSend.append('logo', formData.logo);

      // Append other profile + user data
      formDataToSend.append(
        'data',
        JSON.stringify({
          alwaysOpen: formData.alwaysOpen,
          openingHours: formData.openingHours,
          agencyNotes: formData.agencyNotes,
          healthStrategy: formData.healthStrategy,
          localAddress: formData.localAddress,
          status: formData.status,
          values: formData.values,
          address: formData.address,
          profiledesc: formData.profiledesc,
          publicNavigation: formData.publicNavigation,
          socialMedia: formData.socialMedia,
          agencyName: formData.agencyName,
          profileurlslug: formData.profileurlslug,
          slogan: formData.slogan,
          agencyEmail: formData.agencyEmail,
          agencyPhone: formData.agencyPhone,
          agencyWebsite: formData.agencyWebsite,

          name: formData.name,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        })
      );

      const response = await axios.patch(
        `${BASE_URL}/api/user/updateUser/${userInfo._id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response.data);
      setMessage('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('Error saving profile: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Profile Management</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Profile Banner Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Profile Banner</h2>
          <p className="text-sm text-gray-500">
            Recommended image size to (1230×313)px, Maximum file size 3 MB, Allowed image type (png, jpg, jpeg)
          </p>

          <div className="mt-2">
            {bannerPreview ? (
              <div className="relative">
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full h-auto rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage('banner')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">Click to upload</p>
                  </div>
                  <input
                    id="banner-upload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleFileChange(e, 'banner')}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Profile Logo Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Profile Logo</h2>
          <p className="text-sm text-gray-500">
            Recommended image size to (180×140)px, Maximum file size 3 MB, Allowed image types (png, jpg, jpeg)
          </p>

          <div className="mt-2 flex items-center gap-4">
            {logoPreview ? (
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-32 h-24 object-contain rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage('logo')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-32 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <label className="flex flex-col items-center justify-center w-full h-full">
                  <svg className="w-8 h-8 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <span className="text-xs text-gray-500 mt-1">Upload Image</span>
                  <input
                    id="logo-upload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleFileChange(e, 'logo')}
                  />
                </label>
              </div>
            )}
            {logoPreview && (
              <button
                type="button"
                onClick={() => handleRemoveImage('logo')}
                className="text-red-600 text-sm font-medium hover:text-red-800"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Opening hours</h2>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="selectedHours"
                name="openingOption"
                checked={!formData.alwaysOpen}
                onChange={() => setFormData({ ...formData, alwaysOpen: false })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="selectedHours" className="ml-2 block text-sm font-medium text-gray-700">
                Open on selected hours
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="alwaysOpen"
                name="openingOption"
                checked={formData.alwaysOpen}
                onChange={() => setFormData({ ...formData, alwaysOpen: true })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="alwaysOpen" className="ml-2 block text-sm font-medium text-gray-700">
                Always open
              </label>
            </div>
          </div>

          {!formData.alwaysOpen && (
            <div className="mt-4 flex flex-col gap-3">
              {Object.entries(formData.openingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center border border-gray-200 rounded-lg p-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {day}
                  </label>
                  <div className="flex items-center gap-3">
                    <div>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                        className="p-2 rounded-sm border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>-</div>
                    <div>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                        className="p-2 rounded-sm border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agency Information */}
        <div className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="agencyName" className="block text-sm font-medium text-gray-700">Agency Name</label>
              <input
                id="agencyName"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                rows={3}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="profileurlslug" className="block text-sm font-medium text-gray-700">Identity Number</label>
              <input
                type="text"
                id="profileurlslug"
                name="profileurlslug"
                value={formData.profileurlslug}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>

            <div>
              <label htmlFor="slogan" className="block text-sm font-medium text-gray-700">Slogan</label>
              <input
                type="text"
                id="slogan"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>
          <div className='text-center text-sm'>
            Write agency name in small letters and you <br /> can't change in future. This is your profile url.
          </div>

          <div>
            <h2 className="text-lg font-medium">Profile Category</h2>
            <select name="selectcategory" id="" placeholder="Select a Category" className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="" >Select a Category</option>
              <option value="C1">ABC</option>
              <option value="C2">ABC</option>
              <option value="C3">ABC</option>
              <option value="C4">ABC</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="agencyEmail" className="block text-sm font-medium text-gray-700">Agency E-mail Address</label>
              <input
                type="text"
                id="agencyEmail"
                name="agencyEmail"
                value={formData.agencyEmail}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="agencyPhone" className="block text-sm font-medium text-gray-700">Agency Phone</label>
              <input
                type="text"
                id="agencyPhone"
                name="agencyPhone"
                value={formData.agencyPhone}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="agencyWebsite" className="block text-sm font-medium text-gray-700">
                Agency Website</label>
              <input
                type="text"
                id="agencyWebsite"
                name="agencyWebsite"
                value={formData.agencyWebsite}
                onChange={handleChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="profiledesc" className="block text-sm font-medium text-gray-700">Profile Description</label>
            <textarea
              rows={5}
              type="text"
              id="profiledesc"
              name="profiledesc"
              value={formData.profiledesc}
              onChange={handleChange}
              className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Social Media Accounts</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                id="facebook"
                name="facebook"
                placeholder='FaceBook'
                value={formData.socialMedia.facebook}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder='Twitter'
                value={formData.socialMedia.twitter}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                id="instagram"
                name="Instagram"
                placeholder="instagram"
                value={formData.socialMedia.instagram}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                id="youtube"
                name="youtube"
                placeholder="Youtube"
                value={formData.socialMedia.youtube}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                id="linkedIn"
                name="linkedIn"
                placeholder="linkedIn"
                value={formData.socialMedia.linkedIn}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                id="pinterest"
                name="pinterest"
                placeholder="Pinterest"
                value={formData.socialMedia.pinterest}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                id="reddit"
                name="reddit"
                placeholder="Reddit"
                value={formData.socialMedia.reddit}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="text"
                id="tiktok"
                name="tiktok"
                placeholder="tiktok"
                value={formData.socialMedia.tiktok}
                onChange={handleSocialMediaChange}
                className="mt-1 p-3 block w-full rounded-sm border outline-gray-400 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>


        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProfileForm;
// import React from "react";
// import SendIcon from '@mui/icons-material/Send';
// import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// const ContactForm = () => {
//     return (
//         <div className="bg-white py-10 px-4">
//             <div className="w-[80%] mx-auto bg-[#002A5C] text-white p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10">
//                 {/* Left Side - Contact Info */}
//                 <div>
//                     <h2 className="text-2xl font-bold mb-6">Contact us</h2>
//                     <div className="mb-4 flex items-center gap-2 text-sm">
//                         <span className="-rotate-45"><SendIcon fontSize="small" /></span>
//                         <p>Main City Lodhran, Punjab, Pakistan</p>
//                     </div>
//                     <div className="mb-4 flex items-center gap-2 text-sm">
//                         <span className="text-lg"><PhoneEnabledIcon fontSize="small" /></span>
//                         <p>+92 3090111330</p>
//                     </div>
//                     <div className="mb-4 flex items-center gap-2 text-sm">
//                         <span className="text-lg"><EmailOutlinedIcon fontSize="small" /></span>
//                         <p>customersupport@apnakhaiyal.com</p>
//                     </div>
//                 </div>

//                 {/* Right Side - Form */}
//                 <div>
//                     <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
//                     <form className="space-y-4">
//                         <input
//                             type="text"
//                             placeholder="Full Name*"
//                             className="w-full p-2 rounded-md bg-white text-gray-500"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Business Name*"
//                             className="w-full p-2 rounded-md bg-white text-gray-500"
//                         />
//                         <select className="w-full p-2 rounded-md bg-white text-gray-500">
//                             <option>Business Type</option>
//                             <option>Building/Construction Material</option>
//                             <option>Map Services</option>
//                             <option>Electrical Appliances</option>
//                             <option>Electronics</option>
//                             <option>Paint Companies</option>
//                             <option>Interior Design</option>
//                             <option>Architecture Designing</option>
//                             <option>Tiles/Marble Companies</option>
//                             <option>Sanitary System</option>
//                             <option>Other</option>
//                         </select>
//                         <input
//                             type="text"
//                             placeholder="Mobile Number*"
//                             className="w-full p-2 rounded-md bg-white text-gray-500"
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email*"
//                             className="w-full p-2 rounded-md bg-white text-gray-500"
//                         />
//                         <textarea
//                             placeholder="Your Message"
//                             rows="4"
//                             className="w-full p-2 rounded-md bg-white text-gray-500"
//                         ></textarea>
//                         <button
//                             type="submit"
//                             className="bg-white text-[#002A5C] px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ContactForm;








import React, { useContext, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { toast } from "react-toastify";
import { Context } from "../../Context/ContextProvider";
import useAxiosForm from "../../utils/useAxiosForm";

const ContactForm = () => {
    const { theme } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        cell: "",
        city: "",
        email: "",
        address: "",
        businessType: "",
        category: "",
    });

    const [designImage, setDesignImage] = useState(null);
    const [paymentSlip, setPaymentSlip] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e, setImage) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const {
            name, businessType, cell, email, category, city, address
        } = formData;

        if (!name || !cell || !email || !city || !address || !businessType || !category || !designImage || !paymentSlip) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const data = new FormData();
        data.append("name", name);
        data.append("cell", cell);
        data.append("email", email);
        data.append("city", city);
        data.append("address", address);
        data.append("businessType", businessType);
        data.append("category", category);
        data.append("designImage", designImage);
        data.append("paymentSlip", paymentSlip);

        try {
            const [res, err] = await useAxiosForm('POST', 'displayOffer', null, data);
            if (res) {
                toast.success("Offer submitted! Please wait for admin approval.");
                setFormData({
                    name: "",
                    cell: "",
                    email: "",
                    city: "",
                    address: "",
                    businessType: "",
                    category: "",
                });
                setDesignImage(null);
                setPaymentSlip(null);
            }
            else {
                toast.error(err || 'Offer submission failed.')
            }
        } catch (err) {
            toast.error("Offer submission failed.");
        }
    };

    return (
        <div className="bg-white py-10 px-4">
            <div className="w-[80%] mx-auto bg-[#002A5C] text-gray-300 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side - Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-white">Contact us</h2>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <span className="-rotate-45"><SendIcon fontSize="small" /></span>
                        <p>Main City Lodhran, Punjab, Pakistan</p>
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <span><PhoneEnabledIcon fontSize="small" /></span>
                        <p>+92 3090111330</p>
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <span><EmailOutlinedIcon fontSize="small" /></span>
                        <p>customersupport@apnakhaiyal.com</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name*"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border text-gray-300"
                        />
                        <input
                            type="text"
                            name="cell"
                            placeholder="Cell*"
                            value={formData.cell}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border text-gray-300"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border text-gray-300"
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City*"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border text-gray-300"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address*"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border text-gray-300"
                        />
                        <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border text-gray-300 border-gray-100"
                        >
                            <option className="text-gray-600" value="">Business Type*</option>
                            <option className="text-gray-600" value="building">Building/Construction Material</option>
                            <option className="text-gray-600" value="map">Map Services</option>
                            <option className="text-gray-600" value="appliances">Electrical Appliances</option>
                            <option className="text-gray-600" value="electronics">Electronics</option>
                            <option className="text-gray-600" value="paint">Paint Companies</option>
                            <option className="text-gray-600" value="interior">Interior Design</option>
                            <option className="text-gray-600" value="architecture">Architecture Designing</option>
                            <option className="text-gray-600" value="tiles">Tiles/Marble Companies</option>
                            <option className="text-gray-600" value="sanitary">Sanitary System</option>
                            <option className="text-gray-600" value="other">Other</option>
                        </select>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border text-gray-300 border-gray-100"
                        >
                            <option className="text-gray-700" value="">Category*</option>
                            <option className="text-gray-700" value="property">Property</option>
                            <option className="text-gray-700" value="town">Town</option>
                            <option className="text-gray-700" value="marketing">Marketing Agencies</option>
                            <option className="text-gray-700" value="inspection">Home Inspection</option>
                            <option className="text-gray-700" value="developer">Home Developers</option>
                            <option className="text-gray-700" value="map">Map Officer</option>
                            <option className="text-gray-700" value="architecture">Architecture Engineer</option>
                            <option className="text-gray-700" value="photographer">Property Photographers</option>
                        </select>

                        <div>
                            <label className="block text-sm mb-1">Display Banner*</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, setDesignImage)}
                                className="w-full p-2 rounded-md border text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Payment Slip*</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, setPaymentSlip)}
                                className="w-full p-2 rounded-md border text-gray-300"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className={`text-white px-6 py-2 rounded-md font-semibold ${theme.primaryColor} ${theme.btnHover}`}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;

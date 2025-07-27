import React from "react";
import SendIcon from '@mui/icons-material/Send';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const ContactForm = () => {
    return (
        <div className="bg-white py-10 px-4">
            <div className="w-[80%] mx-auto bg-[#002A5C] text-white p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side - Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Contact us</h2>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <span className="-rotate-45"><SendIcon fontSize="small" /></span>
                        <p>Main City Lodhran, Punjab, Pakistan</p>
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <span className="text-lg"><PhoneEnabledIcon fontSize="small" /></span>
                        <p>+92 3090111330</p>
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <span className="text-lg"><EmailOutlinedIcon fontSize="small" /></span>
                        <p>customersupport@apnakhaiyal.com</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name*"
                            className="w-full p-2 rounded-md bg-white text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Business Name*"
                            className="w-full p-2 rounded-md bg-white text-gray-500"
                        />
                        <select className="w-full p-2 rounded-md bg-white text-gray-500">
                            <option>Business Type</option>
                            <option>Building/Construction Material</option>
                            <option>Map Services</option>
                            <option>Electrical Appliances</option>
                            <option>Electronics</option>
                            <option>Paint Companies</option>
                            <option>Interior Design</option>
                            <option>Architecture Designing</option>
                            <option>Tiles/Marble Companies</option>
                            <option>Sanitary System</option>
                            <option>Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Mobile Number*"
                            className="w-full p-2 rounded-md bg-white text-gray-500"
                        />
                        <input
                            type="email"
                            placeholder="Email*"
                            className="w-full p-2 rounded-md bg-white text-gray-500"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            className="w-full p-2 rounded-md bg-white text-gray-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-white text-[#002A5C] px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;

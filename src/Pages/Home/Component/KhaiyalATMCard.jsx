import cardImg from '../../../assets/images/KhaiyalCard.jpeg';

function KhaiyalATMCard() {
    return (
        <div className="relative top-68 w-[80%] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold w-full text-center flex flex-col justify-center items-center">
                Get Your Khaiyal Membership Card
                <span className="h-1 w-[50px] bg-[#002456] my-2"></span>
            </h1>

            <div className="flex justify-between items-center w-[90%] mx-auto">
                {/* Image Section */}
                <div className="w-full  flex justify-center items-center md:mb-0">
                    <img
                        src={cardImg}
                        className=""
                        alt="Khaiyal Membership Card"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full">
                    <h1 className="text-xl font-semibold w-full text-center flex flex-col">
                        Fill Out Your Details
                        <span className="h-1 w-[50px] bg-[#002456] mb-4 mx-auto"></span>
                    </h1>

                    <form action="#" method="post" className="space-y-3 mt-5 w-full md:w-[80%] mx-auto flex flex-col justify-center items-center">
                        <input type="text" placeholder="Full Name*" className="w-full border focus:outline-none focus:border-blue-600 border-gray-300 p-1 rounded" />
                        <input type="text" placeholder="Profession" className="w-full border focus:outline-none focus:border-blue-600 border-gray-300 p-1 rounded" />
                        <input type="text" placeholder="Mobile Number*" className="w-full border focus:outline-none focus:border-blue-600 border-gray-300 p-1 rounded" />
                        <input
                            type="email"
                            placeholder="Email*"
                            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
                        />

                        <select className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-1 text-slate-500 rounded">
                            <option>Select Your City</option>
                            <option>Lahore</option>
                            <option>Karachi</option>
                            <option>Islamabad</option>
                            <option>Others</option>
                        </select>

                        <select className="w-full border border-gray-300 p-1 rounded focus:outline-none focus:border-blue-600 text-slate-500">
                            <option>Select Card Type</option>
                            <option>Gold</option>
                            <option>Silver</option>
                            <option>Platinum</option>
                        </select>

                        <p className="text-md text-gray-500 text-center md:text-start">
                            Send Card Fees Amount to our account and write the transaction ID in the message below.
                        </p>
                        <div className='text-start w-full text-slate-500'>
                            <span>Bank:</span> JazzCash<br />
                            <span>Account Title:</span> Khaiyal Real Estate<br />
                            <span>Account Number:</span> 03090111330
                        </div>

                        <textarea placeholder="Address" className="w-full border border-gray-300 p-2 rounded" rows="3"></textarea>

                        <div className='w-full'>
                            <button type="submit" className="bg-[#002456] text-white px-5 py-2 rounded hover:bg-[#001a3d] ">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default KhaiyalATMCard

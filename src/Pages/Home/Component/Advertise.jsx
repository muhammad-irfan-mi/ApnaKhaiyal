import React, { useContext } from 'react'
import addvertiseWithKhayal from '../../../assets/images/addvertiseWithKhayal.jpeg'
import { Context } from '../../../Context/ContextProvider';
export default function Advertise() {

    const { theme } = useContext(Context)
    return (
        <div className='relative top-60'>
            <div className="relative h-[60vh] w-full bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${addvertiseWithKhayal})` }}>
                {/* Accurate transparent overlay */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>

                {/* Content on top */}
                <div className="relative z-10 flex items-center justify-start
                 ml-6 h-full text-white ">

                    <div className=''>
                        <h2 className='text-5xl font-bold'>
                            Advertise with Khaiyal.com
                        </h2>
                        <p className='mt-7 '>
                            Boost your business visibility! Contact us now to showcase your brand to thousands daily.
                        </p>

                        <button className='bg-[#002456] p-3 mt-6 px-9 hover:bg-blue-700 hover:underline transition transform ease-in-out cursor-pointer' type="button">Contact Us</button>
                    </div>
                </div>
            </div>


        </div>
    )
}
import React, { useContext } from 'react';
import cards from '../../../assets/images/Cards.jpeg'
import { Context } from '../../../Context/ContextProvider';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';


export default function MembershipCard() {
    const { theme } = useContext(Context)

    const products = [
        { id: 0, heading1: "Free For Khaiyal Community", text1: "Digitalize your real estate office", text2: "Easy access to clients at Khaiyal Group", text3: "Minimize your daily field visits", text4: "Reduce you field expenses at Khaiyal Group", text5: "Easy access to all social media", text6: "Client satisfaction to your office" },

        { id: 1, heading1: "Premium Town Membership", text1: "Innovative Digital marketing to your town", text2: "Easy to manage your inventory", text3: "Daily update of towns inventory to customers", text4: "Innovative approach to reach new customers", text5: "Biggest platform for joint ventures in real estate", text6: "Approachable Verified investors and developer" },

        { id: 2, heading1: "Overseas Membership Plan", text1: "Manage your inventory with verified customers", text2: "Business expension in home town", text3: "Easy access to local verified sellers and buys", text4: "Save time earn wisely With Khaiyal", text5: "24/7 Customer support for overseas Pakistani", text6: "Verified marketplace for overseas Pakistani buys" }
    ]

    return (
        <div className='relative top-60 px-4 md:px-10'>
            <div className='h-[180px] flex items-center'>
                <h1 className='w-[100%] text-4xl font-[700] flex justify-center items-center flex-col'>Free Membership for Khaiyal Community <span className='h-1 w-[50px] my-3  bg-black'></span> </h1>
            </div>

            <div
                className="py-5 bg-cover bg-center"
                style={{ backgroundImage: `url(${cards})` }}
            >
                <div className='w-[92%] mx-auto flex flex-wrap justify-between items-center'>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white text-center  p-6 rounded-xl shadow-xl w-[32%] py-7 px-18"
                        >
                            <h1 className={`text-xl font-bold ${theme.CardheadtextColor}`}>{product.heading1}</h1>
                            <h2 className="text-5xl font-bold text-black my-5">Rs 0</h2>

                            <div className="text-left text-gray-700 ">
                                {[product.text1, product.text2, product.text3, product.text4, product.text5, product.text6].map((text, idx) => (
                                    <div key={idx} className="flex items-start gap-2 my-3">
                                        <CheckOutlinedIcon className="font-bold mt-1" />
                                        <span className="text-md">{text}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="bg-[#001c4e] text-white text-sm font-semibold py-2 px-4 rounded mt-4 shadow hover:bg-red-700 hover:text-white transition cursor-pointer">
                                Purchase Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>    
        </div>
    );
}

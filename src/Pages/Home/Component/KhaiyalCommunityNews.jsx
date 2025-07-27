import React, { useContext } from 'react'
import { Context } from '../../../Context/ContextProvider'
import rao1 from '../../../assets/images/rao1.jpeg';
import rao2 from '../../../assets/images/rao2.jpeg';
import mailse from '../../../assets/images/mailsi.jpeg';

function KhaiyalCommunityNews() {
    const { theme } = useContext(Context)

    const CardsItems = [
        { id: 0, img: rao2, date: "April 1, 2025", heading1: "Exclusive 20% Discount for Khaiyal Members at Chughtai Lab!", discription: "We are excited to announce a groundbreaking partnership between Khaiyal.com and Chughtai Lab, bringing exclusive healthcare benefits to our valued…" },
        { id: 1, img: mailse, date: "July 8, 2019", heading1: "Field Visit: Meeting Between Khaiyal Group and Bhukari Hub Mailsi", discription: "In a recent visit packed with potential, Rao Sajjad Ahmed, the dynamic owner of Khaiyal Group, sat down with Tasawar…" },
        { id: 2, img: rao1, date: "July 2, 2019", heading1: "Rao Sajjad Meeting withInvestors: Leads the Way in Real Estate Marketing", discription: "Rao Sajjad Ahmed, the visionary owner of Khaiyal Group, recently embarked on a series of impactful meetings with investors, town…" },
    ]

    return (
        <div className="relative top-72 bg-[#F8F8F8] pt-3 px-4">
            <h2 className="text-2xl sm:text-3xl font-[700] w-full text-center">
                Khaiyal Community News
            </h2>

            <div className="flex flex-wrap justify-center gap-6 mt-10 ">
                {CardsItems.map((card) => (
                    <div
                        key={card.id}
                        className={`flex flex-col w-full sm:w-[80%] md:w-[45%] lg:w-[30%] rounded-md h-auto p-6 ${theme.overSeasCardBg}`}>
                        <img src={card.img} alt="" className="w-full h-auto" />
                        <span className={`text-[16px] font-[600] mt-3 ${theme.whiteText}`}>
                            {card.date}
                        </span>
                        <a className={`${theme.whiteText} hover:underline transition-all ease-in-out transform hover:decoration-[#FFC720] mt-2 text-justify text-lg sm:text-xl font-[700]`} href="">
                            {card.heading1}
                        </a>

                        <div className={`${theme.iconGrayColor} mt-4 text-start text-sm sm:text-base`}>
                            {card.discription}
                        </div>
                    </div>
                ))}

                <button className={`uppercase hover:underline px-7 py-2 mb-6 ${theme.overSeasCardBg} text-white`} type="button">view all</button>
            </div>
        </div>
    )
}

export default KhaiyalCommunityNews

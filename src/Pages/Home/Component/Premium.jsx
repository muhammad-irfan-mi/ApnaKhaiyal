import React from 'react';
import khayalCardImg from '../../../assets/images/recentadds/KhaiyalLogos.png';
import alNoor from '../../../assets/images/recentadds/alNoor.jpeg';
import orionGroup from '../../../assets/images/recentadds/orionGroup.jpeg';
import alAhmad from '../../../assets/images/recentadds/alAhmad.jpeg';
import jinnah from '../../../assets/images/Premium/jinnah.jpeg';
import bukhari from '../../../assets/images/Premium/bukhari.jpeg';
import muslim from '../../../assets/images/Premium/muslim.jpeg';
import smart from '../../../assets/images/Premium/smart.jpeg';
import husnain from '../../../assets/images/Premium/husnain.jpeg';
import builders from '../../../assets/images/Premium/builders.jpeg';

export default function Premium() {
    const products = [
        { id: 0, img: khayalCardImg, title: "Khaiyal Group", date: "Since 2019" },
        { id: 1, img: alNoor, title: "Al-Noor Garden Lodhran", date: "Since 2024" },
        { id: 2, img: orionGroup, title: "Orion Town", date: "Since 2024" },
        { id: 3, img: alAhmad, title: "Al Ahmed Builders", date: "Since 2024" },
        { id: 4, img: alAhmad, title: "Al Ahmed Builders", date: "Since 2024" },
        { id: 5, img: jinnah, title: "Jinnah Town Garden", date: "Since 2024" },
        { id: 6, title: "Park City", date: "Since 2025" },
        { id: 7, img: husnain, title: "Husnain Property Advisor", date: "Since 2025" },
        { id: 8, img: bukhari, title: "Bukhari Property Hub", date: "Since 2025" },
        { id: 9, img: muslim, title: "Muslim Property Advisor", date: "Since 2025" },
        { id: 10, img: jinnah, title: "Jinnah Town Garden", date: "Since 2025" },
        { id: 11, img: khayalCardImg, title: "Agency Name", date: "Since 2025" },
        { id: 12, title: "Tulip Real Real Estate", date: "Since 2025" },
        { id: 13, img: smart, title: "Smart Builders", date: "Since 2025" },
        { id: 14, img: builders, title: "Al Ghafar City", date: "Since 2025" },
        { id: 15, img: builders, title: "Khyban Commercial Centre", date: "Since 2025" },
        { id: 16, title: "Rajpoot Farm House", date: "Since 2025" },
        { id: 17, title: "Al Qamar Developers", date: "Since 2025" },
    ];

    return (
        <div className="relative top-60 p-6">
            <h2 className="text-4xl font-[700] flex justify-center items-center flex-col mb-4 text-center">Our Premium Agencies <span className="h-1 w-[50px] mt-5 bg-[#002456]"></span> </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white border border-slate-100 cursor-pointer overflow-hidden p-4 text-center">
                        {product.img && (
                            <img
                                src={product.img}
                                alt={product.title}
                                className="w-full h-40 object-cover rounded-md mb-2"
                            />
                        )}
                        <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

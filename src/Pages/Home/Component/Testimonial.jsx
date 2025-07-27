import React from 'react'
import raoSajjad from '../../../assets/images/RaoSajjad.jpeg'
import raoIshtiaq from '../../../assets/images/RaoIshtiaq.jpeg'
import khaiyaCardImg from '../../../assets/images/khayaCardImg.png'
import discountCard from '../../../assets/images/discountCard.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function Testimonial() {
    const products = [
        { id: 0, img: raoSajjad, name: "Rao Muhammad Sajjad", title: "CEO Khaiyal", description: "At Khaiyal Real Estate Marketplace, we are transforming how people buy and sell properties through transparency, efficiency, and innovation. Our platform connects buyers, sellers, investors and agents seamlessly, empowering them with the tools and insights they need. Together, we’re redefining the real estate journey to make it smarter and more rewarding.", quot1: "Good luck with Khaiyal—where your real estate dreams find the perfect match!" },
        { id: 1, img: raoIshtiaq, name: "Rao Ishtiyaq", title: "Chief Technical Officer", description: "At Khaiyal Real Estate Marketplace, technology is the backbone of everything we do. Our mission is to empower buyers, sellers, agents, and investors with cutting-edge tools and data-driven insights that make the real estate journey seamless and efficient. Through continuous innovation and a commitment to excellence, we are building a smarter, more connected platform to revolutionize the industry.", quot1: "At Khaiyal, we don’t just adapt to the future of real estate—we create it!" },
        { id: 2, img: khaiyaCardImg, name: "Rashid Ali", title: "Co Founder", description: "I want to take this moment to thank you for being such an integral part of Khaiyal’s story. As the Director, I am incredibly proud of what we’ve achieved so far, and it’s all because of your trust and continuous support. You have made Khaiyal not just a brand, but a vibrant, growing community. We have some exciting plans in the pipeline that we can’t wait to share with you. Our commitment remains to keep delivering the best, staying true to our values, and always putting you, our valued audience, at the heart of everything we do. Thank you for being on this journey with us. The best is yet to come." },

        { id: 2, img: khaiyaCardImg, name: "M. Rashid", title: "Developer", description: "I want to take this moment to thank you for being such an integral part of Khaiyal’s story. As the Director, I am incredibly proud of what we’ve achieved so far, and it’s all because of your trust and continuous support. You have made Khaiyal not just a brand, but a vibrant, growing community. We have some exciting plans in the pipeline that we can’t wait to share with you. Our commitment remains to keep delivering the best, staying true to our values, and always putting you, our valued audience, at the heart of everything we do. Thank you for being on this journey with us. The best is yet to come." },
    ]
    return (
        <>
            <div className='relative top-68 px-4 py-9'>
                {/* <div className='w-[100%] flex justify-center items-center'>
                    <img src={discountCard} className='w-[80%] mt-8' alt="" />
                </div> */}
                <Swiper
                    pagination={{ dynamicBullets: true }}
                    autoplay={true}
                    modules={[Pagination]}
                    spaceBetween={30}
                    slidesPerView={1} // ✅ Only 1 card always
                    className="mySwiper w-[88%] ">
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className='min-h-[400px] flex flex-col justify-center items-center border border-slate-200 rounded-lg p-8 shadow-md bg-white  text-center'>
                                <img className='h-24 w-24 rounded-full object-cover mb-4' src={product.img} alt={product.name} />
                                <h3 className='text-xl font-semibold text-gray-900'>{product.name}</h3>
                                <h4 className='text-sm text-gray-600 mb-2'>{product.title}</h4>
                                <p className='text-lg text-gray-700 w-[100%] leading-8'>{product.description}</p>
                                <p className='text-xl mt-2 text-gray-700 w-[90%]'>{product.quot1}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

        </>
    )
}
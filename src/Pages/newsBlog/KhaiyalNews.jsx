import React, { useEffect, useState } from 'react';
import Banner from '../../component/Banner/Banner';
import axios from 'axios';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import NewsModal from '../../component/modal/news/NewsModal';

const KhaiyalNews = () => {
    const [newsData, setNewsData] = useState([]);
    const [newsModal, setNewsModal] = useState(false);
    const [newsId, setNewsId] = useState('');

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/news`)
                console.log(response.data)
                setNewsData(response.data.news)
            } catch (error) {
                console.log(error)
            }
        }

        getNews();
    }, [])

    const handleNewsModal = (id) => {
        if (id) {
            setNewsId(id);
            setNewsModal(true);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 pb-14">
            <Banner title='Blog' />
            <div className="max-w-6xl mt-14 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.map((news, index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer overflow-hidden shadow-lg rounded-md"
                    >
                        <img
                            src={news.imageUrl}
                            alt={news.title}
                            className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                        // onClick={() => handleNewsModal(news._id)}
                        />
                        <div className="p-4">
                            <h2 className='text-gray-600'>{news.author || 'No Name Available'}</h2>
                            <h2 className='text-gray-600 font-normal text-sm'>{formatTimeAgo(news.createdAt)}</h2>
                            <h2 className="text-lg font-bold hover:underline transition-colors duration-300"
                                onClick={() => handleNewsModal(news._id)}
                            >
                                {news.title.slice(0, 70) || 'None'}
                            </h2>
                            <p className="font-normal mt-2 text-sm text-gray-600 line-clamp-3">
                                {news.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {newsModal && (
                <NewsModal isOpen={newsModal} newsId={newsId} onClose={() => setNewsModal(!newsModal)} />
            )}
        </div >
    );
};

export default KhaiyalNews;

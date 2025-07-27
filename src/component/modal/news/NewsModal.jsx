import React, { useContext, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { formatTimeAgo } from '../../../utils/formatTimeAgo';
import { Context } from '../../../Context/ContextProvider';

const NewsModal = ({ isOpen, newsId, onClose }) => {
    const {theme} = useContext(Context)
    const [news, setNews] = useState(null);

    useEffect(() => {
        if (!newsId) return;

        const getNews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/news/${newsId}`);
                setNews(response.data.news);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        getNews();

    }, [newsId]);

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-[99]">
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className={`absolute right-83 top-8 flex justify-between items-center h-7 w-7 border rounded-full ${theme.primaryColor2} hover:text-red-400`}
                    onClick={onClose}
                >
                    <CloseOutlinedIcon />
                </div>
                <Dialog.Panel className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-auto shadow-xl scrollbar-hide">
                    {news ? (
                        <>
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                <h2 className="text-2xl font-bold mb-2">{news.title}</h2>
                                <p className="text-gray-500 mb-2">
                                    {formatTimeAgo(news.createdAt)}
                                </p>
                                <p className="text-gray-500 font-normal whitespace-pre-line">{news.description}</p>
                            </div>
                        </>
                    ) : (
                        <div className="p-6 text-center text-gray-500">Loading news...</div>
                    )}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default NewsModal;


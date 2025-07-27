import { Swiper, SwiperSlide } from 'swiper/react';
import khayal from '../../assets/images/khayal.jpeg';
import group from '../../assets/images/group.jpeg';
import family from '../../assets/images/faimily.jpeg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { TypeAnimation } from 'react-type-animation';
import { useContext } from 'react';
import { Context } from '../../Context/ContextProvider';
import SearchFilter from '../../Pages/Home/Models/SearchFilter';

const OfferDisplay = ({ images }) => {
    const { theme } = useContext(Context);
    console.log("first", theme.iconGrayColor)

    const products = [
        { id: 0, img: khayal },
        { id: 1, img: group },
        { id: 2, img: family }
    ];

    return (
        <>
            <Swiper
                navigation={false}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                className="mySwiper h-[70vh] w-full"
            >
                {images.map((img, i) => (
                    <SwiperSlide
                        key={i}
                        className="h-[70vh] w-full"
                        style={{
                            background: `url(${img}) no-repeat center center`,
                            backgroundSize: 'cover'
                        }}
                    />
                ))}
            </Swiper>

            {/* <div className={`text-center ${theme.primaryColor2} md:text-4xl h-[50px] font-extrabold mt-[-330px] mb-[20px] z-90 relative px-4 `}>
        <TypeAnimation className='text-5xl ' sequence={['Find Your Next Destination', 2000, '', 1000,]}
          wrapper="h1"
          speed={50}
          repeat={Infinity}
          cursor={false}
        />
      </div> */}

            <div className={`h-auto py-4 md:py-0 md:h-28 absolute flex justify-center items-center z-90 w-full`}>
                <SearchFilter />
            </div>
            <div className={`absolute ${theme.overlayBg} z-50 h-[70vh] w-full top-0 opacity-60`}></div>
        </>
    );
}

export default OfferDisplay;
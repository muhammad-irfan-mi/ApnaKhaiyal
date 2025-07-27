import React from 'react'
import bgKhayal from '../../assets/images/Premium/bgKhayal.jpeg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Banner({ title }) {
    return (
        <>
            <div style={{ backgroundImage: `url(${bgKhayal})`, backgroundPosition: "top", backgroundSize: "cover", }}
                className="h-[52vh] w-full border">
                <div className="h-full flex items-center pl-12">
                    <div>
                        <h1 className="text-[40px] text-white font-bold">{title}</h1>
                        <div className="text-white text-lg font-light">
                            <span>Khaiyal<ChevronRightIcon /></span>
                            <span>{title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Banner;
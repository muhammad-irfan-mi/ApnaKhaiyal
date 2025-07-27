import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Context } from '../../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

function Listing() {

    const { theme } = useContext(Context)
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/post-an-ad')
    }

    return (
        <div>
            <div className='bg-white flex justify-between items-center p-3'>
                <div className={`${theme.mainbg} flex items-center py-2 px-5 rounded-full`}>
                    <input type="text" name="" id="" placeholder='Search By Title' className='font-normal outline-0'/>
                    <SearchIcon />
                </div>
                <button className={`${theme.primaryColor} ${theme.btnHover} text-white py-2 px-5 rounded-3xl`} onClick={handleNavigate}>
                    Add Listing
                </button>
            </div>
        </div>
    )
}

export default Listing

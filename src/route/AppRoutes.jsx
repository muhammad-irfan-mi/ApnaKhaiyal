import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Contact from '../Pages/conact/Contact';
import AuthPage from '../component/auth/AuthPage';
import Dashboard from '../Pages/dashboard/Dashboard';
import axios from 'axios';
import { use, useContext, useEffect } from 'react';
import { Context } from '../Context/ContextProvider';
import AllProperties from '../Pages/HouseForRent/AllProperties';
import { handleDecode } from '../utils/DecodeToken';
import TownProfile from '../Pages/town/townSite/TownProfile';
import TownListMain from '../Pages/town/townSite/TownListMain';
import SingleTownDetail from '../Pages/town/townSite/SingleTownDetail';
import AllCities from '../Pages/city/AllCities';
import ListingRouter from '../Pages/listings/ListingRouter';
import SingleProperty from '../Pages/HouseForRent/component/SingleProperty';
import KhaiyalNews from '../Pages/newsBlog/KhaiyalNews';



function AppRoutes() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { token, setToken, setUserInfo } = useContext(Context)
    const getToken = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/token`, {
                withCredentials: true
            })
            console.log(response.data.accessToken)
            setToken(response.data.accessToken);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const decodeToken = async () => {
            const KhaiyalAuth = localStorage.getItem('KhaiyalAuth')
            if (!KhaiyalAuth) return;

            const response = await handleDecode(KhaiyalAuth);
            setUserInfo(response);
        };

        decodeToken();
    }, []);

    useEffect(() => {
        getToken();
    }, [])

    const routeList = [
        { path: '/', element: <Home /> },
        { path: '/about', element: <h1>About Page</h1> },
        { path: '/contact', element: <Contact /> },
        { path: '/my-account/', element: token ? <Dashboard /> : <AuthPage /> },
        { path: '/all-properties/', element: <AllProperties /> },
        { path: '/profile-category/town-owner/', element: <TownProfile /> },
        { path: '/profile/town-owner/', element: <TownListMain /> },
        { path: '/blog/', element: <KhaiyalNews /> },
        { path: '/all-cities/', element: <AllCities /> },
        { path: '/profile/town/detail', element: <SingleTownDetail /> },
        { path: '/post-an-ad', element: <ListingRouter /> },
        { path: '/listing/singleProperty', element: <SingleProperty /> },
    ];

    return (
        <div>
            <Routes>
                {routeList.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    );
}

export default AppRoutes;

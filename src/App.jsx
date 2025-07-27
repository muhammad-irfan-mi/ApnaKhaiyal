import './App.css'
import Home from './Pages/Home/Home'
import BuySellNav from './Pages/Home/Component/BuySellNav'
import Navbar from './component/global/Navbar'
import Footer from './component/global/Footer'
import SearchFilter from './Pages/Home/Models/SearchFilter'
import LocationModal from './Pages/Home/Models/LocationModel'
import HouseForRent from './Pages/HouseForRent/AllProperties'
import Contact from './Pages/conact/Contact'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './route/AppRoutes'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <AppRoutes />
        {/* <HouseForRent /> */}
        {/* <Contact/> */}
        {/* <SearchFilter/> */}
        {/* <LocationModal/> */}
        <Footer />
        <ToastContainer position="top-right" />
      </Router>
    </>
  )
}

export default App

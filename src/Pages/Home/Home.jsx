import Navbar from '../../component/global/Navbar'
import HomeSwiper from './Component/HomeSwiper'
import BuySellNav from './Component/BuySellNav'
import RecentAdds from './Component/RecentAdds'
import KhaiyalPremiumProject from './Component/KhaiyalPremiumProject'
import Advertise from './Component/Advertise'
import Premium from './Component/Premium'
import Testimonial from './Component/Testimonial'
import MembershipCard from './Component/MembershipCard'
import ComingSoon from './Component/ComingSoon'
import TopCities from './Component/TopCities'
import KhaiyalCommunityNews from './Component/KhaiyalCommunityNews'
import KhaiyalATMCard from './Component/KhaiyalATMCard'

export default function () {
    return (
        <>
            <HomeSwiper />
            <BuySellNav />
            <RecentAdds />
            <TopCities />
            {/* <Premium /> */}
            <Advertise />
            <KhaiyalPremiumProject />
            <MembershipCard />
            <KhaiyalATMCard />
            <KhaiyalCommunityNews />
            <Testimonial />
            <ComingSoon />
        </>
    )
}
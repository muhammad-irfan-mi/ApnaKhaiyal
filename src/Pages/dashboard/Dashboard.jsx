import React, { useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardContent from './component/DashboardContent'
import Banner from '../../component/Banner/Banner';

const Dashboard = () => {

    const [active, setActive] = useState("Dashboard");

    return (
        <>
            <Banner title={'Dashboard'} />
            <div className="flex min-h-screen bg-gray-100 space-x-4 p-8">
                <DashboardSidebar active={active} onSelect={setActive} />
                <div className="flex-1 ">
                    <DashboardContent active={active} />
                </div>
            </div>
        </>
    )
}

export default Dashboard

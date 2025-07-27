import React from "react";
import person from "../../../assets/images/person.jpg";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';


const DashboardMain = ({ active }) => {

    const data = [
        {
            icon: <ListAltOutlinedIcon className="text-blue-500" fontSize="large" />,
            label: "Total Listings",
            value: 0,
            color: "bg-blue-100"
        },
        {
            icon: <CampaignOutlinedIcon className="text-green-500" fontSize="large" />,
            label: "Published Listings",
            value: 0,
            color: "bg-green-100"
        },
        {
            icon: <PendingActionsOutlinedIcon className="text-yellow-500" fontSize="large" />,
            label: "Pending Listings",
            value: 0,
            color: "bg-yellow-100"
        },
        {
            icon: <WarningAmberOutlinedIcon className="text-red-500" fontSize="large" />,
            label: "Expired Listings",
            value: 0,
            color: "bg-red-100"
        }
    ]
    return (
        <div className="space-y-4">
            <div className="w-[49%] flex items-center gap-5 bg-white p-4 rounded shadow">
                <img src={person} alt="" width="80px" className="rounded-full h-20 shadow-md" />
                <div className="text-sm">
                    <h3 className=" font-semibold">M Irfan</h3>
                    <p><span className="font-semibold">Email</span>: mirfan.dev0@gmail.com</p>
                </div>
            </div>
            <div className="flex flex-wrap justify-between gap-4">
                {data.map((item, index) => (
                    <div className="w-[49%] bg-white">
                        <div className={`flex items-center gap-3 p-4 rounded shadow`}>
                            <div className={`${item.color} w-16 h-16 flex items-center justify-center rounded-full`}>
                                {item.icon}
                            </div>
                            <div>
                                <p className="font-semibold">{item.label}</p>
                                <p className="text-xl">{item.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">Membership Report</h4>
                <p className="my-3">You have no membership.</p>
                <p>
                    You can buy a membership from <a className="text-blue-600" href="#">here</a>.
                </p>
            </div>
        </div>
    );

}



export default DashboardMain;
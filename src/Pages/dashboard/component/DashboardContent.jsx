import { useEffect, useState } from "react";
import DashboardMain from "./DashboardMain";
import axios from "axios";
import TownForm from '../../town/TownForm/TownForm'
import TownList from '../../town/TownList/TownList'
import TownPlot from "../../town/TownPlot/TownPlot";
import ProfileForm from "../../../component/global/ProfileForm";
import Listing from "../../listings/Listing";
import { toast } from "react-toastify";

const DashboardContent = ({ active }) => {
    const [logoutModal, setLogoutModal] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (active === "Logout") {
            setLogoutModal(true);
        } else {
            setLogoutModal(false);
        }
    }, [active]);

    const handleLogout = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/auth/logout`, {
                withCredentials: true
            });
            if (response.status === 200) {
                toast.success('Logout SuccesFully')
                setTimeout(() => {
                    localStorage.removeItem("KhaiyalAuth");
                    window.location.href = "/my-account/";
                }, 2000)
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (active === "Dashboard") {
        return (
            <DashboardMain />
        );
    }
    if (active === "My Listings") {
        return (
            <Listing />
        );
    }

    if (active === "Profile") {
        return (
            <ProfileForm />
        );
    }

    // town setup 
    if (active === "Add Town") {
        return (
            <TownForm />
        );
    }
    if (active === "Town List") {
        return (
            <TownList />
        );
    }
    if (active === "Town Plot") {
        return (
            <TownPlot />
        );
    }

    else if (active === "Logout") {
        return (
            logoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 opacity-80">
                    <div className="bg-white rounded-lg p-6 w-80 shadow-lg ">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h2>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setLogoutModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleLogout()}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )
        )
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{active}</h3>
        </div>
    );
}



export default DashboardContent;
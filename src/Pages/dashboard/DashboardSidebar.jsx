import React, { useContext, useState } from "react";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListNumberedRtlOutlinedIcon from '@mui/icons-material/FormatListNumberedRtlOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Context } from "../../Context/ContextProvider";


const common = [
  {
    icon: <GridViewOutlinedIcon fontSize="small" />,
    label: "Dashboard",
  },
  {
    icon: <FormatListNumberedRtlOutlinedIcon fontSize="small" />,
    label: "My Listings",
  },
  {
    icon: <AccountBalanceOutlinedIcon fontSize="small" />,
    label: "Profile",
  },
  // {
  //   icon: <FavoriteBorderOutlinedIcon fontSize="small" />,
  //   label: "Favourites",
  // },
  {
    icon: <AccountBalanceWalletOutlinedIcon fontSize="small" />,
    label: "Payments",
  },
  {
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    label: "Account Details",
  },
  {
    icon: <ExitToAppOutlinedIcon fontSize="small" />,
    label: "Logout",
  },
];

const townOwner = [
  {
    icon: <GridViewOutlinedIcon fontSize="small" />,
    label: "Dashboard",
  },
  {
    icon: <AccountBalanceOutlinedIcon fontSize="small" />,
    label: "Profile",
  },
  {
    icon: <FormatListNumberedRtlOutlinedIcon fontSize="small" />,
    label: "Add Town",
  },
  {
    icon: <AccountBalanceOutlinedIcon fontSize="small" />,
    label: "Town List",
  },
  {
    icon: <ExitToAppOutlinedIcon fontSize="small" />,
    label: "Logout",
  },
];

const DashboardSidebar = ({ active, onSelect }) => {
  const { theme, userInfo } = useContext(Context)

  return (
    <div className="w-60 h-fit bg-white shadow-md rounded">
      <h2 className="text-md font-bold px-3 py-2">My Account</h2>
      <ul className="">
        {userInfo.roles === 'TOWN OWNER' ?
          (townOwner.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(item.label)}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 border-b border-b-gray-300 text-sm ${active === item.label ? `${theme.primaryColor} text-white` : "hover:bg-gray-100"
                }`}
            >
              <span >{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))) :
          (common.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(item.label)}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 border-b border-b-gray-300 text-sm ${active === item.label ? `${theme.primaryColor} text-white` : "hover:bg-gray-100"
                }`}
            >
              <span >{item.icon}</span>
              <span>{item.label}</span>
            </div>
          )))
        }
      </ul>
    </div>
  );
}

export default DashboardSidebar;
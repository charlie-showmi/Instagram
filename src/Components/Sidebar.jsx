import React from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdOutlineWatchLater, MdSend, MdOutlineDrafts } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setOpen } from '../Redux/appSlice';

const sidebarItems = [
    {
        icon: <FaPencilAlt size={"20px"} />,
        text: "Inbox"
    },
    {
        icon: <CiStar size={"20px"} />,
        text: "Starred"
    },
    {
        icon: <MdOutlineWatchLater size={"20px"} />,
        text: "Snoozed"
    },
    {
        icon: <MdSend size={"20px"} />,
        text: "Sent"
    },
    {
        icon: <MdOutlineDrafts size={"20px"} />,
        text: "Drafts"
    },
    {
        icon: <FaChevronDown size={"20px"} />,
        text: "More"
    }
];

const Sidebar = () => {
    const dispatch = useDispatch();

    return (
        <div className='w-[15%]'>
            <div className='p-3'>
                <button
                    onClick={() => dispatch(setOpen(true))}
                    className='flex items-center gap-2 p-4 rounded-2xl hover:shadow-md bg-[#C2E7FF]'
                >
                    <FaPencilAlt size={"22px"} />
                    Compose
                </button>
            </div>
            <div className='text-gray-500'>
                {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className='flex items-center gap-2 pl-6 py-1 rounded-r-full hover:cursor-pointer hover:bg-gray-200 my-2'
                    >
                        {item.icon}
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

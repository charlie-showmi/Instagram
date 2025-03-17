import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion, CiSettings } from "react-icons/ci";
import { TbGridDots } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setUser } from '../../Redux/appSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../firebase'; // Import Firebase auth

const Navbar = () => {
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.app.User); // Ensure correct selection
  const dispatch = useDispatch();
console.log(user);

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input, dispatch]);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Log out from Firebase
      dispatch(setUser(null)); // Clear Redux state
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className='flex items-center justify-between mx-3 h-16 relative'>
      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-2'>
          <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
            <GiHamburgerMenu size={"20px"} />
          </div>
          <img
            className='w-8'
            src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png"
            alt="gmail-logo"
          />
          <h1 className='text-2xl text-gray-500 font-medium'>Gmail</h1>
        </div>
      </div>

      <div className='hidden md:block w-[50%] mr-60'>
        <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
          <IoIosSearch size={'24px'} className='text-gray-700' />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='rounded-full w-full bg-transparent outline-none px-1'
            placeholder='Search Mail'
          />
        </div>
      </div>

      <div className='hidden md:flex items-center gap-2 relative'>
        <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
          <CiCircleQuestion size={"25px"} />
        </div>
        <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
          <CiSettings size={"25px"} />
        </div>
        <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
          <TbGridDots size={"25px"} />
        </div>
        <div className='cursor-pointer relative'>
          <img
            onClick={() => setToggle(!toggle)}
            src={user?.photoURL}
            className="w-[40px] h-[40px] rounded-full"
            alt="user"
          />
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className='absolute top-12 right-0 w-[200px] bg-white rounded-lg shadow-md p-4'
              >
                <p 
                  className='p-2 cursor-pointer hover:bg-gray-200 rounded-md text-center'
                  onClick={handleLogout}
                >
                  Log Out
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdDeleteOutline, MdOutlineReport, MdOutlineMarkEmailUnread, MdOutlineWatchLater, MdOutlineAddTask, MdOutlineDriveFileMove } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../firebase';  // Ensure correct Firebase import
import { deleteDoc, doc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const Mail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const selectedEmail = useSelector(store => store.app.selectedEmail);

  const deleteMailById = async (id) => {
    if (!id) {
      console.error("Invalid email ID");
      return;
    }
    try {
      await deleteDoc(doc(db, "emails", id)); //  Correct Firestore delete function
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 10   }}
    exit={{ opacity: 0.5 }}
     className='flex-1 bg-white rounded-xl mx-5'>
      <div className='flex items-center justify-between px-4'>
        <div className='flex items-center gap-2 text-gray-700 py-2'>
          <div onClick={() => navigate("/")} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdArrowBack size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <BiArchiveIn size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineReport size={"20px"} />
          </div>
          <div onClick={() => deleteMailById(params.id)} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdDeleteOutline size={"20px"} className="text-red-500 hover:text-red-700" />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineMarkEmailUnread size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineWatchLater size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineAddTask size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <MdOutlineDriveFileMove size={"20px"} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button className='hover:rounded-full hover:bg-gray-100'><MdKeyboardArrowLeft size={'24px'} /></button>
          <button className='hover:rounded-full hover:bg-gray-100'><MdKeyboardArrowRight size={'24px'} /></button>
        </div>
      </div>
      <div className='h-[90vh] overflow-y-auto p-4'>
        {selectedEmail ? (
          <>
            <div className='flex items-center justify-between bg-white gap-1'>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-medium'>{selectedEmail.subject}</h1>
                <span className='text-sm bg-gray-200 rounded-md px-2'>Inbox</span>
              </div>
              <div className='text-gray-400 my-5 text-sm'>
                <p>
                  {selectedEmail.createdAt
                    ? new Date(selectedEmail.createdAt.seconds * 1000).toUTCString()
                    : "No Date Available"}
                </p>
              </div>
            </div>
            <div className='text-gray-500 text-sm'>
              <h1>{selectedEmail.to}</h1>
              <span>to me</span>
            </div>
            <div className='my-10'>
              <p>{selectedEmail.message || "No message available"}</p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No email selected</p>
        )}
      </div>
    </motion.div>
  );
};

export default Mail;

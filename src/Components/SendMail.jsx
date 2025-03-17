import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '../Redux/appSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const SendMail = () => {
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        message: ""
    });

    const dispatch = useDispatch();
    const open = useSelector((state) => state.app.isSendMailOpen);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!formData.to || !formData.subject || !formData.message) {
            alert("Please fill out all fields.");
            return;
        }
        try {
            await addDoc(collection(db, "emails"), {
                to: formData.to,
                subject: formData.subject,
                message: formData.message,
                createdAt: serverTimestamp(),
            });
            dispatch(setOpen(false));
            setFormData({
                to: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    if (!open) return null;

    return (
        <div className="bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md">
            <div className="flex px-3 py-2 bg-[#F2F6Fc] justify-between rounded-t-md">
                <h1>New Message</h1>
                <div
                    className="p-2 rounded-full bg-gray-200 cursor-pointer"
                    onClick={() => dispatch(setOpen(false))}
                >
                    <RxCross2 size={"10px"} />
                </div>
            </div>
            <form onSubmit={submitHandler} className="flex flex-col p-3 gap-2">
                <input
                    onChange={changeHandler}
                    name="to"
                    value={formData.to}
                    type="email"
                    placeholder="To"
                    className="outline-none py-1 border-b"
                    required
                />
                <input
                    onChange={changeHandler}
                    name="subject"
                    value={formData.subject}
                    type="text"
                    placeholder="Subject"
                    className="outline-none py-1 border-b"
                    required
                />
                <textarea
                    onChange={changeHandler}
                    value={formData.message}
                    name="message"
                    placeholder="Message..."
                    cols="30"
                    rows="10"
                    className="outline-none py-1 border-b"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-[#0B5700] rounded-full w-fit px-4 py-1 text-white font-medium"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default SendMail;

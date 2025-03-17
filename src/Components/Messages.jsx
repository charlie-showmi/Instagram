import React, { useEffect, useState } from "react";
import Message from "./Message";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../Redux/appSlice";

const Messages = () => {
  const { searchtext, emails } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  // Fetch emails from Firestore
  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setEmails(allEmails));
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Filter emails safely
  const filteredEmails = emails?.filter((email) => {
    const search = (searchtext || "").toLowerCase(); // Avoid undefined errors
    return (
      (email?.subject || "").toLowerCase().includes(search) ||
      (email?.to || "").toLowerCase().includes(search) ||
      (email?.message || "").toLowerCase().includes(search)
    );
  }) || [];

  return (
    <div>
      {filteredEmails.length > 0 ? (
        filteredEmails.map((email) => <Message key={email.id} email={email} />)
      ) : (
        <p className="text-gray-500 text-center">No emails found.</p>
      )}
    </div>
  );
};

export default Messages;


// // import React, { useEffect, useState, useMemo, useCallback } from "react";
// // import Message from "./Message";
// // import { db } from "../firebase";
// // import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setEmails } from "../Redux/appSlice";

// // const Messages = () => {
// //   const { searchtext, emails } = useSelector((store) => store.app);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
// //     const unsubscribe = onSnapshot(q, (snapshot) => {
// //       const allEmails = snapshot.docs.map((doc) => ({
// //         ...doc.data(),
// //         id: doc.id,
// //       }));
// //       dispatch(setEmails(allEmails));
// //     });

// //     return () => unsubscribe();
// //   }, [dispatch]);

// //   //  Safe filtering with empty string fallback
// //   const filteredEmails = useMemo(() => {
// //     if (!emails || !Array.isArray(emails)) return [];

// //     const search = (searchtext || "").toLowerCase(); //  Handle undefined searchtext

// //     return emails.filter((email) => {
// //       const subject = (email?.subject || "").toLowerCase(); 
// //       const recipient = (email?.to || "").toLowerCase(); 
// //       const message = (email?.message || "").toLowerCase(); 

// //       return (
// //         subject.includes(search) ||
// //         recipient.includes(search) ||
// //         message.includes(search)
// //       );
// //     });
// //   }, [searchtext, emails]);

// //   return (
// //     <div>
// //       {filteredEmails.length > 0 ? (
// //         filteredEmails.map((email) => <Message key={email.id} email={email} />)
// //       ) : (
// //         <p className="text-gray-500 text-center">No emails found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Messages;


// import React, { useEffect, useMemo } from "react";
// import Message from "./Message";
// import { db } from "../firebase";
// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// import { useDispatch, useSelector } from "react-redux";
// import { setEmails } from "../Redux/appSlice";

// const Messages = () => {
//   const { searchtext, emails } = useSelector((store) => store.app);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const allEmails = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       dispatch(setEmails(allEmails));
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   // Optimized Filtering
//   const filteredEmails = useMemo(() => {
//     if (!emails || !Array.isArray(emails)) return [];

//     const search = (searchtext || "").toLowerCase();

//     return emails.filter((email) => {
//       const subject = (email?.subject || "").toLowerCase();
//       const recipient = (email?.to || "").toLowerCase();
//       const message = (email?.message || "").toLowerCase();

//       return (
//         subject.includes(search) ||
//         recipient.includes(search) ||
//         message.includes(search)
//       );
//     });
//   }, [searchtext, emails]);

//   return (
//     <div>
//       {filteredEmails.length > 0 ? (
//         filteredEmails.map((email) => <Message key={email.id} email={email} />)
//       ) : (
//         <p className="text-gray-500 text-center">No emails found.</p>
//       )}
//     </div>
//   );
// };

// export default Messages;

// import React, { useState } from "react";
// import { doc, getDoc } from "firebase/firestore";

// const docRef = doc(db, "listings");
// const docSnapshot = await getDoc(docRef);

// export const useFirebase = async () => {
//     const docRef = doc(db, "listings");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }

//     return docSnap.data();
// };
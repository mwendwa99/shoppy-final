import React, { useState, createContext, useContext, useEffect } from 'react';
import { getFirestore, query, collection, getDocs } from 'firebase/firestore';
import { ref, getStorage, getDownloadURL } from "firebase/storage";

import firebase from '../config/firebase';

const db = getFirestore(firebase);
const dbListings = query(collection(db, "listings"));
const storage = getStorage(firebase);

const ListingsContext = createContext();

const ListingsProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const items = await getDocs(dbListings);
            // get image url from firebase storage
            const imageUrls = await Promise.all(
                items.docs.map(async (item) => {
                    const imageRef = ref(storage, `images/${item.data().image}`);
                    // const imageRef = firebase.storage().ref(`images`).child(item.data().image);
                    // const url = await imageRef.getDownloadURL();
                    getDownloadURL(imageRef).then(url => {
                        item.data().image = url;
                    });
                    return item.data().image;
                })
            );
            // set items
            // console.log('IMAGE URLS', imageUrls);
            const values = items.docs.map((listing, index) => ({
                ...listing.data(),
                id: listing.id,
                image: imageUrls[index],
            }))
            setData(values);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ListingsContext.Provider value={{ data, fetchData }}>
            {children}
        </ListingsContext.Provider>
    )
}

const useData = () => {
    const context = useContext(ListingsContext);
    return context;
}

export { ListingsProvider, useData };
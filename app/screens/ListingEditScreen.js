import React, { useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from '../components/forms';
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/forms/FormImagePicker';
import Screen from '../components/Screen';
import useLocation from '../hooks/useLocation';
import listingsApi from '../api/listings';
import colors from '../config/colors';
import firebase from '../config/firebase';

const db = getFirestore(firebase);
const listings = query(collection(db, "listings"));

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    price: Yup.number().required().min(1).max(10000).label("Price"),
    description: Yup.string().label("Description"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
    {
        backgroundColor: "#fc5c65",
        icon: "floor-lamp",
        label: "Furniture",
        value: 1,
    },
    {
        backgroundColor: "#fd9644",
        icon: "car",
        label: "Cars",
        value: 2,
    },
    {
        backgroundColor: "#fed330",
        icon: "camera",
        label: "Cameras",
        value: 3,
    },
    {
        backgroundColor: "#26de81",
        icon: "cards",
        label: "Games",
        value: 4,
    },
    {
        backgroundColor: "#2bcbba",
        icon: "shoe-heel",
        label: "Clothing",
        value: 5,
    },
    {
        backgroundColor: "#45aaf2",
        icon: "basketball",
        label: "Sports",
        value: 6,
    },
    {
        backgroundColor: "#4b7bec",
        icon: "headphones",
        label: "Movies & Music",
        value: 7,
    },
    {
        backgroundColor: "#a55eea",
        icon: "book-open-variant",
        label: "Books",
        value: 8,
    },
    {
        backgroundColor: "#778ca3",
        icon: "application",
        label: "Other",
        value: 9,
    },
];
// **********************************************************************

function ListingEditScreen() {
    const location = useLocation();
    const { user } = useContext(AuthenticatedUserContext);
    const [data, setData] = React.useState(null)
    // const db = useFirebase();
    // console.log('db', db)

    useEffect(() => {
        getCollection();
    }, [])

    const handleSubmit = async (listing) => {
        const result = await listingsApi.addListing({ ...listing, location });
        if (!result.ok)
            return alert('unable to save the listing!');
        alert('Success!');
    }

    // get collection from firebase
    const getCollection = async () => {
        // console.log('q', q)
        const querySnapshot = await getDocs(listings);
        // map values to array  
        const values = querySnapshot.docs.map(doc => doc.data());
        setData(values);
    }
    console.log('data', data)

    return (
        <Screen style={styles.container}>
            <AppForm
                initialValues={{
                    userId: user.uid,
                    title: "",
                    price: "",
                    description: "",
                    category: null,
                    images: [],
                }}
                // onSubmit={handleSubmit}
                onSubmit={(values) => console.log(values)}
                validationSchema={validationSchema}
            >
                <FormImagePicker name="images" />
                <AppFormField maxLength={255} name="title" placeholder="Title" />
                <AppFormField
                    keyboardType="numeric"
                    maxLength={8}
                    name="price"
                    placeholder="Price"
                    width={120}
                />
                <AppFormPicker
                    items={categories}
                    name="category"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Category"
                    width="50%"
                />
                <AppFormField
                    maxLength={255}
                    multiline
                    name="description"
                    numberOfLines={3}
                    placeholder="Description"
                />
                <SubmitButton title="Post" />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.white
    },
});
export default ListingEditScreen;
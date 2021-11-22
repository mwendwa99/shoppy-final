import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';

import { getFirestore, addDoc, serverTimestamp, collection } from "firebase/firestore";
import firebase from '../config/firebase';

import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from '../components/forms';
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/forms/FormImagePicker';
import Screen from '../components/Screen';
import useLocation from '../hooks/useLocation';
import colors from '../config/colors';

const db = getFirestore(firebase);

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

function ListingEditScreen({ navigation }) {
    const location = useLocation();
    const { user } = useContext(AuthenticatedUserContext);

    // post data to firebase/firestore
    const handleSubmit = async (listing) => {
        await addDoc(collection(db, "listings"),
            { ...listing, location, timestamp: serverTimestamp() }).
            then(() => {
                console.log("success");
                navigation.navigate("Home");
            }).catch(error => {
                console.log(error);
            });
    };

    // post image to firebase
    const handleImagePicked = async (image) => {
        const imageRef = collection(db, "images").doc();
        await imageRef.set({ uri: image.uri });
        return imageRef.id;
    };

    return (
        <Screen style={styles.container}>
            <StatusBar style='dark-content' />
            <AppForm
                initialValues={{
                    userId: user.uid,
                    title: "",
                    price: "",
                    description: "",
                    category: null,
                    images: [],
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                <FormImagePicker
                    name="images"
                    onImagePicked={handleImagePicked}
                />
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
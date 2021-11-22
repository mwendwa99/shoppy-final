import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
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

    const [isLoading, setIsLoading] = React.useState(false);

    // post data to firebase/firestore
    const handleSubmit = async (listing) => {
        setIsLoading(true);
        const imageUrls = [];
        const images = listing.images;
        for (let i = 0; i < images.length; i++) {
            const response = await fetch(images[i].uri);
            const blob = await response.blob();
            const ref = await addDoc(db.collection("images"), {
                name: images[i].fileName,
                createdAt: serverTimestamp(),
                owner: user.uid,
                type: "listing",
                url: await firebase.storage().ref("listings").child(images[i].fileName).put(blob).then(snapshot => snapshot.ref.getDownloadURL()),
            });
            imageUrls.push(ref.id);
        }
        const locationRef = await addDoc(db.collection("locations"), {
            name: listing.title,
            createdAt: serverTimestamp(),
            owner: user.uid,
            type: "listing",
            coordinates: new firebase.firestore.GeoPoint(location.latitude, location.longitude),
        });
        const listingRef = await addDoc(db.collection("listings"), {
            title: listing.title,
            price: listing.price,
            description: listing.description,
            category: listing.category.value,
            images: imageUrls,
            location: locationRef.id,
            createdAt: serverTimestamp(),
            owner: user.uid,
        });
        navigation.navigate("Listing", { id: listingRef.id });
    };

    //     await addDoc(collection(db, "listings"),
    //         { ...listing, location, timestamp: serverTimestamp() }).
    //         then(() => {
    //             console.log("success");
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     setIsLoading(false);
    //     navigation.navigate("Home");
    // };

    // post image to firebase
    const handleImagePicked = async (image) => {
        const imageRef = collection(db, "images").doc();
        await imageRef.set({ uri: image.uri });
        return imageRef.id;
    };

    return (
        <Screen style={styles.container}>
            <StatusBar style='dark-content' />
            <ActivityIndicator size="small" animating={isLoading} color={colors.secondary} />
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
                <SubmitButton title={
                    isLoading ? "Posting..." : "Post"
                } />
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
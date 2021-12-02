import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';

import { getFirestore, addDoc, serverTimestamp, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, child, getDownloadURL } from "firebase/storage";
import firebase from '../config/firebase';

import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
// import { useImage } from '../../context/ImageContext';
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from '../components/forms';
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/forms/FormImagePicker';
import Screen from '../components/Screen';
import useLocation from '../hooks/useLocation';
import colors from '../config/colors';
import ImagePickerComponent from '../components/ImagePickerComponent';

const db = getFirestore(firebase);
// Create a root reference
const storage = getStorage();

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
    const [url, setUrl] = React.useState(null);
    // console.log("user: ", user);

    const [isLoading, setIsLoading] = React.useState(false);

    // function to post listing to firestore
    const handleSubmit = async (listing) => {
        setIsLoading(true);
        // select images from listing
        const images = listing.image.map(image => image);

        images.map(async (image) => {
            const filename = image.substring(image.lastIndexOf('/') + 1);

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", image, true);
                xhr.send(null);
            });
            const storageRef = firebase
                .storage()
                .ref()
                .child(`images/${filename}`);


            const task = storageRef.put(blob, { contentType: 'image/jpeg' });

            task.on('state_changed',
                (snapshot) => {
                    console.log('SNAPSHOT', snapshot.totalBytes)
                },
                (err) => {
                    console.log(err)
                },
                () => {
                    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setUrl(downloadURL);
                        console.log('DOWNLOAD', downloadURL);
                    });
                })
        })

        console.log('IMAGE URLS', url);

        // create listing object
        const newListing = {
            ...listing,
            image: url,
            createdAt: serverTimestamp(),
            userId: user.uid,
            location: location,
        };

        // add listing to firestore
        await addDoc(collection(db, 'listings'), newListing);
        // navigation.navigate('Listing', { id: result.id });
        setIsLoading(false);
        navigation.navigate('Home');

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
                    image: [],
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                <FormImagePicker
                    name="image"
                />
                {/* <ImagePickerComponent
                    imageUri={url}
                    name="image"
                    onChangeImage={(image) => setUrl(image)}
                /> */}
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
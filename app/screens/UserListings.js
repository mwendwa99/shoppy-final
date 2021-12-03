// profile screen component
import React, { useContext, useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, RefreshControl, Alert } from 'react-native';
import { getFirestore, getDocs, doc, deleteDoc, where, collection, query } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native-paper';

import firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import colors from '../config/colors';

const db = getFirestore(firebase);

const UserListings = () => {
    const { user } = useContext(AuthenticatedUserContext);
    const [refreshing, setRefreshing] = useState(false);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("user", user.uid);
    // query to get all listings for the current user
    const q = query(collection(db, 'listings'), where('userId', '==', user.uid));

    useEffect(() => {
        getUserListings();
    }, []);

    // function to refresh the listings
    const onRefresh = () => {
        setRefreshing(true);
        getUserListings();
        setRefreshing(false);
    }

    // function to get user listings
    const getUserListings = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        setListings(items);
        setLoading(false);
    }

    // function to delete a listing
    const deleteListing = async (id) => {
        // alert delete
        Alert.alert('Are you sure you want to delete this listing?', '', [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
                text: 'OK', onPress: async () => {
                    // delete listing
                    const listingRef = doc(db, 'listings', id);
                    await deleteDoc(listingRef);
                    // update listings
                    getUserListings();
                    console.log("deleted");
                }
            },
        ], { cancelable: true });
    }


    return !loading ? (
        <View style={styles.container}>
            {/* render flatlist */}
            <FlatList
                data={listings}
                progressViewOffset={100}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                extraData={listings}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item, index }) => (
                    <ListItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        subTitle={`Kes: ${item.price}`}
                        Category={item.category}
                        deleteItem
                        onPress={() => deleteListing(item.id)}
                    />

                )}
            />
        </View>
    ) : (
        <ActivityIndicator
            animating={loading}
            style={{ marginTop: 200 }}
            color={colors.primary}
            size="large"
        />
    )
}

export default UserListings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,

    },
})

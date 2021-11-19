import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import routes from '../navigation/routes';
import listingsApi from '../api/listings';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

const ListingsScreen = ({ navigation }) => {
    const { data: listings, error, loading, request: loadListings } = useApi(listingsApi.getListings);
    useEffect(() => {
        loadListings();
    }, []);
    console.log(listings)


    return (
        <Screen style={styles.screen} >
            {error && <>
                <AppText>Could not receive listings</AppText>
                <AppButton title="retry" onPress={loadListings} />
            </>}
            <ActivityIndicator visible={loading} />
            <FlatList
                data={listings}
                keyExtractor={listing => listing.id.toString()}
                renderItem={({ item }) =>
                    <Card
                        title={item.title}
                        subTitle={"Kes " + item.price}
                        imageUrl={item.images[0].url}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                    />
                }
            />
        </Screen>
    )
}

export default ListingsScreen

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    }
})

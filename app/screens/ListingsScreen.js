import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
// import statement to get from firestore
import { getFirestore, query, collection, getDocs } from 'firebase/firestore';

import firebase from '../config/firebase';
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import { ActivityIndicator } from "react-native-paper";

const db = getFirestore(firebase);
const dbListings = query(collection(db, "listings"));

const listings = [
  {
    id: 0,
    title: "grey sweaters",
    price: 1000,
    image: require("../../assets/sweater.jpg"),
  },
  {
    id: 1,
    title: "black leather jacket for sale",
    price: 1500,
    image: require("../../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 40000,
    image: require("../../assets/couch.jpg"),
  },
  {
    id: 4,
    title: "Nike sneakers for sale",
    price: 5000,
    image: require("../../assets/shoes.jpg"),
  },
  {
    id: 5,
    title: "Black office chair",
    price: 3000,
    image: require("../../assets/chair.jpg"),
  },
  {
    id: 6,
    title: "King Size bed",
    price: 35000,
    image: require("../../assets/bed.jpg"),
  },
];

function ListingsScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect to get data from firestore
  useEffect(() => {
    // get data and cleanuo
    getData();
    const unsubscribe = () => {
      getData();
    }
    return unsubscribe;
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  // function to get data from firestore
  const getData = async () => {
    setLoading(true)
    try {
      const data = await getDocs(dbListings);
      // map data with id set it to varialbe
      const values = data.docs.map(listing => ({
        ...listing.data(),
        id: listing.id,
      }));
      setData(values);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }


  return data ? (
    <Screen
      style={styles.screen}>
      <StatusBar style='dark-content' />
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        extraData={data}
        keyExtractor={(data) => data.id.toString()}
        // keyExtractor={(data, index) => index}
        progressViewOffset={100}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"Kes " + item.price}
            image={item.image}
            itemId={item.id}
            navigation={navigation}
          />
        )}
      />
    </Screen>
  ) : (
    <ActivityIndicator animating={loading} color={colors.primary} size="large" />
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;

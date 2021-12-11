import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
// import statement to get from firestore
import { getFirestore, query, collection, getDocs } from 'firebase/firestore';
import { ref, getStorage, getDownloadURL } from "firebase/storage";

import firebase from '../config/firebase';
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import { ActivityIndicator } from "react-native-paper";
import AppText from "../components/AppText";
import { useData } from "../api/listings";

const db = getFirestore(firebase);
const dbListings = query(collection(db, "listings"));
const storage = getStorage(firebase);

const listings = [
  {
    id: 0,
    title: "grey sweaters",
    price: 1000,
    // image: require("../../assets/sweater.jpg"),
  },
  {
    id: 1,
    title: "black leather jacket for sale",
    price: 1500,
    // image: require("../../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 40000,
    // image: require("../../assets/couch.jpg"),
  },
  {
    id: 4,
    title: "Nike sneakers for sale",
    price: 5000,
    // image: require("../../assets/shoes.jpg"),
  },
  {
    id: 5,
    title: "Black office chair",
    price: 3000,
    // image: require("../../assets/chair.jpg"),
  },
  {
    id: 6,
    title: "King Size bed",
    price: 35000,
    // image: require("../../assets/bed.jpg"),
  },
];

function ListingsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data, fetchData } = useData();

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };


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
        progressViewOffset={100}
        renderItem={({ item }) => (
          <>
            <Card
              title={item.title}
              subTitle={"Kes " + item.price}
              image={item.image}
              itemId={item.id}
              navigation={navigation}
            />
          </>
        )}
      />
    </Screen>
  ) : (
    <View style={styles.screen}>
      <ActivityIndicator animating={loading} color={colors.primary} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;

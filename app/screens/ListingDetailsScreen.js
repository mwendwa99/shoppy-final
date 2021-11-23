import React from "react";
import { View, Image, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import { getFirestore, query, getDocs, collection } from "firebase/firestore";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import firebase from "../config/firebase";

const db = getFirestore(firebase);

function ListingDetailsScreen({ navigation }) {
  // get item from firestore
  // const dbListings = query(collection(db, "listings"));
  // const listing = getDocs(dbListings, id);

  // console.log("ListingDetailsScreen id: ", id);
  // get id from navigation



  // function to get item from firestore
  const getItem = async () => {
    const dbListings = await query(collection(db, "listings"));
    const listing = await getDocs(dbListings, id);
    return listing;
  };

  // get item from firestore
  const listing = getItem();

  console.log("listing", listing);

  return (
    <View>
      <Image style={styles.image} source={require("../../assets/couch.jpg")} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>Red jacket for sale</AppText>
        <AppText style={styles.price}>$100</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../../assets/user.jpg")}
            title="Brian Mwendwa"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;

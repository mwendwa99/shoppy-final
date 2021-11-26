import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import { getFirestore, query, getDoc, getDocs, doc, collection, where } from "firebase/firestore";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import firebase from "../config/firebase";

const db = getFirestore(firebase);

function ListingDetailsScreen({ route, navigation }) {
  const [data, setData] = useState(null);

  // get id from route
  const listingId = route.params.id;
  console.log("listing id", listingId);

  // function to get listing from firestore
  const getListing = async () => {
    try {
      const listingRef = doc(db, "listings", listingId);
      const listing = await getDoc(listingRef);
      console.log("listing", listing.data());
      setData(listing.data());
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to get listing data
  useEffect(() => {
    getListing();
  }, []);



  return (
    <View>
      <Image style={styles.image} source={require("../../assets/couch.jpg")} />
      {/* <Image style={styles.image} source={data.images[0]} /> */}
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

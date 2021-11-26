import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Chip } from 'react-native-paper';
import AppText from "../components/AppText";
import { getFirestore, getDoc, doc } from "firebase/firestore";

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
      setData(listing.data());
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to get listing data
  useEffect(() => {
    getListing();
  }, []);

  console.log("data", data);


  return data ? (
    <View>
      <Image style={styles.image} source={require("../../assets/couch.jpg")} />
      <View style={[styles.detailsContainer]}>
        <Chip
          style={[styles.chip, { backgroundColor: data.category.backgroundColor }]}
          icon={data.category.icon}
          mode="outlined"
        >
          <AppText style={[styles.title, { color: colors.white, fontStyle: 'italic' }]}>
            {data.category.label}
          </AppText>
        </Chip>
        <AppText style={styles.title}>
          name: {data.title}
        </AppText>
        <AppText style={[styles.price]}>
          price: Kes {data.price}
        </AppText>
        <AppText style={[styles.price], { fontStyle: "italic" }}>
          description: {data.description}
        </AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../../assets/user.jpg")}
            title="Brian Mwendwa"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.centered}>
      <AppText>Loading...</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    height: "100%",
  },
  image: {
    width: "100%",
    height: 300,
  },
  chip: {
    marginVertical: 4,
    padding: 4,
    height: 40,
    width: 100,
    elevation: 2,
  },
  chipText: {
    color: "#ffffff",
    fontWeight: "900"

  },
  price: {
    marginVertical: 10,
    fontWeight: "900",
    fontSize: 18,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  userContainer: {
    marginVertical: 50,
    width: "100%",
  },
});

export default ListingDetailsScreen;

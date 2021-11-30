import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import { Chip, Button } from 'react-native-elements'
import AppText from "../components/AppText";
import { getFirestore, getDoc, doc } from "firebase/firestore";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import firebase from "../config/firebase";
import { useCart } from "../../context/CartContext";

const db = getFirestore(firebase);

function ListingDetailsScreen({ route, navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // get id from route
  const listingId = route.params.id;
  // console.log("listing id", listingId);

  // function to get listing from firestore
  const getListing = async () => {
    setLoading(true);
    try {
      const listingRef = doc(db, "listings", listingId);
      const listing = await getDoc(listingRef);
      const dataObject = listing.data();
      dataObject.id = listing.id;
      setData(dataObject);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  console.log("data", data);

  // useEffect to get listing data
  useEffect(() => {
    getListing();
  }, []);

  // function to add listing to cart
  const addToCartHandler = () => {
    addToCart(data);
    navigation.navigate("Cart");
  };


  return data ? (
    <View>
      {/* <Image style={styles.image} source={require("../../assets/couch.jpg")} /> */}
      <Image style={styles.image} source={{ uri: `${data.image}` }} />
      <View style={[styles.detailsContainer]}>
        <Chip
          title={data.category.label}
          titleStyle={styles.chipTitle}
          titleProps={styles.chipTitle}
          icon={{
            name: data.category.icon,
            type: "material-community",
            size: 20,
            color: colors.white,
          }}
          type="solid"
          buttonStyle={{
            backgroundColor: data.category.backgroundColor,
            marginVertical: 10,
          }}
        />
        <AppText style={styles.title}>
          name: {data.title}
        </AppText>
        <AppText style={[styles.price]}>
          price: Kes {data.price}
        </AppText>
        <AppText style={[styles.price], { fontStyle: "italic" }}>
          description: {data.description}
        </AppText>
        <View style={styles.buttonContainer}>
          <Button
            title="Add to cart"
            type="outline"
            titleStyle={{ color: colors.primary }}
            buttonStyle={[styles.button], { borderColor: colors.primary }}
            icon={{
              name: "cart-outline",
              type: "material-community",
              color: colors.primary,
              size: 20,
            }}
            onPress={() => addToCartHandler()}
          />
          <Button
            containerStyle={styles.button}
            title="Back"
            type="outline"
            titleStyle={{ color: colors.secondary }}
            buttonStyle={{ borderColor: colors.secondary }}
            icon={{
              name: "arrow-left",
              type: "material-community",
              color: colors.secondary,
              size: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 20,
    height: "100%",
  },
  image: {
    width: "100%",
    height: 300,
  },
  chipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
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
  buttonContainer: {
    marginVertical: 50,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

  },
});

export default ListingDetailsScreen;

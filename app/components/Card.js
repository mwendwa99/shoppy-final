import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

function Card({ title, subTitle, itemId, image, navigation }) {
  // function to navigate to the listing details screen
  const handlePress = () => {
    navigation.navigate("Listings", { id: itemId });
    // console.log("itemId", itemId)
  };

  // console.log("Card itemId: ", itemId);
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View elevation={1.5} style={styles.card}>
        <Image style={styles.image} source={{ uri: `${image}` }} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;

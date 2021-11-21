import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
// import statement to get from firestore
import { getFirestore, query, collection, getDocs } from 'firebase/firestore';

import firebase from '../config/firebase';
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";

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

function ListingsScreen() {
  const [data, setData] = useState([]);
  // function to get data from firestore
  const getData = async () => {
    const data = await getDocs(dbListings);
    const values = data.docs.map(doc => doc.data());
    setData(values);
  }

  useEffect(() => {
    getData();
  }, []);

  console.log('data', data)

  return (
    <Screen style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"Kes " + item.price}
            image={item.image}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;

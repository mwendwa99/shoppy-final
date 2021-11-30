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

const db = getFirestore(firebase);
const dbListings = query(collection(db, "listings"));
const storage = getStorage(firebase);

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
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  // function to get data from firestore
  const getData = async () => {
    setLoading(true)
    try {
      const items = await getDocs(dbListings);
      // image ref to firebase storage
      // const imageRef = firebase.storage().ref("images");
      // const imageRef = firebase.storage().ref();

      // get image url from firebase storage
      const imageUrls = await Promise.all(
        items.docs.map(async (item) => {
          // const imageRef = storage.ref(item.data().image);
          const imageRef = ref(storage, `images/${item.data().image}`);
          // const url = await imageRef.getDownloadURL();
          getDownloadURL(imageRef).then(url => {
            item.data().image = url;
          });
          return item.data().image;
        })
      );
      // const url = await imageRef.child().getDownloadURL();
      // const url = await imageRef.child(item.image).getDownloadURL();
      // const url = await imageRef.child('images').getDownloadURL();
      // const url = await ref(storage, item.image).getDownloadURL();
      //     return url;
      //   })
      // );
      // set items
      console.log('IMAGE URLS', imageUrls);
      const values = items.docs.map((listing, index) => ({
        ...listing.data(),
        id: listing.id,
        image: imageUrls[index],
      }))
      setData(values);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
    <ActivityIndicator animating={loading} color={colors.primary} size="large" />
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;

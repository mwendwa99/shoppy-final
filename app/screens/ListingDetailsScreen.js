import React, { useEffect, useState, useRef } from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import { Chip, Button } from 'react-native-elements';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { getFirestore, getDoc, doc } from "firebase/firestore";
import firebase from "../config/firebase";

import AppText from "../components/AppText";
import colors from "../config/colors";
import { useCart } from "../../context/CartContext";

const db = getFirestore(firebase);
// notification params
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function ListingDetailsScreen({ route, navigation }) {
  const [data, setData] = useState(null);
  const { addToCart } = useCart();

  // notification variables
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // get id from route
  const listingId = route.params.id;

  // useEffect to get listing data
  useEffect(() => {
    getListing();

    // notification handler
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  // function to get listing from firestore
  const getListing = async () => {
    try {
      const listingRef = doc(db, "listings", listingId);
      const listing = await getDoc(listingRef);
      const dataObject = listing.data();
      dataObject.id = listing.id;
      setData(dataObject);
    } catch (err) {
      console.log(err);
    }
  };


  // function to add listing to cart
  const addToCartHandler = () => {
    addToCart(data);
    navigation.navigate("Cart");
  };


  return data ? (
    <View>
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
            onPress={async () => {
              await sendPushNotification(expoPushToken, data.title, data.price);
              addToCartHandler();
            }}
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

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken, title, price) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Item added to cart!',
    body: `${title} was added to your cart for ${price}`,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

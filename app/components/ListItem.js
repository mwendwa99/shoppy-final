import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import UserAvatar from "react-native-user-avatar";
import { Chip } from "react-native-elements";

import colors from "../config/colors";
import Icon from "./Icon";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  avatar,
  Category,
  cartCount,
  price,
  deleteItem,
  desciprtion,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {avatar ? (
            <UserAvatar
              name={title}
              size={40}
              bgColors={['#ccc', '#fafafa', '#ccaabb']}
              style={styles.avatar}
            />
          ) : null}
          {Category ? (
            <Chip
              title={Category.label}
              titleStyle={styles.chipTitle}
              titleProps={styles.chipTitle}
              icon={{
                name: Category.icon,
                type: "material-community",
                size: 20,
                color: colors.white,
              }}
              type="solid"
              buttonStyle={{
                backgroundColor: Category.backgroundColor,
                marginVertical: 10,
              }}
            />
          ) : (
            null
          )}
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          </View>
          {
            // add cart count only to the cart screen
            cartCount && title === 'My Cart' ? (
              <View style={styles.cartCount}>
                <AppText style={styles.cartCountText}>{cartCount}</AppText>
              </View>
            ) : null
          }
          {price && <AppText style={styles.price}>Price: {price}</AppText>}
          {desciprtion && <AppText style={styles.desciprtion}>{desciprtion}</AppText>}
          {deleteItem ? (
            <TouchableOpacity style={styles.delete} onPress={deleteItem}>
              <Icon
                name="trash-can-outline"
                backgroundColor={colors.danger}
                size={30}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  desciprtion: {
    fontSize: 12,
    color: colors.secondary,
    marginVertical: 5,
  },
  delete: {
    // backgroundColor: colors.danger,
    // padding: 10,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: 10,
    // elevation: 1,
  },
  price: {
    fontSize: 12,
    color: colors.secondary,
    marginVertical: 5,
  },
  cartCount: {
    position: "absolute",
    top: "50%",
    bottom: "50%",
    right: 0,
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCountText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 10,
  },
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;

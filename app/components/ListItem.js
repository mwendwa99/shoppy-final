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

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  avatar,
  Category,
  price,
  description,
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
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
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

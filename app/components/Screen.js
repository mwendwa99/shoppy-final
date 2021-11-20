import React from "react";
import { StyleSheet, View } from "react-native";

function Screen({ children, style }) {
  return (
    <View style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;

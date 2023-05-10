import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => <View style={dividerStyle.divider} />;

const dividerStyle = StyleSheet.create({
  divider: {
    borderWidth: 1,
    borderColor: "grey",
    opacity: 0.2,
    marginVertical: 2,
    marginHorizontal: 10
  }
});

export default Divider;

import React from "react";
import { View, StyleSheet } from "react-native";
import Profile from "../components/Profile/Profile";
import CustomButton from "../components/Shared/CustomButton";

const HomeScreen = ({ navigation }: { route: any, navigation: any }) => {
  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.profile}>
        <Profile />
      </View>
      <View style={homeStyle.addGameButtonCon}>
        <CustomButton
          onClick={() => navigation.navigate("AddGame")}
          style={homeStyle.buttonStyle}
          title={"Add Game"}
        />
      </View>
    </View>
  );
};

const homeStyle = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10
  },
  profile: {
    flex: 6
  },
  addGameButtonCon: {
    display: "flex",
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    width: 150,
    height: 50,
    backgroundColor: "#96c482",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.32,
    shadowRadius: 4,

    elevation: 10
  }
});

export default HomeScreen;

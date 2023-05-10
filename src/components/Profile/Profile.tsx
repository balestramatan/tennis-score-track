import React from "react";
import { StyleSheet, View } from "react-native";
import ProfilePicture from "./ProfilePicture";
import Statistics from "./Statistics";

const Profile = () => {
  return (
    <View style={profileStyle.container}>
      <View style={profileStyle.profilePicture}>
        <ProfilePicture />
      </View>
      <View style={profileStyle.statistics}>
        <Statistics />
      </View>
    </View>
  );
};

const profileStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  profilePicture: {},
  statistics: {}
});
export default Profile;

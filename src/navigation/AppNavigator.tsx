import { ActivityIndicator } from "react-native-paper";
import React, { useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const AppNavigator = () => {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  ;

  return user ? <AppStack /> : <AuthStack />;
};

export default AppNavigator;

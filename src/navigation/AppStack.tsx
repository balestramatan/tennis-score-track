import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import GamesHistoryScreen from "../screens/GamesHistory";
import LeagueTableScreen from "../screens/LeagueTableScreen";
import AddGameScreen from "../screens/AddGameScreen";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#84B117",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          minHeight: 60,
          backgroundColor: "white",
          padding: 5
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="GamesHistory"
        component={GamesHistoryScreen}
        options={{
          tabBarLabel: "Games History",
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="LeagueTable"
        component={LeagueTableScreen}
        options={{
          tabBarLabel: "League Table",
          tabBarIcon: ({ color, size }) => (
            <Icon name="table" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="AddGame"
        component={AddGameScreen}
        options={{
          tabBarLabel: "Add Game",
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

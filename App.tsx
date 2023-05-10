import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import GamesHistoryScreen from "./src/screens/GamesHistory";
import AddGameScreen from "./src/screens/AddGameScreen";
import LeagueTableScreen from "./src/screens/LeagueTableScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpSceen";
import { AuthProvider } from "./src/contexts/AuthContext";
import { MenuProvider } from "react-native-popup-menu";
import { StatisticsProvider } from "./src/contexts/StatisticsContext";
import { GamesHistoryProvider } from "./src/contexts/GamesHistoryContext";
import { LeagueTableProvider } from "./src/contexts/LeagueTableContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const LoggedInApp = () => {
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
  const app = () => {
    return (
      <MenuProvider>
        <AuthProvider>
          <StatisticsProvider>
            <GamesHistoryProvider>
              <LeagueTableProvider>
                <NativeBaseProvider>
                  <NavigationContainer>
                    <PaperProvider>
                      {userLoggedIn ? (
                        <Stack.Navigator screenOptions={{
                          headerShown: false
                        }}>
                          <Stack.Screen name="LoggedInApp" component={LoggedInApp} />
                        </Stack.Navigator>
                      ) : (
                        <Stack.Navigator screenOptions={{
                          headerShown: false
                        }}>
                          <Stack.Screen name="Login" component={LoginScreen} />
                          <Stack.Screen name="SignUp" component={SignUpScreen} />
                          <Stack.Screen name="LoggedInApp" component={LoggedInApp} />
                        </Stack.Navigator>
                      )}
                    </PaperProvider>
                  </NavigationContainer>
                </NativeBaseProvider>
              </LeagueTableProvider>
            </GamesHistoryProvider>
          </StatisticsProvider>
        </AuthProvider>
      </MenuProvider>
    );
  };
  return app();
}

export default App;

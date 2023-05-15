import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { MenuProvider } from "react-native-popup-menu";
import { StatisticsProvider } from "./src/contexts/StatisticsContext";
import { GamesHistoryProvider } from "./src/contexts/GamesHistoryContext";
import { LeagueTableProvider } from "./src/contexts/LeagueTableContext";
import AppNavigator from "./src/navigation/AppNavigator";

function App(): JSX.Element {
  return (
    <AuthProvider>
      <MenuProvider>
        <StatisticsProvider>
          <GamesHistoryProvider>
            <LeagueTableProvider>
              <NativeBaseProvider>
                <NavigationContainer>
                  <PaperProvider>
                    <AppNavigator />
                  </PaperProvider>
                </NavigationContainer>
              </NativeBaseProvider>
            </LeagueTableProvider>
          </GamesHistoryProvider>
        </StatisticsProvider>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;

import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import GamesList from "../components/GamesHistory/GamesList";
import { fetchUserGames } from "../fetchers/gamesFetchers";
import { AuthContext } from "../contexts/AuthContext";
import { GamesHistoryContext } from "../contexts/GamesHistoryContext";
import { ActivityIndicator } from "react-native-paper";

const GamesHistoryScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { games, setGames } = useContext(GamesHistoryContext);
  const fetchGamesHistory = async () => {
    setIsLoading(true);
    const games = await fetchUserGames(user?.id);
    setGames(games);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGamesHistory().then(() => console.log("fetched games history..."));
  }, []);

  if (isLoading) {
    return (
      <View style={gamesHistoryStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#96c482" />
      </View>
    );
  }

  if (games.length === 0) return <View
    style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>No games</Text>
  </View>;

  return (
    <ScrollView style={gamesHistoryStyle.container}>
      <GamesList games={games} />
    </ScrollView>
  );
};

const gamesHistoryStyle = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
  },
  loadingContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default GamesHistoryScreen;

import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import GamesList from "../components/GamesHistory/GamesList";
import { fetchUserGames } from "../fetchers/gamesFetchers";
import { AuthContext } from "../contexts/AuthContext";
import { GamesHistoryContext } from "../contexts/GamesHistoryContext";

const GamesHistoryScreen = () => {
  const { user } = useContext(AuthContext);
  const { games, setGames } = useContext(GamesHistoryContext);
  const fetchGamesHistory = async () => {
    const games = await fetchUserGames(user?.id);

    console.log("games[0].matches ::");
    console.log(games[0].matches);
    setGames(games);
  };

  useEffect(() => {
    fetchGamesHistory().then(() => console.log("fetched games history..."));
  }, []);

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
  }
});

export default GamesHistoryScreen;

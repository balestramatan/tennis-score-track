import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import GameScore from "./GameScore";
import { IGame } from "../../interfaces/game";

interface IProps {
  games: IGame[];
}

const GamesList = (props: IProps) => {
  const { games } = props;

  return (
    <View style={GamesListStyle.container}>
      <ScrollView
        contentContainerStyle={GamesListStyle.gamesContainer}
        showsVerticalScrollIndicator={false}>
        {games?.map((game: IGame) => <GameScore key={game.id} game={game} />)}
      </ScrollView>
    </View>
  );
};

const GamesListStyle = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    marginTop: 40
  },
  gamesContainer: {
    display: "flex",
    flex: 1
  }
});

export default GamesList;

import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { IGame } from "../../interfaces/game";
import PlayerName from "./PlayerName";
import MatchResult from "./MatchResult";
import Divider from "../Shared/Divider";
import CustomText from "../Shared/CustomText";

export interface IProps {
  game: IGame;
}

const GameScore = (props: IProps) => {
  const { game } = props;
  return (
    <View style={gameScoreStyle.container}>
      <View style={gameScoreStyle.date_location_container}>
        <CustomText style={{ paddingTop: 5, paddingHorizontal: 10 }}>
          {game.date}
        </CustomText>
        <View style={gameScoreStyle.location_container}>
          <Icon name="location-outline" size={12} />
          <CustomText>
            {game.location.trim()}
          </CustomText>
        </View>
      </View>
      <Divider />
      <View style={gameScoreStyle.scoreContainer}>
        <View style={gameScoreStyle.name_container1}>
          {game.winner_name === game.player1_name ? <Icon name="trophy-outline" size={15} color="orange" /> :
            <Icon name="trophy-outline" size={15} color="white" />}
          <PlayerName name={game.player1_name} winner_name={game.winner_name} />
        </View>
        <View style={gameScoreStyle.matches_container}>
          <MatchResult matchResult={game.matches} />
        </View>
        <View style={gameScoreStyle.name_container2}>
          <PlayerName name={game.player2_name} winner_name={game.winner_name} />
          {game.winner_name === game.player2_name ? <Icon name="trophy-outline" size={15} color="orange" /> :
            <Icon name="trophy-outline" size={15} color="white" />}
        </View>
      </View>
    </View>
  );
};

const gameScoreStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 12,
    borderWidth: 2,
    borderColor: "#e9f5cf",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.37,
    shadowRadius: 4,

    elevation: 12
  },
  date_location_container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  location_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 10,
    height: 50
  },
  name_container1: {
    flex: 3,
    flexWrap: "wrap",
    flexDirection: "row-reverse"
  },
  name_container2: {
    flex: 3,
    flexDirection: "row-reverse"
  },
  matches_container: {
    flex: 3,
    alignItems: "center"
  }
});

export default GameScore;

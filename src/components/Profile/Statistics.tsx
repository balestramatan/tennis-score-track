import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../Shared/CustomText";
import { getStatistics } from "../../fetchers/userFetchers";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthContextType } from "../../interfaces/userInterfaces";
import { StatisticsResponse } from "../../infrastructure/Responses.interface";
import { StatisticsContext } from "../../contexts/StatisticsContext";

const Statistics = () => {
  const { matches, wins, losses, setWins, setMatches, winRate, setWinRate, setLosses } = useContext(StatisticsContext);

  useEffect(() => {
    setWinRate(calcWinRate());
  }, [matches, wins, losses]);

  const calcWinRate = (): number => {
    if (matches === 0) return 0;
    return parseFloat(Math.abs((wins / matches) * 100).toFixed(2));
  };

  const userContext = useContext<AuthContextType>(AuthContext);
  const fetchStatistics = async () => {
    const stats: StatisticsResponse = await getStatistics(userContext.user?.id);

    console.log("stats ::");
    console.log(stats);
    
    setWins(stats.wins || 0);
    setLosses(stats.losses || 0);
    setMatches(stats.wins + stats.losses || 0);
  };

  useEffect(() => {
    fetchStatistics().then(() => console.log("statistics fetched"));
  }, []);

  return (
    <View style={statisticsStyle.container}>
      <View style={statisticsStyle.statisticsContainer}>
        <View style={statisticsStyle.individualStatsContainer}>
          <CustomText style={statisticsStyle.title}>Matches</CustomText>
          <CustomText style={statisticsStyle.matches}>{matches}</CustomText>
        </View>
        <View style={statisticsStyle.individualStatsContainer}>
          <CustomText style={statisticsStyle.title}>Wins</CustomText>
          <CustomText style={statisticsStyle.wins}>{wins}</CustomText>
        </View>
        <View style={statisticsStyle.individualStatsContainer}>
          <CustomText style={statisticsStyle.title}>Losses</CustomText>
          <CustomText style={statisticsStyle.losses}>{losses}</CustomText>
        </View>
      </View>
      <View style={statisticsStyle.winRate}>
        <CustomText style={statisticsStyle.title}>Win Rate</CustomText>
        <CustomText
          style={winRate > 50 ? statisticsStyle.winRateTextPositive : statisticsStyle.winRateTextNegative}>{winRate + "%"}</CustomText>
      </View>
    </View>
  );
};

const statisticsStyle = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10
  },
  individualStatsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 26,
    color: "grey"
  },
  statisticsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20
  },
  matches: { fontSize: 22, color: "black" },
  wins: { fontSize: 22, color: "#6C935C" },
  losses: { fontSize: 22, color: "#cd5c5c" },
  winRate: {
    display: "flex",
    alignItems: "center"
  },
  winRateTextPositive: {
    fontSize: 24,
    color: "#6C935C"
  },
  winRateTextNegative: {
    fontSize: 24,
    color: "#cd5c5c"
  }
});

export default Statistics;

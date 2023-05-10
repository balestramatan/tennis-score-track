import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { DataTable } from "react-native-paper";
import { fetchLeagueTableStats } from "../fetchers/leaugeTableFetchers";
import {
  PlayerStatsResponse
} from "../infrastructure/Responses.interface";
import { LeagueTableContext } from "../contexts/LeagueTableContext";

const LeagueTableScreen = () => {
  const { leagueTableStats, setLeagueTableStats } = useContext(LeagueTableContext);
  const _fetchLeagueTableStats = async () => {
    try {
      const leagueTableStats: PlayerStatsResponse[] = await fetchLeagueTableStats();
      leagueTableStats.sort((a, b) => {
        if (a.statistics[0].wins > b.statistics[0].wins) return -1;
        if (a.statistics[0].wins < b.statistics[0].wins) return 1;
        return 0;
      });

      setLeagueTableStats(leagueTableStats);
    } catch (error) {
      console.log("error ::", error);
    }
  };

  useEffect(() => {
    _fetchLeagueTableStats().then(() => console.log("fetched table data..."));
  }, []);
  return (
    <View style={leagueStyles.container}>
      <View style={leagueStyles.titleCon}>
        <Text style={leagueStyles.title}>League Table</Text>
      </View>
      <View style={leagueStyles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>PLayer Name</DataTable.Title>
            <DataTable.Title numeric>G</DataTable.Title>
            <DataTable.Title numeric>W</DataTable.Title>
            <DataTable.Title numeric>L</DataTable.Title>
          </DataTable.Header>

          {
            leagueTableStats?.map((playerStats) => {
              return (
                <DataTable.Row key={playerStats.id.toString()}>
                  <DataTable.Cell>{playerStats.first_name}</DataTable.Cell>
                  <DataTable.Cell
                    numeric>{playerStats.statistics[0].wins + playerStats.statistics[0].losses}</DataTable.Cell>
                  <DataTable.Cell numeric>{playerStats.statistics[0].wins}</DataTable.Cell>
                  <DataTable.Cell numeric>{playerStats.statistics[0].losses}</DataTable.Cell>
                </DataTable.Row>
              );
            })
          }
        </DataTable>
      </View>
    </View>
  );
};

const leagueStyles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 50
  },
  titleCon: {
    display: "flex",
    alignSelf: "center",
    margin: 10
  },
  title: {
    fontSize: 26,
    color: "grey"
  },
  table: {
    margin: 5,
    marginTop: 30
  }
});

export default LeagueTableScreen;

import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { getAllUsers } from "../fetchers/userFetchers";
import { ISelect, MatchesSelection } from "../interfaces/shared";
import PlayersAndGamesCountStep from "../components/AddGame/PlayersAndGamesCountStep";
import MatchesScorePicker from "../components/AddGame/MatchesScorePicker";
import { matchesSelectionValidation } from "../utils/validations";
import LocationStep from "../components/AddGame/LocationStep";
import { addGame } from "../fetchers/gamesFetchers";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import { StatisticsContext } from "../contexts/StatisticsContext";
import { IGame } from "../interfaces/game";
import { GamesHistoryContext } from "../contexts/GamesHistoryContext";
import { UploadGameReq } from "../infrastructure/Requests.interfaces";
import { LeagueTableContext } from "../contexts/LeagueTableContext";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const gamesOptions = [
  { _id: "1", value: "1" },
  { _id: "2", value: "2" },
  { _id: "3", value: "3" }
];
const AddGameScreen = () => {
  const { user } = useContext(AuthContext);
  const { matches, wins, losses, setWins, setMatches, setLosses } = useContext(StatisticsContext);
  const { games, setGames } = useContext(GamesHistoryContext);
  const { leagueTableStats, setLeagueTableStats } = useContext(LeagueTableContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playersOptions, setPlayersOptions] = useState<ISelect[]>([]);
  const [player1Selection, setPlayer1Selection] = useState<string>(user?.first_name + " " + user?.last_name);
  const [player1_id, setPlayer1_id] = useState<string>(user!.id.toString());
  const [player2Selection, setPlayer2Selection] = useState<string>(user?.first_name + " " + user?.last_name);
  const [player2_id, setPlayer2_id] = useState<string>(user!.id.toString());
  const [gamesCountSelection, setGamesCountSelection] = useState<string>("1");
  const [matchesSelection, setMatchesSelection] = useState<MatchesSelection[]>([]);
  const [cities, setCities] = useState<ISelect[]>([]);
  const [citySelection, setCitySelection] = useState<string>("");
  const [errors, setErrors] = useState<boolean>(false);

  const navigate = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  let selectsList: ISelect[] = [];

  for (let i = 0; i < parseInt(gamesCountSelection); i++) {
    selectsList.push({
      _id: (i + 1).toString(),
      value: (i + 1).toString()
    });
  }
  const _getAllPlayers = async () => {
    try {
      let playersOptions: ISelect[] = [];
      const players = await getAllUsers();

      players.forEach((player) => {
        playersOptions.push({
          _id: player.id.toString(),
          value: player.first_name + " " + player.last_name
        });
      });

      setPlayersOptions(playersOptions);
    } catch (error) {
      console.log("error ::", error);
    }
  };

  useEffect(() => {
    _getAllPlayers().then(() => console.log("fetched players..."));
  }, []);

  const onMatchesChange = (value: any, player: string, match: number) => {
    matchesSelection[match - 1] = {
      match: match,
      player1_score: player === "player1" ? parseInt(value) : matchesSelection[match - 1]?.player1_score || 0,
      player2_score: player === "player2" ? parseInt(value) : matchesSelection[match - 1]?.player2_score || 0
    };
    setMatchesSelection(matchesSelection);
  };

  const playersAndGamesCountValidation = () => {
    if (!player1Selection || !player2Selection || !gamesCountSelection) {
      alert("Please select all fields");
      setErrors(true);
      return false;
    }
    if (player1Selection === player2Selection) {
      alert("Did you play with yourself?");
      setErrors(true);
      return false;
    }
    setErrors(false);
    return true;
  };

  const matchesValidation = () => {
    if (!matchesSelectionValidation(matchesSelection)) {
      alert("Please fill all matches correctly");
      setErrors(true);
      return false;
    }
    setErrors(false);
    return true;
  };

  const findWinner = (matchesSelection: MatchesSelection[]) => {
    let player1Score: number = 0;
    let player2Score: number = 0;

    matchesSelection.forEach((match: MatchesSelection) => {
      if (match.player1_score > match.player2_score) {
        player1Score++;
      } else if (match.player1_score < match.player2_score) {
        player2Score++;
      }
    });

    return player1Score > player2Score ? playersOptions.filter((u) => u._id === player1_id)[0]._id : playersOptions.filter((u) => u._id === player2_id)[0]._id;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    await uploadGame();
    setIsLoading(false);
  };

  const uploadGame = async () => {
    const winner_id = findWinner(matchesSelection);

    const game: UploadGameReq = {
      player1_id,
      player2_id,
      winner_id,
      games_count: gamesCountSelection,
      matches: matchesSelection,
      location: citySelection
    };

    const looser_id = winner_id === player1_id ? player2_id : player1_id;

    const data = await addGame(game, user?.id);

    try {
      await updateStatistics(winner_id);
      await updateGameHistory(data.game);
      await updateLeagueTable(winner_id, looser_id);

      alert("Game uploaded successfully");
    } catch (error) {
      console.log("error ::", error);
      alert("Error uploading game");
    }
  };

  const updateStatistics = async (winner_id: string) => {
    if (winner_id === user?.id.toString()) await setWins(wins + 1);
    if (winner_id !== user?.id.toString()) await setLosses(losses + 1);
    await setMatches(matches + 1);
  };

  const updateGameHistory = async (game: IGame) => {
    let gameToAdd: IGame = {
      id: game.id,
      player1_id: game.player1_id,
      player1_name: player1Selection,
      player2_id: game.player2_id,
      player2_name: player2Selection,
      winner_id: game.winner_id,
      winner_name: game.winner_id === player1_id ? player1Selection : player2Selection,
      date: new Date().toISOString().split("T")[0],
      location: game.location.trim(),
      matches: game.matches
    };
    await setGames([...games, gameToAdd]);
  };

  const updateLeagueTable = async (winner_id: string, looser_id: string) => {
    let newLeagueTableStats = [...leagueTableStats];
    newLeagueTableStats.forEach((stat) => {
      if (stat.id === parseInt(winner_id)) stat.statistics[0].wins++;
      if (stat.id === parseInt(looser_id)) stat.statistics[0].losses++;
    });

    setLeagueTableStats(newLeagueTableStats);
  };

  if (isLoading) {
    return (
      <View style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"#96c482"} size={"large"} />
      </View>
    );
  }

  return (
    <View style={addGameStyle.container}>
      <ProgressSteps progressBarColor={"#96c482"}>
        <ProgressStep
          label="Players & Games"
          nextBtnTextStyle={{ color: "#96c482", fontSize: 22 }}
          errors={errors}
          onNext={playersAndGamesCountValidation}>
          <PlayersAndGamesCountStep
            addGameStyle={addGameStyle}
            playersOptions={playersOptions}
            player1Selection={player1Selection}
            setPlayer1Selection={setPlayer1Selection}
            setPlayer1_id={setPlayer1_id}
            setPlayer2_id={setPlayer2_id}
            player2Selection={player2Selection}
            setPlayer2Selection={setPlayer2Selection}
            gamesOptions={gamesOptions}
            gamesCountSelection={gamesCountSelection}
            setGamesCountSelection={setGamesCountSelection}
          />
        </ProgressStep>
        <ProgressStep
          label="Matches"
          onNext={matchesValidation}
          errors={errors}
          nextBtnTextStyle={{ color: "#96c482", fontSize: 22 }}
          previousBtnTextStyle={{ color: "#96c482", fontSize: 22 }}>
          <View>
            {
              selectsList.map((select: ISelect, index: number) => {
                return (
                  <MatchesScorePicker
                    key={index}
                    select={select}
                    player1Selection={player1Selection}
                    player2Selection={player2Selection}
                    gamesCountSelection={gamesCountSelection}
                    addGameStyle={addGameStyle}
                    onMatchesChange={onMatchesChange}
                  />
                );
              })
            }
          </View>
        </ProgressStep>
        <ProgressStep
          label="Location"
          nextBtnTextStyle={{ color: "#96c482", fontSize: 22 }}
          previousBtnTextStyle={{ color: "#96c482", fontSize: 22 }}
          errors={errors}
          onSubmit={onSubmit}>
          <View>
            <LocationStep
              cities={cities}
              citySelection={citySelection}
              setCities={setCities}
              setCitySelection={setCitySelection}
            />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const addGameStyle = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    margin: 20
  },
  inputsContainer: {},
  matchesContainer: {
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10
  },
  matchInputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    margin: 12,
    padding: 5
  },
  matchText: {
    fontSize: 12
  },
  vs: {
    fontSize: 12
  }
});

export default AddGameScreen;

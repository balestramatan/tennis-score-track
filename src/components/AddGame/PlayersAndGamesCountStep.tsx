import React from "react";
import { View, StyleSheet } from "react-native";
import IPicker from "../Shared/IPicker";
import { ISelect } from "../../interfaces/shared";

export interface IProps {
  addGameStyle: any;
  playersOptions: ISelect[];
  player1Selection: string;
  setPlayer1Selection: (select: string) => void;
  setPlayer1_id: (select: string) => void;
  setPlayer2_id: (select: string) => void;
  player2Selection: string;
  setPlayer2Selection: (select: string) => void;
  gamesOptions: ISelect[];
  gamesCountSelection: string;
  setGamesCountSelection: (select: string) => void;
}

const PlayersAndGamesCountStep = (props: IProps) => {
  const {
    addGameStyle,
    playersOptions,
    player1Selection,
    player2Selection,
    setPlayer1Selection,
    setPlayer1_id,
    setPlayer2_id,
    setPlayer2Selection,
    setGamesCountSelection,
    gamesCountSelection,
    gamesOptions
  } = props;

  return (
    <View style={addGameStyle.inputsContainer}>
      <View>
        <IPicker
          label={"Player One"}
          options={playersOptions}
          selection={player1Selection}
          setID={setPlayer1_id}
          setSelection={setPlayer1Selection}
          style={firstPickerStyle}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <IPicker
          label={"Player Two"}
          options={playersOptions}
          selection={player2Selection}
          setID={setPlayer2_id}
          setSelection={setPlayer2Selection}
          style={firstPickerStyle}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <IPicker
          label={"Games Count"}
          options={gamesOptions}
          selection={gamesCountSelection}
          setSelection={setGamesCountSelection}
          style={firstPickerStyle}
        />
      </View>
    </View>
  );
};

const firstPickerStyle = StyleSheet.create({
  container: {
    overflow: "scroll"
  },
  picker: {
    height: 90
  },
  item: {
    height: 120
  }
});

export default PlayersAndGamesCountStep;

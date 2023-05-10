import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../Shared/CustomText";
import IPicker from "../Shared/IPicker";
import { ISelect } from "../../interfaces/shared";

const matchesOptions = [
  { _id: "1", value: "1" },
  { _id: "2", value: "2" },
  { _id: "3", value: "3" },
  { _id: "4", value: "4" },
  { _id: "5", value: "5" },
  { _id: "6", value: "6" },
  { _id: "7", value: "7" }
];

interface IProps {
  select: ISelect;
  addGameStyle: any;
  gamesCountSelection: string;
  player1Selection: string;
  player2Selection: string;
  onMatchesChange: any;
}

const MatchesScorePicker = (props: IProps) => {
  const [player1Score, setPlayer1Score] = useState<string>("");
  const [player2Score, setPlayer2Score] = useState<string>("");

  const {
    select,
    addGameStyle,
    player1Selection,
    player2Selection,
    onMatchesChange
  } = props;

  useEffect(() => {
    handleChanges("1", "player1", parseInt(select._id), select._id);
    handleChanges("1", "player2", parseInt(select._id), select._id);
  }, []);

  const handleChanges = (value: any, player: string, match: number, selectId: any) => {
    if (player === "player1") setPlayer1Score(value);
    else setPlayer2Score(value);
    onMatchesChange(value, player, parseInt(selectId));
  };

  return (
    <View key={`outsider_view_${select._id}`}>
      <View key={`nested_view_1_${select._id}`} style={addGameStyle.matchesContainer}>
        <View key={`nested_view_2_${select._id}`} style={addGameStyle.matchInputContainer}>
          <CustomText key={`custom_text_match_1_${select._id}`}
                      style={addGameStyle.matchText}>{player1Selection}</CustomText>
          <IPicker
            options={matchesOptions}
            selection={player1Score}
            setSelection={(value) => handleChanges(value, "player1", parseInt(select._id), select._id)}
            style={secondPickerStyle}
          />
        </View>
        <CustomText key={`custom_text_title_${select._id}`}
                    style={addGameStyle.matchText}>Match {select.value}</CustomText>
        <View key={`nested_view_3_${select._id}`} style={addGameStyle.matchInputContainer}>
          <CustomText key={`custom_text_match_2_${select._id}`}
                      style={addGameStyle.matchText}>{player2Selection}</CustomText>
          <IPicker
            options={matchesOptions}
            selection={player2Score}
            setSelection={(value) => handleChanges(value, "player2", parseInt(select._id), select._id)}
            style={secondPickerStyle}
          />
        </View>
      </View>
    </View>
  );
};


const secondPickerStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: 130
  },
  picker: {},
  item: {
    height: 120,
    width: 100
  }
});
export default MatchesScorePicker;

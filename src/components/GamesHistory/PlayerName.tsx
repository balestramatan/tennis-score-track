import React from "react";
import { Text } from "react-native";
import CustomText from "../Shared/CustomText";

interface IProps {
  name: string;
  winner_name: string;
}

const PlayerName = (props: IProps) => {
  return (
    <CustomText>
      {props.winner_name === props.name ? <Text style={{ fontWeight: "800" }}>{props.name}</Text> : props.name}
    </CustomText>
  );
};

export default PlayerName;

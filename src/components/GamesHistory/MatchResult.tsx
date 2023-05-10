import React, { useEffect, useState } from "react";
import { View } from "react-native";
import CustomText from "../Shared/CustomText";
import { MatchesSelection } from "../../interfaces/shared";

interface IProps {
  matchResult: MatchesSelection[];
}

const MatchResult = (props: IProps) => {
  const [matchResult, setMatchResult] = useState<string[]>([]);

  useEffect(() => {
    let mr: string[] = [];
    props.matchResult?.forEach((m, index) => {
      mr.push(`${m.player1_score}-${m.player2_score}`);
    });
    setMatchResult(mr);
  }, []);

  return (
    <View>
      {matchResult?.map((r, index) => <CustomText key={index}>
        {r}
      </CustomText>)}
    </View>
  );
};

export default MatchResult;

import React from "react";
import { View, StyleSheet } from "react-native";
import { ISelect } from "../../interfaces/shared";
import { Picker } from "@react-native-picker/picker";
import CustomText from "./CustomText";

export interface IProps {
  label?: string;
  options: ISelect[];
  selection: string;
  style: any;
  setSelection: (number: string) => void;
  setID?: (number: string) => void;
}

const IPicker = (props: IProps) => {
  const { label, options, selection, style, setSelection, setID } = props;

  const handleOnValueChange = (value: any, index: number) => {
    setSelection(value);
    setID && setID(options[index]._id);
  };

  return (
    <View key={label} style={style.container}>
      <CustomText style={{ alignSelf: "center" }}>{label}</CustomText>
      <Picker
        key={label}
        itemStyle={style.item}
        style={style.picker}
        selectedValue={selection}
        onValueChange={(itemValue, itemIndex) => handleOnValueChange(itemValue, itemIndex)}>
        {options.map((option) => {
          return (
            <Picker.Item key={option._id} label={option.value} value={option.value} />
          );
        })}
      </Picker>
    </View>
  );
};

export default IPicker;

import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

interface IProps {
  onClick?: any;
  style?: any;
  title: any;
}

const CustomButton = (props: IProps) => {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={props.onClick}
    >
      <CustomText
        style={{
          color: "white",
          fontSize: 18
        }}>
        {props.title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default CustomButton;

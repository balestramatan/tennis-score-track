import React from "react";
import { Text, Platform } from "react-native";

interface IProps {
  children: any;
  style?: any;
  onClick?: any;
}

const CustomText = (props: IProps) => {
  const { children, style, onClick } = props;
  return (
    <Text key={children} style={[{
      fontFamily: Platform.OS == "ios" ? "AppleSDGothicNeo-Regular" : "normal"
    }, style]}
          onPress={onClick}>
      {children}
    </Text>
  );
};

export default CustomText;

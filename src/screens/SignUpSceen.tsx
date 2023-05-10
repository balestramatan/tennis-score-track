import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { signUp } from "../fetchers/userFetchers";
import CustomText from "../components/Shared/CustomText";
import CustomButton from "../components/Shared/CustomButton";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setError("");
  }, [firstName, lastName, phoneNumber, password]);

  const validation = () => {
    if (!firstName || !lastName || !phoneNumber || !password) {
      setError("Form must be filled");
      return false;
    } else return true;
  };
  const handleSignUp = async () => {
    if (!validation()) return;
    try {
      await signUp(firstName, lastName, phoneNumber, password);

      navigate.replace("LoggedInApp");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={signUpStyle.container} keyboardShouldPersistTaps="handled">
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 32 }}>Sign Up</Text>
      <TextInput
        style={{
          width: "80%", height: 48, borderWidth: 1, padding: 8, marginBottom: 16,
          borderColor: "grey",
          borderRadius: 8
        }}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={{
          width: "80%", height: 48, borderWidth: 1, padding: 8, marginBottom: 16,
          borderColor: "grey",
          borderRadius: 8
        }}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
      <TextInput
        style={{
          width: "80%", height: 48, borderWidth: 1, padding: 8, marginBottom: 16,
          borderColor: "grey",
          borderRadius: 8
        }}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        maxLength={10}
        value={phoneNumber}
      />
      <TextInput
        style={{
          width: "80%", height: 48, borderWidth: 1, padding: 8, marginBottom: 16,
          borderColor: "grey",
          borderRadius: 8
        }}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {error ? <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text> : null}

      <CustomButton title={"Sign Up"} onClick={handleSignUp} style={signUpStyle.signUpButton} />

      <CustomText style={{ marginTop: 20 }} onClick={() => navigate.replace("Login")}>Already a member?
        login</CustomText>
    </ScrollView>
  );
};

const signUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  signUpButton: {
    width: "80%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "#6C935C",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.32,
    shadowRadius: 4,

    elevation: 10
  }
});

export default SignUpScreen;

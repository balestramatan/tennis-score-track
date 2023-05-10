import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  TextInput,
  ScrollView
} from "react-native";
import CustomText from "../components/Shared/CustomText";
import CustomButton from "../components/Shared/CustomButton";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { login } from "../fetchers/userFetchers";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextType } from "../interfaces/userInterfaces";
import { storeData } from "../utils/asyncStorgae";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { setUser } = useContext<AuthContextType>(AuthContext);

  useEffect(() => {
    setError("");
  }, [phoneNumber, password]);

  const validation = () => {
    if (!phoneNumber || !password) {
      setError("Form must be filled");
      return false;
    } else return true;
  };

  const handleLogin = async () => {
    if (!validation()) return;

    setLoading(true);
    try {
      const user = await login(phoneNumber, password);
      await storeData("user", user);
      setUser(user);
      navigate.replace("LoggedInApp");
    } catch (error: any) {
      console.log(error);
      setError("Failed to login");
    }
    setLoading(false);
  };

  const handleOnLoginClick = () => navigate.replace("SignUp");

  return (
    <ScrollView contentContainerStyle={loginStyle.container} keyboardShouldPersistTaps="handled">
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 32 }}>
        Login
      </Text>
      <TextInput
        style={{
          width: "80%",
          borderColor: "grey",
          borderRadius: 8,
          height: 48,
          borderWidth: 1,
          padding: 8,
          marginBottom: 16
        }}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <TextInput
        style={{
          width: "80%",
          borderColor: "grey",
          borderRadius: 8,
          height: 48,
          borderWidth: 1,
          padding: 8,
          marginBottom: 16
        }}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {error ? (
        <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>
      ) : null}

      <CustomButton
        title={loading ? <ActivityIndicator color="white" /> : "Login"}
        onClick={handleLogin}
        style={loginStyle.loginButton}
      />

      <CustomText style={{ marginTop: 20 }} onClick={handleOnLoginClick}>
        Not a member? sign in
      </CustomText>
    </ScrollView>
  );
};

const loginStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  loginButton: {
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

export default LoginScreen;

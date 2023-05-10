import { PermissionsAndroid } from "react-native";

export const getAndroidCameraPermission = async () => {
  return await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: "App Camera Permission",
      message: "App needs access to your camera ",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
};

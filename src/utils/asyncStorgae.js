import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

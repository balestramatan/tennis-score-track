import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    if (typeof value === "object") {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
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

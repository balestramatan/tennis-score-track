import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

import { launchCamera, launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";
import QuestionMark from "../../assets/icons/qm.png";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import Divider from "../Shared/Divider";
import { getData, storeData } from "../../utils/asyncStorgae";

const ProfilePicture = () => {
  const [savedImageURL, setSavedImageURL] = useState<any>(false);

  useEffect(() => {
    const getImage = async () => {
      const image = await getData("userImage");
      image && setSavedImageURL(image);
    };
    getImage().then(() => {
    });
  }, []);

  const handleChoosePhoto = async () => {
    const imageFromLibResponse: ImagePickerResponse = await launchImageLibrary({ mediaType: "photo" });
    await applyImageChange(imageFromLibResponse);
  };

  const handleTakePhoto = async () => {
    const imageFromCamera: ImagePickerResponse = await launchCamera({ mediaType: "photo" });
    await applyImageChange(imageFromCamera);
  };

  const applyImageChange = async (response: ImagePickerResponse) => {
    if (response.didCancel) return;
    if (response.errorMessage) return alert(response.errorMessage);
    if (!response.assets || !response.assets[0].uri) return;

    await storeData("userImage", response.assets[0].uri);
    setSavedImageURL(response.assets[0].uri);
  };

  return (
    <View style={profilePictureStyle.container}>
      <Menu>
        <MenuTrigger triggerOnLongPress={true} customStyles={triggerStyles}>
          <Image source={!savedImageURL ? QuestionMark : { uri: savedImageURL }}
                 style={profilePictureStyle.image} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={optionsContainerStyle}>
          <MenuOption onSelect={handleChoosePhoto} text="Choose From Gallery" />
          <Divider />
          <MenuOption onSelect={handleTakePhoto} text="Take A Picture" />
        </MenuOptions>
      </Menu>
    </View>
  );
};

const profilePictureStyle = StyleSheet.create({
  container: {
    borderRadius: 100,
    marginTop: 80,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 10
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white"
  }
});

const triggerStyles = {
  triggerWrapper: {
    padding: 2
  },
  TriggerTouchableComponent: TouchableWithoutFeedback
};

const optionsContainerStyle = {
  padding: 5,
  backgroundColor: "white",
  borderRadius: 10,
  marginTop: 100,
  width: "45%"
};

export default ProfilePicture;

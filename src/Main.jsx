import { useState, useRef } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

import domtoimage from "dom-to-image";

import ImageViewer from "./components/ImageViewer";
import SelectorPanel from "./components/SelectorPanel";
import EditorPanel from "./components/EditorPanel";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

const BgImage = require("../assets/images/background-image.png");

const Main = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const imageRef = useRef();
  const [pickedEmoji, setPicketEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let chosenImage = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!chosenImage.canceled) {
      setSelectedImage(chosenImage.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You have not selected an image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localURI = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localURI);
        if (localURI) {
          alert("Saved!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });
        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={BgImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <EditorPanel
          onReset={onReset}
          onAdd={onAddSticker}
          onSave={onSaveImageAsync}
        />
      ) : (
        <SelectorPanel
          onUseActual={() => setShowAppOptions(true)}
          onSelect={pickImageAsync}
        />
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPicketEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
});

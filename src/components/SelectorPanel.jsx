import { StyleSheet, View } from "react-native";
import React from "react";

import Button from "./Button";

const SelectorPanel = ({onUseActual, onSelect}) => {
  return (
    <View style={styles.footerContainer}>
      <Button theme="primary" label="Choose a photo" onPress={onSelect} />
      <Button label="Use this photo" onPress={onUseActual} />
    </View>
  );
};

export default SelectorPanel;

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
      },
});

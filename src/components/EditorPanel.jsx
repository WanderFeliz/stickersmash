import { StyleSheet, View } from "react-native";

import CircleButton from "./CircleButton";
import IconButton from "./IconButton";


export default function EditorPanel({ onReset, onAdd, onSave}) {
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.optionsRow}>
        <IconButton icon="refresh" label="Reset" onPress={onReset} />
        <CircleButton onPress={onAdd} />
        <IconButton icon="save-alt" label="Save" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    optionsContainer: {
        position: "absolute",
        bottom: 80,
    },
    optionsRow: {
        alignItems: "center",
        flexDirection: "row",
    },
});

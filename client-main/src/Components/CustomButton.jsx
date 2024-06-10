import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { color } from "../Theme/color";
import { ffamily } from "../Theme/font";

const CustomButton = ({
  buttontext,
  handlePress,
  disabled,
  isLoading,
  buttonStyles,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, buttonStyles]}
        onPress={disabled ? () => {} : handlePress}
      >
        {isLoading ? (
          <ActivityIndicator
            style={{
              alignSelf: "center",
              width: "100%",
            }}
            size="small"
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>{buttontext}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    ...Platform.select({
      android: {},
    }),
  },
  button: {
    backgroundColor: color.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(84, 116, 253, 0.2)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        shadowColor: color.primary,
      },
    }),
  },
  buttonText: {
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: ffamily.HellixSemiBold,
    fontSize: 18,
    includeFontPadding: false,
    lineHeight: 22,
  },
});

export default CustomButton;

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { color } from "../Theme/color";
import { ffamily } from "../Theme/font";
import CustomButton from "../Components/CustomButton";
import Routes from "../Navigation/Routes";
const image = require("../Images/Group.png");
const imagew = require("../Images/Circle.png");
const { height } = Dimensions.get("window");
const SplashScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.imageDiv}>
          <Image
            source={imagew}
            resizeMode="cover"
            style={styles.backgroundImage}
          />
          <Image source={image} resizeMode="cover" style={{}} />
          <Text style={styles.imageText}>
            See{'\n'}Every{'\n'}Angle
          </Text>
        </View> */}
        <View style={styles.textDiv}>
          <Text style={styles.intro}>Introducing MEDICOS</Text>
          <Text style={styles.main}>
            Your Gateway to <Text style={styles.text}>Easy</Text> Medical
            Appointments.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    height: height - 155,
  },
  imageDiv: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: { position: "absolute", width: "100%" },
  textDiv: {
    marginTop: 80,
    padding: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  imageText: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
    color: color.black,
    position: "absolute",
    top: "30%",
    fontFamily: ffamily.HellixSemiBold,
  },
  intro: {
    fontSize: 18,
    color: color.primary,
    lineHeight: 23.4,
    marginBottom: 20,
    letterSpacing: 1,
    fontFamily: ffamily.HellixSemiBold,
  },
  main: {
    fontSize: 32,
    lineHeight: 45,
    marginBottom: 30,
    color: color.black,
    fontFamily: ffamily.HellixRegular,
  },
  text: {
    color: color.primary,
    lineHeight: 45,
    letterSpacing: 1,
    fontFamily: ffamily.HellixBold,
  },
});

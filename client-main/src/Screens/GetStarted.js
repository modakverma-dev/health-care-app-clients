import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { color } from "../Theme/color";
import { ffamily } from "../Theme/font";
import CustomButton from "../Components/CustomButton";
// import {Canvas} from '@react-three/fiber/native';
import { Suspense } from "react";
import Routes from "../Navigation/Routes";
// import {Model} from '../Components/Model';
import ArrowIcon from "../Icons/ArrowIcon";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");
const GetStarted = () => {
  const navigation = useNavigation();
  const position = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationX;
    })
    .onEnd(() => {
      position.value = withSpring(0);
    });
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  if (position.value / width > 0.5) {
    navigation.navigate(Routes.SignUp);
  }
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            {/* <Canvas>
              <Suspense fallback={null}>
                <Model mousePosition={position} />
              </Suspense>
            </Canvas> */}
          </View>

          <View style={styles.textDiv}>
            <Text style={styles.intro}>Introducing Medicos</Text>
            <Text style={styles.main}>
              Your Gateway to <Text style={styles.text}>Easy</Text> Medical
              Appointments.
            </Text>
            <GestureDetector gesture={gesture}>
              <Animated.View style={[{ position: "relative" }, animatedStyles]}>
               <CustomButton handlePress={() => navigation.navigate(Routes.SignUp)} buttontext='Get Started'/>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    paddingTop: 80,
    height: height,
  },
  imageDiv: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: { position: "absolute", width: "100%" },
  textDiv: {
    padding: 16,
    position: "absolute",
    bottom: 30,
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

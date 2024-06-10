import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import axios from "axios";

import Back from "../Icons/Back";
import CustomButton from "../Components/CustomButton";
import { color } from "../Theme/color";
import Google from "../Icons/Google";
import Routes from "../Navigation/Routes";
import CustomInput from "../Components/CustomInput";
import { SignUp } from "../Api/authApi";
import { showErrormessage, showSuccessToast } from "../Utils/toastMessages";
import { emailRegex, passwordRegex } from "../constant";
import { ffamily } from "../Theme/font";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCreds, setTempUserDetails } from "../Redux/slices/authSlice";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNamelFocus = () => {
    setNameFocus(true);
  };
  const handleEmailFocus = () => {
    setEmailFocus(true);
  };

  const handleNameBlur = () => {
    handleNamelFocus(false);
  };
  const handleEmailBlur = () => {
    setEmailFocus(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };
  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordFocused(false);
  };
  const handleNavigate = () => {
    navigation.navigate(Routes.Login);
  };

  const handleSignUp = async () => {
    if (!name) {
      showErrormessage("Enter user name");
      return;
    }
    if (!text || !emailRegex.test(text)) {
      showErrormessage("Enter valid email address");
      return;
    }
    if (!password) {
      showErrormessage("Please enter a valid password");
      return;
    }
    if (!passwordRegex.test(password)) {
      showErrormessage(
        "Please enter a valid password which contains lower and uppercase alphabets, numbers, and is 8-32 characters long"
      );
      return;
    }
    if (password !== confirmPassword) {
      showErrormessage("Passwords do not match");
      return;
    }
    const data = {
      name,
      email: text,
      password: password,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(SignUp, data);
      if (response?.status === 200) {
        setIsLoading(false);
        dispatch(
          setCreds({
            token: response?.data?.accessToken,
          })
        );
        showSuccessToast(response?.data?.message);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        showErrormessage(error?.response?.data?.message);
      }
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: color.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={{ position: "absolute", left: 0, top: 0 }}
            onPress={() => navigation.goBack()}
          >
            <Back />
          </Pressable>

          <Text style={styles.headerText}>Sign Up</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.thirdtext}>
            Please enter your Information and create your account{" "}
          </Text>
        </View>
        <View style={styles.thirdcontainer}>
          <CustomInput
            placeholder="Enter username"
            value={name}
            focus={nameFocus}
            onFocus={handleNamelFocus}
            onBlur={handleNameBlur}
            onChangeText={setName}
          />
          <CustomInput
            placeholder="Enter your email"
            value={text}
            focus={emailFocus}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            onChangeText={setText}
          />
          <CustomInput
            placeholder="Enter your password"
            value={password}
            focus={isPasswordFocused}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChangeText={setPassword}
            type="password"
          />
          <CustomInput
            placeholder="Confirm password"
            value={confirmPassword}
            focus={isConfirmPasswordFocused}
            onFocus={handleConfirmPasswordFocus}
            onBlur={handleConfirmPasswordBlur}
            onChangeText={setConfirmPassword}
            type="password"
          />
          <CustomButton
            isLoading={isLoading}
            disabled={isLoading}
            buttontext="Sign up"
            handlePress={handleSignUp}
          />
        </View>

        <View style={styles.lastContainer}>
          <Text style={styles.orText}>Or</Text>
          <View style={styles.icons}>
            <Google />
          </View>
          <View style={styles.signup}>
            <Text style={{ color: color.fade }}>Have an Account? </Text>
            <TouchableOpacity onPress={handleNavigate}>
              <Text style={styles.buttonlink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 40,
    flexDirection: "column",
    gap: 20,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    width: "100%",
    display: "flex",
    textAlign: "center",
    fontSize: 18,
    fontFamily: ffamily.HellixSemiBold,
    paddingTop: 8,
    color: color.black,
  },
  content: {
    display: "flex",
    paddingTop: 10,
    paddingStart: 10,
  },
  title: {
    fontSize: 27,
    fontFamily: ffamily.HellixBold,
    color: color.black,
  },
  thirdtext: {
    fontFamily: ffamily.HellixRegular,
    opacity: 0.6,
    fontSize: 16,
    flexWrap: "wrap",
    lineHeight: 26,
    paddingRight: 80,
    paddingTop: 10,
    color: color.black,
  },
  thirdcontainer: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    gap: 24,
    paddingBottom: 0,
  },
  link: {
    display: "flex",
    borderColor: "none",
    alignItems: "flex-end",
    color: color.primary,
  },
  buttonlink: {
    color: color.primary,
    fontSize: 14,
    fontFamily: ffamily.HellixSemiBold,
  },
  orText: {
    fontSize: 14,
    fontFamily: ffamily.HellixSemiBold,
    textAlign: "center",
    color: "#868D95",
  },
  lastContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  signup: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import Toast from "react-native-simple-toast";

import Back from "../Icons/Back";
import CustomButton from "../Components/CustomButton";
import { color } from "../Theme/color";
import Google from "../Icons/Google";
import Routes from "../Navigation/Routes";
import CustomInput from "../Components/CustomInput";
import { emailRegex } from "../constant";
import { Login } from "../Api/authApi";
import { setCreds } from "../Redux/slices/authSlice";
import { showErrormessage, showSuccessToast } from "../Utils/toastMessages";
import { ffamily } from "../Theme/font";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailFocus = () => {
    setEmailFocus(true);
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
  const dispatch = useDispatch();
  const handleUserLogin = async () => {
    if (!email || !emailRegex.test(email)) {
      showErrormessage("invalid email");
      return;
    }
    if (!password) {
      showErrormessage("Please enter a password");
      return;
    }
    try {
      setIsLoading(true);
      const data = {
        email,
        password,
      };
      const res = await axios.post(Login, data);
      if (res.status === 200) {
        showSuccessToast(res?.data?.message);
        dispatch(setCreds({ token: res?.data?.accessToken }));
        setIsLoading(false);
      }
    } catch (err) {
      if (err.toJSON().message === "Network Error") {
        setIsLoading(false);
        Toast.show("Move to a better network");
        return;
      }
      if (
        err?.response?.status === 400 ||
        err?.response?.status === 404 ||
        err?.response?.status === 409
      ) {
        showErrormessage(err?.response?.data?.message);
      }
      setIsLoading(false);
      console.log(err);
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
          <Text style={styles.headerText}>Log In</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.thirdtext}>
            Please enter your email address and password for Login
          </Text>
        </View>
        <View style={styles.thirdcontainer}>
          <CustomInput
            placeholder="Enter your email"
            value={email}
            focus={emailFocus}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            onChangeText={setEmail}
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
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate(Routes.ForgotPassword);
            }}
          >
            <Text style={styles.buttonlink}>Forgot Password?</Text>
          </TouchableOpacity>
          <CustomButton
            isLoading={isLoading}
            disabled={isLoading}
            handlePress={handleUserLogin}
            buttontext="Login"
          />
        </View>
        <View style={styles.lastContainer}>
          <Text style={styles.orText}>Or</Text>
          <Pressable onPress={() => {}} style={styles.icons}>
            <Google />
          </Pressable>
          <View style={styles.signup}>
            <Text style={{ color: color.fade }}>Not Register Yet? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.SignUp);
              }}
            >
              <Text style={styles.buttonlink}>Sign Up</Text>
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: "column",
    gap: 30,
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
    color: color.black,
  },
  thirdcontainer: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    gap: 30,
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
    fontFamily: ffamily.HellixMedium,
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
    color: color.black,
  },
});

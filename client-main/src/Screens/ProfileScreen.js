import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Routes from "../Navigation/Routes";
import CustomButton from "../Components/CustomButton";
import CheckBox from "react-native-check-box";
import CustomInput from "../Components/CustomInput";
import commonStyles from "../Theme/common";
import DashLayout from "../Components/Layout/DashLayout";
import { color } from "../Theme/color";
import { Profile } from "../Api/userApi";
import { ffamily } from "../Theme/font";
import { showErrormessage, showSuccessToast } from "../Utils/toastMessages";
import { setLogout } from "../Redux/slices/popupSlice";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { refreshing } = useSelector((state) => state.common);
  const navigation = useNavigation();

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };
  const handleNameBlur = () => {
    setIsNameFocused(false);
  };

  const getSetProfileData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        Profile,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const { name: Name, email, verified, message } = res?.data;
        if (message) {
          showSuccessToast(message);
        }
        setIsVerified(verified);
        setText(email);
        setName(Name);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getSetProfileData();
  }, [refreshing]);

  const dispatch = useDispatch();

  return (
    <DashLayout fetchData={getSetProfileData} loading={loading}>
      <ScrollView>
        <View style={[styles.container, commonStyles.paddingHorizontal]}>
          <Text style={styles.text}>Name</Text>
          <CustomInput
            placeholder="Enter your Name"
            value={name}
            focus={isNameFocused}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            onChangeText={setName}
          />
          <View>
            <Text style={styles.text}>Email</Text>
            <CustomInput placeholder="User email" value={text} />
            {isVerified === false && (
              <Pressable
                style={styles.verifyAccount}
                onPress={() => {
                  navigation.navigate(Routes.VerifyAccount, { email: text });
                }}
              >
                <Text style={styles.verifyAccountText}>Verify Account</Text>
              </Pressable>
            )}
          </View>

          <CheckBox
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            rightText="By clicking this box you’ll receive daily updates"
            checkedCheckBoxColor={color.primary}
            rightTextStyle={{
              fontSize: 14,
              color: color.black,
              fontFamily: ffamily.HellixRegular,
              marginVertical: 8,
            }}
          />
          <View style={{ marginBottom: 20 }} />
          <CustomButton
            isLoading={loading}
            disabled={loading}
            buttontext="Save"
            handlePress={() => {
              if (!name) {
                showErrormessage("Please enter your name");
                return;
              }
              getSetProfileData();
            }}
          />
          <View style={{ marginBottom: 5 }} />
          <Pressable
            onPress={() => {
              dispatch(setLogout({ logoutPopup: true }));
            }}
          >
            <Text
              style={{
                color: color.primary,
                fontFamily: ffamily.HellixSemiBold,
                fontSize: 17,
                borderWidth: 2,
                borderColor: color.primary,
                height: 50,
                textAlign: "center",
                borderRadius: 25,
                padding: 10,
              }}
            >
              LogOut
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </DashLayout>
  );
};

const styles = StyleSheet.create({
  verifyAccount: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    marginVertical: 10,
    height: 20,
  },
  verifyAccountText: {
    position: "absolute",
    right: 0,
    alignSelf: "end",
    borderBottomWidth: 2,
    borderBottomColor: color.primary,
    textAlign: "center",
    color: color.primary,
    fontSize: 16,
    fontFamily: ffamily.HellixSemiBold,
  },
  container: {
    height: "100%",
    flex: 1,
    gap: 5,
    marginVertical: 20,
  },
  details: {
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  text: {
    marginBottom: 8,
    marginTop: 10,
  },
});

export default ProfileScreen;

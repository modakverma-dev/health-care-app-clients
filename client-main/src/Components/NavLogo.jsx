import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import AINALogo from "../Icons/AINALogo";
import commonStyles from "../Theme/common";
import ProfileIcon from "../Icons/Home/ProfileTabIcon.js";
import { useNavigation } from "@react-navigation/native";
import Routes from "../Navigation/Routes.js";
import { useDispatch } from "react-redux";
import { setLogout } from "../Redux/slices/popupSlice";
import { color } from "../Theme/color.js";
import { ffamily } from "../Theme/font.js";

const Logo = require("../Images/logo.jpg");

const NavLogo = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleProfileNavigate = () => {
    navigation.navigate(Routes.ProfileTab);
  };
  const handleHomeNavigate = () => {
    navigation.navigate(Routes.Home);
  };
  return (
    <View style={[styles.container, commonStyles.paddingHorizontal]}>
      <Pressable onPress={handleHomeNavigate} style={styles.logo}>
        <Image
          source={Logo}
          resizeMethod="cover"
          style={{ width: 33, height: 28, position: "absolute" }}
        />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Pressable
            onPress={() => {
              dispatch(setLogout({ logoutPopup: true }));
            }}
            style={styles.logout}
          >
            <Text
              style={{
                backgroundColor: color.primary,
                paddingVertical: 3,
                color: "white",
                fontFamily: ffamily.HellixMedium,
                fontSize: 12,
                borderWidth: 1,
                textAlign: "center",
                borderRadius: 4,
                width: 80,
              }}
            >
              LogOut
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={handleProfileNavigate} style={styles.profile}>
          <ProfileIcon />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
  },
  profile: {
    width: 25,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    display: "flex",
    backgroundColor: "#fff",
    padding: 10,
  },
  dots: {
    display: "flex",
    position: "absolute",
    left: 90,
    top: 0,
  },
  logout: {
    height: 25,
  },
});

export default NavLogo;

import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import HomeBannerIcon from "../Icons/Home/HomeBannerIcon";
import AmbulanceIcon from "../Icons/Home/AmbulanceIcon";
import TopDoctorIcon from "../Icons/Home/TopDoctorIcon";
import DepartmentIcon from "../Icons/Home/DepartmentIcon";
import LogOutPopup from "../Components/LogoutPopup";
import MapView from "react-native-maps";
const { height, width } = Dimensions.get("window");
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { color } from "../Theme/color";
import { useNavigation } from "@react-navigation/native";
import Routes from "../Navigation/Routes";
import ViewShot from "react-native-view-shot";
import LinearGradient from "react-native-linear-gradient";
// import {SvgXml} from 'react-native-'
const dummyImage = require("../Images/story.png");
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { ffamily } from "../Theme/font";
import ScanQrPopup from "../Components/ScanQrPopup";
import { getHomeData } from "../Api/homeApi";
import Selector from "../Components/Home/Selector";

const HomeScreen = () => {
  const scrollRef = useAnimatedRef();
  const scrollOfset = useScrollViewOffset(scrollRef);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const ref = useRef();
  const { openScanner } = useSelector((state) => state.popup);
  const [newsArticles, setNewsArticles] = useState([]);
  const d = new Date();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(getHomeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newsArticlesRes = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=d1d33dd449434713918a6a1352f4ef6c`
      );
      if (newsArticlesRes?.status === 200) {
        setNewsArticles(newsArticlesRes?.data?.articles);
      }
      if (res.status === 200) {
        setUserData(res?.data);
        setLoading(false);
      }
    } catch (err) {
      if (err.toJSON().message === "Network Error") {
        Toast.show("Move to a better network");
        setLoading(false);
        return;
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-height / 3, 0, height / 3],
            [-height / 6, 0, height / 4]
          ),
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-height / 3, 0, height / 3],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  console.log(userData?.tokens, "userData?.tokens");

  const { logoutPopup } = useSelector((state) => state.popup);

  if (loading) {
    return (
      <Animated.ScrollView
        style={{ height, width, backgroundColor: color.background }}
        ref={ref}
      >
        <ActivityIndicator size="large" color={color.primary} />
      </Animated.ScrollView>
    );
  }

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ width: width }}
      scrollEventThrottle={16}
    >
      {logoutPopup && <LogOutPopup />}
      {openScanner && <ScanQrPopup />}
      <Animated.View style={[styles.bannerContainer, imageAnimatedStyle]}>
        <View style={[styles.userDetails]}>
          <View style={[styles.story]}>
            <Image
              source={dummyImage}
              resizeMode="cover"
              style={[styles.storyImage]}
            />
          </View>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                color: color.black,

                fontSize: 20,
                fontFamily: ffamily.HellixSemiBold,
                width: width / 2,
              }}
              numberOfLines={2}
            >
              Welcome !
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: ffamily.HellixRegular,
                color: color.black,
              }}
            >
              {userData?.userData?.username}
            </Text>
            <Text
              style={{
                fontFamily: ffamily.HellixRegular,
                color: color.black,
              }}
            >
              How is it going today ?
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={[
            "rgba(167, 187, 225, 0.29)",
            "rgba(167, 187, 225, 0.6)",
            "rgba(167, 187, 225, 0.90)",
          ]}
          style={{ height: "100%", width: "100%" }}
        />
        <View style={{ position: "absolute", bottom: 0, right: 10 }}>
          <HomeBannerIcon />
        </View>
      </Animated.View>
      <ViewShot
        ref={ref}
        options={{
          fileName: "Your-File-Name",
          format: "jpg",
          quality: 0.9,
        }}
      >
        <View style={[styles.bottomSheetContainer]}>
          <View
            style={{
              alignItems: "start",
              justifyContent: "start",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              paddingHorizontal: 15,
            }}
          >
            <FlatList
              pagingEnabled
              style={{ flex: 1 }}
              horizontal
              data={userData?.tokens}
              renderItem={({ item }) => {
                const num =
                  parseInt(item?.token_lifetime?.split(":")[0]) * 60 +
                  parseInt(item?.token_lifetime?.split(":")[1]);
                const denom = 24 * 60;
                return (
                  <View
                    style={{
                      marginHorizontal: 8,
                      display: "inline",
                      backgroundColor: color.background,
                      paddingHorizontal: 25,
                      borderRadius: 35,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: ffamily.HellixSemiBold,
                        fontSize: 18,
                        color: color.black,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Token Lifetime
                    </Text>

                    <AnimatedCircularProgress
                      size={200}
                      width={12}
                      fill={Math.floor((num * 100) / denom, 2)}
                      tintColor={
                        Math.floor((num * 100) / denom, 2) > 70
                          ? color.primary
                          : Math.floor((num * 100) / denom, 2) > 50
                          ? "green"
                          : Math.floor((num * 100) / denom, 2) > 20
                          ? "orange"
                          : "red"
                      }
                      backgroundColor={color.border}
                      padding={10}
                      renderCap={({ center }) => (
                        <View
                          style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          cx={center.x}
                          cy={center.y}
                          r="10"
                          fill="blue"
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: ffamily.HellixSemiBold,
                              color: color.black,
                            }}
                          >
                            {item?.token_lifetime
                              ? `${
                                  24 -
                                  d.getHours() +
                                  parseInt(item?.token_lifetime?.split(":")[0])
                                }h:${
                                  60 -
                                  d.getMinutes() +
                                  parseInt(item?.token_lifetime?.split(":")[1])
                                }m:${
                                  60 -
                                  d.getSeconds() +
                                  parseInt(item?.token_lifetime?.split(":")[2])
                                }s`
                              : "Not active Tokens"}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                );
              }}
            />

            <Selector />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 20,
              borderBottomWidth: 2,
              borderBottomColor: color.border,
              backgroundColor: color.background,
              borderRadius: 10,
              marginVertical: 8,
              marginHorizontal: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.TopDoctors)}
              style={styles.selectTabContainer}
            >
              <View style={styles.selectTab}>
                <TopDoctorIcon />
              </View>
              <Text
                style={{
                  color: color.black,
                  fontFamily: ffamily.HellixSemiBold,
                }}
              >
                Top Doctors
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.DepartmentScreen)}
              style={styles.selectTabContainer}
            >
              <View style={styles.selectTab}>
                <DepartmentIcon stroke={color.background} />
              </View>
              <Text
                style={{
                  color: color.black,
                  fontFamily: ffamily.HellixSemiBold,
                }}
              >
                Department
              </Text>
            </TouchableOpacity>
            <View style={styles.selectTabContainer}>
              <View style={styles.selectTab}>
                <AmbulanceIcon />
              </View>
              <Text
                style={{
                  color: color.black,
                  fontFamily: ffamily.HellixSemiBold,
                }}
              >
                Ambulance
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 24,
              color: color.black,
              width: "100%",
              textAlign: "start",
              padding: 10,
              fontFamily: ffamily.HellixSemiBold,
            }}
          >
            Top Articles
          </Text>
          <View
            style={{
              backgroundColor: color.border,
              width: "100%",
              height: "100%",
            }}
          >
            {newsArticles?.map(
              (data) =>
                data?.description &&
                data?.title && (
                  <View
                    style={{
                      backgroundColor: color.background,
                      padding: 14,
                      marginVertical: 2,
                    }}
                  >
                    <View
                      style={{
                        marginBottom: 8,
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: 4,
                        gap: 16,
                      }}
                    >
                      <Image
                        style={{ backgroundColor: color.slate }}
                        resizeMode="cover"
                        width={80}
                        height={80}
                        borderRadius={8}
                        source={{ uri: data?.urlToImage }}
                      />
                      <Text
                        style={{
                          width: "70%",
                          height: "100%",
                          fontSize: 16,
                          color: color.black,
                          fontFamily: ffamily.HellixMedium,
                        }}
                      >
                        {data?.title}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: ffamily.HellixRegular,
                        color: color.black,
                        fontSize: 15,
                      }}
                    >
                      {data?.description}
                    </Text>
                  </View>
                )
            )}
          </View>

          {/* <SvgXml /> */}
          <View
            style={{
              width,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>AI Desease Identification...</Text>
          </View>
        </View>
      </ViewShot>
    </Animated.ScrollView>
    // </DashLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  selectTab: {
    elevation: 5,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
  },
  selectTabContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  userDetails: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  story: {
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    borderRadius: 100,
    height: "100%",
    width: "100%",
    padding: 10,
  },
  container: {
    position: "relative",
    width: width,
    height: height,
    flex: 1,
    overflow: "auto",
    backgroundColor: "black",
  },
  bannerContainer: {
    backgroundColor: color.backgroundBlur(0.3),
    width: width,
    position: "relative",
    height: height / 3,
  },
  bottomSheetContainer: {
    backgroundColor: color.border,
    position: "relative",
    height: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 25,
    width: width,
    minHeight: height,
  },
});

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ffamily } from "../Theme/font";
import { color } from "../Theme/color";
import Routes from "../Navigation/Routes";
import { useNavigation } from "@react-navigation/native";
import Back from "../Icons/Back";
import axios from "axios";
import { topDoctors } from "../Api/hospitalApi";
const dummyImg = require("../Images/dummyImage.png");

const TopDoctorsScreen = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(topDoctors);
        if (res?.status === 200) setDoctorsList(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: color.background }}>
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          flexDirection: "row",
          paddingTop: 30,
          marginHorizontal: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ position: "absolute", left: 0, top: 30 }}
        >
          <Back />
        </TouchableOpacity>
        <Text style={styles.heading}>Top Doctor</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 30 }}
        data={doctorsList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.DoctorDetails, {
                  doctorId: item?.doctorid,
                  departmentId: item?.departmentid,
                });
              }}
              style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: color.border,
                padding: 10,
                width: "100%",
                flexDirection: "row",
                gap: 8,
                marginVertical: 10,
                minHeight: 115,
                hei: "auto",
              }}
            >
              <Image
                source={
                  item?.image
                    ? {
                        uri: item?.image,
                      }
                    : dummyImg
                }
                resizeMode="cover"
                style={{
                  height: "100%",
                  width: 100,
                  borderRadius: 4,
                  backgroundColor: color.slate,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: color.black,
                    fontFamily: ffamily.HellixMedium,
                    fontSize: 16,
                  }}
                >
                  {item?.name}
                </Text>
                <Text>{item?.specialization}</Text>
                <Text
                  style={{
                    color: color.primary,
                    padding: 3,
                    borderRadius: 5,
                    backgroundColor: color.border,
                    width: 60,
                    textAlign: "center",
                    fontFamily: ffamily.HellixMedium,
                    fontSize: 16,
                  }}
                >
                  {item?.rating} ⭐
                </Text>
                <Text
                  style={{
                    fontFamily: ffamily.HellixRegular,
                    fontSize: 14,
                  }}
                >
                  {item?.about?.slice(0, 50) + "..."}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TopDoctorsScreen;
const styles = StyleSheet.create({
  heading: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: ffamily.HellixBold,
    fontSize: 20,
    color: color.black,
    marginBottom: 30,
  },
});

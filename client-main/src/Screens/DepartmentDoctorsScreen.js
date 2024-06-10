import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDepartmentDoctors } from "../Api/hospitalApi";
import { useNavigation, useRoute } from "@react-navigation/native";
import { color } from "../Theme/color";
import Back from "../Icons/Back";
import { ffamily } from "../Theme/font";
import CustomButton from "../Components/CustomButton";
import Routes from "../Navigation/Routes";
import DashLayout from "../Components/Layout/DashLayout";
const dummyImage = require("../Images/story.png");

const { height, width } = Dimensions.get("window");
const DepartmentDoctorsScreen = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { departmentId, departmentName } = route.params;
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(getDepartmentDoctors(departmentId));
      if (res.status === 200) {
        setLoading(false);
        setDoctorsList(res?.data);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (departmentId) fetchData();
  }, [departmentId]);
  if (loading)
    return (
      <View
        style={{
          width,
          height,
          backgroundColor: color.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={color.primary} size="large" />
      </View>
    );
  return (
    <DashLayout fetchData={fetchData} loading={loading}>
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ position: "absolute", left: 30, top: 15 }}
        >
          <Back />
        </TouchableOpacity>
        <Text style={styles.heading}>
          Available Doctors in {`\n${departmentName}`}
        </Text>
      </View>
      {doctorsList?.map((doctor) => (
        <View
          style={{
            gap: 8,
            marginBottom: 25,
            borderWidth: 1.5,
            padding: 20,
            borderColor: color.border,
            borderRadius: 8,
            elevation: 5,
            backgroundColor: color.background,
            shadowColor: color.primary,
          }}
        >
          <Image
            source={
              doctor?.image
                ? {
                    uri: doctor?.image,
                  }
                : dummyImage
            }
            resizeMode="cover"
            style={{ width: "100%", height: 250, borderRadius: 15 }}
          />
          <Text
            style={{
              fontFamily: ffamily.HellixSemiBold,
              color: color.black,
              fontSize: 20,
            }}
          >
            {doctor?.name}{" "}
          </Text>
          <Text
            style={{
              fontFamily: ffamily.HellixLight,
              color: color.black,
              fontSize: 15,
            }}
          >
            {doctor?.specialization}{" "}
          </Text>
          <Text
            style={{
              fontFamily: ffamily.HellixRegular,
              fontSize: 16,
              color: color.black,
            }}
          >
            {doctor?.about}{" "}
          </Text>
          <Text
            style={{
              backgroundColor: color.border,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: color.primary,
              fontSize: 18,
              borderRadius: 5,
              fontFamily: ffamily.HellixMedium,
            }}
          >
            {doctor?.rating}{" "}
          </Text>
          <CustomButton
            handlePress={() => {
              navigation.navigate(Routes.DoctorDetails, {
                doctorId: doctor?.doctorid,
                departmentId: departmentId,
              });
            }}
            buttontext="Book appointment"
          />
        </View>
      ))}
    </DashLayout>
  );
};

export default DepartmentDoctorsScreen;
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

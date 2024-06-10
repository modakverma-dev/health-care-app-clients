import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Back from "../Icons/Back";
import { color } from "../Theme/color";
import { ffamily } from "../Theme/font";
import { getAllDepartments } from "../Api/hospitalApi";
import { useNavigation } from "@react-navigation/native";
import Routes from "../Navigation/Routes";
import DashLayout from "../Components/Layout/DashLayout";
const dummyImage = require("../Images/story.png");

const { height, width } = Dimensions.get("window");
const DepartmentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(getAllDepartments);
      if (res.status === 200) {
        setDepartmentData(res?.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDepartmentData();
  }, []);
  const navigation = useNavigation();
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
    <DashLayout loading={loading} fetchData={fetchDepartmentData}>
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
          style={{ position: "absolute", left: 30, top: 5 }}
        >
          <Back />
        </TouchableOpacity>
        <Text style={styles.heading}>Departments</Text>
      </View>
      <View style={{ gap: 15, padding: 30 }}>
        {departmentData?.map((dept) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Routes.DepartmentDoctors, {
                departmentId: dept?.departmentid,
                departmentName: dept?.name,
              });
            }}
            style={styles.departmentCard}
            key={dept?.departmentid}
          >
            <View
              style={{
                height: "100%",
                width: 70,
                borderRadius: 5,
                backgroundColor: color.border,
              }}
            >
              <Image
                style={{ width: 70, height: 75 }}
                resizeMethod="cover"
                source={
                  dept?.image
                    ? {
                        uri: dept?.image,
                      }
                    : dummyImage
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: color.black,
                  fontSize: 18,
                  fontFamily: ffamily.HellixSemiBold,
                }}
              >
                {dept?.name}
              </Text>
              <Text
                style={{
                  fontFamily: ffamily.HellixRegular,
                  fontSize: 16,
                }}
              >
                {dept?.details}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </DashLayout>
  );
};

export default DepartmentScreen;
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: color.background,
    height,
    width,
  },
  heading: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: ffamily.HellixBold,
    fontSize: 20,
    color: color.black,
    marginBottom: 30,
  },
  departmentCard: {
    elevation: 5,
    borderRadius: 10,
    minHeight: 95,
    backgroundColor: color.background,
    height: "auto",
    borderWidth: 2,
    borderColor: color.slate,
    shadowColor: color.primary,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 8,
  },
});

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ffamily } from "../Theme/font";
import { color } from "../Theme/color";
import CustomButton from "../Components/CustomButton";
import Back from "../Icons/Back";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { generateTokenApi, getDoctorDetails } from "../Api/hospitalApi";
import { useSelector } from "react-redux";
import { showErrormessage, showSuccessToast } from "../Utils/toastMessages";
import Routes from "../Navigation/Routes";
const dummyImage = require("../Images/story.png");
const { width, height } = Dimensions.get("window");
const DoctorDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(0);
  const navigation = useNavigation();
  const [doctorDetails, setDoctorsDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { doctorId, departmentId } = route.params;
  const [slotId, setSlotId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const generateToken = async () => {
    try {
      if (!token) {
        showErrormessage("You are not a verified user");
        return;
      }
      if (!departmentId) {
        showErrormessage("Department not verified");
        return;
      }
      if (!doctorId) {
        showErrormessage("Doctor not verified");
        return;
      }
      if (!slotId) {
        showErrormessage("Please select a slot!");
        return;
      }
      console.log({
        department_id: departmentId,
        doctor_id: doctorId,
        slot_id: slotId,
      },token);
      setGenerating(true);
      const res = await axios.post(
        generateTokenApi,
        {
          department_id: departmentId,
          doctor_id: doctorId,
          slot_id: slotId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setGenerating(false);
        console.log(res?.data);
        showSuccessToast(res?.data?.message);
        navigation.navigate(Routes.Home);
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        showErrormessage(err?.response?.data?.message);
      }
      console.log(err);
      setGenerating(false);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(getDoctorDetails(doctorId));
      if (res.status === 200) {
        setLoading(false);
        setDoctorsDetails(res?.data);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (doctorId) fetchData();
  }, [doctorId]);
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
    <ScrollView style={styles.container}>
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
          style={{ position: "absolute", left: 0, top: 3 }}
        >
          <Back />
        </TouchableOpacity>
        <Text style={styles.heading}>Doctor Details</Text>
      </View>
      <View style={styles.doctorInfo}>
        <View style={styles.doctorProfileImg}>
          <Image
            resizeMethod="cover"
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            source={
              doctorDetails?.image
                ? {
                    uri: doctorDetails?.image,
                  }
                : dummyImage
            }
          />
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.drName}>{doctorDetails?.name}</Text>
          <Text>{doctorDetails?.specialization}</Text>
          <Text
            style={{
              width: 50,
              textAlign: "center",
              padding: 5,
              borderRadius: 4,
              backgroundColor: color.border,
              color: color.primary,
              fontFamily: ffamily.HellixMedium,
              fontSize: 15,
            }}
          >
            {doctorDetails?.rating}
          </Text>
          <Text>Distance</Text>
        </View>
      </View>
      <View style={{ paddingRight: 30, marginTop: 30 }}>
        <Text
          style={{
            fontFamily: ffamily.HellixSemiBold,
            fontSize: 20,
            color: color.black,
          }}
        >
          About
        </Text>
        <Text style={{ fontFamily: ffamily.HellixRegular, fontSize: 16 }}>
          {doctorDetails?.about}
        </Text>
      </View>
      {doctorDetails?.dates?.length ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 25 }}
          horizontal
          data={doctorDetails?.dates}
          renderItem={({ item, index }) => {
            const dateObj = new Date(item?.date);
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayIndex = dateObj.getDay();
            const dayName = dayNames[dayIndex];
            const day = dateObj.getDate();
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDate(index);
                }}
                style={[
                  {
                    width: 60,
                    height: 75,
                    borderWidth: 2,
                    borderColor: color.border,
                    borderRadius: 15,
                    flexDirection: "column",
                    gap: 3,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    justifyContent: "center",
                    elevation: 5,
                    shadowColor: color.primary,
                    backgroundColor: color.background,
                  },
                  selectedDate === index && {
                    backgroundColor: color.primary,
                    elevation: 2,
                    borderColor: color.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      fontSize: 13,
                      fontFamily: ffamily.HellixRegular,
                      textAlign: "center",
                    },
                    selectedDate === index && {
                      color: color.white,
                    },
                  ]}
                >
                  {dayName}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 20,
                      textAlign: "center",
                      fontFamily: ffamily.HellixSemiBold,
                      color: color.black,
                    },
                    selectedDate === index && {
                      color: color.white,
                    },
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={{ padding: 20, width: "100%", textAlign: "center" }}>
          No available dates !
        </Text>
      )}
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: color.border,
          marginRight: 30,
        }}
      >
        <Text
          style={{
            fontFamily: ffamily.HellixSemiBold,
            fontSize: 20,
            color: color.black,
          }}
        >
          Available Slots
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginVertical: 10,
            minHeight: 100,
          }}
        >
          {doctorDetails?.dates &&
            doctorDetails?.dates[selectedDate] &&
            doctorDetails?.dates[selectedDate]?.slots?.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  item?.available && setSlotId(item?.slot_id);
                }}
                style={[
                  styles.slotSelector,
                  item?.available && {
                    borderColor: color.primary,
                    backgroundColor: color.background,
                  },
                  slotId === item?.slot_id && {
                    backgroundColor: color.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    item?.available && {
                      color: color.black,
                    },
                    slotId === item?.slot_id && { color: color.background },
                  ]}
                >
                  {`${item?.start_time?.slice(
                    0,
                    item?.start_time?.length - 3
                  )} - ${item?.end_time?.slice(
                    0,
                    item?.start_time?.length - 3
                  )}`}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <CustomButton
        disabled={generating}
        isLoading={generating}
        handlePress={generateToken}
        buttonStyles={{ marginRight: 30, marginBottom: 20 }}
        buttontext="Generate token"
      />
    </ScrollView>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({
  slotSelector: {
    backgroundColor: color.slate,
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: color.border,
  },
  container: {
    paddingTop: 30,
    backgroundColor: color.background,
    paddingLeft: 30,
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
  doctorProfileImg: {
    borderWidth: 1,
    backgroundColor: color.slate,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: color.slate,
    elevation: 5,
    shadowColor: color.primary,
  },
  doctorInfo: {
    textAlign: "start",
    width: "100%",
    flexDirection: "row",
    gap: 15,
    justifyContent: "start",
  },
  textInfo: {
    flexDirection: "column",
    gap: 5,
  },
  drName: {
    fontFamily: ffamily.HellixSemiBold,
    fontSize: 18,
    color: color.black,
  },
});

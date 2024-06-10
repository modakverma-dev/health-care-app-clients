import { StyleSheet, ScrollView, Text, View } from "react-native";
import { color } from "../Theme/color";
import { ffamily } from "../Theme/font";
import DashLayout from "../Components/Layout/DashLayout";
import Pulse from "../Icons/Pulse";

const ReportScreen = () => {
  return (
    <DashLayout>
      <View style={{ padding: 10 }}>
        <View
          style={{
            backgroundColor: "rgba(100, 174, 228, 0.34)",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: ffamily.HellixSemiBold,
              color: color.black,
            }}
          >
            Heart Rate
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                fontSize: 45,
                fontFamily: ffamily.HellixSemiBold,
                color: color.black,
              }}
            >
              97
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: ffamily.HellixRegular,
                color: color.black,
              }}
            >
              bpm
            </Text>
            <Pulse />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(225, 90, 69, 0.34)",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: ffamily.HellixSemiBold,
                color: color.black,
              }}
            >
              Blood Group 🩸
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 45,
                  fontFamily: ffamily.HellixSemiBold,
                  color: color.black,
                }}
              >
                A+
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(222, 214, 70, 0.34)",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: ffamily.HellixSemiBold,
                color: color.black,
              }}
            >
              Weight 🏋️
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 45,
                  fontFamily: ffamily.HellixSemiBold,
                  color: color.black,
                }}
              >
                1031lbs
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              fontFamily: ffamily.HellixSemiBold,
              color: color.black,
              fontSize: 22,
              marginBottom: 15,
            }}
          >
            Latest Report
          </Text>
          <Text
            style={{
              fontFamily: ffamily.HellixRegular,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            No reports yet !
          </Text>
        </View>
      </View>
    </DashLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    flexDirection: "column",
    gap: 30,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    // gap: 50,
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
    // paddingEnd: 30,
    gap: 20,
  },
});

export default ReportScreen;

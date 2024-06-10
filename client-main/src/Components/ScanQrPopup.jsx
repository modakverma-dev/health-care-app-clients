import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { ffamily } from "../Theme/font";
import { color } from "../Theme/color";
const { width, height } = Dimensions.get("window");
const onSuccess = (e) => {
  Linking.openURL(e.data).catch((err) =>
    console.error("An error occured", err)
  );
};
const ScanQrPopup = () => {
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 20,
        backgroundColor: "white",
        height,
        width,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={<Text style={styles.centerText}></Text>}
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text
              style={{
                color: color.black,
                fontFamily: ffamily.HellixMedium,
              }}
            >
              Scan QR to match your token id !
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default ScanQrPopup;

const styles = StyleSheet.create({});
{
  /* <Text>Scan QR code to start appointmen</Text> */
}
{
  /* <View>
            <SvgXml xml={svgString} width={400} height={400} />
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              />
            </View> */
}

const svgString =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h29v29H0z"/><path stroke="#000000" d="M4 4.5h7m7 0h7M4 5.5h1m5 0h1m1 0h4m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m4 0h1m2 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m3 0h3m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m2 0h1m1 0h1m2 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h7M14 11.5h1M4 12.5h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m3 0h1m2 0h1M5 13.5h2m5 0h4m1 0h1m1 0h1m1 0h1m1 0h1M4 14.5h1m2 0h1m1 0h2m1 0h1m2 0h1m1 0h3m2 0h1m1 0h1M4 15.5h1m3 0h1m2 0h2m2 0h3m1 0h3M5 16.5h2m1 0h1m1 0h1m2 0h1m1 0h1m1 0h3m2 0h1m1 0h1M12 17.5h1m1 0h1m3 0h1m3 0h1M4 18.5h7m2 0h1m2 0h1m3 0h1M4 19.5h1m5 0h1m3 0h1m3 0h1m3 0h2M4 20.5h1m1 0h3m1 0h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1M4 21.5h1m1 0h3m1 0h1m3 0h2m1 0h1m1 0h1m1 0h1m1 0h1M4 22.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h3m1 0h2m1 0h1M4 23.5h1m5 0h1m2 0h5m1 0h3M4 24.5h7m1 0h4m1 0h3m1 0h2m1 0h1"/></svg>';

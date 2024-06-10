import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { color } from "../../Theme/color";
import { setOpenScanner } from "../../Redux/slices/popupSlice";
import LocationIcon from "../../Icons/Home/LocationIcon";
import ThunderIcon from "../../Icons/Home/ThunderIcon";
import ScanQRicon from "../../Icons/Home/ScanQRicon";
import Cross from "../../Icons/Cross";
const { width } = Dimensions.get("window");
const Selector = () => {
  const { openScanner } = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  return (
    <View style={styles.floatingFunctionalitySelector}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconBackground}>
          <LocationIcon stroke={color.primary} />
        </TouchableOpacity>
      </View>
      <View style={[styles.iconContainer, { transform: [{ scale: 1.4 }] }]}>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setOpenScanner(
                openScanner
                  ? {
                      openScanner: false,
                    }
                  : {
                      openScanner: true,
                    }
              )
            );
          }}
          style={styles.iconBackground}
        >
          {openScanner ? <Cross /> : <ScanQRicon stroke={color.primary} />}
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconBackground}>
          <ThunderIcon stroke={color.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  floatingFunctionalitySelector: {
    flexDirection: "column",
    display: "flex",
    backgroundColor: color.background,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    padding: 15,
    height: "auto",
    gap: 25,
    alignItems: "center",
  },

  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.border,
  },
});

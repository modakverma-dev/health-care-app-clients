import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Routes from "./Routes";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import getIcon from "../Utils/getIcon";
import { color } from "../Theme/color";
import ProfileScreen from "../Screens/ProfileScreen";
import ReportScreen from "../Screens/ReportScreen";

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get("window");

const TabBar = (props) => (
  <View style={[styles.shadowProp, styles.card]}>
    <View style={styles.navigatorContainer}>
      <BottomTabBar {...props} />
    </View>
  </View>
);

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View
          style={{
            position: "relative",
          }}
        >
          <TabBar {...props} />
        </View>
      )}
      screenOptions={() => ({
        tabBarStyle: styles.tabBarStyle,
        // tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <>
        {tabData.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.tabName}
            component={item.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.tabIcon}>
                  {getIcon(
                    focused ? item.activeIcon : item.icon,
                    focused ? true : false
                  )}
                </View>
              ),
            }}
          />
        ))}
      </>
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  navigatorContainer: {
    zIndex: 2,
    height: 73,
    justifyContent: "center",
  },
  tabBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  tabBarStyle: {
    height: "100%",
    shadowColor: color.primary,
    paddingTop: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 2,
    borderColor: color.border,
    paddingBottom: 0,
    paddingHorizontal: width * 0.03,
    borderColor: "transparent",
    overflow: "visible",
  },
  tabIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: color.primary,
    borderRadius: 50,
  },
  shadowProp: {
    elevation: 15,
    shadowColor: "red",
    shadowOffset: { width: 12, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  card: {
    backgroundColor: "white",
    width: "100%",
  },
});

const tabData = [
  {
    icon: "HomeTabIcon",
    activeIcon: "ActiveHomeTabIcon",
    routeName: Routes.HomeTab,
    tabName: "Home",
    component: () => (
      <>
        <HomeScreen />
      </>
    ),
  },
  {
    icon: "ReportTabIcon",
    activeIcon: "ActiveReportTabIcon",
    routeName: Routes.ReportTab,
    tabName: "Report",
    component: () => <ReportScreen />,
  },
  {
    icon: "ProfileTabIcon",
    activeIcon: "ActiveProfileTabIcon",
    routeName: Routes.ProfileTab,
    tabName: "Profile",
    component: () => <ProfileScreen />,
  },
];

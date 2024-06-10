import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./Routes";
import LoginScreen from "../Screens/LoginScreen";
import GetStarted from "../Screens/GetStarted";
import SignUpScreen from "../Screens/SignUpScreen";
import VerifyAccount from "../Screens/VerifyAccount";
import DoctorDetails from "../Screens/DoctorDetails";
import TopDoctorsScreen from "../Screens/TopDoctorsScreen";
import TabStack from "./TabStack";
import DepartmentScreen from "../Screens/DepartmentScreen";
import DepartmentDoctorsScreen from "../Screens/DepartmentDoctorsScreen";
import ReportScreen from "../Screens/ReportScreen";

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  const token = useSelector((state) => state.auth.token);

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen
            name={Routes.Home}
            component={TabStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.TopDoctors}
            component={TopDoctorsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.DoctorDetails}
            component={DoctorDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.DepartmentScreen}
            component={DepartmentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.DepartmentDoctors}
            component={DepartmentDoctorsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.ReportScreen}
            component={ReportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.VerifyAccount}
            component={VerifyAccount}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={Routes.GetStarted}
            component={GetStarted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.SignUp}
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.Login}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;

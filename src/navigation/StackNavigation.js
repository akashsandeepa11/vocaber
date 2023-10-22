import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizzesScreen from "../screens/QuizzesScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CategoryScreen from "../screens/CategoryScreen";
import BottomTabNavigation from "./BottomTabNavigation";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="TabGroup"
        component={BottomTabNavigation}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="QuizzesScreen"
        component={QuizzesScreen}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="CategoryScreen"
        component={CategoryScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}

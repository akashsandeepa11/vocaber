import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Auth
import StackNavigation from "./StackNavigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/reducers/AuthSlice";
import AuthNavigation from "./AuthNavigation";

export default function MainNavigation() {
  const [state, setState] = useState(null);
  const stateUserId = useSelector(selectAuth);

  useEffect(() => {
    setState(stateUserId);
  }, []);

  console.log("Main navigation", state?.userId);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {state?.userId === null ? <AuthNavigation /> : <StackNavigation />}
    </NavigationContainer>
  );
}

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/store/Store";
import MainNavigation from "./src/navigation/MainNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn } from "./src/store/reducers/AuthSlice";
import { useEffect } from "react";

export default function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
    const checkLocalUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem("@user");
        const userData = userJSON ? JSON.parse(userJSON) : null;
        console.log("App", userData);
        // dispatch(signIn());
      } catch (e) {
        console.log(e.message);
      }
    };
    checkLocalUser();
  }, []);

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

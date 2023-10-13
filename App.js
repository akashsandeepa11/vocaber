import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/Store";
import Navigate from "./Navigate";

export default function App() {
  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  );
}

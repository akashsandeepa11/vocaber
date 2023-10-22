import { View, Pressable } from "react-native";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import VocabListScreen from "../store/VocabListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddWordScreen from "../screens/AddWordScreen";
// import AddButton from "../components/AddButton";
import QuizCategoryScreen from "../screens/QuizCategoryScreen";

const NullScreen = () => null;

// Bottom tab
const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { color: "#1e6aca", fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerRight: () => {
            return (
              <View style={{ marginHorizontal: 10 }}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#1e6aca"
                />
              </View>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="home"
                size={24}
                color={focused ? "#1e6aca" : "#111"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Vocabulary"
        component={VocabListScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="clipboard-list"
                size={24}
                color={focused ? "#1e6aca" : "#111"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add Word"
        component={AddWordScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#1e6aca",
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                }}
              >
                <View>
                  <Entypo name="plus" size={42} color="white" />
                </View>
              </View>

              // <Pressable>
              //   <AddButton />
              // </Pressable>
            );
          },
        }}
      />
      <Tab.Screen
        name="Quizzes"
        component={QuizCategoryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="medal"
                size={24}
                color={focused ? "#1e6aca" : "#111"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="user-alt"
                size={24}
                color={focused ? "#1e6aca" : "#111"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

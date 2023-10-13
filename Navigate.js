import {
  View,
  Text,
  StatusBar,
  Pressable,
  Touchable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import VocabListScreen from "./src/screens/VocabListScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import Modal from "react-native-modal";
import AddButton from "./src/components/AddButton";
import QuizCategoryScreen from "./src/screens/QuizCategoryScreen";
import QuizzesScreen from "./src/screens/QuizzesScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import CategoryScreen from "./src/screens/CategoryScreen";

const NullScreen = () => null;

// Bottom tab
const Tab = createBottomTabNavigator();

function TabGroup() {
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
        name="NullScreen"
        component={NullScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Pressable>
                <AddButton />
              </Pressable>
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

// Stack

const Stack = createNativeStackNavigator();

function StackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="TabGroup"
        component={TabGroup}
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

export default function Navigate() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <StackGroup />
    </NavigationContainer>
  );
}

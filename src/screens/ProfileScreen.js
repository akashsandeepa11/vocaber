import { View, Text, Image, StatusBar, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  // const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  const navigation = useNavigation();

  return (
    <View className="bg-white flex-1">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text>SignIn</Text>
      </Pressable>
      <Pressable
        className="my-16"
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text>SignUp</Text>
      </Pressable>
    </View>
  );
}

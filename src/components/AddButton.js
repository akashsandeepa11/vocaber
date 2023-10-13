import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native";
import Modal from "react-native-modal";
import AddWordScreen from "../modals/AddWordModal";
import AddWordModal from "../modals/AddWordModal";

export default function AddButton() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      <AddWordModal
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
      />

      <TouchableWithoutFeedback onPress={() => toggleModal()}>
        <Entypo name="plus" size={42} color="white" />
      </TouchableWithoutFeedback>
    </View>
  );
}

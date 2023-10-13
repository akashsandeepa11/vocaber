import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import AddCategoryModal from "../modals/AddCategoryModal";
import { useNavigation } from "@react-navigation/native";

export default function CategoryCard({ item }) {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);

  // console.log(item);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Pressable
      onPress={() => {
        if (item.name === "Add Category") {
          toggleModal();
        } else {
          navigation.navigate("CategoryScreen", item);
        }
      }}
      style={
        item.empty
          ? { backgroundColor: "#f0f0f0" }
          : item.name === "Add Category"
          ? { borderColor: "#1e6aca", borderWidth: 1 }
          : { backgroundColor: "#ffffff" }
      }
      className=" rounded-[24px] w-[106] h-[106] bg-[#ffffff] items-center justify-center"
    >
      <AddCategoryModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
      <Entypo
        name={item.icon}
        size={42}
        color={item.name === "Add Category" ? "#1e6aca" : "black"}
      />
      <Text
        style={
          item.name === "Add Category" && {
            color: "#1e6aca",
            fontWeight: "bold",
          }
        }
        className="text-center"
      >
        {item.name?.length > 18 ? item.name.slice(0, 18) : item.name}
      </Text>
    </Pressable>
  );
}

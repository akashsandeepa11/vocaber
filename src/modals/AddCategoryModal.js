import { View, Text, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addCategory, selectCategory } from "../store/reducers/CategorySlice";

export default function AddCategoryModal({ isModalVisible, toggleModal }) {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const categoryReverse = [...category.data];
  categoryReverse.reverse();

  // console.log(parseFloat(categoryReverse[categoryReverse.length - 1].id));

  const [inputCategory, setInputCategory] = useState();

  const AddCategoryFunc = () => {
    toggleModal();
    inputCategory &&
      dispatch(
        addCategory({
          id: parseFloat(categoryReverse[categoryReverse.length - 1].id) + 1,
          name: inputCategory,
          icon: "book",
        })
      );
  };

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <View className=" bg-white p-4 rounded-[24px]">
        <Text className="text-lg px-5 pb-2 font-semibold">
          Add a new Category
        </Text>
        <View className="border border-gray-500 p-3 rounded-[24px] mt-3">
          <TextInput
            onChangeText={(text) => setInputCategory(text)}
            placeholder="Category Name"
          />
        </View>
        <View className="flex-row">
          <Pressable
            onPress={() => toggleModal()}
            className="flex-1 bg-white border border-gray-500 items-center justify-center p-4 mt-4 rounded-[24px] mr-4"
          >
            <Text className="text-Black text-[14px] ">Cancel</Text>
          </Pressable>

          <Pressable
            onPress={() => AddCategoryFunc()}
            className="flex-1 bg-[#1e6aca] items-center justify-center p-4 mt-4 rounded-[24px]"
          >
            <Text className="text-white text-[14px] ">Add Category</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

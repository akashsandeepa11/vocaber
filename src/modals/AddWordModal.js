import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import Modal from "react-native-modal";
import AddCategoryModal from "./AddCategoryModal";
import { selectCategory } from "../store/reducers/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { addVocabulary, selectVocab } from "../store/reducers/VocabSlice";

export default function AddWordModal({ setModalVisible, isModalVisible }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [eng, setEng] = useState("");
  const [sin, setSin] = useState("");
  const [def, setDef] = useState(null);
  const [userId, setUserId] = useState("0002");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  // console.log(today);

  const Category = useSelector(selectCategory);
  const Vocab = useSelector(selectVocab);
  const vocabReverse = [...Vocab.data];
  vocabReverse.reverse();

  // console.log( parseFloat(vocabReverse[vocabReverse.length - 1].id));

  const Categories = Category.data;

  const data = Categories.map((category, index) => ({
    key: (index + 1).toString(),
    value: category.name,
  }));

  // Category Modal
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const toggleModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
  };

  const dispatch = useDispatch();

  const addVocabFunc = () => {
    dispatch(
      addVocabulary({
        id: parseFloat(vocabReverse[vocabReverse.length - 1].id) + 1,
        userId: userId,
        eng: eng,
        sin: sin,
        date: formattedDate,
        category: selectedCategory,
        def: def,
        save: false,
      })
    );
    setModalVisible(!isModalVisible);
    // console.log({
    //   id: nanoid(),
    //   eng: eng,
    //   sin: sin,
    //   date: today,
    //   category: selectedCategory,
    //   def: def,
    //   save: false,
    // });
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView className=" bg-white pt-3 rounded-[24px]">
        <ScrollView>
          <Text className="text-lg px-5 pb-2 font-semibold">
            Add a new word
          </Text>
          <View className="flex-row justify-evenly items-center">
            <Pressable className=" items-center bg-[#f0f0f0] w-[130px] p-4 rounded-[24px]">
              <Text>English</Text>
            </Pressable>

            <FontAwesome name="arrow-right" size={24} color="black" />

            <Pressable className=" items-center bg-[#f0f0f0] w-[130px] p-4 rounded-[24px]">
              <Text>Sinhala</Text>
            </Pressable>
          </View>

          <View className="p-4">
            <View className="border border-gray-500 p-3 rounded-[24px] mt-3">
              <TextInput
                placeholder="English Word"
                onChangeText={(text) => setEng(text)}
              />
            </View>
            <View className="border flex-row items-center justify-between border-gray-500 p-3 rounded-[24px]  mt-3">
              <TextInput
                onChangeText={(text) => setSin(text)}
                placeholder="Sinhala Meaning"
                style={{ width: 220 }}
              />
              <Pressable onPress={() => console.log("Translate")}>
                <Text className="text-[16px] font-semibold text-[#1e6aca] ">
                  Translate
                </Text>
              </Pressable>
            </View>

            <Text className=" text-[16px] my-3 font-medium">
              Select Category
            </Text>

            <SelectList
              setSelected={(val) => setSelectedCategory(val)}
              data={data}
              save="value"
              // onSelect={() => {
              //   selectedCategory == "Add Category" && toggleModal();
              // }}
            />

            <AddCategoryModal
              isModalVisible={isCategoryModalVisible}
              toggleModal={toggleModal}
            />

            <View className="border border-gray-500 p-3 rounded-[24px]  mt-3">
              <TextInput
                onChangeText={(text) => setDef(text)}
                textAlignVertical="top"
                textAlign="left"
                placeholder="Definition"
                multiline={true}
                numberOfLines={5}
              />
            </View>
            <View className="flex-row">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-white border border-gray-500 items-center justify-center p-4 mt-4 rounded-[24px] mr-4"
              >
                <Text className="text-Black text-[14px] ">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => addVocabFunc()}
                className="flex-1 bg-[#1e6aca] items-center justify-center p-4 mt-4 rounded-[24px]"
              >
                <Text className="text-white text-[14px] ">Add Word</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

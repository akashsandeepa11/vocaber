import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import AddCategoryModal from "../modals/AddCategoryModal";
import { selectCategory } from "../store/reducers/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { addVocabulary, selectVocab } from "./../store/reducers/VocabSlice";
import LanguageSelectorModal from "../modals/LanguageSelectorModal";

export default function AddWordScreen() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [def, setDef] = useState(null);
  const [userId, setUserId] = useState("0002");
  const [language1, setLanguage1] = useState({ id: 2, name: "sinhala" });
  const [language1Input, setLanguage1Input] = useState("");
  const [language2, setLanguage2] = useState({ id: 1, name: "english" });
  const [language2Input, setLanguage2Input] = useState("");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const Category = useSelector(selectCategory);
  const Vocab = useSelector(selectVocab);
  const vocabReverse = [...Vocab.data].reverse();
  const Categories = Category.data;

  const data = Categories.map((category, index) => ({
    key: index + 1,
    value: category.name,
  }));

  const dispatch = useDispatch();

  const addVocabFunc = () => {
    const newId = parseFloat(vocabReverse[0].id) + 1;
    dispatch(
      addVocabulary({
        id: newId,
        userId,
        sin: language1Input,
        eng: language2Input,
        date: formattedDate,
        category: selectedCategory,
        def,
        save: false,
      })
    );
    setModalVisible(false);
  };

  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isLanguageModalVisible1, setLanguageModalVisible1] = useState(false);
  const [isLanguageModalVisible2, setLanguageModalVisible2] = useState(false);

  const toggleModal = (modalSetter) => {
    modalSetter((prev) => !prev);
  };

  const languageChangeFunc = () => {
    setLanguage1(language2);
    setLanguage2(language1);
  };

  return (
    <View className="p-3 flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <KeyboardAvoidingView className="flex-1 bg-white pt-3 rounded-[24px]">
        <ScrollView>
          <Text className="text-lg px-5 pb-2 font-semibold">
            Add a new word
          </Text>
          <View className="flex-row justify-evenly items-center">
            <TouchableOpacity
              onPress={() => toggleModal(setLanguageModalVisible1)}
              className="active:bg-[#ffffff] items-center bg-[#f0f0f0] w-[130px] p-4 rounded-[24px]"
            >
              <Text>{language1.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => languageChangeFunc()}>
              <Entypo name="swap" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleModal(setLanguageModalVisible2)}
              className="items-center bg-[#f0f0f0] w-[130px] p-4 rounded-[24px]"
            >
              <Text>{language2.name}</Text>
            </TouchableOpacity>
          </View>

          <View className="p-4">
            <View className="border border-gray-500 p-3 rounded-[24px] mt-3">
              <TextInput
                placeholder={`${language1.name} Word`}
                onChangeText={(text) => setLanguage1Input(text)}
              />
            </View>
            <View className="border flex-row items-center justify-between border-gray-500 p-3 rounded-[24px] mt-3">
              <TextInput
                onChangeText={(text) => setLanguage2Input(text)}
                placeholder={`${language2.name} Meaning`}
                style={{ width: 200 }}
              />
              <Pressable
                className="bg-[#1e6aca] p-1 rounded-[24px] px-3"
                onPress={() => console.log("Translate")}
              >
                <Text className="text-[16px] font-semibold text-white">
                  Translate
                </Text>
              </Pressable>
            </View>

            <Text className="text-[16px] my-3 font-medium">
              Select Category
            </Text>

            <SelectList
              setSelected={setSelectedCategory}
              data={data}
              save="value"
            />

            <View className="border border-gray-500 p-3 rounded-[24px] mt-3">
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
                <Text className="text-Black text-[14px]">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => addVocabFunc()}
                className="flex-1 bg-[#1e6aca] items-center justify-center p-4 mt-4 rounded-[24px]"
              >
                <Text className="text-white text-[14px]">Add Word</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <AddCategoryModal
        isModalVisible={isCategoryModalVisible}
        toggleModal={() => toggleModal(setCategoryModalVisible)}
      />
      <LanguageSelectorModal
        isModalVisible={isLanguageModalVisible1}
        toggleModal={() => toggleModal(setLanguageModalVisible1)}
        language={language1}
        languageSelected={language2}
        setLanguageSelected={setLanguage2}
        setLanguage={setLanguage1}
      />
      <LanguageSelectorModal
        isModalVisible={isLanguageModalVisible2}
        toggleModal={() => toggleModal(setLanguageModalVisible2)}
        language={language2}
        languageSelected={language1}
        setLanguageSelected={setLanguage1}
        setLanguage={setLanguage2}
      />
    </View>
  );
}

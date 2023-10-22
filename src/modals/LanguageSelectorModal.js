import {
  View,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Entypo, Feather } from "@expo/vector-icons";

export default function LanguageSelectorModal({
  isModalVisible,
  toggleModal,
  setLanguage,
  languageSelected,
  setLanguageSelected,
  language,
}) {
  const languages = [
    { id: 1, name: "english" },
    { id: 2, name: "sinhala" },
    { id: 3, name: "spanish" },
    { id: 4, name: "french" },
    { id: 5, name: "german" },
    { id: 6, name: "italian" },
    { id: 7, name: "japanese" },
    { id: 8, name: "chinese" },
    { id: 9, name: "arabic" },
    { id: 10, name: "portuguese" },
    { id: 11, name: "russian" },
    { id: 12, name: "dutch" },
    { id: 13, name: "swedish" },
    { id: 14, name: "korean" },
    { id: 15, name: "turkish" },
    { id: 16, name: "hindi" },
    { id: 17, name: "bengali" },
    { id: 18, name: "punjabi" },
    { id: 19, name: "urdu" },
    { id: 20, name: "greek" },
  ];

  const [searchInput, setSearchInput] = useState("");

  const setLanguageFunc = (item) => {
    if (
      item.name !== null &&
      item.name !== undefined &&
      languageSelected?.name === item.name
    ) {
      setLanguageSelected(language);
    }
    setLanguage(item);
    toggleModal();
    setSearchInput("");
  };

  const renderItem = ({ item }) => {
    if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
      if (item.name === "") {
        return null;
      }
      return (
        <Pressable
          onPress={() => setLanguageFunc(item)}
          className=" active:bg-[#f0f0f0] items-cente  mx-4 my-1 p-3 rounded-[24px]"
        >
          <Text className="text-[18px] ml-4">{item.name}</Text>
        </Pressable>
      );
    }
  };

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView className=" bg-white pt-3 rounded-[24px] h-[700] overflow-hidden">
        <Text className="text-lg px-5 pb-2 font-semibold">Translate from</Text>

        {/* Search bar */}
        <View className="flex-row mx-5 items-center">
          <Feather name="search" size={20} color="black" />
          <TextInput
            onChangeText={(text) => setSearchInput(text)}
            className="ml-3"
            placeholder="Search languages"
          />
        </View>
        {language?.name ? (
          <>
            <Text className=" text-[16px] my-3 font-medium mx-5">
              Recent language
            </Text>

            <Pressable
              onPress={() => {
                toggleModal();
              }}
              className="  bg-[#f0f0f0] mx-4 my-1 p-3 pl-5 rounded-[24px] flex-row"
            >
              <Entypo name="check" size={24} color="black" />
              <Text className="text-[18px] ml-4">{language?.name}</Text>
            </Pressable>
          </>
        ) : null}

        <Text className=" text-[16px] my-3 font-medium mx-5">
          All languages
        </Text>

        <FlatList
          data={languages}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </ScrollView>
    </Modal>
  );
}

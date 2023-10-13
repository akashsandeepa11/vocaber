import { View, Text, FlatList } from "react-native";
import React from "react";
import VocabCard from "./VocabCard";
import { useSelector } from "react-redux";
import { selectVocab } from "../store/reducers/VocabSlice";

export default function Vocab({ vocabData, filterValue }) {
  let filteredData = vocabData;

  if (filterValue.type == "category") {
    if (filterValue.name === "All") {
      filteredData = filteredData;
    } else if (filterValue.name === "Saved") {
      filteredData = vocabData.filter((item) => item.save === true);
    } else {
      filteredData = vocabData.filter(
        (item) => item.category === filterValue.name
      );
    }
  } else if (filterValue.type == "date") {
    filteredData = vocabData.filter((item) => item.date === filterValue.name);
  }

  const renderItem = ({ item }) => {
    return <VocabCard vocab={item} />;
  };

  return (
    <View className="px-1 mt-2">
      {filteredData.length === 0 ? (
        <View className="items-center">
          <Text className="">Sorry... </Text>
          <Text className="">There are No Vocabularies here</Text>
        </View>
      ) : (
        <FlatList data={filteredData} renderItem={renderItem} />
      )}
    </View>
  );
}

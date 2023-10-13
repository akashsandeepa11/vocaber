import { View, Text, FlatList } from "react-native";
import React from "react";
import VocabCard from "./VocabCard";
import { useSelector } from "react-redux";
import { selectVocab } from "../store/reducers/VocabSlice";

export default function Vocab({ vocabData }) {
  const renderItem = ({ item }) => {
    return <VocabCard vocab={item} />;
  };

  return (
    <View className="px-1 mt-2">
      <FlatList
        scrollEnabled={false}
        data={vocabData}
        renderItem={renderItem}
      />
    </View>
  );
}

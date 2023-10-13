import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteVocabulary } from "../store/reducers/VocabSlice";

export default function VocabCard({ vocab }) {
  const dispatch = useDispatch();

  const [save, setSave] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const deleteVocab = () => {
    Alert.alert(
      "Delete Confirmation",
      "This will delete this word",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(deleteVocabulary(vocab.id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (vocab.sin && vocab.eng) {
    return (
      <View className="rounded-[24px] bg-[#cdddf2] my-1 p-3 px-5 ">
        {/* Show less */}
        <View className="flex-row items-center">
          <Pressable className="flex-1" onPress={() => setShowMore(!showMore)}>
            <Text className="text-lg">
              {vocab.eng?.length > 31 ? vocab.eng.slice(0, 31) : vocab.eng}
            </Text>
            <Text className="text-lg">
              {vocab.sin?.length > 22 ? vocab.sin.slice(0, 22) : vocab.sin}
            </Text>
          </Pressable>
          <Pressable onPress={() => console.log("play sound")}>
            <AntDesign name="sound" size={24} color="#1e6aca" />
          </Pressable>
        </View>
        {showMore && (
          <View>
            <Text>{vocab.def}</Text>
            <View className="flex-row justify-between">
              <Pressable onPress={() => deleteVocab()}>
                <Text className="text-red-500 text-lg">Delete</Text>
              </Pressable>
              <Pressable onPress={() => setSave(!save)}>
                <Entypo
                  name={save ? "star" : "star-outlined"}
                  size={24}
                  color="#1e6aca"
                />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    );
  }
}

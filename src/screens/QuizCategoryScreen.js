import { View, Text, Pressable, StatusBar } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const quizType = [
  {
    id: 0,
    name: "Random Quizzes",
    description: "Answer random quizzes rapidly.",
  },
  {
    id: 1,
    name: "All Quizzes",
    description: "Answer all quizzes comprehensively.",
  },
  {
    id: 2,
    name: "Category Quizzes",
    description: "Answer quizzes by category focus.",
  },
];

export default function QuizCategoryScreen() {
  const navigation = useNavigation();

  return (
    <View className="m-2 mt-2">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {/* Random quiz */}
      <Pressable
        onPress={() =>
          navigation.navigate("QuizzesScreen", { quizType: quizType[0] })
        }
        className="bg-[#1e6aca] my-1 rounded-[24px] p-6 flex-row justify-between items-center"
      >
        <View>
          <Text className="text-white font-semibold text-[24px]">
            {quizType[0].name}
          </Text>
          <Text className="text-[#cdddf2] font-medium mt-0 text-[14px]">
            {quizType[0].description}
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={46} color="#cdddf2" />
      </Pressable>
      {/* All quiz */}
      <Pressable className="bg-[#1e6aca] my-1 rounded-[24px] p-6 flex-row justify-between items-center">
        <View>
          <Text className="text-white font-semibold text-[24px]">
            {quizType[1].name}
          </Text>
          <Text className="text-[#cdddf2] font-medium mt-0 text-[14px]">
            {quizType[1].description}
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={46} color="#cdddf2" />
      </Pressable>
      {/* Category quiz */}
      <Pressable className="bg-[#1e6aca] my-1 rounded-[24px] p-6 flex-row justify-between items-center">
        <View>
          <Text className="text-white font-semibold text-[24px]">
            {quizType[2].name}
          </Text>
          <Text className="text-[#cdddf2] font-medium mt-0 text-[14px]">
            {quizType[2].description}
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={46} color="#cdddf2" />
      </Pressable>
    </View>
  );
}

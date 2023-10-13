import { View, Text, Pressable, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Entypo } from "@expo/vector-icons";

export default function QuizCorrectModal({
  isModalVisible,
  toggleModal,
  navigateFun,
  word,
}) {
  const [save, setSave] = useState(false);

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
      <View className=" bg-white p-4 rounded-[24px] items-center">
        <Image
          source={require("./../../assets/cograts_img.png")}
          className="w-[200] h-[200] my-5"
        />
        <Text className="text-2xl text-center px-5 pb-2 font-semibold">
          Congratulations
        </Text>

        <Text className="mx-5 my-2">
          You have successfully answered this Quiz.
        </Text>

        <View className="w-full px-8 flex-row justify-between items-center">
          <View>
            <Text className="text-lg">
              {word.eng?.length > 31 ? word.eng.slice(0, 31) : word.eng}
            </Text>
            <Text className="text-lg">
              {word.sin?.length > 22 ? word.sin.slice(0, 22) : word.sin}
            </Text>
          </View>
          <Pressable onPress={() => setSave(!save)}>
            <Entypo
              name={save ? "star" : "star-outlined"}
              size={24}
              color="#1e6aca"
            />
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigateFun(1)}
          className=" w-full bg-green-500 items-center justify-center p-4 mt-4 rounded-[24px]"
        >
          <Text className="text-white text-[14px] ">Continue</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

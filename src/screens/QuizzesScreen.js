import {
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QuizCorrectModal from "../modals/QuizCorrectModal";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectVocab } from "../store/reducers/VocabSlice";

export default function QuizzesScreen() {
  const navigation = useNavigation();
  const { quizType } = useRoute().params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: quizType.name,
    });
  }, [navigation, quizType.name]);

  const VocabData = useSelector(selectVocab);

  const data = VocabData.data;

  const [answer, setAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = data[currentIndex];
  const [isModalVisible, setModalVisible] = useState(false);
  const [showWord, setShowWord] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateFun = (operator) => {
    let newIndex = currentIndex + operator;
    if (newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
      setAnswer(null);
      setModalVisible(false);
      setShowWord(false);
    }
  };

  useEffect(() => {
    if (
      (currentWord.eng.trim().toUpperCase() ===
        answer?.trim().toUpperCase()) ===
      true
    ) {
      toggleModal();
    }
  }, [currentWord.eng.trim().toUpperCase() === answer?.trim().toUpperCase()]);

  //   console.log(modalVisible);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable
          onPress={() => navigateFun(-1)}
          style={{
            backgroundColor: currentIndex === 0 ? "gray" : "#1e6aca",
            padding: 16,
            width: 100,
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Previous
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigateFun(1)}
          style={{
            backgroundColor:
              currentIndex === data.length - 1 ? "gray" : "#1e6aca",
            padding: 16,
            width: 100,
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Next
          </Text>
        </Pressable>
      </View>

      <View className="flex-row justify-between mt-4">
        <Text
          style={{ color: "#1e6aca", paddingVertical: 8 }}
          className=" text-lg font-semibold"
        >
          {quizType.description}
        </Text>

        {/* Hint */}
        <Pressable
          onPress={() =>
            Alert.alert(
              "Hint",
              `This word consists of ${
                currentWord.eng.trim().length
              } characters, starting with '${currentWord.eng[0].toUpperCase()}' and ending with '${currentWord.eng
                .trim()
                .slice(-1)}'.`
            )
          }
          // style={{
          //   alignItems: "center",
          //   height: 40,
          //   backgroundColor: "#1e6aca",
          //   padding: 10,
          //   borderRadius: 10,
          //   justifyContent: "center",
          //   marginLeft: 8,
          // }}
          className="flex-row items-center"
        >
          <Text className="text-[#f8423f] text-lg">Hint</Text>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color="#f8423f"
          />
        </Pressable>
      </View>

      {/* Quiz Card */}
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          padding: 16,
          borderRadius: 24,
        }}
        className="mt-2 pb-10"
      >
        <Text className="py-4" style={{ color: "#1e6aca", fontSize: 16 }}>{`(${
          currentIndex + 1
        })`}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#1e6aca", fontSize: 20, fontWeight: "bold" }}>
            {currentWord?.sin || ""}{" "}
            {/* Use the optional chaining operator to access properties */}
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 2,
            borderColor: "#cdddf2",
            marginTop: 35,
          }}
        >
          <TextInput
            value={answer}
            placeholder="Type Your Answer"
            onChangeText={(text) => setAnswer(text)}
            style={{
              color: "#1e6aca",
              fontSize: 20,
              fontWeight: "bold",
              width: 250,

              textAlign: "center",
            }}
          />
        </View>
        <View className="w-full items-end mt-4">
          <Pressable onPress={() => setShowWord(!showWord)}>
            <Text className=" text-red-500 font-medium text-lg">Show Word</Text>
          </Pressable>
        </View>
        {showWord ? (
          <View className="w-full rounded-[24px] p-3 flex-row justify-between items-center bg-green-400">
            <View>
              <Text className="text-lg">
                {currentWord.eng?.length > 31
                  ? currentWord.eng.slice(0, 31)
                  : currentWord.eng}
              </Text>
              <Text className="text-lg">
                {currentWord.sin?.length > 22
                  ? currentWord.sin.slice(0, 22)
                  : currentWord.sin}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      {/* QuizCorrectModal */}
      <QuizCorrectModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        navigateFun={navigateFun}
        word={currentWord}
      />
    </View>
  );
}

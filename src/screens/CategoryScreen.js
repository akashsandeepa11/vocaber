import { View, Text, FlatList, Pressable, Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectVocab } from "../store/reducers/VocabSlice";
import Vocab from "../components/Vocab";
import { AntDesign } from "@expo/vector-icons";
import { deleteCategory } from "../store/reducers/CategorySlice";

export default function CategoryScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Data = useSelector(selectVocab);
  const vocabData = Data.data;

  const route = useRoute();
  const item = route.params;

  // console.log(item);

  const handleDeletePress = () => {
    Alert.alert(
      "Delete Confirmation",
      "This will delete all information",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(deleteCategory(item));
          },
        },
      ],
      { cancelable: false }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item.name,
      headerTitleAlign: "center",
      headerRight: () => {
        if (!(item.name == "All" || item.name == "Saved")) {
          return (
            <Pressable
              onPress={() => handleDeletePress()}
              style={{ marginHorizontal: 10 }}
            >
              <AntDesign name="delete" size={24} color="red" />
            </Pressable>
          );
        }
      },
    });
  }, []);

  return (
    <View className="px-2">
      <Vocab
        vocabData={vocabData}
        filterValue={{ name: item.name, type: "category" }}
      />
    </View>
  );
}

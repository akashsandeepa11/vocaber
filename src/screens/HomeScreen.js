import {
  View,
  Text,
  Touchable,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

import Category from "../components/Category";
import { AntDesign } from "@expo/vector-icons";
import Vocab from "../components/Vocab";
import RecentVocab from "../components/RecentVocab";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, selectCategory } from "../store/reducers/CategorySlice";
import { getVocab, selectVocab } from "../store/reducers/VocabSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const data = useSelector(selectVocab);
  const vocabData = data.data;
  const moreCategory = category.data.length > 3;

  useLayoutEffect(() => {
    dispatch(getCategory());
    dispatch(getVocab());
  }, []);

  const [showMore, setShowMore] = useState(false);

  return (
    <View className="p-2 flex-1 bg-[#f0f0f0] ">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView>
        {/* Category */}
        <View className="flex-1">
          <Text className="text-lg px-2 font-semibold">Categories</Text>

          <View>
            <Category showMore={showMore} />
          </View>
          <Pressable
            className="bg-[#1e6aca] items-center justify-center p-3 mx-2 rounded-[24px]"
            onPress={() =>
              moreCategory
                ? setShowMore(!showMore)
                : alert("Add more categories")
            }
          >
            <Text className="text-white text-[14px] ">
              {showMore ? "Show less" : "Show More"}
            </Text>
          </Pressable>
        </View>

        {/* Vocab */}
        <View className="mt-4 ">
          <Text className="text-lg px-2 font-semibold">Recent Vocabulary</Text>
          <RecentVocab vocabData={vocabData} />
        </View>
      </ScrollView>
    </View>
  );
}

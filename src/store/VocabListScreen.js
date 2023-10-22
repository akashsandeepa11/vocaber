import { View, Text, StatusBar } from "react-native";
import React, { useState } from "react";
import Vocab from "../components/Vocab";
import DatePickerComp from "../components/DatePickerComp";
import { useSelector } from "react-redux";
import { selectVocab } from "./reducers/VocabSlice";

export default function VocabListScreen() {
  const data = useSelector(selectVocab);
  const vocabData = data.data;

  const today = new Date()
    .toString()
    .replace(/\s\d{2}:\d{2}:\d{2}\s\w+\+\d{4}/, "");

  const [date, setDate] = useState(today);

  function formatDate(inputDateStr) {
    // Parse the input date string
    const inputDate = new Date(inputDateStr);

    // Check if the date is valid
    if (isNaN(inputDate.getTime())) {
      return "Invalid Date";
    }

    // Format the date as "YYYY-MM-DD"
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <View className="flex-1">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <DatePickerComp Date={date} setDate={setDate} today={today} />
      <Vocab
        vocabData={vocabData}
        filterValue={{ name: formatDate(date), type: "date" }}
      />
    </View>
  );
}

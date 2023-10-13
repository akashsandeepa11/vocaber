import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
  subWeeks,
} from "date-fns";
import PagerView from "react-native-pager-view";

// Generate a two-week date range
const today = new Date();
// console.log("date picker", today);
const weeksToGoBack = 10;

const dateRanges = eachWeekOfInterval(
  {
    start: subWeeks(today, weeksToGoBack),
    end: today, // Set the end date to today
  },
  {
    weekStartsOn: 1,
  }
);

const dateRange = dateRanges.reverse();

const date = dateRange.reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);

  return acc;
}, []);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Organize dates into a two-dimensional array representing weeks

export default function DatePickerComp({ Date, setDate, today }) {
  // set Date function
  const setDateFunc = (days) => {
    const DateWithoutTime = days
      .toString()
      .replace(/\s\d{2}:\d{2}:\d{2}\s\w+\+\d{4}/, "");
    setDate(DateWithoutTime);
  };

  return (
    <PagerView className=" h-[60] bg-white">
      {date.map((week, i) => (
        <View key={i} className="flex-row justify-around items-center ">
          {week
            .slice()
            .reverse()
            .map((day, j) => {
              const txt = format(day, "EEEEE");

              const setDateFun = (day) => {
                const DateWithoutTime = day
                  .toString()
                  .replace(/\s\d{2}:\d{2}:\d{2}\s\w+\+\d{4}/, "");
                return DateWithoutTime;
              };

              return (
                <Pressable
                  onPress={() => setDateFunc(day)}
                  key={j}
                  className="flex-1 rounded-lg bg-[#cdddf2 h-[60] m-1 items-center justify-center "
                  // style={
                  //   setDateFun(day) === Date
                  //     ? { backgroundColor: "#1e6aca" }
                  //     : setDateFun(day) === today
                  //     ? { borderColor: "#1e6aca", borderWidth: 3 }
                  //     : {}
                  // }
                  style={
                    setDateFun(day) === today
                      ? { backgroundColor: "#1e6aca" }
                      : setDateFun(day) === Date
                      ? { borderColor: "#1e6aca", borderWidth: 2 }
                      : {}
                  }
                >
                  <Text
                    className=" font-bold text-[#1e6aca]"
                    style={
                      setDateFun(day) === today
                        ? { color: "white" }
                        : setDateFun(day) === Date
                        ? { color: "#1e6aca" }
                        : {}
                    }
                  >
                    {txt}
                  </Text>
                  <Text
                    className=" font-bold text-[#1e6aca]"
                    style={
                      setDateFun(day) === today
                        ? { color: "white" }
                        : setDateFun(day) === Date
                        ? { color: "#1e6aca" }
                        : {}
                    }
                  >
                    {day.getDate()}
                  </Text>
                  <Text
                    className=" font-bold text-[#1e6aca]"
                    style={
                      setDateFun(day) === today
                        ? { color: "white" }
                        : setDateFun(day) === Date
                        ? { color: "#1e6aca" }
                        : {}
                    }
                  >
                    {months[day.getMonth()]}
                  </Text>
                </Pressable>
              );
            })}
        </View>
      ))}
    </PagerView>
  );
}

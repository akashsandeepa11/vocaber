import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import { selectCategory } from "../store/reducers/CategorySlice";
import { selectVocab } from "../store/reducers/VocabSlice";

export default function Category({ showMore }) {
  const Category = useSelector(selectCategory);

  const Categories = [...Category.data];

  const staticCategory = [
    { id: 0, name: "Add Category", icon: "plus" },
    { id: 1, name: "All", icon: "list" },
    { id: 2, name: "Saved", icon: "star" },
  ];

  const data = showMore ? Categories : Categories?.slice(0, 3);

  const formatData = (data, numColumns) => {
    const numFullRows = Math.floor(data.length / numColumns);
    let numElementsInLastRow = data.length - numFullRows * numColumns;
    while (numElementsInLastRow !== numColumns && numElementsInLastRow !== 0) {
      data.push({ id: `blank-${numElementsInLastRow}`, empty: true });
      numElementsInLastRow++;
    }

    return data;
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.item, item.empty && { backgroundColor: "#f0f0f0" }]}>
        <CategoryCard item={item} />
      </View>
    );
  };

  return (
    <View className="flex-col flex-1">
      <View className=" flex-row">
        <View style={[styles.item, { backgroundColor: "#f0f0f0" }]}>
          <CategoryCard item={staticCategory[0]} />
        </View>
        <View style={[styles.item, { backgroundColor: "#f0f0f0" }]}>
          <CategoryCard item={staticCategory[1]} />
        </View>
        <View style={[styles.item, { backgroundColor: "#f0f0f0" }]}>
          <CategoryCard item={staticCategory[2]} />
        </View>
      </View>
      <View className="flex-1">
        <FlatList
          scrollEnabled={false}
          data={formatData(data, 3)}
          style={styles.container}
          renderItem={renderItem}
          numColumns={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / 3,
  },
  itemText: {
    color: "#fff",
  },
});

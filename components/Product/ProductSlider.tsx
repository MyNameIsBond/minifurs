import { View, ScrollView, Dimensions } from "react-native";
import React from "react";

export default function ProductSlider({ images, colours }) {
  const { width } = Dimensions.get("window");
  const height = width * 0.3;
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%", height }}
    ></ScrollView>
  );
}

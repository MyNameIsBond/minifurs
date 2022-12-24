import {
  ScrollView,
  Dimensions,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";

export default function ProductSlider({ images, colours, displayColour }) {
  const { width } = Dimensions.get("window");
  const height = width * 0.8;
  return (
    <ScrollView
      horizontal={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ width: width, height }}
    >
      {images &&
        images[displayColour]?.map((image: string) => (
          <Image source={{ uri: image }} style={{ width: width, height }} />
        ))}
    </ScrollView>
  );
}

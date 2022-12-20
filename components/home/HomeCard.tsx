import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React from "react";

export default function Homeard({
  product,
}: {
  product: any[] | null;
}): JSX.Element {
  const { title, price, images } = product;
  const keys = Object.keys(images);
  const [displayImages] = keys.map((key) => images[key]);
  const { width } = Dimensions.get("window");
  const height = width * 0.3;
  const mywidth = width * 0.4;
  const midwidth = width * 0.5;
  return (
    <View className="p-4 bg-gray-50" style={{ width: midwidth }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: mywidth, height }}
      >
        {displayImages.map((image: []) => (
          <Image
            source={{ uri: image }}
            className="rounded-2xl"
            style={{ width: mywidth, height }}
          />
        ))}
      </ScrollView>
      <Text className="pt-1 text-gray-600 text-base">{title}</Text>
      <Text className="text-xl font-bold">£{price}</Text>
    </View>
  );
}

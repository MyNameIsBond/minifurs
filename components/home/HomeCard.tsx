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
  const midwidth = width * 0.4;
  return (
    <View className="bg-gray-500 m-4">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: mywidth, height }}
        className=""
      >
        {displayImages.map((image: []) => (
          <Image
            source={{ uri: image }}
            className="rounded-2xl"
            style={{ width: mywidth, height }}
          />
        ))}
      </ScrollView>
      <Text
        className="pt-1 text-gray-600 text-base"
        style={{ width: midwidth }}
      >
        {title}
      </Text>
      <Text className="text-xl font-bold">£{price}</Text>
    </View>
  );
}

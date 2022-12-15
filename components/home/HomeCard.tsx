import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React from "react";

export default function Homeard({
  product,
}: {
  product: any[] | null;
}): JSX.Element {
  const { title, price, profile_pic, images } = product;
  const { width } = Dimensions.get("window");
  const height = width * 0.3;
  return (
    <View className="">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="w-40 h-40"
      >
        {images.black.map((image) => {
          return <Image source={{ uri: image }} className="w-40 h-40" />;
        })}
      </ScrollView>
      <Text>{title}</Text>
      <Text className="text-xl">{JSON.stringify(images.black)}</Text>
    </View>
  );
}

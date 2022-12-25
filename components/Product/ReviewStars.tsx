import { View, Text } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

export default function ReviewStars({ stars }: { stars: number }) {
  return (
    <View className="flex-row">
      {[...Array(stars)].map((e) => (
        <StarIcon size={20} style={{ color: "#e5c217" }} />
      ))}
    </View>
  );
}

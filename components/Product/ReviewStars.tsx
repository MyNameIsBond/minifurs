import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";

export default function ReviewStars({ stars }: { stars: number }) {
  return (
    <View className="flex-row">
      {[...Array(stars)].map((_, key) => (
        <StarIcon
          key={key}
          size={20}
          style={{ color: "#e5c217" } as StyleProp<ViewStyle>}
        />
      ))}
    </View>
  );
}

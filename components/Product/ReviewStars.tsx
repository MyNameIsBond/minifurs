import { Text, TouchableOpacity, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { setStars } from "../../app/features/review";
import { useAppDispatch } from "../../app/hooks";

export default function ReviewStars({ stars }: { stars: number }) {
  const dispatch = useAppDispatch();
  var myStars = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <View className="flex-row">
      {myStars.slice(0, stars).map((n) => (
        <TouchableOpacity
          key={n}
          onPress={() => {
            dispatch(setStars(n));
          }}
        >
          <StarIcon
            key={n}
            size={20}
            style={{ color: "#e5c217" } as StyleProp<ViewStyle>}
          />
        </TouchableOpacity>
      ))}
      {stars < 5 &&
        myStars.slice(stars - 5).map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => {
              dispatch(setStars(n));
            }}
          >
            <StarIcon
              style={
                {
                  color: "lightgray",
                } as StyleProp<ViewStyle>
              }
              size={20}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
}

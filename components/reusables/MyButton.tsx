import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface MyButtonProps {
  title: string;
  onPress: () => void;
}

export default function MyButton({
  title,
  onPress,
}: MyButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      className="bg-accent-green w-full rounded-lg"
      onPress={onPress}
    >
      <Text className="text-center p-4 rounded-lg text-gray-50 font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

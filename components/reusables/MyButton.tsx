import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

interface MyButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function MyButton({
  title,
  onPress,
  loading,
}: MyButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      className="bg-accent-green w-full rounded-lg"
      onPress={onPress}
    >
      <View className="items-center justify-center content-center object-center origin-center">
        <Text className="text-center p-4 rounded-lg text-gray-50 font-bold">
          {loading ? <ActivityIndicator /> : <Text>{title}</Text>}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

import { View, Text } from "react-native";
import React, { ReactNode } from "react";

export default function UserDetailsContainer({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <View className="flex gap-y-4 px-3 mt-5 m-3 p-3 bg-gray-50 rounded-md shadow">
      <Text className="font-semibold uppercase text-xs">{title}</Text>
      <View className="flex gap-y-4">{children}</View>
    </View>
  );
}

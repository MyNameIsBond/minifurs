import { View, Text } from "react-native";
import { ReactNode } from "react";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";

export default function CardDisplaySceleton({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View>
      <View className="flex-row justify-between px-4">
        <Text className="capitalize font-bold text-xl">{title}</Text>
        <View className="flex-row items-center gap-x-2">
          <Text className="text-accent-orange">See All</Text>
          <ArrowLongRightIcon color="#E68314" />
        </View>
      </View>
      <View className="grid grid-cols-2">{children}</View>
    </View>
  );
}

import { View, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import ListCards from "../ListCardsContainer";

export default function CardDisplaySceleton({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const navigation = useNavigation();

  return (
    <View className="bg-gray-100">
      {title && (
        <View className="flex-row justify-between px-4 pt-4">
          <Text className="capitalize font-bold text-xl">{title}</Text>
          <TouchableOpacity
            onPress={(e) => navigation.navigate("SeeAll", { title: title })}
          >
            <View className="flex-row items-center gap-x-2">
              <Text className="text-accent-orange">See All</Text>
              <ArrowLongRightIcon color="#E68314" />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <ListCards>{children}</ListCards>
    </View>
  );
}

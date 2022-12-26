import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { ArrowLongRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function CardDisplaySceleton({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const navigation = useNavigation();

  return (
    <View className="bg-gray-100">
      <View className="flex-row justify-between p-4">
        <Text className="capitalize font-bold text-xl">{title}</Text>
        <TouchableOpacity onPress={(e) => navigation.navigate("SeeAll")}>
          <View className="flex-row items-center gap-x-2">
            <Text className="text-accent-orange">See All</Text>
            <ArrowLongRightIcon color="#E68314" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="px-4 py-1 bg-gray-100" style={styles.container}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

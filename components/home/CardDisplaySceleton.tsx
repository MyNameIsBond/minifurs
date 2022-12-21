import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
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
    <View className="bg-gray-100">
      <View className="flex-row justify-between px-4">
        <Text className="capitalize font-bold text-xl">{title}</Text>
        <TouchableOpacity>
          <View className="flex-row items-center gap-x-2">
            <Text className="text-accent-orange">See All</Text>
            <ArrowLongRightIcon color="#E68314" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="px-3 bg-gray-100" style={styles.container}>
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

import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { ReactNode } from "react";

export default function ListCards({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: string;
}): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView className={`bg-gray-100 ${classNames}`}>
        <View style={styles.container} className="p-4 bg-gray-100">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
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

import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { ReactNode } from "react";

export default function ListCards({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView className="h-screen bg-gray-100">
        <View style={styles.container} className="p-3 bg-gray-100">
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

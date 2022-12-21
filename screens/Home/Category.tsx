import { View, Text, SafeAreaView } from "react-native";
import React from "react";

export default function Category({ navigation, route }): JSX.Element {
  const category = route.params.category.toLowerCase();

  return (
    <SafeAreaView>
      <View>
        <Text>Category:{category}</Text>
      </View>
    </SafeAreaView>
  );
}

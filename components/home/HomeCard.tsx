import { View, Text } from "react-native";
import React from "react";

export default function Homeard({
  product,
}: {
  product: any[] | null;
}): JSX.Element {
  return (
    <View>
      <Text>from HomeCard</Text>
      <Text>{JSON.stringify(product)}</Text>
    </View>
  );
}

import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  const [product, setProcut] = useState<any[] | null>([]);
  useEffect(() => {
    setProcut(products);
  }, []);

  return (
    <View className="rounded-t-3xl px-4 pt-10 -mt-5 bg-gray-50">
      <Text>{products[0].title}</Text>
    </View>
  );
}

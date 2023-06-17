import { View, Text } from "react-native";
import React from "react";
import { ShoppingBagIcon } from "react-native-heroicons/outline";

export default function Orders() {
  const order = false;
  return (
    <View>
      {order ? (
        <Text>Orders</Text>
      ) : (
        <View className="flex-col px-4 items-center h-full pt-[30%]">
          <ShoppingBagIcon color="#284F49" size={30} />
          <Text className="text-lg font-bold pt-4">No orders yet!</Text>
          <Text className="text-base text-center max-w-xs">
            for the time being you have no made any order
          </Text>
        </View>
      )}
    </View>
  );
}

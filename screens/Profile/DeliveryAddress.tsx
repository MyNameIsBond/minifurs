import { View, Text } from "react-native";
import React from "react";
import { useUser } from "../../lib/helpers/UserContext";

export default function DeliveryAddress() {
  const { address } = useUser();
  return (
    <View className="px-14 pt-20 flex flex-col gap-y-2">
      <Text className="font-bold text-xl pb-3">Delivery Details</Text>
      <Text>Road: {address?.road ? address.road : "provide address"}</Text>
      <Text>Town: {address?.town ? address.town : "provide address"}</Text>
      <Text>
        County: {address?.county ? address.county : "provide address"}
      </Text>
      <Text>
        Post Code: {address?.post_code ? address.post_code : "provide address"}
      </Text>
    </View>
  );
}

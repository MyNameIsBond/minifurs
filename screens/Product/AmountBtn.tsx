import { View, Text, Button } from "react-native";
import React, { useCallback } from "react";

export default function AmountBtn({
  addToBasketNum,
  setAddToBasketNum,
  quantity,
}: {
  addToBasketNum: number;
  setAddToBasketNum: (num: number) => void;
  quantity: number | any[];
}) {
  const minus = useCallback(() => {
    setAddToBasketNum(addToBasketNum - 1);
  }, [addToBasketNum]);

  const plus = useCallback(() => {
    setAddToBasketNum(addToBasketNum + 1);
  }, [addToBasketNum]);
  return (
    <View className="flex-row items-center">
      <Button
        title="-"
        color={"#ba385c"}
        disabled={addToBasketNum === 1}
        onPress={minus}
      />
      <Text className="px-3">{addToBasketNum}</Text>
      <Button
        title="+"
        color={"#ba385c"}
        disabled={addToBasketNum === quantity}
        onPress={plus}
      />
    </View>
  );
}

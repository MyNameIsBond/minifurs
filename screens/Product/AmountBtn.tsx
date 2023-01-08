import { View, Text, Button } from "react-native";

export default function AmountBtn({
  addToBasketNum,
  productAmount,
  increment,
  decrement,
}: {
  addToBasketNum: number;
  productAmount: number | any[];
  increment: () => void;
  decrement: () => void;
}) {
  return (
    <View className="flex-row items-center">
      <Button
        title="-"
        color={"#ba385c"}
        disabled={addToBasketNum === 1}
        onPress={decrement}
      />
      <Text className="px-3">{addToBasketNum}</Text>
      <Button
        title="+"
        color={"#ba385c"}
        disabled={addToBasketNum === productAmount}
        onPress={() => increment()}
      />
    </View>
  );
}

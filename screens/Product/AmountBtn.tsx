import { View, Text, Button } from "react-native";
import { decrement, increment } from "../../app/features/product";
import { useAppDispatch } from "../../app/hooks";

export default function AmountBtn({
  addToBasketNum,
  productAmount,
}: {
  addToBasketNum: number;
  productAmount: number | any[];
}) {
  const dispatch = useAppDispatch();
  return (
    <View className="flex-row items-center">
      <Button
        title="-"
        color={"#ba385c"}
        disabled={addToBasketNum === 1}
        onPress={() => dispatch(decrement())}
      />
      <Text className="px-3">{addToBasketNum}</Text>
      <Button
        title="+"
        color={"#ba385c"}
        disabled={addToBasketNum === productAmount}
        onPress={() => dispatch(increment())}
      />
    </View>
  );
}

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { useAddTobasketMutation } from "../../app/services/addToBasket";

export default function AddToBasket({
  user_id,
  product_id,
  quantity,
  colour,
}: {
  user_id: string | undefined;
  product_id: string;
  quantity: number;
  colour: string;
}) {
  const [addToBasket, { isLoading }] = useAddTobasketMutation();

  return (
    <View className="px-3 flex-col items-center">
      <TouchableOpacity
        onPress={() =>
          addToBasket({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
            colour: colour,
          })
        }
        className="shadow flex-row justify-center items-center w-full rounded-xl bg-accent-green"
      >
        {isLoading ? <ActivityIndicator /> : <ShoppingCartIcon color="white" />}
        <Text className="text-center text-gray-50 py-4 font-bold pl-3">
          Add to basket
        </Text>
      </TouchableOpacity>
    </View>
  );
}

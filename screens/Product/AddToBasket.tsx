import { View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";
import { ShoppingCartIcon } from "react-native-heroicons/outline";

export default function AddToBasket({
  user_id,
  product_id,
  quantity,
  colour,
}: {
  user_id: string;
  product_id: string;
  quantity: number;
  colour: string;
}) {
  const addToBasket = async () => {
    try {
      const { data: exist, error: errorr } = await supabase
        .from("basket")
        .select("id, quantity")
        .match({
          user_id: user_id,
          product_id: product_id,
          colour: colour,
        });
      if (exist?.length >= 1) {
        const { data, error } = await supabase
          .from("basket")
          .update({ quantity: quantity })
          .match({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity + exist[0].quantity,
            colour: colour,
          });
      } else {
        const { data, error } = await supabase.from("basket").insert({
          user_id: user_id,
          product_id: product_id,
          quantity: quantity,
          colour: colour,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="px-3 flex-col items-center">
      <TouchableOpacity
        onPress={() => addToBasket()}
        className="shadow flex-row justify-center items-center w-full rounded-xl bg-accent-green"
      >
        <ShoppingCartIcon color="white" />
        <Text className="text-center text-gray-50 py-4 font-bold pl-3">
          Add to basket
        </Text>
      </TouchableOpacity>
    </View>
  );
}

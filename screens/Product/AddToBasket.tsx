import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
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
        .select("id")
        .match({
          user_id: user_id,
          product_id: product_id,
          colour: colour,
        });
      console.log("out exists:", exist?.length >= 1);
      if (exist?.length >= 1) {
        console.log("exist", exist);
        const { data, error } = await supabase
          .from("basket")
          .update({ quantity: quantity + 1 })
          .match({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
            colour: colour,
          });
      } else {
        console.log("does not");
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

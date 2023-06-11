import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "../lib/helpers/UserContext";
import ListCards from "../components/ListCardsContainer";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import BasketCard from "../components/BasketCard";
import LoadingView from "../components/LoadingView";
import { useFetchCardQuery } from "../app/services/basket";

export default function Card({ navigation }: { navigation: any }) {
  const { id } = useUser();
  console.log("USER", id);
  const { data, isLoading, refetch } = useFetchCardQuery({
    user_id: id,
  });

  const realtimeTable = () => {
    supabase
      .channel("public:basket")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "basket" },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "basket" },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "basket" },
        () => {
          refetch();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    realtimeTable();
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  if (data?.length === 0) {
    return (
      <View className="flex-col px-4 items-center h-full pt-[30%]">
        <ShoppingBagIcon color="#284F49" size={30} />
        <Text className="text-lg font-bold pt-4">Add Item to you basket!</Text>
        <Text className="text-base text-center max-w-xs">
          You can add items to your basket by clicking the add to basket button
        </Text>
      </View>
    );
  }

  return (
    <ListCards classNames="h-full">
      <>
        {data?.map((product) => (
          <BasketCard
            key={product.id}
            product={product.products}
            basketid={product.id}
            quantity={product.quantity}
            user_id={id}
          />
        ))}
        <View className="flex-row justify-between py-5 w-full">
          <View className="flex-col items-start">
            <View className="flex-row items-end">
              <Text className="text-gray-600 text-base">Total: </Text>
              <Text className="text-center text-lg text-accent-orange font-bold">
                £{data?.reduce((a, b) => a + b.products.price * b.quantity, 0)}
              </Text>
            </View>
            <Text className="text-xs text-gray-600">DELIVERY EXCLUSIVE</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Checkout");
              }}
              className="shadow flex-row justify-center items-center w-full rounded-xl bg-accent-green"
            >
              <Text className="text-center text-gray-50 py-4 font-bold pl-3">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </ListCards>
  );
}

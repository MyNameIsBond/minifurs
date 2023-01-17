import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "../lib/helpers/UserContext";
import ListCards from "../components/ListCardsContainer";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import BasketCard from "../components/BasketCard";
import LoadingView from "../components/LoadingView";

export default function Card({}) {
  const [basket, setbasket] = useState<any[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  const fetchbasket = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("basket")
        .select(
          `
          id,
        product_id,
        quantity,
        products (
          *
        )
      `
        )
        .match({ user_id: user?.id });
      setbasket(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const realtimeTable = () => {
    supabase
      .channel("public:basket")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "basket" },
        (payload) => {
          fetchbasket();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "basket" },
        (payload) => {
          fetchbasket();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "basket" },
        (payload) => {
          fetchbasket();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    fetchbasket();
    realtimeTable();
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  if (basket?.length === 0) {
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
        {basket?.map((product) => (
          <BasketCard
            key={product.id}
            product={product.products}
            basketid={product.id}
            quantity={product.quantity}
            user_id={user?.id}
          />
        ))}
        <View className="flex-row justify-between py-5 w-full">
          <View className="flex-col items-start">
            <View className="flex-row items-end">
              <Text className="text-gray-600 text-base">Total: </Text>
              <Text className="text-center text-lg text-accent-orange font-bold">
                £
                {basket?.reduce((a, b) => a + b.products.price * b.quantity, 0)}
              </Text>
            </View>
            <Text className="text-xs text-gray-600">DELIVERY EXCLUSIVE</Text>
          </View>
          <View>
            <TouchableOpacity className="shadow flex-row justify-center items-center w-full rounded-xl bg-accent-green">
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

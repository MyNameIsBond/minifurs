import { View, Text } from "react-native";
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
    console.log("basket", basket[0].quantity);
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
      {basket?.map((product) => (
        <BasketCard
          key={product.id}
          product={product.products}
          basketid={product.id}
          quantity={product.quantity}
          user_id={user?.id}
        />
      ))}
    </ListCards>
  );
}

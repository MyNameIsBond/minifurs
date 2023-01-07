import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "../lib/helpers/UserContext";
import ListCards from "../components/ListCardsContainer";
import HomeCard from "../components/home/HomeCard";
import { HeartIcon } from "react-native-heroicons/outline";
import LoadingView from "../components/LoadingView";

export default function Favourite({}) {
  const [favourites, setFavourites] = useState<any[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("favourites")
        .select(
          `
          id,
        product_id,
        products (
          *
        )
      `
        )
        .match({ user_id: user.id });
      setFavourites(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const realtimeTable = () => {
    supabase
      .channel("public:favourites")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "favourites" },
        () => {
          fetchFavourites();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "favourites" },
        () => {
          fetchFavourites();
        }
      )
      .subscribe();
  };
  useEffect(() => {
    fetchFavourites();
    realtimeTable();
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  if (favourites?.length === 0) {
    return (
      <View className="flex-col px-4 items-center h-full pt-[30%]">
        <HeartIcon color="#284F49" size={30} />
        <Text className="text-lg font-bold pt-4">Add Favourites!</Text>
        <Text className="text-base text-center max-w-xs">
          create your own collection of favourite products. You can add products
          to your favourites by clicking the heart icon on the product page.
        </Text>
      </View>
    );
  }

  return (
    <ListCards classNames="h-full">
      {favourites?.map((favourite) => (
        <HomeCard key={favourite.id} product={favourite.products} />
      ))}
    </ListCards>
  );
}

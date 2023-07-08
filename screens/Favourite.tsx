import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "../lib/helpers/UserContext";
import ListCards from "../components/ListCardsContainer";
import HomeCard from "../components/home/HomeCard";
import { HeartIcon } from "react-native-heroicons/outline";
import LoadingView from "../components/LoadingView";
import { useGetAllFavProductQuery } from "../app/services/favourites";

export default function Favourite({}) {
  const { id } = useUser();

  const { isLoading, data, refetch } = useGetAllFavProductQuery({
    user_id: id,
  });

  const realtimeTable = () => {
    supabase
      .channel("public:favourites:list")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "favourites",
          filter: `user_id=eq.${id}`,
        },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "favourites",
          filter: `user_id=eq.${id}`,
        },
        () => {
          refetch();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    realtimeTable();
  }, [id]);

  if (isLoading) {
    return <LoadingView />;
  }

  if (data?.length === 0) {
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
      {data?.map((favourite) => (
        <HomeCard key={favourite.id} product={favourite.products} />
      ))}
    </ListCards>
  );
}

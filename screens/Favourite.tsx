import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useUser } from "../lib/helpers/UserContext";

export default function Favourite({}) {
  const [favourites, setFavourites] = useState<any[] | null>([]);

  const fetchFavourites = async () => {
    try {
      const { user } = useUser();
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("user_id", user.id);
      console.log("DATA:", data);
      setFavourites(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFavourites();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Favourite</Text>
      </View>
    </SafeAreaView>
  );
}

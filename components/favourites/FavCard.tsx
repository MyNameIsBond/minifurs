import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function FavCard({ id }: { id: string }): JSX.Element {
  const [product, setProduct] = useState();
  const fetchFavourites = async () => {
    try {
      const { data, error } = await supabase.from("favourites").select(`
    ${id},
    products (
      id,
    )
  `);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(product)}</Text>
    </View>
  );
}

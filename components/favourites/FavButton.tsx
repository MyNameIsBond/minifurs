import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";

export default function FavButton({
  user,
  product,
  favValue,
  fav,
  unfav,
}: {
  user: string | undefined;
  product: string | undefined;
  favValue: boolean;
  fav: () => void;
  unfav: () => void;
}): JSX.Element {
  const favourite = async () => {
    try {
      if (favValue) {
        const { data, error } = await supabase
          .from("favourites")
          .delete()
          .match({ user_id: user, product_id: product });
        unfav();
      } else {
        const { data, error } = await supabase
          .from("favourites")
          .insert({ user_id: user, product_id: product });
        if (error) console.error(error);
        fav();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const favcheck = async () => {
    try {
      const { data: favourites } = await supabase
        .from("favourites")
        .select("*")
        .match({ user_id: user, product_id: product });
      if (favourites && favourites.length > 0) {
        fav();
      } else {
        unfav();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    favcheck();
  }, []);

  return (
    <TouchableOpacity
      onPress={favourite}
      className="p-3 bg-gray-200 rounded-full"
    >
      {favValue ? (
        <HeartIconSolid color="#ba385c" />
      ) : (
        <HeartIcon color="#ba385c" />
      )}
    </TouchableOpacity>
  );
}

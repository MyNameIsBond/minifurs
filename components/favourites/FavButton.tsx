import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
export default function FavButton({
  user,
  product,
}: {
  user: string;
  product: string;
}): JSX.Element {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const favourite = async () => {
    try {
      if (isFavourite) {
        const { data, error } = await supabase
          .from("favourites")
          .delete()
          .match({ user_id: user, product_id: product });
        setIsFavourite(false);
      } else {
        const { data, error } = await supabase
          .from("favourites")
          .insert({ user_id: user, product_id: product });
        if (error) console.error(error);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const favcheck = async () => {
    try {
      const { data: favourites, error: errorFavourites } = await supabase
        .from("favourites")
        .select("*")
        .match({ user_id: user, product_id: product });
      if (favourites.length > 0) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    } catch (errorFavourites) {
      console.error(errorFavourites);
    }
  };

  useEffect(() => {
    favcheck();
  });

  return (
    <TouchableOpacity
      onPress={(e) => {
        favourite();
      }}
      className="p-3 bg-gray-200 rounded-full"
    >
      {isFavourite ? (
        <HeartIconSolid color="#ba385c" />
      ) : (
        <HeartIcon color="#ba385c" />
      )}
    </TouchableOpacity>
  );
}

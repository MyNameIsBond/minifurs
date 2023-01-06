import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
export default function FavButton({
  user,
  product,
}: {
  user: string | undefined;
  product: string | undefined;
}): JSX.Element {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const favourite = useCallback(async () => {
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
  }, [isFavourite, user, product]);
  console.log("FAV BUTTON RENDERED");
  const favcheck = async () => {
    try {
      const { data: favourites } = await supabase
        .from("favourites")
        .select("*")
        .match({ user_id: user, product_id: product });
      if (favourites && favourites.length > 0) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    favcheck();
  });

  return (
    <TouchableOpacity
      onPress={favourite}
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

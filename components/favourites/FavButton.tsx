import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { favouriteProduct } from "../../app/features/product/product";
import {
  useDeleteFavProductMutation,
  useGetFavProductQuery,
  useInsertFavProductMutation,
} from "../../app/services/favourites";
export default function FavButton({
  user,
  product,
}: {
  user: string | undefined;
  product: string | undefined;
  favValue: boolean;
  fav: () => void;
  unfav: () => void;
}): JSX.Element {
  const state = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const { data, refetch } = useGetFavProductQuery({
    product_id: state.product.id,
    user_id: user,
  });
  const [deleteFav] = useDeleteFavProductMutation();
  const [insert] = useInsertFavProductMutation();

  const favourite = async () => {
    if (state.favourite) {
      console.log("deleteFav(true)", data);
      deleteFav({ product_id: state.product.id, user_id: user });
    } else {
      console.log("insert(false)", data);
      insert({ product_id: state.product.id, user_id: user });
    }
  };

  useEffect(() => {
    refetch();
  }, [product]);

  return (
    <TouchableOpacity
      onPress={favourite}
      className="p-3 bg-gray-200 rounded-full"
    >
      {state.favourite ? (
        <HeartIconSolid color="#ba385c" />
      ) : (
        <HeartIcon color="#ba385c" />
      )}
    </TouchableOpacity>
  );
}

import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { favouriteProduct } from "../../app/features/product/product";
import {
  useDeleteFavProductMutation,
  useGetFavProductQuery,
  useInsertFavProductMutation,
} from "../../app/services/favourites";
import { useAppDispatch } from "../../app/hooks";

export default function FavButton({
  user,
}: {
  user: string | undefined;
}): JSX.Element {
  const state = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const { data, refetch } = useGetFavProductQuery({
    product_id: state.product.id,
    user_id: user,
  });
  const [deleteFav] = useDeleteFavProductMutation();
  const [insert] = useInsertFavProductMutation();

  const favourite = async () => {
    if (state.favourite) {
      deleteFav({ product_id: state.product.id, user_id: user });
    } else {
      insert({ product_id: state.product.id, user_id: user });
    }
  };

  useEffect(() => {
    refetch();
    if (data && data.length > 0) {
      dispatch(favouriteProduct(true));
    } else {
      dispatch(favouriteProduct(false));
    }
  }, [data]);

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

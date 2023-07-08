import { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { RootState } from "../../app/store";
import { favouriteProduct } from "../../app/features/product";
import {
  useDeleteFavProductMutation,
  useGetFavProductQuery,
  useInsertFavProductMutation,
} from "../../app/services/favourites";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { supabase } from "../../lib/supabase";

export default function FavButton({
  user,
}: {
  user: string | undefined;
}): JSX.Element {
  const state = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const { data, refetch, isLoading } = useGetFavProductQuery({
    product_id: state.product.id,
    user_id: user,
  });
  const [deleteFav] = useDeleteFavProductMutation();
  const [insert] = useInsertFavProductMutation();

  const realtimeTable = () => {
    supabase
      .channel("public:favourites")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "favourites",
          filter: `product_id=eq.${state.product.id}`,
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
          filter: `product_id=eq.${state.product.id}`,
        },
        () => {
          refetch();
        }
      )
      .subscribe();
  };

  const favourite = async () => {
    if (state.favourite) {
      deleteFav({ product_id: state.product.id, user_id: user });
    } else {
      insert({ product_id: state.product.id, user_id: user });
    }
  };

  useEffect(() => {
    realtimeTable();
    if (data && data.length > 0) {
      dispatch(favouriteProduct(true));
    } else {
      dispatch(favouriteProduct(false));
    }
  }, [data]);

  if (isLoading) {
    return (
      <TouchableOpacity
        onPress={favourite}
        className="p-3 bg-gray-200 rounded-full"
      >
        <ActivityIndicator />
      </TouchableOpacity>
    );
  }

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

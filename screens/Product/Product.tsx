import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
import ProductSlider from "../../components/Product/ProductSlider";
import DescriptionSection from "../../components/Product/DescriptionSection";
import { useUser } from "../../lib/helpers/UserContext";
import FavButton from "../../components/favourites/FavButton";
import AmountBtn from "./AmountBtn";
import AddToBasket from "./AddToBasket";
import LoadingView from "../../components/LoadingView";
import reducerProduct from "../../lib/dispachers/reducerProduct";
import { initialState } from "../../lib/dispachers/reducerProduct";
import { ACTION } from "../../lib/dispachers/reducerProduct";
import {
  ProductInterface,
  useGetProductQuery,
} from "../../app/services/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { api } from "../../app/services/api";
import { setProduct } from "../../app/features/product/product";

export default function Product({ route }) {
  const navigation = useNavigation();
  const newState = useSelector((state: RootState) => state);
  const { id } = route.params;
  const [state, dispatcher] = useReducer(reducerProduct, initialState);
  const { error, isLoading, data } = useGetProductQuery(id);
  if (error) {
    console.error({ error });
  }
  const dispatch = useDispatch();
  const user = useUser();
  const fetchProduct = async () => {
    try {
      dispatcher({ type: ACTION.FETCH_PRODUCT_START });
      const { data: product } = await supabase
        .from("products")
        .select("*")
        .match({ id: id });
      dispatcher({
        type: ACTION.FETCH_PRODUCT_SUCCESS,
        payload: product[0],
      });
    } catch (error) {
      dispatcher({ type: ACTION.FETCH_PRODUCT_ERROR, payload: error });
    }
  };

  useEffect(() => {
    fetchProduct();
    dispatch(setProduct(data as ProductInterface));
  }, [id]);

  if (state.loading) {
    return <LoadingView />;
  }

  return (
    <View className="relative">
      <ScrollView className="h-full">
        <ProductSlider
          images={state.product?.images}
          colours={state.product?.colours}
          displayColour={state.displayColour}
        />
        <Text>{JSON.stringify(newState.product)}</Text>
        <TouchableOpacity
          className="bg-gray-900 w-12 h-12 flex items-center justify-center rounded-xl m-1 absolute top-16 left-5"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        <View className="flex-row justify-between items-center p-4">
          <Text className="text-2xl font-bold capitalize">
            {state.product?.title}
          </Text>
          <FavButton
            favValue={state.favourite}
            unfav={() => dispatcher({ type: ACTION.UNFAVOURITE_PRODUCT })}
            fav={() => dispatcher({ type: ACTION.FAVOURITE_PRODUCT })}
            product={state.product?.id}
            user={user?.id}
          />
        </View>
        <View className="flex-row justify-between px-4">
          <Text className="text-2xl font-bold text-accent-orange">
            £{state.product?.price}
          </Text>
          <AmountBtn
            productAmount={state.product?.quantity}
            increment={() => dispatcher({ type: ACTION.INCREMENT_QUANTITY })}
            decrement={() => dispatcher({ type: ACTION.DECREMENT_QUANTITY })}
            addToBasketNum={state.quantity}
          />
        </View>

        <View className="flex-row px-4">
          {state.colours?.map((colour: string) => (
            <TouchableOpacity
              key={colour}
              onPress={(e) =>
                dispatcher({
                  type: ACTION.CHANGE_DISPLAY_COLOUR,
                  payload: colour,
                })
              }
            >
              <View
                style={{ backgroundColor: colour }}
                className={`p-2 h-6 w-6 rounded-full shadow m-1 ${
                  colour === state.displayColour
                    ? "border-4 border-gray-300"
                    : null
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>
        <DescriptionSection
          reviews={state.product?.reviews}
          description={state.product?.description}
        />
      </ScrollView>
      <SafeAreaView className="mb-auto">
        <View className="border-t py-4 border-gray-300">
          <AddToBasket
            user_id={user?.id}
            product_id={state.product?.id}
            quantity={state.quantity}
            colour={state.displayColour}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

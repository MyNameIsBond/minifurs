import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import ProductSlider from "../../components/Product/ProductSlider";
import DescriptionSection from "../../components/Product/DescriptionSection";
import { useUser } from "../../lib/helpers/UserContext";
import FavButton from "../../components/favourites/FavButton";
import AmountBtn from "./AmountBtn";
import AddToBasket from "./AddToBasket";
import LoadingView from "../../components/LoadingView";
import { useGetProductQuery } from "../../app/services/product";
import { RootState } from "../../app/store";
import {
  changeDisplayColour,
  setProduct,
} from "../../app/features/product/product";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function Product({ route }) {
  const navigation = useNavigation();
  const state = useAppSelector((state: RootState) => state.product);
  const { id } = route.params;
  const { error, isLoading, data } = useGetProductQuery(id);
  if (error) {
    console.error({ error });
  }
  const dispatch = useAppDispatch();
  const user = useUser();

  useEffect(() => {
    dispatch(setProduct(data));
  }, [id, data]);

  if (state.loading || isLoading) {
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
          <FavButton user={user?.id} />
        </View>
        <View className="flex-row justify-between px-4">
          <Text className="text-2xl font-bold text-accent-orange">
            £{state.product?.price}
          </Text>
          <AmountBtn
            productAmount={state.product?.quantity}
            addToBasketNum={state.quantity}
          />
        </View>

        <View className="flex-row px-4">
          {state.colours?.map((colour: string) => (
            <TouchableOpacity
              key={colour}
              onPress={() => dispatch(changeDisplayColour(colour))}
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

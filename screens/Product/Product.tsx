import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
import ProductSlider from "../../components/Product/ProductSlider";
import DescriptionSection from "../../components/Product/DescriptionSection";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { useUser } from "../../lib/helpers/UserContext";
import FavButton from "../../components/favourites/FavButton";
import AmountBtn from "./AmountBtn";
import AddToBasket from "./AddToBasket";
import LoadingView from "../../components/LoadingView";

export default function Product({ route }) {
  const navigation = useNavigation();
  const [product, setProduct] = useState<any[] | null>([]);
  const [displayColour, setDisplayColour] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [addToBasketNum, setAddToBasketNum] = useState<number>(1);
  const { colours } = product;
  const { id } = route.params;
  const { user } = useUser();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .match({ id: id });
      setProduct(product[0]);
      setDisplayColour(product[0].colours[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const addToBasket = async () => {
    try {
      const { data, error } = await supabase.from("basket").insert({
        user_id: user?.id,
        product_id: product?.id,
        quantity: addToBasketNum,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <View className="relative">
      <ScrollView className="h-full">
        <ProductSlider
          images={product?.images}
          colours={product?.colours}
          displayColour={displayColour}
        />
        <TouchableOpacity
          className="bg-gray-900 w-12 h-12 flex items-center justify-center rounded-xl m-1 absolute top-16 left-5"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        <View className="flex-row justify-between items-center p-4">
          <Text className="text-2xl font-bold capitalize">
            {product?.title}
          </Text>
          <FavButton product={product?.id} user={user?.id} />
        </View>
        <View className="flex-row justify-between px-4">
          <Text className="text-2xl font-bold text-accent-orange">
            £{product?.price}
          </Text>
          <AmountBtn
            addToBasketNum={addToBasketNum}
            setAddToBasketNum={setAddToBasketNum}
            quantity={product?.quantity}
          />
        </View>

        <View className="flex-row px-4">
          {colours?.map((colour: string) => (
            <TouchableOpacity
              key={colour}
              onPress={(e) => setDisplayColour(colour)}
            >
              <View
                style={{ backgroundColor: colour }}
                className={`p-2 h-6 w-6 rounded-full shadow m-1 ${
                  colour === displayColour ? "border-4 border-gray-300" : null
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>
        <DescriptionSection
          reviews={product?.reviews}
          description={product?.description}
        />
      </ScrollView>
      <SafeAreaView className="mb-auto">
        <View className="border-t py-4 border-gray-300">
          <AddToBasket
            user_id={user?.id}
            product_id={product?.id}
            quantity={addToBasketNum}
            colour={displayColour}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

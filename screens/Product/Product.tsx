import {
  View,
  TouchableOpacity,
  Text,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { supabase } from "../../lib/supabase";
import ProductSlider from "../../components/Product/ProductSlider";
import DescriptionSection from "../../components/Product/DescriptionSection";
import { ShoppingCartIcon } from "react-native-heroicons/outline";

export default function Product({ route }) {
  const navigation = useNavigation();
  const [product, setProduct] = useState<any[] | null>([]);
  const [displayColour, setDisplayColour] = useState<string>("");
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [addToBasketNum, setAddToBasketNum] = useState<number>(1);
  const { colours } = product;
  const { id } = route.params;
  const fetchProduct = async () => {
    try {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);
      setProduct(product[0]);
      setDisplayColour(product[0].colours[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
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
        <View className="">
          <View className="flex-row justify-between items-center p-4">
            <Text className="text-2xl font-bold capitalize">
              {product?.title}
            </Text>
            <TouchableOpacity
              onPress={(e) => setIsFavourite(!isFavourite)}
              className="p-3 bg-gray-200 rounded-full"
            >
              {isFavourite ? (
                <HeartIconSolid color="#ba385c" />
              ) : (
                <HeartIcon color="#ba385c" />
              )}
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between px-4">
            <Text className="text-2xl font-bold text-accent-orange">
              £{product?.price}
            </Text>
            <View className="flex-row items-center">
              <Button
                title="-"
                color={"#ba385c"}
                disabled={addToBasketNum === 1}
                onPress={(e) => setAddToBasketNum(addToBasketNum - 1)}
              />
              <Text className="px-3">{addToBasketNum}</Text>
              <Button
                title="+"
                color={"#ba385c"}
                disabled={addToBasketNum === product?.quantity}
                onPress={(e) => setAddToBasketNum(addToBasketNum + 1)}
              />
            </View>
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
        </View>
      </ScrollView>
      <SafeAreaView className="mb-auto">
        <View>
          <View className="px-3 flex-col items-center">
            <TouchableOpacity className="shadow flex-row justify-center items-center w-full rounded-xl bg-accent-green">
              <ShoppingCartIcon color="white" />
              <Text className="text-center text-gray-50 py-4 font-bold pl-3">
                Add to basket
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

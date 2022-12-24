import { View, TouchableOpacity, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
import ProductSlider from "../../components/Product/ProductSlider";
export default function Product({ route }) {
  const navigation = useNavigation();
  const [product, setProduct] = useState<any[] | null>([]);
  const [displayImages, setDisplayImages] = useState<any[] | null>([]);
  const { id } = route.params;

  const fetchProduct = async () => {
    try {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);
      const keys = Object.keys(product[0]?.images);
      setProduct({ keys, ...product[0] });
      setDisplayImages(keys.map((key) => product[0]?.images[key]));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <View>
      <ProductSlider />
      <SafeAreaView>
        <TouchableOpacity
          className="bg-gray-900 w-12 h-12 flex items-center justify-center rounded-xl m-1"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>

        {product && <Text>{JSON.stringify(product?.keys)}</Text>}
      </SafeAreaView>
    </View>
  );
}

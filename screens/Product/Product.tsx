import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
export default function Product({ route }) {
  const navigation = useNavigation();
  const [product, setProduct] = useState<any[] | null>([]);
  const { id } = route.params;

  const { width } = Dimensions.get("window");
  const height = width * 0.3;

  const fetchProduct = async () => {
    try {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);
      const keys = Object.keys(product[0]?.images);
      setProduct({ keys, ...product[0] });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%", height }}
      ></ScrollView>
      <SafeAreaView>
        <TouchableOpacity
          className="bg-gray-900 w-12 h-12 flex items-center justify-center rounded-xl m-1"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        {product && <Text>{JSON.stringify(product?.images)}</Text>}
        {product && <Text>{JSON.stringify(product?.keys)}</Text>}
      </SafeAreaView>
    </View>
  );
}

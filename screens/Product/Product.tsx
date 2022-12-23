import { View, TouchableOpacity, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { supabase } from "../../lib/supabase";
export default function Product({ route }) {
  const [product, setProduct] = useState<any[] | null>([]);
  const navigation = useNavigation();
  const { id } = route.params;
  const fetchProduct = async () => {
    try {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id);
      setProduct(product);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity
          className="bg-gray-900 w-12 h-12 flex items-center justify-center rounded-xl m-1"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        {product && <Text>{product[0]?.title}</Text>}
      </SafeAreaView>
    </View>
  );
}

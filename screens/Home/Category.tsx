import { View, Text, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Category({ navigation, route }): JSX.Element {
  const [products, setProducts] = useState<any>([]);
  const category = route.params.category.toLowerCase();

  const fetchProducts = async () => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .in("categories", [category.toLowerCase(), "living room"]);
      if (products) {
        setProducts(products);
      }
      console.log("ERROS:", error);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <SafeAreaView>
      <View>
        <Text>Category:{category}</Text>
        <Text>Category:{JSON.stringify(products)}</Text>
      </View>
    </SafeAreaView>
  );
}

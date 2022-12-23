import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import HomeCard from "../../components/home/HomeCard";
import { ClockIcon } from "react-native-heroicons/outline";

export default function Category({ navigation, route }): JSX.Element {
  const [products, setProducts] = useState<any>([]);
  const category = route.params.category.toLowerCase();

  const fetchProducts = async () => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .contains("categories", { [category]: true });
      if (products) {
        setProducts(products);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView className="h-screen bg-gray-100">
        {products.length === 0 && (
          <View className="flex-col items-center h-full pt-[30%]">
            <ClockIcon color="#284F49" size={30} />
            <Text className="text-lg font-bold pt-4">Coming Soon!</Text>
            <Text className="text-base text-center">
              Find a bright ideal to suit your taste with our great selection of
              suspension, wall, floor and table lights. breathable Walking
            </Text>
          </View>
        )}
        <View className="p-3 bg-gray-100" style={styles.container}>
          {products.map((product) => (
            <HomeCard product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

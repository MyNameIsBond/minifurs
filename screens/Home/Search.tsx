import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import HomeCard from "../../components/home/HomeCard";

export default function Search({ route, navigation }: {}): JSX.Element {
  const { search } = route.params;
  const [products, setProducts] = useState<any[] | null>([]);
  const searchApi = async () => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .ilike("title", `%${search}%`);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    searchApi();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView className="h-screen bg-gray-100">
        <View style={styles.container} className="p-3 bg-gray-100">
          {products?.map((product) => (
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

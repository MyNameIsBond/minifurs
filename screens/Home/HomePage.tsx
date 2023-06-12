import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import CategoriesSlider from "../../components/home/CategoriesSlider";
import HomeBody from "../../components/home/HomeBody";
import HomeSceleton from "../../components/home/HomeSceleton";
import { useGetProductsByLimitQuery } from "../../app/services/allProducts";
import LoadingView from "../../components/LoadingView";

export default function Home({}) {
  const [search, setSearch] = useState("");
  const { data: products, isLoading } = useGetProductsByLimitQuery(4);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <HomeSceleton search={search} setSearch={setSearch}>
          <CategoriesSlider />
          <HomeBody products={products || []} />
        </HomeSceleton>
      </ScrollView>
    </SafeAreaView>
  );
}

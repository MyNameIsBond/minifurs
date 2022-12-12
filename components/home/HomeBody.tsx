import { View, Text } from "react-native";
import CategoriesSlider from "./CategoriesSlider";
import HomeCard from "./HomeCard";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  return (
    <View className="rounded-t-3xl px-4 pt-10 -mt-5 bg-gray-50">
      <CategoriesSlider />
      {products.map((product) => (
        <HomeCard product={product} />
      ))}
    </View>
  );
}

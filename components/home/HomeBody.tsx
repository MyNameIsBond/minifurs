import { View } from "react-native";

import HomeCard from "./HomeCard";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  return (
    <View>
      {products.map((product) => (
        <HomeCard product={product} />
      ))}
    </View>
  );
}

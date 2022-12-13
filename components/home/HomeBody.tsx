import { View } from "react-native";
import CardDisplaySceleton from "./CardDisplaySceleton";
import HomeCard from "./HomeCard";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  return (
    <CardDisplaySceleton title="latest relese">
      {products.map((product) => (
        <HomeCard product={product} />
      ))}
    </CardDisplaySceleton>
  );
}

import { FlatList } from "react-native";
import CardDisplaySceleton from "./CardDisplaySceleton";
import HomeCard from "./HomeCard";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  return (
    <CardDisplaySceleton title="Latest Release">
      <FlatList
        data={products}
        renderItem={({ item }) => <HomeCard product={item} />}
        keyExtractor={(item) => item.id}
      />
    </CardDisplaySceleton>
  );
}

import CardDisplaySceleton from "./CardDisplaySceleton";
import HomeCard from "./HomeCard";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  return (
    <CardDisplaySceleton title="latest relese">
      {products.slice(0, 4).map((product) => (
        <HomeCard key={product.id} product={product} />
      ))}
    </CardDisplaySceleton>
  );
}

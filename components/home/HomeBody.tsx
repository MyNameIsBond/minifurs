import CardDisplaySceleton from "./CardDisplaySceleton";
import HomeCard from "./HomeCard";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  return (
    <CardDisplaySceleton title="latest release">
      {products.map((product) => (
        <HomeCard key={product.id} product={product} />
      ))}
    </CardDisplaySceleton>
  );
}

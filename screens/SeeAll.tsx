import HomeCard from "../components/home/HomeCard";
import ListCards from "../components/ListCardsContainer";
import LoadingView from "../components/LoadingView";
import { useGetAllProductsQuery } from "../app/services/allProducts";

export default function SeeAll({}): JSX.Element {
  const { data, isLoading } = useGetAllProductsQuery();

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <ListCards classNames="h-full">
      {data?.map((product) => (
        <HomeCard key={product.id} product={product} />
      ))}
    </ListCards>
  );
}

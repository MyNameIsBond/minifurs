import HomeCard from "../../components/home/HomeCard";
import ListCards from "../../components/ListCardsContainer";
import { useSearchProductsQuery } from "../../app/services/search";
import LoadingView from "../../components/LoadingView";

export default function Search({ route }: {}): JSX.Element {
  const { search } = route.params;
  const { data, isLoading } = useSearchProductsQuery(search);

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

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import HomeCard from "../components/home/HomeCard";
import CardDisplaySceleton from "../components/home/CardDisplaySceleton";
import ListCards from "../components/ListCardsContainer";
import { View } from "react-native";
import LoadingView from "../components/LoadingView";

export default function SeeAll({}): JSX.Element {
  const [products, setProducts] = useState<any[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLatestProducts = async () => {
    try {
      setLoading(true);
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      setProducts(product);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <ListCards classNames="h-full">
      {products?.map((product) => (
        <HomeCard key={product.id} product={product} />
      ))}
    </ListCards>
  );
}

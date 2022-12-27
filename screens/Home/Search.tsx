import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import HomeCard from "../../components/home/HomeCard";
import ListCards from "../../components/ListCardsContainer";

export default function Search({ route }: {}): JSX.Element {
  const { search } = route.params;
  const [products, setProducts] = useState<any[] | null>([]);
  const searchApi = async () => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .ilike("title", `%${search}%`);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    searchApi();
  }, []);

  return (
    <ListCards>
      {products?.map((product) => (
        <HomeCard key={product.id} product={product} />
      ))}
    </ListCards>
  );
}

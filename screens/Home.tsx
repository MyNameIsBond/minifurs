import { useEffect, useState } from "react";

import HomeBody from "../components/home/HomeBody";
import HomeSceleton from "../components/home/HomeSceleton";
import { supabase } from "../lib/supabase";

export default function Home({}) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    supabase
      .from("products")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          setProducts(data);
        }
      });
  };

  return (
    <>
      <HomeSceleton search={search} setSearch={setSearch}>
        <HomeBody products={[]} />
      </HomeSceleton>
    </>
  );
}

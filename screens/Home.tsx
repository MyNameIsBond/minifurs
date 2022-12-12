import { useEffect, useState } from "react";

import HomeBody from "../components/home/HomeBody";
import HomeSceleton from "../components/home/HomeSceleton";
import ChairSvg from "../components/home/svg/ChairSvg";
import { supabase } from "../lib/supabase";

export default function Home({}) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[] | null>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data: product, error } = await supabase
      .from("products")
      .select("*");
    setProducts(product);
  };

  return (
    <>
      <HomeSceleton search={search} setSearch={setSearch}>
        <ChairSvg />
        <HomeBody products={products} />
      </HomeSceleton>
    </>
  );
}

import { useState } from "react";

import HomeBody from "../components/home/HomeBody";
import HomeSceleton from "../components/home/HomeSceleton";

export default function Home({}) {
  const [search, setSearch] = useState("");

  return (
    <>
      <HomeSceleton search={search} setSearch={setSearch}>
        <HomeBody />
      </HomeSceleton>
    </>
  );
}

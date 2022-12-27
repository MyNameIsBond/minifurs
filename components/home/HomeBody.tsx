import AdBanner from "../AdBanner";
import CardDisplaySceleton from "./CardDisplaySceleton";
import HomeCard from "./HomeCard";

export default function HomeBody({
  products,
}: {
  products: any[] | null;
}): JSX.Element {
  return (
    <>
      <CardDisplaySceleton title="latest release">
        {products.map((product) => (
          <HomeCard key={product.id} product={product} />
        ))}
      </CardDisplaySceleton>
      <AdBanner
        image="https://scashksznwiivlpgkftm.supabase.co/storage/v1/object/public/minifur/appImages/vr_headset.png"
        title="Virtual Reality Showroom"
        subtitle="Allows you to view our showrooms containing our latest furniture collections"
      />
      <CardDisplaySceleton title="latest release">
        {products.slice(0, 2).map((product) => (
          <HomeCard key={product.id} product={product} />
        ))}
      </CardDisplaySceleton>
    </>
  );
}

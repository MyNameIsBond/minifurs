import { ScrollView, Dimensions, Image } from "react-native";
import { Product } from "../../types/product";

export default function ProductSlider({
  images,
  displayColour,
}: {
  images: Product["images"];
  displayColour: string;
}) {
  const { width } = Dimensions.get("window");
  const height = width * 0.8;

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ width, height }}
    >
      {images &&
        images[displayColour]?.map((image: string) => (
          <Image
            key={image}
            source={{ uri: image }}
            style={{ width, height }}
          />
        ))}
    </ScrollView>
  );
}

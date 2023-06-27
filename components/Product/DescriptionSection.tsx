import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useCallback, useState } from "react";
import Reviews from "./Reviews";
import type { Product } from "../../types/product";

export default function DescriptionSection({
  reviews,
  description,
}: {
  reviews: Product["reviews"];
  description: Product["description"];
}) {
  const [showreview, setShowReview] = useState<boolean>(true);
  const showReviews = useCallback(
    (set: boolean) => {
      setShowReview(set);
    },
    [showreview]
  );
  return (
    <>
      <View className="p-4">
        <View className="flex-row gap-x-3 py-5">
          <TouchableOpacity
            className="p-4 rounded-xl"
            onPress={() => showReviews(true)}
            style={
              {
                backgroundColor: showreview ? "rgba(230, 131, 20, 0.5)" : null,
              } as StyleProp<ViewStyle>
            }
          >
            <Text
              style={{
                color: showreview ? "#E68314" : "rgb(82, 82, 82)",
                fontWeight: showreview ? "bold" : "normal",
              }}
            >
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-4 rounded-xl"
            onPress={() => showReviews(false)}
            style={
              {
                backgroundColor: !showreview ? "rgba(230, 131, 20, 0.5)" : null,
              } as StyleProp<ViewStyle>
            }
          >
            <Text
              style={{
                color: !showreview ? "#E68314" : "rgb(82, 82, 82)",
                fontWeight: !showreview ? "bold" : "normal",
              }}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>
        {showreview ? (
          <Text className="text-gray-600">{description?.description}</Text>
        ) : (
          <Reviews reviews={reviews} />
        )}
      </View>
    </>
  );
}

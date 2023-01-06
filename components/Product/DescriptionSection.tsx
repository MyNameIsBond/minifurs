import { View, Text, TouchableOpacity } from "react-native";
import { Fragment, useCallback, useState } from "react";
import Reviews from "./Reviews";

export default function DescriptionSection({
  reviews,
  description,
}: {
  reviews: any[] | null;
  description: any[] | null;
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
            onPress={(e) => showReviews(true)}
            style={{
              backgroundColor: showreview ? "rgba(230, 131, 20, 0.5)" : null,
            }}
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
            onPress={(e) => showReviews(false)}
            style={{
              backgroundColor: !showreview ? "rgba(230, 131, 20, 0.5)" : null,
            }}
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

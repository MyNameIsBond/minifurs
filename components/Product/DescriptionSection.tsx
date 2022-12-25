import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Reviews from "./Reviews";

export default function DescriptionSection({
  reviews,
  description,
}: {
  reviews: any[] | null;
  description: any[] | null;
}) {
  const [showreview, setShowReview] = useState<boolean>(false);
  return (
    <View>
      <View className="flex-row gap-x-3 py-5">
        <TouchableOpacity
          className="p-4 rounded-xl"
          onPress={() => setShowReview(true)}
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
          onPress={() => setShowReview(false)}
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
        <Text className="text-gray-600">{description.description}</Text>
      ) : (
        <Reviews reviews={reviews} />
      )}
    </View>
  );
}

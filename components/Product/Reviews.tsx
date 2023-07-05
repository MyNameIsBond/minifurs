import { View, Text, Image } from "react-native";
import React from "react";
import ReviewStars from "./ReviewStars";
import type { Review } from "../../types/product";

export default function Reviews({ reviews }: { reviews: Review[] | null }) {
  return (
    <View className="p-4">
      {reviews && reviews.length > 0 ? (
        reviews.map((review, key) => (
          <View key={key}>
            <View className="flex-row items-center gap-x-3 pb-1">
              <Image
                className="h-8 w-8 border-2 border-gray-600 rounded-full"
                source={{ uri: review.img_avatar }}
              />
              <Text className="text-gray-900 font-semibold">{review.user}</Text>
            </View>
            <ReviewStars stars={review.stars} />
            <Text className="text-gray-800 pt-3">{review.text}</Text>
          </View>
        ))
      ) : (
        <Text>No Reviews</Text>
      )}
    </View>
  );
}

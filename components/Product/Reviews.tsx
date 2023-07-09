import { View, Text, Image, TextInput, Button } from "react-native";
import React from "react";
import ReviewStars from "./ReviewStars";
import {
  useGetReviewsQuery,
  useReviewRightCheckQuery,
} from "../../app/services/reviews";
import { useUser } from "../../lib/helpers/UserContext";

export default function Reviews({ product_id }: { product_id: string }) {
  const { id } = useUser();
  const { data, isLoading } = useGetReviewsQuery({ product_id: product_id });
  const { data: reviewCheck } = useReviewRightCheckQuery({
    product_id: product_id,
    user_id: id,
    review: data,
  });
  const sendReview = () => {
    console.log("SEND REVIEW");
  };

  return (
    <View className="p-4">
      {data && data.length > 0 ? (
        data.map((review, key) => (
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
        <>
          <Text className="mb-10">No Reviews</Text>
        </>
      )}
      {reviewCheck?.length ? (
        <View className="flex gap-y-4 mt-5 p-3 bg-gray-50 rounded-md shadow">
          <Text className="mb-10">Give us your review</Text>
          <ReviewStars stars={1} />
          <TextInput
            multiline={true}
            numberOfLines={10}
            className="border-gray-400 h-32 border p-3 my-4 rounded-lg"
          />
          <Button
            title="Send Review"
            color="darkgreen"
            onPress={() => {
              console.log("first");
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

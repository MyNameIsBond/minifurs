import { View, Text, Image, TextInput, Button, Alert } from "react-native";
import React, { useEffect } from "react";
import ReviewStars from "./ReviewStars";
import {
  useAddReviewMutation,
  useGetReviewsQuery,
  useReviewRightCheckQuery,
} from "../../app/services/reviews";
import { useUser } from "../../lib/helpers/UserContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { changeInput } from "../../app/features/review";
import { supabase } from "../../lib/supabase";

export default function Reviews({ product_id }: { product_id: string }) {
  const { id, username } = useUser();
  const { data, refetch } = useGetReviewsQuery({ product_id: product_id });
  const { stars, reviewRating } = useAppSelector(
    (state: RootState) => state.review
  );
  const dispatch = useAppDispatch();
  const [addReview] = useAddReviewMutation();
  const {
    data: reviewCheck,
    isLoading,
    refetch: refetchCheck,
  } = useReviewRightCheckQuery({
    product_id,
    user_id: id,
  });
  const sendReview = () => {
    addReview({
      product_id,
      user_id: id,
      review: reviewRating,
      stars,
      username,
    });
    dispatch(changeInput(""));
    Alert.alert("Thank you for your feedback");
  };

  const realtimeTable = () => {
    supabase
      .channel("public:reviews")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reviews",
          filter: `user_id=eq.${id}`,
        },
        () => {
          refetch();
          refetchCheck();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "reviews",
          filter: `user_id=eq.${id}`,
        },
        () => {
          refetch();
          refetchCheck();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    realtimeTable();
  }, []);
  return (
    <View className="p-4 flex-col gap-y-5">
      {data && data.length > 0 ? (
        data.map((review, key) => (
          <View key={key}>
            <View className="flex-row items-center gap-x-3 pb-1">
              <Image
                className="h-8 w-8 border-2 border-gray-600 rounded-full"
                source={require("../../assets/user-pic.png")}
              />
              <Text className="text-gray-900 font-semibold">
                {review.username ? review.username : "user name"}
                {review.username === username ? (
                  <Text className="text-gray-500 pt-3"> • (you)</Text>
                ) : null}
              </Text>
            </View>
            <ReviewStars stars={review.stars} display={false} />
            <Text className="text-gray-800 pt-3">{review.review}</Text>
          </View>
        ))
      ) : (
        <>
          <Text className="mb-10">No Reviews</Text>
        </>
      )}
      {reviewCheck && !isLoading ? (
        <View className="flex gap-y-4 mt-5 p-3 bg-gray-50 rounded-md shadow">
          <Text className="mb-8 font-semibold">Give us your review</Text>
          <ReviewStars stars={stars} display={true} />
          <TextInput
            multiline={true}
            numberOfLines={10}
            className="border-gray-400 h-32 border p-3 my-4 rounded-lg"
            value={reviewRating}
            onChangeText={(text) => {
              dispatch(changeInput(text));
            }}
          />
          <Button
            title="Send Review"
            color="darkgreen"
            onPress={() => sendReview()}
          />
        </View>
      ) : null}
    </View>
  );
}

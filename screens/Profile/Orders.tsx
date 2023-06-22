import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import { useGetOrdersQuery } from "../../app/services/addOrder";
import { useUser } from "../../lib/helpers/UserContext";
import LoadingView from "../../components/LoadingView";

export default function Orders() {
  const { id, username, email } = useUser();
  const { data: orders, isLoading } = useGetOrdersQuery(id);
  if (isLoading) {
    return <LoadingView />;
  }
  const delivered = orders.filter((e) => e.delivered);
  if (orders?.length === 0) {
    <View className="flex-col px-4 items-center h-full pt-[30%]">
      <ShoppingBagIcon color="#284F49" size={30} />
      <Text className="text-lg font-bold pt-4">No orders yet!</Text>
      <Text className="text-base text-center max-w-xs">
        for the time being you have no made any order
      </Text>
    </View>;
  }

  return (
    <ScrollView>
      <View className="p-4">
        <Text className="text-xs text-gray-600 font-bold pl-2 pt-2 uppercase">
          orders
        </Text>
        <Text className=" text-3xl font-bold p-2">On The Way</Text>
        {orders
          .filter((e) => !e.delivered)
          .map((order) => (
            <View
              key={order.id}
              className="flex-row items-center rounded-md w-full m-1 px-2 py-3 bg-gray-50"
            >
              <Image
                source={{ uri: order?.products?.profile_pic }}
                className="w-20 h-20 rounded-md"
              />
              <View className="pl-2 flex-col space-y-1">
                <Text className="text-lg font-bold">
                  {order?.product?.title}
                </Text>
                <Text className="text-gray-500">EST Time: 1 days</Text>
                <Text className="text-gray-500">amount: {order.quantity}</Text>
              </View>
              <Text className="ml-auto pr-6 text-accent-orange text-lg font-bold">
                £ {order?.products?.price * order.quantity}
              </Text>
            </View>
          ))}
        {delivered.length !== 0 && (
          <View className="py-10">
            <Text className="text-xs text-gray-600 font-bold pl-2 pt-2 uppercase">
              orders
            </Text>
            <Text className=" text-3xl font-bold p-2">Delivered</Text>
            {delivered.map((order) => (
              <View
                key={order.id}
                className="flex-row items-center rounded-md w-full m-1 px-2 py-3 bg-gray-50"
              >
                <Image
                  source={{ uri: order?.products?.profile_pic }}
                  className="w-20 h-20 rounded-md"
                />
                <View className="pl-2 flex-col space-y-1">
                  <Text className="text-lg font-bold">
                    {order?.product?.title}
                  </Text>
                  <Text className="text-gray-500">EST Time: 1 days</Text>
                  <Text className="text-gray-500">
                    amount: {order.quantity}
                  </Text>
                </View>
                <Text className="ml-auto pr-6 text-accent-orange text-lg font-bold">
                  £ {order?.products?.price * order.quantity}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
